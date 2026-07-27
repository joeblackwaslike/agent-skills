---
title: Image Generation
product: vercel
url: /docs/ai-gateway/modalities/image-generation
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/image-generation"
last_updated: 2026-06-20
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
fetched_at: "2026-07-27T07:38:10.222Z"
sha256: "78b7dbfbc5a7d959a55daef109a4d99cb907e8c1c76dd5c112cbf151138ac35e"
---

# Image Generation

The Vercel [AI Gateway](/docs/ai-gateway) supports image generation and editing capabilities. You can generate new images from text prompts, edit existing images, and create variations with natural language instructions.

To see which models AI Gateway supports for image generation, use the **Image Gen** filter at the [AI Gateway Models
page](/ai-gateway/models?type=image).

### Integration methods

To implement image generation with AI Gateway, use one of the following methods:

- **[AI SDK](/docs/ai-gateway/modalities/image-generation/ai-sdk)**: Use the AI SDK for TypeScript/JavaScript applications with native support for streaming, multi-modal inputs, and type-safe model interactions
- **[Chat Completions API](/docs/ai-gateway/modalities/image-generation/openai)**: Use the Chat Completions endpoints for compatibility with existing OpenAI integrations across any programming language


---

[View full sitemap](/docs/sitemap)
