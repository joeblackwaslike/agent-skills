---
title: AI_InvalidToolInputError
description: Learn how to fix AI_InvalidToolInputError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-tool-input-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-tool-input-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "3b433e745f06b7ee7f2aad6d01291d9b2fd11b5337627e78e456f28c58eb0d31"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when invalid tool input was provided.

## Properties

- `toolName`: The name of the tool with invalid inputs
- `toolInput`: The invalid tool inputs
- `message`: The error message
- `cause`: The cause of the error

## Checking for this Error

You can check if an error is an instance of `AI_InvalidToolInputError` using:

```typescript
import { InvalidToolInputError } from 'ai';

if (InvalidToolInputError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)