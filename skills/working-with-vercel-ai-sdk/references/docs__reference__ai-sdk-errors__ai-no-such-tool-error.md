---
title: AI_NoSuchToolError
description: Learn how to fix AI_NoSuchToolError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-such-tool-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-such-tool-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "0a74ec87515bba811291cb9ca0c38f57223c6675f07e0d81abee1997b5e840e6"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when a model tries to call an unavailable tool.

## Properties

- `toolName`: The name of the tool that was not found
- `availableTools`: Array of available tool names (optional)
- `message`: The error message (optional, auto-generated from `toolName` and `availableTools`)

## Checking for this Error

You can check if an error is an instance of `AI_NoSuchToolError` using:

```typescript
import { NoSuchToolError } from 'ai';

if (NoSuchToolError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)