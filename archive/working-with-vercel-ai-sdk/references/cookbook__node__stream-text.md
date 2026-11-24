---
title: Stream Text
description: Learn how to stream text using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/stream-text"
docs_index: /llms.txt
tags:
  - node
  - streaming
source: "https://ai-sdk.dev/cookbook/node/stream-text.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "6595b4b7cc668d220421d78fdc838c8e850595cc9aab7af6b8acb2c05afe0c95"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Text generation can sometimes take a long time to complete, especially when you're generating a couple of paragraphs.
In such cases, it is useful to stream the text to the client in real-time.
This allows the client to display the generated text as it is being generated,
rather than have users wait for it to complete before displaying the result.

```txt
Introducing "Joyful Hearts Day" - a holiday dedicated to spreading love, joy, and kindness to others.

On Joyful Hearts Day, people exchange handmade cards, gifts, and acts of kindness to show appreciation and love for their friends, family, and community members. It is a day to focus on positivity and gratitude, spreading happiness and warmth to those around us.

Traditions include decorating homes and public spaces with hearts and bright colors, hosting community events such as charity drives, volunteer projects, and festive gatherings. People also participate in random acts of kindness, such as paying for someone's coffee, leaving encouraging notes for strangers, or simply offering a helping hand to those in need.

One of the main traditions of Joyful Hearts Day is the "Heart Exchange" where people write heartfelt messages to loved ones and exchange them in person or through mail. These messages can be words of encouragement, expressions of gratitude, or simply a reminder of how much they are loved.

Overall, Joyful Hearts Day is a day to celebrate love, kindness, and positivity, and to spread joy and happiness to all those around us. It is a reminder to appreciate the people in our lives and to make the world a brighter and more loving place.
```

## Without reader

```ts title='index.ts'
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-4.1',
  maxOutputTokens: 512,
  prompt: 'Invent a new holiday and describe its traditions.',
});

for await (const textPart of result.textStream) {
  console.log(textPart);
}
```

## With reader

```ts title='index.ts'
import { streamText } from 'ai';

const result = streamText({
  model: 'openai/gpt-4.1',
  maxOutputTokens: 512,
  prompt: 'Invent a new holiday and describe its traditions.',
});

const reader = result.textStream.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) {
    break;
  }
  process.stdout.write(value);
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)