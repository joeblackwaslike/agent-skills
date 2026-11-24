---
title: simulateReadableStream
description: Create a ReadableStream that emits values with configurable delays
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/simulate-readable-stream"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/simulate-readable-stream.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "c6d57fb33744ea5e881e22c8b948c96c27ee470d383f943cfd30ec4df5ae570a"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

`simulateReadableStream` is a utility function that creates a ReadableStream which emits provided values sequentially with configurable delays. This is particularly useful for testing streaming functionality or simulating time-delayed data streams.

```ts
import { simulateReadableStream } from 'ai';

const stream = simulateReadableStream({
  chunks: ['Hello', ' ', 'World'],
  initialDelayInMs: 100,
  chunkDelayInMs: 50,
});
```

## Import

```
import { simulateReadableStream } from "ai"
```

## API Signature

### Parameters

- `chunks` (`T[]`): Array of values to be emitted by the stream
- `initialDelayInMs?` (`number | null`): Initial delay in milliseconds before emitting the first value. Defaults to 0. Set to null to skip the initial delay entirely.
- `chunkDelayInMs?` (`number | null`): Delay in milliseconds between emitting each value. Defaults to 0. Set to null to skip delays between chunks.

### Returns

Returns a `ReadableStream<T>` that:

- Emits each value from the provided `chunks` array sequentially
- Waits for `initialDelayInMs` before emitting the first value (if not `null`)
- Waits for `chunkDelayInMs` between emitting subsequent values (if not `null`)
- Closes automatically after all chunks have been emitted

### Type Parameters

- `T`: The type of values contained in the chunks array and emitted by the stream

## Examples

### Basic Usage

```ts
const stream = simulateReadableStream({
  chunks: ['Hello', ' ', 'World'],
});
```

### With Delays

```ts
const stream = simulateReadableStream({
  chunks: ['Hello', ' ', 'World'],
  initialDelayInMs: 1000, // Wait 1 second before first chunk
  chunkDelayInMs: 500, // Wait 0.5 seconds between chunks
});
```

### Without Delays

```ts
const stream = simulateReadableStream({
  chunks: ['Hello', ' ', 'World'],
  initialDelayInMs: null, // No initial delay
  chunkDelayInMs: null, // No delay between chunks
});
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)