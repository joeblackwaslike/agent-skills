---
title: AI_InvalidToolApprovalSignatureError
description: Learn how to fix AI_InvalidToolApprovalSignatureError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-tool-approval-signature-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-tool-approval-signature-error.md"
fetched_at: "2026-11-23T14:15:54.730Z"
sha256: "ee80c16d1355cb08b35b732885455a8f9c604c6a1cc3577a3a8810c302f997c6"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when `experimental_toolApprovalSecret` is configured and a tool approval replayed from the message history has a missing or invalid HMAC signature. The server rejects the approval before the tool executes.

Common causes:

- The approval was fabricated by the client (no signature present)
- The client approved a tool call that the server denied automatically (automatic denials are not signed)
- The tool arguments were modified after the approval was signed
- The server secret changed between issuance and verification (e.g. after key rotation without overlap)

## Properties

- `approvalId`: The approval ID that failed verification
- `toolCallId`: The tool call ID the approval was for

## Checking for this Error

You can check if an error is an instance of `AI_InvalidToolApprovalSignatureError` using:

```typescript
import { InvalidToolApprovalSignatureError } from 'ai';

if (InvalidToolApprovalSignatureError.isInstance(error)) {
  // Handle the error
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)