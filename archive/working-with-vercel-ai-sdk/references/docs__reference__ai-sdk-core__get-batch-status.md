---
title: experimental_getBatchStatus
description: API Reference for experimental_getBatchStatus.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/get-batch-status"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/get-batch-status.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "ffaf27ca74ef7bcedbe011d344f65012f239e31176057068018727455f3e6105"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Batch support is experimental and the API may change in patch releases.

Retrieves the latest status of an asynchronous batch. For a complete guide to
the batch lifecycle, see [Batch](/docs/ai-sdk-core/batch).

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { experimental_getBatchStatus as getBatchStatus } from 'ai';

const status = await getBatchStatus({
  provider: anthropic,
  batch,
});

console.log(status.status, status.requestCounts);
```

## Import

```
import { experimental_getBatchStatus } from "ai"
```

## API Signature

### Parameters

- `provider?` (`Experimental_BatchProvider`): The provider used to access the batch. Defaults to the global provider, or the AI Gateway when no global provider is configured.
- `batch` (`Experimental_BatchReference`): The serializable reference returned by experimental\_startBatch.
- `providerOptions?` (`ProviderOptions`): Additional provider-specific options for status retrieval.
- `maxRetries?` (`number`): Maximum number of retries for status retrieval. Set to 0 to disable retries. Default: 2.
- `abortSignal?` (`AbortSignal`): An optional abort signal to cancel the request.
- `timeout?` (`number | { totalMs?: number }`): Maximum time allowed for the status request.
- `headers?` (`Record<string, string | undefined>`): Additional HTTP headers for the request.

### Returns

- `status` (`'pending' | 'completed' | 'failed'`): The latest normalized batch status.
- `rawStatus?` (`string`): The provider-specific batch status, when available.
- `requestCounts?` (`{ total: number; pending: number; completed: number; failed: number }`): Provider-reported request counts.
- `error?` (`Experimental_BatchError`): Error details when the batch fails.
- `createdAt?` (`string`): Creation timestamp, when provided by the provider.
- `expiresAt?` (`string`): Expiration timestamp, when provided by the provider.
- `providerMetadata?` (`ProviderMetadata`): Provider-specific metadata for the batch.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)