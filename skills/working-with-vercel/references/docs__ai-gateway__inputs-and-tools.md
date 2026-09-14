---
title: AI Gateway Inputs and Tools
product: vercel
url: /docs/ai-gateway/inputs-and-tools
canonical_url: "https://vercel.com/docs/ai-gateway/inputs-and-tools"
last_updated: 2026-09-08
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/inputs-and-tools/vision
  - /docs/ai-gateway/inputs-and-tools/file-input
  - /docs/ai-gateway/inputs-and-tools/tool-use
  - /docs/ai-gateway/inputs-and-tools/audio-input
  - /docs/ai-gateway/inputs-and-tools/video-input
summary: Send images, PDFs, audio, and video to AI Gateway models, and connect models to application functions with tool use.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/inputs-and-tools.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "3074ef12597e5fcacd786a46e4cb51d06c3efd3affce88d82601cfea91e11dbd"
---

# AI Gateway Inputs and Tools

Choose a guide for the input you have or the function you want a model to call. Each guide includes examples for supported API formats and explains their differences.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway Model Modalities](https://vercel.com/docs/ai-gateway/modalities?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools&source_site=vercel-docs&relationship=related) — The inputs and outputs AI Gateway models work with: text, image, and video generation, speech to text, text to speech, r
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
- [OpenAI Responses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr

Full cross-link map for this page: [/docs/ai-gateway/inputs-and-tools.graph.md](/docs/ai-gateway/inputs-and-tools.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Finputs-and-tools&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Choose a capability

| Capability | Use it to | Example input |
| --- | --- | --- |
| [Vision](/docs/ai-gateway/inputs-and-tools/vision) | Describe images, read charts, or inspect screenshots | PNG image |
| [File Input](/docs/ai-gateway/inputs-and-tools/file-input) | Summarize documents or extract information | PDF document |
| [Tool Use](/docs/ai-gateway/inputs-and-tools/tool-use) | Connect a model to application functions | Function schema and tool results |
| [Audio Input](/docs/ai-gateway/inputs-and-tools/audio-input) | Ask questions about recorded speech | MP3 recording |
| [Video Input](/docs/ai-gateway/inputs-and-tools/video-input) | Summarize events or inspect actions in a clip | MP4 video |

## Choose a model and API

For SDK concepts, start with AI SDK [message prompts](https://ai-sdk.dev/docs/foundations/prompts#message-prompts) and [tool calling](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling), or the Python beta [messages](https://ai-python.dev/docs/basics/messages-and-events) and [agents](https://ai-python.dev/docs/basics/agents) guides.

A model must support the input type and the selected provider must accept that request format. The [model catalog](/docs/ai-gateway/models-and-providers) describes model capabilities. Check model-specific limits as well as the format notes in each guide, including for any configured fallback models.

Examples group AI SDK 7 TypeScript and AI SDK for Python (beta) under one AI SDK tab. Chat Completions, Messages API, and Responses / OpenResponses follow, with TypeScript, Python, and cURL language switchers where supported. See [SDKs and APIs](/docs/ai-gateway/sdks-and-apis) for installation, authentication, and endpoint differences.

## Generate media or transcribe audio

These guides focus on understanding existing input. For other tasks, see:

- [Image generation](/docs/ai-gateway/modalities/image-generation) to create or edit an image.
- [Video generation](/docs/ai-gateway/modalities/video-generation) to create or edit a video.
- [Speech to text](/docs/ai-gateway/modalities/speech-to-text) for a dedicated transcript.
- [Text to speech](/docs/ai-gateway/modalities/text-to-speech) to generate spoken audio.
- [Realtime](/docs/ai-gateway/modalities/realtime) for a live voice conversation.
- [Coding agents](/docs/ai-gateway/coding-agents) to connect an existing coding tool to AI Gateway.


---

[View full sitemap](/docs/sitemap)
