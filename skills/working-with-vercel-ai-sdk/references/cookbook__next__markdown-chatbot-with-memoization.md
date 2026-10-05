---
title: Markdown Chatbot with Streamdown
description: Render streaming Markdown responses with Streamdown, Next.js, and the AI SDK.
url: "https://ai-sdk.dev/cookbook/next/markdown-chatbot-with-memoization"
docs_index: /llms.txt
tags:
  - next
  - streaming
  - chatbot
  - markdown
source: "https://ai-sdk.dev/cookbook/next/markdown-chatbot-with-memoization.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "bbf145e5c04dd28467135e70c774ffa170fbc8be5f36471ea610eb4c105b0b1f"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[Streamdown](https://streamdown.ai) renders Markdown as it streams from a language model. It handles incomplete Markdown syntax and [memoizes Markdown blocks](https://streamdown.ai/docs/memoization) so unchanged blocks can skip re-rendering. Streamdown provides this behavior in its default streaming mode.

Start with the [Stream Text with Chat Prompt](/cookbook/next/stream-text-with-chat-prompt) recipe for the `/api/chat` route. Then use Streamdown to render the text parts in the client.

## Installation

Install Streamdown in your Next.js application:

```bash
npm install streamdown
```

For Tailwind CSS v4, add Streamdown to the sources in your global stylesheet:

```css title='app/globals.css'
@import 'tailwindcss';
@source '../node_modules/streamdown/dist/*.js';
```

The `@source` path is relative to the stylesheet. Adjust it if you use a `src/app` directory or a monorepo. See the [Streamdown installation guide](https://streamdown.ai/docs/getting-started) for Tailwind CSS v3 configuration.

## Client

Pass each text part to `Streamdown`. Set `isAnimating` when that part is streaming so Streamdown can disable interactive controls until the text is complete.

```tsx title='app/page.tsx'
'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';
import { Streamdown } from 'streamdown';

export default function Page() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <div>{message.role === 'user' ? 'You' : 'Assistant'}</div>
          {message.parts.map((part, index) =>
            part.type === 'text' ? (
              <Streamdown
                key={`${message.id}-${index}`}
                isAnimating={part.state === 'streaming'}
              >
                {part.text}
              </Streamdown>
            ) : null,
          )}
        </div>
      ))}

      <form
        onSubmit={event => {
          event.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          value={input}
          onChange={event => setInput(event.target.value)}
          placeholder="Say something..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

For syntax highlighting, math, or Mermaid diagrams, see [Streamdown's plugins](https://streamdown.ai/docs/plugins).

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)