# Dev Container Gotchas & Footguns

## Table of Contents

- [GPU Passthrough](#gpu-passthrough)
- [Bind Mount Performance (macOS/Windows)](#bind-mount-performance-macoswindows)
- [PATH Overwrite](#path-overwrite)
- [Lifecycle Script Failures](#lifecycle-script-failures)
- [postCreateCommand Runs as remoteUser](#postcreatecommand-runs-as-remoteuser)
- [Feature Conflicts & Idempotency](#feature-conflicts--idempotency)
- [Image Cache Not Invalidated](#image-cache-not-invalidated)
- [GHCR Packages Default to Private](#ghcr-packages-default-to-private)
- [Windows Line Endings](#windows-line-endings)
- [containerEnv vs remoteEnv Confusion](#containerenv-vs-remoteenv-confusion)
- [Docker Socket on macOS (OrbStack)](#docker-socket-on-macos-orbstack)
- [initializeCommand Cannot Be Versioned](#initializecommand-cannot-be-versioned)

---

## GPU Passthrough

**Problem:** `"runArgs": ["--gpus all"]` fails on hosts without a GPU (macOS, Windows, or CI) — the container refuses to start.

**Solution A — separate configs:**

```
.devcontainer/
├── cpu/devcontainer.json    # no GPU args
└── gpu/devcontainer.json    # with --gpus all
```

Open with: `devcontainer up --workspace-folder . --config-path .devcontainer/gpu/devcontainer.json`

**Solution B — hostRequirements:**

```json
{
  "hostRequirements": { "gpu": "optional" },
  "runArgs": ["--gpus all"]
}
```

`"optional"` means the container starts without GPU if none is available — but this is **broken on Windows 11/10** (the container still fails to start). Solution A is more reliable cross-platform.

---

## Bind Mount Performance (macOS/Windows)

**Problem:** Bind-mounted source code is 5–10x slower on macOS/Windows because Docker runs in a VM and every file op crosses the VM boundary. `npm install`, git, and file watchers feel sluggish.

**Solution — use a named volume for the workspace:**

```bash
# VS Code command palette:
Dev Containers: Clone Repository in Container Volume
```

Or in devcontainer.json:

```json
{
  "workspaceMount": "source=myproject-vol,target=/workspace,type=volume",
  "workspaceFolder": "/workspace"
}
```

Trade-off: code lives in the volume (inside Docker), not on your host filesystem. Use `devcontainer exec` or VS Code remote explorer to access it.

**For node_modules specifically** (even with host bind mount):

```json
"mounts": [
  "source=myproject-node-modules,target=${containerWorkspaceFolder}/node_modules,type=volume"
]
```

This keeps node_modules in a fast volume while source files stay bind-mounted.

---

## PATH Overwrite

**Problem:** Setting `remoteEnv.PATH` to a bare string overwrites the entire PATH.

```json
// WRONG — completely replaces PATH
"remoteEnv": { "PATH": "/custom/bin" }
```

**Solution:**

```json
// CORRECT — appends to existing PATH
"remoteEnv": { "PATH": "${containerEnv:PATH}:/custom/bin" }
```

Same applies to any variable that should accumulate: `LD_LIBRARY_PATH`, `PYTHONPATH`, etc.

---

## Lifecycle Script Failures

**Problem:** A lifecycle script fails and silently skips everything after it.

Execution order:
```
initializeCommand → onCreateCommand → postCreateCommand → postStartCommand → postAttachCommand
```

If `postCreateCommand` fails, `postStartCommand` and `postAttachCommand` never run.

**Solution:**
- Check the VS Code Output panel → Remote-Containers for lifecycle logs
- Run locally with the CLI: `devcontainer up --workspace-folder .` — it prints script output to stdout
- Add `set -e` to all shell scripts so failures are explicit
- Test lifecycle scripts in isolation before relying on them

---

## postCreateCommand Runs as remoteUser

**Problem:** `postCreateCommand` runs as `remoteUser` (e.g., `vscode`), not root. Commands that need root silently fail or produce permission errors.

```json
// This fails if vscode user can't write to /usr/local/bin:
"postCreateCommand": "cp mybinary /usr/local/bin/"
```

**Solutions:**
- Use `onCreateCommand` for root-level setup (it runs before `remoteUser` context)
- Add `sudo` prefix
- Set `"remoteUser": "root"` (not recommended for general use)
- Do root setup in the Dockerfile instead

---

## Feature Conflicts & Idempotency

**Problem:** Two features both install the same package, or one expects the other to be present but installs before it.

**Symptoms:** Feature install fails, missing binary, wrong version installed.

**Solution:**
- Use `installsAfter` in the dependent feature's `devcontainer-feature.json`
- Use `overrideFeatureInstallOrder` in devcontainer.json to force sequence
- Test feature combinations with a `scenarios.json` entry that uses both
- Make `install.sh` idempotent: detect existing installation and skip

```bash
# Idempotent check
if command -v my-tool >/dev/null 2>&1; then
    echo "my-tool already installed, skipping"
    exit 0
fi
```

---

## Image Cache Not Invalidated

**Problem:** After editing `devcontainer.json`, `Dockerfile`, or `docker-compose.yml`, VS Code doesn't rebuild the container. Old layers are used.

**Solution:** Explicitly trigger a rebuild:
- Command palette: `Dev Containers: Rebuild Container`
- Or `Dev Containers: Rebuild Container Without Cache` (slower but guaranteed fresh)

Note: Rebuild resets the container to its starting state. Any files written directly inside the container (not in bind mounts or volumes) are lost.

---

## GHCR Packages Default to Private

**Problem:** After publishing a feature or template to GHCR, it's invisible to `devcontainer templates apply`, VS Code, and the community index.

**Cause:** GHCR packages default to **private** visibility.

**Solution:**
1. Go to `https://github.com/<owner>?tab=packages`
2. Click the package
3. Package settings → Change visibility → **Public**

This step is easy to forget and will cause confusing "not found" errors.

---

## Windows Line Endings

**Problem:** All files show as modified in git inside the container if the host uses CRLF but the container expects LF.

**Solution:** Add `.gitattributes` to the project:

```
* text=auto
*.sh text eol=lf
*.json text eol=lf
```

---

## containerEnv vs remoteEnv Confusion

**Summary:**

| Property | When set | Visible in |
|---|---|---|
| `containerEnv` | Image build time | All container processes |
| `remoteEnv` | Runtime by VS Code tooling | Terminals, tasks, debug sessions only |

`containerEnv` values are baked into the image. `remoteEnv` values are injected by the VS Code Dev Containers extension at runtime. If you need a variable in a `postCreateCommand` shell script, use `containerEnv` — `remoteEnv` isn't available during lifecycle scripts.

---

## Docker Socket on macOS (OrbStack)

**Problem:** Mounting `/var/run/docker.sock` fails on macOS when using OrbStack (the socket path differs).

**Solution:** Use the OrbStack-specific path:

```json
"mounts": [
  "source=${localEnv:HOME}/.orbstack/run/docker.sock,target=/var/run/docker.sock,type=bind"
]
```

For Docker Desktop users, `/var/run/docker.sock` works directly.

---

## initializeCommand Cannot Be Versioned

**Problem:** `initializeCommand` runs on the host before the container starts. There's no spec mechanism to distribute or version host-side scripts through the devcontainer — the host must already have them.

**Implication:** Don't rely on `initializeCommand` for critical setup in team environments unless the script is already on every team member's machine (e.g., sourced from the repo and documented in README).

**Pattern:** Keep `initializeCommand` to lightweight checks (dependency verification, DNS setup). Put all real setup in `onCreateCommand` or `postCreateCommand` inside the container.
