---
title: Stream Object
description: Learn how to stream structured data using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/stream-object"
docs_index: /llms.txt
tags:
  - node
  - streaming
  - structured data
source: "https://ai-sdk.dev/cookbook/node/stream-object.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "ed3b57b1bde22bb90a33e3b6adcc2183c048f75285aebec1d2ed0316a895ec1d"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Object generation can sometimes take a long time to complete,
especially when you're generating a large schema.

In Generative UI use cases, it is useful to stream the object to the client in real-time
to render UIs as the object is being generated.
You can use `streamText` with `Output.object` to generate partial object streams.

```ts title='index.ts'
import { streamText, Output } from 'ai';
import { z } from 'zod';

const { partialOutputStream } = streamText({
  model: 'openai/gpt-6-astra',
  output: Output.object({
    schema: z.object({
      recipe: z.object({
        name: z.string(),
        ingredients: z.array(z.string()),
        steps: z.array(z.string()),
      }),
    }),
  }),
  prompt: 'Generate a lasagna recipe.',
});

for await (const partialObject of partialOutputStream) {
  console.clear();
  console.log(partialObject);
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)