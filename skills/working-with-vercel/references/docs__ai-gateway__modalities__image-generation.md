---
title: AI Gateway Image Generation
product: vercel
url: /docs/ai-gateway/modalities/image-generation
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/image-generation"
last_updated: 2026-09-15
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway
  - /docs/ai-gateway/modalities/image-generation/ai-sdk
  - /docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai
  - /docs/ai-gateway/modalities/image-generation/openai
summary: Generate and edit images using AI models through Vercel AI Gateway with support for multiple providers and modalities.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/image-generation.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "e33b38db5bd330c94c5bb263e372ddfadc7bbdb768ae99cb98d792d1f191aef6"
---

# AI Gateway Image Generation

The Vercel [AI Gateway](/docs/ai-gateway) supports image generation and editing capabilities. You can generate new images from text prompts, edit existing images, and create variations with natural language instructions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Nano Banana 2.1 now available on AI Gateway](https://vercel.com/changelog/nano-banana-2-1-now-available-on-ai-gateway)
- [Image-only models available in Vercel AI Gateway](https://vercel.com/changelog/image-only-models-available-in-vercel-ai-gateway)
- [AI Gateway Image Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/image) — Generate an image from a text prompt using AI Gateway.
- [AI Gateway Chat Completions Image Generation Reference](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation) — Generate images using AI models that support multimodal output through the Chat Completions API through AI Gateway.
- [AI Gateway Embeddings](https://vercel.com/docs/ai-gateway/modalities/embeddings) — Generate vector embeddings for semantic search, similarity matching, and retrieval-augmented generation \\(RAG\\) through
- [AI Gateway Inputs and Tools](https://vercel.com/docs/ai-gateway/inputs-and-tools) — Send images, PDFs, audio, and video to AI Gateway models, and connect models to application functions with tool use.
- [AI Gateway Vision and Image Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/vision) — Analyze images with AI Gateway using AI SDK 7, the Python beta, Chat Completions, Messages, and Responses APIs.

Full cross-link map for this page: [/docs/ai-gateway/modalities/image-generation.graph.md](/docs/ai-gateway/modalities/image-generation.graph.md)
<!-- /docsgraph:related -->

To see which models AI Gateway supports for image generation, use the **Image Gen** filter at the [AI Gateway Models
page](/ai-gateway/models?type=image).

### Integration methods

To implement image generation with AI Gateway, use one of the following methods:

- **[AI SDK](/docs/ai-gateway/modalities/image-generation/ai-sdk)**: Use the AI SDK for TypeScript/JavaScript applications with native support for streaming, multi-modal inputs, and type-safe model interactions
- **[TanStack AI](/kb/guide/tanstack-ai-vercel-ai-gateway#generate-images)**: Use `generateImage` with `vercelGatewayImage` from `@tanstack/ai-vercel-gateway` for text-to-image generation. See the [setup guide](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai) for authentication and the [adapter reference](https://tanstack.com/ai/latest/docs/adapters/vercel-gateway#image) for supported operations.
- **[Chat Completions API](/docs/ai-gateway/modalities/image-generation/openai)**: Use the Chat Completions endpoints for compatibility with existing OpenAI integrations across any programming language


---

[View full sitemap](/docs/sitemap)
