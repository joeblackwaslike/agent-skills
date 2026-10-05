---
title: Repeated assistant messages in useChat
description: Troubleshooting duplicate assistant messages when using useChat with streamText
url: "https://ai-sdk.dev/docs/troubleshooting/repeated-assistant-messages"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/repeated-assistant-messages.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "83956259b0cefecea340c0e8b559260c059c9f591ce50f245b56d9a63b0cc950"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

When using `useChat` with `streamText` on the server, the assistant's messages appear duplicated in the UI - showing both the previous message and the new message, or showing the same message multiple times. This can occur when using tool calls or complex message flows.

```tsx
// Server-side code that may experience assistant message duplication on the client
export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: 'openai/gpt-6-luna',
    messages: await convertToModelMessages(messages),
    tools: {
      weather: {
        description: 'Get the weather for a location',
        inputSchema: z.object({
          location: z.string(),
        }),
        execute: async ({ location }) => {
          return { temperature: 72, condition: 'sunny' };
        },
      },
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

## Background

The duplication occurs because UI message streams generate new message IDs for each new message.

## Solution

Pass the original messages array to `toUIMessageStream` using the `originalMessages` option. By passing `originalMessages`, the helper can reuse existing message IDs instead of generating new ones, ensuring the client properly updates existing messages rather than creating duplicates.

```tsx
export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: 'openai/gpt-6-luna',
    messages: await convertToModelMessages(messages),
    tools: {
      weather: {
        description: 'Get the weather for a location',
        inputSchema: z.object({
          location: z.string(),
        }),
        execute: async ({ location }) => {
          return { temperature: 72, condition: 'sunny' };
        },
      },
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages, // Pass the original messages here
      generateMessageId: generateId,
      onEnd: ({ messages }) => {
        saveChat({ id, messages });
      },
    }),
  });
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)