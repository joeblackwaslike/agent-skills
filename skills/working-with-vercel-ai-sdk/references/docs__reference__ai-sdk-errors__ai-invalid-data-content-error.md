---
title: AI_InvalidDataContentError
description: How to fix AI_InvalidDataContentError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-data-content-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-data-content-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "43f46b71a119807927855465e093f00c78c3d44a2af32018c4c97f43bc8c38e0"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when the data content provided in a multi-modal message part is invalid. Check out the [ prompt examples for multi-modal messages ](/docs/foundations/prompts#message-prompts).

## Properties

- `content`: The invalid content value
- `cause`: The underlying error that caused this error (optional)
- `message`: The error message describing the expected and received content types (optional, auto-generated)

## Checking for this Error

You can check if an error is an instance of `AI_InvalidDataContentError` using:

```typescript
import { InvalidDataContentError } from 'ai';

if (InvalidDataContentError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)