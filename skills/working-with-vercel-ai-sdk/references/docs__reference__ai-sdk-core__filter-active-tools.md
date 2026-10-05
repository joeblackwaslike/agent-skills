---
title: filterActiveTools
description: Filter a tool set to the currently active tools (API Reference)
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/filter-active-tools"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/filter-active-tools.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "2415587733e5cf5e9d82bb48311d81296814eeb6157bd8bcfebb79051aca5d83"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

`filterActiveTools`

is an experimental feature.

`filterActiveTools` filters a tool set to only the string tool names listed in `activeTools`.
If `activeTools` is `undefined`, it returns the original tool set.
If `tools` is `undefined`, it returns `undefined`.

`filterActiveTools` is useful for limiting which tools are sent to a model in a particular step.

```ts
import { experimental_filterActiveTools as filterActiveTools, tool } from 'ai';
import { z } from 'zod';

const tools = {
  weather: tool({
    description: 'Get the weather for a city',
    inputSchema: z.object({ city: z.string() }),
  }),
  time: tool({
    description: 'Get the current time for a city',
    inputSchema: z.object({ city: z.string() }),
  }),
};

const activeTools = ['weather'] as const;

const filteredTools = filterActiveTools({
  tools,
  activeTools,
});
```

## Import

```
import { experimental_filterActiveTools as filterActiveTools } from "ai"
```

## API Signature

### Parameters

- `tools` (`ToolSet | undefined`): The tool set to filter.
- `activeTools` (`ActiveTools<TOOLS>`): The names of the tools that should remain active. When omitted, all tools are returned.

### Returns

The filtered tool set, or `undefined` when `tools` is `undefined`.

When `activeTools` is provided as a literal array such as `["weather"] as const`,
TypeScript narrows the return type to only that subset of tools.

## Types

### `ActiveTools`

```ts
type ActiveTools<TOOLS extends ToolSet> =
  | ReadonlyArray<keyof TOOLS & string>
  | undefined;
```

`ActiveTools` only accepts string keys from the tool set because tool names are strings at runtime.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)