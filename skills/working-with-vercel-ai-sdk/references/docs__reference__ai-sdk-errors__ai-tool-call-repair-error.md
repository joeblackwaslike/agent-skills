---
title: ToolCallRepairError
description: Learn how to fix AI SDK ToolCallRepairError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-tool-call-repair-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-tool-call-repair-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "885623d1a40be21881d9db0606177f593e3597173c23716a14c2a6f4b281f03a"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when there is a failure while attempting to repair an invalid tool call.
This typically happens when the AI attempts to fix either
a `NoSuchToolError` or `InvalidToolInputError`.

## Properties

- `originalError`: The original error that triggered the repair attempt (either `NoSuchToolError` or `InvalidToolInputError`)
- `message`: The error message
- `cause`: The underlying error that caused the repair to fail

## Checking for this Error

You can check if an error is an instance of `ToolCallRepairError` using:

```typescript
import { ToolCallRepairError } from 'ai';

if (ToolCallRepairError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)