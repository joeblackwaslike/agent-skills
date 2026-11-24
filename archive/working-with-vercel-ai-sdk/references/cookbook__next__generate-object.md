---
title: Generate Object
description: Learn how to generate object using the AI SDK and Next.js
url: "https://ai-sdk.dev/cookbook/next/generate-object"
docs_index: /llms.txt
tags:
  - next
  - structured data
source: "https://ai-sdk.dev/cookbook/next/generate-object.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "e2fdb4115b717904540d171bb5400883232dd59ae8c13315701305c8fc76af36"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

You can use `generateText` with `Output` to generate structured data like JSON. By providing a schema that describes the structure of your desired object, the SDK will validate the generated output and ensure that it conforms to the specified structure.

The `Output.object` function requires you to provide a schema using [zod](https://zod.dev), a library for defining schemas for JavaScript objects.

## Client

Let's create a simple React component that will make a POST request to the `/api/completion` endpoint when a button is clicked. The endpoint will return the generated object based on the input prompt and we'll display it.

```tsx title='app/page.tsx'
'use client';

import { useState } from 'react';

export default function Page() {
  const [generation, setGeneration] = useState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div
        onClick={async () => {
          setIsLoading(true);

          await fetch('/api/completion', {
            method: 'POST',
            body: JSON.stringify({
              prompt: 'Messages during finals week.',
            }),
          }).then(response => {
            response.json().then(json => {
              setGeneration(json.notifications);
              setIsLoading(false);
            });
          });
        }}
      >
        Generate
      </div>

      {isLoading ? (
        'Loading...'
      ) : (
        <pre>{JSON.stringify(generation, null, 2)}</pre>
      )}
    </div>
  );
}
```

## Server

Let's create a route handler for `/api/completion` that will generate an object based on the input prompt. The route will call the `generateText` function with `Output.object` from the `ai` module, which will then generate an object based on the input prompt and return it.

```typescript title='app/api/completion/route.ts'
import { generateText, Output } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await generateText({
    model: 'openai/gpt-6-astra',
    instructions: 'You generate three notifications for a messages app.',
    prompt,
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

  return Response.json(result.output);
}
```

***

[View Example on GitHub](https://github.com/vercel/ai/blob/main/examples/next-openai-pages/pages/basics/generate-object/index.tsx)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)