# Kubernetes deployment and rollback

## Release flow

The `Deploy portfolio` workflow runs secret-free checks for pull requests. A push to `main` additionally:

1. Builds and pushes `ghcr.io/gortizfigueroa/gortiz-portfolio:<commit-sha>`.
2. Records the image's immutable `sha256` digest.
3. Fetches the kubeconfig from Barbican into a private temporary directory.
4. Applies the namespace and ClusterIP Service, renders the Deployment with that digest, and applies it.
5. Waits up to 180 seconds for rollout and verifies HTTP 200 through a localhost port-forward.
6. Removes the temporary credential directory whether the job succeeds or fails.

The all-zero digest in `k8s/deployment.yaml` is a placeholder and is never used by CI.

## GHCR visibility

The repository being public does not automatically make its GHCR package public. After the first workflow run, configure the package's visibility and verify anonymous access from a logged-out container client:

```bash
docker logout ghcr.io
docker pull ghcr.io/gortizfigueroa/gortiz-portfolio:COMMIT_SHA
```

If anonymous pull is not desired, create a Kubernetes `imagePullSecret` and configure the pod's `imagePullSecrets` instead; do not commit registry credentials.

## Manual verification

```bash
kubectl --context pck-cputeag-admin@pck-cputeag -n portfolio get pods
kubectl --context pck-cputeag-admin@pck-cputeag -n portfolio get svc portfolio
kubectl --context pck-cputeag-admin@pck-cputeag -n portfolio \
  port-forward --address 127.0.0.1 svc/portfolio 18080:80
```

In another terminal:

```bash
curl -f http://127.0.0.1:18080/
```

Stop port-forward with Ctrl-C. The app has no public endpoint in this change.

## Rollback to a previous image digest

Record the currently running image before a manual deployment:

```bash
PREVIOUS_IMAGE="$(kubectl --context pck-cputeag-admin@pck-cputeag \
  -n portfolio get deployment portfolio \
  -o jsonpath='{.spec.template.spec.containers[?(@.name=="portfolio")].image}')"
printf '%s\n' "$PREVIOUS_IMAGE"
```

The value must have the form `ghcr.io/gortizfigueroa/gortiz-portfolio@sha256:...`. To restore it after a failed or unhealthy release:

```bash
kubectl --context pck-cputeag-admin@pck-cputeag -n portfolio \
  set image deployment/portfolio portfolio="$PREVIOUS_IMAGE"
kubectl --context pck-cputeag-admin@pck-cputeag -n portfolio \
  rollout status deployment/portfolio --timeout=180s
```

Then repeat the port-forward HTTP check. If no previous image was recorded, select a known-good digest from the GHCR package or the workflow logs and assign it to `PREVIOUS_IMAGE` before running the same commands. Rolling back the app does not change the Barbican secret reference.
