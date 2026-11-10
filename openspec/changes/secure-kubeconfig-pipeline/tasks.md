# Tasks

## 1. Hygiene and local-repo prep

- [x] 1.1 Extend `.gitignore` (`*-kubeconfig`, `*.kubeconfig`, `kubeconfig`, `.kube/`) and add `.dockerignore` (node_modules, dist, .git, kubeconfig patterns, `.env*`); verify `git check-ignore pck-cputeag-kubeconfig` matches and `git status` shows no kubeconfig
- [x] 1.2 Install OpenStack CLI locally (`pip install --user python-openstackclient python-barbicanclient`) and verify `openstack --version` succeeds (record the project's key-manager endpoint and region) — installed via uv venv at /tmp/opencode/openstack-venv (openstack 10.5.0, barbican 7.6.0); project endpoint/region still to be recorded at 2.1
- [x] 1.3 Move the repo-root `pck-cputeag-kubeconfig` to `~/.kube/pck-cputeag.orig` with `0700`/`0600` after Barbican storage is verified (defer deletion until then); verify the repo root no longer contains it

## 2. Bootstrap and store the kubeconfig in Barbican

- [x] 2.1 Authenticate to the Infomaniak project and discover the `key-manager` endpoint in region `dc3-a`; verify `openstack secret list` succeeds (if Barbican is unavailable in the project, stop and escalate — do not proceed with a different store without owner approval) — authenticated via application credential in ~/.config/openstack/clouds.yaml (cloud `openstack`, project PCP-3U7ZOH7, region dc3-a); key-manager endpoint https://api.pub1.infomaniak.cloud/keymanager; `secret list` returns empty
- [x] 2.2 Create a canary secret, then fetch its payload via a read-only-scoped application credential; confirm exact access-rule endpoint paths for this deployment; verify a different secret's payload is denied; delete the canary; record the working role + access rules — verified role `observer` + exact GET rules for `/v1/`, `/v1/secrets/<id>`, `/v1/secrets/<id>/payload`; allowed payload round-tripped, unrelated read and secret write denied (401); canaries and test credential removed
- [x] 2.3 Store the kubeconfig file as Barbican secret `pck-cputeag-kubeconfig`; verify `openstack secret get --payload` round-trips byte-identical content (hash compare) and that its content type is recorded — stored as secret ID `87658041-0a1f-4931-84b7-dd181e34e2e7`, `application/octet-stream`; SHA-256 `88cfb722…fc395a` matched via direct API and CLI (initial CLI binary upload was discarded/replaced with the documented base64 API representation)
- [x] 2.4 Create the CI application credential (role observer + access rules from 2.2, fallback creator + GET-only rules documented in design.md); store `OS_AUTH_URL`, `OS_APPLICATION_CREDENTIAL_ID`, `OS_APPLICATION_CREDENTIAL_SECRET`, `OS_REGION_NAME` as GitHub Actions secrets; verify they exist via `gh secret list` — credential `af981e8e…d7215` scoped to secret `87658041…34e2e7`, round-trip verified byte-identical, all four GitHub secrets listed
- [x] 2.5 Delete or relocate the local `pck-cputeag.orig` copy only after 2.4 verification end-to-end; document where the original is kept (or confirm deletion) — retained at `~/.kube/pck-cputeag.orig` mode `0600` and documented in README

## 3. Local install script and docs

- [x] 3.1 Write `scripts/fetch-kubeconfig.sh` (Barbican payload → stdout or private temp file outside repo, mode `0600`, `trap` cleanup on failure, never echo payload); verify round-trip against the stored secret
- [x] 3.2 Write `scripts/install-kubeconfig.sh` (fetch → merge into `~/.kube/config` under cluster-specific names: cluster `pck-cputeag`, user `pck-cputeag-admin`, context `pck-cputeag-admin@pck-cputeag`; preserve current context unless `--set-current`; `0700` dir / `0600` files; timestamped backup; atomic replace; validate merged config before replace); verify repeated runs are idempotent and existing entries/context survive
- [x] 3.3 Document local setup and the credential-exposure acceptance note + rotation runbook in `README.md`; verify the documented commands run as written
- [x] 3.4 Document rotation (new secret → recreate/update application credential and reference → verify → delete old secret) in `docs/rotation.md`; verify the steps against a canary rotation — store/fetch round-trip byte-identical; scoped credential steps verified in 2.2/2.4; canary deleted

## 4. Container image

- [x] 4.1 Add multi-stage `Dockerfile` (node:22 build → `npm ci && npm run build` → nginx:alpine serving `dist/`) and `nginx.conf` (gzip, SPA fallback, security headers); build locally if docker/podman is available, otherwise rely on CI and verify in 6.1
- [x] 4.2 Add `.dockerignore` exclusions for secret-like files (1.1) and verify `docker build` (or CI) succeeds and the image contains only assets + nginx config (`docker history`/`docker run` smoke check) — Podman build succeeded; localhost container returned HTTP 200 with portfolio HTML; image secret scan clean

## 5. Kubernetes manifests

- [x] 5.1 Add `k8s/namespace.yaml`, `k8s/deployment.yaml` (namespace `portfolio`, 1 replica, requests `cpu=50m,memory=64Mi`, limits `cpu=200m,memory=128Mi`, liveness+readiness probes on `/`, port 80) and `k8s/service.yaml` (ClusterIP, port 80); verify `kubectl apply --dry-run=server -f k8s/` passes against the cluster — created namespace first so server dry-run can resolve namespaced resources; Deployment/Service remain dry-run only
- [x] 5.2 Document rollback (re-apply previous image digest) in `docs/deployment.md`; verify the documented command is valid — `kubectl set image --local` rendering verified

## 6. GitHub Actions workflow

- [ ] 6.1 Add `.github/workflows/deploy.yml`: PR job (checkout, setup-node, `npm ci`, `lint`, `typecheck`, `build` — no secrets); `main`-only deploy job (build → push to `ghcr.io/gortizfigueroa/gortiz-portfolio` tagged with SHA, then fetch kubeconfig via 2.4 secrets into a private temp dir, `kubectl apply` with the pushed image digest, `kubectl rollout status --timeout=180s`, port-forward + `curl -f` check, cleanup temp dir on all paths, `concurrency: deploy-portfolio`); verify the workflow is green on `main` post-merge
- [ ] 6.2 After first push, set/check GHCR package visibility, enable and verify anonymous pull (`docker pull ghcr.io/gortizfigueroa/gortiz-portfolio:<sha>` unauthenticated); verify the cluster pod pulls the image and becomes Ready
- [x] 6.3 Verify the fork/PR path runs without secrets (dry-run the workflow on a PR or inspect that no secrets are referenced in the PR job) and confirm the deploy job does not run — static inspection: PR `check` job contains no secret references; `publish` and `deploy` both require a `push` event on `refs/heads/main`

## 7. Integration verification

- [ ] 7.1 Full end-to-end: fresh CI run on `main` deploys; `kubectl --context <local> get pods -n portfolio` shows Running; `kubectl port-forward svc/portfolio -n portfolio 18080:80` + `curl -f localhost:18080` returns HTTP 200; temp files absent afterwards
- [x] 7.2 Repo audit: `git grep -I -E 'client-key[-]data|BEGIN RSA PRIVATE[ ]KEY'` returns nothing; `git log --all -- pck-cputeag-kubeconfig` is empty; `git check-ignore` passes for kubeconfig patterns; document the audit result in the PR/commit message — all checks passed; results included in the branch commit message
- [ ] 7.3 Follow the failure path: temporarily break the health check, observe `rollout status` timeout, execute the documented rollback to the previous digest, confirm the app recovers, then restore

## Workflow follow-up

- Archive the change (`/opsx-archive`) after implementation review passes.
- Consider the hardening follow-ups out of this change's scope: public ingress/TLS (Ingress + Cilium), namespace-scoped CI kubeconfig or ServiceAccount token, org-level secret scanning in CI.
