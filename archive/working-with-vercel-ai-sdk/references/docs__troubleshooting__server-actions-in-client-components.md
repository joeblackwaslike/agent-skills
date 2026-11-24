---
title: Server Actions in Client Components
description: Troubleshooting errors related to server actions in client components.
url: "https://ai-sdk.dev/docs/troubleshooting/server-actions-in-client-components"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/server-actions-in-client-components.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "89913cc563e8b15463e0ed739f935418c6f826aa288d86cb03ae9b3f401421f8"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

You may use Server Actions in client components, but sometimes you may encounter the following issues.

## Issue

It is not allowed to define inline `"use server"` annotated Server Actions in Client Components.

## Solution

To use Server Actions in a Client Component, you can either:

- Export them from a separate file with `"use server"` at the top.
- Pass them down through props from a Server Component.
- Implement a combination of [`createAI`](/docs/reference/ai-sdk-rsc/create-ai) and [`useActions`](/docs/reference/ai-sdk-rsc/use-actions) hooks to access them.

Learn more about [Server Actions and Mutations](https://nextjs.org/docs/app/api-reference/functions/server-actions#with-client-components).

```ts title='actions.ts'
'use server';

import { generateText } from 'ai';

export async function getAnswer(question: string) {
  'use server';

  const { text } = await generateText({
    model: "anthropic/claude-sonnet-5.5",
    prompt: question,
  });

  return { answer: text };
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)