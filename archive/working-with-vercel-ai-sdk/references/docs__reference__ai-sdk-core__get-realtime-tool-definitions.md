---
title: experimental_getRealtimeToolDefinitions
description: API reference for experimental_getRealtimeToolDefinitions.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/get-realtime-tool-definitions"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/get-realtime-tool-definitions.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "c88392e6f39f77f9153273f5f7c850e8d7e0a887f00d7da12995fc63120ea3f5"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

`experimental_getRealtimeToolDefinitions` is part of the experimental realtime
API.

Converts an AI SDK `ToolSet` into provider-neutral realtime tool definitions
that can be passed to a realtime session setup request.

Use it in the server-side setup endpoint that creates a short-lived realtime
provider token.

```ts
import { openai } from '@ai-sdk/openai';
import { experimental_getRealtimeToolDefinitions, tool } from 'ai';
import { z } from 'zod';

const tools = {
  getWeather: tool({
    description: 'Get the current weather for a city',
    inputSchema: z.object({
      city: z.string(),
    }),
  }),
};

const toolDefinitions = await experimental_getRealtimeToolDefinitions({
  tools,
});

const token = await openai.experimental_realtime.getToken({
  model: 'gpt-realtime',
  sessionConfig: {
    tools: toolDefinitions,
  },
});
```

## Import

```
import { experimental_getRealtimeToolDefinitions } from "ai"
```

## API Signature

### Parameters

- `options` (`Object`): The options for converting tools.
  - `Object`
    - `tools` (`ToolSet`): The AI SDK tools to expose to the realtime model. Function and dynamic tools are converted to realtime function definitions. Provider tools are skipped.
    - `toolsContext?` (`InferToolSetContext<TOOLS>`): Per-tool context used when resolving dynamic tool descriptions.

### Returns

A `Promise<Experimental_RealtimeToolDefinition[]>`.

Each returned definition contains:

- `type` (`'function'`): The realtime tool definition type.
- `name` (`string`): The tool name from the input ToolSet.
- `description` (`string | undefined`): The tool description sent to the realtime model.
- `parameters` (`JSONSchema7`): The JSON schema converted from the tool inputSchema. The realtime model uses this schema to generate tool call arguments.

## Notes

- Tool execution is not handled by `experimental_getRealtimeToolDefinitions`. Use
  [`experimental_useRealtime`](/docs/reference/ai-sdk-ui/use-realtime)
  `onToolCall` and `addToolOutput` to execute tools and return results.
- Provider tools are skipped because realtime providers expect regular function
  definitions in the session config.
- Dynamic tool descriptions are resolved with the matching value from
  `toolsContext` before the definitions are returned.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)