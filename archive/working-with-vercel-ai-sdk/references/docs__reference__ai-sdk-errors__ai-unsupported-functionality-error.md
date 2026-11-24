---
title: AI_UnsupportedFunctionalityError
description: Learn how to fix AI_UnsupportedFunctionalityError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-unsupported-functionality-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-unsupported-functionality-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "3fb8eac8874b2e6081139f17f29656d72de0718c7b84a2f5698d2df76ca8292f"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when functionality is not supported.

## Properties

- `functionality`: The name of the unsupported functionality
- `message`: The error message (optional, auto-generated from `functionality`)

## Checking for this Error

You can check if an error is an instance of `AI_UnsupportedFunctionalityError` using:

```typescript
import { UnsupportedFunctionalityError } from 'ai';

if (UnsupportedFunctionalityError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)