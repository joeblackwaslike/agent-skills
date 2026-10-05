---
title: ToolChoiceViolationError
description: Learn how to fix AI SDK ToolChoiceViolationError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-tool-choice-violation-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-tool-choice-violation-error.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "35a428ea4ff46f2b65bdba29a70d7d2862ab019eb0f941c07baf9352007a3ef3"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when a `generateText` response does not satisfy an enforced
tool choice. It is thrown when `toolChoice` is set to `'required'` but the
response contains no structured tool call, or when a specifically selected tool
was not called.

The error does not automatically interpret text or reasoning as an executable
tool call. You can inspect `content` to implement opt-in recovery, including
schema validation before executing any recovered call.

## Properties

- `toolChoice`: The effective tool choice that the response did not satisfy
- `finishReason`: The reason why the model finished generating the response
- `provider`: The provider that returned the response
- `modelId`: The model that returned the response
- `content`: The normalized content returned by the model
- `message`: The error message

## Checking for this Error

You can check if an error is an instance of `ToolChoiceViolationError` using:

```typescript
import { ToolChoiceViolationError } from 'ai';

if (ToolChoiceViolationError.isInstance(error)) {
  const serializedCall = error.content.find(part => part.type === 'text')?.text;

  // Parse and validate serializedCall before treating it as a tool call.
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)