# devcontainer.json Reference

Full property reference. For authoritative spec see `generated/json-reference.md`.

## Table of Contents

- [Image & Build](#image--build)
- [Features](#features)
- [Workspace & Mounts](#workspace--mounts)
- [User & Permissions](#user--permissions)
- [Environment Variables](#environment-variables)
- [Lifecycle Scripts](#lifecycle-scripts)
- [Ports](#ports)
- [Runtime Args](#runtime-args)
- [VS Code Customizations](#vs-code-customizations)
- [Docker Compose](#docker-compose)
- [Host Requirements](#host-requirements)

---

## Image & Build

```json
// Use a pre-built image (simplest)
{ "image": "mcr.microsoft.com/devcontainers/base:ubuntu-22.04" }

// Build from a Dockerfile
{
  "build": {
    "dockerfile": "Dockerfile",         // relative to devcontainer.json
    "context": "..",                     // build context (default: ".")
    "args": { "NODE_VERSION": "18" },
    "target": "dev",                     // multi-stage target
    "cacheFrom": "ghcr.io/org/image:cache",
    "options": ["--no-cache"]
  }
}
```

**Common base images:**

| Image | Contents |
|---|---|
| `mcr.microsoft.com/devcontainers/base:ubuntu` | Bare Ubuntu, zsh, git, common utils |
| `mcr.microsoft.com/devcontainers/python:3.12` | Python + pip + common tools |
| `mcr.microsoft.com/devcontainers/typescript-node:20` | Node + TypeScript |
| `mcr.microsoft.com/devcontainers/go:1` | Go toolchain |
| `ghcr.io/joeblackwaslike/devcontainer:latest` | Full multi-language + AI tools (see joe-devcontainer.md) |

---

## Features

```json
"features": {
  "ghcr.io/devcontainers/features/node:1": { "version": "lts" },
  "ghcr.io/devcontainers/features/python:1": { "version": "3.12", "installTools": true },
  "ghcr.io/devcontainers/features/docker-in-docker:2": { "version": "latest" },
  "ghcr.io/devcontainers/features/git:1": {}
}
```

Feature references: `<registry>/<namespace>/<id>:<major-version>`

Control installation order when features have conflicts:

```json
"overrideFeatureInstallOrder": [
  "ghcr.io/devcontainers/features/python",
  "ghcr.io/devcontainers/features/node"
]
```

Browse all official features: `generated/features-index.md`

---

## Workspace & Mounts

```json
"workspaceFolder": "/workspace",
"workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind,consistency=cached",

"mounts": [
  // Docker socket (OrbStack on macOS)
  "source=${localEnv:HOME}/.orbstack/run/docker.sock,target=/var/run/docker.sock,type=bind",
  // Named volume for node_modules (better perf than bind on macOS)
  "source=node-modules,target=${containerWorkspaceFolder}/node_modules,type=volume",
  // SSH keys (read-only)
  "source=${localEnv:HOME}/.ssh,target=/root/.ssh,type=bind,readonly"
]
```

**Mount variable interpolation:**

| Variable | Value |
|---|---|
| `${localWorkspaceFolder}` | Absolute path to workspace on host |
| `${containerWorkspaceFolder}` | Workspace path inside container |
| `${localEnv:VAR}` | Host environment variable |
| `${containerEnv:VAR}` | Container environment variable |

---

## User & Permissions

```json
"remoteUser": "vscode",       // user for VS Code terminals, tasks, lifecycle scripts
"containerUser": "vscode",    // user for ALL container processes
"updateRemoteUserUID": true   // sync UID/GID to host user (fixes bind mount permission issues on Linux)
```

`postCreateCommand` runs as `remoteUser`. If you need root for setup, either use `onCreateCommand` (runs as root) or prefix with `sudo`.

---

## Environment Variables

```json
"containerEnv": {
  "NODE_ENV": "development",      // set at image build time; all processes
  "PIPX_HOME": "/usr/local/pipx"
},

"remoteEnv": {
  // Runtime only; visible to VS Code terminals/tasks/debug
  "PATH": "${containerEnv:PATH}:/custom/bin",          // always append, never overwrite
  "ANTHROPIC_API_KEY": "${localEnv:ANTHROPIC_API_KEY}", // forward from host
  "DATABASE_URL": "postgresql://localhost/mydb"
}
```

`userEnvProbe` controls how shell env is captured for `remoteEnv`:

```json
"userEnvProbe": "loginInteractiveShell"   // default; use "none" to skip env capture
```

---

## Lifecycle Scripts

```json
"initializeCommand": "scripts/host-init.sh",    // host only; before container
"onCreateCommand": ["npm", "install"],           // container; once; as root
"postCreateCommand": {
  "install": "pip install -r requirements.txt",  // parallel object form
  "generate": "npm run generate-types"
},
"postStartCommand": "npm start",                 // every container start
"postAttachCommand": "echo 'attached'"           // every editor attach
```

**Execution rules:**
- String: passed to shell
- Array: exec directly (no shell; better for CI)
- Object: parallel execution, keys are task names
- Non-zero exit from any script skips all subsequent scripts

---

## Ports

```json
"forwardPorts": [3000, 5432, "8080:80"],  // container:host optional

"portsAttributes": {
  "3000": {
    "label": "Web App",
    "onAutoForward": "openBrowser"   // notify | openBrowser | openPreview | silent | ignore
  },
  "5432": { "label": "PostgreSQL", "onAutoForward": "silent" }
},

"otherPortsAttributes": {
  "onAutoForward": "notify"           // default for unlisted ports
}
```

---

## Runtime Args

```json
"runArgs": [
  "--cap-add=SYS_PTRACE",              // debug with gdb/lldb
  "--security-opt=seccomp=unconfined", // needed for some syscalls
  "--shm-size=2gb"                     // large shared memory (e.g. PyTorch)
],

"capAdd": ["SYS_PTRACE", "NET_ADMIN"],
"securityOpt": ["seccomp=unconfined"]
```

**GPU:** See `references/gotchas.md` — `--gpus all` is unreliable cross-platform.

---

## VS Code Customizations

```json
"customizations": {
  "vscode": {
    "extensions": [
      "ms-python.python",
      "dbaeumer.vscode-eslint",
      "esbenp.prettier-vscode"
    ],
    "settings": {
      "python.defaultInterpreterPath": "/usr/local/bin/python",
      "editor.formatOnSave": true,
      "files.watcherExclude": { "**/node_modules/**": true }
    }
  }
}
```

Extensions install *inside the container* — they have full access to container tools.

---

## Docker Compose

```json
{
  "dockerComposeFile": ["docker-compose.yml", "docker-compose.override.yml"],
  "service": "app",            // primary service = the dev container
  "runServices": ["db", "redis"],
  "workspaceFolder": "/workspace"
}
```

---

## Host Requirements

```json
"hostRequirements": {
  "cpus": 4,
  "memory": "8gb",
  "storage": "32gb",
  "gpu": "optional"   // true | "optional" | false
}
```
