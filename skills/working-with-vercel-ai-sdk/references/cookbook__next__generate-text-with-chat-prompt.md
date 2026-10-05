---
title: Generate Text with Chat Prompt
description: Learn how to generate text with chat prompt using the AI SDK and Next.js
url: "https://ai-sdk.dev/cookbook/next/generate-text-with-chat-prompt"
docs_index: /llms.txt
tags:
  - next
  - streaming
  - chat
source: "https://ai-sdk.dev/cookbook/next/generate-text-with-chat-prompt.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "af2314e702c1ba86beedc117d6cd73c33d14f58b4f75d4ae247aacdfc47e30f7"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Previously, you were able to generate text and objects using either a single message prompt, a system prompt, or a combination of both of them. However, there may be times when you want to generate text based on a series of messages.

A chat completion allows you to generate text based on a series of messages. This series of messages can be any series of interactions between any number of systems, but the most popular and relatable use case has been a series of messages that represent a conversation between a user and a model.

User: How is it going?

Assistant: All good, how may I help you?

Why is the sky blue?

## Client

Let's start by creating a simple chat interface with an input field that sends the user's message and displays the conversation history. You will call the `/api/chat` endpoint to generate the assistant's response.

```tsx title='app/page.tsx'
'use client';

import type { ModelMessage } from 'ai';
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ModelMessage[]>([]);

  return (
    <div>
      <input
        value={input}
        onChange={event => {
          setInput(event.target.value);
        }}
        onKeyDown={async event => {
          if (event.key === 'Enter') {
            setMessages(currentMessages => [
              ...currentMessages,
              { role: 'user', content: input },
            ]);

            const response = await fetch('/api/chat', {
              method: 'POST',
              body: JSON.stringify({
                messages: [...messages, { role: 'user', content: input }],
              }),
            });

            const { messages: newMessages } = await response.json();

            setMessages(currentMessages => [
              ...currentMessages,
              ...newMessages,
            ]);
          }
        }}
      />

      {messages.map((message, index) => (
        <div key={`${message.role}-${index}`}>
          {typeof message.content === 'string'
            ? message.content
            : message.content
                .filter(part => part.type === 'text')
                .map((part, partIndex) => (
                  <div key={partIndex}>{part.text}</div>
                ))}
        </div>
      ))}
    </div>
  );
}
```

## Server

Next, let's create the `/api/chat` endpoint that generates the assistant's response based on the conversation history.

```typescript title='app/api/chat/route.ts'
import { generateText, type ModelMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: ModelMessage[] } = await req.json();

  const { responseMessages } = await generateText({
    model: 'openai/gpt-6-astra',
    instructions: 'You are a helpful assistant.',
    messages,
  });

  return Response.json({ messages: responseMessages });
}
```

***

[View Example on GitHub](https://github.com/vercel/ai/blob/main/examples/next-openai-pages/pages/chat/generate-chat/index.tsx)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)