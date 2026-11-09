---
title: vercel setup
product: vercel
url: /docs/cli/setup
canonical_url: "https://vercel.com/docs/cli/setup"
last_updated: 2026-10-01
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/ai-gateway
  - /docs/cli/ai-gateway
  - /docs/agent-resources/skills
  - /docs/cli/global-options
summary: "Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code, Codex, and OpenCode, and connect your agents to AI..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/setup.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "a30993772a35a6a8da7bc4836ffcb16aba8f824aefa3bc89fbb998a2269f2f26"
---

# vercel setup

The `vercel setup` command prepares your machine for coding agents in two steps:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway)
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [vercel agent](https://vercel.com/docs/cli/agent) — Generate an AGENTS.md file with Vercel deployment best practices using the vercel agent CLI command.
- [vercel token-pass](https://vercel.com/docs/cli/token-pass) — Configure supported coding agents to use Vercel Token Pass through AI Gateway from your terminal.
- [vercel skills](https://vercel.com/docs/cli/skills) — Discover agent skills relevant to your project using the vercel skills CLI command.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.

Full cross-link map for this page: [/docs/cli/setup.graph.md](/docs/cli/setup.graph.md)
<!-- /docsgraph:related -->

1. **Vercel plugin**: Installs the Vercel plugin for Claude Code, Codex, and OpenCode 2 or later.
2. **AI Gateway**: Connects your local coding agents to [AI Gateway](/docs/ai-gateway). This runs the same flow as [`vercel ai-gateway setup`](/docs/cli/ai-gateway#setup).

The command prompts you before each step and skips agents it doesn't find on your machine. To run one step on its own, use a [subcommand](#subcommands).

## Usage

```bash filename="terminal"
vercel setup
```

*Using the \`vercel setup\` command to install the Vercel plugin and connect
coding agents to AI Gateway.*

## Examples

### Only connect coding agents to AI Gateway

```bash filename="terminal"
vercel setup gateway
```

*Skip the plugin step and only run the AI Gateway step.*

### Install the Vercel plugin for Codex

```bash filename="terminal"
vercel setup plugin --agent codex
```

*Only install the Vercel plugin, and only for Codex.*

### Preview changes

```bash filename="terminal"
vercel setup --dry-run
```

*Show what setup would change without writing any files.*

## Subcommands

### plugin

To run only the Vercel plugin step, use the `vercel setup plugin` subcommand:

```bash filename="terminal"
vercel setup plugin
```

*Only install the Vercel plugin for Claude Code, Codex, and OpenCode.*

### gateway

To run only the AI Gateway step, use the `vercel setup gateway` subcommand:

```bash filename="terminal"
vercel setup gateway
```

*Only connect coding agents to AI Gateway.*

`vercel setup gateway` also accepts the `--all`, `--key`, `--reconfigure`, and `--no-session-migration` options of [`vercel ai-gateway setup`](/docs/cli/ai-gateway#setup). To use that command's other options, such as a spend limit for a new key, run `vercel ai-gateway setup`.

### skills

The Vercel CLI [skill](/docs/agent-resources/skills) guides a coding agent through deployment, configuration, and troubleshooting with the CLI version you have installed. To write the skill to `~/.agents/skills/vercel-cli`, use the `vercel setup skills` subcommand:

```bash filename="terminal"
vercel setup skills
```

*Write the Vercel CLI skill for your coding agents.*

`vercel setup` without a subcommand doesn't write the skill. Run `vercel setup skills` again after you upgrade the CLI to update the skill.

If your agent reads skills from another directory, pass the directory for the skill with the `--output` option:

```bash filename="terminal"
vercel setup skills --output .agents/skills/vercel-cli
```

*Write the Vercel CLI skill into a project's skills directory.*

This subcommand doesn't prompt, and it doesn't accept the `--agent` or `--yes` options.

## Unique options

These are options that only apply to the `vercel setup` command.

### Agent

The `--agent` option, value `NAME`, limits setup to one coding agent. Repeat it to select more than one. The values each step accepts are different:

- **Vercel plugin**: `claude-code`, `codex`, or `opencode`.
- **AI Gateway**: any agent in the [supported coding agents](/docs/cli/ai-gateway#supported-coding-agents) list, such as `cursor` or `opencode`.

```bash filename="terminal"
vercel setup --agent claude-code
```

*Install the plugin and connect AI Gateway for Claude Code only.*

### Dry run

The `--dry-run` option shows what would change without writing any files.

```bash filename="terminal"
vercel setup --dry-run
```

*Preview setup changes.*

### Yes

The `--yes` option, shorthand `-y`, skips the confirmation prompts.

```bash filename="terminal"
vercel setup --yes
```

*Run setup without prompts.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel setup` command:

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
