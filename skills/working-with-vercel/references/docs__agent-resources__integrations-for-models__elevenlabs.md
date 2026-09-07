---
title: Vercel ElevenLabs Integration
product: vercel
url: /docs/agent-resources/integrations-for-models/elevenlabs
canonical_url: "https://vercel.com/docs/agent-resources/integrations-for-models/elevenlabs"
last_updated: 2026-02-10
type: how-to
prerequisites:
  - /docs/agent-resources/integrations-for-models
  - /docs/agent-resources
related:
  - /docs/projects/overview
  - /docs/cli
  - /docs/cli/env
summary: Learn how to add the ElevenLabs connectable account integration with Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/integrations-for-models/elevenlabs.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "7b2109eea9b9f67a5e78b807c5f8c4d0ff28ddcdd44e36c9db073af4fa5804ac"
---

# Vercel ElevenLabs Integration

&#x20;specializes in advanced voice
synthesis and audio processing technologies. Its integration with Vercel allows
you to incorporate realistic voice and audio enhancements into your
applications, ideal for creating interactive media experiences.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel xAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/xai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Felevenlabs&source_site=vercel-docs&relationship=related) — Learn how to add the xAI native integration with Vercel.
- [Vercel LMNT Integration](https://vercel.com/docs/agent-resources/integrations-for-models/lmnt?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Felevenlabs&source_site=vercel-docs&relationship=related) — Learn how to add LMNT connectable account integration with Vercel.
- [Vercel Together AI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/togetherai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Felevenlabs&source_site=vercel-docs&relationship=related) — Learn how to add Together AI connectable account integration with Vercel.
- [Vercel fal Integration](https://vercel.com/docs/agent-resources/integrations-for-models/fal?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Felevenlabs&source_site=vercel-docs&relationship=related) — Learn how to add the fal native integration with Vercel.
- [Vercel Deep Infra Integration](https://vercel.com/docs/agent-resources/integrations-for-models/deepinfra?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Felevenlabs&source_site=vercel-docs&relationship=related) — Learn how to add the Deep Infra native integration with Vercel.

Full cross-link map for this page: [/docs/agent-resources/integrations-for-models/elevenlabs.graph.md](/docs/agent-resources/integrations-for-models/elevenlabs.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Felevenlabs&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Use cases

You can use the Vercel and ElevenLabs integration to power a variety of AI applications, including:

- **Voice synthesis**: Use ElevenLabs for generating natural-sounding synthetic voices in applications such as virtual assistants or audio-books
- **Audio enhancement**: Use ElevenLabs to enhance audio quality in applications, including noise reduction and sound clarity improvement
- **Interactive media**: Use ElevenLabs to implement voice synthesis and audio processing in interactive media and gaming for realistic soundscapes

### Available models

ElevenLabs offers models that specialize in advanced voice synthesis and audio processing, delivering natural-sounding speech and audio enhancements suitable for various interactive media applications.

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
