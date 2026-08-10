---
title: Hermes
product: vercel
url: /docs/sandbox/ecosystem/hermes
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/hermes"
last_updated: 2026-08-07
type: tutorial
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/ai-gateway/coding-agents/hermes
  - /docs/sandbox/pricing
  - /docs/sandbox/concepts/authentication
  - /docs/sandbox/concepts
summary: Run Hermes Agent terminal commands in isolated Vercel Sandbox microVMs, with models served through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/hermes.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "8b778c2e7f60a460370c5e7243dd42d683cf23e637ce1b335463f4ff396b62a1"
---

# Hermes

[Hermes](https://hermes-agent.nousresearch.com) is Nous Research's open source
terminal coding agent. Its Vercel Sandbox terminal backend runs every command
the agent executes inside an isolated [Vercel Sandbox](/docs/sandbox) microVM
instead of on your machine.

> **💡 Note:** The Sandbox terminal backend and the model provider are independent. Routing
> model requests through [Vercel AI
> Gateway](/docs/ai-gateway/coding-agents/hermes) is configured separately, and
> the Sandbox backend works with any model provider you choose.

## Prerequisites

Before you begin, make sure you have:

- macOS, Linux, or Windows with WSL2
- Hermes 0.20.0 or newer. Older releases do not include the Vercel Sandbox
  backend.
- Vercel CLI installed, logged in, and a Git repository linked to a Vercel
  project with `vercel link`

Sandbox time that Hermes uses is billed as normal
[Vercel Sandbox usage](/docs/sandbox/pricing), including snapshot storage for
persisted task filesystems.

## Getting started

- ### Install Hermes
  Install with the official installer, or update an existing install:
  ```bash filename="Terminal"
  curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
  ```
  If Hermes is already installed, run `hermes update` and confirm the version
  is 0.20.0 or newer with `hermes version`.

- ### Enable the Vercel Sandbox backend
  Point the terminal backend at Vercel Sandbox and give the sandbox a valid
  resource shape:
  ```bash filename="Terminal"
  hermes config set terminal.backend vercel_sandbox
  hermes config set terminal.vercel_runtime node24
  hermes config set terminal.container_cpu 2
  hermes config set terminal.container_memory 4096
  ```
  The runtime is one of `node24` (the default), `node22`, or `python3.13`.
  > **💡 Note:** Vercel Sandbox allocates 2,048 MB of memory per vCPU, so
  > `terminal.container_memory` must be 2,048 times `terminal.container_cpu`.
  > Hermes's generic container default of 5,120 MB is not a valid value for
  > this backend and fails with a memory allocation validation error. Leave
  > `terminal.container_disk` unset: custom disk sizes are not supported.
  You can also configure the same settings interactively with
  `hermes setup terminal`. When the current directory is linked to a Vercel
  project, the setup prompt reads its defaults from the nearest
  `.vercel/project.json`.

- ### Authenticate with Vercel
  For local development, pull a short-lived OIDC token from your linked
  project and export it:
  ```bash filename="Terminal"
  vercel env pull
  export VERCEL_OIDC_TOKEN="<value of VERCEL_OIDC_TOKEN from .env.local>"
  ```
  OIDC tokens are development-only and expire. For deployments and
  long-running Hermes processes, set `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, and
  `VERCEL_TEAM_ID` instead. See
  [Sandbox authentication](/docs/sandbox/concepts/authentication) for both
  methods.

- ### Verify the backend
  Run the built-in diagnostics:
  ```bash filename="Terminal"
  hermes doctor
  ```
  The report should show passing checks for the Vercel runtime, the `vercel`
  SDK, and Vercel auth, including which auth mode is active.

- ### Run Hermes
  Start a conversation with `hermes`. When the agent uses its terminal tool,
  the command executes inside a Sandbox microVM as the `vercel-sandbox` user
  with `/vercel/sandbox` as the workspace root, not on your machine.

## How it works

- **One sandbox per task**: Hermes creates a sandbox on demand when the
  agent first runs a terminal command and reuses it for the rest of the
  task. Sandboxes are short-lived and are recreated automatically as needed.
- **Snapshot persistence**: With `terminal.container_persistent: true` (the
  default), Hermes snapshots the sandbox filesystem per task and restores it
  when the task resumes. Live processes do not survive sandbox recreation.
- **Isolation**: Commands run in a Firecracker microVM with its own
  filesystem and network. See
  [Sandbox concepts](/docs/sandbox/concepts) for the isolation model.

## Configuration

| Setting           | Config key                                          | Environment variable                                  | Default                    |
| ----------------- | --------------------------------------------------- | ----------------------------------------------------- | -------------------------- |
| Terminal backend  | `terminal.backend`                                  | None                                                  | `local`                    |
| Runtime           | `terminal.vercel_runtime`                           | `TERMINAL_VERCEL_RUNTIME`                             | `node24`                   |
| Resources         | `terminal.container_cpu`, `terminal.container_memory` | None                                                | 1 vCPU, 5,120 MB (invalid for this backend; set a valid pair such as 2 and 4096) |
| Development auth  | None                                                | `VERCEL_OIDC_TOKEN`                                   | None                       |
| Access token auth | None                                                | `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID` | None                       |

To route Hermes model requests through Vercel AI Gateway, run
`hermes model` and choose **Vercel AI Gateway**. That configuration is
covered on the [Hermes page in the AI Gateway docs](/docs/ai-gateway/coding-agents/hermes).

## Troubleshooting

### Sandbox creation fails with a memory allocation validation error

The configured memory does not match Vercel's allocation model. Set a valid
pair, for example `terminal.container_cpu 2` with
`terminal.container_memory 4096` (2,048 MB per vCPU).

### The terminal backend reports a permission error

Your `VERCEL_OIDC_TOKEN` has expired. Run `vercel env pull` in the linked
project and export the fresh token. For processes that outlive a development
session, use access-token auth instead.

### Installing with pip does not enable the backend

`pip install 'hermes-agent[vercel]'` installs 0.19.0 from PyPI, which
predates the Vercel Sandbox backend, and warns that the `vercel` extra does
not exist. Install or update with the official installer instead, and
confirm `hermes version` reports 0.20.0 or newer.


---

[View full sitemap](/docs/sitemap)
