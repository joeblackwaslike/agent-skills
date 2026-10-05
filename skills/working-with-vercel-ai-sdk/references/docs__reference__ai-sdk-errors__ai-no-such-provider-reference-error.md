---
title: AI_NoSuchProviderReferenceError
description: Learn how to fix AI_NoSuchProviderReferenceError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-such-provider-reference-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-such-provider-reference-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "2383baea8bc61909992c1bc3ffc1317d54a2631ecc4236981b4f74a4d4d57d70"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when a provider reference cannot be resolved because the
specified provider is not found in the provider reference mapping.

## Properties

- `provider`: The provider that was not found
- `reference`: The full provider reference mapping that was searched
- `message`: The error message

## Checking for this Error

You can check if an error is an instance of `AI_NoSuchProviderReferenceError` using:

```typescript
import { NoSuchProviderReferenceError } from 'ai';

if (NoSuchProviderReferenceError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)