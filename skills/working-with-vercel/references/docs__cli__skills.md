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
  []
summary: Discover agent skills relevant to your project using the vercel skills CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/skills.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "4ee2ec066b994c6ab4af162e6eb5db2650bda73a9dd8ad57b12388768e08e315"
---

# vercel skills

The `vercel skills` command surfaces agent skills relevant to your project. When run without arguments, it detects the project's framework (via `@vercel/fs-detectors`) and scans the `package.json` file for a curated set of notable dependencies (e.g. ORMs, auth libraries, payment SDKs, testing frameworks). It then recommends matching skills from the catalog. When given a search term, it searches the catalog for that keyword instead.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Skills: Creating, Installing, and Sharing Reusable Agent Context](https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context?from=related) — This guide will cover what skills are, how to create custom skills for yourself and your team, and how to publish them t
- [How to add skills to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-skills?from=related) — Add skills to an eve agent by creating a file under agent/skills/ or installing a published skill with the npx skills ad
- [Skills](https://eve.dev/docs/skills?from=related) — Author load-on-demand procedures the model pulls into context with load_skill.
- [Skills](https://vercel.com/docs/agent-resources/skills?from=related) — Install skills to enhance AI coding agents with specialized capabilities for React, Next.js, deployment, and more.
- [Choosing between TanStack Intent and \`skills\`](https://vercel.com/kb/guide/tanstack-intent-vs-skills?from=related) — TanStack Intent vs skills: compare how each tool sources, versions, and discovers agent skills for AI coding agents, and
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [vercel api](https://vercel.com/docs/cli/api?from=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel agent](https://vercel.com/docs/cli/agent?from=related) — Generate an AGENTS.md file with Vercel deployment best practices using the vercel agent CLI command.
- [Agent Resources](https://vercel.com/docs/agent-resources?from=related) — Resources for building with AI on Vercel, including documentation access, MCP servers, and agent skills.

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


---

[View full sitemap](/docs/sitemap)
