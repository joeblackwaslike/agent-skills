---
title: AI_APICallError
description: Learn how to fix AI_APICallError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-api-call-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-api-call-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "bc635bfb4282d2402ff3f2ed62f6b2df748bbd615a626be3448bc06956fd7e71"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when an API call fails.

## Properties

- `url`: The URL of the API request that failed
- `requestBodyValues`: The request body values sent to the API
- `statusCode`: The HTTP status code returned by the API (optional)
- `responseHeaders`: The response headers returned by the API (optional)
- `responseBody`: The response body returned by the API (optional)
- `isRetryable`: Whether the request can be retried based on the status code
- `data`: Any additional data associated with the error (optional)
- `cause`: The underlying error that caused the API call to fail (optional)

When this error is created for an AI SDK UI chat transport or completion
request, `requestBodyValues` is `undefined` so prompts and messages are not
copied into the client-facing error object.

## Checking for this Error

You can check if an error is an instance of `AI_APICallError` using:

```typescript
import { APICallError } from 'ai';

if (APICallError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)