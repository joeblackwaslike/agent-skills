---
title: Call Tools
description: Learn how to call tools using the AI SDK and Next.js
url: "https://ai-sdk.dev/cookbook/next/call-tools"
docs_index: /llms.txt
tags:
  - next
  - tool use
source: "https://ai-sdk.dev/cookbook/next/call-tools.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "843ccb3b52ea7f80bc33e1b918e2e801772df0120460d6d1cdfaddd69599ed16"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Some models allow developers to provide a list of tools that can be called at any time during a generation. This is useful for extending the capabilities of a language model to either use logic or data to interact with systems external to the model.

User: How is it going?

Assistant: All good, how may I help you?

What is the weather in Paris and New York?

## Client

Let's create a React component that imports the `useChat` hook from the `@ai-sdk/react` module. The `useChat` hook will call the `/api/chat` endpoint when the user sends a message. The endpoint will generate the assistant's response based on the conversation history and stream it to the client. If the assistant responds with a tool call, the hook will automatically display them as well.

```tsx title='app/page.tsx'
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import type { ChatMessage } from './api/chat/route';

export default function Page() {
  const [input, setInput] = useState('');

  const { messages, sendMessage } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  return (
    <div>
      <input
        className="border"
        value={input}
        onChange={event => {
          setInput(event.target.value);
        }}
        onKeyDown={async event => {
          if (event.key === 'Enter') {
            sendMessage({
              text: input,
            });
            setInput('');
          }
        }}
      />

      {messages.map((message, index) => (
        <div key={index}>
          {message.parts.map(part => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-text`}>{part.text}</div>;
              case 'tool-getWeather':
                return (
                  <div key={`${message.id}-weather`}>
                    {JSON.stringify(part, null, 2)}
                  </div>
                );
            }
          })}
        </div>
      ))}
    </div>
  );
}
```

## Server

You will create a new route at `/api/chat` that will use the `streamText` function from the `ai` module to generate the assistant's response based on the conversation history.

You will use the [`tools`](/docs/reference/ai-sdk-core/generate-text#tools) parameter to specify a tool called `getWeather` that will get the weather for a user given city.

You will also use zod to specify the schema for the `getWeather` tool's parameters.

```tsx title='app/api/chat/route.ts'
import {
  type InferUITools,
  type ToolSet,
  type UIDataTypes,
  type UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  tool,
} from 'ai';
import { z } from 'zod';

const tools = {
  getWeather: tool({
    description: 'Get the weather for a location',
    inputSchema: z.object({
      city: z.string().describe('The city to get the weather for'),
      unit: z
        .enum(['C', 'F'])
        .describe('The unit to display the temperature in'),
    }),
    execute: async ({ city, unit }) => {
      const weather = {
        value: 24,
        description: 'Sunny',
      };

      return `It is currently ${weather.value}°${unit} and ${weather.description} in ${city}!`;
    },
  }),
} satisfies ToolSet;

export type ChatTools = InferUITools<typeof tools>;

export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  const { messages }: { messages: ChatMessage[] } = await req.json();

  const result = streamText({
    model: 'openai/gpt-6-astra',
    instructions: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    stopWhen: isStepCount(5),
    tools,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

***

[View Example on GitHub](https://github.com/vercel/ai/blob/main/examples/next-openai-pages/pages/tools/call-tool/index.tsx)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)