---
title: AI_RetryError
description: Learn how to fix AI_RetryError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-retry-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-retry-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "d7dff648ec8c57e5637e49aff616d588b2a8923d653da89c73f925da0f6367ff"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when a retry operation fails.

## Properties

- `reason`: The reason for the retry failure
- `lastError`: The most recent error that occurred during retries
- `errors`: Array of all errors that occurred during retry attempts
- `message`: The error message

## Checking for this Error

You can check if an error is an instance of `AI_RetryError` using:

```typescript
import { RetryError } from 'ai';

if (RetryError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)