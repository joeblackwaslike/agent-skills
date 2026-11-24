---
title: AI_NoTranscriptGeneratedError
description: Learn how to fix AI_NoTranscriptGeneratedError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-transcript-generated-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-transcript-generated-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "93854a1265582145eff6990cd03e459b207d8504b912190196d39ef7901d44c6"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when no transcript could be generated from the input.

## Properties

- `responses`: Array of transcription model response metadata (required in constructor)

## Checking for this Error

You can check if an error is an instance of `AI_NoTranscriptGeneratedError` using:

```typescript
import { NoTranscriptGeneratedError } from 'ai';

if (NoTranscriptGeneratedError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)