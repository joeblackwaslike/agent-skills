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
  - /docs/cli/global-options
summary: "Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code and Codex, and connect your agents to AI Gateway."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/setup.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "35305eae7c1be8a6c5abfb2800d9e100a539d83339d2790c20c4323118112b42"
---

# vercel setup

The `vercel setup` command prepares your machine for coding agents in two steps:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel agent](https://vercel.com/docs/cli/agent?from=related&source_path=%2Fdocs%2Fcli%2Fsetup&source_site=vercel-docs&relationship=related) — Generate an AGENTS.md file with Vercel deployment best practices using the vercel agent CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fcli%2Fsetup&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [vercel upgrade](https://vercel.com/docs/cli/upgrade?from=related&source_path=%2Fdocs%2Fcli%2Fsetup&source_site=vercel-docs&relationship=related) — Upgrade the Vercel CLI to the latest version and manage automatic updates with the vercel upgrade CLI command.
- [vercel build](https://vercel.com/docs/cli/build?from=related&source_path=%2Fdocs%2Fcli%2Fsetup&source_site=vercel-docs&relationship=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel install](https://vercel.com/docs/cli/install?from=related&source_path=%2Fdocs%2Fcli%2Fsetup&source_site=vercel-docs&relationship=related) — Learn how to install marketplace native integrations and provision resources with the vercel install CLI command.

Full cross-link map for this page: [/docs/cli/setup.graph.md](/docs/cli/setup.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fsetup&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

1. **Vercel plugin**: Installs the Vercel plugin for Claude Code and Codex.
2. **AI Gateway**: Connects your local coding agents to [AI Gateway](/docs/ai-gateway). This runs the same flow as [`vercel ai-gateway setup`](/docs/cli/ai-gateway#setup).

The command prompts you before each step and skips agents it doesn't find on your machine.

## Usage

```bash filename="terminal"
vercel setup
```

*Using the \`vercel setup\` command to install the Vercel plugin and connect
coding agents to AI Gateway.*

## Examples

### Only connect coding agents to AI Gateway

```bash filename="terminal"
vercel setup --gateway
```

*Skip the plugin step and only run the AI Gateway step.*

### Install the Vercel plugin for Codex

```bash filename="terminal"
vercel setup --plugin --agent codex
```

*Only install the Vercel plugin, and only for Codex.*

### Preview changes

```bash filename="terminal"
vercel setup --dry-run
```

*Show what setup would change without writing any files.*

## Unique options

These are options that only apply to the `vercel setup` command.

### Plugin

The `--plugin` option runs only the Vercel plugin step.

```bash filename="terminal"
vercel setup --plugin
```

*Only install the Vercel plugin for Claude Code and Codex.*

### Gateway

The `--gateway` option runs only the AI Gateway step.

```bash filename="terminal"
vercel setup --gateway
```

*Only connect coding agents to AI Gateway.*

### Agent

The `--agent` option, value `NAME`, limits setup to one coding agent. Repeat it to select more than one. The values each step accepts are different:

- **Vercel plugin**: `claude-code` or `codex`.
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
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)
