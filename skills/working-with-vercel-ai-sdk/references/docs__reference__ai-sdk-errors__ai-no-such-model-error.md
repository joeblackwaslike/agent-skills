---
title: AI_NoSuchModelError
description: Learn how to fix AI_NoSuchModelError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-such-model-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-such-model-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "9a1f727caf3608d1083e470a2c02727cef66965f0d0f33eba83537514ff120a2"
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

Experimental evaluation resolution uses `modelType: 'evaluationModel'`. This
includes unavailable evaluation capabilities and unknown evaluation model or
provider IDs. See [Evaluation](/docs/ai-sdk-core/evaluation#default-provider-strings).

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)