# Joe's Personal Devcontainer

Repo: `/Users/joe/github/joeblackwaslike/devcontainer`  
Image: `ghcr.io/joeblackwaslike/devcontainer:latest`  
Templates: `ghcr.io/joeblackwaslike/claude-code`, `ghcr.io/joeblackwaslike/claude-code-extend`

## What's Included

### Language Runtimes (via asdf)
Python 3, Node.js LTS, Ruby 4, Go, Rust, Bun, Deno, AWS CLI v2, gcloud, Supabase CLI, pnpm, yarn, jq, yq, just

### AI / Agent Tools
- Claude Code (`@anthropic-ai/claude-code`) — with `--dangerously-skip-permissions` alias
- Gemini CLI (`@google/gemini-cli`)
- OpenAI Codex CLI (`@openai/codex`)
- beads task manager (`bd`)
- gastown multi-agent workspace (`gt`)

### Package Managers
uv, pipx, pnpm, bun, yarn, volta, cargo

### Modern CLI Tools (Rust)
eza (ls), du-dust, diskus, hyperfine, procs, sad, git-delta

### Other CLI Tools
moor (pager), oh-my-posh (prompt), glow (markdown), mkcert (TLS), step (PKI), dolt (versioned SQL), ripgrep, fzf, bat, tmux

### Databases
PostgreSQL 18 (server + client + libpq-dev), Redis, SQLite, Dolt

### System
devcontainer CLI, Docker-in-Docker (via feature), oh-my-zsh + oh-my-posh, 1Password CLI

---

## Templates

### `claude-code` — use the pre-built image directly

```json
{
  "name": "${templateOption:containerName}",
  "image": "ghcr.io/joeblackwaslike/devcontainer:latest",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": { "enableNonRootDocker": "true" }
  }
}
```

Best for: most projects; no custom tooling needed beyond what's in the base image.

### `claude-code-extend` — extend with a project Dockerfile

```dockerfile
FROM ghcr.io/joeblackwaslike/devcontainer:latest

# Add project-specific tools:
# RUN npm install -g @myorg/internal-cli
# RUN pipx install mypackage
# RUN GOPATH=/usr/local go install some/tool@latest
```

Best for: projects that need tools not in the base image.

---

## Key Design Decisions

### Host Identity Passthrough

The devcontainer.json mounts host dotfiles/credentials into the container so they're immediately available without re-configuration:

```json
"mounts": [
  "source=${localEnv:HOME}/.claude,target=/home/vscode/.claude,type=bind",
  "source=${localEnv:HOME}/.ssh,target=/home/vscode/.ssh,type=bind,readonly",
  "source=${localEnv:HOME}/.gitconfig,target=/home/vscode/.gitconfig,type=bind,readonly",
  "source=${localEnv:HOME}/.config/gh,target=/home/vscode/.config/gh,type=bind,readonly",
  "source=${localEnv:HOME}/.orbstack/run/docker.sock,target=/var/run/docker.sock,type=bind"
]
```

Skills symlink: `~/.claude/skills → ~/.agents/skills` is recreated in `setup.sh` because the bind mount creates the directory but not the symlink inside it.

### API Keys via remoteEnv

All API keys are forwarded from the host shell environment (not baked into the image):

```json
"remoteEnv": {
  "ANTHROPIC_API_KEY": "${localEnv:ANTHROPIC_API_KEY}",
  "OPENAI_API_KEY": "${localEnv:OPENAI_API_KEY}",
  "EXA_API_KEY": "${localEnv:EXA_API_KEY}",
  "OP_SERVICE_ACCOUNT_TOKEN": "${localEnv:OP_SERVICE_ACCOUNT_TOKEN}"
}
```

### Lifecycle Scripts

**`postCreateCommand`** → `/usr/local/share/devcontainer/scripts/setup.sh`
- Recreates `~/.claude/skills → ~/.agents/skills` symlink
- Installs mkcert local CA

**`postAttachCommand`** → `/usr/local/share/devcontainer/scripts/discover-deps.sh`
- Auto-detects and installs project dependencies on every attach
- Detection order: `pnpm-lock.yaml` → `bun.lockb` → `yarn.lock` → `package-lock.json` → `package.json`, then `pyproject.toml` (uv), `requirements.txt`, `Cargo.toml`, `go.mod`, `Gemfile`, `.devcontainer/custom-setup.sh`

Set `DISCOVER_DEPS_SKIP=1` to bypass auto-discovery.

### macOS Path Alias

```dockerfile
RUN mkdir -p /Users && ln -sf /home/vscode /Users/joe
```

This makes paths like `/Users/joe/github/...` (from macOS MCP server configs in `settings.json`) resolve correctly inside the container without modification.

---

## Build & Push Workflow

```bash
cd /Users/joe/github/joeblackwaslike/devcontainer

# Build locally (single arch, fast)
just build

# Build multi-arch (amd64 + arm64) and push to GHCR
just push

# Open a shell in the local image
just shell

# Install template into a project interactively
just init /path/to/my-project

# Publish templates to GHCR
just publish-templates
```

The `push` target uses `docker buildx build --platform linux/amd64,linux/arm64 --push`.

---

## Using the Template in a New Project

```bash
# Option 1: interactive installer
bash <(curl -fsSL https://raw.githubusercontent.com/joeblackwaslike/devcontainer/main/scripts/install.sh) /path/to/project

# Option 2: devcontainer CLI
devcontainer templates apply \
  -t ghcr.io/joeblackwaslike/claude-code \
  -a '{"containerName": "my-project"}' \
  -w /path/to/project
```

Then:
1. `code /path/to/project`
2. Command palette → `Dev Containers: Reopen in Container`
3. Edit `.devcontainer/custom-setup.sh` for project-specific setup

---

## Prerequisites for Opening the Container

Before opening, ensure these are exported in your shell:

```bash
export ANTHROPIC_API_KEY=...
export OPENAI_API_KEY=...
export OP_SERVICE_ACCOUNT_TOKEN=...   # 1Password service account
export EXA_API_KEY=...                # and other MCP server keys
```

Required host directories: `~/.claude`, `~/.agents`, `~/.ssh`, `~/.config/gh`, `~/.orbstack/run/docker.sock`
