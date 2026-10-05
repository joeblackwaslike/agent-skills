---
title: useUIState
description: Reference for the useUIState function from the AI SDK RSC
url: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/use-ui-state"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/use-ui-state.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "e7b9eff448a6de55d33b93796a171bfd4ae3f6b7ecd3899cb5e1c3af030dd9e7"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

AI SDK RSC is currently experimental. We recommend using [AI SDK
UI](/docs/ai-sdk-ui/overview) for production. For guidance on migrating from
RSC to UI, see our [migration guide](/docs/ai-sdk-rsc/migrating-to-ui).

It is a hook that enables you to read and update the UI State. The state is client-side and can contain functions, React nodes, and other data. UIState is the visual representation of the AI state.

## Import

```
import { useUIState } from "@ai-sdk/rsc"
```

## API Signature

### Returns

Similar to useState, it is an array, where the first element is the current UI state and the second element is the function that updates the state.

## Examples

- [Learn to manage AI and UI states in Next.js](/examples/next-app/state-management/ai-ui-states)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)