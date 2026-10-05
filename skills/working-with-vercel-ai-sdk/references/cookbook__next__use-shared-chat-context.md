---
title: Share useChat State Across Components
description: Learn how to share a chat instance across multiple components with useChat and easily reset the chat.
url: "https://ai-sdk.dev/cookbook/next/use-shared-chat-context"
docs_index: /llms.txt
tags:
  - next
  - useChat
  - context
source: "https://ai-sdk.dev/cookbook/next/use-shared-chat-context.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "14ac5a70b76ed9b212153438e7480871c67ead14fb4aca4043c818cc2df4b294"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

When building chat applications, you may want to access the same chat instance across multiple components. This allows you to display messages in one component, handle input in another, and control the chat state from anywhere in your application.

## Create a Chat Context

First, create a context that will hold your chat instance and provide methods to interact with it.

```tsx title='app/chat-context.tsx'
'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Chat } from '@ai-sdk/react';
import { DefaultChatTransport, UIMessage } from 'ai';

interface ChatContextValue {
  // replace with your custom message type
  chat: Chat<UIMessage>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

function createChat() {
  return new Chat<UIMessage>({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chat, setChat] = useState(() => createChat());

  const clearChat = () => {
    setChat(createChat());
  };

  return (
    <ChatContext.Provider
      value={{
        chat,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useSharedChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useSharedChatContext must be used within a ChatProvider');
  }
  return context;
}
```

## Wrap Your App with the Provider

Add the ChatProvider to your layout to make the chat context available to all child components.

```tsx title='app/layout.tsx'
import { ChatProvider } from './chat-context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ChatProvider>{children}</ChatProvider>;
}
```

## Display Messages and Clear Chat

Create a component that displays messages and provides a button to clear the chat.

```tsx title='app/page.tsx'
'use client';

import { useChat } from '@ai-sdk/react';
import { useSharedChatContext } from './chat-context';
import ChatInput from './chat-input';

export default function Chat() {
  const { chat, clearChat } = useSharedChatContext();
  const { messages } = useChat({
    chat,
  });

  return (
    <div>
      <button onClick={clearChat} disabled={messages.length === 0}>
        Clear Chat
      </button>

      {messages?.map(message => (
        <div key={message.id}>
          <strong>{`${message.role}: `}</strong>
          {message.parts.map((part, index) => {
            if (part.type === 'text') {
              return <div key={index}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      <ChatInput />
    </div>
  );
}
```

## Handle Input in a Separate Component

Create an input component that uses the shared chat context to send messages.

```tsx title='app/chat-input.tsx'
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { useSharedChatContext } from './chat-context';

export default function ChatInput() {
  const { chat } = useSharedChatContext();
  const [text, setText] = useState('');
  const { status, stop, sendMessage } = useChat({ chat });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (text.trim() === '') return;
        sendMessage({ text });
        setText('');
      }}
    >
      <input
        placeholder="Say something..."
        disabled={status !== 'ready'}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      {stop && (status === 'streaming' || status === 'submitted') && (
        <button type="submit" onClick={stop}>
          Stop
        </button>
      )}
    </form>
  );
}
```

## Server

Create an API route to handle the chat messages using the AI SDK.

```tsx title='app/api/chat/route.ts'
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: 'openai/gpt-6-luna',
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

[View Example on GitHub](https://github.com/vercel/ai/tree/main/examples/ai-e2e-next/app/chat/shared-context)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)