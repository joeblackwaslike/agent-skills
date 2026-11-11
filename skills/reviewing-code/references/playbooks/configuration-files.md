# Configuration files

> Use when the diff: Changes scripts, container images, Terraform, Kubernetes, Compose, CI or application config

*Leans on: explicit over implicit, Fail Fast, least privilege, YAGNI.*

Configuration changes deploy behavior without changing code, and they often skip the tests that code gets. Review them with that in mind: a one-character change in a YAML file can take production down.

- **Is it configuration at all?** Make something configurable only when it differs between environments or deployments. Everything else is a constant in code, with tests and types.
- **Typed and validated at startup.** Settings are loaded into a typed model (`pydantic-settings`, or a zod schema over process.env in TypeScript) that fails fast on missing or invalid values when the process starts, not at first use hours later.
- **Defaults are safe.** Debug off, verbose logging off, authentication on, permissions narrow. A missing value should fail or fall back to the safe choice, not the convenient one.
- **No secrets in config files or the repository.** Secrets come from a secret manager or the environment at runtime. Check `.env` files, Docker Compose files, CI workflows and Kubernetes manifests in the diff for anything that looks like a key or password.
- **Per-environment differences are deliberate.** Diff staging against production config for the changed keys. A value that differs by accident is how "it worked in staging" happens.
- **Least privilege in infrastructure config.** IAM policies, database roles, network rules, container users and CI permissions grant only what is needed. Wildcards (`*`) in permission policies are findings.
- **Pinned and reproducible.** Dependency versions are pinned with a lockfile (`uv.lock`), container images by version or digest, CI actions by version or SHA.
- **Tooling config.** Changes to Ruff, mypy, coverage or pre-commit settings that loosen a rule (adding ignores, lowering strictness, excluding paths) need a reason. Silencing a rule to make a PR pass is the config equivalent of `# type: ignore`.
- **Rollout and rollback.** Feature flags and runtime config have an owner, a default, and a plan for removal once the flag is fully rolled out. Stale flags are dead code with a switch.
- **Validated in CI.** Config files are linted and schema-checked (YAML lint, `kubeconform`, `actionlint`, a dry run of the settings model) so syntax and type errors fail the build instead of the deploy.
