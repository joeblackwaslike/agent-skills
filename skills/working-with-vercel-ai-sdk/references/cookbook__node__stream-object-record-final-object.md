---
source: "https://ai-sdk.dev/cookbook/node/stream-object-record-final-object.md"
fetched_at: "2026-07-20T06:52:37.869Z"
sha256: "ad48657e45b3805fabe58a7cf7681cd195731c4063fd95248b7b297b8ade3cf9"
---

# Record Final Object after Streaming Object

When you're streaming structured data, you may want to record the final object for logging or other purposes.

## `onEnd` and `output`

Use `onEnd` for metadata like token usage and await `result.output` for the final structured object.

```ts file='index.ts' highlight={"16-18,24-29"}
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

```ts file='index.ts' highlight={"21-26"}
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
