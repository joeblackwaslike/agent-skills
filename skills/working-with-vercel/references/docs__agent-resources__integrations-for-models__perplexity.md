---
title: Vercel Perplexity Integration
product: vercel
url: /docs/agent-resources/integrations-for-models/perplexity
canonical_url: "https://vercel.com/docs/agent-resources/integrations-for-models/perplexity"
last_updated: 2026-02-10
type: how-to
prerequisites:
  - /docs/agent-resources/integrations-for-models
  - /docs/agent-resources
related:
  - /docs/projects/overview
  - /docs/cli
  - /docs/cli/env
summary: Learn how to add Perplexity connectable account integration with Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/integrations-for-models/perplexity.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "ced9d26aa397387eaeb35d72078b4292f7f11249733638115f8057440be4a4df"
---

# Vercel Perplexity Integration

&#x20;specializes in providing
accurate, real-time answers to user questions by combining AI-powered search
with large language models, delivering concise, well-sourced, and conversational
responses. Integrating Perplexity via its [Sonar
API](https://sonar.perplexity.ai/) with Vercel allows your applications to
deliver real-time, web-wide research and question-answering
capabilities—complete with accurate citations, customizable sources, and
advanced reasoning—enabling users to access up-to-date, trustworthy information
directly within your product experience.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Access Perplexity Web Search on Vercel AI Gateway with any model](https://vercel.com/changelog/access-perplexity-web-search-on-vercel-ai-gateway-with-any-model?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fperplexity&source_site=vercel-docs&relationship=related)
- [Vercel ElevenLabs Integration](https://vercel.com/docs/agent-resources/integrations-for-models/elevenlabs?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fperplexity&source_site=vercel-docs&relationship=related) — Learn how to add the ElevenLabs connectable account integration with Vercel.
- [Vercel xAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/xai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fperplexity&source_site=vercel-docs&relationship=related) — Learn how to add the xAI native integration with Vercel.
- [Vercel Deep Infra Integration](https://vercel.com/docs/agent-resources/integrations-for-models/deepinfra?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fperplexity&source_site=vercel-docs&relationship=related) — Learn how to add the Deep Infra native integration with Vercel.
- [Vercel fal Integration](https://vercel.com/docs/agent-resources/integrations-for-models/fal?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fperplexity&source_site=vercel-docs&relationship=related) — Learn how to add the fal native integration with Vercel.
- [Vercel Pinecone Integration](https://vercel.com/docs/agent-resources/integrations-for-models/pinecone?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fperplexity&source_site=vercel-docs&relationship=related) — Learn how to add Pinecone connectable account integration with Vercel.

Full cross-link map for this page: [/docs/agent-resources/integrations-for-models/perplexity.graph.md](/docs/agent-resources/integrations-for-models/perplexity.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fperplexity&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Use cases

You can use the Vercel and Perplexity integration to power a variety of AI applications, including:

- **Real-time, citation-backed answers:** Integrate Perplexity to provide users with up-to-date information grounded in live web data, complete with detailed source citations for transparency and trust.
- **Customizable search and data sourcing:** Tailor your application's responses by specifying which sources Perplexity should use, ensuring compliance and relevance for your domain or industry.
- **Complex, multi-step query handling:** Leverage advanced models like Sonar Pro to process nuanced, multi-part questions, deliver in-depth research, and support longer conversational context windows.
- **Optimized speed and efficiency:** Benefit from Perplexity's lightweight, fast models that deliver nearly instant answers at scale, making them ideal for high-traffic or cost-sensitive applications.
- **Fine-grained output control:** Adjust model parameters (e.g., creativity, repetition) and manage output quality to align with your application's unique requirements and user expectations.

### Available models

The Sonar models are each optimized for tasks such as real-time search, advanced reasoning, and in-depth research. Please refer to Perplexity's list of available models [here](https://docs.perplexity.ai/models/model-cards).

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
