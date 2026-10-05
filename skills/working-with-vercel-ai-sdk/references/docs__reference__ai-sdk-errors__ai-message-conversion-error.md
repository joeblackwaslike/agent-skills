---
title: AI_MessageConversionError
description: Learn how to fix AI_MessageConversionError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-message-conversion-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-message-conversion-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "2b7c3e21ec624ec4cadb5603a24281c32dabb0b4ae16ab72fcb559388d7b9e6c"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when message conversion fails.

## Properties

- `originalMessage`: The original message that failed conversion
- `message`: The error message

## Checking for this Error

You can check if an error is an instance of `AI_MessageConversionError` using:

```typescript
import { MessageConversionError } from 'ai';

if (MessageConversionError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)