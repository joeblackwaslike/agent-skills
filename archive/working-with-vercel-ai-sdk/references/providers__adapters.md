---
title: Adapters
description: Learn how to use AI SDK Adapters.
url: "https://ai-sdk.dev/providers/adapters"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/adapters.md"
fetched_at: "2026-11-23T14:15:54.730Z"
sha256: "93b03be8aefe4d5f5eaa8116c095fa4ea8e7fb7969142d2f20d5186c12d53fd7"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Adapters are lightweight integrations that enable you to use
the AI SDK UI functions (`useChat` and `useCompletion`)
with 3rd party libraries.

The following adapters are currently available:

- [LangChain](/providers/adapters/langchain)
- [LlamaIndex](/providers/adapters/llamaindex)

## Community Adapters

These adapters are built and maintained by the community:

- [Mastra](https://mastra.ai/integrations/agentic-ui/ai-sdk-ui) - The `@mastra/ai-sdk` package streams [Mastra](https://mastra.ai/) agents, workflows, and agent networks in the AI SDK UI message stream format, so you can use them with `useChat` and other AI SDK UI hooks.
- [assistant-ui](https://www.assistant-ui.com/docs/runtimes/ai-sdk/v7) - The `@assistant-ui/ai-sdk` package connects AI SDK chats to [assistant-ui](https://www.assistant-ui.com/) chat components, with support for frontend tools, attachments, and multi-step agents.
- [ai-effect](https://ai-effect.fdarian.com/) - Wraps AI SDK functions such as `generateText`, `streamText`, `tool`, and `ToolLoopAgent` so they return [Effect](https://effect.website/) values, with typed errors, Effect-based callbacks, UI message streams, and tracing.

Do you have an open source adapter that integrates the AI SDK with another
library? Please [file a pull request](https://github.com/vercel/ai/pulls) to
add it to this list.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)