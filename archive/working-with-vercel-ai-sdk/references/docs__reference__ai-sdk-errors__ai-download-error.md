---
title: AI_DownloadError
description: Learn how to fix AI_DownloadError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-download-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-download-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "e82664f8660855725d411969e320e11cd4a37e52bd6cc3c0144a9c733b204fa6"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when a download fails.

## Properties

- `url`: The URL that failed to download
- `statusCode`: The HTTP status code returned by the server (optional)
- `statusText`: The HTTP status text returned by the server (optional)
- `cause`: The underlying error that caused the download to fail (optional)
- `message`: The error message containing details about the download failure (optional, auto-generated)

## Checking for this Error

You can check if an error is an instance of `AI_DownloadError` using:

```typescript
import { DownloadError } from 'ai';

if (DownloadError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)