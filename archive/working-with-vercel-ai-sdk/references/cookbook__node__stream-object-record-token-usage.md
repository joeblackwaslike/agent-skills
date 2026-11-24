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
fetched_at: "2026-11-02T12:06:29.726Z"
sha256: "6864a598b757fc4c142a4a49f41c2884e4a110cd74abf83e1c9580642859ba97"
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

// Consume the stream so onEnd can record usage.
await result.consumeStream();
```

The `onEnd` callback only fires once the stream is consumed — for example by
iterating `partialOutputStream`, piping it, or calling `result.consumeStream()`.
Without consuming the stream, the result is created but the callback is never
called.

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