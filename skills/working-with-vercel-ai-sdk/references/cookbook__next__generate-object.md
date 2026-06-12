---
source: "https://ai-sdk.dev/cookbook/next/generate-object.md"
fetched_at: "2026-06-11T15:39:44.005Z"
sha256: "d8f2cff24979d0abd9aa48a265db87dcea5bef85bf86934b8c07c24213fc712a"
---

# Generate Object

You can use `generateText` with `Output` to generate structured data like JSON. By providing a schema that describes the structure of your desired object, the SDK will validate the generated output and ensure that it conforms to the specified structure.

The `Output.object` function requires you to provide a schema using [zod](https://zod.dev), a library for defining schemas for JavaScript objects.

<Browser>
  <ObjectGeneration
    object={{
      notifications: [
        {
          name: 'Jamie Roberts',
          message: "Hey! How's the study grind going? Need a coffee boost?",
          minutesAgo: 15,
        },
        {
          name: 'Prof. Morgan',
          message:
            'Reminder: Your term paper is due promptly at 8 AM tomorrow. Please ensure it meets the submission guidelines outlined.',
          minutesAgo: 46,
        },
        {
          name: 'Alex Chen',
          message:
            "Dude, urgent! Borrow your notes for tomorrow's exam? I swear mine got eaten by my dog!",
          minutesAgo: 30,
        },
      ],
    }}
  />
</Browser>

## Client

Let's create a simple React component that will make a POST request to the `/api/completion` endpoint when a button is clicked. The endpoint will return the generated object based on the input prompt and we'll display it.

```tsx filename='app/page.tsx'
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

```typescript filename='app/api/completion/route.ts'
import { generateText, Output } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await generateText({
    model: 'openai/gpt-4o',
    system: 'You generate three notifications for a messages app.',
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

---

<GithubLink link="https://github.com/vercel/ai/blob/main/examples/next-openai-pages/pages/basics/generate-object/index.tsx" />


## Navigation

- [Generate Text](/cookbook/next/generate-text)
- [Generate Text with Chat Prompt](/cookbook/next/generate-text-with-chat-prompt)
- [Generate Image with Chat Prompt](/cookbook/next/generate-image-with-chat-prompt)
- [Caching Middleware](/cookbook/next/caching-middleware)
- [Stream Text](/cookbook/next/stream-text)
- [Stream Text with Chat Prompt](/cookbook/next/stream-text-with-chat-prompt)
- [Stream Text with Image Prompt](/cookbook/next/stream-text-with-image-prompt)
- [Chat with PDFs](/cookbook/next/chat-with-pdf)
- [streamText Multi-Step Cookbook](/cookbook/next/stream-text-multistep)
- [Markdown Chatbot with Memoization](/cookbook/next/markdown-chatbot-with-memoization)
- [Generate Object](/cookbook/next/generate-object)
- [Generate Object with File Prompt through Form Submission](/cookbook/next/generate-object-with-file-prompt)
- [Stream Object](/cookbook/next/stream-object)
- [Call Tools](/cookbook/next/call-tools)
- [Call Tools in Multiple Steps](/cookbook/next/call-tools-multiple-steps)
- [Model Context Protocol (MCP) Tools](/cookbook/next/mcp-tools)
- [Share useChat State Across Components](/cookbook/next/use-shared-chat-context)
- [Human-in-the-Loop with Next.js](/cookbook/next/human-in-the-loop)
- [Track Agent Token Usage](/cookbook/next/track-agent-token-usage)
- [Send Custom Body from useChat](/cookbook/next/send-custom-body-from-use-chat)
- [Streaming with Custom Format](/cookbook/next/custom-stream-format)
- [Render Visual Interface in Chat](/cookbook/next/render-visual-interface-in-chat)


[Full Sitemap](/sitemap.md)
