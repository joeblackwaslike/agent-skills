---
title: AI_ExtractionUnsupportedFieldTypeError
description: Identify an extraction field type that a model does not support.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-extraction-unsupported-field-type-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-extraction-unsupported-field-type-error.md"
fetched_at: "2026-11-23T14:15:54.730Z"
sha256: "bc4c43ebe564b5e1de9a596966f5421f1a622c024220ee25a4696188999bb925"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This experimental error identifies a field whose type is unsupported by an
extraction model. It is exported from `ai` and `@ai-sdk/provider` as
`Experimental_ExtractionUnsupportedFieldTypeError`.

`experimental_extract` throws it before any provider request when the field type
is not in the model's `supportedFieldTypes`. AI Gateway extraction models support
different field types per model, so they throw it after the request, when the
gateway rejects the field.

## Properties

- `fieldId`: The ID of the unsupported field.
- `fieldType`: The requested field type.
- `provider`: The provider of the extraction model.
- `modelId`: The extraction model ID.
- `message`: A description of the unsupported field and model. Providers can
  supply a custom message.

## Checking for this Error

Use the marker-based `isInstance` check, which works across package copies:

```typescript
import { Experimental_ExtractionUnsupportedFieldTypeError as ExtractionUnsupportedFieldTypeError } from 'ai';

if (ExtractionUnsupportedFieldTypeError.isInstance(error)) {
  console.log(error.fieldId, error.fieldType, error.modelId);
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)