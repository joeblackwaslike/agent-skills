---
title: Save Messages To Database
description: Learn how to save messages to an external database using the AI SDK and React Server Components
url: "https://ai-sdk.dev/cookbook/rsc/save-messages-to-database"
docs_index: /llms.txt
tags:
  - rsc
  - tool use
source: "https://ai-sdk.dev/cookbook/rsc/save-messages-to-database.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "48e9eacc97dbedfdf5267c85e60a5680c50518c15854d2453fabf238bd012f12"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Sometimes conversations with language models can get interesting and you might want to save the state of so you can revisit it or continue the conversation later.

`createAI` has an experimental callback function called `onSetAIState` that gets called whenever the AI state changes. You can use this to save the AI state to a file or a database.

## Client

```tsx title='app/layout.tsx'
import { ServerMessage } from './actions';
import { AI } from './ai';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // get chat history from database
  const history: ServerMessage[] = getChat();

  return (
    <html lang="en">
      <body>
        <AI initialAIState={history} initialUIState={[]}>
          {children}
        </AI>
      </body>
    </html>
  );
}
```

```tsx title='app/page.tsx'
'use client';

import { useState } from 'react';
import { ClientMessage } from './actions';
import { useActions, useUIState } from '@ai-sdk/rsc';
import { generateId } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  return (
    <div>
      <div>
        {conversation.map((message: ClientMessage) => (
          <div key={message.id}>
            {message.role}: {message.display}
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
            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              { id: generateId(), role: 'user', display: input },
            ]);

            const message = await continueConversation(input);

            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              message,
            ]);
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

We will use the callback function to listen to state changes and save the conversation once we receive a `done` event.

```tsx title='app/actions.tsx'
'use server';

import { getAIState, getMutableAIState, streamUI } from '@ai-sdk/rsc';
import { ReactNode } from 'react';
import { z } from 'zod';
import { generateId } from 'ai';
import { Stock } from '@ai-studio/components/stock';

export interface ServerMessage {
  role: 'user' | 'assistant' | 'function';
  content: string;
}

export interface ClientMessage {
  id: string;
  role: 'user' | 'assistant' | 'function';
  display: ReactNode;
}

export async function continueConversation(
  input: string,
): Promise<ClientMessage> {
  'use server';

  const history = getMutableAIState();

  const result = await streamUI({
    model: 'openai/gpt-6-astra',
    messages: [...history.get(), { role: 'user', content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done([
          ...history.get(),
          { role: 'user', content: input },
          { role: 'assistant', content },
        ]);
      }

      return <div>{content}</div>;
    },
    tools: {
      showStockInformation: {
        description:
          'Get stock information for symbol for the last numOfMonths months',
        inputSchema: z.object({
          symbol: z
            .string()
            .describe('The stock symbol to get information for'),
          numOfMonths: z
            .number()
            .describe('The number of months to get historical information for'),
        }),
        generate: async ({ symbol, numOfMonths }) => {
          history.done([
            ...history.get(),
            {
              role: 'function',
              name: 'showStockInformation',
              content: JSON.stringify({ symbol, numOfMonths }),
            },
          ]);

          return <Stock symbol={symbol} numOfMonths={numOfMonths} />;
        },
      },
    },
  });

  return {
    id: generateId(),
    role: 'assistant',
    display: result.value,
  };
}
```

```ts title='app/ai.ts'
import { createAI } from '@ai-sdk/rsc';
import { ServerMessage, ClientMessage, continueConversation } from './actions';

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  onSetAIState: async ({ state, done }) => {
    'use server';

    if (done) {
      saveChat(state);
    }
  },
  onGetUIState: async () => {
    'use server';

    const history: ServerMessage[] = getAIState();

    return history.map(({ role, content }) => ({
      id: generateId(),
      role,
      display:
        role === 'function' ? <Stock {...JSON.parse(content)} /> : content,
    }));
  },
});
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)