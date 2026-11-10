# Proposal

## Why

The newly downloaded cluster-admin kubeconfig for the `pck-cputeag` Kubernetes cluster was sitting untracked in a **public** repository (`gortizfigueroa/gortiz-portfolio`) at mode `0664` — one `git add .` away from leaking full cluster-admin credentials. The same access is needed locally and in CI, so the secret must be managed via a secret manager (Infomaniak Public Cloud Barbican, an OpenStack Key Manager) with the repository holding only non-secret references.

## What Changes

- **BREAKING (local workflow)**: `pck-cputeag-kubeconfig` is removed from the repository root. Local access is provided by a safe installer that merges the Barbican-fetched kubeconfig into `~/.kube/config` under cluster-specific names.
- Store the full kubeconfig as a secret in Infomaniak Public Cloud Barbican; the repository references it by name/ID only.
- Add a scripted, documented fetch path for local use and for CI, backed by a scoped OpenStack Application Credential (read-only access rules restricted to the secret's endpoints); GitHub Actions secrets hold only the credential ID/secret and auth URL — never the kubeconfig.
- Add a containerized deployment pipeline: multi-stage Dockerfile (Vite build → nginx), image published to ghcr.io (package visibility verified), deployed to `pck-cputeag` via Kubernetes manifests and kubectl in GitHub Actions. Exposure stays private: ClusterIP Service + localhost-bound port-forward.
- Add git-hygiene rules (`.gitignore`, `.dockerignore`) and a rotation runbook.
- Documented risks accepted by the owner: CI uses the full admin kubeconfig (OpenStack-side credential is least-privilege, but the Kubernetes credential itself is cluster-admin), and the current kubeconfig private key was printed into an AI-session transcript earlier; the decision is to keep it and document the exposure rather than rotate.
- Rotations create a **new** Barbican secret; the reference is updated. Old Kubernetes credentials are retired separately if compromised.

## Capabilities

### New Capabilities
- `secret-management`: Storing, retrieving, rotating, and referencing the `pck-cputeag` kubeconfig via Infomaniak Barbican and GitHub Actions secrets; guarantees that no secret material enters the public repo or build outputs.
- `kubernetes-deployment`: Building, publishing (ghcr.io), and deploying the portfolio app to the `pck-cputeag` cluster from GitHub Actions using the secrets provided by `secret-management`, verified via port-forward.

### Modified Capabilities
<!-- None - no existing specs in this project. -->

## Impact

- **Files**: `.gitignore` and `.dockerignore` (kubeconfig patterns), `scripts/` (fetch + local install), `Dockerfile`, `nginx.conf`, `k8s/` manifests, new `.github/workflows/deploy.yml`, README/deployment docs.
- **Secrets**: one Barbican secret (full kubeconfig); GitHub Actions secrets `OS_AUTH_URL`, `OS_APPLICATION_CREDENTIAL_ID`, `OS_APPLICATION_CREDENTIAL_SECRET` (+ optionally `OS_REGION_NAME`); ghcr.io push uses `GITHUB_TOKEN`.
- **Cluster**: new `portfolio` namespace, Deployment (1 replica), ClusterIP Service. No ingress/TLS/DNS.
- **CI**: deploy only from trusted `main` runs; PRs build but never receive secrets.
- **Out of scope**: public ingress/TLS/DNS; replacing the Azure Static Web Apps deployment; least-privilege Kubernetes RBAC for CI (explicitly rejected by the owner); rotating the already-exposed kubeconfig key.
- **Open risk**: leaking the kubeconfig if any step commits, logs, caches, or artifacts it; mitigated by fetching only in the deploy job into a private temp dir outside the checkout, never echoing payloads, and cleanup on success/failure.
