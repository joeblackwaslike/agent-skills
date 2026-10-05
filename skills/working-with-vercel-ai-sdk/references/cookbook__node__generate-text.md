---
title: Generate Text
description: Learn how to generate text using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/generate-text"
docs_index: /llms.txt
tags:
  - node
source: "https://ai-sdk.dev/cookbook/node/generate-text.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "49d234378d7b30acedbe71a20296cf071b5a190edd7dc5780c89b38c89eef975"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The most basic LLM use case is generating text based on a prompt.
For example, you may want to generate a response to a question or summarize a body of text.
The `generateText` function can be used to generate text based on the input prompt.

```ts title='index.ts'
import { generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-6-astra',
  prompt: 'Why is the sky blue?',
});

console.log(result);
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)