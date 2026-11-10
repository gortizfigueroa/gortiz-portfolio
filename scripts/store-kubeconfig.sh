#!/usr/bin/env bash
# Store a kubeconfig in Barbican without exposing its payload in arguments/logs.
# Usage: store-kubeconfig.sh <local-file> <secret-name>
set -euo pipefail
umask 077

if [[ $# -ne 2 || ! -f "$1" ]]; then
  printf 'usage: %s <local-file> <secret-name>\n' "$0" >&2
  exit 2
fi

OPENSTACK_BIN="${OPENSTACK_BIN:-openstack}"
KEY_MANAGER_URL="${KEY_MANAGER_URL:-https://api.pub1.infomaniak.cloud/keymanager}"
TOKEN="$($OPENSTACK_BIN token issue -f value -c id)"
export BARBICAN_TOKEN="$TOKEN"
unset TOKEN

python3 - "$1" "$2" "$KEY_MANAGER_URL" <<'PY'
import base64, json, os, sys, urllib.request
payload_path, name, base_url = sys.argv[1:]
with open(payload_path, "rb") as f:
    payload = f.read()
body = json.dumps({
    "name": name,
    "secret_type": "opaque",
    "payload": base64.b64encode(payload).decode("ascii"),
    "payload_content_type": "application/octet-stream",
    "payload_content_encoding": "base64",
    "algorithm": "aes",
    "bit_length": 256,
    "mode": "cbc",
}).encode()
request = urllib.request.Request(
    base_url.rstrip("/") + "/v1/secrets",
    data=body,
    method="POST",
    headers={
        "X-Auth-Token": os.environ["BARBICAN_TOKEN"],
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
)
with urllib.request.urlopen(request, timeout=60) as response:
    print(json.load(response)["secret_ref"])
PY
