---
title: InferUITools
description: API Reference for InferUITools.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/infer-ui-tools"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/infer-ui-tools.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "c9a24809b50718d33cf9c28a647139c171d9bde52e6345ef2442baaed6176190"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Infers the input and output types of a `ToolSet`.

This type helper is useful when working with tools in TypeScript to ensure type safety for your tool inputs and outputs in `UIMessage`s.

## Import

```tsx
import { InferUITools } from 'ai';
```

## API Signature

### Type Parameters

- `TOOLS` (`ToolSet`): The tool set to infer types from.

### Returns

A type that maps each tool in the tool set to its inferred input and output types.

The resulting type has the shape:

```typescript
{
  [NAME in keyof TOOLS & string]: {
    input: InferToolInput<TOOLS[NAME]>;
    output: InferToolOutput<TOOLS[NAME]>;
  };
}
```

## Examples

### Basic Usage

```tsx
import { InferUITools } from 'ai';
import { z } from 'zod';

const tools = {
  weather: {
    description: 'Get the current weather',
    inputSchema: z.object({
      location: z.string().describe('The city and state'),
    }),
    execute: async ({ location }) => {
      return `The weather in ${location} is sunny.`;
    },
  },
  calculator: {
    description: 'Perform basic arithmetic',
    inputSchema: z.object({
      operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
      a: z.number(),
      b: z.number(),
    }),
    execute: async ({ operation, a, b }) => {
      switch (operation) {
        case 'add':
          return a + b;
        case 'subtract':
          return a - b;
        case 'multiply':
          return a * b;
        case 'divide':
          return a / b;
      }
    },
  },
};

// Infer the types from the tool set
type MyUITools = InferUITools<typeof tools>;
// This creates a type with:
// {
//   weather: { input: { location: string }; output: string };
//   calculator: { input: { operation: 'add' | 'subtract' | 'multiply' | 'divide'; a: number; b: number }; output: number };
// }
```

## Related

- [`InferUITool`](/docs/reference/ai-sdk-ui/infer-ui-tool) - Infer types for a single tool
- [`useChat`](/docs/reference/ai-sdk-ui/use-chat) - Chat hook that supports typed tools

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)