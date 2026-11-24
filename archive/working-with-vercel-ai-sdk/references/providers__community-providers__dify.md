---
title: Dify
description: Learn how to use the Dify provider for the AI SDK.
url: "https://ai-sdk.dev/providers/community-providers/dify"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/dify.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "1738284a47c5e49916687080f47a49bd16ce1d3f8f667ba7fc28122652f45f70"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The **[Dify provider](https://github.com/warmwind/dify-ai-provider)** allows you to easily integrate Dify's application workflow with your applications using the AI SDK.

## Setup

The Dify provider is available in the `dify-ai-provider` module. You can install it with:

```bash
npm install dify-ai-provider

# pnpm
pnpm add dify-ai-provider

# yarn
yarn add dify-ai-provider
```

## Provider Instance

You can import `difyProvider` from `dify-ai-provider` to create a provider instance:

```ts
import { difyProvider } from 'dify-ai-provider';
```

## Example

### Use dify.ai

```ts
import { generateText } from 'ai';
import { difyProvider } from 'dify-ai-provider';

const dify = difyProvider('dify-application-id', {
  responseMode: 'blocking',
  apiKey: 'dify-api-key',
});

const { text, providerMetadata } = await generateText({
  model: dify,
  messages: [{ role: 'user', content: 'Hello, how are you today?' }],
  headers: { 'user-id': 'test-user' },
});

const { conversationId, messageId } = providerMetadata.difyWorkflowData;
console.log(text);
console.log('conversationId', conversationId);
console.log('messageId', messageId);
```

### Use self-hosted Dify

```typescript
import { createDifyProvider } from 'dify-ai-provider';

const difyProvider = createDifyProvider({
  baseURL: 'your-base-url',
});

const dify = difyProvider('dify-application-id', {
  responseMode: 'blocking',
  apiKey: 'dify-api-key',
});
```

## Documentation

Please refer to the **[Dify provider documentation](https://github.com/warmwind/dify-ai-provider)** for more detailed information.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)