---
title: Record Final Object after Streaming Object
description: Learn how to record the final object after streaming an object using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/stream-object-record-final-object"
docs_index: /llms.txt
tags:
  - node
  - streaming
  - structured data
source: "https://ai-sdk.dev/cookbook/node/stream-object-record-final-object.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "50611f72203ab77a666888d94fd0db8e3ece66f6f2e15533ad10904c6333e2f5"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

When you're streaming structured data, you may want to record the final object for logging or other purposes.

## `onEnd` and `output`

Use `onEnd` for metadata like token usage and await `result.output` for the final structured object.

```ts title='index.ts' {16-18,24-29}
import { streamText, Output } from 'ai';
import { z } from 'zod';

const result = streamText({
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
  onEnd({ usage }) {
    console.log('Token usage:', usage);
  },
});

for await (const _ of result.partialOutputStream) {
}

try {
  const output = await result.output;
  console.log('Final object:', JSON.stringify(output, null, 2));
} catch (error) {
  console.error('Failed to parse output:', error);
}
```

## `output` Promise

The `streamText` result contains an `output` promise that resolves to the final object.
The object is fully typed. When the type validation according to the schema fails, the promise will be rejected with a `TypeValidationError`.

```ts title='index.ts' {21-26}
import { streamText, Output } from 'ai';
import { z } from 'zod';

const result = streamText({
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

for await (const partialObject of result.partialOutputStream) {
}

try {
  const { recipe } = await result.output;
  console.log('Recipe:', JSON.stringify(recipe, null, 2));
} catch (error) {
  console.error(error);
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)