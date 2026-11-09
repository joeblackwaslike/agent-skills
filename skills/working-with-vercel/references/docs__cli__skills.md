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
  - /docs/agent-resources/skills
  - /docs/cli/global-options
summary: Discover agent skills relevant to your project using the vercel skills CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/skills.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "95ab3761dc9fa17c3b14d527679ff0ce85bb6bf46fc7ef8193cc4a800e6423e6"
---

# vercel skills

The `vercel skills` command surfaces agent skills relevant to your project. When run without arguments, it detects the project's framework (via `@vercel/fs-detectors`) and scans the `package.json` file for a curated set of notable dependencies (e.g. ORMs, auth libraries, payment SDKs, testing frameworks). It then recommends matching skills from the [Skills.sh](https://skills.sh) catalog and asks which ones to install.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Skills: Creating, Installing, and Sharing Reusable Agent Context](https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context) — This guide will cover what skills are, how to create custom skills for yourself and your team, and how to publish them t
- [Agent skills explained: An FAQ](https://vercel.com/blog/agent-skills-explained-an-faq)
- [Introducing skills, the open agent skills ecosystem](https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem)
- [Skills v1.1.1: Interactive discovery, open source release, and agent support](https://vercel.com/changelog/skills-v1-1-1-interactive-discovery-open-source-release-and-agent-support)
- [The skills.sh API is now available](https://vercel.com/changelog/the-skills-sh-api-is-now-available)
- [Skills Night: 69,000+ ways agents are getting smarter](https://vercel.com/blog/skills-night-69000-ways-agents-are-getting-smarter)
- [vercel setup](https://vercel.com/docs/cli/setup) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code, Codex, and OpenCode, and co
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/skills.graph.md](/docs/cli/skills.graph.md)
<!-- /docsgraph:related -->

When given a search term, it searches the catalog for that keyword instead and lists the results without installing them. To install a skill from the search results, see [Installing skills](/docs/agent-resources/skills#installing-skills).

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

*Use \`--json\` to emit machine-readable output for scripts and agents.*

## Unique options

These are options that only apply to the `vercel skills` command.

### JSON

The `--json` option emits results as JSON instead of the default human-readable output. With `--json`, the command only lists skills and doesn't prompt or install anything:

```bash filename="terminal"
vercel skills --json
```

*Emit results as JSON.*

### Yes

The `--yes` option, shorthand `-y`, installs every recommended skill that isn't installed yet, without asking you to select skills. It has no effect when you pass a search term or `--json`, which only list skills. Use it where the command can't prompt, such as in a script or CI:

```bash filename="terminal"
vercel skills --yes
```

*Install all recommended skills without a prompt.*

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
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
