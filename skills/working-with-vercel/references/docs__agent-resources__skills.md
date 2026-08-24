---
title: Agent Skills
product: vercel
url: /docs/agent-resources/skills
canonical_url: "https://vercel.com/docs/agent-resources/skills"
last_updated: 2026-06-30
type: reference
prerequisites:
  - /docs/agent-resources
related:
  - /docs/eve
summary: Install skills to enhance AI coding agents with specialized capabilities for React, Next.js, deployment, and more.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/skills.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "1941053750b002d16c6d333f4ae8d14a46d20496e03a87bac140108899e73add"
---

# Agent Skills

An agent skill is a packaged capability that extends an AI agent with a specific, production ready behavior such as data access, automation, or domain logic. Skills give agents secure, structured ways to take action across your stack, so they can move beyond chat and reliably execute real workflows. They are modular, composable, and built to plug directly into modern web infrastructure.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Skills: Creating, Installing, and Sharing Reusable Agent Context](https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context?from=related) — This guide will cover what skills are, how to create custom skills for yourself and your team, and how to publish them t
- [Skills](https://eve.dev/docs/skills?from=related) — Author load-on-demand procedures the model pulls into context with load_skill.
- [Extending with Agents](https://docs.vercel.shop/docs/getting-started/extending-with-agents?from=related) — Use coding agents like Claude Code, Cursor, and Codex to personalize and extend your storefront.
- [Extending with Skills](https://docs.vercel.shop/docs/skills?from=related) — Agent-ready skills for extending your Shopify storefront.
- [Add Skills to Your Agent](https://ai-sdk.dev/cookbook/guides/agent-skills?from=related)
- [AI Coding Agents](https://nextjs.org/docs/app/guides/ai-agents?from=related) — Learn how to configure your Next.js project so AI coding agents use up-to-date documentation instead of outdated trainin
- [Add skills to your AI SDK agents](https://vercel.com/kb/guide/ai-sdk-skill-uploads?from=related) — Use uploadSkill and provider references in the AI SDK to bundle a SKILL.md and supporting files, then attach the skill t
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [sitemap.md](https://vercel.com/docs/sitemap.md?from=related) — Learn about sitemap.md on Vercel.

Full cross-link map for this page: [/docs/agent-resources/skills.graph.md](/docs/agent-resources/skills.graph.md)
<!-- /docsgraph:related -->

Below you'll find the official directory of Vercel published skills. Each skill is verified, documented, and ready to integrate, so you can quickly add powerful new capabilities to your agents and ship faster with confidence.

## Installing skills

Install any skill using the skills CLI:

```bash filename="Terminal"
npx skills add <owner/repo>
```

To install a specific skill from a repository with multiple skills:

```bash filename="Terminal"
npx skills add <owner/repo> --skill <skill-name>
```

Skills work with 18+ AI agents including Claude Code, GitHub Copilot, Cursor, Cline, and many others.

## eve

When you run the skills CLI from an [eve](/docs/eve) project directory, it auto-detects the project and prompts you to install the skills for your eve building agent:

```bash filename="Terminal"
npx skills add <owner/repo>
```

The CLI shows a confirmation prompt:

```text filename="Terminal"
Detected an eve project. Install skills for eve?
● Yes / ○ No
```

Select **Yes** to install the skills into your project's `agent/skills/` directory. Select **No** to install them for your local AI coding agent.

Learn more about [adding skills to your eve agent](/kb/guide/how-to-add-eve-skills).

## React and Next.js

Skills for building performant React and Next.js applications.

## AI SDK

Skills for building AI-powered applications with the Vercel AI SDK.

## Design and UI

Skills for building accessible, performant user interfaces.

## Browser automation

Skills for automating browser interactions.

## Deployment

Skills for deploying applications to Vercel.

## Commerce

Skills for building commerce and payment experiences.

## Workflow

Skills for building durable, resilient workflows.

## JSON Render

Skills for the [JSON Render](https://github.com/vercel-labs/json-render) generative UI framework.

## Utility

General-purpose skills for agent workflows.

## Finding more skills

Browse the [skills.sh directory](https://skills.sh) to discover skills from Vercel and the community. You can also search for skills using the CLI:

```bash filename="Terminal"
npx skills find <query>
```


---

[View full sitemap](/docs/sitemap)
