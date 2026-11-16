---
title: AI Gateway Image Generation Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/image
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/image"
last_updated: 2026-09-08
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/modalities/image-generation
  - /docs/ai-gateway/modalities/image-generation/ai-sdk
  - /docs/ai-gateway/modalities/image-generation/openai
summary: Generate an image from a text prompt using AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/getting-started/image.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "0b3954cd4bc95797cdbdbcf3791293eb0ff34c3ca758a5a9612e608b14b689b5"
---

# AI Gateway Image Generation Quickstart

Generate an image through AI Gateway and save it to a file.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [MAI-Image-2.6 and MAI-Image-2.6-Flash now available on AI Gateway](https://vercel.com/changelog/mai-image-2-6-and-mai-image-2-6-flash-now-available-on-ai-gateway)
- [Image-only models available in Vercel AI Gateway](https://vercel.com/changelog/image-only-models-available-in-vercel-ai-gateway)
- [GPT Image 2 on AI Gateway](https://vercel.com/changelog/gpt-image-2-on-ai-gateway)
- [Video Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/video) — Generate a video from a text prompt using AI Gateway.
- [AI Gateway Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text) — Generate and stream text responses using AI Gateway.
- [AI Gateway Chat Completions Image Generation Reference](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation) — Generate images using AI models that support multimodal output through the Chat Completions API through AI Gateway.
- [AI Gateway Vision and Image Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/vision) — Analyze images with AI Gateway using AI SDK 7, the Python beta, Chat Completions, Messages, and Responses APIs.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/image.graph.md](/docs/ai-gateway/getting-started/image.graph.md)
<!-- /docsgraph:related -->

## Generate your first image

### Use a coding agent

Paste this prompt into a coding agent with terminal access:

**Agent prompt**

```text
Add image generation through AI Gateway in the current environment. Use the AI Gateway skill for this task. If it is unavailable, run npx skills add vercel/vercel-plugin --skill ai-gateway, then find and read its SKILL.md before continuing. Reuse the environment's language, framework, package manager, and AI client when possible, choose an AI Gateway SDK or API that supports image generation, and add only required dependencies. Read AI_GATEWAY_API_KEY from the environment. If it is missing, run npx vercel@latest whoami and pause for login if needed. Determine the team, then run npx vercel@latest --scope <team-slug> ai-gateway api-keys create --name <descriptive-name>. Capture stdout directly into AI_GATEWAY_API_KEY for the request or existing ignored secret storage, and never expose the value. Use openai/gpt-image-2, save the first image to a file, run the result, and report the output.
```

### Run the Node.js example

Use [Node.js 22.18 or later](https://nodejs.org/) and a team with available [AI Gateway Credits](/docs/ai-gateway/pricing). Export `AI_GATEWAY_API_KEY` in your current shell. If you need a key, open the [Create API Key dialog](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys%3FshowCreateKeyModal%3Dtrue\&title=AI+Gateway+API+Keys).

```bash filename="Terminal"
export AI_GATEWAY_API_KEY="your_ai_gateway_api_key"
```

Install the AI SDK:

```bash filename="Terminal"
pnpm add ai@latest
```

Create `index.mts`:

```typescript filename="index.mts"
import { generateImage } from 'ai';
import { writeFile } from 'node:fs/promises';

const { images } = await generateImage({
  model: 'openai/gpt-image-2',
  prompt: 'A turquoise hummingbird resting on a dew-covered branch at sunrise.',
});

await writeFile('output.png', images[0].uint8Array);
console.log('Saved output.png');
```

Run the script:

```bash filename="Terminal"
node index.mts
```

## Next steps

- Browse [image generation models](/ai-gateway/models?type=image) and learn when to use image-only or multimodal models in the [image generation guide](/docs/ai-gateway/modalities/image-generation)

* Learn how the AI SDK [returns generated images](/docs/ai-gateway/modalities/image-generation/ai-sdk)
* Edit images with [OpenAI image models](/docs/ai-gateway/modalities/image-generation/openai#editing-images)

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
