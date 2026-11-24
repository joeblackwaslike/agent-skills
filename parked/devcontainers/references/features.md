# Dev Container Features

Features are self-contained, shareable installation units — the preferred way to add tools to a devcontainer.

## Table of Contents

- [Using Features](#using-features)
- [Authoring a Feature](#authoring-a-feature)
- [devcontainer-feature.json Schema](#devcontainer-featurejson-schema)
- [install.sh Patterns](#installsh-patterns)
- [Feature Testing](#feature-testing)
- [Installation Order & Conflicts](#installation-order--conflicts)

---

## Using Features

```json
"features": {
  "ghcr.io/devcontainers/features/node:1": { "version": "lts" },
  "ghcr.io/devcontainers/features/python:1": { "version": "3.12" },
  "ghcr.io/devcontainers/features/docker-in-docker:2": {},
  "ghcr.io/devcontainers/features/git-lfs:1": {}
}
```

Reference format: `<registry>/<namespace>/<feature-id>:<major>` — pin to major version, not patch.

Use `:latest` only for rapid prototyping; it breaks reproducibility.

**Finding features:**
- Official: `generated/features-index.md` (searchable list of all published features)
- Browse: https://containers.dev/features
- Official collection: `ghcr.io/devcontainers/features/<name>:1`
- Community collections: `ghcr.io/<owner>/<repo>/<name>:1`

**Commonly used official features:**

| Feature | ID |
|---|---|
| Node.js | `ghcr.io/devcontainers/features/node:1` |
| Python | `ghcr.io/devcontainers/features/python:1` |
| Go | `ghcr.io/devcontainers/features/go:1` |
| Rust | `ghcr.io/devcontainers/features/rust:1` |
| Docker-in-Docker | `ghcr.io/devcontainers/features/docker-in-docker:2` |
| Docker (outside container) | `ghcr.io/devcontainers/features/docker-outside-of-docker:1` |
| Git LFS | `ghcr.io/devcontainers/features/git-lfs:1` |
| GitHub CLI | `ghcr.io/devcontainers/features/github-cli:1` |
| AWS CLI | `ghcr.io/devcontainers/features/aws-cli:1` |
| Terraform | `ghcr.io/devcontainers/features/terraform:1` |
| kubectl | `ghcr.io/devcontainers/features/kubectl-helm-minikube:1` |

---

## Authoring a Feature

Directory structure:

```
src/my-feature/
├── devcontainer-feature.json   # metadata + option definitions
├── install.sh                  # installation entrypoint (runs as root)
└── README.md                   # optional documentation

test/my-feature/
├── test.sh                     # auto-run test script
└── scenarios.json              # complex multi-option test scenarios
```

Bootstrap from the official starter: https://github.com/devcontainers/feature-starter

---

## devcontainer-feature.json Schema

```json
{
  "id": "my-tool",             // must match directory name; no spaces
  "version": "1.0.0",          // semver; bump triggers republish
  "name": "My Tool",
  "description": "Installs my-tool with configurable version",
  "documentationURL": "https://github.com/me/my-features",
  "keywords": ["my-tool", "cli"],

  "options": {
    "version": {
      "type": "string",
      "default": "latest",
      "description": "Version of my-tool to install"
    },
    "installExtra": {
      "type": "boolean",
      "default": false,
      "description": "Install optional extras"
    }
  },

  "installsAfter": [
    "ghcr.io/devcontainers/features/common-utils"
  ],

  "containerEnv": {
    "MY_TOOL_HOME": "/opt/my-tool"
  }
}
```

**Key fields:**

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Lowercase, hyphenated; matches directory name |
| `version` | Yes | Bump to trigger republish |
| `name` | Yes | Human-readable display name |
| `options` | No | User-configurable; passed as env vars to install.sh |
| `installsAfter` | No | Soft dependency ordering |
| `dependsOn` | No | Hard dependency — these install first unconditionally |
| `containerEnv` | No | Env vars injected at build time |
| `remoteEnv` | No | Env vars for runtime tooling |
| `capAdd` | No | Linux capabilities to add |
| `privileged` | No | Run as privileged container |

---

## install.sh Patterns

```bash
#!/bin/bash
set -e

# Options are available as uppercase env vars
# e.g., "version" option → $VERSION, "installExtra" → $INSTALLEEXTRA
VERSION="${VERSION:-latest}"
INSTALLEXTRA="${INSTALLEXTRA:-false}"

echo "Installing my-tool version $VERSION..."

apt-get update -y
apt-get install -y curl

# Resolve "latest" to a concrete version
if [ "$VERSION" = "latest" ]; then
    VERSION=$(curl -fsSL https://api.github.com/repos/org/my-tool/releases/latest | jq -r .tag_name | ltrimstr "v")
fi

# Architecture-aware download
ARCH=$(uname -m)
case "$ARCH" in
    aarch64|arm64) ARCH_LABEL="arm64" ;;
    *) ARCH_LABEL="amd64" ;;
esac

curl -fsSL "https://github.com/org/my-tool/releases/download/v${VERSION}/my-tool-linux-${ARCH_LABEL}" \
    -o /usr/local/bin/my-tool
chmod +x /usr/local/bin/my-tool

if [ "$INSTALLEXTRA" = "true" ]; then
    my-tool install-extra
fi

echo "Done! my-tool $(my-tool --version)"
```

**Key rules for install.sh:**
- Runs as **root** during container build
- Use `set -e` to fail fast on errors
- Option env vars are uppercase versions of the option key (camelCase stripped)
- Must be idempotent — detect existing installs and skip or upgrade gracefully
- Use POSIX-compatible shell (`#!/bin/bash` is fine; avoid bash 4+ features for portability)
- Clean up package lists: `rm -rf /var/lib/apt/lists/*` after apt installs

---

## Feature Testing

**Auto-generated test:** The CLI creates a container with the feature installed and runs `test/<feature>/test.sh`. Passes if exit code is 0.

```bash
# test/my-feature/test.sh
#!/bin/bash
set -e

source dev-container-features-test-lib

check "my-tool installed" my-tool --version
check "version matches" bash -c "my-tool --version | grep -q '1.2'"

reportResults
```

**Scenarios** (`test/my-feature/scenarios.json`):

```json
{
  "install_with_extra": {
    "image": "mcr.microsoft.com/devcontainers/base:ubuntu-22.04",
    "features": {
      "../my-feature": { "version": "latest", "installExtra": true }
    }
  },
  "install_on_alpine": {
    "image": "alpine:latest",
    "features": {
      "../my-feature": {}
    }
  }
}
```

**Running tests:**

```bash
# Test a local feature
devcontainer features test -f ./src/my-feature

# Test specific scenario
devcontainer features test -f ./src/my-feature --scenario install_with_extra

# Test against a specific base image
devcontainer features test -f ./src/my-feature --base-image ubuntu:24.04
```

---

## Installation Order & Conflicts

Features install in rounds with dependency resolution:

1. Features with no dependencies install first
2. `dependsOn` creates hard ordering — referenced features MUST install before this one
3. `installsAfter` creates soft ordering — influences order among already-queued features
4. `overrideFeatureInstallOrder` in devcontainer.json lets users force a specific order

```json
// If python and pip-tools conflict, force python first:
"overrideFeatureInstallOrder": ["ghcr.io/devcontainers/features/python"]
```

**Conflict resolution:**
- Check if both features try to install the same package/tool
- Use `installsAfter` in the dependent feature to declare ordering
- Test the combination with a scenario that installs both
