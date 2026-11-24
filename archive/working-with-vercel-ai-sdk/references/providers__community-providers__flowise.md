---
title: Flowise
description: Learn how to use the Flowise provider for the AI SDK.
url: "https://ai-sdk.dev/providers/community-providers/flowise"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/flowise.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "9738926ea71cde556887f17547775dfcb9878277a2c2e3dfd9cd4ed6c80e7c67"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The **[Flowise provider](https://github.com/ahmedrowaihi/flowise-ai-sdk-provider)** allows you to easily integrate [Flowise](https://flowiseai.com/) chatflows with your applications using the AI SDK.

## Setup

The Flowise provider is available in the `@ahmedrowaihi/flowise-vercel-ai-sdk-provider` module. You can install it with:

```bash
pnpm add @ahmedrowaihi/flowise-vercel-ai-sdk-provider
```

## Provider Instance

You can import the provider factory from `@ahmedrowaihi/flowise-vercel-ai-sdk-provider`:

```ts
import { createFlowiseProvider } from '@ahmedrowaihi/flowise-vercel-ai-sdk-provider';
```

## Quick Start

### Using a Reusable Provider

Create a file called `.env.local` and add your Flowise configuration:

```text
FLOWISE_BASE_URL=https://your-flowise-instance.com
FLOWISE_API_KEY=your_api_key_optional
```

```ts
import { createFlowiseProvider } from '@ahmedrowaihi/flowise-vercel-ai-sdk-provider';
import { generateText } from 'ai';

const flowise = createFlowiseProvider({
  baseUrl: process.env.FLOWISE_BASE_URL!,
  apiKey: process.env.FLOWISE_API_KEY,
});

const { text } = await generateText({
  model: flowise('your-chatflow-id'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

### Using a One-shot Model

```ts
import { createFlowiseModel } from '@ahmedrowaihi/flowise-vercel-ai-sdk-provider';
import { generateText } from 'ai';

const { text } = await generateText({
  model: createFlowiseModel({
    baseUrl: process.env.FLOWISE_BASE_URL!,
    apiKey: process.env.FLOWISE_API_KEY,
    chatflowId: 'your-chatflow-id',
  }),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

### Streaming Example

```ts
import { streamText } from 'ai';
import { createFlowiseProvider } from '@ahmedrowaihi/flowise-vercel-ai-sdk-provider';

const flowise = createFlowiseProvider({
  baseUrl: process.env.FLOWISE_BASE_URL!,
  apiKey: process.env.FLOWISE_API_KEY,
});

const result = streamText({
  model: flowise('your-chatflow-id'),
  prompt: 'Write a story about a robot learning to cook.',
});

return result.toDataStreamResponse();
```

## More Information

For more information and advanced usage, see the [Flowise provider documentation](https://github.com/ahmedrowaihi/flowise-ai-sdk-provider#readme).

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)