---
title: Stream Text
description: Learn how to stream text using the AI SDK and Next.js
url: "https://ai-sdk.dev/cookbook/next/stream-text"
docs_index: /llms.txt
tags:
  - next
  - streaming
source: "https://ai-sdk.dev/cookbook/next/stream-text.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "1aabe3461ca0523abc8489936cccc6604a3f8d8dc9d411ecc25fc3b3daf75f63"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Text generation can sometimes take a long time to complete, especially when you're generating a couple of paragraphs. In such cases, it is useful to stream the text generation process to the client in real-time. This allows the client to display the generated text as it is being generated, rather than have users wait for it to complete before displaying the result.

## Client

Let's create a simple React component that imports the `useCompletion` hook from the `@ai-sdk/react` module. The `useCompletion` hook will call the `/api/completion` endpoint when a button is clicked. The endpoint will generate text based on the input prompt and stream it to the client.

```tsx title="app/page.tsx"
'use client';

import { useCompletion } from '@ai-sdk/react';

export default function Page() {
  const { completion, complete } = useCompletion({
    api: '/api/completion',
  });

  return (
    <div>
      <div
        onClick={async () => {
          await complete('Why is the sky blue?');
        }}
      >
        Generate
      </div>

      {completion}
    </div>
  );
}
```

## Server

Let's create a route handler for `/api/completion` that will generate text based on the input prompt. The route will call the `streamText` function from the `ai` module, which will then generate text based on the input prompt and stream it to the client.

```typescript title='app/api/completion/route.ts'
import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: 'openai/gpt-6-astra',
    instructions: 'You are a helpful assistant.',
    prompt,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

***

[View Example on GitHub](https://github.com/vercel/ai/blob/main/examples/next-openai-pages/pages/basics/stream-text/index.tsx)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)