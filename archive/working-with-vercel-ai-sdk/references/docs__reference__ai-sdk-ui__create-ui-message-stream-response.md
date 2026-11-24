---
title: createUIMessageStreamResponse
description: API Reference for createUIMessageStreamResponse.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/create-ui-message-stream-response"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/create-ui-message-stream-response.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "e9504de0962a2a279c83cee57af9f3a3040939d188d196faadef3bf63d4f2f21"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The `createUIMessageStreamResponse` function creates a Response object that streams UI messages to the client.

## Import

```
import { createUIMessageStreamResponse } from "ai"
```

## Example

```tsx
import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';

const response = createUIMessageStreamResponse({
  status: 200,
  statusText: 'OK',
  headers: {
    'Custom-Header': 'value',
  },
  stream: createUIMessageStream({
    execute({ writer }) {
      // The outer stream owns the assistant message lifecycle.
      writer.write({ type: 'start' });

      // Write custom data (type must be 'data-<name>')
      writer.write({
        type: 'data-message',
        data: { content: 'Hello' },
      });

      // Write text content using start/delta/end pattern
      writer.write({
        type: 'text-start',
        id: 'greeting-text',
      });
      writer.write({
        type: 'text-delta',
        id: 'greeting-text',
        delta: 'Hello, world!',
      });
      writer.write({
        type: 'text-end',
        id: 'greeting-text',
      });

      // Write source information (flat properties, not nested)
      writer.write({
        type: 'source-url',
        sourceId: 'source-1',
        url: 'https://example.com',
        title: 'Example Source',
      });

      // Merge with LLM stream
      const result = streamText({
        model: "anthropic/claude-sonnet-5.5",
        prompt: 'Say hello',
      });

      writer.merge(
        toUIMessageStream({ stream: result.stream, sendStart: false }),
      );
    },
  }),
});
```

## API Signature

### Parameters

- `stream` (`ReadableStream<UIMessageChunk>`): The UI message stream to send to the client.
- `status?` (`number`): The status code for the response. Defaults to 200.
- `statusText?` (`string`): The status text for the response.
- `headers?` (`Headers | Record<string, string>`): Additional headers for the response.
- `keepAliveMs?` (`number`): Interval in milliseconds for sending SSE keep-alive comments. When set, an opening comment is sent immediately and additional comments are sent after the stream has been idle for the configured interval.
- `consumeSseStream?` (`(options: { stream: ReadableStream<string> }) => PromiseLike<void> | void`): Optional callback to consume the Server-Sent Events stream.

### Returns

`Response`

A Response object that streams UI message chunks with the specified status, headers, and content.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)