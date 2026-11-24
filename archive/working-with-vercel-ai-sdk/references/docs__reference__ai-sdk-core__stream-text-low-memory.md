---
title: experimental_streamTextLowMemory
description: Stream with the streamText execution engine without a replay buffer or unused final results.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text-low-memory"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text-low-memory.md"
fetched_at: "2026-10-26T09:52:56.075Z"
sha256: "b8fff68b2acf56afed930e3e6406f4bba57ed2f2c47d3b76658219db946f3aa0"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This API is experimental and may change in future versions.

Use `experimental_streamTextLowMemory`
when you consume the output once and do not need to read the complete result later.

```ts
import { experimental_streamTextLowMemory } from 'ai';

const result = experimental_streamTextLowMemory({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'Describe the history of astronomy.',
});

for await (const delta of result.textStream) {
  process.stdout.write(delta);
}

console.log(await result.totalUsage);
```

## Supported features

The function accepts the same options as `streamText`, including model settings,
prompts and messages, provider options, tools, tool approval, `prepareStep`,
`stopWhen`, structured output, transforms, retries, timeouts, cancellation,
callbacks, and telemetry. These use the shared execution engine; there is no
separate tool loop or provider implementation.

Tool execution and subsequent model calls receive the complete conversation
history. Lifecycle callbacks and telemetry receive their normal content and are
not silently skipped. The existing error semantics also apply: use `onError` or
`stream` to observe provider errors; `textStream` contains only text deltas.

```ts
import { experimental_streamTextLowMemory, isStepCount, tool } from 'ai';
import { z } from 'zod/v4';

const result = experimental_streamTextLowMemory({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'How many characters are in astronomy?',
  tools: {
    countCharacters: tool({
      description: 'Count the Unicode code points in a string.',
      inputSchema: z.object({ text: z.string() }),
      execute: async ({ text }) => Array.from(text).length,
    }),
  },
  stopWhen: isStepCount(3),
});

for await (const part of result.stream) {
  if (part.type === 'text-delta') process.stdout.write(part.text);
  if (part.type === 'tool-result') console.log(part.output);
}
```

## Memory usage

`experimental_streamTextLowMemory` does not save a copy of the
stream for replay. For plain text streaming, it also avoids keeping the complete
generated text for later access.

This API reduces memory use; it does not set a fixed memory limit. Providers, UI
message assembly, and your own code can also keep output in memory. For example,
appending every chunk to a string in your application still builds the full answer.

## Return value

The result exposes these members:

| Member                                                                                    | Behavior                                                                                                  |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `textStream`                                                                              | Text deltas as an async iterable and readable stream.                                                     |
| `stream` / `fullStream`                                                                   | All execution events, including tools, reasoning, errors, and finish events.                              |
| `partialOutputStream`                                                                     | Cumulative partial output. Requires an explicit `output` option; use `Output.text()` for cumulative text. |
| `elementStream`                                                                           | Parsed elements when the output specification supports them.                                              |
| `totalUsage` / `usage`                                                                    | Promise-like usage metadata, resolved when the stream finishes.                                           |
| `finishReason` / `rawFinishReason`                                                        | Promise-like completion metadata.                                                                         |
| `consumeStream()`                                                                         | Consume and discard the stream when no other consumer is needed.                                          |
| `toTextStreamResponse()` / `pipeTextStreamToResponse()`                                   | Text response helpers.                                                                                    |
| `toUIMessageStream()` / `toUIMessageStreamResponse()` / `pipeUIMessageStreamToResponse()` | UI message conversion and response helpers, including their existing callbacks.                           |

Choose **one** stream accessor, response helper, or `consumeStream()` call. A
second attempt to claim the stream throws or rejects. There is no replay after
completion. Calling `.tee()` on the returned readable stream yourself can
reintroduce buffering.

Metadata promises can be obtained before, during, or after streaming. They do not
consume the stream: start a consumer before awaiting completion metadata.
Cancelling the stream rejects any pending completion promises and cancels the
upstream stream. External abort signals follow `streamText`'s abort behavior.

Final-content getters such as `text`, `content`, `steps`, `finalStep`,
`responseMessages`, and `output` are absent from both the type and runtime object.
Use ordinary `streamText` when you need its retained results or independent
stream readers. Its behavior is unchanged.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)