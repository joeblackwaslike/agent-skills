---
title: Zhipu AI (Z.AI)
description: Learn how to use the Zhipu (Z.AI) provider.
url: "https://ai-sdk.dev/providers/community-providers/zhipu"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/zhipu.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "1b9e42d9287d44e01bd7073028d32f74011217f128ba39713c01d351264f7b47"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[Zhipu AI Provider](https://github.com/Xiang-CH/zhipu-ai-provider) is a community provider for the [AI SDK](/). It enables seamless integration with **GLM** and Embedding Models provided on [bigmodel.cn](https://bigmodel.cn/) or [z.ai](https://docs.z.ai/) by [ZhipuAI](https://www.zhipuai.cn/).

## Setup

```bash
pnpm add zhipu-ai-provider
```

Set up your `.env` file / environment with your API key.

```bash
ZHIPU_API_KEY=<your-api-key>
```

## Provider Instance

You can import the default provider instance `zhipu` from `zhipu-ai-provider` (This automatically reads the API key from the environment variable `ZHIPU_API_KEY`):

```ts
import { zhipu } from 'zhipu-ai-provider';
```

Alternatively, you can create a provider instance with custom configuration with `createZhipu` (do this if you want to use the non-Chinese [Z.AI](https://docs.z.ai/guides) infrastructure):

```ts
import { createZhipu } from 'zhipu-ai-provider';

const zhipu = createZhipu({
  baseURL: 'https://api.z.ai/api/paas/v4',
  apiKey: 'your-api-key',
});
```

You can use the following optional settings to customize the Zhipu provider instance:

- **baseURL**: *string*
  - Use a different URL prefix for API calls, e.g. to use proxy servers. The default prefix is `https://open.bigmodel.cn/api/paas/v4`.

- **apiKey**: *string*
  - Your API key for Zhipu [BigModel Platform](https://bigmodel.cn/). If not provided, the provider will attempt to read the API key from the environment variable `ZHIPU_API_KEY`.

- **headers**: *Record\<string, string>*
  - Custom headers to include in the requests.

## Example

```ts
import { generateText } from 'ai';
import { zhipu } from 'zhipu-ai-provider';

const { text } = await generateText({
  model: zhipu('glm-4-plus'),
  prompt: 'Why is the sky blue?',
});

console.log(text);
```

## Documentation

- **[Zhipu documentation](https://bigmodel.cn/dev/welcome)**
- **[Z.AI documentation](https://docs.z.ai/)**

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)