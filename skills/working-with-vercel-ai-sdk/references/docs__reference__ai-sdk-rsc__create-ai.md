---
title: createAI
description: Reference for the createAI function from the AI SDK RSC
url: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/create-ai"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/create-ai.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "4b0ff184f93719de16fbe49a49f6ea9dbf8beb0f8fd0d5146b8bdf339dec87ea"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

AI SDK RSC is currently experimental. We recommend using [AI SDK
UI](/docs/ai-sdk-ui/overview) for production. For guidance on migrating from
RSC to UI, see our [migration guide](/docs/ai-sdk-rsc/migrating-to-ui).

Creates a client-server context provider that can be used to wrap parts of your application tree to easily manage both UI and AI states of your application.

## Import

```
import { createAI } from "@ai-sdk/rsc"
```

## API Signature

### Parameters

- `actions` (`Record<string, Action>`): Server side actions that can be called from the client.
- `initialAIState` (`any`): Initial AI state to be used in the client.
- `initialUIState` (`any`): Initial UI state to be used in the client.
- `onGetUIState` (`() => Promise<UIState | undefined>`): is called during SSR to compare and update UI state.
- `onSetAIState` (`(Event) => void`): is triggered whenever an update() or done() is called by the mutable AI state in your action, so you can safely store your AI state in the database.
  - `Event`
    - `state` (`AIState`): The resulting AI state after the update.
    - `done` (`boolean`): Whether the AI state updates have been finalized or not.

### Returns

It returns an `<AI/>` context provider.

## Examples

- [Learn to manage AI and UI states in Next.js](/examples/next-app/state-management/ai-ui-states)
- [Learn to persist and restore states UI/AI states in Next.js](/examples/next-app/state-management/save-and-restore-states)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)