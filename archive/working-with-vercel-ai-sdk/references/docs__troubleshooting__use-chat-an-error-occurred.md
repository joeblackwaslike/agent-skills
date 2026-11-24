---
title: "useChat \"An error occurred\""
description: "Troubleshooting errors related to the \"An error occurred\" error in useChat."
url: "https://ai-sdk.dev/docs/troubleshooting/use-chat-an-error-occurred"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/use-chat-an-error-occurred.md"
fetched_at: "2026-11-16T12:32:31.917Z"
sha256: "9e1de0914d90fac194500545ede96f2b213ba79079f66ee606a2cb1c83cb7c6f"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

I am using [`useChat`](/docs/reference/ai-sdk-ui/use-chat) and I get the error "An error occurred".

## Background

Error messages from `streamText` are masked by default when using `toUIMessageStream` for security reasons (secure-by-default).
This prevents leaking sensitive information to the client.

Failed tool calls are not masked by default. Their error text is sent to the client as the model received it,
unless you set `redactToolErrors` or pass your own `onError`.
See [Errors](/docs/ai-sdk-ui/chatbot-tool-usage#errors) in the tool usage guide.

## Solution

To forward error details to the client or to log errors, use the `onError` function when calling `toUIMessageStream`.

```tsx
export function errorHandler(error: unknown) {
  if (error == null) {
    return 'unknown error';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    // matches the error text that the model receives for a failed tool call
    return error.toString();
  }

  return JSON.stringify(error);
}
```

A custom `onError` also handles failed tool calls, unless you set `redactToolErrors` to `false`.
This function returns the same error text that the model receives for a failed tool call.
If the two texts differ, the stored messages no longer match what the model received.
See [Tool error text and message history](/docs/ai-sdk-ui/chatbot-tool-usage#tool-error-text-and-message-history).

```tsx
const result = streamText({
  // ...
});

return createUIMessageStreamResponse({
  stream: toUIMessageStream({
    stream: result.stream,
    onError: errorHandler,
  }),
});
```

In case you are using `createUIMessageStream`, you can pass the `onError` function to it:

```tsx
const response = createUIMessageStreamResponse({
  stream: createUIMessageStream({
    // ...
    async execute({ writer }) {
      // ...
    },
    onError: errorHandler,
  }),
});
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)