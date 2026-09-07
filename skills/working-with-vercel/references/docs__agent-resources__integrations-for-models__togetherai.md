---
title: Vercel Together AI Integration
product: vercel
url: /docs/agent-resources/integrations-for-models/togetherai
canonical_url: "https://vercel.com/docs/agent-resources/integrations-for-models/togetherai"
last_updated: 2026-02-10
type: how-to
prerequisites:
  - /docs/agent-resources/integrations-for-models
  - /docs/agent-resources
related:
  - /docs/projects/overview
  - /docs/cli
  - /docs/cli/env
summary: Learn how to add Together AI connectable account integration with Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/integrations-for-models/togetherai.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "cc7e491395454009e2e2d7ba05219692f3ce7a8f7de7f8748450c4c85e9f24a1"
---

# Vercel Together AI Integration

&#x20;offers models for interactive
AI experiences, focusing on collaborative and real-time engagement. Integrating
Together AI with Vercel empowers your applications with enhanced user
interaction and co-creative functionalities.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel xAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/xai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Ftogetherai&source_site=vercel-docs&relationship=related) — Learn how to add the xAI native integration with Vercel.
- [Vercel ElevenLabs Integration](https://vercel.com/docs/agent-resources/integrations-for-models/elevenlabs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Ftogetherai&source_site=vercel-docs&relationship=related) — Learn how to add the ElevenLabs connectable account integration with Vercel.
- [Vercel Deep Infra Integration](https://vercel.com/docs/agent-resources/integrations-for-models/deepinfra?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Ftogetherai&source_site=vercel-docs&relationship=related) — Learn how to add the Deep Infra native integration with Vercel.
- [Vercel fal Integration](https://vercel.com/docs/agent-resources/integrations-for-models/fal?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Ftogetherai&source_site=vercel-docs&relationship=related) — Learn how to add the fal native integration with Vercel.
- [Adding a Model](https://vercel.com/docs/agent-resources/integrations-for-models/adding-a-model?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Ftogetherai&source_site=vercel-docs&relationship=related) — Learn how to add a new AI model to your Vercel projects

Full cross-link map for this page: [/docs/agent-resources/integrations-for-models/togetherai.graph.md](/docs/agent-resources/integrations-for-models/togetherai.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Ftogetherai&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Use cases

You can use the Vercel and Together AI integration to power a variety of AI applications, including:

- **Co-creative platforms**: Use Together AI in platforms that enable collaborative creative processes, such as design or writing
- **Interactive learning environments**: Use Together AI in educational tools for interactive and adaptive learning experiences
- **Real-time interaction tools**: Use Together AI for developing applications that require real-time user interaction and engagement

### Available models

Together AI offers models that specialize in collaborative and interactive AI experiences. These models are adept at facilitating real-time interaction, enhancing user engagement, and supporting co-creative processes.

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
