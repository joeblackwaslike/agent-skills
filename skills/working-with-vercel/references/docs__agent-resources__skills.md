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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "457b26d28cc420968eaf8ecb1572b9fc8f9d4b4734b4e5ab4242e714b9a99054"
---

# Agent Skills

An agent skill is a packaged capability that extends an AI agent with a specific, production ready behavior such as data access, automation, or domain logic. Skills give agents secure, structured ways to take action across your stack, so they can move beyond chat and reliably execute real workflows. They are modular, composable, and built to plug directly into modern web infrastructure.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Skills: Creating, Installing, and Sharing Reusable Agent Context](https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related) — This guide will cover what skills are, how to create custom skills for yourself and your team, and how to publish them t
- [Agent skills explained: An FAQ](https://vercel.com/blog/agent-skills-explained-an-faq?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Introducing skills, the open agent skills ecosystem](https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Skills](https://eve.dev/docs/skills?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related) — Author load-on-demand procedures the model pulls into context with load_skill.
- [Skills v1.1.1: Interactive discovery, open source release, and agent support](https://vercel.com/changelog/skills-v1-1-1-interactive-discovery-open-source-release-and-agent-support?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Skills Night: 69,000+ ways agents are getting smarter](https://vercel.com/blog/skills-night-69000-ways-agents-are-getting-smarter?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Building Slack agents can be easy](https://vercel.com/blog/building-slack-agents-can-be-easy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Slack Agent Skill simplifies building Slack agents with coding assistants](https://vercel.com/changelog/slack-agent-skill-simplifies-building-slack-agents-with-coding-assistants?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Add Skills to Your Agent](https://ai-sdk.dev/cookbook/guides/agent-skills?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/agent-resources/skills.graph.md](/docs/agent-resources/skills.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=graph)
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
