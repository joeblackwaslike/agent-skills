---
title: Generate Text with Image Prompt
description: Learn how to generate text with image prompt using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/generate-text-with-image-prompt"
docs_index: /llms.txt
tags:
  - node
  - multimodal
source: "https://ai-sdk.dev/cookbook/node/generate-text-with-image-prompt.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "0d9dc8d652584ae815774fb7a52f65e83eda0a209f4dfd30af1c1d3e4aa1ea14"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Some language models that support vision capabilities accept images as part of the prompt. Here are some of the different [formats](/docs/reference/ai-sdk-core/generate-text#content-image) you can use to include images as input.

## URL

```ts title='index.ts'
import { generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-4.1',
  maxOutputTokens: 512,
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'what are the red things in this image?',
        },
        {
          type: 'file',
          mediaType: 'image',
          data: new URL(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/2024_Solar_Eclipse_Prominences.jpg/720px-2024_Solar_Eclipse_Prominences.jpg',
          ),
        },
      ],
    },
  ],
});

console.log(result);
```

## File Buffer

```ts title='index.ts'
import { generateText } from 'ai';
import fs from 'fs';

const result = await generateText({
  model: 'openai/gpt-4.1',
  maxOutputTokens: 512,
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'what are the red things in this image?',
        },
        {
          type: 'file',
          mediaType: 'image',
          data: fs.readFileSync('./node/attachments/eclipse.jpg', {
            encoding: 'base64',
          }),
        },
      ],
    },
  ],
});

console.log(result);
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)