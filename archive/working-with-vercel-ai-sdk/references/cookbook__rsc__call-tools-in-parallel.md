---
title: Call Tools in Parallel
description: Learn how to tools in parallel text using the AI SDK and React Server Components.
url: "https://ai-sdk.dev/cookbook/rsc/call-tools-in-parallel"
docs_index: /llms.txt
tags:
  - rsc
  - tool use
source: "https://ai-sdk.dev/cookbook/rsc/call-tools-in-parallel.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "0c4a87ee177122f6149958e1263d0906db5c78ceefbe36280df633ec5a158199"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Some language models support calling tools in parallel. This is particularly useful when multiple tools are independent of each other and can be executed in parallel during the same generation step.

User: How is it going?

Assistant: All good, how may I help you?

What is the weather in Paris and New York?

## Client

Let's modify our previous example to call `getWeather` tool for multiple cities in parallel.

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

Let's update the tools object to now use the `getWeather` function instead.

```ts title='app/actions.ts'
'use server';

import { generateText } from 'ai';
import { z } from 'zod';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function getWeather({ city, unit }) {
  // This function would normally make an
  // API request to get the weather.

  return { value: 25, description: 'Sunny' };
}

export async function continueConversation(history: Message[]) {
  'use server';

  const { text, toolResults } = await generateText({
    model: 'openai/gpt-6-astra',
    instructions: 'You are a friendly weather assistant!',
    messages: history,
    tools: {
      getWeather: {
        description: 'Get the weather for a location',
        inputSchema: z.object({
          city: z.string().describe('The city to get the weather for'),
          unit: z
            .enum(['C', 'F'])
            .describe('The unit to display the temperature in'),
        }),
        execute: async ({ city, unit }) => {
          const weather = getWeather({ city, unit });
          return `It is currently ${weather.value}°${unit} and ${weather.description} in ${city}!`;
        },
      },
    },
  });

  return {
    messages: [
      ...history,
      {
        role: 'assistant' as const,
        content:
          text || toolResults.map(toolResult => toolResult.result).join('\n'),
      },
    ],
  };
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)