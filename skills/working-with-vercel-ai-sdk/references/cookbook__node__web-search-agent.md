---
title: Web Search Agent
description: Learn how to build an agent that has access to web with the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/web-search-agent"
docs_index: /llms.txt
tags:
  - node
  - tool use
  - agent
  - web
source: "https://ai-sdk.dev/cookbook/node/web-search-agent.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "a3ac78b94d8a9b2efd6bb1b352376cc23edf2f1e6f95cc11fdc7eeaae715b703"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

There are two approaches you can take to building a web search agent with the AI SDK:

1. Use a model that has native web-searching capabilities
2. Use a tool to access the web and return search results.

Provider-native search runs on the provider's infrastructure and returns sources alongside the generated response. Available search controls and pricing vary by provider; search can incur additional tool charges.

instead, by using a tool, you can achieve more flexibility and greater control over your search queries. It allows you to customize your search strategy, specify search parameters, and you can use it with any LLM that supports tool calling. This approach will incur additional costs for the search API you use, but gives you complete control over the search experience.

## Using native web-search

There are several models that offer native web-searching capabilities (Perplexity, OpenAI, Gemini). Let's look at how you could build a Web Search Agent across providers.

### OpenAI Responses API

OpenAI's Responses API has a built-in web search tool that can be used to search the web and return search results. This tool is called `web_search` and is accessed via the `openai` provider.

```ts
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

const { text, sources } = await generateText({
  model: 'openai/gpt-6-luna',
  prompt: 'What happened in San Francisco last week?',
  tools: {
    web_search: openai.tools.webSearch({}),
  },
});

console.log(text);
console.log(sources);
```

You can also use the `ToolLoopAgent` to build a web search agent with OpenAI. This following example shows how to extract query and sources from tool calls:

```ts
import { openai } from '@ai-sdk/openai';
import { ToolLoopAgent } from 'ai';

const agent = new ToolLoopAgent({
  model: 'openai/gpt-6-luna',
  tools: {
    web_search: openai.tools.webSearch({
      searchContextSize: 'low',
    }),
  },
});

const { text, sources, toolResults } = await agent.generate({
  prompt: 'What happened in San Francisco last week?',
});

// Access sources directly
console.log('Sources:', sources);

// Or extract query and sources from tool results
for (const toolResult of toolResults) {
  if (toolResult.toolName === 'web_search') {
    const { action, sources } = toolResult.output;
    console.log('Search query:', action.query);
    console.log('Sources:', sources);
  }
}
```

### Perplexity

Perplexity's Agent API offers presets that combine models with native tools such as web search. The `fast` preset can search the web and return citations through the `sources` property.

Install `@ai-sdk/perplexity` and set `PERPLEXITY_API_KEY` in your environment to use the provider directly:

```bash
pnpm add @ai-sdk/perplexity
```

```ts
import { perplexity } from '@ai-sdk/perplexity';
import { generateText } from 'ai';

const { text, sources } = await generateText({
  model: perplexity('fast'),
  prompt: 'What are the latest developments in quantum computing?',
});

console.log(text);
console.log(sources);
```

