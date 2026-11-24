---
title: AI_ToolCallNotFoundForApprovalError
description: Learn how to fix AI_ToolCallNotFoundForApprovalError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-tool-call-not-found-for-approval-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-tool-call-not-found-for-approval-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "5ae0ab3a4b759af43ab57f4e3ff552a7bf7a15582f7bf913660b5b3937de22c4"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when a tool approval request references a tool call that was not found. This can happen when processing provider-emitted approval requests (e.g., MCP flows) where the referenced tool call ID does not exist.

## Properties

- `toolCallId`: The tool call ID that was not found
- `approvalId`: The approval request ID

## Checking for this Error

You can check if an error is an instance of `AI_ToolCallNotFoundForApprovalError` using:

```typescript
import { ToolCallNotFoundForApprovalError } from 'ai';

if (ToolCallNotFoundForApprovalError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)