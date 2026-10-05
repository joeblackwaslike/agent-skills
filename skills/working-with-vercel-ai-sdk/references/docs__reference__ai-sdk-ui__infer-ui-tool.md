---
title: InferUITool
description: API Reference for InferUITool.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/infer-ui-tool"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/infer-ui-tool.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "bfd5e57b8e32bae9141df9ec31058f08424f590987806487430ff587de198568"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Infers the input and output types of a tool.

This type helper is useful when working with individual tools to ensure type safety for your tool inputs and outputs in `UIMessage`s.

## Import

```tsx
import { InferUITool } from 'ai';
```

## API Signature

### Type Parameters

- `TOOL` (`Tool`): The tool to infer types from.

### Returns

A type that contains the inferred input and output types of the tool.

The resulting type has the shape:

```typescript
{
  input: InferToolInput<TOOL>;
  output: InferToolOutput<TOOL>;
}
```

## Examples

### Basic Usage

```tsx
import { InferUITool } from 'ai';
import { z } from 'zod';

const weatherTool = {
  description: 'Get the current weather',
  inputSchema: z.object({
    location: z.string().describe('The city and state'),
  }),
  execute: async ({ location }) => {
    return `The weather in ${location} is sunny.`;
  },
};

// Infer the types from the tool
type WeatherUITool = InferUITool<typeof weatherTool>;
// This creates a type with:
// {
//   input: { location: string };
//   output: string;
// }
```

## Related

- [`InferUITools`](/docs/reference/ai-sdk-ui/infer-ui-tools) - Infer types for a tool set
- [`ToolUIPart`](/docs/reference/ai-sdk-core/ui-message#tooluipart) - Tool part type for UI messages

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)