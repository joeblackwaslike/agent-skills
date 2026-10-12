---
title: useChat
description: API reference for the useChat hook.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "52501dde21b3990795ae91586440e86ea3f8a7c41619c13288bbae6a7ab944cf"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Allows you to easily create a conversational user interface for your chatbot application. It enables the streaming of chat messages from your AI provider, manages the chat state, and updates the UI automatically as new messages are received.

The `useChat` API has been significantly updated in AI SDK 5.0. It now uses a
transport-based architecture and no longer manages input state internally. See
the [migration
guide](/docs/migration-guides/migration-guide-5-0#usechat-changes) for
details.

## Import

#### React

```
import { useChat } from '@ai-sdk/react'
```

#### Svelte

```
import { Chat } from '@ai-sdk/svelte'
```

#### Vue

```
import { useChat } from '@ai-sdk/vue'
```

#### Angular

```
import { Chat } from '@ai-sdk/angular'
```

## API Signature

### Parameters

- `chat?` (`Chat<UIMessage>`): An existing Chat instance to use. If provided, other parameters are ignored.
- `transport?` (`ChatTransport`): The transport to use for sending messages. Defaults to DefaultChatTransport with \`/api/chat\` endpoint.
  - `DefaultChatTransport`
    - `api?` (`string = '/api/chat'`): The API endpoint for chat requests.
    - `resumeStreamIsReplay?` (`boolean`): Defaults to true. Resets the interrupted response on the first resumed start chunk and rebuilds it from the replay. Set to false for endpoints that only send the remaining chunks of the same response.
    - `credentials?` (`RequestCredentials`): The credentials mode for fetch requests.
    - `headers?` (`Record<string, string> | Headers`): HTTP headers to send with requests.
    - `body?` (`object`): Extra body object to send with requests.
    - `fetch?` (`FetchFunction`): Custom fetch implementation. You can use it as a middleware to intercept requests, or to provide a custom fetch implementation for e.g. testing.
    - `prepareSendMessagesRequest?` (`PrepareSendMessagesRequest`): A function to customize the request before chat API calls.
      - `PrepareSendMessagesRequest`
        - `options` (`PrepareSendMessageRequestOptions`): Options for preparing the request
          - `PrepareSendMessageRequestOptions`
            - `id` (`string`): The chat ID
            - `messages` (`UIMessage[]`): Current messages in the chat
            - `requestMetadata` (`unknown`): The request metadata
            - `body` (`Record<string, any> | undefined`): The request body
            - `credentials` (`RequestCredentials | undefined`): The request credentials
            - `headers` (`HeadersInit | undefined`): The request headers
            - `api` (`string`): The API endpoint to use for the request. If not specified, it defaults to the transport’s API endpoint: /api/chat.
            - `trigger` (`'submit-message' | 'regenerate-message'`): The trigger for the request
            - `messageId` (`string | undefined`): The message ID if applicable
    - `prepareReconnectToStreamRequest?` (`PrepareReconnectToStreamRequest`): A function to customize the request before reconnect API call.
      - `PrepareReconnectToStreamRequest`
        - `options` (`PrepareReconnectToStreamRequestOptions`): Options for preparing the reconnect request
          - `PrepareReconnectToStreamRequestOptions`
            - `id` (`string`): The chat ID
            - `requestMetadata` (`unknown`): The request metadata
            - `body` (`Record<string, any> | undefined`): The request body
            - `credentials` (`RequestCredentials | undefined`): The request credentials
            - `headers` (`HeadersInit | undefined`): The request headers
            - `api` (`string`): The API endpoint to use for the request. If not specified, it defaults to the transport’s API endpoint combined with the chat ID: /api/chat/\{chatId}/stream.
- `id?` (`string`): A unique identifier for the chat. If not provided, a random one will be generated.
- `messages?` (`UIMessage[]`): Initial chat messages to populate the conversation with.
- `messageMetadataSchema?` (`FlexibleSchema`): Schema for validating message metadata.
- `dataPartSchemas?` (`UIDataTypesToSchemas`): Schemas for validating data parts in messages.
- `generateId?` (`IdGenerator`): A function to generate unique IDs for messages and the chat. If not provided, the default AI SDK generateId is used.
- `onToolCall?` (`({toolCall: ToolCall}) => void | Promise<void>`): Optional callback function that is invoked when a tool call is received. You must call addToolOutput to provide the tool result.
- `sendAutomaticallyWhen?` (`(options: { messages: UIMessage[] }) => boolean | PromiseLike<boolean>`): When provided, this function will be called when the stream is finished or a tool call is added to determine if the current messages should be resubmitted. You can use the lastAssistantMessageIsCompleteWithToolCalls helper for common scenarios.
- `onFinish?` (`(options: OnFinishOptions) => void`): Called when the assistant response has finished streaming.
  - `OnFinishOptions`
    - `message` (`UIMessage`): The response message.
    - `messages` (`UIMessage[]`): All messages including the response message
    - `isAbort` (`boolean`): True when the request has been aborted by the client.
    - `isDisconnect` (`boolean`): True if the server has been disconnected, e.g. because of a network error.
    - `isError` (`boolean`): True if errors during streaming caused the response to stop early.
    - `finishReason?` (`'stop' | 'length' | 'content-filter' | 'tool-calls' | 'error' | 'other'`): The reason why the model finished generating the response. Undefined if the finish reason was not provided by the model.
- `onError?` (`(error: Error) => void`): Callback function to be called when an error is encountered.
- `onData?` (`(dataPart: DataUIPart) => void`): Optional callback function that is called when a data part is received.
- `throttle?` (`number`): React and Vue only. Custom throttle wait time in milliseconds for reactive chat message updates. Positive values reduce UI update frequency without delaying stream processing or callbacks, and the latest messages are published before a ready or error status. Default is undefined, which disables throttling.
- `resume?` (`boolean`): Whether to automatically resume an ongoing chat generation stream on mount and after the page becomes visible again following a network disconnect. Defaults to false.

### Returns

- `id` (`string`): The id of the chat.
- `messages` (`UIMessage[]`): The current array of chat messages.
  - `UIMessage`
    - `id` (`string`): A unique identifier for the message.
    - `role` (`'system' | 'user' | 'assistant'`): The role of the message.
    - `parts` (`UIMessagePart[]`): The parts of the message. Use this for rendering the message in the UI.
    - `metadata?` (`unknown`): The metadata of the message.
- `status` (`'submitted' | 'streaming' | 'ready' | 'error'`): The current status of the chat: "ready" (idle), "submitted" (request sent), "streaming" (receiving response), or "error" (request failed).
- `error` (`Error | undefined`): The error object if an error occurred.
- `sendMessage` (`(message?: { text: string; files?: FileList | FileUIPart[]; metadata?; messageId?: string } | CreateUIMessage, options?: ChatRequestOptions) => Promise<void>`): Function to send a new message to the chat. This will trigger an API call to generate the assistant response. If a messageId is provided, the message will be replaced (useful for editing). When replacing with a CreateUIMessage, provide its id to assign a new ID to the replacement. If no message is provided, resubmits the current messages (useful after adding tool outputs).
  - `ChatRequestOptions`
    - `headers?` (`Record<string, string> | Headers`): Additional headers that should be to be passed to the API endpoint.
    - `body?` (`object`): Additional body JSON properties that should be sent to the API endpoint.
    - `metadata?` (`unknown`): Additional data to be sent to the API endpoint.
- `regenerate` (`(options?: { messageId?: string } & ChatRequestOptions) => Promise<void>`): Function to regenerate the last assistant message or a specific message. If no messageId is provided, regenerates the last assistant message. Accepts ChatRequestOptions for headers, body, and metadata.
- `stop` (`() => void`): Function to abort the current streaming response from the assistant.
- `clearError` (`() => void`): Clears the error state.
- `resumeStream` (`() => void`): Function to resume an interrupted streaming response. Useful when a network error occurs during streaming.
- `addToolOutput` (`(options: { tool: string; toolCallId: string; output: unknown } | { tool: string; toolCallId: string; state: "output-error", errorText: string }) => void`): Function to add a tool result to the chat. This will update the chat messages with the tool result. If sendAutomaticallyWhen is configured, it may trigger an automatic submission.
- `addToolApprovalResponse` (`(options: { id: string; approved: boolean; reason?: string }) => void | PromiseLike<void>`): Function to respond to a tool approval request. The id should match the approval id from the tool call. If sendAutomaticallyWhen is configured, it may trigger an automatic submission.
- `addToolResult` (`(options: { tool: string; toolCallId: string; output: unknown } | { tool: string; toolCallId: string; state: "output-error", errorText: string }) => void`): Deprecated. Use addToolOutput instead.
- `setMessages` (`(messages: UIMessage[] | ((messages: UIMessage[]) => UIMessage[])) => void`): Function to update the messages state locally without triggering an API call. Useful for optimistic updates.

## React rendering and shared Chat instances

In React, `messages`, `status`, and `error` describe the snapshot for the current render.
The underlying `Chat` updates as stream chunks are processed. React may batch updates,
and `throttle` can delay message rendering without delaying stream processing or callbacks.
Status and error updates include the latest messages, so a completed or failed response
is rendered with its final message snapshot.

Each `useChat({ chat })` call subscribes independently. Consumers sharing a `Chat`
can display different message snapshots when they use different throttle intervals.
A functional `setMessages` updater receives the Chat's latest messages, which may be
newer than the messages in the current render.

## Learn more

- [Chatbot](/docs/ai-sdk-ui/chatbot)
- [Chatbot with Tools](/docs/ai-sdk-ui/chatbot-tool-usage)
- [UIMessage](/docs/reference/ai-sdk-core/ui-message)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)