See the [Perplexity provider documentation](/providers/ai-sdk-providers/perplexity#agent-tools) for native tools, search filters, and Agent API options.

### Gemini

With compatible Gemini models, you can enable search grounding to give the model access to the latest information using Google search.

```ts
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text, sources, providerMetadata } = await generateText({
  model: 'google/gemini-3.8-flash',
  tools: {
    google_search: google.tools.googleSearch({}),
  },
  prompt:
    'List the top 5 San Francisco news from the past week.' +
    'You must include the date of each article.',
});

console.log(text);
console.log(sources);

// access the grounding metadata.
const metadata = providerMetadata?.google;
const groundingMetadata = metadata?.groundingMetadata;
const safetyRatings = metadata?.safetyRatings;
```

## Using tools

When using tools for web search, you have two options: use ready-made tools that integrate directly with the AI SDK, or build custom tools tailored to your specific needs.

Unlike the native web search examples where searching is built into the model, using web search tools requires multiple steps. The language model will make two generations - the first to call the relevant web search tool (extracting search queries from the context), and the second to process the results and generate a response. This multi-step process is handled automatically when you set `stopWhen: isStepCount(n)` to a value greater than 1.

By using `stopWhen`, you can automatically send tool results back to the
language model alongside the original question, enabling the model to respond
with information relevant to the user's query based on the search results.
This creates a seamless experience where the agent can search the web and
incorporate those findings into its response.

### Use ready-made tools

If you prefer a ready-to-use web search tool without building one from scratch, there are several options that integrate directly with the AI SDK.

#### Exa

Get your API key from the [Exa Dashboard](https://dashboard.exa.ai/api-keys).

First, install the Exa `webSearch` tool:

```bash
pnpm install @exalabs/ai-sdk
```

Then, you can import and pass it into `generateText`, `streamText`, or your agent:

```ts
import { generateText, isStepCount } from 'ai';
import { webSearch } from '@exalabs/ai-sdk';

const { text } = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'Tell me the latest developments in AI',
  tools: {
    webSearch: webSearch(),
  },
  stopWhen: isStepCount(3),
});

console.log(text);
```

For more configuration options and customization, see the [Exa AI SDK documentation](https://docs.exa.ai/reference/vercel).

#### Parallel Web

Get your API key from the

[Parallel Platform](https://parallel.ai)

.

First, install the Parallel Web AI SDK tools:

```bash
pnpm install @parallel-web/ai-sdk-tools
```

Then, you can import and pass the tools into `generateText`, `streamText`, or your agent. Parallel Web provides two tools: `searchTool` for web search and `extractTool` for extracting web page content:

```ts
import { generateText, isStepCount } from 'ai';
import { searchTool, extractTool } from '@parallel-web/ai-sdk-tools';

const { text } = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'When was Vercel Ship AI?',
  tools: {
    webSearch: searchTool,
    webExtract: extractTool,
  },
  stopWhen: isStepCount(3),
});

console.log(text);
```

#### Perplexity Search

Get your API key from the [Perplexity API Keys
page](https://www.perplexity.ai/account/api/keys).

First, install the Perplexity Search tool:

```bash
pnpm install @perplexity-ai/ai-sdk
```

Then, you can import and pass it into `generateText`, `streamText`, or your agent. Perplexity Search provides real-time web search with advanced filtering options including domain, language, date range, and recency filters:

```ts
import { generateText, isStepCount } from 'ai';
import { perplexitySearch } from '@perplexity-ai/ai-sdk';

const { text } = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  prompt:
    'What are the latest AI developments? Use search to find current information.',
  tools: {
    search: perplexitySearch(),
  },
  stopWhen: isStepCount(3),
});

console.log(text);
```

For more configuration options and customization, see the [Perplexity Search API documentation](https://docs.perplexity.ai/guides/search-quickstart).

#### Tavily

Get your API key from the [Tavily Dashboard](https://app.tavily.com).

First, install the `tavilySearch` tool:

```bash
pnpm install @tavily/ai-sdk
```

Then, you can import and pass it into `generateText`, `streamText`, or your agent:

```ts
import { generateText, isStepCount } from 'ai';
import { tavilySearch, tavilyExtract } from '@tavily/ai-sdk';

const { text } = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'When was the latest update to the AI SDK?',
  tools: {
    webSearch: tavilySearch(),
    webExtract: tavilyExtract(),
  },
  stopWhen: isStepCount(3),
});

console.log(text);
```

For more customization options over your agent's web-access functionality, visit the [Tavily AI SDK Documentation](https://docs.tavily.com/documentation/integrations/vercel).

#### You.com

Get your API key from the [You.com API Keys
page](https://you.com/platform/api-keys).

First, install the You.com AI SDK plugin:

```bash
pnpm install @youdotcom-oss/ai-sdk-plugin
```

Then, you can import and pass the tools into `generateText`, `streamText`, or your agent. You.com provides three tools: `youSearch` for real-time web search with advanced filtering, `youResearch` for deep research with cited sources and configurable effort (lite to exhaustive), and `youContents` for extracting webpage content in markdown or HTML:

```ts
import { generateText, isStepCount } from 'ai';
import {
  youSearch,
  youResearch,
  youContents,
} from '@youdotcom-oss/ai-sdk-plugin';

const { text } = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'Research the latest developments in quantum computing',
  tools: {
    search: youSearch(),
    research: youResearch(),
    extract: youContents(),
  },
  stopWhen: isStepCount(5),
});

console.log(text);
```

For more configuration options and customization, see the [You.com AI SDK Plugin documentation](https://github.com/youdotcom-oss/dx-toolkit/tree/main/packages/ai-sdk-plugin#readme).

### Build and use custom tools

For more control over your web search functionality, you can build custom tools using web scraping and crawling APIs. This approach allows you to customize search parameters, handle specific data formats, and integrate with specialized search services.

#### Exa

Let's look at how you could implement a search tool using Exa:

```bash
pnpm install exa-js
```

```ts
import { generateText, tool, isStepCount } from 'ai';
import { z } from 'zod';
import Exa from 'exa-js';

export const exa = new Exa(process.env.EXA_API_KEY);

export const webSearch = tool({
  description: 'Search the web for up-to-date information',
  inputSchema: z.object({
    query: z.string().min(1).max(100).describe('The search query'),
  }),
  execute: async ({ query }) => {
    const { results } = await exa.searchAndContents(query, {
      livecrawl: 'always',
      numResults: 3,
    });
    return results.map(result => ({
      title: result.title,
      url: result.url,
      content: result.text.slice(0, 1000), // take just the first 1000 characters
      publishedDate: result.publishedDate,
    }));
  },
});

const { text } = await generateText({
  model: "anthropic/claude-sonnet-5.5", // can be any model that supports tools
  prompt: 'What happened in San Francisco last week?',
  tools: {
    webSearch,
  },
  stopWhen: isStepCount(5),
});
```

#### Firecrawl

[Firecrawl](https://firecrawl.dev) provides an API for web scraping and crawling. Let's look at how you can build a custom scraping tool using Firecrawl:

```bash
pnpm install @mendable/firecrawl-js
```

```ts
import { generateText, tool, isStepCount } from 'ai';
import { z } from 'zod';
import FirecrawlApp from '@mendable/firecrawl-js';
import 'dotenv/config';

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

export const webSearch = tool({
  description: 'Search the web for up-to-date information',
  inputSchema: z.object({
    urlToCrawl: z
      .string()
      .url()
      .min(1)
      .max(100)
      .describe('The URL to crawl (including http:// or https://)'),
  }),
  execute: async ({ urlToCrawl }) => {
    const crawlResponse = await app.crawlUrl(urlToCrawl, {
      limit: 1,
      scrapeOptions: {
        formats: ['markdown', 'html'],
      },
    });
    if (!crawlResponse.success) {
      throw new Error(`Failed to crawl: ${crawlResponse.error}`);
    }
    return crawlResponse.data;
  },
});

const main = async () => {
  const { text } = await generateText({
    model: "anthropic/claude-sonnet-5.5", // can be any model that supports tools
    prompt: 'Get the latest blog post from vercel.com/blog',
    tools: {
      webSearch,
    },
    stopWhen: isStepCount(5),
  });
  console.log(text);
};

main();
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)