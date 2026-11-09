---
title: vercel token-pass
product: vercel
url: /docs/cli/token-pass
canonical_url: "https://vercel.com/docs/cli/token-pass"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/ai-gateway/token-pass
  - /docs/cli/login
  - /docs/cli
  - /docs/ai-gateway/token-pass/coding-agents
  - /docs/cli/ai-gateway
summary: Configure supported coding agents to use Vercel Token Pass through AI Gateway from your terminal.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/token-pass.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "c5144ab3755e49daa3abcd5b0268bc0401b3d70c0ad46dad1fc3ddc5194747c8"
---

# vercel token-pass

The `vercel token-pass` command connects supported coding agents to [Token Pass](/docs/ai-gateway/token-pass) through AI Gateway. It creates a Token Pass API key and updates your local agent configuration, or uses an existing key you provide.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway)
- [Introducing Token Pass](https://vercel.com/changelog/introducing-token-pass)
- [vercel setup](https://vercel.com/docs/cli/setup) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code, Codex, and OpenCode, and co
- [vercel tokens](https://vercel.com/docs/cli/tokens) — Manage your personal Vercel authentication tokens from the CLI: list, create, and revoke access tokens for use with the
- [vercel kms](https://vercel.com/docs/cli/kms) — Manage Vercel KMS issuers, rotate signing keys, and control which projects can sign tokens from the command line.
- [vercel agent](https://vercel.com/docs/cli/agent) — Generate an AGENTS.md file with Vercel deployment best practices using the vercel agent CLI command.
- [vercel agent-runs](https://vercel.com/docs/cli/agent-runs) — Find projects with Agent Runs, list recent runs, and inspect run metadata and conversation traces from the command line.

Full cross-link map for this page: [/docs/cli/token-pass.graph.md](/docs/cli/token-pass.graph.md)
<!-- /docsgraph:related -->

## Usage

Run the command to choose agents interactively, or name an agent to configure:

```bash filename="terminal"
vercel token-pass
vercel token-pass setup --agent opencode
```

*Configure detected agents or select OpenCode.*

Running `vercel token-pass` without a subcommand runs `setup`. Both forms accept the same options. The older `tokenpass` alias still works but prints a deprecation warning.

[Sign in to the CLI](/docs/cli/login) before running setup, including dry runs. For scripts, use a [Vercel access token](/docs/cli#using-in-a-cicd-environment). This CLI credential is separate from the Token Pass API key that the command gives your coding agent.

For subscription requirements and available models, see [Token Pass](/docs/ai-gateway/token-pass). To configure agents outside the supported set below, use the [manual coding-agent instructions](/docs/ai-gateway/token-pass/coding-agents).

## Supported agents

Token Pass setup accepts these `--agent` values:

| Agent | Value |
| --- | --- |
| fx | `fx` |
| OpenCode | `opencode` |
| Pi | `pi` |

Repeat `--agent` to configure more than one, or pass `--all` (`-a`) to configure all three. Without either option, setup selects detected agents. In a run without prompts, finding no agents is an error; name an agent explicitly to continue.

The supported set is smaller than the set for [`vercel ai-gateway setup`](/docs/cli/ai-gateway#setup). Other `--agent` values return an error even when general AI Gateway setup supports them.

## Preview changes

Use `--dry-run` to inspect the planned changes before applying them:

```bash filename="terminal"
vercel token-pass --agent opencode --dry-run
vercel token-pass setup --agent pi --dry-run --non-interactive
```

*Preview agent configuration changes, optionally as structured JSON.*

A dry run doesn't create an API key or write agent configuration. With `--non-interactive`, output includes `reason: "dry_run"` and a `changes` array with each file's path and planned action, such as `would_create` or `would_update`.

## Create or reuse a Token Pass key

To create a new key and configure an agent without prompts, select the owning team with `--scope` and pass `--yes`:

```bash filename="terminal"
vercel token-pass --agent opencode --scope my-team --yes
```

*Create a Token Pass key for a team and configure OpenCode.*

Without `--key`, Token Pass setup requests a new Token Pass key, including when you run it again against an existing configuration. It doesn't recover a previously stored general AI Gateway key. This differs from the key-reuse behavior of general AI Gateway setup.

To reuse a key, pass it explicitly:

```bash filename="terminal"
vercel token-pass --agent opencode --key your_token_pass_api_key --yes
```

*Configure OpenCode with an existing Token Pass API key.*

The supplied key must be a Token Pass API key. Setup warns about this requirement but doesn't convert a general AI Gateway key into one. With `--key`, setup skips new-key creation and its name, team, quota, and expiration prompts.

## Options

Token Pass setup shares the configuration machinery of [`vercel ai-gateway setup`](/docs/cli/ai-gateway#setup), with the supported agents and key behavior described above.

| Option | Description |
| --- | --- |
| `--agent <NAME>` | Select an agent from `fx`, `opencode`, or `pi`. Repeatable. |
| `--all`, `-a` | Configure all supported Token Pass agents. |
| `--dry-run` | Preview configuration changes without creating a key or writing agent files. |
| `--key <KEY>` | Use an existing Token Pass API key. |
| `--name <NAME>` | Name for a newly created key. |
| `--expiration <PERIOD>` | New-key expiry: `7d`, `30d`, `60d`, `90d`, `1y`, or `none` (default). |
| `--agent-config <AGENT=PATH>` | Override an agent's configuration file, for example `opencode=/path/opencode.json`. Repeatable. |
| `--shell-rc <PATH>` | Override the shell startup file used for environment exports. |
| `--apply <MODE>` | `edit` writes files (default). `prompt` emits instructions for an agent to apply and requires the macOS Keychain. |
| `--no-keychain` | Write the key into configuration files instead of the macOS Keychain. |
| `--no-backup` | Skip the `.bak` backups normally made for changed files. |
| `--reconfigure` | Run setup again when already configured. Without `--key`, Token Pass setup already enables this behavior. |
| `--yes`, `-y` | Accept defaults and run without prompts. |

The inherited `--amount`, `--refresh-period`, and `--include-byok` options configure a new key's quota. `--base-url` overrides the configured AI Gateway endpoint. See [AI Gateway setup](/docs/cli/ai-gateway#setup) for these shared options and storage details.

## Output and key storage

Pass `--non-interactive` for structured JSON on stdout. The command doesn't accept `--json`:

```bash filename="terminal"
vercel token-pass --agent opencode --dry-run --non-interactive
```

*Inspect the planned changes as JSON.*

Successful setup returns `reason: "coding_agents_configured"`, a `configured` file list, and an `apiKey`. **The success output contains the full API key.** Keep it out of shared logs. Dry-run output describes changes without creating or returning a key.

On macOS, fx and OpenCode use the login Keychain by default when available, with a shell export that reads the key. Pi stores its key in its own configuration. With `--no-keychain`, fx stores the key in the shell startup file and OpenCode stores it in its configuration. See [key storage](/docs/cli/ai-gateway#key-storage) for details, and open a new terminal when setup changes shell environment exports.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel token-pass` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
