#!/usr/bin/env bash
# Fetch the pck-cputeag kubeconfig from Barbican into a private temporary file.
# The caller owns the printed file and must remove it (and its parent directory).
set -euo pipefail
umask 077

SECRET_HREF="${KUBECONFIG_SECRET_HREF:-https://api.pub1.infomaniak.cloud/keymanager/v1/secrets/87658041-0a1f-4931-84b7-dd181e34e2e7}"
OPENSTACK_BIN="${OPENSTACK_BIN:-openstack}"

if ! command -v "$OPENSTACK_BIN" >/dev/null 2>&1; then
  printf 'error: OpenStack CLI not found: %s\n' "$OPENSTACK_BIN" >&2
  exit 1
fi

workdir="$(mktemp -d "${TMPDIR:-/tmp}/pck-cputeag-fetch.XXXXXX")"
payload="$workdir/kubeconfig"
cleanup_on_failure() {
  rm -rf "$workdir"
}
trap cleanup_on_failure ERR INT TERM

# Authentication comes from OS_CLOUD/clouds.yaml or OS_APPLICATION_CREDENTIAL_*.
# Redirect CLI metadata so only the private payload path reaches stdout.
"$OPENSTACK_BIN" secret get \
  --file "$payload" \
  --payload_content_type application/octet-stream \
  "$SECRET_HREF" >/dev/null
chmod 600 "$payload"

trap - ERR INT TERM
printf '%s\n' "$payload"
