---
title: Image Generation Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/image
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/image"
last_updated: 2026-08-20
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/image-generation/ai-sdk
  - /docs/ai-gateway/modalities/image-generation/openai
  - /docs/ai-gateway/modalities/image-generation
summary: Generate images from text prompts using AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/image.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "2a7988b7ab52765ee9ea7119897cad8bd999114bcc33b4fe89b2628c51323e9c"
---

# Image Generation Quickstart

This quickstart walks you through generating your first image with AI Gateway.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Image-only models available in Vercel AI Gateway](https://vercel.com/changelog/image-only-models-available-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related)
- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Google Gemini Image Generation](https://ai-sdk.dev/cookbook/guides/google-gemini-image-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related)
- [Video Generation with AI Gateway](https://vercel.com/blog/video-generation-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related)
- [Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image) now on AI Gateway](https://vercel.com/changelog/nano-banana-2-lite-gemini-3-1-flash-lite-image-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related)
- [Image Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related) — Generate images using AI models that support multimodal output through the Chat Completions API.
- [Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related) — Generate and stream text responses using AI Gateway.
- [File Attachments](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/image.graph.md](/docs/ai-gateway/getting-started/image.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- ### Set up your project
  Create a new directory and initialize a Node.js project:
  ```bash filename="Terminal"
  mkdir ai-image-demo
  cd ai-image-demo
  pnpm init
  ```

- ### Install dependencies
  Install the AI SDK and development dependencies:
  #### npm
  ```bash filename="Terminal"
  npm install ai@latest dotenv @types/node tsx typescript
  ```
  #### yarn
  ```bash filename="Terminal"
  yarn add ai@latest dotenv @types/node tsx typescript
  ```
  #### pnpm
  ```bash filename="Terminal"
  pnpm add ai@latest dotenv @types/node tsx typescript
  ```
  #### bun
  ```bash filename="Terminal"
  bun add ai@latest dotenv @types/node tsx typescript
  ```

- ### Set up your API key
  Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys) in your Vercel dashboard and click **Create key** to generate a new API key.

  Create a `.env.local` file and save your API key:
  ```bash filename=".env.local"
  AI_GATEWAY_API_KEY=your_ai_gateway_api_key
  ```

- ### Generate an image
  Create an `index.ts` file. This example uses Nano Banana Pro (`google/gemini-3-pro-image`), a multimodal model that generates high-quality images:
  ```typescript filename="index.ts"
  import { generateText } from 'ai';
  import fs from 'node:fs';
  import 'dotenv/config';

  async function main() {
    const result = await generateText({
      model: 'google/gemini-3-pro-image',
      prompt: 'A serene mountain landscape at sunset with a calm lake reflection',
    });

    // Nano Banana models return images in result.files with uint8Array
    const imageFiles = result.files.filter((f) =>
      f.mediaType?.startsWith('image/'),
    );

    if (imageFiles.length > 0) {
      const extension = imageFiles[0].mediaType?.split('/')[1] || 'png';
      fs.writeFileSync(`output.${extension}`, imageFiles[0].uint8Array);
      console.log(`Image saved to output.${extension}`);
    }
  }

  main().catch(console.error);
  ```
  Run your script:
  ```bash filename="Terminal"
  pnpm tsx index.ts
  ```
  The generated image will be saved in your project directory.

- ### Next steps
  - See [supported image generation models](/ai-gateway/models?type=image)
  - Learn about [multimodal LLMs](/docs/ai-gateway/modalities/image-generation/ai-sdk#multimodal-llms) that can generate images alongside text
  - Explore [image editing capabilities](/docs/ai-gateway/modalities/image-generation/openai#editing-images) with OpenAI models

## Alternative models

### Nano Banana 2 (`google/gemini-3.1-flash-image`)

The second-generation Gemini 3.1 Flash image variant. Uses the same `generateText` function and saves images the same way as Nano Banana Pro:

```typescript filename="nano-banana-2.ts"
import { generateText } from 'ai';
import fs from 'node:fs';
import 'dotenv/config';

const result = await generateText({
  model: 'google/gemini-3.1-flash-image',
  prompt: 'Create an illustration of a hummingbird at sunrise',
});

// Nano Banana models return images in result.files with uint8Array
const imageFiles = result.files.filter((f) =>
  f.mediaType?.startsWith('image/'),
);

if (imageFiles.length > 0) {
  fs.writeFileSync('output.png', imageFiles[0].uint8Array);
}
```

### Nano Banana (`google/gemini-2.5-flash-image`)

The original Nano Banana model — Gemini 2.5's flash image variant. Still available for workloads on the older generation:

```typescript filename="nano-banana.ts"
import { generateText } from 'ai';
import fs from 'node:fs';
import 'dotenv/config';

const result = await generateText({
  model: 'google/gemini-2.5-flash-image',
  prompt: 'Create an illustration of a hummingbird at sunrise',
});

const imageFiles = result.files.filter((f) =>
  f.mediaType?.startsWith('image/'),
);

if (imageFiles.length > 0) {
  fs.writeFileSync('output.png', imageFiles[0].uint8Array);
}
```

### Flux 2 Flex (`bfl/flux-2-flex`)

Fast, high-quality image generation from Black Forest Labs. Image-only models use `generateImage` and return images in `result.images` with base64 encoding:

```typescript filename="flux-example.ts"
import { generateImage } from 'ai';
import fs from 'node:fs';
import 'dotenv/config';

const result = await generateImage({
  model: 'bfl/flux-2-flex',
  prompt: 'A vibrant coral reef with tropical fish',
  aspectRatio: '4:3',
});

// Image-only models return images in result.images with base64
const image = result.images[0];
const buffer = Buffer.from(image.base64, 'base64');
fs.writeFileSync('output.png', buffer);
```

### Recraft V4.1 (`recraft/recraft-v4.1`)

Professional-grade image generation. Same pattern as Flux:

```typescript filename="recraft-example.ts"
import { generateImage } from 'ai';
import fs from 'node:fs';
import 'dotenv/config';

const result = await generateImage({
  model: 'recraft/recraft-v4.1',
  prompt: 'A minimalist logo design for a tech startup',
});

const buffer = Buffer.from(result.images[0].base64, 'base64');
fs.writeFileSync('output.png', buffer);
```

### GPT Image 2 (`openai/gpt-image-2`)

OpenAI's image-only model for high-fidelity generation:

```typescript filename="gpt-image-2-example.ts"
import { generateImage } from 'ai';
import fs from 'node:fs';
import 'dotenv/config';

const result = await generateImage({
  model: 'openai/gpt-image-2',
  prompt: 'A photorealistic image of a mountain landscape at golden hour',
  aspectRatio: '16:9',
});

const buffer = Buffer.from(result.images[0].base64, 'base64');
fs.writeFileSync('output.png', buffer);
```

## Saving images

How you save images depends on the model type:

| Model type                                | Function                     | Image location  | Format          |
| ----------------------------------------- | ---------------------------- | --------------- | --------------- |
| Nano Banana models                        | `generateText`               | `result.files`  | `uint8Array`    |
| Image-only models (Flux, Recraft, GPT Image) | `generateImage` | `result.images` | `base64` string |

For more details, see the [Image Generation Capabilities docs](/docs/ai-gateway/modalities/image-generation).


---

[View full sitemap](/docs/sitemap)
