---
title: Streaming Status Shows But No Text Appears
description: "Why useChat shows \"streaming\" status without any visible content"
url: "https://ai-sdk.dev/docs/troubleshooting/streaming-status-delay"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/streaming-status-delay.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "8543e9f9920a10f0f0849ab6fc48a2463908573528ec42456bf6fb5c81a0f191"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

When using `useChat`, the status changes to "streaming" immediately, but no text appears for several seconds.

## Background

The status changes to "streaming" as soon as the connection to the server is established and streaming begins - this includes metadata streaming, not just the LLM's generated tokens.

## Solution

Create a custom loading state that checks if the last assistant message actually contains content:

```tsx
'use client';

import { useChat } from '@ai-sdk/react';

export default function Page() {
  const { messages, status } = useChat();

  const lastMessage = messages.at(-1);

  const showLoader =
    status === 'streaming' &&
    lastMessage?.role === 'assistant' &&
    lastMessage?.parts?.length === 0;

  return (
    <>
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, index) =>
            part.type === 'text' ? <span key={index}>{part.text}</span> : null,
          )}
        </div>
      ))}

      {showLoader && <div>Loading...</div>}
    </>
  );
}
```

You can also check for specific part types if you're waiting for something specific:

```tsx
const showLoader =
  status === 'streaming' &&
  lastMessage?.role === 'assistant' &&
  !lastMessage?.parts?.some(part => part.type === 'text');
```

## Related Issues

- [GitHub Issue #7586](https://github.com/vercel/ai/issues/7586)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)