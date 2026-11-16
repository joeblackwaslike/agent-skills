---
title: Build with AI on Vercel
product: vercel
url: /docs/agent-resources/integrations-for-models
canonical_url: "https://vercel.com/docs/agent-resources/integrations-for-models"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  - /docs/agent-resources
related:
  - /docs/agent-resources/integrations-for-models/pinecone
  - /docs/agent-resources/integrations-for-models/adding-a-provider
  - /docs/agent-resources/integrations-for-models/adding-a-model
  - /docs/agent-resources/integrations-for-models/xai
  - /docs/agent-resources/integrations-for-models/groq
summary: Integrate powerful AI services and models seamlessly into your Vercel projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/integrations-for-models.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "b5c4b794adcc99cee46bdefa8a4cd16039e1f7cc7066c6f6528282061d78c2db"
---

# Build with AI on Vercel

AI services and models help enhance and automate the building and deployment of applications for various use cases:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing AI Integrations on Vercel](https://vercel.com/blog/ai-integrations)
- [xAI and Vercel partner to bring zero-friction AI to developers](https://vercel.com/blog/xai-and-vercel-partner-to-bring-zero-friction-ai-to-developers)
- [AI Integrations and playground in the Vercel Dashboard](https://vercel.com/changelog/ai-integration-and-playground-in-the-vercel-dashboard)
- [Groq, fal, and DeepInfra join the Vercel Marketplace ](https://vercel.com/changelog/groq-fal-and-deepinfra-join-the-vercel-marketplace)
- [Introducing AI agents & services on the Vercel Marketplace](https://vercel.com/changelog/introducing-ai-agents-and-services-on-the-vercel-marketplace)
- [Build with AI agents on Vercel](https://vercel.com/docs/agent-resources/integrations-for-agents) — Install AI agents and services through the Vercel Marketplace to automate workflows and build custom AI systems.
- [Vercel Integrations](https://vercel.com/docs/integrations) — Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless conte
- [Vercel AI Gateway: Models, Routing, and Observability](https://vercel.com/docs/ai-gateway) — A hosted AI gateway for any cloud or language. Centralize credentials, request logs, cost tracking, budgets, prompt cach
- [AI Gateway Framework Integrations](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations) — Connect Flue, LangChain, LiteLLM, LlamaIndex, Mastra, Pydantic AI, TanStack AI, and other frameworks to Vercel AI Gatewa
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.

Full cross-link map for this page: [/docs/agent-resources/integrations-for-models.graph.md](/docs/agent-resources/integrations-for-models.graph.md)
<!-- /docsgraph:related -->

- Chatbots and virtual assistants improve customer interactions.
- AI-powered content generation automates and optimizes digital content.
- Recommendation systems deliver personalized experiences.
- Natural language processing (NLP) enables advanced text analysis and translation.
- Retrieval-augmented generation (RAG) enhances documentation with context-aware responses.
- AI-driven image and media services optimize visual content.

## Integrating with AI providers

With Vercel AI integrations, you can build and deploy these AI-powered applications efficiently. Through the Vercel Marketplace, you can research which AI service fits your needs with example use cases. Then, you can install and manage two types of AI integrations:

- **Native integrations**: Built-in solutions that work seamlessly with Vercel and include resources with built-in billing and account provisioning.
- **Connectable accounts**: Third-party services you can link to your projects, such as the [Pinecone vector database](/docs/agent-resources/integrations-for-models/pinecone) for search and recommendation features.

## Using AI integrations

To view your installed AI integrations, open **Integrations** in the sidebar of your Vercel [dashboard](/dashboard). The page lists your installed native and connectable account integrations. To browse and install AI providers and services, select **Browse Marketplace**.

See the [adding a provider](/docs/agent-resources/integrations-for-models/adding-a-provider) guide to learn how to add a provider to your Vercel project, or the [adding a model](/docs/agent-resources/integrations-for-models/adding-a-model) guide to learn how to add a model to your Vercel project.

## Featured AI integrations

**xAI** (Marketplace native integration): An AI service with an efficient text model and a wide context image understanding model. [Learn more →](/docs/agent-resources/integrations-for-models/xai)

**Groq** (Marketplace native integration): A high-performance AI inference service with an ultra-fast Language Processing Unit (LPU) architecture. [Learn more →](/docs/agent-resources/integrations-for-models/groq)

**fal** (Marketplace native integration): A serverless AI inferencing platform for creative processes. [Learn more →](/docs/agent-resources/integrations-for-models/fal)

**DeepInfra** (Marketplace native integration): A platform with access to a vast library of open-source models. [Learn more →](/docs/agent-resources/integrations-for-models/deepinfra)

**Perplexity** (Marketplace connectable account): Learn how to integrate Perplexity with Vercel. [Learn more →](/docs/agent-resources/integrations-for-models/perplexity)

**Replicate** (Marketplace connectable account): Learn how to integrate Replicate with Vercel. [Learn more →](/docs/agent-resources/integrations-for-models/replicate)

**ElevenLabs** (Marketplace connectable account): Learn how to integrate ElevenLabs with Vercel. [Learn more →](/docs/agent-resources/integrations-for-models/elevenlabs)

**LMNT** (Marketplace connectable account): Learn how to integrate LMNT with Vercel. [Learn more →](/docs/agent-resources/integrations-for-models/lmnt)

**Together AI** (Marketplace connectable account): Learn how to integrate Together AI with Vercel. [Learn more →](/docs/agent-resources/integrations-for-models/togetherai)

**OpenAI** (Guide): Connect powerful AI models like GPT-4 [Learn more →](/docs/agent-resources/integrations-for-models/openai)

## More resources

- [AI Integrations for Vercel](https://www.youtube.com/watch?v=so4Jatc85Aw)

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
