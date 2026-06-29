---
source: "https://ai-sdk.dev/docs/troubleshooting/abort-breaks-resumable-streams.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "cf0418de054dc66f84c34f4efd81770931288c70e6caa71cee17300ef43ee4ed"
---

# Abort and resumable streams

## Issue

When using `useChat` with `resume: true` for stream resumption, client-side aborts are treated as disconnects. Closing a tab, refreshing the page, navigating away, or calling `stop()` closes the current HTTP connection, but it should not cancel the underlying generation.

If your application passes the request abort signal through to the model call, disconnects can cancel the work that stream resumption expects to keep running. If your stop button only calls `stop()`, the server-side generation can continue and the client may reconnect to the same active stream.

```tsx
const { messages, stop } = useChat({
  id: chatId,
  resume: true, // Stream resumption enabled
});

// stop() only aborts the current client request.
// It is not a server-side cancellation request.
```

## Background

Stream resumption lets the client reconnect to an active stream after the original connection closes. To support that, the server needs to keep the stream producer running even when no client is currently connected.

This means route cleanup, page unloads, and network disconnects should be handled as resumable disconnects. Explicit user cancellation needs a separate server-side signal that cancels the active producer and clears the stored active stream reference.

## Solution

Use `resume: true` for reconnecting after disconnects, and add a dedicated stop endpoint for explicit user cancellation.

The stop endpoint should:

1. Load the chat and read its active stream ID
2. Persist the latest partial assistant message if the client sends one
3. Cancel the work that is producing the stream
4. Clear the active stream reference only if it still points to the same stream

On the client, call your stop endpoint before stopping the local chat stream:

```tsx
const chat = useChat({
  id: chatId,
  resume: true,
});

async function stopStream() {
  await fetch(`/api/chat/${chatId}/stop`, { method: 'POST' });
  chat.stop();
}
```

Keep navigation separate from stop behavior. Do not call the stop endpoint from route cleanup code, page unload handlers, or component unmount cleanup. Those events are disconnects that should remain resumable.

If you do not need stream resumption and only want client-side cancellation, disable `resume` and use `stop()` directly:

```tsx
const { messages, sendMessage, stop } = useChat({
  id: chatId,
  resume: false, // Disable stream resumption (default behavior)
});
```

## Related

- [Chatbot Resume Streams](/docs/ai-sdk-ui/chatbot-resume-streams)
- [Stopping Streams](/docs/advanced/stopping-streams)


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
