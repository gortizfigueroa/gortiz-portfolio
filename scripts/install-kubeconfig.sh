#!/usr/bin/env bash
# Install pck-cputeag access without disturbing other ~/.kube/config entries.
set -euo pipefail
umask 077

CLUSTER_NAME="pck-cputeag"
USER_NAME="pck-cputeag-admin"
CONTEXT_NAME="pck-cputeag-admin@pck-cputeag"
KUBECTL_BIN="${KUBECTL_BIN:-kubectl}"
SET_CURRENT=0

if [[ "${1:-}" == "--set-current" ]]; then
  SET_CURRENT=1
elif [[ $# -gt 0 ]]; then
  printf 'usage: %s [--set-current]\n' "$0" >&2
  exit 2
fi

for command_name in "$KUBECTL_BIN" python3; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    printf 'error: required command not found: %s\n' "$command_name" >&2
    exit 1
  fi
done

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${KUBECONFIG_TARGET:-$HOME/.kube/config}"
TARGET_DIR="$(dirname -- "$TARGET")"
mkdir -p "$TARGET_DIR"
chmod 700 "$TARGET_DIR"

fetched="$($SCRIPT_DIR/fetch-kubeconfig.sh)"
fetched_dir="$(dirname -- "$fetched")"
workdir="$(mktemp -d "$TARGET_DIR/.pck-cputeag-install.XXXXXX")"
cleanup() {
  rm -rf "$fetched_dir" "$workdir"
}
trap cleanup EXIT

"$KUBECTL_BIN" --kubeconfig "$fetched" config view --raw -o json > "$workdir/source.json"

# Give all imported objects cluster-specific names before merging, so a generic
# upstream username such as kubernetes-admin cannot collide with another cluster.
CLUSTER_NAME="$CLUSTER_NAME" USER_NAME="$USER_NAME" CONTEXT_NAME="$CONTEXT_NAME" \
  python3 - "$workdir/source.json" "$workdir/named.json" <<'PY'
import json, os, sys
source_path, output_path = sys.argv[1:]
with open(source_path) as f:
    cfg = json.load(f)
source_context = cfg.get("current-context")
contexts = cfg.get("contexts") or []
selected = next((c for c in contexts if c.get("name") == source_context), None)
if selected is None and len(contexts) == 1:
    selected = contexts[0]
if selected is None:
    raise SystemExit("fetched kubeconfig has no selectable current context")
old_cluster = selected["context"]["cluster"]
old_user = selected["context"]["user"]
clusters = [c for c in cfg.get("clusters", []) if c.get("name") == old_cluster]
users = [u for u in cfg.get("users", []) if u.get("name") == old_user]
if len(clusters) != 1 or len(users) != 1:
    raise SystemExit("fetched kubeconfig must resolve to exactly one cluster and user")
cfg["clusters"] = [{**clusters[0], "name": os.environ["CLUSTER_NAME"]}]
cfg["users"] = [{**users[0], "name": os.environ["USER_NAME"]}]
cfg["contexts"] = [{
    "name": os.environ["CONTEXT_NAME"],
    "context": {**selected["context"],
                "cluster": os.environ["CLUSTER_NAME"],
                "user": os.environ["USER_NAME"]},
}]
cfg["current-context"] = os.environ["CONTEXT_NAME"]
with open(output_path, "w") as f:
    json.dump(cfg, f)
PY

if [[ -s "$TARGET" ]]; then
  "$KUBECTL_BIN" --kubeconfig "$TARGET" config view --raw --flatten -o json > "$workdir/existing.json"
else
  printf '%s' '{"apiVersion":"v1","kind":"Config","clusters":[],"users":[],"contexts":[]}' > "$workdir/existing.json"
fi

CLUSTER_NAME="$CLUSTER_NAME" USER_NAME="$USER_NAME" CONTEXT_NAME="$CONTEXT_NAME" SET_CURRENT="$SET_CURRENT" \
  python3 - "$workdir/existing.json" "$workdir/named.json" "$workdir/candidate" <<'PY'
import json, os, sys
existing_path, named_path, output_path = sys.argv[1:]
with open(existing_path) as f:
    result = json.load(f)
with open(named_path) as f:
    incoming = json.load(f)
for field, name in (("clusters", os.environ["CLUSTER_NAME"]),
                    ("users", os.environ["USER_NAME"]),
                    ("contexts", os.environ["CONTEXT_NAME"])):
    retained = [entry for entry in result.get(field, []) if entry.get("name") != name]
    result[field] = retained + incoming.get(field, [])
if os.environ["SET_CURRENT"] == "1" or not result.get("current-context"):
    result["current-context"] = os.environ["CONTEXT_NAME"]
with open(output_path, "w") as f:
    json.dump(result, f)
PY

# Validate syntax and the imported context before touching the real file.
"$KUBECTL_BIN" --kubeconfig "$workdir/candidate" config view --raw -o json >/dev/null
"$KUBECTL_BIN" --kubeconfig "$workdir/candidate" config get-contexts "$CONTEXT_NAME" >/dev/null

if [[ -f "$TARGET" ]]; then
  backup="$TARGET.backup.$(date -u +%Y%m%dT%H%M%SZ)"
  cp "$TARGET" "$backup"
  chmod 600 "$backup"
  printf 'backup: %s\n' "$backup"
fi
chmod 600 "$workdir/candidate"
mv "$workdir/candidate" "$TARGET"
chmod 600 "$TARGET"
printf 'installed context %s in %s\n' "$CONTEXT_NAME" "$TARGET"
