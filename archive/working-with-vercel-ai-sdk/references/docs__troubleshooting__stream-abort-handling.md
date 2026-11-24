---
title: onEnd not called when stream is aborted
description: Troubleshooting onEnd callback not executing when streams are aborted with toUIMessageStream
url: "https://ai-sdk.dev/docs/troubleshooting/stream-abort-handling"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/stream-abort-handling.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "4a82b664d437e36338a35972f1d163c34c9dbe8c64fee4319be066c2f1a6ec7e"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

When using `toUIMessageStream` with an `onEnd` callback, the callback may not execute when the stream is aborted. This happens because the abort handler immediately terminates the response, preventing the `onEnd` callback from being triggered.

```tsx
// Server-side code where onEnd isn't called on abort
export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: "anthropic/claude-sonnet-5.5",
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
    model: "anthropic/claude-sonnet-5.5",
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

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)