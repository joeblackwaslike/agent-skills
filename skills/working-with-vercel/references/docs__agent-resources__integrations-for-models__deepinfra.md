---
title: Vercel Deep Infra Integration
product: vercel
url: /docs/agent-resources/integrations-for-models/deepinfra
canonical_url: "https://vercel.com/docs/agent-resources/integrations-for-models/deepinfra"
last_updated: 2026-02-10
type: how-to
prerequisites:
  - /docs/agent-resources/integrations-for-models
  - /docs/agent-resources
related:
  - /docs/projects/overview
  - /docs/cli
  - /docs/cli/env
  - /docs/cli/install
summary: Learn how to add the Deep Infra native integration with Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/integrations-for-models/deepinfra.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "593603c10cc02d21d69883f4dfb2c6d5452ad0274b1509c834fd5cef3813d8ca"
---

# Vercel Deep Infra Integration

&#x20;provides scalable and
cost-effective infrastructure for deploying and managing machine learning
models. It's optimized for reduced latency and low costs compared to traditional
cloud providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel fal Integration](https://vercel.com/docs/agent-resources/integrations-for-models/fal?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fdeepinfra&source_site=vercel-docs&relationship=related) — Learn how to add the fal native integration with Vercel.
- [Vercel xAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/xai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fdeepinfra&source_site=vercel-docs&relationship=related) — Learn how to add the xAI native integration with Vercel.
- [Vercel Together AI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/togetherai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fdeepinfra&source_site=vercel-docs&relationship=related) — Learn how to add Together AI connectable account integration with Vercel.
- [Vercel Groq Integration](https://vercel.com/docs/agent-resources/integrations-for-models/groq?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fdeepinfra&source_site=vercel-docs&relationship=related) — Learn how to add the Groq native integration with Vercel.
- [Adding a Provider](https://vercel.com/docs/agent-resources/integrations-for-models/adding-a-provider?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fdeepinfra&source_site=vercel-docs&relationship=related) — Learn how to add a new AI provider to your Vercel projects.

Full cross-link map for this page: [/docs/agent-resources/integrations-for-models/deepinfra.graph.md](/docs/agent-resources/integrations-for-models/deepinfra.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fdeepinfra&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

This integration gives you access to the large selection of available AI models and allows you to manage your tokens, billing and usage directly from Vercel.

## Use cases

You can use the [Vercel and Deep Infra integration](https://vercel.com/marketplace/deepinfra) to:

- Seamlessly connect AI models such as DeepSeek and Llama with your Vercel projects.
- Deploy and run inference with high-performance AI models optimized for speed and efficiency.

### Available models

Deep Infra provides a diverse range of AI models designed for high-performance tasks for a variety of applications.

## Getting started

The Vercel  integration can be accessed through the **AI** tab on your [Vercel dashboard](/dashboard).

### Prerequisites

To follow this guide, you'll need the following:

- An existing [Vercel project](/docs/projects/overview#creating-a-project)
- The latest version of [Vercel CLI](/docs/cli#installing-vercel-cli)
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i vercel
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i vercel
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i vercel
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i vercel
      ```
    </Code>
  </CodeBlock>

### Add the provider to your project

#### Using the dashboard

1. Navigate to the **AI** tab in your [Vercel dashboard](/dashboard)
2. Select  from the list of providers, and press **Add**
3. Review the provider information, and press **Add Provider**
4. You can now select which projects the provider will have access to. You can choose from **All Projects** or **Specific Projects**
   - If you select **Specific Projects**, you'll be prompted to select the projects you want to connect to the provider. The list will display projects associated with your scoped team
   - Multiple projects can be selected during this step
5. Select the **Connect to Project** button
6. You'll be redirected to the provider's website to complete the connection process
7. Once the connection is complete, you'll be redirected back to the Vercel dashboard, and the provider integration dashboard page. From here you can manage your provider settings, view usage, and more
8. Pull the environment variables into your project using [Vercel CLI](/docs/cli/env). Link the project first if you haven't already; `vercel env pull` requires a linked project (or `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` to be set).
   ```bash filename="terminal"
   vercel link
   vercel env pull
   ```
9. Install the providers package
10. Connect your project using the code below:

#### Using the CLI

1. Add the provider to your project using the [Vercel CLI `install`](/docs/cli/install) command

   During this process, you will be asked to open the dashboard to accept the
   marketplace terms if you have not installed this integration before. You can
   also choose which project(s) the provider will have access to.
2. Install the providers package
3. Connect your project using the code below:

## More resources


---

[View full sitemap](/docs/sitemap)
