# Dockerfiles and container images

> Use when the diff: Changes scripts, container images, Terraform, Kubernetes, Compose, CI or application config

*Leans on: least privilege, KISS, explicit over implicit, Fail Fast.*

- **Pinned base image.** A specific version tag at minimum, a digest (`@sha256:...`) for reproducible builds, and a slim or distroless base where it works. `latest` is a finding.
- **Multi-stage builds.** Compilers and build tools live in a build stage; the final image has only the runtime and the application.
- **Layer order for caching.** Copy the dependency manifest and lockfile, install, then copy the source. Copying the whole repository first reinstalls everything on every code change.
- **Installs from the lockfile.** `uv sync --locked`, `npm ci`, `pnpm install --frozen-lockfile` or `bun install --frozen-lockfile`, never a fresh resolve.
- **No secrets in layers.** Every layer is readable in the final image, so build secrets use BuildKit secret mounts (`RUN --mount=type=secret,...`), never `ARG`, `ENV` or a copied key file. A `.dockerignore` keeps `.env`, `.git` and local build output out of the build context.
- **Non-root.** The final stage runs as a non-root `USER`, with files copied at the right ownership (`COPY --chown`).
- **Signals and shutdown.** `CMD` and `ENTRYPOINT` in exec form (a JSON array) so the process receives signals and shuts down cleanly, with an init process (`tini`, or `--init`) when the app doesn't reap child processes.
- **Runtime behavior.** A health check (in the image or the orchestrator), configuration from environment variables, and logs to stdout and stderr.
- **Small attack surface.** Package caches, compilers and debugging tools don't reach the final image; package installs and their cleanup happen in the same `RUN`.
- **Scanned and linted.** An image scanner (Trivy, Grype, or the registry's) runs in CI with critical vulnerabilities as a blocker, and hadolint checks the Dockerfile.
