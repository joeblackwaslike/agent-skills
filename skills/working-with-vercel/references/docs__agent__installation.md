---
title: Installation
product: vercel
url: /docs/agent/installation
canonical_url: "https://vercel.com/docs/agent/installation"
last_updated: 2026-02-17
type: how-to
prerequisites:
  - /docs/agent
related:
  - /docs/analytics
  - /docs/speed-insights
  - /docs/analytics/limits-and-pricing
  - /docs/speed-insights/limits-and-pricing
summary: Let AI automatically install Web Analytics and Speed Insights in your app
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/installation.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "7221dbb06506c01266f92684a1022030164769b0bc6f8070fbcf2d47db94dc34"
---

# Installation

> **🔒 Permissions Required**: Agent Installation


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent?from=related) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Using Vercel Agent to review pull requests](https://vercel.com/kb/guide/vercel-agent-code-review?from=related) — Set up Vercel Agent Code Review to automatically review pull requests, apply validated fixes, request reviews with @verc
- [Integrations for Agents](https://vercel.com/docs/agent-resources/integrations-for-agents?from=related) — Install AI agents and services through the Vercel Marketplace to automate workflows and build custom AI systems.
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Pricing](https://vercel.com/docs/agent/pricing?from=related) — Understand how Vercel Agent pricing works and how to manage your credits
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration?from=related) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [Getting Started](https://vercel.com/docs/analytics/quickstart?from=related) — Vercel Web Analytics provides you detailed insights into your website's visitors. This quickstart guide will help you ge

Full cross-link map for this page: [/docs/agent/installation.graph.md](/docs/agent/installation.graph.md)
<!-- /docsgraph:related -->

Vercel Agent Installation helps add [Web Analytics](/docs/analytics) and [Speed Insights](/docs/speed-insights) to your project with AI. After you start the installation, Vercel Agent automatically:

1. Analyzes your project configuration and connected repository
2. Installs the relevant package
3. Writes the code to integrate the package
4. Creates a pull request with all changes

## Getting started

> **💡 Note:** Agent Installation currently only supports projects with a GitHub repository connected.

To have Vercel Agent install **Web Analytics** or **Speed Insights** to your project:

1. Go to your [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D\&title=Open+Project) and select your GitHub-connected project.
2. Navigate to the **Analytics** or **Speed Insights** tab.
3. If needed, click **Enable** to turn on the feature.
4. Click the **Implement** button to start the agent.
5. Review the pull request and merge when ready.

Once the pull request is merged and deployed, tracking starts automatically. If you need to regenerate the pull request, click **Run Again**.

## Pricing

Vercel Agent Installation is free for all teams. There are no additional costs to use the agent itself.

Billing is based on usage of the underlying features. For example, after the agent installs Web Analytics, you will be charged for [Web Analytics usage](/docs/analytics/limits-and-pricing). The same applies to [Speed Insights usage](/docs/speed-insights/limits-and-pricing).


---

[View full sitemap](/docs/sitemap)
