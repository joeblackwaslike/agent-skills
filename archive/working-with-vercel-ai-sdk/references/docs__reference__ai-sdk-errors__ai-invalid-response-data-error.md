---
title: AI_InvalidResponseDataError
description: Learn how to fix AI_InvalidResponseDataError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-response-data-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-response-data-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "77916b0698c2c831bd1cc39f2603049f9615e9ff63d588b7fda00b62ee2377e9"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when the server returns a response with invalid data content.

## Properties

- `data`: The invalid response data value
- `message`: The error message

## Checking for this Error

You can check if an error is an instance of `AI_InvalidResponseDataError` using:

```typescript
import { InvalidResponseDataError } from 'ai';

if (InvalidResponseDataError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)