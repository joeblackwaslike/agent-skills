---
title: AI_NoTranslationGeneratedError
description: Learn how to fix AI_NoTranslationGeneratedError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-translation-generated-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-translation-generated-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "62b23cf8449696df249fbe30dc1eb646079a1ff2d1d7e32f0a0ed55ea9e0a0e8"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when no translation could be generated from the input audio:
no `audio` part was emitted and the final output text is empty, or the stream
ended without a finish event.

## Properties

- `response`: Speech translation model response metadata (required in constructor)

## Checking for this Error

You can check if an error is an instance of `AI_NoTranslationGeneratedError` using:

```typescript
import { NoTranslationGeneratedError } from 'ai';

if (NoTranslationGeneratedError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)