---
title: Stream Object with Image Prompt
description: Learn how to stream structured data with an image prompt using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/stream-object-with-image-prompt"
docs_index: /llms.txt
tags:
  - node
  - streaming
  - structured data
  - multimodal
source: "https://ai-sdk.dev/cookbook/node/stream-object-with-image-prompt.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "2cbe202c031611d969f19ecc1008ddc6ca9b0779faf69be8744f028123872c06"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Some language models that support vision capabilities accept images as part of the prompt. Here are some of the different [formats](/docs/reference/ai-sdk-core/generate-text#content-image) you can use to include images as input.

## URL

```ts title='index.ts'
import { streamText, Output } from 'ai';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

async function main() {
  const { partialOutputStream } = streamText({
    model: 'openai/gpt-4.1',
    maxOutputTokens: 512,
    output: Output.object({
      schema: z.object({
        stamps: z.array(
          z.object({
            country: z.string(),
            date: z.string(),
          }),
        ),
      }),
    }),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'list all the stamps in these passport pages?',
          },
          {
            type: 'file',
            mediaType: 'image/jpeg',
            data: new URL(
              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/WW2_Spanish_official_passport.jpg/1498px-WW2_Spanish_official_passport.jpg',
            ),
          },
        ],
      },
    ],
  });

  for await (const partialObject of partialOutputStream) {
    console.clear();
    console.log(partialObject);
  }
}

main();
```

## File Buffer

```ts title='index.ts'
import { streamText, Output } from 'ai';
import dotenv from 'dotenv';
import { z } from 'zod';
import fs from 'fs';

dotenv.config();

async function main() {
  const { partialOutputStream } = streamText({
    model: 'openai/gpt-4.1',
    maxOutputTokens: 512,
    output: Output.object({
      schema: z.object({
        stamps: z.array(
          z.object({
            country: z.string(),
            date: z.string(),
          }),
        ),
      }),
    }),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'list all the stamps in these passport pages?',
          },
          {
            type: 'file',
            mediaType: 'image/png',
            data: fs.readFileSync('./data/passport.png', {
              encoding: 'base64',
            }),
          },
        ],
      },
    ],
  });

  for await (const partialObject of partialOutputStream) {
    console.clear();
    console.log(partialObject);
  }
}

main();
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)