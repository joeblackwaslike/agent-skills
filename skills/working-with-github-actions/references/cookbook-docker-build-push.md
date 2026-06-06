# Docker Build and Push to GHCR

Build a multi-arch Docker image and push it to GitHub Container Registry (GHCR) on every
push to `main` and every version tag. Uses only `GITHUB_TOKEN` — no extra secrets required.

## Why GHCR over Docker Hub

- **No rate limits**: Docker Hub throttles unauthenticated and free-tier pulls. GHCR has no
  pull rate limit for packages within the same org/user.
- **`GITHUB_TOKEN` auth**: The token is injected automatically into every Actions run. You
  don't need to rotate credentials or store a `DOCKERHUB_TOKEN` secret.
- **Access control inherits from the repo**: Private repos get private images by default;
  public repos get public images. No separate registry ACL to manage.
- **Provenance and SBOM built in**: GHCR accepts and surfaces OCI attestations from
  `docker/build-push-action`, making supply-chain compliance straightforward.

---

## Workflow

```yaml
# .github/workflows/docker.yml
name: Docker

on:
  push:
    branches: [main]
    # Build on annotated version tags (e.g. v1.0.0, v2.3.1-rc1)
    tags: ["v*"]

# Minimal permissions — only what we actually need.
permissions:
  contents: read
  packages: write  # required to push to GHCR

jobs:
  build-push:
    name: Build & Push
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      # Required for multi-platform builds (linux/amd64 + linux/arm64).
      # Buildx uses QEMU under the hood for cross-compilation.
      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # Login uses the auto-injected GITHUB_TOKEN.
      # github.actor resolves to the user or app that triggered the run.
      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      # metadata-action reads the git ref and generates a consistent set of
      # image tags. The flavors/tags config below produces:
      #
      #   On push to main:
      #     ghcr.io/owner/repo:latest
      #     ghcr.io/owner/repo:main
      #     ghcr.io/owner/repo:sha-<short-sha>
      #
      #   On push of tag v1.2.3:
      #     ghcr.io/owner/repo:1.2.3
      #     ghcr.io/owner/repo:1.2
      #     ghcr.io/owner/repo:1
      #     ghcr.io/owner/repo:latest
      #     ghcr.io/owner/repo:sha-<short-sha>
      - name: Docker metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}
          flavor: |
            # "latest" tag is only applied on version tags, not on every main push.
            # Remove this line if you want latest to track main.
            latest=auto
          tags: |
            # semver tags: 1, 1.2, 1.2.3
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=semver,pattern={{major}}
            # branch name tag (e.g. "main")
            type=ref,event=branch
            # short commit SHA for traceability
            type=sha,prefix=sha-

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          # Push on main or version tags; just build (no push) on PRs.
          # This lets you catch Dockerfile errors on PRs without publishing.
          push: ${{ github.event_name != 'pull_request' }}
          platforms: linux/amd64,linux/arm64
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

          # GitHub Actions cache backend — stores layer cache in the Actions
          # cache store, keyed by ref. Much faster than rebuilding from scratch.
          cache-from: type=gha
          cache-to: type=gha,mode=max

          # Provenance records the build environment (runner, git sha, repo).
          # SBOM records the packages inside the final image.
          # Both are attached as OCI attestations to the image manifest.
          provenance: true
          sbom: true
```

---

## Tag strategy in detail

| Git event | Image tags produced |
|---|---|
| Push to `main` | `latest`, `main`, `sha-abc1234` |
| Push of `v1.2.3` | `1`, `1.2`, `1.2.3`, `latest`, `sha-abc1234` |
| PR from a branch | Build only, no push |

The `latest=auto` flavor means `latest` only moves on version tags, not on every commit to
main. Remove or change `latest=auto` to `latest=true` if you want `latest` to always track
main.

---

## Adding a PR build check (no push)

The `push: ${{ github.event_name != 'pull_request' }}` line already handles this — on PRs
the image is built but not pushed. To make this explicit in the trigger:

```yaml
on:
  push:
    branches: [main]
    tags: ["v*"]
  pull_request:
    branches: [main]   # add this
```

---

## Key decisions

| Decision | Rationale |
|---|---|
| `permissions: packages: write` at job level | Follows least-privilege; only this job needs registry write access |
| `cache-to: type=gha,mode=max` | `mode=max` caches all intermediate layers, not just the final stage — bigger cache but much better hit rates for multi-stage builds |
| `platforms: linux/amd64,linux/arm64` | arm64 covers Apple Silicon dev machines and AWS Graviton instances; build once in CI rather than per developer |
| Provenance + SBOM | Required by many supply-chain policies (SLSA level 1); free to generate, expensive to retrofit later |
