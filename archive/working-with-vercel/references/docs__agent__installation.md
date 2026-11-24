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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent/installation.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "01214be02c886a0f3c473f020f326492a6722c77185d747d664306e3de5b32e0"
---

# Installation

> Vercel Agent Installation is available in Public Beta on all plans
>
> Those with the owner, member and developer roles can use this feature

Vercel Agent Installation helps add [Web Analytics](/docs/analytics) and [Speed Insights](/docs/speed-insights) to your project with AI. After you start the installation, Vercel Agent automatically:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Vercel Agent can now install Web Analytics and Speed insights for you](https://vercel.com/changelog/vercel-agent-installation)
- [Introducing the new Vercel Agent](https://vercel.com/blog/vercel-agent)
- [Build with AI agents on Vercel](https://vercel.com/docs/agent-resources/integrations-for-agents) — Install AI agents and services through the Vercel Marketplace to automate workflows and build custom AI systems.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [vercel setup](https://vercel.com/docs/cli/setup) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code, Codex, and OpenCode, and co
- [Getting started with Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart) — Vercel Web Analytics provides you detailed insights into your website's visitors. This quickstart guide will help you ge

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
4. Click the **Implement with Vercel Agent** button to start Vercel Agent.
5. Review the pull request and merge when ready.

Once the pull request is merged and deployed, tracking starts automatically. If you need to regenerate the pull request, click **Run Again**.

## Pricing

There is no charge for using Vercel Agent Installation. Standard usage charges for installed products, such as [Web Analytics](/docs/analytics/limits-and-pricing) or [Speed Insights Plus](/docs/speed-insights/limits-and-pricing), still apply.

## Package manager and private packages

Vercel Agent runs the repository's normal install command in a secure sandbox when a workflow needs dependencies. The repository determines the package manager and lockfile behavior. Vercel Agent does not promise to rewrite a lockfile or convert a project between npm, pnpm, yarn, and Bun.

To install private npm packages, [configure your team's shared registry credentials](/docs/agent/private-dependencies).

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
