---
title: experimental_getBatchResults
description: API Reference for experimental_getBatchResults.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/get-batch-results"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/get-batch-results.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "836668ef681594fdfbb1282748fdb3261ba0f431c7a6d46de73a6804e4fafe2b"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Batch support is experimental and the API may change in patch releases.

Returns an async iterable of terminal results for the requests in an
asynchronous batch. For a complete guide to the batch lifecycle, see
[Batch](/docs/ai-sdk-core/batch).

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { experimental_getBatchResults as getBatchResults } from 'ai';

for await (const item of getBatchResults({ provider: anthropic, batch })) {
  if (item.status === 'succeeded') {
    console.log(item.id, item.text);
  } else {
    console.error(item.id, item.error);
  }
}
```

## Import

```
import { experimental_getBatchResults } from "ai"
```

## API Signature

### Parameters

- `provider?` (`Experimental_BatchProvider`): The provider used to access the batch. Defaults to the global provider, or the AI Gateway when no global provider is configured.
- `batch` (`Experimental_BatchReference`): The serializable reference returned by experimental\_startBatch.
- `tools?` (`ToolSet`): The client-defined tools provided on requests in the batch. Used to validate and normalize returned tool calls; execute functions are never invoked.
- `providerOptions?` (`ProviderOptions`): Additional provider-specific options for result retrieval.
- `maxRetries?` (`number`): Maximum number of retries for result retrieval. Set to 0 to disable retries. Default: 2.
- `abortSignal?` (`AbortSignal`): An optional abort signal to cancel result retrieval.
- `timeout?` (`number | { totalMs?: number }`): Maximum time allowed for result retrieval.
- `headers?` (`Record<string, string | undefined>`): Additional HTTP headers for the request.

### Returns

An `AsyncIterableStream<Experimental_BatchItemResult>` of succeeded,
failed, cancelled, or expired request results. You can consume the stream as
either an async iterable or a `ReadableStream`.

Successful items contain `id`, `status: 'succeeded'`, `text`, normalized
`content` (including text, reasoning, sources, files, tool calls, and tool
results),
`finishReason`, `usage`, and optional response and provider metadata. `text` is
the concatenation of text parts and can be an empty string when a result
contains no text parts.
Failed, cancelled, and expired items contain the request `id`, their terminal
status, and optional error details.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)