---
title: getAIState
description: Reference for the getAIState function from the AI SDK RSC
url: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/get-ai-state"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/get-ai-state.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "a5e6475ccdf092be6e091c8aef8e46cafd71dd98813f55381909fb7d3f709efe"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

AI SDK RSC is currently experimental. We recommend using [AI SDK
UI](/docs/ai-sdk-ui/overview) for production. For guidance on migrating from
RSC to UI, see our [migration guide](/docs/ai-sdk-rsc/migrating-to-ui).

Get the current AI state.

## Import

```
import { getAIState } from "@ai-sdk/rsc"
```

## API Signature

### Parameters

- `key?` (`string`): Returns the value of the specified key in the AI state, if it's an object.

### Returns

The AI state.

## Examples

- [Learn to render a React component during a tool call made by a language model in Next.js](/examples/next-app/tools/render-interface-during-tool-call)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)