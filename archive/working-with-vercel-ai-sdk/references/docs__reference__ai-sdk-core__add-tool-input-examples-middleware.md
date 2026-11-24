---
title: addToolInputExamplesMiddleware
description: Middleware that appends tool input examples to tool descriptions.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/add-tool-input-examples-middleware"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/add-tool-input-examples-middleware.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "57ecf1b4b04d902289cd0d81327bf4581814c51f32d93d9905a1a7509361594e"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

`addToolInputExamplesMiddleware` is a middleware function that appends input examples to tool descriptions. This is especially useful for language model providers that **do not natively support the `inputExamples` property**—the middleware serializes and injects the examples into the tool's `description` so models can learn from them.

## Import

```
import { addToolInputExamplesMiddleware } from "ai"
```

## API

### Signature

```ts
function addToolInputExamplesMiddleware(options?: {
  prefix?: string;
  format?: (example: { input: JSONObject }, index: number) => string;
  remove?: boolean;
}): LanguageModelMiddleware;
```

### Parameters

- `prefix?` (`string`): A prefix prepended before the input examples section. Defaults to \`'Input Examples:'\`.
- `format?` (`(example: { input: JSONObject }, index: number) => string`): Optional custom formatter for each example. Receives the example object and its index. Default: JSON.stringify(example.input).
- `remove?` (`boolean`): Whether to remove the \`inputExamples\` property from the tool after adding them to the description. Default: true.

### Returns

A [LanguageModelMiddleware](/docs/ai-sdk-core/middleware) that:

- Locates function tools with an `inputExamples` property.
- Serializes each input example (by default as JSON, or using your custom formatter).
- Appends a section at the end of the tool description containing all formatted examples, prefixed by the `prefix`.
- Removes the `inputExamples` property from the tool (unless `remove: false`).
- Passes through all other tools (including those without examples) unchanged.

## Usage Example

```ts
import {
  generateText,
  tool,
  wrapLanguageModel,
  addToolInputExamplesMiddleware,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const model = wrapLanguageModel({
  model: "anthropic/claude-sonnet-5.5",
  middleware: addToolInputExamplesMiddleware({
    prefix: 'Input Examples:',
    format: (example, index) =>
      `${index + 1}. ${JSON.stringify(example.input)}`,
  }),
});

const result = await generateText({
  model,
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({ location: z.string() }),
      inputExamples: [
        { input: { location: 'San Francisco' } },
        { input: { location: 'London' } },
      ],
    }),
  },
  prompt: 'What is the weather in Tokyo?',
});
```

## How It Works

1. For every function tool that defines `inputExamples`, the middleware:
   - Formats each example with the `format` function (default: JSON.stringify).

   - Builds a section like:

     ```
     Input Examples:
     {"location":"San Francisco"}
     {"location":"London"}
     ```

   - Appends this section to the end of the tool's `description`.

2. By default, it removes the `inputExamples` property after appending to prevent duplication (can be disabled with `remove: false`).

3. Tools without input examples or non-function tools are left unmodified.

> **Tip:** This middleware is especially useful with providers such as OpenAI or Anthropic, where native support for `inputExamples` is not available.

## Example effect

If your original tool definition is:

```ts
{
  type: 'function',
  name: 'weather',
  description: 'Get the weather in a location',
  inputSchema: { ... },
  inputExamples: [
    { input: { location: 'San Francisco' } },
    { input: { location: 'London' } }
  ]
}
```

After applying the middleware (with default settings), the tool passed to the model will look like:

```ts
{
  type: 'function',
  name: 'weather',
  description: `Get the weather in a location

Input Examples:
{"location":"San Francisco"}
{"location":"London"}`,
  inputSchema: { ... }
  // inputExamples is removed by default
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)