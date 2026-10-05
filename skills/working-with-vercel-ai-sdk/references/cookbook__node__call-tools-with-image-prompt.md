---
title: Call Tools with Image Prompt
description: Learn how to call tools with image prompt using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/call-tools-with-image-prompt"
docs_index: /llms.txt
tags:
  - node
  - tool use
  - multimodal
source: "https://ai-sdk.dev/cookbook/node/call-tools-with-image-prompt.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "d31f3ef307c66850d2b5cbd5809c22bf3b22f559b97a70f5e8967d3c92862fd3"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Some language models that support vision capabilities accept images as part of the prompt. Here are some of the different [formats](/docs/reference/ai-sdk-core/generate-text#content-image) you can use to include images as input.

```ts
import { generateText, tool } from 'ai';
import { z } from 'zod';

const result = await generateText({
  model: 'openai/gpt-6-astra',
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'can you log this meal for me?' },
        {
          type: 'file',
          mediaType: 'image',
          data: new URL(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cheeseburger_%2817237580619%29.jpg/640px-Cheeseburger_%2817237580619%29.jpg',
          ),
        },
      ],
    },
  ],
  tools: {
    logFood: tool({
      description: 'Log a food item',
      inputSchema: z.object({
        name: z.string(),
        calories: z.number(),
      }),
      execute({ name, calories }) {
        storeInDatabase({ name, calories }); // your implementation here
      },
    }),
  },
});
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)