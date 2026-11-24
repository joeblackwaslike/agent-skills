---
title: Google Gemini Image Generation
description: Generate and edit images with Google Gemini 3.1 Flash Image using the AI SDK.
url: "https://ai-sdk.dev/cookbook/guides/google-gemini-image-generation"
docs_index: /llms.txt
tags:
  - image-generation
  - google
  - gemini
source: "https://ai-sdk.dev/cookbook/guides/google-gemini-image-generation.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "70bf21b5c4c54955940ef1af7e47d93fa3621c437844b3ce315d923c3e1c2e8d"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This guide will show you how to generate and edit images with the AI SDK and Google's Gemini 3.1 Flash Image model.

## Generating Images

As Gemini 3.1 Flash Image is a language model with multimodal capabilities, you can use the `generateText` or `streamText` functions to create multimodal responses that include images. The model determines which modality to respond in based on your prompt and configuration. Here's how to create your first image:

```ts
import { generateText } from 'ai';
import fs from 'node:fs';
import 'dotenv/config';

async function generateImage() {
  const result = await generateText({
    model: 'google/gemini-3.1-flash-image-preview',
    prompt:
      'Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme',
  });

  // Save generated images
  for (const file of result.files) {
    if (file.mediaType.startsWith('image/')) {
      const timestamp = Date.now();
      const fileName = `generated-${timestamp}.png`;

      fs.mkdirSync('output', { recursive: true });
      await fs.promises.writeFile(`output/${fileName}`, file.uint8Array);

      console.log(`Generated and saved image: output/${fileName}`);
    }
  }
}

generateImage().catch(console.error);
```

Here are some key points to remember:

- Generated images are returned in the `result.files` array
- Images are returned as `Uint8Array` data
- The model leverages Gemini's world knowledge, so detailed prompts yield better results

## Editing Images

Gemini 3.1 Flash Image excels at editing existing images with natural language instructions. You can add elements, modify styles, or transform images while maintaining their core characteristics:

```ts
import { generateText } from 'ai';
import fs from 'node:fs';
import 'dotenv/config';

async function editImage() {
  const editResult = await generateText({
    model: 'google/gemini-3.1-flash-image-preview',
    prompt: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Add a small wizard hat to this cat. Keep everything else the same.',
          },
          {
            type: 'file',
            // data: DataContent (string | Uint8Array | ArrayBuffer | Buffer) or URL
            data: new URL(
              'https://raw.githubusercontent.com/vercel/ai/refs/heads/main/examples/ai-functions/data/comic-cat.png',
            ),
            mediaType: 'image/png',
          },
        ],
      },
    ],
  });

  // Save the edited image
  const timestamp = Date.now();
  fs.mkdirSync('output', { recursive: true });

  for (const file of editResult.files) {
    if (file.mediaType.startsWith('image/')) {
      await fs.promises.writeFile(
        `output/edited-${timestamp}.png`,
        file.uint8Array,
      );
      console.log(`Saved edited image: output/edited-${timestamp}.png`);
    }
  }
}

editImage().catch(console.error);
```

## What's Next?

You've learned how to generate new images from text prompts and edit existing images using natural language instructions with Google's Gemini 3.1 Flash Image model.

For more advanced techniques, integration patterns, and practical examples, check out our [Cookbook](/cookbook) where you'll find comprehensive guides for building sophisticated AI-powered applications.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)