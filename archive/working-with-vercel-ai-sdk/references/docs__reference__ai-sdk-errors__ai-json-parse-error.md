---
title: AI_JSONParseError
description: Learn how to fix AI_JSONParseError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-json-parse-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-json-parse-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "afa5e9ec57f6998c7688d4dbd12bd7ce149983b6c0c90052d93b0b81c6533cce"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when JSON fails to parse.

## Properties

- `text`: The text value that could not be parsed
- `cause`: The underlying parsing error (required in constructor)

## Checking for this Error

You can check if an error is an instance of `AI_JSONParseError` using:

```typescript
import { JSONParseError } from 'ai';

if (JSONParseError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)