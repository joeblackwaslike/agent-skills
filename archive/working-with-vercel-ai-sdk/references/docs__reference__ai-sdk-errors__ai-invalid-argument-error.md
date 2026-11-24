---
title: AI_InvalidArgumentError
description: Learn how to fix AI_InvalidArgumentError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-argument-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-argument-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "bf8b3d83d7cafac944684869ff3d9fbe1314b9d0e458f5536b30993890bf359d"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when an invalid argument was provided.

For example, `getTextFromDataUrl` throws this error when its `dataUrl` argument
is malformed or cannot be decoded. Utility validation that is used by higher
level APIs also uses this error, so you can handle invalid arguments with one
stable error guard.

## Properties

- `parameter`: The name of the parameter that is invalid
- `value`: The invalid value
- `message`: The error message

## Checking for this Error

You can check if an error is an instance of `AI_InvalidArgumentError` using:

```typescript
import { InvalidArgumentError } from 'ai';

if (InvalidArgumentError.isInstance(error)) {
  console.error(`Invalid ${error.parameter}:`, error.message);
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)