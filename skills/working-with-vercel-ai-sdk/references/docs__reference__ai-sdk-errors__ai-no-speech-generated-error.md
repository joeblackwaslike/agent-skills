---
title: AI_NoSpeechGeneratedError
description: Learn how to fix AI_NoSpeechGeneratedError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-speech-generated-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-speech-generated-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "e982c639b0c1bf9be7df0e3da894323faf8e7083e18f6585e29268557cfd0ca1"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when no audio could be generated from the input.

## Properties

- `responses`: Array of speech model response metadata (required in constructor)

## Checking for this Error

You can check if an error is an instance of `AI_NoSpeechGeneratedError` using:

```typescript
import { NoSpeechGeneratedError } from 'ai';

if (NoSpeechGeneratedError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)