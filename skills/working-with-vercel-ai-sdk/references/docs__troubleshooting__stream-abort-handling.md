---
source: "https://ai-sdk.dev/docs/troubleshooting/stream-abort-handling.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "60b4d067c55b17cc666d9b3b52dedcbcf101bf5dd3e34be79c4deef2eef0be99"
---

# onEnd not called when stream is aborted

## Issue

When using `toUIMessageStream` with an `onEnd` callback, the callback may not execute when the stream is aborted. This happens because the abort handler immediately terminates the response, preventing the `onEnd` callback from being triggered.

```tsx
// Server-side code where onEnd isn't called on abort
export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: __MODEL__,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onEnd: async ({ isAborted }) => {
        // This isn't called when the stream is aborted!
        if (isAborted) {
          console.log('Stream was aborted');
          // Handle abort-specific cleanup
        } else {
          console.log('Stream completed normally');
          // Handle normal completion
        }
      },
    }),
  });
}
```

## Background

When a stream is aborted, the response is immediately terminated. Without proper handling, the `onEnd` callback has no chance to execute, preventing important cleanup operations like saving partial results or logging abort events.

## Solution

Add `consumeSseStream: consumeStream` to the `createUIMessageStreamResponse` configuration. This ensures that abort events are properly captured and forwarded to the `onEnd` callback, allowing it to execute even when the stream is aborted.

```tsx
// other imports...
import {
  consumeStream,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: __MODEL__,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onEnd: async ({ isAborted }) => {
        // Now this WILL be called even when aborted!
        if (isAborted) {
          console.log('Stream was aborted');
          // Handle abort-specific cleanup
        } else {
          console.log('Stream completed normally');
          // Handle normal completion
        }
      },
    }),
    consumeSseStream: consumeStream, // This enables onEnd to be called on abort
  });
}
```


## Navigation

- [Azure OpenAI Slow to Stream](/docs/troubleshooting/azure-stream-slow)
- [Server Actions in Client Components](/docs/troubleshooting/server-actions-in-client-components)
- [useChat/useCompletion stream output contains 0:... instead of text](/docs/troubleshooting/strange-stream-output)
- [Streamable UI Errors](/docs/troubleshooting/streamable-ui-errors)
- [Tool Invocation Missing Result Error](/docs/troubleshooting/tool-invocation-missing-result)
- [Streaming Not Working When Deployed](/docs/troubleshooting/streaming-not-working-when-deployed)
- [Streaming Not Working When Proxied](/docs/troubleshooting/streaming-not-working-when-proxied)
- [Getting Timeouts When Deploying on Vercel](/docs/troubleshooting/timeout-on-vercel)
- [Unclosed Streams](/docs/troubleshooting/unclosed-streams)
- [useChat Failed to Parse Stream](/docs/troubleshooting/use-chat-failed-to-parse-stream)
- [Server Action Plain Objects Error](/docs/troubleshooting/client-stream-error)
- [useChat No Response](/docs/troubleshooting/use-chat-tools-no-response)
- [Custom headers, body, and credentials not working with useChat](/docs/troubleshooting/use-chat-custom-request-options)
- [TypeScript performance issues with Zod and AI SDK 5](/docs/troubleshooting/typescript-performance-zod)
- [useChat "An error occurred"](/docs/troubleshooting/use-chat-an-error-occurred)
- [Repeated assistant messages in useChat](/docs/troubleshooting/repeated-assistant-messages)
- [onEnd not called when stream is aborted](/docs/troubleshooting/stream-abort-handling)
- [Tool calling with structured outputs](/docs/troubleshooting/tool-calling-with-structured-outputs)
- [Abort and resumable streams](/docs/troubleshooting/abort-breaks-resumable-streams)
- [streamText fails silently](/docs/troubleshooting/stream-text-not-working)
- [Streaming Status Shows But No Text Appears](/docs/troubleshooting/streaming-status-delay)
- [Stale body values with useChat](/docs/troubleshooting/use-chat-stale-body-data)
- [Type Error with onToolCall](/docs/troubleshooting/ontoolcall-type-narrowing)
- [Unsupported model version error](/docs/troubleshooting/unsupported-model-version)
- [Object generation failed with OpenAI](/docs/troubleshooting/no-object-generated-content-filter)
- [Missing Tool Results Error](/docs/troubleshooting/missing-tool-results-error)
- [Model is not assignable to type "LanguageModelV1"](/docs/troubleshooting/model-is-not-assignable-to-type)
- [TypeScript error "Cannot find namespace 'JSX'"](/docs/troubleshooting/typescript-cannot-find-namespace-jsx)
- [React error "Maximum update depth exceeded"](/docs/troubleshooting/react-maximum-update-depth-exceeded)
- [Jest: cannot find module '@ai-sdk/rsc'](/docs/troubleshooting/jest-cannot-find-module-ai-rsc)
- [High memory usage when processing many images](/docs/troubleshooting/high-memory-usage-with-images)


[Full Sitemap](/sitemap.md)
