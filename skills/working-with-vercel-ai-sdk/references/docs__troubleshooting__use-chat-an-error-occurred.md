---
title: "useChat \"An error occurred\""
description: "Troubleshooting errors related to the \"An error occurred\" error in useChat."
url: "https://ai-sdk.dev/docs/troubleshooting/use-chat-an-error-occurred"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/use-chat-an-error-occurred.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "d76d82f63a80b14a1cbe269ca3dd1e113542022429b0c6623160d3f8c3b7c431"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

I am using [`useChat`](/docs/reference/ai-sdk-ui/use-chat) and I get the error "An error occurred".

## Background

Error messages from `streamText` are masked by default when using `toUIMessageStream` for security reasons (secure-by-default).
This prevents leaking sensitive information to the client.

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
    return error.message;
  }

  return JSON.stringify(error);
}
```

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