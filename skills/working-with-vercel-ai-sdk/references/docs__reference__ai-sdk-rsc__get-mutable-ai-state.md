---
title: getMutableAIState
description: Reference for the getMutableAIState function from the AI SDK RSC
url: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/get-mutable-ai-state"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/get-mutable-ai-state.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "37404e7b0030aa7cfa1d92bd041680106743c7f1703433f95aebb1239c382882"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

AI SDK RSC is currently experimental. We recommend using [AI SDK
UI](/docs/ai-sdk-ui/overview) for production. For guidance on migrating from
RSC to UI, see our [migration guide](/docs/ai-sdk-rsc/migrating-to-ui).

Get a mutable copy of the AI state. You can use this to update the state in the server.

## Import

```
import { getMutableAIState } from "@ai-sdk/rsc"
```

## API Signature

### Parameters

- `key?` (`string`): Returns the value of the specified key in the AI state, if it's an object.

### Returns

The mutable AI state.

### Methods

- `update` (`(newState: any) => void`): Updates the AI state with the new state.
- `done` (`(newState: any) => void`): Updates the AI state with the new state, marks it as finalized and closes the stream.

## Examples

- [Learn to persist and restore states AI and UI states in Next.js](/examples/next-app/state-management/save-and-restore-states)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)