---
title: Herdr
product: vercel
url: /docs/sandbox/ecosystem/herdr
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/herdr"
last_updated: 2026-08-06
type: tutorial
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/sandbox/pricing
  - /docs/sandbox/concepts/persistent-sandboxes
summary: Run terminal-based coding agents in persistent Vercel Sandbox microVMs from Herdr. Review and apply their changes locally as Git patches.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/herdr.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "1b21eaa31e9d580dcb6ac4aade67b4335cec568d6f7bc70b301084caabebd56b"
---

# Herdr

[Herdr](https://herdr.dev) is a terminal workspace that runs coding agents in
parallel, one per pane (tmux for agents). The
[Vercel plugin](https://github.com/vercel-labs/herdr-vercel-sandbox-plugin)
runs each agent in its own persistent [Vercel Sandbox](/docs/sandbox): the
pane becomes a live terminal into the sandbox, and the agent's changes come
back as a Git patch you review and apply locally.

## Prerequisites

Before you begin, make sure you have:

- macOS or Linux
- Herdr 0.7.5 or newer
- Node.js 20 or newer
- A Git repository for your project
- Vercel CLI 56.2.0 or newer, logged in to the account that should own the
  sandbox

> **💡 Note:** The example config sets a one-hour `timeout`, which requires a Pro or
> Enterprise plan. On Hobby, set `timeout` to `45m` or less. See [runtime
> limits](/docs/sandbox/pricing#runtime-limits).

## Getting started

- ### Install the plugin
  Install the plugin from its GitHub repository:
  ```bash
  herdr plugin install vercel-labs/herdr-vercel-sandbox-plugin
  ```
  Herdr shows a preview of the plugin's actions and panes before it completes
  the installation. No keybinding setup is required: every plugin action is
  available from Herdr's action menu. See
  [optional keybindings](#optional-keybindings) to bind actions to keys.

- ### Connect your Vercel account
  From the Git worktree you will open in Herdr, sign in and link the project
  that should own the sandbox:
  ```bash
  vercel login
  vercel link
  ```
  If you skip this step, Start opens the official login or linking flow in a
  local pane instead of creating a sandbox.

- ### Start the agent
  Focus a pane inside the linked worktree and run **Start configured agent in
  a new Sandbox** from Herdr's action menu. The plugin prints the upload
  manifest for review. Invoke Start again within 10 minutes with the workspace
  unchanged to approve exactly that file set. The plugin then splits the pane,
  creates the sandbox, uploads the approved files, and launches the configured
  agent.

  On the agent's first start, it asks you to log in inside the sandbox. That
  login is stored on the sandbox filesystem and persists across stops and
  reconnects.

- ### Apply changes locally
  When the agent has finished a task, exit the agent in its pane, then invoke
  **Apply Sandbox changes locally**. Apply and the other destructive actions
  refuse to run while an agent is still active in the mapped pane. Each apply
  copies only the work since the last apply, and checks the patch with
  `git apply --check` first: if it conflicts with local work, nothing is
  applied. Applying the same changes twice reports that they are already
  present instead of failing.

## How it works

The plugin drives the locally authenticated Vercel CLI. Each Herdr pane maps
to one named sandbox:

- **One sandbox per agent**: Starting an agent creates a
  [persistent sandbox](/docs/sandbox/concepts/persistent-sandboxes) and
  attaches the agent's interactive terminal to the pane through
  `vercel sandbox exec --interactive`.
- **Reviewed uploads**: Before the first upload, the plugin prints the
  complete file manifest and a digest for you to approve. Git-ignored paths,
  `.git`, environment secrets, and credential-like files are excluded.
- **Credentials stay put**: The plugin never copies Vercel or coding-agent
  credentials from your machine. You authenticate the agent inside its
  sandbox, where the credential persists across stops and resumes.
- **Patch-based apply**: Each apply exports only the changes since the last
  applied snapshot and checks them with `git apply --check` before touching
  your worktree.
- **Explicit deletion**: Stopping a sandbox preserves its filesystem.
  Deleting a sandbox through the plugin requires you to type `DELETE` in a
  confirmation popup within 60 seconds.

Each automatic snapshot for a persistent sandbox consumes
[Snapshot Storage](/docs/sandbox/pricing#snapshot-storage), which is billed
separately from compute.

## Configuration

Find the Herdr-managed config directory and create `config.json` there:

```bash
herdr plugin config-dir vercel.sandbox
```

```json filename="config.json"
{
  "agentKind": "claude-code",
  "agentArgs": {
    "claude-code": []
  },
  "runtime": "node24",
  "timeout": "1h",
  "uploadExcludes": ["private-fixtures/**"],
  "sensitiveFileOverrides": []
}
```

`agentKind` selects the coding agent to install in the sandbox. The built-in
Claude Code, Codex, and OpenCode adapters are lifecycle-verified and need no
extra flag. Unknown keys return an error. Do not put tokens in this file.

## Optional keybindings

Every plugin action runs from Herdr's action menu with no configuration. To
bind actions to keys instead, add bindings like these to
`~/.config/herdr/config.toml`, then run `herdr config check` and
`herdr server reload-config`:

```toml
[[keys.command]]
key = "prefix+shift+s"
type = "plugin_action"
command = "vercel.sandbox.start-agent"
description = "start the configured agent in a new Vercel Sandbox"

[[keys.command]]
key = "prefix+shift+a"
type = "plugin_action"
command = "vercel.sandbox.apply-changes"
description = "apply Sandbox changes locally"
```

The
[plugin README](https://github.com/vercel-labs/herdr-vercel-sandbox-plugin#local-installation)
lists bindings for every plugin action. Scripts and orchestrating agents can
also invoke the same actions with `herdr plugin action invoke`.

## Custom agents

To run a terminal agent that has no built-in adapter, describe it with a
declarative profile in `config.json`. Add the profile under `customAgents`,
keyed by the agent kind, and set `"allowCandidateAgents": true`. All nine
profile fields are required:

```json filename="config.json"
{
  "agentKind": "my-agent",
  "allowCandidateAgents": true,
  "customAgents": {
    "my-agent": {
      "title": "My Agent",
      "installationCommand": "npm install --prefix /vercel/sandbox/.herdr-tools my-agent@1.2.3",
      "launchCommand": "/vercel/sandbox/.herdr-tools/node_modules/.bin/my-agent",
      "versionCommand": "/vercel/sandbox/.herdr-tools/node_modules/.bin/my-agent --version",
      "expectedVersion": "1.2.3",
      "authenticationMode": "device-code",
      "herdrDetectionIdentifier": "generic",
      "interactiveTTY": true,
      "resumeSupported": true
    }
  }
}
```

The install, launch, and version commands run inside the sandbox, and the
plugin labels custom agents as unverified. Profiles are plain JSON; the plugin
never imports executable profile code on your machine. Agents that only
expose an API or run on a hosted service cannot use this terminal lifecycle.

## Troubleshooting

### The Vercel CLI is signed out or uses the wrong account

Invoking Start while the CLI is signed out opens the official login flow in a
local pane, and no sandbox is created until you are signed in. To inspect or
switch accounts outside Herdr, run `vercel whoami`, then `vercel logout` and
`vercel login`. This Vercel login is separate from the coding agent's own
authentication inside the sandbox.

### The worktree is not linked to the intended project

Invoking Start without a linked project opens the official linking flow in a
local pane. You can also run `vercel link` from the worktree directly; the
plugin discovers the resulting `.vercel/project.json` automatically.

### A file is missing from the upload manifest

Git-ignored files are excluded even when they are tracked, and
credential-like paths and content are excluded automatically. To include one
normally-sensitive file that is not a secret, add its exact
repository-relative path to `sensitiveFileOverrides`, review the new
manifest, and invoke Start again within 10 minutes. Never override real
credentials; authenticate inside the sandbox instead.

### Applying changes reports a conflict

The plugin checks every patch with `git apply --check` and applies nothing
when the check fails, so a conflict means the sandbox changes overlap
uncommitted local edits. Commit, stash, or resolve the overlapping local
work, then invoke **Apply Sandbox changes locally** again. The remote files
stay in the sandbox while you resolve the conflict.

### The mapped sandbox was deleted

**Reconnect agent to this Sandbox** never creates a replacement. If the
sandbox is confirmed missing, exit the agent in the mapped pane, invoke
**Replace this Sandbox**, review the tracked names in the popup, and type
`DELETE` within 60 seconds to start a fresh sandbox for the worktree.

### Herdr was detached or restarted

Detaching leaves pane processes running, and a full restart restores the
layout but not the terminal process. Focus the mapped pane and invoke
**Reconnect agent to this Sandbox**. Reconnect attaches to the existing named
sandbox and never creates a new one.

For rarer recovery paths, such as partially failed deletions and moved
repositories, see the plugin's
[troubleshooting guide](https://github.com/vercel-labs/herdr-vercel-sandbox-plugin/blob/main/docs/troubleshooting.md).


---

[View full sitemap](/docs/sitemap)
