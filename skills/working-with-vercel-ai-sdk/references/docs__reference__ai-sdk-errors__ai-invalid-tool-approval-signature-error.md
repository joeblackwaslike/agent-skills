---
title: AI_InvalidToolApprovalSignatureError
description: Learn how to fix AI_InvalidToolApprovalSignatureError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-tool-approval-signature-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-invalid-tool-approval-signature-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "c2814a2f49f56841afe03ecc00776d04e92847ec5766e433e927449c773aa918"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when `experimental_toolApprovalSecret` is configured and a tool approval replayed from the message history has a missing or invalid HMAC signature. The server rejects the approval before the tool executes.

Common causes:

- The approval was fabricated by the client (no signature present)
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