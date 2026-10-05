---
title: useAIState
description: Reference for the useAIState function from the AI SDK RSC
url: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/use-ai-state"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/use-ai-state.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "b42dc2ee03558ac97746f992f27e2d98dcbb0f93b5da4ba54478d999b4ad57d4"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

AI SDK RSC is currently experimental. We recommend using [AI SDK
UI](/docs/ai-sdk-ui/overview) for production. For guidance on migrating from
RSC to UI, see our [migration guide](/docs/ai-sdk-rsc/migrating-to-ui).

It is a hook that enables you to read and update the AI state. The AI state is shared globally between all `useAIState` hooks under the same `<AI/>` provider.

The AI state is intended to contain context and information shared with the AI model, such as system messages, function responses, and other relevant data.

## Import

```
import { useAIState } from "@ai-sdk/rsc"
```

## API Signature

### Returns

Similar to useState, it is an array where the first element is the current AI state and the second element is a function to update the state.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)