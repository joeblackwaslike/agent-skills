---
title: useChat Failed to Parse Stream
description: Troubleshooting errors related to the Use Chat Failed to Parse Stream error.
url: "https://ai-sdk.dev/docs/troubleshooting/use-chat-failed-to-parse-stream"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/use-chat-failed-to-parse-stream.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "ec1f3f0cfa8d5ecd2b1d59b5327916b0f04f9b39d6fbc99353b39d83870a6fcb"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

I am using [`useChat`](/docs/reference/ai-sdk-ui/use-chat) or [`useCompletion`](/docs/reference/ai-sdk-ui/use-completion), and I am getting a `"Failed to parse stream string. Invalid code"` error. I am using version `3.0.20` or newer of the AI SDK.

## Background

The AI SDK has switched to the stream data protocol in version `3.0.20`.
[`useChat`](/docs/reference/ai-sdk-ui/use-chat) and [`useCompletion`](/docs/reference/ai-sdk-ui/use-completion) expect stream parts that support data, tool calls, etc.
What you see is a failure to parse the stream.
This can be caused by using an older version of the AI SDK in the backend, by providing a text stream using a custom provider, or by using a raw LangChain stream result.

## Solution

You can switch [`useChat`](/docs/reference/ai-sdk-ui/use-chat) and [`useCompletion`](/docs/reference/ai-sdk-ui/use-completion) to raw text stream processing with the [`streamProtocol`](/docs/reference/ai-sdk-ui/use-completion#stream-protocol) parameter.
Set it to `text` as follows:

```tsx
const { messages, append } = useChat({ streamProtocol: 'text' });
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)