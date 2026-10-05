---
title: Restore Messages From Database
description: Learn how to restore messages from an external database using the AI SDK and React Server Components
url: "https://ai-sdk.dev/cookbook/rsc/restore-messages-from-database"
docs_index: /llms.txt
tags:
  - rsc
  - tool use
source: "https://ai-sdk.dev/cookbook/rsc/restore-messages-from-database.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "86945b69d61a8de49ca280479c1275036652c4f455cb738827a741403b5f4ca3"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

When building AI applications, you might want to restore previous conversations from a database to allow users to continue their conversations or review past interactions. The AI SDK provides mechanisms to restore conversation state through `initialAIState` and `onGetUIState`.

## Client

```tsx title='app/layout.tsx'
import { ServerMessage, getSavedMessages } from './actions';
import { AI } from './ai';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch stored messages from your database
  const savedMessages: ServerMessage[] = await getSavedMessages();

  return (
    <html lang="en">
      <body>
        <AI initialAIState={savedMessages} initialUIState={[]}>
          {children}
        </AI>
      </body>
    </html>
  );
}
```

```tsx title='app/page.tsx'
'use client';

import { useState, useEffect } from 'react';
import { ClientMessage } from './actions';
import { useActions, useUIState } from '@ai-sdk/rsc';
import { generateId } from 'ai';

export default function Home() {
  const [conversation, setConversation] = useUIState();
  const [input, setInput] = useState<string>('');
  const { continueConversation } = useActions();

  return (
    <div>
      <div className="conversation-history">
        {conversation.map((message: ClientMessage) => (
          <div key={message.id} className={`message ${message.role}`}>
            {message.role}: {message.display}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={async () => {
            // Add user message to UI
            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              { id: generateId(), role: 'user', display: input },
            ]);

            // Get AI response
            const message = await continueConversation(input);

            // Add AI response to UI
            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              message,
            ]);

            setInput('');
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
```

## Server

The server-side implementation handles the restoration of messages and their transformation into the appropriate format for display. It reuses the `continueConversation` action from the [Save Messages To Database](/cookbook/rsc/save-messages-to-database) example.

```tsx title='app/ai.ts'
import { createAI, getAIState } from '@ai-sdk/rsc';
import { ServerMessage, ClientMessage, continueConversation } from './actions';
import { Stock } from '@ai-studio/components/stock';
import { generateId } from 'ai';

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  onGetUIState: async () => {
    'use server';

    // Get the current AI state (stored messages)
    const history: ServerMessage[] = getAIState();

    // Transform server messages into client messages
    return history.map(({ role, content }) => ({
      id: generateId(),
      role,
      display:
        role === 'function' ? <Stock {...JSON.parse(content)} /> : content,
    }));
  },
});
```

```tsx title='app/actions.tsx'
'use server';

import type { ReactNode } from 'react';

export interface ServerMessage {
  role: 'user' | 'assistant' | 'function';
  content: string;
}

export interface ClientMessage {
  id: string;
  role: 'user' | 'assistant' | 'function';
  display: ReactNode;
}

// Function to get saved messages from database
export async function getSavedMessages(): Promise<ServerMessage[]> {
  'use server';

  // Implement your database fetching logic here
  return await fetchMessagesFromDatabase();
}

// Export `continueConversation` as shown in the Save Messages To Database example
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)