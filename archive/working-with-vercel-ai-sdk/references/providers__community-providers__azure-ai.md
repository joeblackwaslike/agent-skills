---
title: Azure AI
description: "Learn how to use the @quail-ai/azure-ai-provider for the AI SDK."
url: "https://ai-sdk.dev/providers/community-providers/azure-ai"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/azure-ai.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "601eac70f4d80a6786876a632d5985dc76e24c195331210d825274c8186787d2"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The **[Quail-AI/azure-ai-provider](https://github.com/QuailAI/azure-ai-provider)** enables unofficial integration with Azure-hosted language models that use Azure's native APIs instead of the standard OpenAI API format.

## Language Models

This provider works with any model in the Azure AI Foundry that is compatible with the Azure-Rest AI-inference API.

### Models Tested:

- DeepSeek-R1
- Llama 3.3-70B Instruct
- Cohere-command-r-08-2024

## Setup

### Installation

Install the provider via npm:

```bash
npm i @quail-ai/azure-ai-provider
```

## Provider Instance

Create an Azure AI resource and set up your endpoint URL and API key. Add the following to your `.env` file:

```bash
AZURE_API_ENDPOINT=https://<your-resource>.services.ai.azure.com/models
AZURE_API_KEY=<your-api-key>
```

Import `createAzure` from the package to create your provider instance:

```ts
import { createAzure } from '@quail-ai/azure-ai-provider';

const azure = createAzure({
  endpoint: process.env.AZURE_API_ENDPOINT,
  apiKey: process.env.AZURE_API_KEY,
});
```

## Basic Usage

Generate text using the Azure custom provider:

```ts
import { generateText } from 'ai';

const { text } = await generateText({
  model: azure('your-deployment-name'),
  prompt: 'Write a story about a robot.',
});
```

## Status

> ✅ Chat Completions: Working with both streaming and non-streaming responses\
> ⚠️ Tool Calling: Functionality highly dependent on model choice\
> ⚠️ Embeddings: Implementation present but untested

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)