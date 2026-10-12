---
title: Stream Object
description: Learn how to stream object using the AI SDK and Next.js
url: "https://ai-sdk.dev/cookbook/next/stream-object"
docs_index: /llms.txt
tags:
  - next
  - streaming
  - structured data
source: "https://ai-sdk.dev/cookbook/next/stream-object.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "c1219a93a599e20f7a2a7b1f5341be499a4ae5eaab41a2b555b450081e4cf111"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Object generation can sometimes take a long time to complete, especially when you're generating a large schema.
In such cases, it is useful to stream the object generation process to the client in real-time.
This allows the client to display the generated object as it is being generated,
rather than have users wait for it to complete before displaying the result.

## Object Mode

The `streamText` function with `Output` allows you to specify different output strategies. Using `Output.object`, it will generate exactly the structured object that you specify in the schema option.

### Schema

It is helpful to set up the schema in a separate file that is imported on both the client and server.

```ts title='app/api/use-object/schema.ts'
import { z } from 'zod';

// define a schema for the notifications
export const notificationSchema = z.object({
  notifications: z.array(
    z.object({
      name: z.string().describe('Name of a fictional person.'),
      message: z.string().describe('Message. Do not use emojis or links.'),
    }),
  ),
});
```

### Client

The client uses [`useObject`](/docs/reference/ai-sdk-ui/use-object) to stream the object generation process.

The results are partial and are displayed as they are received.
Please note the code for handling `undefined` values in the JSX.

```tsx title='app/page.tsx'
'use client';

import { useObject } from '@ai-sdk/react';
import { notificationSchema } from './api/use-object/schema';

export default function Page() {
  const { object, submit } = useObject({
    api: '/api/use-object',
    schema: notificationSchema,
  });

  return (
    <div>
      <button onClick={() => submit('Messages during finals week.')}>
        Generate notifications
      </button>

      {object?.notifications?.map((notification, index) => (
        <div key={index}>
          <p>{notification?.name}</p>
          <p>{notification?.message}</p>
        </div>
      ))}
    </div>
  );
}
```

### Server

On the server, we use [`streamText`](/docs/reference/ai-sdk-core/stream-text) with `Output.object` to stream the object generation process.

```typescript title='app/api/use-object/route.ts'
import { streamText, Output, createTextStreamResponse, toTextStream } from 'ai';
import { notificationSchema } from './schema';

export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamText({
    model: 'openai/gpt-6-astra',
    output: Output.object({ schema: notificationSchema }),
    prompt:
      `Generate 3 notifications for a messages app in this context:` + context,
  });

  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}
```

## Loading State and Stopping the Stream

You can use the `isLoading` state to display a loading indicator while the object is being generated.
You can also use the `stop` function to stop the object generation process.

```tsx title='app/page.tsx' {7,16,21,24}
'use client';

import { useObject } from '@ai-sdk/react';
import { notificationSchema } from './api/use-object/schema';

export default function Page() {
  const { object, submit, isLoading, stop } = useObject({
    api: '/api/use-object',
    schema: notificationSchema,
  });

  return (
    <div>
      <button
        onClick={() => submit('Messages during finals week.')}
        disabled={isLoading}
      >
        Generate notifications
      </button>

      {isLoading && (
        <div>
          <div>Loading...</div>
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      {object?.notifications?.map((notification, index) => (
        <div key={index}>
          <p>{notification?.name}</p>
          <p>{notification?.message}</p>
        </div>
      ))}
    </div>
  );
}
```

## Array Mode

The `Output.array` mode allows you to stream an array of objects one element at a time. This is particularly useful when generating lists of items.

### Schema

First, update the schema to generate a single object (remove the `z.array()`).

```ts title='app/api/use-object/schema.ts'
import { z } from 'zod';

// define a schema for a single notification
export const notificationSchema = z.object({
  name: z.string().describe('Name of a fictional person.'),
  message: z.string().describe('Message. Do not use emojis or links.'),
});
```

### Client

On the client, you wrap the schema in `z.array()` to generate an array of objects.

```tsx title='app/page.tsx'
'use client';

import { useObject } from '@ai-sdk/react';
import { notificationSchema } from './api/use-object/schema';
import z from 'zod';

export default function Page() {
  const { object, submit, isLoading, stop } = useObject({
    api: '/api/use-object',
    schema: z.array(notificationSchema),
  });

  return (
    <div>
      <button
        onClick={() => submit('Messages during finals week.')}
        disabled={isLoading}
      >
        Generate notifications
      </button>

      {isLoading && (
        <div>
          <div>Loading...</div>
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      {object?.map((notification, index) => (
        <div key={index}>
          <p>{notification?.name}</p>
          <p>{notification?.message}</p>
        </div>
      ))}
    </div>
  );
}
```

### Server

On the server, specify `Output.array` to generate an array of objects.

```typescript title='app/api/use-object/route.ts'
import { streamText, Output, createTextStreamResponse, toTextStream } from 'ai';
import { notificationSchema } from './schema';

export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamText({
    model: 'openai/gpt-6-astra',
    output: Output.array({ element: notificationSchema }),
    prompt:
      `Generate 3 notifications for a messages app in this context:` + context,
  });

  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}
```

## JSON Mode

`Output.json()` can be used when you don't want to specify a schema, for example when the data structure is defined by a dynamic user request. The model will still attempt to generate JSON data based on the prompt.

### Client

```tsx title='app/page.tsx'
'use client';

import { useObject } from '@ai-sdk/react';
import { z } from 'zod';

export default function Page() {
  const { object, submit, isLoading, stop } = useObject({
    api: '/api/use-object',
    schema: z.unknown(),
  });

  return (
    <div>
      <button
        onClick={() => submit('Messages during finals week.')}
        disabled={isLoading}
      >
        Generate notifications
      </button>

      {isLoading && (
        <div>
          <div>Loading...</div>
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      {JSON.stringify(object, null, 2)}
    </div>
  );
}
```

### Server

On the server, specify `Output.json()`.

```typescript title='app/api/use-object/route.ts'
import { streamText, Output, createTextStreamResponse, toTextStream } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamText({
    model: 'openai/gpt-6-astra',
    output: Output.json(),
    prompt:
      `Generate 3 notifications (in JSON) for a messages app in this context:` +
      context,
  });

  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)