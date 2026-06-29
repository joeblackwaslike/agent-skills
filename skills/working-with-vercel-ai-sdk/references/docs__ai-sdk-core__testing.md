---
source: "https://ai-sdk.dev/docs/ai-sdk-core/testing.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "f720f5bbd9cf861efa7045d969cb117ef79dbc6e531c8c015d496d89173a715a"
---

# Testing

Testing language models can be challenging, because they are non-deterministic
and calling them is slow and expensive.

To enable you to unit test your code that uses the AI SDK, the AI SDK Core
includes mock providers and test helpers. You can import the following helpers from `ai/test`:

- `MockEmbeddingModelV4`: A mock embedding model using the [embedding model v4 specification](https://github.com/vercel/ai/blob/main/packages/provider/src/embedding-model/v4/embedding-model-v4.ts).
- `MockLanguageModelV4`: A mock language model using the [language model v4 specification](https://github.com/vercel/ai/blob/main/packages/provider/src/language-model/v4/language-model-v4.ts).
- `mockId`: Provides an incrementing integer ID.
- `mockValues`: Iterates over an array of values with each call. Returns the last value when the array is exhausted.

You can also import [`simulateReadableStream`](/docs/reference/ai-sdk-core/simulate-readable-stream) from `ai` to simulate a readable stream with delays.

With mock providers and test helpers, you can control the output of the AI SDK
and test your code in a repeatable and deterministic way without actually calling
a language model provider.

## Examples

You can use the test helpers with the AI Core functions in your unit tests:

### generateText

```ts
import { generateText } from 'ai';
import { MockLanguageModelV4 } from 'ai/test';

const result = await generateText({
  model: new MockLanguageModelV4({
    doGenerate: async () => ({
      content: [{ type: 'text', text: `Hello, world!` }],
      finishReason: { unified: 'stop', raw: undefined },
      usage: {
        inputTokens: {
          total: 10,
          noCache: 10,
          cacheRead: undefined,
          cacheWrite: undefined,
        },
        outputTokens: {
          total: 20,
          text: 20,
          reasoning: undefined,
        },
      },
      warnings: [],
    }),
  }),
  prompt: 'Hello, test!',
});
```

### streamText

```ts
import { streamText, simulateReadableStream } from 'ai';
import { MockLanguageModelV4 } from 'ai/test';

const result = streamText({
  model: new MockLanguageModelV4({
    doStream: async () => ({
      stream: simulateReadableStream({
        chunks: [
          { type: 'text-start', id: 'text-1' },
          { type: 'text-delta', id: 'text-1', delta: 'Hello' },
          { type: 'text-delta', id: 'text-1', delta: ', ' },
          { type: 'text-delta', id: 'text-1', delta: 'world!' },
          { type: 'text-end', id: 'text-1' },
          {
            type: 'finish',
            finishReason: { unified: 'stop', raw: undefined },
            logprobs: undefined,
            usage: {
              inputTokens: {
                total: 3,
                noCache: 3,
                cacheRead: undefined,
                cacheWrite: undefined,
              },
              outputTokens: {
                total: 10,
                text: 10,
                reasoning: undefined,
              },
            },
          },
        ],
      }),
    }),
  }),
  prompt: 'Hello, test!',
});
```

### generateText with Output

```ts
import { generateText, Output } from 'ai';
import { MockLanguageModelV4 } from 'ai/test';
import { z } from 'zod';

const result = await generateText({
  model: new MockLanguageModelV4({
    doGenerate: async () => ({
      content: [{ type: 'text', text: `{"content":"Hello, world!"}` }],
      finishReason: { unified: 'stop', raw: undefined },
      usage: {
        inputTokens: {
          total: 10,
          noCache: 10,
          cacheRead: undefined,
          cacheWrite: undefined,
        },
        outputTokens: {
          total: 20,
          text: 20,
          reasoning: undefined,
        },
      },
      warnings: [],
    }),
  }),
  output: Output.object({ schema: z.object({ content: z.string() }) }),
  prompt: 'Hello, test!',
});
```

### streamText with Output

```ts
import { streamText, Output, simulateReadableStream } from 'ai';
import { MockLanguageModelV4 } from 'ai/test';
import { z } from 'zod';

const result = streamText({
  model: new MockLanguageModelV4({
    doStream: async () => ({
      stream: simulateReadableStream({
        chunks: [
          { type: 'text-start', id: 'text-1' },
          { type: 'text-delta', id: 'text-1', delta: '{ ' },
          { type: 'text-delta', id: 'text-1', delta: '"content": ' },
          { type: 'text-delta', id: 'text-1', delta: `"Hello, ` },
          { type: 'text-delta', id: 'text-1', delta: `world` },
          { type: 'text-delta', id: 'text-1', delta: `!"` },
          { type: 'text-delta', id: 'text-1', delta: ' }' },
          { type: 'text-end', id: 'text-1' },
          {
            type: 'finish',
            finishReason: { unified: 'stop', raw: undefined },
            logprobs: undefined,
            usage: {
              inputTokens: {
                total: 3,
                noCache: 3,
                cacheRead: undefined,
                cacheWrite: undefined,
              },
              outputTokens: {
                total: 10,
                text: 10,
                reasoning: undefined,
              },
            },
          },
        ],
      }),
    }),
  }),
  output: Output.object({ schema: z.object({ content: z.string() }) }),
  prompt: 'Hello, test!',
});
```

### Simulate UI Message Stream Responses

You can also simulate [UI Message Stream](/docs/ai-sdk-ui/stream-protocol#ui-message-stream) responses for testing,
debugging, or demonstration purposes.

Here is a Next example:

```ts filename="route.ts"
import { simulateReadableStream } from 'ai';

