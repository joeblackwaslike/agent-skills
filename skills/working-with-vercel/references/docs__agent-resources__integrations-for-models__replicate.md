---
title: Vercel Replicate Integration
product: vercel
url: /docs/agent-resources/integrations-for-models/replicate
canonical_url: "https://vercel.com/docs/agent-resources/integrations-for-models/replicate"
last_updated: 2026-02-10
type: how-to
prerequisites:
  - /docs/agent-resources/integrations-for-models
  - /docs/agent-resources
related:
  - /docs/projects/overview
  - /docs/cli
  - /docs/cli/env
summary: Learn how to add Replicate connectable account integration with Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/integrations-for-models/replicate.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "760b9c3dc737fcd1c4d21a596919bd835970a71d20a4a5ef56a065cea4ede2f7"
---

# Vercel Replicate Integration

&#x20;provides a platform for
accessing and deploying a wide range of open-source artificial intelligence
models. These models span various AI applications such as image and video
processing, natural language processing, and audio synthesis. With the Vercel
Replicate integration, you can incorporate these AI capabilities into your
applications, enabling advanced functionalities and enhancing user experiences.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel ElevenLabs Integration](https://vercel.com/docs/agent-resources/integrations-for-models/elevenlabs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Freplicate&source_site=vercel-docs&relationship=related) — Learn how to add the ElevenLabs connectable account integration with Vercel.
- [Vercel xAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/xai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Freplicate&source_site=vercel-docs&relationship=related) — Learn how to add the xAI native integration with Vercel.
- [Vercel Together AI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/togetherai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Freplicate&source_site=vercel-docs&relationship=related) — Learn how to add Together AI connectable account integration with Vercel.
- [Vercel Deep Infra Integration](https://vercel.com/docs/agent-resources/integrations-for-models/deepinfra?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Freplicate&source_site=vercel-docs&relationship=related) — Learn how to add the Deep Infra native integration with Vercel.
- [Vercel fal Integration](https://vercel.com/docs/agent-resources/integrations-for-models/fal?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Freplicate&source_site=vercel-docs&relationship=related) — Learn how to add the fal native integration with Vercel.

Full cross-link map for this page: [/docs/agent-resources/integrations-for-models/replicate.graph.md](/docs/agent-resources/integrations-for-models/replicate.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Freplicate&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Use cases

You can use the Vercel and Replicate integration to power a variety of AI applications, including:

- **Content generation**: Use Replicate for generating text, images, and audio content in creative and marketing applications
- **Image and video processing**: Use Replicate in applications for image enhancement, style transfer, or object detection
- **NLP and chat-bots**: Use Replicate's language processing models in chat-bots and natural language interfaces

### Available models

Replicate models cover a broad spectrum of AI applications ranging from image and video processing to natural language processing and audio synthesis.

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

## Deploy a template

You can deploy a template to Vercel that uses a pre-trained model from Replicate:

## More resources


---

[View full sitemap](/docs/sitemap)
