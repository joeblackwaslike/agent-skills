---
title: hasToolCall
description: API Reference for hasToolCall.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/has-tool-call"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/has-tool-call.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "95acef6b76cf06c7864d70cc3707356ef694f8ad5ccabfdb9e540d17c8a525c1"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Creates a stop condition that stops when any specified tool is called in the most recent step.

This function is used with `stopWhen` in `generateText` and `streamText` to control when a tool-calling loop should stop based on whether one of the specified tools has been invoked.

```ts
import { generateText, hasToolCall } from 'ai';

const result = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  tools: {
    weather: weatherTool,
    finalAnswer: finalAnswerTool,
  },
  // Stop when the finalAnswer tool is called
  stopWhen: hasToolCall('finalAnswer'),
});
```

## Import

```
import { hasToolCall } from "ai"
```

## API Signature

### Parameters

- `...toolNames` (`string[]`): One or more tool names. The stop condition triggers when any of them is called in the most recent step.

### Returns

A `StopCondition` function that returns `true` when any of the specified tools is called in the most recent step. The function can be used with the `stopWhen` parameter in `generateText` and `streamText`.

## Examples

### Basic Usage

Stop when a specific tool is called:

```ts
import { generateText, hasToolCall } from 'ai';

const result = await generateText({
  model: yourModel,
  tools: {
    submitAnswer: submitAnswerTool,
    search: searchTool,
  },
  stopWhen: hasToolCall('submitAnswer'),
});
```

### Match Multiple Tools

Stop when any of several tools is called in the most recent step:

```ts
import { generateText, hasToolCall } from 'ai';

const result = await generateText({
  model: yourModel,
  tools: {
    weather: weatherTool,
    search: searchTool,
    finalAnswer: finalAnswerTool,
  },
  stopWhen: hasToolCall('weather', 'finalAnswer'),
});
```

### Combining with Other Conditions

You can combine multiple stop conditions in an array:

```ts
import { generateText, hasToolCall, isStepCount } from 'ai';

const result = await generateText({
  model: yourModel,
  tools: {
    weather: weatherTool,
    search: searchTool,
    finalAnswer: finalAnswerTool,
  },
  // Stop when weather tool is called OR finalAnswer is called OR after 5 steps
  stopWhen: [
    hasToolCall('weather'),
    hasToolCall('finalAnswer'),
    isStepCount(5),
  ],
});
```

### Agent Pattern

Common pattern for agents that run until they provide a final answer:

```ts
import { generateText, hasToolCall } from 'ai';

const result = await generateText({
  model: yourModel,
  tools: {
    search: searchTool,
    calculate: calculateTool,
    finalAnswer: {
      description: 'Provide the final answer to the user',
      inputSchema: z.object({
        answer: z.string(),
      }),
      execute: async ({ answer }) => answer,
    },
  },
  stopWhen: hasToolCall('finalAnswer'),
});
```

## See also

- [`isStepCount()`](/docs/reference/ai-sdk-core/is-step-count)
- [`generateText()`](/docs/reference/ai-sdk-core/generate-text)
- [`streamText()`](/docs/reference/ai-sdk-core/stream-text)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)