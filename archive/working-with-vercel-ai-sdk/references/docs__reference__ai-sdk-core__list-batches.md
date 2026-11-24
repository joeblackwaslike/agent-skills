---
title: experimental_listBatches
description: API Reference for experimental_listBatches.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/list-batches"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/list-batches.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "0fb88edb84d78345dce3463fd44c102cf5e4b29b4a161e1acc6dff4142624289"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Batch support is experimental and the API may change in patch releases.

Lists a page of asynchronous batches and their latest normalized statuses. For
a complete guide to the batch lifecycle, see [Batch](/docs/ai-sdk-core/batch).

```ts
import { experimental_listBatches as listBatches } from 'ai';

const page = await listBatches({
  provider,
  limit: 20,
  cursor,
});

console.log(page.batches, page.nextCursor);
```

## Import

```
import { experimental_listBatches } from "ai"
```

## API Signature

### Parameters

- `provider?` (`Experimental_BatchProvider`): The provider whose batches should be listed. Defaults to the global provider, or the AI Gateway when no global provider is configured.
- `limit?` (`number`): Maximum number of batches to return in this page.
- `cursor?` (`string`): Opaque cursor returned as nextCursor by the previous list operation.
- `providerOptions?` (`ProviderOptions`): Additional provider-specific options for listing batches.
- `maxRetries?` (`number`): Maximum number of retries for listing batches. Set to 0 to disable retries. Default: 2.
- `abortSignal?` (`AbortSignal`): An optional abort signal to cancel the request.
- `timeout?` (`number | { totalMs?: number }`): Maximum time allowed for the list request.
- `headers?` (`Record<string, string | undefined>`): Additional HTTP headers for the request.

### Returns

- `batches` (`Array<Experimental_Batch>`): The batches in this page. Each item contains a serializable batch reference and its latest normalized status.
- `nextCursor?` (`string`): Opaque cursor to pass as cursor to retrieve the next page. Omitted when there are no more batches.
- `providerMetadata?` (`ProviderMetadata`): Provider-specific metadata for the list operation.

Calling this function with a provider that does not support listing batches
throws an `UnsupportedFunctionalityError`.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)