---
title: pipeUIMessageStreamToResponse
description: Learn to use pipeUIMessageStreamToResponse helper function to pipe streaming data to a ServerResponse object.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/pipe-ui-message-stream-to-response"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/pipe-ui-message-stream-to-response.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "568238ee5d135711d0ac2169e9297f2805eb68c649ff56a237619a654858bc9f"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The `pipeUIMessageStreamToResponse` function pipes streaming data to a Node.js ServerResponse object (see [Streaming Data](/docs/ai-sdk-ui/streaming-data)).

## Import

```
import { pipeUIMessageStreamToResponse } from "ai"
```

## Example

```tsx
await pipeUIMessageStreamToResponse({
  response: serverResponse,
  status: 200,
  statusText: 'OK',
  headers: {
    'Custom-Header': 'value',
  },
  stream: myUIMessageStream,
  consumeSseStream: ({ stream }) => {
    // Optional: consume the SSE stream independently
    console.log('Consuming SSE stream:', stream);
  },
});
```

## API Signature

### Parameters

- `response` (`ServerResponse`): The Node.js ServerResponse object to pipe the data to.
- `stream` (`ReadableStream<UIMessageChunk>`): The UI message stream to pipe to the response.
- `status?` (`number`): The status code for the response.
- `statusText?` (`string`): The status text for the response.
- `headers?` (`Headers | Record<string, string>`): Additional headers for the response.
- `keepAliveMs?` (`number`): Interval in milliseconds for sending SSE keep-alive comments. When set, an opening comment is sent immediately and additional comments are sent after the stream has been idle for the configured interval.
- `consumeSseStream?` (`({ stream }: { stream: ReadableStream<string> }) => PromiseLike<void> | void`): Optional function to consume the SSE stream independently. The stream is teed and this function receives a copy.

### Returns

A `Promise<void>` that resolves when the stream has been written to the response
and rejects when reading or writing the stream fails.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)