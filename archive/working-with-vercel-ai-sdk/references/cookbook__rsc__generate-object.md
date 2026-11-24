---
title: Generate Object
description: Learn how to generate object using the AI SDK and React Server Components.
url: "https://ai-sdk.dev/cookbook/rsc/generate-object"
docs_index: /llms.txt
tags:
  - rsc
  - structured data
source: "https://ai-sdk.dev/cookbook/rsc/generate-object.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "fa8a0ffaeb4cc7e1041b8a4d28480f27634a01aeb541e12c8195524a86500b18"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This example uses React Server Components (RSC). If you want to client side
rendering and hooks instead, check out the ["generate object" example with
useState](/examples/next-pages/basics/generating-object).

You can use `generateText` with `Output` to generate structured data like JSON. By providing a schema that describes the structure of your desired object, the SDK will validate the generated output and ensure that it conforms to the specified structure.

The `Output.object` function requires you to provide a schema using [zod](https://zod.dev), a library for defining schemas for JavaScript objects.

## Client

Let's create a simple React component that will call the `getNotifications` function when a button is clicked. The function will generate a list of notifications as described in the schema.

```tsx title='app/page.tsx'
'use client';

import { useState } from 'react';
import { getNotifications } from './actions';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [generation, setGeneration] = useState<string>('');

  return (
    <div>
      <button
        onClick={async () => {
          const { notifications } = await getNotifications(
            'Messages during finals week.',
          );

          setGeneration(JSON.stringify(notifications, null, 2));
        }}
      >
        View Notifications
      </button>

      <pre>{generation}</pre>
    </div>
  );
}
```

## Server

Now let's implement the `getNotifications` function. We'll use the `generateText` function with `Output.object` to generate the list of notifications based on the schema we defined earlier.

```typescript title='app/actions.ts'
'use server';

import { generateText, Output } from 'ai';
import { z } from 'zod';

export async function getNotifications(input: string) {
  'use server';

  const { output: notifications } = await generateText({
    model: 'openai/gpt-6-astra',
    instructions: 'You generate three notifications for a messages app.',
    prompt: input,
    output: Output.object({
      schema: z.object({
        notifications: z.array(
          z.object({
            name: z.string().describe('Name of a fictional person.'),
            message: z.string().describe('Do not use emojis or links.'),
            minutesAgo: z.number(),
          }),
        ),
      }),
    }),
  });

  return { notifications };
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)