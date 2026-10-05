---
title: Generate Text with Chat Prompt
description: Learn how to generate text with chat prompt using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/generate-text-with-chat-prompt"
docs_index: /llms.txt
tags:
  - node
  - chat
source: "https://ai-sdk.dev/cookbook/node/generate-text-with-chat-prompt.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "147bf4056ff521900e1a1cb0823d14792f238c5cc19461697fe96f312df499a1"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Previously, we were able to generate text and objects using either a single message prompt, a system prompt, or a combination of both of them. However, there may be times when you want to generate text based on a series of messages.

A chat completion allows you to generate text based on a series of messages. This series of messages can be any series of interactions between any number of systems, but the most popular and relatable use case has been a series of messages that represent a conversation between a user and a model.

```ts title='index.ts'
import { generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-6-astra',
  maxOutputTokens: 1024,
  instructions: 'You are a helpful chatbot.',
  messages: [
    {
      role: 'user',
      content: [{ type: 'text', text: 'Hello!' }],
    },
    {
      role: 'assistant',
      content: [{ type: 'text', text: 'Hello! How can I help you today?' }],
    },
    {
      role: 'user',
      content: [{ type: 'text', text: 'I need help with my computer.' }],
    },
  ],
});

console.log(result.text);
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)