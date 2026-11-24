---
title: Azure OpenAI Slow to Stream
description: Learn to troubleshoot Azure OpenAI slow to stream issues.
url: "https://ai-sdk.dev/docs/troubleshooting/azure-stream-slow"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/azure-stream-slow.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "0a8ee88e8548bb6492a2b5dfd26bf0834c81d38dc21d548e4fec82eae313c268"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

When using OpenAI hosted on Azure, streaming is slow and in big chunks.

## Cause

This is a Microsoft Azure issue. Some users have reported the following solutions:

- **Update Content Filtering Settings**:
  Inside [Azure AI Studio](https://ai.azure.com/), within "Shared resources" > "Content filters", create a new
  content filter and set the "Streaming mode (Preview)" under "Output filter" from "Default"
  to "Asynchronous Filter".

## Solution

You can use the [`smoothStream` transformation](/docs/ai-sdk-core/generating-text#smoothing-streams) to stream each word individually.

```tsx {6}
import { smoothStream, streamText } from 'ai';

const result = streamText({
  model,
  prompt,
  experimental_transform: smoothStream(),
});
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)