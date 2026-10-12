---
title: AI_NoSuchProviderError
description: Learn how to fix AI_NoSuchProviderError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-such-provider-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-such-provider-error.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "f2bac2ae8cb9e96587a4a1e4597021514bd9d7b6c228ad9d5c9f839a45071cc0"
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

Experimental decision resolution uses `modelType: 'decisionModel'`. This
includes unavailable decision capabilities and unknown decision model or
provider IDs. See [Decisions](/docs/ai-sdk-core/decisions#default-provider-strings).

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)