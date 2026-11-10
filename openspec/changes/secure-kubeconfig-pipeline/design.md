# Design

## Context

See proposal.md for motivation. Current state: the kubeconfig for `pck-cputeag` (single worker, server v1.37.0, CN-based client cert, full cluster-admin) sits in the repo root at `0664`, untracked, in a public repo. No specs exist yet. Infomaniak Public Cloud exposes OpenStack Key Manager (Barbican) with application-credential access rules, and Keystone v3 application credentials for automation. The app is a Vite + React static site (`npm run build` → `dist/`) with an existing Azure Static Web Apps workflow that remains untouched.

## Goals / Non-Goals

**Goals:**
- Secret material never enters the repo, its history, the image, or CI logs/artifacts
- One system of record for the kubeconfig (Barbican), consumed identically locally and in CI
- Safe local merge into `~/.kube/config` and a private-only Kubernetes deployment of the app

**Non-Goals:**
- No ingress, TLS, or DNS exposure (ClusterIP + localhost port-forward only)
- No replacement of the Azure Static Web Apps deployment
- No least-privilege Kubernetes RBAC for CI — the owner explicitly chose the full admin kubeconfig; blast radius is accepted and documented
- No rotation of the already-exposed kubeconfig key (accepted, documented with the runbook as remediation)

## Decisions

1. **Barbican as secret store** — chosen for keeping secrets with the cluster's provider. Alternative: GitHub Actions secrets alone (rejected: no safe place for repeated local use, no audit trail outside GitHub). The kubeconfig is stored as **one** secret (`pck-cputeag-kubeconfig`) with `application/octet-stream` payload; Barbican does not support payload overwrite for populated secrets, so rotation = new secret + updated reference.

2. **Application credential with access rules for CI** — created once per environment with role `observer` (read-only Barbican; docs also show example rules under `--role creator` — verify against the project’s policy at bootstrap) and access rules shaped like:
   - `{key-manager, GET, /v1/}`, `{key-manager, GET, /v1/secrets}`, `{key-manager, GET, /v1/secrets/<id>}`, `{key-manager, GET, /v1/secrets/<id>/payload}`
   - **Caveat to verify at bootstrap:** Ubuntu-packaged `python-barbicanclient` rules vs. wildcard `**` behavior, and the region (`dc3-a`) role semantics (docs warn `reader`/`member` differ by region). If `observer` cannot decrypt project-owned secrets, fall back to `creator` with the same narrowly-scoped GET access rules and document it.
   - Secret reference for the CI credential covers only the kubeconfig secret — no ACL widening. **OpenStack scoping does not reduce Kubernetes privilege once the payload is fetched.**
   - Alternative: a second, deployment-scoped ServiceAccount — rejected by the owner (admin for CI), documented as the recommended future hardening.

3. **GitHub Actions secrets hold references only** — `OS_AUTH_URL`, `OS_APPLICATION_CREDENTIAL_ID`, `OS_APPLICATION_CREDENTIAL_SECRET` (+ `OS_REGION_NAME`). GitHub’s automatic masking does not reliably catch arbitrary fetched payloads, so the payload is always written by the job to a private temp file, never echoed, and removed on exit (`trap`/explicit cleanup).

4. **image digest, not tag** — deploy references `ghcr.io/gortizfigueroa/gortiz-portfolio@sha256:…`; package visibility must be checked/set to public (or anonymous pullability verified/configured) at first push, since repo publicity does not imply package publicity.

5. **ClusterIP + port-forward verification** — avoids exposing a pre-ingress app on the node’s NodePort. Service named `portfolio` in namespace `portfolio`; verification via `kubectl port-forward svc/portfolio 18080:80` + `curl -f localhost:18080`.

6. **Safe local install** — `scripts/install-kubeconfig.sh`: fetch payload → build merged config with cluster-specific names (`pck-cputeag` / `kubernetes-admin@pck-cputeag-kubeconfig`) → `validate` merged file (`kubectl config view --raw` or `kubectl --kubeconfig` get --no-headers noninteractive check) → atomic `mv` over `~/.kube/config` with timestamped backup → `chmod 0600` / `~/.kube` `0700`. Idempotent: named resources are replaced, others untouched; current `current-context` preserved unless `--set-current` is passed.

7. **Build locally with podman/docker — unspecified on this machine**: Dockerfile is additive and validated in CI; local build verification is best-effort.

## Risks / Trade-offs

- [CI fetch = cluster-admin on Kubernetes] → Only `main`-branch trusted context gets secrets; concurrency-limited; rollback via previous digest; documented recommendation to introduce scoped CI credentials later.
- [Barbican access rules/role semantics unverified for this project] → Bootstrap step explicitly tests create, fetch-own, and denied-fetch of a canary secret before storing the kubeconfig; fall back documented.
- [Session key exposure (private key printed earlier)] → Documented in README; owner accepted; rotation runbook included.
- [GHCR package private by default] → Cluster pull could fail; mitigation: verify pullability after first push; keep image digest reference; rollback to Azure deployment unaffected.
- [Port-forward is manual verification only, not uptime] → Accepted; proper ingress is out of scope.
- [Small node: 1 vCPU / ~1.6 GB] → replica `requests: cpu=50m, memory=64Mi`, `limits: cpu=200m, memory=128Mi`; nginx is static.
- [kubeconfig removed from root breaks nothing] → it was never referenced by code/CI.

## Migration Plan

1. Bootstrap: verify OpenStack/Barbican access, create canary secret, verify fetch + denied paths, delete canary.
2. Store kubeconfig secret; create application credential; capture IDs (recorded locally only, never committed).
3. Commit change artifacts/code; verify no secret material in tree (`git grep` for payload markers, `git log --all` audit).
4. Move local `pck-cputeag-kubeconfig` aside (into `~/.kube/`), run installer, verify `kubectl --context pck-cputeag get ns`.
5. First push to `main` produces the GHCR image; set package visibility; verify anonymous pull.
6. Deploy job runs; rollout verified; port-forward check returns 200.
7. Rollback path: re-apply previous digest (documented in runbook). Rolling back the app does not roll back the secret reference.

## Open Questions

- None blocking. Barbican role/access-rule specifics are deferred to the bootstrap verification step, with a documented fallback.
