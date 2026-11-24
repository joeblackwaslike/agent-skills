---
title: AI_EmptyResponseBodyError
description: Learn how to fix AI_EmptyResponseBodyError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-empty-response-body-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-empty-response-body-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "e0e83783baeab6523c047cac8336969e8833cff834a87ce9e4372a5ec3eca5dd"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when the server returns an empty response body.

## Properties

- `message`: The error message

## Checking for this Error

You can check if an error is an instance of `AI_EmptyResponseBodyError` using:

```typescript
import { EmptyResponseBodyError } from 'ai';

if (EmptyResponseBodyError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)