---
title: useCompletion
description: API reference for the useCompletion hook.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-completion"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-completion.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "5c9f445c5c541cd3d55c58643256e8af9b83ad462562f34578f224c7f220ae84"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Allows you to create text completion based capabilities for your application. It enables the streaming of text completions from your AI provider, manages the state for chat input, and updates the UI automatically as new messages are received.

## Import

#### React

```
import { useCompletion } from '@ai-sdk/react'
```

#### Svelte

```
import { Completion } from '@ai-sdk/svelte'
```

#### Vue

```
import { useCompletion } from '@ai-sdk/vue'
```

#### Angular

```
import { Completion } from '@ai-sdk/angular'
```

## API Signature

### Type Parameters

- `BODY` (`object`): The type of the additional request body passed through the hook options or the complete function. Defaults to object.

### Parameters

- `api` (`string = '/api/completion'`): The API endpoint that is called to generate text. It can be a relative path (starting with \`/\`) or an absolute URL.
- `id` (`string`): A unique identifier for the completion. If not provided, a random one will be generated. When provided, the \`useCompletion\` hook with the same \`id\` will have shared states across components. This is useful when you have multiple components showing the same chat stream
- `initialInput` (`string`): An optional string for the initial prompt input.
- `initialCompletion` (`string`): An optional string for the initial completion result.
- `onFinish` (`(prompt: string, completion: string) => void`): An optional callback function that is called when the completion stream ends.
- `onError` (`(error: Error) => void`): An optional callback that will be called when the chat stream encounters an error.
- `headers` (`Record<string, string> | Headers`): An optional object of headers to be passed to the API endpoint.
- `body` (`BODY`): An optional, additional body object to be passed to the API endpoint.
- `credentials` (`'omit' | 'same-origin' | 'include'`): An optional literal that sets the mode of credentials to be used on the request. Defaults to same-origin.
- `streamProtocol?` (`'text' | 'data'`): An optional literal that sets the type of stream to be used. Defaults to \`data\`. If set to \`text\`, the stream will be treated as a text stream. Note that with either protocol, \`useCompletion\` only exposes text content via the \`completion\` field — non-text parts (e.g. \`data-\*\` parts) emitted by the server are ignored. Use \`useChat\` if you need access to those parts.
- `fetch?` (`FetchFunction`): Optional. A custom fetch function to be used for the API call. Defaults to the global fetch function.
- `throttle?` (`number`): React only. Custom throttle wait time in milliseconds for the completion and data updates. When specified, throttles how often the UI updates during streaming. Default is undefined, which disables throttling.

### Returns

- `completion` (`string`): The current text completion.
- `complete` (`(prompt: string, options?: { headers?: Record<string, string> | Headers, body?: BODY }) => Promise<string | null | undefined>`): Function to execute text completion based on the provided prompt. Returns the completion result when finished.
- `error` (`undefined | Error`): The error thrown during the completion process, if any.
- `setCompletion` (`(completion: string) => void`): Function to update the \`completion\` state.
- `stop` (`() => void`): Function to abort the current API request.
- `input` (`string`): The current value of the input field.
- `setInput` (`React.Dispatch<React.SetStateAction<string>>`): Function to update the input value.
- `handleInputChange` (`(event: any) => void`): Handler for the \`onChange\` event of the input field to control the input's value.
- `handleSubmit` (`(event?: { preventDefault?: () => void }) => void`): Form submission handler that automatically resets the input field and appends a user message.
- `isLoading` (`boolean`): Boolean flag indicating whether a fetch operation is currently in progress.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)