# Distribution: Publishing Features & Templates to GHCR

## Prerequisites

```bash
# Login to GHCR
echo $CR_PAT | docker login ghcr.io -u <github-username> --password-stdin
# CR_PAT = GitHub personal access token with write:packages scope

# devcontainer CLI
npm install -g @devcontainers/cli
```

---

## Publishing Features

### Repository structure

Fork [devcontainers/feature-starter](https://github.com/devcontainers/feature-starter) and follow this layout:

```
my-features/
├── src/
│   ├── my-tool/
│   │   ├── devcontainer-feature.json   # id + version trigger publishing
│   │   ├── install.sh
│   │   └── README.md
│   └── another-tool/
│       ├── devcontainer-feature.json
│       └── install.sh
├── test/
│   ├── my-tool/
│   │   ├── test.sh
│   │   └── scenarios.json
│   └── another-tool/
│       └── test.sh
└── .github/workflows/
    └── release.yml
```

### Manual publish

```bash
GITHUB_TOKEN=$CR_PAT devcontainer features publish \
  -r ghcr.io \
  -n <github-owner> \
  ./src
```

Features publish to: `ghcr.io/<owner>/<repo>/<feature-id>:<version>`

### GitHub Actions (recommended)

The feature-starter template includes a release workflow that auto-publishes when `devcontainer-feature.json` version changes. Key steps in the workflow:

```yaml
- uses: devcontainers/action@v1
  with:
    publish-features: true
    base-path-to-features: ./src
  env:
    PUSH_ARTIFACT: true
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Versioning

- Features only republish when `version` in `devcontainer-feature.json` changes
- Use semver: `MAJOR.MINOR.PATCH`
- The registry stores all historical versions
- Reference by major only in devcontainer.json (`ghcr.io/owner/repo/feature:1`) for automatic minor/patch updates

---

## Publishing Templates

### Repository structure

Fork [devcontainers/template-starter](https://github.com/devcontainers/template-starter):

```
my-templates/
├── src/
│   ├── my-template/
│   │   ├── devcontainer-template.json
│   │   └── .devcontainer/
│   │       └── devcontainer.json
│   └── another-template/
│       ├── devcontainer-template.json
│       └── .devcontainer/
│           ├── devcontainer.json
│           └── Dockerfile
└── .github/workflows/
    └── release.yml
```

### Manual publish

```bash
GITHUB_TOKEN=$CR_PAT devcontainer templates publish \
  -r ghcr.io \
  -n <github-owner> \
  ./src
```

Templates publish to: `ghcr.io/<owner>/templates/<template-id>:<version>`

### Joe's templates

Joe's templates publish from `/Users/joe/github/joeblackwaslike/devcontainer/src/`:

```bash
# From the devcontainer repo:
just publish-templates
# which runs:
# GITHUB_TOKEN="$CR_PAT" devcontainer templates publish -r ghcr.io -n joeblackwaslike ./src
```

Published at:
- `ghcr.io/joeblackwaslike/claude-code:latest`
- `ghcr.io/joeblackwaslike/claude-code-extend:latest`

---

## Making Packages Public

**This is required for discovery.** By default GHCR packages are private.

1. Go to `https://github.com/<owner>?tab=packages`
2. Click the package name
3. **Package settings** → **Danger Zone** → **Change visibility** → **Public**

Without this step, the package is invisible to `devcontainer templates apply`, the VS Code UI, and the community index.

---

## Submitting to the Official Index

To list on [containers.dev/features](https://containers.dev/features) or [containers.dev/templates](https://containers.dev/templates):

1. Ensure all packages are public on GHCR
2. Fork [devcontainers/devcontainers.github.io](https://github.com/devcontainers/devcontainers.github.io)
3. Edit `_data/collection-index.yml`:

```yaml
- name: "My Dev Container Features"
  maintainer: "Your Name"
  reference: "ghcr.io/yourname/my-features"
  latest_version: "1.0.0"
```

4. Open a PR — the index auto-discovers all features/templates in the namespace once merged

---

## Image Pre-building (devcontainer.json as an image)

For teams and Codespaces, pre-build the full devcontainer as a regular Docker image:

```bash
# Build and push
devcontainer build \
  --workspace-folder . \
  --image-name ghcr.io/org/myproject-dev:latest \
  --push true

# Multi-arch (recommended for cross-platform teams)
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --push \
  -t ghcr.io/org/myproject-dev:latest \
  .
```

Then reference in devcontainer.json:

```json
{ "image": "ghcr.io/org/myproject-dev:latest" }
```

Joe builds and pushes `ghcr.io/joeblackwaslike/devcontainer:latest` with:

```bash
just push   # builds multi-arch amd64+arm64 and pushes to GHCR
```
