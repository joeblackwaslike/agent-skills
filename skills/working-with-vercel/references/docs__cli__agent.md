---
title: vercel agent
product: vercel
url: /docs/cli/agent
canonical_url: "https://vercel.com/docs/cli/agent"
last_updated: 2026-06-06
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Generate an AGENTS.md file with Vercel deployment best practices using the vercel agent CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/agent.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "e7d785bd8b7c065a45de7ab95b77123630aed1e7c1daa5f5861f6378c8ff8830"
---

# vercel agent

The `vercel agent` command writes a section related to Vercel deployment best practices in your project's agent guidance file so coding agents and assistants have context for how the project should build, deploy, and integrate with Vercel features. The section is wrapped in `<!-- VERCEL BEST PRACTICES START -->` and `<!-- VERCEL BEST PRACTICES END -->` markers so it can be re-applied non-destructively.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel?from=related&source_path=%2Fdocs%2Fcli%2Fagent&source_site=vercel-docs&relationship=related) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Vercel Agent code reviews now follow your code guidelines](https://vercel.com/changelog/vercel-agent-code-reviews-now-follow-your-code-guidelines?from=related&source_path=%2Fdocs%2Fcli%2Fagent&source_site=vercel-docs&relationship=related)
- [Make your documentation readable by AI agents](https://vercel.com/kb/guide/make-your-documentation-readable-by-ai-agents?from=related&source_path=%2Fdocs%2Fcli%2Fagent&source_site=vercel-docs&relationship=related) — Serve markdown to AI agents using content negotiation, .md endpoints, agent auto-detection, llms.txt,   sitemap.md, and
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related&source_path=%2Fdocs%2Fcli%2Fagent&source_site=vercel-docs&relationship=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Introducing the Vercel plugin for coding agents](https://vercel.com/changelog/introducing-vercel-plugin-for-coding-agents?from=related&source_path=%2Fdocs%2Fcli%2Fagent&source_site=vercel-docs&relationship=related)
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fcli%2Fagent&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related&source_path=%2Fdocs%2Fcli%2Fagent&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Agent Resources](https://vercel.com/docs/agent-resources?from=related&source_path=%2Fdocs%2Fcli%2Fagent&source_site=vercel-docs&relationship=related) — Resources for building with AI on Vercel, including documentation access, MCP servers, and agent skills.
- [vercel build](https://vercel.com/docs/cli/build?from=related&source_path=%2Fdocs%2Fcli%2Fagent&source_site=vercel-docs&relationship=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [Markdown and Agent Discovery](https://vercel.com/docs/agent-resources/markdown-access?from=related&source_path=%2Fdocs%2Fcli%2Fagent&source_site=vercel-docs&relationship=related) — Learn how Vercel serves documentation to AI agents as Markdown and helps them discover related pages through content neg

Full cross-link map for this page: [/docs/cli/agent.graph.md](/docs/cli/agent.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fagent&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

The target file is `AGENTS.md` by default; when run from Claude Code, the target is `CLAUDE.md`.

## Usage

```bash filename="terminal"
vercel agent init
```

*Using the \`vercel agent init\` command to include a section about Vercel best practices in
the agent guidance file of the current directory.*

The command checks whether the target file already exists and whether it already contains the section on Vercel best practices:

- If the file doesn't exist, the command creates it with just the marked section.
- If the file exists without the markers, the command appends a marked section to the end. Your existing content is preserved.
- If the file exists and already contains the markers, the command updates only the content between the markers, leaving the rest of the file untouched.

You're prompted to confirm the change before any write. The command never replaces an entire existing file.

## Examples

### Add Vercel best practices to the current project

```bash filename="terminal"
vercel agent init
```

*Run interactively to add or update the marked section in the target file.*

### Skip the confirmation prompt

```bash filename="terminal"
vercel agent init --yes
```

*Use \`--yes\` (shorthand \`-y\`) in CI or other non-interactive environments to
skip the confirmation prompt. Required in non-interactive shells.*

## Unique options

These are options that only apply to the `vercel agent` command.

### Yes

The `--yes` option, shorthand `-y`, skips the confirmation prompt. Required when running in a non-interactive shell.

```bash filename="terminal"
vercel agent init --yes
```

*Skip the confirmation prompt that asks before writing to the target file.*


---

[View full sitemap](/docs/sitemap)
