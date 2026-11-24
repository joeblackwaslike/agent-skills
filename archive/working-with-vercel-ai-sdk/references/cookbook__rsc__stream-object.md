---
title: Stream Object
description: Learn how to stream object using the AI SDK and React Server Components.
url: "https://ai-sdk.dev/cookbook/rsc/stream-object"
docs_index: /llms.txt
tags:
  - rsc
  - streaming
  - structured data
source: "https://ai-sdk.dev/cookbook/rsc/stream-object.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "c87d1caf2a03dc3216442488c879fec415a5debb9397bd7f507947ea13d35604"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

This example uses React Server Components (RSC). If you want to client side
rendering and hooks instead, check out the ["streaming object generation"
example with
useObject](/examples/next-pages/basics/streaming-object-generation).

Object generation can sometimes take a long time to complete, especially when you're generating a large schema. In such cases, it is useful to stream the object generation process to the client in real-time. This allows the client to display the generated object as it is being generated, rather than have users wait for it to complete before displaying the result.

## Client

Let's create a simple React component that will call the `generate` function when a button is clicked. The function will generate a list of notifications as described in the schema.

```tsx title='app/page.tsx'
'use client';

import { useState } from 'react';
import { generate } from './actions';
import { readStreamableValue } from '@ai-sdk/rsc';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [generation, setGeneration] = useState<string>('');

  return (
    <div>
      <button
        onClick={async () => {
          const { object } = await generate('Messages during finals week.');

          for await (const partialObject of readStreamableValue(object)) {
            if (partialObject) {
              setGeneration(
                JSON.stringify(partialObject.notifications, null, 2),
              );
            }
          }
        }}
      >
        Ask
      </button>

      <pre>{generation}</pre>
    </div>
  );
}
```

## Server

Now let's implement the `generate` function. We'll use the `streamText` function with `Output.object` to stream the list of fictional notifications based on the schema we defined earlier.

```typescript title='app/actions.ts'
'use server';

import { streamText, Output } from 'ai';
import { createStreamableValue } from '@ai-sdk/rsc';
import { z } from 'zod';

export async function generate(input: string) {
  'use server';

  const stream = createStreamableValue();

  (async () => {
    const { partialOutputStream } = streamText({
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

    for await (const partialObject of partialOutputStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)