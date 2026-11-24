---
title: readUIMessageStream
description: API Reference for readUIMessageStream.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/read-ui-message-stream"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/read-ui-message-stream.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "b6bedcc17d4436e2110b1db3ff7a2eaf139a1de45abf9462b7c863fcafbe51bc"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Transforms a stream of `UIMessageChunk`s into an `AsyncIterableStream` of `UIMessage`s.

UI message streams are useful outside of Chat use cases, e.g. for terminal UIs, custom stream consumption on the client, or RSC (React Server Components).

## Import

```tsx
import { readUIMessageStream } from 'ai';
```

## API Signature

### Parameters

- `message?` (`UIMessage`): The last assistant message to use as a starting point when the conversation is resumed. Otherwise undefined.
- `stream` (`ReadableStream<UIMessageChunk>`): The stream of UIMessageChunk objects to read.
- `onError?` (`(error: unknown) => void`): A function that is called when an error occurs during stream processing.
- `terminateOnError?` (`boolean`): Whether to terminate the stream if an error occurs. Defaults to false.

### Returns

An `AsyncIterableStream` of `UIMessage`s. Each stream part represents a different state of the same message as it is being completed.

For comprehensive examples and use cases, see [Reading UI Message Streams](/docs/ai-sdk-ui/reading-ui-message-streams).

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)