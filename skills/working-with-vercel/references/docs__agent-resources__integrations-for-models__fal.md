---
title: Vercel fal Integration
product: vercel
url: /docs/agent-resources/integrations-for-models/fal
canonical_url: "https://vercel.com/docs/agent-resources/integrations-for-models/fal"
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
summary: Learn how to add the fal native integration with Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/integrations-for-models/fal.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "ed6b17e3aac7401211959b8a99963db62030ed4958f749b558fbaee987b92e44"
---

# Vercel fal Integration

&#x20;enables the
development of real-time AI applications with a focus on rapid inference speeds,
achieving response times under ~120ms. Specializing in diffusion models, fal has
no cold starts and a pay-for-what-you-use pricing model.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Deep Infra Integration](https://vercel.com/docs/agent-resources/integrations-for-models/deepinfra?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Ffal&source_site=vercel-docs&relationship=related) — Learn how to add the Deep Infra native integration with Vercel.
- [Vercel xAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/xai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Ffal&source_site=vercel-docs&relationship=related) — Learn how to add the xAI native integration with Vercel.
- [Vercel ElevenLabs Integration](https://vercel.com/docs/agent-resources/integrations-for-models/elevenlabs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Ffal&source_site=vercel-docs&relationship=related) — Learn how to add the ElevenLabs connectable account integration with Vercel.
- [Vercel Together AI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/togetherai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Ffal&source_site=vercel-docs&relationship=related) — Learn how to add Together AI connectable account integration with Vercel.
- [Vercel Groq Integration](https://vercel.com/docs/agent-resources/integrations-for-models/groq?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Ffal&source_site=vercel-docs&relationship=related) — Learn how to add the Groq native integration with Vercel.

Full cross-link map for this page: [/docs/agent-resources/integrations-for-models/fal.graph.md](/docs/agent-resources/integrations-for-models/fal.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Ffal&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Use cases

You can use the [Vercel and fal integration](https://vercel.com/marketplace/fal) to power a variety of AI applications, including:

- **Text-to-image applications**: Use fal to integrate real-time text-to-image generation in applications, enabling users to create complex visual content from textual descriptions instantly
- **Real-time image processing**: Use fal for applications requiring instantaneous image analysis and modification, such as real-time filters, enhancements, or object recognition in streaming video
- **Depth maps creation**: Use fal's AI models for generating depth maps from images, supporting applications in 3D modeling, augmented reality, or advanced photography editing, where understanding the spatial relationships in images is crucial

### Available models

fal provides a diverse range of AI models designed for high-performance tasks in image and text processing.

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
