# Spec Delta

## Purpose

Deploy the portfolio application to the `pck-cputeag` cluster from a public GitHub repository: built into a public-but-verifiable container image on ghcr.io, applied via kubectl with the runtime-fetched kubeconfig, and exposed only on a private ClusterIP for port-forward access.

## ADDED Requirements

### Requirement: Multi-stage reproducible build
The app SHALL be built by a multi-stage Dockerfile that produces an nginx image serving the static `dist/` output, and the build context SHALL exclude secret-like files (kubeconfig patterns, `.env*`, `*.kubeconfig`) via `.dockerignore` and explicit copy paths.

#### Scenario: Clean build context
- **WHEN** `docker build` is run in the repository
- **THEN** the image contains only the built assets and nginx configuration, no kubeconfig or environment files

#### Scenario: Local image works
- **WHEN** the built image is run locally
- **THEN** the portfolio is served on HTTP without external dependencies

### Requirement: Image published to GHCR with verified anonymous pullability
The CI workflow SHALL push the image to ghcr.io tagged with the commit SHA, and the plan SHALL verify (or document how to verify) that anonymous pulls succeed if anonymous access is desired; deployments SHALL reference the image by digest rather than a mutable tag.

#### Scenario: Digest-based deploy
- **WHEN** the deploy step applies manifests
- **THEN** the pod spec references the ghcr.io image by `sha256:` digest

#### Scenario: Package visibility check
- **WHEN** the GHCR package is created after the first push
- **THEN** its visibility is checked/set so the cluster can pull it, and anonymous pullability is verified if public access is enabled

### Requirement: Manifests deploy a single lightweight replica privately
The Kubernetes manifests SHALL create a dedicated namespace, a Deployment with a single replica with resource requests/limits and liveness/readiness probes, and a ClusterIP Service (no NodePort, no external exposure).

#### Scenario: Successful rollout
- **WHEN** the deploy job applies the manifests
- **THEN** the rollout completes within a bounded timeout and the pod becomes Ready

#### Scenario: Private-only exposure
- **WHEN** the manifests are applied
- **THEN** the Service type is ClusterIP and the app is reachable only via localhost-bound port-forward

### Requirement: CI builds PRs without secrets and deploys only trusted code
Pull requests SHALL run build/lint/typecheck without any secrets or deployment credentials; deployment SHALL occur only from pushes to `main` (trusted context), with the kubeconfig fetched at runtime into a private temp dir outside the checkout and cleaned up on all exit paths.

#### Scenario: PR from a fork
- **WHEN** a fork opens a pull request
- **THEN** the workflow builds and tests but cannot read deployment secrets and does not deploy

#### Scenario: Main push deploy
- **WHEN** a commit lands on `main` and the build succeeds
- **THEN** the deploy job fetches the kubeconfig, applies manifests, waits for rollout, and cleans up

### Requirement: Deploy concurrency, timeout, and rollback are defined
Concurrent deploys SHALL be serialized (e.g. concurrency group), the rollout wait SHALL have a bounded timeout, and the documented rollback procedure SHALL allow re-deploying the previous digest.

#### Scenario: Broken deploy
- **WHEN** a rollout fails and the job times out
- **THEN** the previous working digest can be re-applied following the documented rollback procedure

### Requirement: Deployment verification without public exposure
Verification SHALL be performed via `kubectl port-forward` to the ClusterIP Service on a random localhost port, confirming HTTP 200 from the built app before and after deploy.

#### Scenario: Post-deploy check
- **WHEN** the deploy completes
- **THEN** `curl` against the local port-forward URL returns HTTP 200 and the app HTML is served
