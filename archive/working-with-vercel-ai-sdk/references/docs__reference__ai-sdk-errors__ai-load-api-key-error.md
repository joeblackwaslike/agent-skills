---
title: AI_LoadAPIKeyError
description: Learn how to fix AI_LoadAPIKeyError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-load-api-key-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-load-api-key-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "b5b359e4ee1d4753d52ef0dd07aa42a535d7466fc5998e981d4b76468f937ade"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when API key is not loaded successfully.

## Properties

- `message`: The error message

## Checking for this Error

You can check if an error is an instance of `AI_LoadAPIKeyError` using:

```typescript
import { LoadAPIKeyError } from 'ai';

if (LoadAPIKeyError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)