---
title: Generate Text with Chat Prompt
description: Learn how to generate text with chat prompt using the AI SDK and React Server Components.
url: "https://ai-sdk.dev/cookbook/rsc/generate-text-with-chat-prompt"
docs_index: /llms.txt
tags:
  - rsc
  - chat
source: "https://ai-sdk.dev/cookbook/rsc/generate-text-with-chat-prompt.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "982da8f10371ea747797a01188ab71cca37d99726680f51d4b1b3629a77dbcf1"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Previously, we were able to generate text and objects using either a single message prompt, a system prompt, or a combination of both of them. However, there may be times when you want to generate text based on a series of messages.

A chat completion allows you to generate text based on a series of messages. This series of messages can be any series of interactions between any number of systems, but the most popular and relatable use case has been a series of messages that represent a conversation between a user and a model.

User: How is it going?

Assistant: All good, how may I help you?

Why is the sky blue?

## Client

Let's create a simple conversation between a user and a model, and place a button that will call `continueConversation`.

```tsx title='app/page.tsx'
'use client';

import { useState } from 'react';
import { Message, continueConversation } from './actions';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  return (
    <div>
      <div>
        {conversation.map((message, index) => (
          <div key={index}>
            {message.role}: {message.content}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={input}
          onChange={event => {
            setInput(event.target.value);
          }}
        />
        <button
          onClick={async () => {
            const { messages } = await continueConversation([
              ...conversation,
              { role: 'user', content: input },
            ]);

            setConversation(messages);
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
```

## Server

Now, let's implement the `continueConversation` function that will insert the user's message into the conversation and generate a response.

```typescript title='app/actions.ts'
'use server';

import { generateText } from 'ai';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function continueConversation(history: Message[]) {
  'use server';

  const { text } = await generateText({
    model: 'openai/gpt-6-astra',
    instructions: 'You are a friendly assistant!',
    messages: history,
  });

  return {
    messages: [
      ...history,
      {
        role: 'assistant' as const,
        content: text,
      },
    ],
  };
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)