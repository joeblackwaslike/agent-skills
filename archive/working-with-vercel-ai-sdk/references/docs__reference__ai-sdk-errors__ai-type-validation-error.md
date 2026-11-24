---
title: AI_TypeValidationError
description: Learn how to fix AI_TypeValidationError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-type-validation-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-type-validation-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "31634960def7a0eb1eaa4b9e705343ef15f33e1e6a1bb7b417c900444ed79490"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when type validation fails.

## Properties

- `value`: The value that failed validation
- `cause`: The underlying validation error (required in constructor)

## Checking for this Error

You can check if an error is an instance of `AI_TypeValidationError` using:

```typescript
import { TypeValidationError } from 'ai';

if (TypeValidationError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)