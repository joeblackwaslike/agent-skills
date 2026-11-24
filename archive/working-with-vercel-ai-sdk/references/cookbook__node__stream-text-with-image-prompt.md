---
title: Stream Text with Image Prompt
description: Learn how to stream text with image prompt using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/stream-text-with-image-prompt"
docs_index: /llms.txt
tags:
  - node
  - streaming
  - multimodal
source: "https://ai-sdk.dev/cookbook/node/stream-text-with-image-prompt.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "63fea0ea91079adf8abd3193c68c4516cc9813f635d914a5f666ddd89525d935"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Vision-language models can analyze images alongside text prompts to generate responses about visual content. This multimodal approach allows for rich interactions where you can ask questions about images, request descriptions, or analyze visual details. The combination of image and text inputs enables more sophisticated AI applications like visual question answering and image analysis.

```ts
import { streamText } from 'ai';
import 'dotenv/config';
import fs from 'node:fs';

async function main() {
  const result = streamText({
    model: "anthropic/claude-sonnet-5.5",
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Describe the image in detail.' },
          {
            type: 'file',
            mediaType: 'image',
            data: fs.readFileSync('./data/comic-cat.png'),
          },
        ],
      },
    ],
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }
}

main().catch(console.error);
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)