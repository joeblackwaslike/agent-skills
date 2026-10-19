---
title: vercel skills
product: vercel
url: /docs/cli/skills
canonical_url: "https://vercel.com/docs/cli/skills"
last_updated: 2026-06-06
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Discover agent skills relevant to your project using the vercel skills CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/skills.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "72a4c626568811d4df436ddcfc77475894a7f7ceba7a70ece48ea948e304ec05"
---

# vercel skills

The `vercel skills` command surfaces agent skills relevant to your project. When run without arguments, it detects the project's framework (via `@vercel/fs-detectors`) and scans the `package.json` file for a curated set of notable dependencies (e.g. ORMs, auth libraries, payment SDKs, testing frameworks). It then recommends matching skills from the catalog. When given a search term, it searches the catalog for that keyword instead.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Skills: Creating, Installing, and Sharing Reusable Agent Context](https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context) — This guide will cover what skills are, how to create custom skills for yourself and your team, and how to publish them t
- [Agent Skills](https://vercel.com/docs/agent-resources/skills) — Install skills to enhance AI coding agents with specialized capabilities for React, Next.js, deployment, and more.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel agent](https://vercel.com/docs/cli/agent) — Generate an AGENTS.md file with Vercel deployment best practices using the vercel agent CLI command.
- [vercel setup](https://vercel.com/docs/cli/setup) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code and Codex, and connect your

Full cross-link map for this page: [/docs/cli/skills.graph.md](/docs/cli/skills.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel skills [query]
```

*Using the \`vercel skills\` command to discover agent skills for the current
project or to search the catalog.*

## Examples

### Recommend skills based on the detected project

```bash filename="terminal"
vercel skills
```

*Run with no arguments to get recommendations tailored to your project.*

### Search for skills by keyword

```bash filename="terminal"
vercel skills nextjs
```

*Pass a keyword to search the skill catalog for matching skills.*

### Get JSON output

```bash filename="terminal"
vercel skills nextjs --json
```

*Use \`--json\` (or \`--format json\`) to emit machine-readable output for scripts
and agents.*

## Unique options

These are options that only apply to the `vercel skills` command.

### JSON

The `--json` option emits results as JSON instead of the default human-readable output. Equivalent to `--format json`.

```bash filename="terminal"
vercel skills --json
```

*Emit results as JSON.*

### Format

The `--format` option, value `json`, selects the output format explicitly.

```bash filename="terminal"
vercel skills --format json
```

*Select the JSON output format explicitly.*

### Yes

The `--yes` option, shorthand `-y`, skips confirmation prompts during interactive flows (for example, when installing a recommended skill).

```bash filename="terminal"
vercel skills --yes
```

*Skip the confirmation prompt in non-interactive environments.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel skills` command:

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