export async function POST(req: Request) {
  return new Response(
    simulateReadableStream({
      initialDelayInMs: 1000, // Delay before the first chunk
      chunkDelayInMs: 300, // Delay between chunks
      chunks: [
        `data: {"type":"start","messageId":"msg-123"}\n\n`,
        `data: {"type":"text-start","id":"text-1"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":"This"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":" is an"}\n\n`,
        `data: {"type":"text-delta","id":"text-1","delta":" example."}\n\n`,
        `data: {"type":"text-end","id":"text-1"}\n\n`,
        `data: {"type":"finish"}\n\n`,
        `data: [DONE]\n\n`,
      ],
    }).pipeThrough(new TextEncoderStream()),
    {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'x-vercel-ai-ui-message-stream': 'v1',
      },
    },
  );
}
```


## Navigation

- [Overview](/docs/ai-sdk-core/overview)
- [Generating Text](/docs/ai-sdk-core/generating-text)
- [Generating Structured Data](/docs/ai-sdk-core/generating-structured-data)
- [Tool Calling](/docs/ai-sdk-core/tools-and-tool-calling)
- [Model Context Protocol (MCP)](/docs/ai-sdk-core/mcp-tools)
- [MCP Apps](/docs/ai-sdk-core/mcp-apps)
- [Runtime and Tool Context](/docs/ai-sdk-core/runtime-and-tool-context)
- [Prompt Engineering](/docs/ai-sdk-core/prompt-engineering)
- [Settings](/docs/ai-sdk-core/settings)
- [Reasoning](/docs/ai-sdk-core/reasoning)
- [Embeddings](/docs/ai-sdk-core/embeddings)
- [Reranking](/docs/ai-sdk-core/reranking)
- [Image Generation](/docs/ai-sdk-core/image-generation)
- [Realtime](/docs/ai-sdk-core/realtime)
- [Transcription](/docs/ai-sdk-core/transcription)
- [Speech](/docs/ai-sdk-core/speech)
- [Video Generation](/docs/ai-sdk-core/video-generation)
- [File Uploads](/docs/ai-sdk-core/file-uploads)
- [Language Model Middleware](/docs/ai-sdk-core/middleware)
- [Skill Uploads](/docs/ai-sdk-core/skill-uploads)
- [Provider & Model Management](/docs/ai-sdk-core/provider-management)
- [Error Handling](/docs/ai-sdk-core/error-handling)
- [Testing](/docs/ai-sdk-core/testing)
- [Telemetry](/docs/ai-sdk-core/telemetry)
- [DevTools](/docs/ai-sdk-core/devtools)
- [Lifecycle Callbacks](/docs/ai-sdk-core/lifecycle-callbacks)


[Full Sitemap](/sitemap.md)
