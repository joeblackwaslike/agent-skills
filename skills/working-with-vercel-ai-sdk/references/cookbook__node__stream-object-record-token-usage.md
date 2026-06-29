---
source: "https://ai-sdk.dev/cookbook/node/stream-object-record-token-usage.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "7f8c59ddb6b3b984c69cae863b1e115b539706209596d21ebc9097938abaa79a"
---

# Record Token Usage After Streaming Object

When you're streaming structured data with `streamText` and `Output`,
you may want to record the token usage for billing purposes.

## `onEnd` Callback

You can use the `onEnd` callback to record token usage.
It is called when the stream is finished.

```ts file='index.ts' highlight={"15-17"}
import { streamText, Output } from 'ai';
import { z } from 'zod';

const result = streamText({
  model: 'openai/gpt-4.1',
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

```ts file='index.ts' highlight={"28,30"}
import { streamText, Output, LanguageModelUsage } from 'ai';
import { z } from 'zod';

const result = streamText({
  model: 'openai/gpt-4.1',
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

result.usage.then(recordUsage);

recordUsage(await result.usage);

for await (const partialObject of result.partialOutputStream) {
}
```


## Navigation

- [Generate Text](/cookbook/node/generate-text)
- [Retrieval Augmented Generation](/cookbook/node/retrieval-augmented-generation)
- [Knowledge Base Agent](/cookbook/node/knowledge-base-agent)
- [Generate Text with Chat Prompt](/cookbook/node/generate-text-with-chat-prompt)
- [Generate Text with Image Prompt](/cookbook/node/generate-text-with-image-prompt)
- [Stream Text](/cookbook/node/stream-text)
- [Stream Text with Chat Prompt](/cookbook/node/stream-text-with-chat-prompt)
- [Stream Text with Image Prompt](/cookbook/node/stream-text-with-image-prompt)
- [Stream Text with File Prompt](/cookbook/node/stream-text-with-file-prompt)
- [Generate Object with a Reasoning Model](/cookbook/node/generate-object-reasoning)
- [Generate Object](/cookbook/node/generate-object)
- [Stream Object](/cookbook/node/stream-object)
- [Stream Object with Image Prompt](/cookbook/node/stream-object-with-image-prompt)
- [Record Token Usage After Streaming Object](/cookbook/node/stream-object-record-token-usage)
- [Record Final Object after Streaming Object](/cookbook/node/stream-object-record-final-object)
- [Call Tools](/cookbook/node/call-tools)
- [Call Tools in Parallel](/cookbook/node/call-tools-in-parallel)
- [Call Tools with Image Prompt](/cookbook/node/call-tools-with-image-prompt)
- [Call Tools in Multiple Steps](/cookbook/node/call-tools-multiple-steps)
- [Model Context Protocol (MCP) Tools](/cookbook/node/mcp-tools)
- [Manual Agent Loop](/cookbook/node/manual-agent-loop)
- [Web Search Agent](/cookbook/node/web-search-agent)
- [Model Context Protocol (MCP) Elicitation](/cookbook/node/mcp-elicitation)
- [Embed Text](/cookbook/node/embed-text)
- [Embed Text in Batch](/cookbook/node/embed-text-batch)
- [Intercepting Fetch Requests](/cookbook/node/intercept-fetch-requests)
- [Local Caching Middleware](/cookbook/node/local-caching-middleware)
- [Repair Malformed JSON with jsonrepair](/cookbook/node/repair-json-with-jsonrepair)
- [Dynamic Prompt Caching](/cookbook/node/dynamic-prompt-caching)


[Full Sitemap](/sitemap.md)
