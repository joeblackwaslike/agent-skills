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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "232d339add3c8109746fd894113070b0d438026e703293a99e986cbd59cf29ac"
---

# AI Gateway Inputs and Tools

Choose a guide for the input you have or the function you want a model to call. Each guide includes examples for supported API formats and explains their differences.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway Model Modalities](https://vercel.com/docs/ai-gateway/modalities) — The inputs and outputs AI Gateway models work with: text, image, and video generation, speech to text, text to speech, r
- [OpenAI Responses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 400+ models.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 400+ models.
- [OpenResponses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/images) — Send images and PDF documents for analysis using the OpenResponses API through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/inputs-and-tools.graph.md](/docs/ai-gateway/inputs-and-tools.graph.md)
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
