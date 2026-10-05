---
title: AI_NoSuchProviderError
description: Learn how to fix AI_NoSuchProviderError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-such-provider-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-such-provider-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "3e7bcee1b0d73777e86b58f290d829727f60e1bde5bd3f5e57bb3bf134191911"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when a provider ID is not found.

## Properties

- `providerId`: The ID of the provider that was not found
- `availableProviders`: Array of available provider IDs
- `modelId`: The ID of the model
- `modelType`: The type of model
- `message`: The error message

## Checking for this Error

You can check if an error is an instance of `AI_NoSuchProviderError` using:

```typescript
import { NoSuchProviderError } from 'ai';

if (NoSuchProviderError.isInstance(error)) {
  // Handle the error
}
```

Experimental evaluation resolution uses `modelType: 'evaluationModel'`. This
includes unavailable evaluation capabilities and unknown evaluation model or
provider IDs. See [Evaluation](/docs/ai-sdk-core/evaluation#default-provider-strings).

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)