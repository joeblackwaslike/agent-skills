---
title: Record Token Usage After Streaming Object
description: Learn how to record token usage when streaming structured data using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/stream-object-record-token-usage"
docs_index: /llms.txt
tags:
  - node
  - streaming
  - structured data
  - observability
source: "https://ai-sdk.dev/cookbook/node/stream-object-record-token-usage.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "006dcbb2378995b332c2646393df099ed2aa90c20f2515d5750ca4b5f04dd4e5"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

When you're streaming structured data with `streamText` and `Output`,
you may want to record the token usage for billing purposes.

## `onEnd` Callback

You can use the `onEnd` callback to record token usage.
It is called when the stream is finished.

```ts title='index.ts' {16-18}
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
```

## `usage` Promise

The `streamText` result contains a `usage` promise that resolves to the total token usage.

```ts title='index.ts' {29,32}
import { streamText, Output, LanguageModelUsage } from 'ai';
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

function recordUsage({
  inputTokens,
  outputTokens,
  totalTokens,
}: LanguageModelUsage) {
  console.log('Prompt tokens:', inputTokens);
  console.log('Completion tokens:', outputTokens);
  console.log('Total tokens:', totalTokens);
}

// use as promise:
result.usage.then(recordUsage);

// or use with async/await:
recordUsage(await result.usage);

for await (const partialObject of result.partialOutputStream) {
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)