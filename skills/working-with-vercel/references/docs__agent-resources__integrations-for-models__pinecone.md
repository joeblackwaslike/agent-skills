---
title: Vercel Pinecone Integration
product: vercel
url: /docs/agent-resources/integrations-for-models/pinecone
canonical_url: "https://vercel.com/docs/agent-resources/integrations-for-models/pinecone"
last_updated: 2026-02-10
type: how-to
prerequisites:
  - /docs/agent-resources/integrations-for-models
  - /docs/agent-resources
related:
  - /docs/projects/overview
  - /docs/cli
  - /docs/cli/env
summary: Learn how to add Pinecone connectable account integration with Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/integrations-for-models/pinecone.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "bc7ac2a94ac205888fb7d269b1530d70a579998d6dd78d5ebe887245c86ae77d"
---

# Vercel Pinecone Integration

&#x20;is a [vector
database](/kb/guide/vector-databases) service that handles the storage and search
of complex data. With Pinecone, you can use machine-learning models for content
recommendation systems, personalized search, image recognition, and more. The
Vercel Pinecone integration allows you to deploy your models to Vercel and use
them in your applications.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Deep Infra Integration](https://vercel.com/docs/agent-resources/integrations-for-models/deepinfra?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fpinecone&source_site=vercel-docs&relationship=related) — Learn how to add the Deep Infra native integration with Vercel.
- [Vercel fal Integration](https://vercel.com/docs/agent-resources/integrations-for-models/fal?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fpinecone&source_site=vercel-docs&relationship=related) — Learn how to add the fal native integration with Vercel.
- [Vercel Perplexity Integration](https://vercel.com/docs/agent-resources/integrations-for-models/perplexity?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fpinecone&source_site=vercel-docs&relationship=related) — Learn how to add Perplexity connectable account integration with Vercel.
- [Vercel Replicate Integration](https://vercel.com/docs/agent-resources/integrations-for-models/replicate?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fpinecone&source_site=vercel-docs&relationship=related) — Learn how to add Replicate connectable account integration with Vercel.
- [Vercel Together AI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/togetherai?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fpinecone&source_site=vercel-docs&relationship=related) — Learn how to add Together AI connectable account integration with Vercel.

Full cross-link map for this page: [/docs/agent-resources/integrations-for-models/pinecone.graph.md](/docs/agent-resources/integrations-for-models/pinecone.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fintegrations-for-models%2Fpinecone&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**What is a vector database?**

A vector database is a database that stores and searches for vectors. In this context, a vector represents a data point mathematically, often termed as an embedding.

An embedding is data that's converted to an array of numbers (a vector). The combination of the numbers that make up the vector form a multi-dimensional map used in comparison to other vectors to determine similarity.

Take the below example of two vectors, one for an image of a cat and one for an image of a dog. In the cat's vector, the first element is `0.1`, and in the dog's vector `0.2`. This similarity and difference in values illustrate how vector comparison works. The closer the values are to each other, the more similar the vectors are.

```js filename="vectors"
// Example of a vector for an image of a cat
[0.1, 0.2, 0.3, 0.4, 0.5];
// Example of a vector for an image of a dog
[(0.2, 0.3, 0.4, 0.5, 0.6)];
```

## Use cases

You can use the Vercel and Pinecone integration to power a variety of AI applications, including:

- **Personalized search**: Use Pinecone's vector database to provide personalized search results. By analyzing user behavior and preferences as vectors, search engines can suggest results that are likely to interest the user
- **Image and video retrieval**: Use Pinecone's vector database in image and video retrieval systems. They can quickly find images or videos similar to a given input by comparing embeddings that represent visual content
- **Recommendation systems**: Use Pinecone's vector database in e-commerce apps and streaming services to help power recommendation systems. By analyzing user behavior, preferences, and item characteristics as vectors, these systems can suggest products, movies, or articles that are likely to interest the user

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

You can deploy a template to Vercel that includes a pre-trained model and a sample application that uses the model:

## More resources


---

[View full sitemap](/docs/sitemap)
