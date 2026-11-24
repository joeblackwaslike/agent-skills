---
title: Stream Text with File Prompt
description: Learn how to stream text with file prompt using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/stream-text-with-file-prompt"
docs_index: /llms.txt
tags:
  - node
  - streaming
  - multimodal
source: "https://ai-sdk.dev/cookbook/node/stream-text-with-file-prompt.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "fa756eea7b67c760dbf7244b88a8e40aab3e6bd467bdfaed1583ad4dd0644262"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Working with files in AI applications often requires analyzing documents, processing structured data, or extracting information from various file formats. File prompts allow you to send file content directly to the model, enabling tasks like document analysis, data extraction, or generating responses based on file contents.

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
          {
            type: 'text',
            text: 'What is an embedding model according to this document?',
          },
          {
            type: 'file',
            data: fs.readFileSync('./data/ai.pdf'),
            mediaType: 'application/pdf',
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