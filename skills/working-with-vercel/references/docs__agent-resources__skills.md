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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "3caff6eb708cf4450f2b9192292612571bcc44885eea1d119e6e3774ca27f862"
---

# Agent Skills

An agent skill is a packaged capability that extends an AI agent with a specific, production ready behavior such as data access, automation, or domain logic. Skills give agents secure, structured ways to take action across your stack, so they can move beyond chat and reliably execute real workflows. They are modular, composable, and built to plug directly into modern web infrastructure.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Skills: Creating, Installing, and Sharing Reusable Agent Context](https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related) — This guide will cover what skills are, how to create custom skills for yourself and your team, and how to publish them t
- [Agent skills explained: An FAQ](https://vercel.com/blog/agent-skills-explained-an-faq?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Introducing skills, the open agent skills ecosystem](https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Skills v1.1.1: Interactive discovery, open source release, and agent support](https://vercel.com/changelog/skills-v1-1-1-interactive-discovery-open-source-release-and-agent-support?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Skills Night: 69,000+ ways agents are getting smarter](https://vercel.com/blog/skills-night-69000-ways-agents-are-getting-smarter?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Skills](https://eve.dev/docs/skills?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related) — Author load-on-demand procedures the model pulls into context with load_skill.
- [How to set up your Next.js project for AI coding agents](https://nextjs.org/docs/app/guides/ai-agents?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related) — Learn how to configure your Next.js project so AI coding agents use up-to-date documentation instead of outdated trainin
- [Add Skills to Your Agent](https://ai-sdk.dev/cookbook/guides/agent-skills?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Building Slack agents can be easy](https://vercel.com/blog/building-slack-agents-can-be-easy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related)
- [Vercel Plugin for AI Coding Agents](https://vercel.com/docs/agent-resources/vercel-plugin?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related) — Install the Vercel plugin to give supported AI coding tools Vercel context, skills, specialist agents, slash commands, a
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Getting Started with Vercel Flags](https://vercel.com/docs/flags/vercel-flags/quickstart?from=related&source_path=%2Fdocs%2Fagent-resources%2Fskills&source_site=vercel-docs&relationship=related) — Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library

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

| Skill | Description | Install |
| --- | --- | --- |
| [vercel-react-best-practices](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) | React and Next.js performance optimization guidelines with 40+ rules across 8 categories | `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices` |
| [vercel-composition-patterns](https://skills.sh/vercel-labs/agent-skills/vercel-composition-patterns) | React composition patterns that scale, helping avoid boolean prop proliferation | `npx skills add vercel-labs/agent-skills --skill vercel-composition-patterns` |
| [vercel-react-native-skills](https://skills.sh/vercel-labs/agent-skills/vercel-react-native-skills) | React Native best practices with 16 rules covering performance, architecture, and platform-specific patterns | `npx skills add vercel-labs/agent-skills --skill vercel-react-native-skills` |
| [next-best-practices](https://skills.sh/vercel-labs/openreview/next-best-practices) | Next.js best practices covering file conventions, RSC boundaries, data patterns, and more | `npx skills add vercel-labs/openreview --skill next-best-practices` |
| [next-cache-components](https://skills.sh/vercel-labs/openreview/next-cache-components) | Next.js 16 Cache Components and PPR for mixing static, cached, and dynamic content | `npx skills add vercel-labs/openreview --skill next-cache-components` |
| [next-upgrade](https://skills.sh/vercel-labs/openreview/next-upgrade) | Upgrade Next.js to the latest version using official migration guides and codemods | `npx skills add vercel-labs/openreview --skill next-upgrade` |
| [cra-to-next-migration](https://skills.sh/vercel-labs/migration-skills/cra-to-next-migration) | Comprehensive guide for converting Create React App projects to Next.js | `npx skills add vercel-labs/migration-skills --skill cra-to-next-migration` |
| [turborepo](https://skills.sh/vercel/turborepo/turborepo) | Build system guide for JavaScript and TypeScript monorepos with task caching and parallel execution | `npx skills add vercel/turborepo` |


## AI SDK

Skills for building AI-powered applications with the Vercel AI SDK.

| Skill | Description | Install |
| --- | --- | --- |
| [ai-sdk](https://skills.sh/vercel/ai/ai-sdk) | Answer questions about the AI SDK and help build AI-powered features including agents, chatbots, and RAG systems | `npx skills add vercel/ai --skill ai-sdk` |
| [ai-elements](https://skills.sh/vercel/ai-elements/ai-elements) | Component library built on shadcn/ui for AI-native applications | `npx skills add vercel/ai-elements --skill ai-elements` |
| [streamdown](https://skills.sh/vercel/streamdown/streamdown) | Streaming-optimized React Markdown renderer with built-in security | `npx skills add vercel/streamdown --skill streamdown` |


## Design and UI

Skills for building accessible, performant user interfaces.

| Skill | Description | Install |
| --- | --- | --- |
| [web-design-guidelines](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines) | Review UI code for Web Interface Guidelines compliance with 100+ rules covering accessibility, performance, and UX | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |
| [building-components](https://skills.sh/vercel/components.build/building-components) | Guidance on building UI components with accessibility, composable APIs, and theming | `npx skills add vercel/components.build --skill building-components` |


## Browser automation

Skills for automating browser interactions.

| Skill | Description | Install |
| --- | --- | --- |
| [agent-browser](https://skills.sh/vercel-labs/agent-browser/agent-browser) | Browser automation CLI for AI agents including navigation, form filling, screenshots, and data extraction | `npx skills add vercel-labs/agent-browser` |


## Deployment

Skills for deploying applications to Vercel.

| Skill | Description | Install |
| --- | --- | --- |
| [vercel-deploy](https://skills.sh/vercel-labs/agent-skills/vercel-deploy) | Deploy applications and websites to Vercel instantly with framework auto-detection for 40+ frameworks | `npx skills add vercel-labs/agent-skills --skill vercel-deploy` |
| [vercel-cli](https://skills.sh/vercel/vercel/vercel-cli) | Deploy, manage, and develop projects on Vercel from the command line | `npx skills add vercel/vercel --skill vercel-cli` |
| [autoship](https://skills.sh/vercel-labs/autoship/autoship) | Automated releases with repository cloning, AI-powered changeset generation, and npm publishing | `npx skills add vercel-labs/autoship --skill autoship` |


## Commerce

Skills for building commerce and payment experiences.

| Skill | Description | Install |
| --- | --- | --- |
| [ucp](https://skills.sh/vercel-labs/agentic-commerce-skills/ucp) | Universal Commerce Protocol for checkout sessions, payments, and commerce operations | `npx skills add vercel-labs/agentic-commerce-skills --skill ucp` |


## Workflow

Skills for building durable, resilient workflows.

| Skill | Description | Install |
| --- | --- | --- |
| [workflow](https://skills.sh/vercel/workflow/workflow) | Durable, resilient async functions with retry logic and step-based orchestration | `npx skills add vercel/workflow --skill workflow` |


## JSON Render

Skills for the [JSON Render](https://github.com/vercel-labs/json-render) generative UI framework.

| Skill | Description | Install |
| --- | --- | --- |
| [json-render-core](https://skills.sh/vercel-labs/json-render/json-render-core) | Core package for schema definition, catalog creation, and spec streaming | `npx skills add vercel-labs/json-render --skill json-render-core` |
| [json-render-react](https://skills.sh/vercel-labs/json-render/json-render-react) | React renderer that converts JSON specs into React component trees | `npx skills add vercel-labs/json-render --skill json-render-react` |
| [json-render-react-native](https://skills.sh/vercel-labs/json-render/json-render-react-native) | React Native renderer for JSON specs with standard components and data binding | `npx skills add vercel-labs/json-render --skill json-render-react-native` |
| [json-render-remotion](https://skills.sh/vercel-labs/json-render/json-render-remotion) | Remotion renderer that turns JSON timeline specs into videos | `npx skills add vercel-labs/json-render --skill json-render-remotion` |
| [remotion-best-practices](https://skills.sh/vercel-labs/json-render/remotion-best-practices) | Best practices for Remotion video creation in React with 30+ rule files | `npx skills add vercel-labs/json-render --skill remotion-best-practices` |


## Utility

General-purpose skills for agent workflows.

| Skill | Description | Install |
| --- | --- | --- |
| [find-skills](https://skills.sh/vercel-labs/skills/find-skills) | Discover and install agent skills from the skills.sh directory | `npx skills add vercel-labs/skills --skill find-skills` |
| [before-and-after](https://skills.sh/vercel-labs/before-and-after/before-and-after) | Screenshot comparison tool for capturing before/after states of web pages | `npx skills add vercel-labs/before-and-after --skill before-and-after` |


## Finding more skills

Browse the [skills.sh directory](https://skills.sh) to discover skills from Vercel and the community. You can also search for skills using the CLI:

```bash filename="Terminal"
npx skills find <query>
```


---

[View full sitemap](/docs/sitemap)
