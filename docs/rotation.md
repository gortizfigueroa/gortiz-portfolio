# Kubeconfig rotation runbook

Use this procedure when the `pck-cputeag` client certificate approaches expiry (currently **2027-11-03**) or must be replaced. Rotating the stored secret does not revoke a compromised Kubernetes certificate: certificate revocation/reissuance must be handled through Infomaniak KaaS separately.

## Prerequisites

- A renewed kubeconfig obtained from Infomaniak KaaS, stored outside this repository with mode `0600`.
- The `openstack-password` profile in `~/.config/openstack/clouds.yaml`. Application credentials cannot create other application credentials.
- `python3`, `kubectl`, `openstack`, and `gh` authenticated to this repository.

Set the input path without copying it into the repository:

```bash
NEW_KUBECONFIG=/absolute/path/to/new-kubeconfig
chmod 600 "$NEW_KUBECONFIG"
```

## 1. Store a new secret

Barbican does not replace the payload of an already populated secret. Create a new secret instead:

```bash
NEW_SECRET_HREF="$(OS_CLOUD=openstack-password scripts/store-kubeconfig.sh \
  "$NEW_KUBECONFIG" "pck-cputeag-kubeconfig-$(date -u +%Y%m%dT%H%M%SZ)")"
NEW_SECRET_ID="${NEW_SECRET_HREF##*/}"
printf 'New secret ID: %s\n' "$NEW_SECRET_ID"
```

The helper sends the file contents directly from disk to Barbican; it never places the payload in shell arguments or output.

## 2. Create a replacement read-only CI credential

Use a private temporary file because the credential secret is displayed only once:

```bash
umask 077
CI_CREDENTIAL_FILE="$(mktemp)"
export OS_CLOUD=openstack-password

openstack application credential create \
  "portfolio-ci-barbican-reader-$(date -u +%Y%m%d)" \
  --role observer \
  --access-rules "[
    {\"service\":\"key-manager\",\"method\":\"GET\",\"path\":\"/v1/\"},
    {\"service\":\"key-manager\",\"method\":\"GET\",\"path\":\"/v1/secrets/$NEW_SECRET_ID\"},
    {\"service\":\"key-manager\",\"method\":\"GET\",\"path\":\"/v1/secrets/$NEW_SECRET_ID/payload\"}
  ]" \
  --description "GitHub Actions: read only the rotated pck-cputeag kubeconfig" \
  -f json > "$CI_CREDENTIAL_FILE"
```

## 3. Verify before switching CI

```bash
unset OS_CLOUD
export OS_AUTH_TYPE=v3applicationcredential
export OS_AUTH_URL=https://api.pub1.infomaniak.cloud/identity
export OS_REGION_NAME=dc3-a
export OS_APPLICATION_CREDENTIAL_ID="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["ID"])' "$CI_CREDENTIAL_FILE")"
export OS_APPLICATION_CREDENTIAL_SECRET="$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["Secret"])' "$CI_CREDENTIAL_FILE")"

FETCHED="$(KUBECONFIG_SECRET_HREF="$NEW_SECRET_HREF" scripts/fetch-kubeconfig.sh)"
cmp "$NEW_KUBECONFIG" "$FETCHED"
rm -rf "$(dirname "$FETCHED")"
```

`cmp` must produce no output and return zero.

## 4. Switch the references

Update GitHub without putting values on the command line:

```bash
python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["ID"], end="")' "$CI_CREDENTIAL_FILE" \
  | gh secret set OS_APPLICATION_CREDENTIAL_ID --repo gortizfigueroa/gortiz-portfolio
python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["Secret"], end="")' "$CI_CREDENTIAL_FILE" \
  | gh secret set OS_APPLICATION_CREDENTIAL_SECRET --repo gortizfigueroa/gortiz-portfolio
```

Replace the old secret href in `scripts/fetch-kubeconfig.sh` with `NEW_SECRET_HREF`, then commit and push that non-secret reference change. Run the installer locally:

```bash
unset OS_AUTH_TYPE OS_APPLICATION_CREDENTIAL_ID OS_APPLICATION_CREDENTIAL_SECRET
OS_CLOUD=openstack scripts/install-kubeconfig.sh --set-current
kubectl --context pck-cputeag-admin@pck-cputeag get ns
```

Confirm a fresh GitHub Actions deployment succeeds before deleting old resources.

## 5. Retire old resources

```bash
export OS_CLOUD=openstack-password
openstack application credential delete OLD_APPLICATION_CREDENTIAL_ID
openstack secret delete OLD_SECRET_HREF
rm -f "$CI_CREDENTIAL_FILE"
unset NEW_KUBECONFIG NEW_SECRET_HREF NEW_SECRET_ID
```

Deleting the old Barbican secret does not revoke any already downloaded kubeconfig. Use the provider's cluster credential revocation process when responding to compromise.
