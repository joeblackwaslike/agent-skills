---
title: AI SDK UI
description: Reference documentation for the AI SDK UI
url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-ui.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "3e8607a807f98e07a3cadc8d6e6514f2db112e1d0ddf451f8947fa43df6e04ac"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[AI SDK UI](/docs/ai-sdk-ui) is designed to help you build interactive chat, completion, and assistant applications with ease.
It is a framework-agnostic toolkit, streamlining the integration of advanced AI functionalities into your applications.

AI SDK UI contains the following hooks:

#### [useChat](/docs/reference/ai-sdk-ui/use-chat)

Use a hook to interact with language models in a chat interface.

#### [useCompletion](/docs/reference/ai-sdk-ui/use-completion)

Use a hook to interact with language models in a completion interface.

#### [useObject](/docs/reference/ai-sdk-ui/use-object)

Use a hook for consuming a streamed JSON objects.

#### [experimental\_useRealtime](/docs/reference/ai-sdk-ui/use-realtime)

Use a hook to build realtime voice conversations.

#### [convertToModelMessages](/docs/reference/ai-sdk-ui/convert-to-model-messages)

Convert useChat messages to ModelMessages for AI functions.

#### [pruneMessages](/docs/reference/ai-sdk-ui/prune-messages)

Prunes model messages from a list of model messages.

#### [createUIMessageStream](/docs/reference/ai-sdk-ui/create-ui-message-stream)

Create a UI message stream to stream additional data to the client.

#### [createUIMessageStreamResponse](/docs/reference/ai-sdk-ui/create-ui-message-stream-response)

Create a response object to stream UI messages to the client.

#### [pipeUIMessageStreamToResponse](/docs/reference/ai-sdk-ui/pipe-ui-message-stream-to-response)

Pipe a UI message stream to a Node.js ServerResponse object.

#### [readUIMessageStream](/docs/reference/ai-sdk-ui/read-ui-message-stream)

Transform a stream of UIMessageChunk objects into an AsyncIterableStream of UIMessage objects.

#### [WebSocketChatTransport](/docs/reference/ai-sdk-ui/websocket-chat-transport)

Send correlated chat requests and UI message streams over a persistent WebSocket connection.

#### [experimental\_MCPAppRenderer](/docs/reference/ai-sdk-ui/mcp-app-renderer)

Render interactive MCP App tool UIs in React.

## UI Framework Support

AI SDK UI supports the following frameworks: [React](https://react.dev/), [Svelte](https://svelte.dev/), [Vue.js](https://vuejs.org/),
[Angular](https://angular.dev/), and [SolidJS](https://www.solidjs.com/).

Here is a comparison of the supported functions across these frameworks:

|                                                                 | [useChat](/docs/reference/ai-sdk-ui/use-chat) | [useCompletion](/docs/reference/ai-sdk-ui/use-completion) | [useObject](/docs/reference/ai-sdk-ui/use-object) | [MCP Apps](/docs/ai-sdk-core/mcp-apps) |
| --------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------- | -------------------------------------- |
| React `@ai-sdk/react`                                           | ✓                                             | ✓                                                         | ✓                                                 | ✓                                      |
| Vue.js `@ai-sdk/vue`                                            | ✓ Chat                                        | ✓                                                         | ✓                                                 | ✗                                      |
| Svelte `@ai-sdk/svelte`                                         | ✓ Chat                                        | ✓ Completion                                              | ✓ StructuredObject                                | ✗                                      |
| Angular `@ai-sdk/angular`                                       | ✓ Chat                                        | ✓ Completion                                              | ✓ StructuredObject                                | ✗                                      |
| [SolidJS](https://github.com/kodehort/ai-sdk-solid) (community) | ✓                                             | ✓                                                         | ✓                                                 | ✗                                      |

[Contributions](https://github.com/vercel/ai/blob/main/CONTRIBUTING.md) are
welcome to implement missing features for non-React frameworks.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)