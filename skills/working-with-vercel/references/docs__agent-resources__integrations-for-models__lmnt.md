---
title: Vercel LMNT Integration
product: vercel
url: /docs/agent-resources/integrations-for-models/lmnt
canonical_url: "https://vercel.com/docs/agent-resources/integrations-for-models/lmnt"
last_updated: 2026-02-10
type: how-to
prerequisites:
  - /docs/agent-resources/integrations-for-models
  - /docs/agent-resources
related:
  - /docs/projects/overview
  - /docs/cli
  - /docs/cli/env
summary: Learn how to add LMNT connectable account integration with Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/integrations-for-models/lmnt.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "a342408e897921f3bf6e573c6d8c9799b6606a9a1fce084123c5bdd6a92d582f"
---

# Vercel LMNT Integration

&#x20;provides data processing and
predictive analytics models, known for their precision and efficiency.
Integrating LMNT with Vercel enables your applications to offer accurate
insights and forecasts, particularly useful in finance and healthcare sectors.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel ElevenLabs Integration](https://vercel.com/docs/agent-resources/integrations-for-models/elevenlabs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Flmnt&source_site=vercel-docs&relationship=related) — Learn how to add the ElevenLabs connectable account integration with Vercel.
- [Vercel Deep Infra Integration](https://vercel.com/docs/agent-resources/integrations-for-models/deepinfra?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Flmnt&source_site=vercel-docs&relationship=related) — Learn how to add the Deep Infra native integration with Vercel.
- [Vercel xAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/xai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Flmnt&source_site=vercel-docs&relationship=related) — Learn how to add the xAI native integration with Vercel.
- [Vercel fal Integration](https://vercel.com/docs/agent-resources/integrations-for-models/fal?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Flmnt&source_site=vercel-docs&relationship=related) — Learn how to add the fal native integration with Vercel.
- [Vercel Perplexity Integration](https://vercel.com/docs/agent-resources/integrations-for-models/perplexity?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Flmnt&source_site=vercel-docs&relationship=related) — Learn how to add Perplexity connectable account integration with Vercel.

Full cross-link map for this page: [/docs/agent-resources/integrations-for-models/lmnt.graph.md](/docs/agent-resources/integrations-for-models/lmnt.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Flmnt&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Use cases

You can use the Vercel and LMNT integration to power a variety of AI applications, including:

- **High quality text-to-speech**: Use LMNT to generate realistic speech that powers chatbots, AI-agents, games, and other digital media
- **Studio quality custom voices**: Use LMNT to clone voices that will faithfully reproduce the emotional richness and realism of actual speech
- **Reliably low latency, full duplex streaming**: Use LMNT to enable superior performance for conversational experiences, with consistently low latency and unmatched reliability

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

## More resources


---

[View full sitemap](/docs/sitemap)
