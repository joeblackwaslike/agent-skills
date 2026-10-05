---
title: streamText Multi-Step Cookbook
description: Learn how to create several streamText steps with different settings
url: "https://ai-sdk.dev/cookbook/next/stream-text-multistep"
docs_index: /llms.txt
tags:
  - next
  - streaming
source: "https://ai-sdk.dev/cookbook/next/stream-text-multistep.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "04685bafc4b6e7268e9ad0c918c3dfdb8870a2d6b89c621e4e6d9d2dc4acb65f"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

You may want to have different steps in your stream where each step has different settings,
e.g. models, tools, or system prompts.

With `createUIMessageStream` and `sendFinish` / `sendStart` options when merging
into the `UIMessageStream`, you can control when the finish and start events are sent to the client,
allowing you to have different steps in a single assistant UI message.

## Server

```typescript title='app/api/chat/route.ts'
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  tool,
} from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const modelMessages = await convertToModelMessages(messages);

      // step 1 example: forced tool call
      const result1 = streamText({
        model: 'openai/gpt-6-luna',
        instructions: 'Extract the user goal from the conversation.',
        messages: modelMessages,
        toolChoice: 'required', // force the model to call a tool
        tools: {
          extractGoal: tool({
            inputSchema: z.object({ goal: z.string() }),
            execute: async ({ goal }) => goal, // no-op extract tool
          }),
        },
      });

      // forward the initial result to the client without the finish event:
      writer.merge(
        toUIMessageStream({ stream: result1.stream, sendFinish: false }),
      );

      // note: you can use any programming construct here, e.g. if-else, loops, etc.
      // workflow programming is normal programming with this approach.

      // example: continue stream with forced tool call from previous step
      const result2 = streamText({
        // different system prompt, different model, no tools:
        model: 'openai/gpt-6-astra',
        instructions:
          'You are a helpful assistant with a different system prompt. Repeat the extract user goal in your answer.',
        // continue the workflow stream with the messages from the previous step:
        messages: [...modelMessages, ...(await result1.response).messages],
      });

      // forward the 2nd result to the client (incl. the finish event):
      writer.merge(
        toUIMessageStream({ stream: result2.stream, sendStart: false }),
      );
    },
  });

  return createUIMessageStreamResponse({ stream });
}
```

## Client

```tsx title="app/page.tsx"
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  return (
    <div>
      {messages?.map(message => (
        <div key={message.id}>
          <strong>{`${message.role}: `}</strong>
          {message.parts.map((part, index) => {
            switch (part.type) {
              case 'text':
                return <span key={index}>{part.text}</span>;
              case 'tool-extractGoal': {
                return <pre key={index}>{JSON.stringify(part, null, 2)}</pre>;
              }
            }
          })}
        </div>
      ))}
      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input value={input} onChange={e => setInput(e.currentTarget.value)} />
      </form>
    </div>
  );
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)