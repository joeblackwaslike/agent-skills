---
title: Installation
product: vercel
url: /docs/agent/installation
canonical_url: "https://vercel.com/docs/agent/installation"
last_updated: 2026-09-18
type: how-to
prerequisites:
  - /docs/agent
related:
  - /docs/analytics
  - /docs/speed-insights
  - /docs/analytics/limits-and-pricing
  - /docs/speed-insights/limits-and-pricing
  - /docs/agent/private-dependencies
summary: Let AI automatically install Web Analytics and Speed Insights in your app
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/installation.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "0dc3f1e0d64192f608ebd52ffac149c41c7179251f9f19cfd5411d4570fd32f9"
---

# Installation

> **Availability**: Vercel Agent Installation (Public Beta) is available on all plans

Vercel Agent Installation helps add [Web Analytics](/docs/analytics) and [Speed Insights](/docs/speed-insights) to your project with AI. After you start the installation, Vercel Agent automatically:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Vercel Agent can now install Web Analytics and Speed insights for you](https://vercel.com/changelog/vercel-agent-installation)
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Introducing the new Vercel Agent](https://vercel.com/blog/vercel-agent)
- [Introducing Vercel Agent: Your new Vercel teammate](https://vercel.com/blog/introducing-vercel-agent)
- [Build with AI agents on Vercel](https://vercel.com/docs/agent-resources/integrations-for-agents) — Install AI agents and services through the Vercel Marketplace to automate workflows and build custom AI systems.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [Getting started with Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart) — Vercel Web Analytics provides you detailed insights into your website's visitors. This quickstart guide will help you ge
- [Interact with Integrations using Agent Tools](https://vercel.com/docs/integrations/install-an-integration/agent-tools) — Use Agent Tools to query, debug, and manage your installed integrations through a chat interface with natural language.

Full cross-link map for this page: [/docs/agent/installation.graph.md](/docs/agent/installation.graph.md)
<!-- /docsgraph:related -->

1. Analyzes your project configuration and connected repository
2. Installs the relevant package
3. Writes the code to integrate the package
4. Creates a pull request with all changes

## Getting started

> **💡 Note:** Vercel Agent Installation currently only supports projects with a GitHub repository connected.

To have Vercel Agent install **Web Analytics** or **Speed Insights** to your project:

1. Go to your [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D\&title=Open+Project) and select your GitHub-connected project.
2. Navigate to the **Analytics** or **Speed Insights** tab.
3. Web Analytics only: click **Enable** to turn on the feature.
4. Click the **Implement** button to start Vercel Agent.
5. Review the pull request and merge when ready.

Once the pull request is merged and deployed, tracking starts automatically. If you need to regenerate the pull request, click **Run Again**.

## Pricing

There is no charge for using Vercel Agent Installation. Standard usage charges for installed products, such as [Web Analytics](/docs/analytics/limits-and-pricing) or [Speed Insights Plus](/docs/speed-insights/limits-and-pricing), still apply.

## Package manager and private packages

Vercel Agent runs the repository's normal install command in a secure sandbox when a workflow needs dependencies. The repository determines the package manager and lockfile behavior. Vercel Agent does not promise to rewrite a lockfile or convert a project between npm, pnpm, yarn, and Bun.

To install private npm packages, [configure your team's shared registry credentials](/docs/agent/private-dependencies).


---

[View full sitemap](/docs/sitemap)
