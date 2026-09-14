---
title: AI Gateway Image Generation
product: vercel
url: /docs/ai-gateway/modalities/image-generation
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/image-generation"
last_updated: 2026-09-08
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway
  - /docs/ai-gateway/modalities/image-generation/ai-sdk
  - /docs/ai-gateway/modalities/image-generation/openai
summary: Generate and edit images using AI models through Vercel AI Gateway with support for multiple providers and modalities.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/image-generation.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "bac6f79f92a0a78fb25357a8b9f421200ad14ba48e66707df07e44d2132e1ae1"
---

# AI Gateway Image Generation

The Vercel [AI Gateway](/docs/ai-gateway) supports image generation and editing capabilities. You can generate new images from text prompts, edit existing images, and create variations with natural language instructions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Image-only models available in Vercel AI Gateway](https://vercel.com/changelog/image-only-models-available-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation&source_site=vercel-docs&relationship=related)
- [AI Gateway Image Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/image?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation&source_site=vercel-docs&relationship=related) — Generate an image from a text prompt using AI Gateway.
- [AI Gateway Chat Completions Image Generation Reference](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation&source_site=vercel-docs&relationship=related) — Generate images using AI models that support multimodal output through the Chat Completions API through AI Gateway.
- [AI Gateway Inputs and Tools](https://vercel.com/docs/ai-gateway/inputs-and-tools?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation&source_site=vercel-docs&relationship=related) — Send images, PDFs, audio, and video to AI Gateway models, and connect models to application functions with tool use.
- [AI Gateway Embeddings](https://vercel.com/docs/ai-gateway/modalities/embeddings?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation&source_site=vercel-docs&relationship=related) — Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation \\(RAG\\) through
- [OpenAI Chat Completions Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation&source_site=vercel-docs&relationship=related) — Send images and PDF documents to a model using the OpenAI Chat Completions API through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/modalities/image-generation.graph.md](/docs/ai-gateway/modalities/image-generation.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Fimage-generation&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

To see which models AI Gateway supports for image generation, use the **Image Gen** filter at the [AI Gateway Models
page](/ai-gateway/models?type=image).

### Integration methods

To implement image generation with AI Gateway, use one of the following methods:

- **[AI SDK](/docs/ai-gateway/modalities/image-generation/ai-sdk)**: Use the AI SDK for TypeScript/JavaScript applications with native support for streaming, multi-modal inputs, and type-safe model interactions
- **[Chat Completions API](/docs/ai-gateway/modalities/image-generation/openai)**: Use the Chat Completions endpoints for compatibility with existing OpenAI integrations across any programming language


---

[View full sitemap](/docs/sitemap)
