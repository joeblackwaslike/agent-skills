---
title: Image Generation Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/image
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/image"
last_updated: 2026-09-02
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/modalities/image-generation/ai-sdk
  - /docs/ai-gateway/modalities/image-generation/openai
  - /docs/ai-gateway/modalities/image-generation
summary: Generate images from text prompts using AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/image.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "78f8eadff4f72a4b478403737ed9c881b2a5629a2cc2bda2e102ae61461e19be"
---

# Image Generation Quickstart

This quickstart walks you through generating your first image with AI Gateway.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Image-only models available in Vercel AI Gateway](https://vercel.com/changelog/image-only-models-available-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related)
- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Video Generation with AI Gateway](https://vercel.com/blog/video-generation-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related)
- [Google Gemini Image Generation](https://ai-sdk.dev/cookbook/guides/google-gemini-image-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related)
- [Image Generation](https://ai-sdk.dev/docs/ai-sdk-core/image-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related)
- [Image Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/image-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related) — Generate images using AI models that support multimodal output through the Chat Completions API.
- [Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related) — Generate and stream text responses using AI Gateway.
- [File Attachments](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/image.graph.md](/docs/ai-gateway/getting-started/image.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fimage&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

Before you begin, you need:

- A Vercel account with a valid payment method to unlock free AI Gateway Credits
- Node.js 22 or later
- An AI Gateway API key or a Vercel OIDC token

### Set up your API key

Open the [Create API Key dialog](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys%3FshowCreateKeyModal%3Dtrue\&title=AI+Gateway+API+Keys) in the Vercel dashboard, enter a name, and create the key.

After you create your project in the next section, add a `.env.local` file to the project root and save your API key:

```bash filename=".env.local"
AI_GATEWAY_API_KEY=your_ai_gateway_api_key
```

> **💡 Note:** Instead of using an API key, you can use [OIDC
> tokens](/docs/ai-gateway/authentication-and-byok/oidc) to authenticate your
> requests.

## Generate your first image

Install Vercel's focused AI Gateway skill before delegating this setup:

```bash filename="Terminal"
npx skills add vercel/vercel-plugin --skill ai-gateway
```

**Agent prompt**

```text
Use the AI Gateway skill to add image generation to this project. Read AI_GATEWAY_API_KEY from the environment or .env.local, and stop and tell me to create a key if it is not set anywhere. Choose a current image model such as openai/gpt-image-2 from the live AI Gateway model list, save the generated image to a file, run the result, and run the project's type checker. Report the files changed and command output.
```

- ### Set up your project
  Create a new directory and initialize a Node.js project:
  ```bash filename="Terminal"
  mkdir ai-image-demo
  cd ai-image-demo
  pnpm init
  pnpm pkg set type=module
  ```
  Setting the project to ESM lets the examples below use top-level `await`.

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

- ### Generate an image
  Create an `index.ts` file. This example uses GPT Image 2 (`openai/gpt-image-2`), OpenAI's image-only model for high-fidelity generation:
  ```typescript filename="index.ts"
  import { generateImage } from 'ai';
  import fs from 'node:fs';
  import { config } from 'dotenv';

  config({ path: '.env.local' });

  async function main() {
    const result = await generateImage({
      model: 'openai/gpt-image-2',
      prompt: 'A serene mountain landscape at sunset with a calm lake reflection',
      size: '1536x1024',
    });

    // Image-only models return images in result.images as base64
    const buffer = Buffer.from(result.images[0].base64, 'base64');
    fs.writeFileSync('output.png', buffer);
    console.log('Image saved to output.png');
  }

  main().catch(console.error);
  ```
  Run your script:
  ```bash filename="Terminal"
  pnpm tsx index.ts
  ```
  The generated image will be saved in your project directory.

## Next steps

- See [supported image generation models](/ai-gateway/models?type=image)
- Learn about [multimodal LLMs](/docs/ai-gateway/modalities/image-generation/ai-sdk#multimodal-llms) that can generate images alongside text
- Explore [image editing capabilities](/docs/ai-gateway/modalities/image-generation/openai#editing-images) with OpenAI models

## Alternative models

### Nano Banana Pro (`google/gemini-3-pro-image`)

Google's multimodal model, which generates images alongside text. Multimodal models use `generateText` and return images in `result.files`:

```typescript filename="nano-banana-pro.ts"
import { generateText } from 'ai';
import fs from 'node:fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

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
}
```

### Nano Banana 2 (`google/gemini-3.1-flash-image`)

The second-generation Gemini 3.1 Flash image variant. Uses the same `generateText` function and saves images the same way as Nano Banana Pro:

```typescript filename="nano-banana-2.ts"
import { generateText } from 'ai';
import fs from 'node:fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

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
import { config } from 'dotenv';

config({ path: '.env.local' });

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
import { config } from 'dotenv';

config({ path: '.env.local' });

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
import { config } from 'dotenv';

config({ path: '.env.local' });

const result = await generateImage({
  model: 'recraft/recraft-v4.1',
  prompt: 'A minimalist logo design for a tech startup',
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
