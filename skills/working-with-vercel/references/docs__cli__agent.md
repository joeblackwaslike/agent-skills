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
  - /docs/cli/global-options
summary: Generate an AGENTS.md file with Vercel deployment best practices using the vercel agent CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/agent.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "90e5897d9c6bf860263276d278415fe33c94b95f6c8f38bbb1f8b096e94c4f9b"
---

# vercel agent

The `vercel agent` command writes a section related to Vercel deployment best practices in your project's agent guidance file so coding agents and assistants have context for how the project should build, deploy, and integrate with Vercel features. The section is wrapped in `<!-- VERCEL BEST PRACTICES START -->` and `<!-- VERCEL BEST PRACTICES END -->` markers so it can be re-applied non-destructively.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway)
- [Vercel Agent code reviews now follow your code guidelines](https://vercel.com/changelog/vercel-agent-code-reviews-now-follow-your-code-guidelines)
- [vercel setup](https://vercel.com/docs/cli/setup) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code, Codex, and OpenCode, and co
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Agent Resources](https://vercel.com/docs/agent-resources) — Set up AI coding tools with Vercel documentation, reusable skills, and secure access to projects, deployments, and logs.
- [vercel agent-runs](https://vercel.com/docs/cli/agent-runs) — Find projects with Agent Runs, list recent runs, and inspect run metadata and conversation traces from the command line.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.

Full cross-link map for this page: [/docs/cli/agent.graph.md](/docs/cli/agent.graph.md)
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

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel agent` command:

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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
