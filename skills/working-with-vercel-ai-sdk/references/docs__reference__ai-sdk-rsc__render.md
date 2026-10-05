---
title: render (Removed)
description: Reference for the render function from the AI SDK RSC
url: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/render"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/render.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "8bbd26aefa4985c9594d5d9e37a1c0ba418bcd9903cae233f931cd908988de1a"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

"render" has been removed in AI SDK 4.0.

AI SDK RSC is currently experimental. We recommend using [AI SDK
UI](/docs/ai-sdk-ui/overview) for production. For guidance on migrating from
RSC to UI, see our [migration guide](/docs/ai-sdk-rsc/migrating-to-ui).

A helper function to create a streamable UI from LLM providers. This function is similar to AI SDK Core APIs and supports the same model interfaces.

> **Note**: `render` has been deprecated in favor of [`streamUI`](/docs/reference/ai-sdk-rsc/stream-ui). During migration, please ensure that the `messages` parameter follows the updated [specification](/docs/reference/ai-sdk-rsc/stream-ui#messages).

## Import (No longer available)

The following import will no longer work since `render` has been removed:

```
import { render } from "@ai-sdk/rsc"
```

Use [`streamUI`](/docs/reference/ai-sdk-rsc/stream-ui) instead.

## API Signature

### Parameters

- `model` (`string`): Model identifier, must be OpenAI SDK compatible.
- `provider` (`provider client`): Currently the only provider available is OpenAI. This needs to match the model name.
- `initial?` (`ReactNode`): The initial UI to render.
- `messages` (`Array<SystemMessage | UserMessage | AssistantMessage | ToolMessage>`): A list of messages that represent a conversation.
  - `SystemMessage`
    - `role` (`'system'`): The role for the system message.
    - `content` (`string`): The content of the message.
  - `UserMessage`
    - `role` (`'user'`): The role for the user message.
    - `content` (`string`): The content of the message.
  - `AssistantMessage`
    - `role` (`'assistant'`): The role for the assistant message.
    - `content` (`string`): The content of the message.
    - `tool_calls` (`ToolCall[]`): A list of tool calls made by the model.
      - `ToolCall`
        - `id` (`string`): The id of the tool call.
        - `type` (`'function'`): The type of the tool call.
        - `function` (`Function`): The function to call.
          - `Function`
            - `name` (`string`): The name of the function.
            - `arguments` (`string`): The arguments of the function.
  - `ToolMessage`
    - `role` (`'tool'`): The role for the tool message.
    - `content` (`string`): The content of the message.
    - `toolCallId` (`string`): The id of the tool call.
- `functions?` (`ToolSet`): Tools that are accessible to and can be called by the model.
  - `Tool`
    - `description?` (`string`): Information about the purpose of the tool including details on how and when it can be used by the model.
    - `parameters` (`zod schema`): The typed schema that describes the parameters of the tool that can also be used to validation and error handling.
    - `render?` (`async (parameters) => any`): An async function that is called with the arguments from the tool call and produces a result.
- `tools?` (`ToolSet`): Tools that are accessible to and can be called by the model.
  - `Tool`
    - `description?` (`string`): Information about the purpose of the tool including details on how and when it can be used by the model.
    - `parameters` (`zod schema`): The typed schema that describes the parameters of the tool that can also be used to validation and error handling.
    - `render?` (`async (parameters) => any`): An async function that is called with the arguments from the tool call and produces a result.
- `text?` (`(Text) => ReactNode`): Callback to handle the generated tokens from the model.
  - `Text`
    - `content` (`string`): The full content of the completion.
    - `delta` (`string`): The delta.
    - `done` (`boolean`): Is it done?
- `temperature?` (`number`): The temperature to use for the model.

### Returns

It can return any valid ReactNode.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)