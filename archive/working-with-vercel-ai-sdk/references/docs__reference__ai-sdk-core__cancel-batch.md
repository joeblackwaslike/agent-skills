---
title: experimental_cancelBatch
description: API Reference for experimental_cancelBatch.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/cancel-batch"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/cancel-batch.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "6593ad3f3668bb7c81967153e7a18666fb181535d24afb5f19a3be3142d270bd"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Batch support is experimental and the API may change in patch releases.

Requests cancellation of an asynchronous batch. A successful call means that
the provider accepted the cancellation request, not that cancellation has
finished. For a complete guide to the batch lifecycle, see
[Batch](/docs/ai-sdk-core/batch).

```ts
import { experimental_cancelBatch as cancelBatch } from 'ai';

const result = await cancelBatch({
  provider,
  batch,
});

console.log(result.providerMetadata);
```

## Import

```
import { experimental_cancelBatch } from "ai"
```

## API Signature

### Parameters

- `provider?` (`Experimental_BatchProvider`): The provider used to access the batch. Defaults to the global provider, or the AI Gateway when no global provider is configured.
- `batch` (`Experimental_BatchReference`): The serializable reference returned by experimental\_startBatch.
- `providerOptions?` (`ProviderOptions`): Additional provider-specific options for the cancellation request.
- `abortSignal?` (`AbortSignal`): An optional abort signal to cancel the API request.
- `timeout?` (`number | { totalMs?: number }`): Maximum time allowed for the cancellation request.
- `headers?` (`Record<string, string | undefined>`): Additional HTTP headers for the request.

### Returns

- `providerMetadata?` (`ProviderMetadata`): Provider-specific metadata from the cancellation response.

Calling this function with a provider that does not support batch cancellation
throws an `UnsupportedFunctionalityError`.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)