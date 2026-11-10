# Spec Delta

## Purpose

Manage the `pck-cputeag` cluster kubeconfig without it ever entering the public repository: stored in Infomaniak Public Cloud Barbican, referenced by non-secret identifiers, and consumed locally and in CI through scoped, machine-readable fetch paths.

## ADDED Requirements

### Requirement: Repository contains no kubeconfig secret material
The repository SHALL NOT contain the kubeconfig, its client key, client certificate, CA private material, or any copy of them, in the working tree, in git history, or in generated artifacts.

#### Scenario: Fresh clone audit
- **WHEN** a fresh clone of the repository is searched for kubeconfig contents (server address as configured host, client certificate/key payloads)
- **THEN** no match is found

#### Scenario: Accidental add attempt
- **WHEN** a developer attempts to `git add` a kubeconfig-style file (e.g. `*-kubeconfig`, `*.kubeconfig`, `kubeconfig`)
- **THEN** git ignores the file (or requires explicit `git add -f` with a visible warning)

### Requirement: Kubeconfig stored in Barbican as the system of record
The full kubeconfig SHALL be stored as one Barbican secret in the project that owns the cluster, and the repository SHALL reference it only by non-secret metadata: secret name, region, auth URL, and application credential identifiers.

#### Scenario: CI fetches the kubeconfig
- **WHEN** the CI deploy job starts
- **THEN** it authenticates to the key-manager service with the application credential and retrieves the kubeconfig payload at runtime, without the payload appearing in logs, caches, or artifacts

### Requirement: CI application credential is least-privilege on OpenStack
The application credential used by CI SHALL be restricted to read-only Barbican operations on the specific secret (and the endpoints required for discovery), via role `observer`/`creator` with explicit access rules; GitHub Actions secrets shall contain only the credential ID, its secret, and the auth URL. Note: retrieving the kubeconfig grants cluster-admin on Kubernetes regardless of OpenStack scoping.

#### Scenario: Access rule enforcement
- **WHEN** the application credential attempts an unrelated API operation (e.g. write to another service, read a different secret)
- **THEN** the operation is denied

#### Scenario: GitHub secret audit
- **WHEN** the repository's GitHub Actions secrets and variables are listed
- **THEN** they contain credential references only, no kubeconfig material

### Requirement: Safe local installation into ~/.kube/config
The local install SHALL merge the fetched kubeconfig under cluster-specific cluster, user, and context names without overwriting unrelated entries, SHALL preserve the user's current context choice, SHALL validate the merged file before atomically replacing `~/.kube/config`, SHALL keep a protected backup, and SHALL set `0700`/`0600` permissions.

#### Scenario: Existing config preserved
- **WHEN** a developer already has clusters/users in `~/.kube/config`
- **THEN** after install, all unrelated entries and the current context are unchanged, and a `pck-cputeag` context is available

#### Scenario: Idempotent reinstall
- **WHEN** the install is run twice
- **THEN** the second run produces an equivalent config with no duplicate entries

### Requirement: Rotation uses a new secret reference
Rotation SHALL store a new Barbican secret, update the application credential's access rules and the documented reference, verify retrieval, and then retire the old stored secret; compromising the Kubernetes certificate requires a separate provider-supported response not covered here.

#### Scenario: Rotation drill
- **WHEN** a rotation is executed following the runbook
- **THEN** the new secret is fetchable by CI and locally, the reference in documentation is updated, and the old secret is deleted

### Requirement: Temporary secret files are handled safely
Any fetched kubeconfig written to disk (local or CI) SHALL live outside the repository checkout in a private temp directory, SHALL be removed on success and on failure, and SHALL never be echoed or passed as command-line arguments.

#### Scenario: Failed CI deploy
- **WHEN** the deploy job fails mid-way
- **THEN** the temporary kubeconfig is removed and does not appear in logs or artifacts

### Requirement: Documented exposure acceptance
The repository documentation SHALL record that the current kubeconfig private key was printed into an AI-session transcript and that the owner chose to keep it, instead of rotating, with the rotation runbook referenced as the remediation path.

#### Scenario: New contributor reads docs
- **WHEN** a new contributor reads the deployment documentation
- **THEN** the credential-exposure risk and the rotation option are explicitly documented
