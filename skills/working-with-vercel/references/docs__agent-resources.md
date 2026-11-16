---
title: Agent Resources
product: vercel
url: /docs/agent-resources
canonical_url: "https://vercel.com/docs/agent-resources"
last_updated: 2026-11-14
type: conceptual
prerequisites:
  []
related:
  - /docs/agent-resources/integrations-for-agents
  - /docs/agent-resources/markdown-access
  - /docs/graph.json
  - /docs/agent-resources/vercel-mcp
  - /docs/ai-gateway/coding-agents
summary: Set up AI coding tools with Vercel documentation, reusable skills, and secure access to projects, deployments, and logs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e195c99329129082d55b839e20152379d4b96adc3d2ddcb2d83b4d4c4cc533a6"
---

# Agent Resources

## Set up your coding agent for Vercel

Give AI coding tools Vercel documentation, reusable skills, and secure access to projects, deployments, and logs.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Build your first Slack agent with eve](https://vercel.com/kb/guide/eve-slack-agent-starter) — Deploy the eve Slack agent template: a starter Slack bot built on the eve framework with an example tool and skill.
- [Introducing the Vercel plugin for coding agents](https://vercel.com/changelog/introducing-vercel-plugin-for-coding-agents)
- [How to add skills to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-skills) — Add skills to an eve agent by creating a file under agent/skills/ or installing a published skill with the npx skills ad
- [Agent Skills: Creating, Installing, and Sharing Reusable Agent Context](https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context) — This guide will cover what skills are, how to create custom skills for yourself and your team, and how to publish them t
- [Building Slack agents can be easy](https://vercel.com/blog/building-slack-agents-can-be-easy)
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [vercel setup](https://vercel.com/docs/cli/setup) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code, Codex, and OpenCode, and co
- [AI SDK](https://vercel.com/docs/ai-sdk) — Build TypeScript agents and AI applications with a unified API for models, tools, structured output, and streaming.
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.

Full cross-link map for this page: [/docs/agent-resources.graph.md](/docs/agent-resources.graph.md)
<!-- /docsgraph:related -->

#### Install the plugin

```bash filename="terminal"
npx plugins add vercel/vercel-plugin

# In OpenCode
opencode plugin add github:vercel/vercel-plugin
```

#### Install agent skills

```bash filename="terminal"
npx skills add vercel-labs/agent-skills
```

#### Connect Vercel MCP

```bash filename="terminal"
npx -y add-mcp https://mcp.vercel.com -g
```

You can also [install AI agents and services from the Vercel Marketplace](/docs/agent-resources/integrations-for-agents) to automate workflows in your projects.

## Build with prompts

Browse the [prompt library](/kb/prompts) to build an app, extend an agent, or improve an existing project. Each prompt describes the prerequisites and expected results.

Choose a task and copy its prompt into your coding agent. Open your project in the agent and configure any required credentials separately.

## llms-full.txt

The `llms-full.txt` file provides a comprehensive, machine-readable version of Vercel's documentation optimized for large language models.

**URL:** [`https://vercel.com/docs/llms-full.txt`](https://vercel.com/docs/llms-full.txt)

Use this file to give AI assistants full context about Vercel's platform, features, and best practices. This is helpful when you want an AI to understand Vercel comprehensively before answering questions or generating code.

### Using llms-full.txt with AI tools

You can reference the llms-full.txt file in various AI tools:

- **Claude, ChatGPT, Gemini**: Paste the URL or content into your conversation
- **Cursor, Windsurf**: Add the URL to your project's context or rules
- **Claude Code**: Use the `WebFetch` tool to fetch the content

## Markdown and agent discovery

Every documentation page is available as Markdown, and site-wide indexes help agents find pages and understand how they connect. Use the page-actions menu on any docs page to select **View as Markdown** or **Copy page**.

See [Markdown and Agent Discovery](/docs/agent-resources/markdown-access) for details on:

- Requesting any page as Markdown with the `Accept: text/markdown` header or the `.md` extension
- Using site-wide discovery indexes such as `llms.txt` and `sitemap.md`
- Searching the docs and reading pages as Markdown with the Vercel CLI
- Accessing the complete cross-link graph at [`/docs/graph.json`](/docs/graph.json)
- Exploring per-page `.graph.md` cross-link maps
- Feeding documentation to AI assistants

## Site-wide discovery files

Agents can use these files to navigate or load the broader documentation set:

| File | Use |
| --- | --- |
| `https://vercel.com/llms.txt` | A compact index of Vercel documentation |
| `https://vercel.com/docs/llms-full.txt` | The full Vercel docs corpus in one file |
| `https://vercel.com/docs/sitemap.md` | A semantic page index with summaries and prerequisites |
| `https://vercel.com/docs/taxonomy.json` | Canonical product names, aliases, and deprecations |
| `https://vercel.com/docs/graph.json` | The complete cross-site documentation graph |

## Vercel MCP server

The [Vercel MCP server](/docs/agent-resources/vercel-mcp) connects AI assistants directly to your Vercel account using the Model Context Protocol. This lets AI tools:

- Search Vercel documentation
- List and manage your projects
- View deployment details and logs
- Query visitors, page views, and custom events
- Check domain availability

## Coding agents

Connect terminal and editor-based coding agents such as Claude Code, OpenAI Codex, Cline, and Roo Code to AI Gateway.

See [Coding Agents](/docs/ai-gateway/coding-agents) for setup guides and configuration examples.

## Skills.sh

[Skills.sh](https://skills.sh) is the open ecosystem for reusable AI agent capabilities. Skills are procedural knowledge packages that enhance AI coding assistants with specialized expertise.

Install skills with a single command:

```bash filename="terminal"
npx skills add <owner/repo>
```

Skills.sh supports 18+ AI agents including Claude Code, GitHub Copilot, Cursor, Cline, and many others. The directory contains skills covering:

- Framework-specific guidance (React, Vue, Next.js, and more)
- Development tools (testing, deployment, documentation)
- Specialized domains (security, infrastructure, marketing)

See [Agent Skills](/docs/agent-resources/skills) for the complete list of Vercel-provided skills, or browse the [Skills.sh directory](https://skills.sh) to find skills from the community.

## TanStack Intent

[TanStack Intent](https://tanstack.com/intent/latest) loads agent skills from installed dependencies, keeping the guidance aligned with the package version in your project. Use it when building with libraries that publish skills, such as TanStack AI, Start, and Query.

Follow the [TanStack Intent setup instructions](/docs/agent-resources/skills#tanstack-intent) to select permitted skills and configure your coding agent. See [Choosing between TanStack Intent and skills](/kb/guide/tanstack-intent-vs-skills) for how the two tools fit into your workflow.

## CLI workflows

End-to-end workflows that show AI agents how to compose Vercel CLI commands into complete work sessions. Each workflow covers a full task from start to finish, including the reasoning between steps.

See [CLI Workflows](/docs/agent-resources/workflows) for the full list, including:

- [Debugging production 500 errors](/docs/observability/debug-production-errors)
- [Rolling back a production deployment](/docs/deployments/rollback-production-deployment)
- [Debugging slow Vercel Functions](/docs/functions/debug-slow-functions)
- [Deploying a project from the CLI](/docs/projects/deploy-from-cli)
- [Deploying without logging in](/docs/deployments/deploy-without-logging-in)

## Build a software factory

[Software factories](/docs/agent-resources/software-factory) coordinate agents from a work request to a tested change and a draft pull request. Choose an implementation with the [AI SDK](/docs/agent-resources/software-factory/ai-sdk), [eve](/docs/agent-resources/software-factory/eve), [Mastra](/docs/agent-resources/software-factory/mastra), or [Flue](/docs/agent-resources/software-factory/flue). Combine GitHub access with Vercel model routing, sandbox execution, and review workflows.

## Build with an eve template

Deploy an eve template, then customize the agent for your use case:

## Prepare an agent for launch

If you're building an agent with eve, Mastra, or Flue, work through the [agent checklist](/docs/agent-checklist) before you launch. It covers access and security, tools and code execution, reliability and state, observability and evaluation, and cost control, with items for each framework.

To have your coding agent review your project against the checklist, copy the agent prompt at the top of that page.

## More resources

- [The complete guide to Agent Plugins](/kb/guide/agent-plugins)

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
