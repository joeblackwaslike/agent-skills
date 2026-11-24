---
title: ToolChoiceViolationError
description: Learn how to fix AI SDK ToolChoiceViolationError
url: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-tool-choice-violation-error"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-tool-choice-violation-error.md"
fetched_at: "2026-10-26T09:52:56.075Z"
sha256: "a73129ee367d6b60fdc2f02cf1a973e09aa2d34d49d2b601fbf70776709229ad"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This error occurs when a `generateText` or `streamText` response does not satisfy
an enforced tool choice. It is thrown when `toolChoice` is set to `'none'` but
the response contains a tool call, when `'required'` produces no structured tool
call, or when a specifically selected tool was not called. With `streamText`,
the error is emitted in the stream. Tool calls returned while `'none'` is selected
are not executed.

The error does not automatically interpret text or reasoning as an executable
tool call. When tool calls are allowed, you can inspect `content` to implement
opt-in recovery, including schema validation before executing any recovered call.

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

if (
  ToolChoiceViolationError.isInstance(error) &&
  error.toolChoice.type !== 'none'
) {
  const serializedCall = error.content.find(part => part.type === 'text')?.text;

  // Parse and validate serializedCall before treating it as a tool call.
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)