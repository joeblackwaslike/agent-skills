---
title: Call Tools in Multiple Steps
description: Learn how to call tools with multiple steps using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/call-tools-multiple-steps"
docs_index: /llms.txt
tags:
  - node
  - tool use
  - agent
source: "https://ai-sdk.dev/cookbook/node/call-tools-multiple-steps.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "f087db5e86464ff72398f4db06e7e70856dfe10f226b198a2e066c7167483c5e"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Models call tools to gather information or perform actions that are not directly available to the model.
When tool results are available, the model can use them to generate another response.

You can enable multi-step tool calls in `generateText` by defining stopping conditions with `stopWhen`.
This allows you to define the conditions for which your agent should stop when the model generates a tool call.

```ts {7}
import { generateText, tool, isStepCount } from 'ai';
import { z } from 'zod';

const { text, steps } = await generateText({
  model: 'openai/gpt-6-astra',
  stopWhen: isStepCount(5),
  tools: {
    weather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }: { location: string }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
  },
  prompt: 'What is the weather in San Francisco?',
});
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)