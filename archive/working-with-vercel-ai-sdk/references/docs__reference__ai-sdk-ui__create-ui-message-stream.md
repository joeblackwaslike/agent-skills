---
title: createUIMessageStream
description: API Reference for createUIMessageStream.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/create-ui-message-stream"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/create-ui-message-stream.md"
fetched_at: "2026-10-26T09:52:56.075Z"
sha256: "c723177f98bca45491f1f02f530172812089aec988040c2b6cc531cc088dbf6e"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The `createUIMessageStream` function allows you to create a readable stream for UI messages with advanced features like message merging, error handling, and finish callbacks.

## Import

```
import { createUIMessageStream } from "ai"
```

## Example

```tsx
const existingMessages: UIMessage[] = [
  /* ... */
];

const stream = createUIMessageStream({
  async execute({ writer }) {
    // The outer stream owns the assistant message lifecycle.
    writer.write({ type: 'start' });

    // Start a text message
    // Note: The id must be consistent across text-start, text-delta, and text-end steps
    // This allows the system to correctly identify they belong to the same text block
    writer.write({
      type: 'text-start',
      id: 'example-text',
    });

    // Write a message chunk
    writer.write({
      type: 'text-delta',
      id: 'example-text',
      delta: 'Hello',
    });

    // End the text message
    writer.write({
      type: 'text-end',
      id: 'example-text',
    });

    // Merge another stream from streamText
    const result = streamText({
      model: "anthropic/claude-sonnet-5.5",
      prompt: 'Write a haiku about AI',
    });

    writer.merge(
      toUIMessageStream({
        stream: result.stream,
        sendStart: false,
        onEnd: ({ outcome }) => {
          // The composer decides that the model stream outcome is also the
          // aggregate stream outcome.
          writer.setOutcome(outcome);
        },
      }),
    );
  },
  onError: error =>
    `Custom error: ${error instanceof Error ? error.message : String(error)}`,
  originalMessages: existingMessages,
  onEnd: ({ messages, isContinuation, outcome, responseMessage }) => {
    console.log('Stream ended with messages:', messages);
    console.log('Stream outcome:', outcome.status);
  },
});
```

`setOutcome` records the composer's policy without writing a chunk or closing
the stream. The first outcome declared through `setOutcome` is retained, but a
fatal execution, merge, error-handling, or downstream processing failure makes
the final `onEnd` outcome `failed`. Individual `error` chunks do not change the
outcome by themselves. When merging multiple child streams, aggregate their
outcomes and call `setOutcome` once.

## API Signature

### Parameters

- `execute` (`(options: { writer: UIMessageStreamWriterWithOutcome }) => Promise<void> | void`): A function that receives a writer instance and can use it to write UI message chunks to the stream.
  - `UIMessageStreamWriterWithOutcome`
    - `write` (`(part: UIMessageChunk) => void`): Writes a UI message chunk to the stream.
    - `merge` (`(stream: ReadableStream<UIMessageChunk>) => void`): Merges the contents of another UI message stream into this stream.
    - `setOutcome` (`(outcome: UIMessageStreamOutcome) => void`): Declares the operation-level outcome of the composed stream. The first outcome declared through this method is retained, while fatal execution, merge, error-handling, or downstream processing failures override declarations. Supported statuses are 'completed', 'failed', 'aborted', and 'unknown'. Declaring an outcome does not write a chunk or close the stream.
    - `onError` (`(error: unknown) => string`): Error handler that is used by the stream writer for handling errors in merged streams.
- `onError` (`(error: unknown) => string`): A function that handles errors and returns an error message string. By default, it returns \`"An error occurred."\` so server-side error details are not sent to the client.
- `originalMessages` (`UIMessage[] | undefined`): The original messages. If provided, persistence mode is assumed and a message ID is provided for the response message.
- `onEnd` (`(options: { messages: UIMessage[]; isContinuation: boolean; isAborted: boolean; isCancelled?: true; outcome: UIMessageStreamOutcome; responseMessage: UIMessage; finishReason?: FinishReason }) => PromiseLike<void> | void`): A callback function that is called when the stream ends.
  - `EndOptions`
    - `messages` (`UIMessage[]`): The updated list of UI messages.
    - `isContinuation` (`boolean`): Indicates whether the response message is a continuation of the last original message, or if a new message was created.
    - `isAborted` (`boolean`): Indicates whether the stream was aborted.
    - `isCancelled` (`true | undefined`): Present and true when the consumer cancelled the stream before an outcome was declared, for example because the client disconnected.
    - `outcome` (`UIMessageStreamOutcome = { status: 'completed' } | { status: 'failed'; error?: unknown } | { status: 'aborted' } | { status: 'unknown' }`): The operation-level outcome of the stream. It reflects the stream owner declaration unless a fatal stream-processing failure occurs, and is separate from model finish reasons and individual error chunks. It remains 'unknown' when the consumer cancels before an outcome is declared; check isCancelled to distinguish that case from normal closure without a declared outcome.
    - `responseMessage` (`UIMessage`): The message that was sent to the client as a response (including the original message if it was extended).
    - `finishReason` (`FinishReason | undefined`): The reason why the generation finished. One of: 'stop', 'length', 'content-filter', 'tool-calls', 'error', 'interrupted', or 'other'.
- `onFinish` (`(options: { messages: UIMessage[]; isContinuation: boolean; isAborted: boolean; isCancelled?: true; outcome: UIMessageStreamOutcome; responseMessage: UIMessage; finishReason?: FinishReason }) => PromiseLike<void> | void`): Deprecated alias for \`onEnd\`.
- `generateId` (`IdGenerator | undefined`): A function to generate unique IDs for messages. Uses the default ID generator if not provided.

### Returns

`ReadableStream<UIMessageChunk>`

A readable stream that emits UI message chunks. The stream automatically handles error propagation, merging of multiple streams, and proper cleanup when all operations are complete.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)