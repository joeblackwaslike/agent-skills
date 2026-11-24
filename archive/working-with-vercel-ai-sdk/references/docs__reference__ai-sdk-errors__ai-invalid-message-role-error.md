---
title: AI_InvalidMessageRoleError
description: Learn how to fix AI_InvalidMessageRoleError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-message-role-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-message-role-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "086503d6c0f8326e956ca0818f762b21b76904e950c3dc219b566171c510a1e1"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when an invalid message role is provided.

## Properties

- `role`: The invalid role value
- `message`: The error message (optional, auto-generated from `role`)

## Checking for this Error

You can check if an error is an instance of `AI_InvalidMessageRoleError` using:

```typescript
import { InvalidMessageRoleError } from 'ai';

if (InvalidMessageRoleError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)