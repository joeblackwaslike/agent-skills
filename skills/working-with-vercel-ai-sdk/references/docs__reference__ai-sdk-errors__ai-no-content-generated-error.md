---
title: AI_NoContentGeneratedError
description: Learn how to fix AI_NoContentGeneratedError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-content-generated-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-content-generated-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "4573065e7b92681611474cba9b2a2091adb3d7c9c9c75f9513299338c3e573b8"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when the AI provider fails to generate content.

## Properties

- `message`: The error message (optional, defaults to `'No content generated.'`)

## Checking for this Error

You can check if an error is an instance of `AI_NoContentGeneratedError` using:

```typescript
import { NoContentGeneratedError } from 'ai';

if (NoContentGeneratedError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)