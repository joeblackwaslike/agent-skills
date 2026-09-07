---
title: Agent Resources
product: vercel
url: /docs/agent-resources
canonical_url: "https://vercel.com/docs/agent-resources"
last_updated: 2026-09-03
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
source: "https://vercel.com/docs/agent-resources.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "027c64a376ff091bfc30d1b86c2eb814ee58645a731dca0438b24cbd036f8bdc"
---

# Agent Resources

## Set up your coding agent for Vercel

Give AI coding tools Vercel documentation, reusable skills, and secure access to projects, deployments, and logs.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Make your documentation readable by AI agents](https://vercel.com/kb/guide/make-your-documentation-readable-by-ai-agents?from=related&source_path=%2Fdocs%2Fagent-resources&source_site=vercel-docs&relationship=related) — Serve markdown to AI agents using content negotiation, .md endpoints, agent auto-detection, llms.txt,   sitemap.md, and
- [How to build AI Agents with Vercel and the AI SDK](https://vercel.com/kb/guide/how-to-build-ai-agents-with-vercel-and-the-ai-sdk?from=related&source_path=%2Fdocs%2Fagent-resources&source_site=vercel-docs&relationship=related) — Learn how to build, deploy, and scale AI agents on Vercel using the AI SDK. This guide covers calling LLMs, defining too
- [Draft content in your voice from Slack with eve](https://vercel.com/kb/guide/eve-content-agent?from=related&source_path=%2Fdocs%2Fagent-resources&source_site=vercel-docs&relationship=related) — Deploy the eve content agent template, a Slack bot that drafts blog posts, LinkedIn posts, release notes, and newsletter
- [Agent Skills: Creating, Installing, and Sharing Reusable Agent Context](https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context?from=related&source_path=%2Fdocs%2Fagent-resources&source_site=vercel-docs&relationship=related) — This guide will cover what skills are, how to create custom skills for yourself and your team, and how to publish them t
- [Agent Readability: A Specification for AI-Optimized Websites](https://vercel.com/kb/guide/agent-readability-spec?from=related&source_path=%2Fdocs%2Fagent-resources&source_site=vercel-docs&relationship=related) — When an agent visits your site, it needs to quickly find, read, and understand your pages. Sites that are easy for agent
- [How to set up your Next.js project for AI coding agents](https://nextjs.org/docs/app/guides/ai-agents?from=related&source_path=%2Fdocs%2Fagent-resources&source_site=vercel-docs&relationship=related) — Learn how to configure your Next.js project so AI coding agents use up-to-date documentation instead of outdated trainin
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fagent-resources&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fagent-resources&source_site=vercel-docs&relationship=related) — Create an AI Gateway API key, make your first request with TypeScript, Python, or cURL, and verify how the request was r
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fagent-resources&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/agent-resources.graph.md](/docs/agent-resources.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### Install the plugin

```bash filename="terminal"
npx plugins add vercel/vercel-plugin
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

## CLI workflows

End-to-end workflows that show AI agents how to compose Vercel CLI commands into complete work sessions. Each workflow covers a full task from start to finish, including the reasoning between steps.

See [CLI Workflows](/docs/agent-resources/workflows) for the full list, including:

- [Debugging production 500 errors](/docs/observability/debug-production-errors)
- [Rolling back a production deployment](/docs/deployments/rollback-production-deployment)
- [Debugging slow Vercel Functions](/docs/functions/debug-slow-functions)
- [Deploying a project from the CLI](/docs/projects/deploy-from-cli)

## Build with an eve template

Deploy an eve template, then customize the agent for your use case:

## More resources

- [The complete guide to Agent Plugins](/kb/guide/agent-plugins)


---

[View full sitemap](/docs/sitemap)
