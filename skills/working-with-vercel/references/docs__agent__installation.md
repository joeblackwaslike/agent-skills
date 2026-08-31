---
title: Installation
product: vercel
url: /docs/agent/installation
canonical_url: "https://vercel.com/docs/agent/installation"
last_updated: 2026-08-25
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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "84027a31bb17a96355d266bec8e4cc4ccfd6f701dba5ef534a6c07a68c80b7c0"
---

# Installation

> **🔒 Permissions Required**: Vercel Agent Installation


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent?from=related&source_path=%2Fdocs%2Fagent%2Finstallation&source_site=vercel-docs&relationship=related) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Vercel Agent can now install Web Analytics and Speed insights for you](https://vercel.com/changelog/vercel-agent-installation?from=related&source_path=%2Fdocs%2Fagent%2Finstallation&source_site=vercel-docs&relationship=related)
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related&source_path=%2Fdocs%2Fagent%2Finstallation&source_site=vercel-docs&relationship=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Introducing the new Vercel Agent](https://vercel.com/blog/vercel-agent?from=related&source_path=%2Fdocs%2Fagent%2Finstallation&source_site=vercel-docs&relationship=related)
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel?from=related&source_path=%2Fdocs%2Fagent%2Finstallation&source_site=vercel-docs&relationship=related) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fagent%2Finstallation&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration?from=related&source_path=%2Fdocs%2Fagent%2Finstallation&source_site=vercel-docs&relationship=related) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [Interact with Integrations using Agent Tools](https://vercel.com/docs/integrations/install-an-integration/agent-tools?from=related&source_path=%2Fdocs%2Fagent%2Finstallation&source_site=vercel-docs&relationship=related) — Use Agent Tools to query, debug, and manage your installed integrations through a chat interface with natural language.
- [Getting started with Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart?from=related&source_path=%2Fdocs%2Fagent%2Finstallation&source_site=vercel-docs&relationship=related) — Vercel Web Analytics provides you detailed insights into your website's visitors. This quickstart guide will help you ge
- [Vercel Integrations](https://vercel.com/docs/integrations?from=related&source_path=%2Fdocs%2Fagent%2Finstallation&source_site=vercel-docs&relationship=related) — Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless conte

Full cross-link map for this page: [/docs/agent/installation.graph.md](/docs/agent/installation.graph.md?from=related&source_path=%2Fdocs%2Fagent%2Finstallation&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Vercel Agent Installation helps add [Web Analytics](/docs/analytics) and [Speed Insights](/docs/speed-insights) to your project with AI. After you start the installation, Vercel Agent automatically:

1. Analyzes your project configuration and connected repository
2. Installs the relevant package
3. Writes the code to integrate the package
4. Creates a pull request with all changes

## Getting started

> **💡 Note:** Vercel Agent Installation currently only supports projects with a GitHub repository connected.

To have Vercel Agent install **Web Analytics** or **Speed Insights** to your project:

1. Go to your [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D\&title=Open+Project) and select your GitHub-connected project.
2. Navigate to the **Analytics** or **Speed Insights** tab.
3. If needed, click **Enable** to turn on the feature.
4. Click the **Implement** button to start Vercel Agent.
5. Review the pull request and merge when ready.

Once the pull request is merged and deployed, tracking starts automatically. If you need to regenerate the pull request, click **Run Again**.

## Pricing

There is no charge for using Vercel Agent Installation. Standard usage charges for installed products, such as [Web Analytics](/docs/analytics/limits-and-pricing) or [Speed Insights](/docs/speed-insights/limits-and-pricing), still apply.

## Package manager and private packages

Vercel Agent runs the repository's normal install command in a secure sandbox when a workflow needs dependencies. The repository determines the package manager and lockfile behavior. Vercel Agent does not promise to rewrite a lockfile or convert a project between npm, pnpm, yarn, and Bun.

Private npm package installs are available only when the private npm capability is enabled for your team and the team has configured an `NPM_TOKEN` or an `NPM_RC` value with a token for `registry.npmjs.org`.

- Vercel Agent injects the credential at the sandbox network boundary. It does not write the token to `.npmrc`.
- `NPM_RC` takes precedence when it contains a usable default-registry token. Otherwise, Vercel Agent uses `NPM_TOKEN`.
- Authentication is limited to read requests to `registry.npmjs.org`, so installs can resolve private packages without authorizing publishing.
- `registry.yarnpkg.com` is not authenticated. Yarn works only when it resolves packages through the npm registry.
- Public packages remain available without a team credential. Private installs fail when no usable credential is configured.
- Package-manager commands are not automatically wrapped with `vercel env run`.

Vercel Agent does not support publishing, unpublishing, deprecating, changing dist-tags, changing package access or owners, or managing npm tokens from the sandbox. Do not pass npm credentials in a prompt or command.


---

[View full sitemap](/docs/sitemap)
