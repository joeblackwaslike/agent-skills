---
title: AI_ExtractionRefusalError
description: Identify extraction fields that a model declined to extract.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-extraction-refusal-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-extraction-refusal-error.md"
fetched_at: "2026-11-23T14:15:54.730Z"
sha256: "00ce3fb16b776ee195c28e3a91eb29a63815e525b4dd9d19c90ea524123acb2b"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This experimental error identifies fields that an extraction model declined to
extract, such as a field the provider's safety policy refuses. It is exported
from `ai` and `@ai-sdk/provider` as `Experimental_ExtractionRefusalError`.

Extraction models report a refusal as an answer with `type: 'refusal'`.
`experimental_extract` throws this error when any answer is a refusal, after the
provider call and without retrying it.

## Properties

- `fieldIds`: The IDs of the refused fields.
- `provider`: The provider of the extraction model.
- `modelId`: The extraction model ID.
- `message`: A description of the refused fields and model.

## Checking for this Error

Use the marker-based `isInstance` check, which works across package copies:

```typescript
import { Experimental_ExtractionRefusalError as ExtractionRefusalError } from 'ai';

if (ExtractionRefusalError.isInstance(error)) {
  console.log(error.fieldIds, error.modelId);
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)