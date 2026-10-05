---
title: isStepCount
description: API Reference for isStepCount.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/is-step-count"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/is-step-count.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "599f2ef8ac3e0ce58eb6fa8e78ff6d8423e7736249d1c16a2aa8af0019caaa6d"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Creates a stop condition that stops when the number of completed steps equals a specified count.

This function is used with `stopWhen` in `generateText` and `streamText` to control when a tool-calling loop should stop based on the number of steps executed.

```ts
import { generateText, isStepCount } from 'ai';

const result = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  tools: {
    // your tools
  },
  // Stop after 5 steps
  stopWhen: isStepCount(5),
});
```

## Import

```
import { isStepCount } from "ai"
```

## API Signature

### Parameters

- `stepCount` (`number`): The number of completed steps that should trigger the stop condition.

### Returns

A `StopCondition` function that returns `true` when the number of completed steps equals the specified number. The function can be used with the `stopWhen` parameter in `generateText` and `streamText`.

## Examples

### Basic Usage

Stop after 3 steps:

```ts
import { generateText, isStepCount } from 'ai';

const result = await generateText({
  model: yourModel,
  tools: yourTools,
  stopWhen: isStepCount(3),
});
```

### Combining with Other Conditions

You can combine multiple stop conditions in an array:

```ts
import { generateText, isStepCount, hasToolCall } from 'ai';

const result = await generateText({
  model: yourModel,
  tools: yourTools,
  // Stop after 10 steps OR when finalAnswer tool is called
  stopWhen: [isStepCount(10), hasToolCall('finalAnswer')],
});
```

## See also

- [`hasToolCall()`](/docs/reference/ai-sdk-core/has-tool-call)
- [`generateText()`](/docs/reference/ai-sdk-core/generate-text)
- [`streamText()`](/docs/reference/ai-sdk-core/stream-text)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)