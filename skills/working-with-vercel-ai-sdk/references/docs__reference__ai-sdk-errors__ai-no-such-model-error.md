---
title: AI_NoSuchModelError
description: Learn how to fix AI_NoSuchModelError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-such-model-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-such-model-error.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "b5f94633f8ba9c6cfbc592cfc4eb5f502832b4f7e14d5cc172444258c682f62b"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when a model ID is not found.

## Properties

- `modelId`: The ID of the model that was not found
- `modelType`: The type of model (`'languageModel'`, `'embeddingModel'`, `'imageModel'`, `'transcriptionModel'`, `'speechModel'`, or `'rerankingModel'`)
- `message`: The error message (optional, auto-generated from `modelId` and `modelType`)

## Checking for this Error

You can check if an error is an instance of `AI_NoSuchModelError` using:

```typescript
import { NoSuchModelError } from 'ai';

if (NoSuchModelError.isInstance(error)) {
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