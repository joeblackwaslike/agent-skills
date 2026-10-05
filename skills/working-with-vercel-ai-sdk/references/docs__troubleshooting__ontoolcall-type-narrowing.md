---
title: Type Error with onToolCall
description: How to handle TypeScript type errors when using the onToolCall callback
url: "https://ai-sdk.dev/docs/troubleshooting/ontoolcall-type-narrowing"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/ontoolcall-type-narrowing.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "696a9fe99f9e002f1b1dd8e768a74fb9cb4364e3bb018f6e8bcdb028e10231e4"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

When using the `onToolCall` callback with TypeScript, you may encounter type errors when trying to pass tool properties directly to `addToolOutput`.

## Problem

TypeScript cannot automatically narrow the type of `toolCall.toolName` when you have both static and dynamic tools, leading to type errors:

```tsx
// ❌ This causes a TypeScript error
const { messages, sendMessage, addToolOutput } = useChat({
  async onToolCall({ toolCall }) {
    addToolOutput({
      tool: toolCall.toolName, // Type 'string' is not assignable to type '"yourTool" | "yourOtherTool"'
      toolCallId: toolCall.toolCallId,
      output: someOutput,
    });
  },
});
```

The error occurs because:

- Static tools have specific literal types for their names (e.g., `"getWeatherInformation"`)
- Dynamic tools have `toolName` as a generic `string`
- TypeScript can't guarantee that `toolCall.toolName` matches your specific tool names

## Solution

Check if the tool is dynamic first to enable proper type narrowing:

```tsx
// ✅ Correct approach with type narrowing
const { messages, sendMessage, addToolOutput } = useChat({
  async onToolCall({ toolCall }) {
    // Check if it's a dynamic tool first
    if (toolCall.dynamic) {
      return;
    }

    // Now TypeScript knows this is a static tool with the correct type
    addToolOutput({
      tool: toolCall.toolName, // No type error!
      toolCallId: toolCall.toolCallId,
      output: someOutput,
    });
  },
});
```

If you're still using the deprecated `addToolResult` method, this solution
applies the same way. Consider migrating to `addToolOutput` for consistency
with the latest API.

## Related

- [Chatbot Tool Usage](/docs/ai-sdk-ui/chatbot-tool-usage)
- [Dynamic Tools](/docs/reference/ai-sdk-core/dynamic-tool)
- [useChat Reference](/docs/reference/ai-sdk-ui/use-chat)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)