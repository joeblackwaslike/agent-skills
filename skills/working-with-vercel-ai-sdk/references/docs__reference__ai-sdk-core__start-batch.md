---
title: experimental_startBatch
description: API Reference for experimental_startBatch.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/start-batch"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/start-batch.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "0191f5c06d0cf3342a45996d8d4057d8ca7fd62e65c332aecf87b7b95f101134"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Batch support is experimental and the API may change in patch releases.

Starts an asynchronous batch of text or image generation requests. For a complete guide to the batch lifecycle, see
[Batch](/docs/ai-sdk-core/batch).

```ts
import { experimental_startBatch as startBatch } from 'ai';

const batch = await startBatch({
  requests: [
    {
      id: 'france',
      type: 'text',
      model: 'gpt-5.4-nano',
      prompt: 'What is the capital of France?',
    },
  ],
});
```

## Import

```
import { experimental_startBatch } from "ai"
```

## API Signature

### Parameters

- `provider?` (`Experimental_BatchProvider`): The provider to use. Defaults to the global provider, or the AI Gateway when no global provider is configured.
- `requests` (`Array<Experimental_BatchRequest>`): The independent requests to process. Each request must have a unique, non-empty id, a supported type, and type-specific properties such as model and prompt or messages for text requests.
- `providerOptions?` (`ProviderOptions`): Additional provider-specific options for the batch.
- `webhookUrl?` (`string`): URL to notify when the batch reaches a terminal state. Support and payloads are provider-specific.
- `abortSignal?` (`AbortSignal`): An optional abort signal to cancel the request that starts the batch.
- `timeout?` (`number | { totalMs?: number }`): Maximum time allowed for the batch creation request.
- `headers?` (`Record<string, string | undefined>`): Additional HTTP headers for the request.

### Returns

- `version` (`2`): Version of the serializable batch reference.
- `id` (`string`): Provider batch identifier.
- `provider` (`string`): Provider identifier for the batch.
- `status` (`'pending' | 'completed' | 'failed'`): Initial normalized batch status.
- `rawStatus?` (`string`): The provider-specific batch status, when available.
- `requestCounts?` (`{ total: number; pending: number; completed: number; failed: number }`): Provider-reported request counts.
- `error?` (`Experimental_BatchError`): Error details when the batch fails.
- `createdAt?` (`string`): Creation timestamp, when provided by the provider.
- `expiresAt?` (`string`): Expiration timestamp, when provided by the provider.
- `providerMetadata?` (`ProviderMetadata`): Provider-specific metadata for the batch.
- `warnings` (`Warning[]`): Warnings returned while starting the batch.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)