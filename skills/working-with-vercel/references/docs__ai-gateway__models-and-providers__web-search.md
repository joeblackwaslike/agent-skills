---
title: Web Search
product: vercel
url: /docs/ai-gateway/models-and-providers/web-search
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/web-search"
last_updated: 2026-08-26
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced
summary: Enable AI models to search the web and retrieve source-grounded data using built-in tools through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/web-search.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "9284311f9525f34ca888d947bce912a457380480fd0949c1a290944f08729be7"
---

# Web Search

AI Gateway provides built-in search tools that let AI models access current web information and source-grounded data. Use them when you need information that may not be in the model's training data.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Exa web search free through August 31 on AI Gateway and eve](https://vercel.com/changelog/exa-web-search-free-through-august-31-on-ai-gateway-and-eve?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fweb-search&source_site=vercel-docs&relationship=related)
- [Web Search Agent](https://ai-sdk.dev/cookbook/node/web-search-agent?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fweb-search&source_site=vercel-docs&relationship=related)
- [Groq](https://ai-sdk.dev/providers/ai-sdk-providers/groq?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fweb-search&source_site=vercel-docs&relationship=related)
- [xAI Grok](https://ai-sdk.dev/providers/ai-sdk-providers/xai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fweb-search&source_site=vercel-docs&relationship=related)
- [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fweb-search&source_site=vercel-docs&relationship=related)
- [Azure OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/azure?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fweb-search&source_site=vercel-docs&relationship=related)
- [Use Perplexity Web Search with Vercel AI Gateway](https://vercel.com/blog/use-perplexity-web-search-with-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fweb-search&source_site=vercel-docs&relationship=related)
- [Parallel's Web Search and tools are live on Vercel](https://vercel.com/changelog/parallel-web-search-is-now-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fweb-search&source_site=vercel-docs&relationship=related)
- [Access Perplexity Web Search on Vercel AI Gateway with any model](https://vercel.com/changelog/access-perplexity-web-search-on-vercel-ai-gateway-with-any-model?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fweb-search&source_site=vercel-docs&relationship=related)
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fweb-search&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/web-search.graph.md](/docs/ai-gateway/models-and-providers/web-search.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fweb-search&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

AI Gateway supports two types of web search:

- **Search for all providers**: Use [Perplexity Search](#using-perplexity-search), [Exa Search](#using-exa-search), [Tako Search](#using-tako-search), or [Parallel Search](#using-parallel-search) with any model regardless of provider. This gives you consistent web search behavior across different models.
- **Provider-specific search**: Use native web search tools from [Anthropic](#anthropic-web-search), [OpenAI](#openai-web-search), [Google](#google-web-search), or [SpaceXAI](#spacexai-web-search). These tools are optimized for their respective providers and may offer [additional features](#provider-specific-search).

## Using Perplexity Search

The `perplexitySearch` tool can be used with any model regardless of the model provider or creator. This makes it a flexible option when you want consistent web search behavior across different models, or when you want to use web search with a model whose provider doesn't offer native web search capabilities.

To use Perplexity Search, import `gateway` from `ai` and pass `gateway.tools.perplexitySearch()` to the `tools` parameter. When the model needs current information, it calls the tool and AI Gateway routes the request to [Perplexity's search API](https://docs.perplexity.ai/guides/search-quickstart).

> **💡 Note:** Perplexity web search requests are charged at $5 per 1,000 requests. See
> [Perplexity's pricing](https://docs.perplexity.ai/getting-started/pricing) for
> more details.

#### streamText

```typescript filename="perplexity-web-search.ts" {9-11}
import { gateway, streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'openai/gpt-5.6-sol', // Works with any model, not just Perplexity
    prompt,
    tools: {
      perplexity_search: gateway.tools.perplexitySearch(),
    },
  });

  for await (const part of result.fullStream) {
    if (part.type === 'text-delta') {
      process.stdout.write(part.text);
    } else if (part.type === 'tool-call') {
      console.log('Tool call:', part.toolName);
    } else if (part.type === 'tool-result') {
      console.log('Search results received');
    }
  }

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="perplexity-web-search.ts" {9-11}
import { gateway, generateText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'openai/gpt-5.6-sol', // Works with any model, not just Perplexity
    prompt,
    tools: {
      perplexity_search: gateway.tools.perplexitySearch(),
    },
  });

  return Response.json({ text });
}
```

### Perplexity parameters

You can configure the `perplexitySearch` tool with these parameters:

- `maxResults`: Number of results to return (1-20). Defaults to 10.
- `maxTokens`: Total token budget across all results. Defaults to 25,000, max 1,000,000.
- `maxTokensPerPage`: Tokens extracted per webpage. Defaults to 2,048.
- `country`: ISO 3166-1 alpha-2 country code (e.g., `'US'`, `'GB'`) for regional results.
- `searchLanguageFilter`: ISO 639-1 language codes (e.g., `['en', 'fr']`). Max 10 codes.
- `searchDomainFilter`: Domains to include (e.g., `['reuters.com']`) or exclude with `-` prefix (e.g., `['-reddit.com']`). Max 20 domains. Cannot mix allowlist and denylist.
- `searchRecencyFilter`: Filter by content recency. Values: `'day'`, `'week'`, `'month'`, or `'year'`.

#### streamText

```typescript filename="perplexity-web-search-params.ts" {9-19}
import { gateway, streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'openai/gpt-5.6-sol',
    prompt,
    tools: {
      perplexity_search: gateway.tools.perplexitySearch({
        maxResults: 5,
        maxTokens: 50000,
        maxTokensPerPage: 2048,
        country: 'US',
        searchLanguageFilter: ['en'],
        searchDomainFilter: ['reuters.com', 'bbc.com', 'nytimes.com'],
        searchRecencyFilter: 'week',
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="perplexity-web-search-params.ts" {9-19}
import { gateway, generateText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'openai/gpt-5.6-sol',
    prompt,
    tools: {
      perplexity_search: gateway.tools.perplexitySearch({
        maxResults: 5,
        maxTokens: 50000,
        maxTokensPerPage: 2048,
        country: 'US',
        searchLanguageFilter: ['en'],
        searchDomainFilter: ['reuters.com', 'bbc.com', 'nytimes.com'],
        searchRecencyFilter: 'week',
      }),
    },
  });

  return Response.json({ text });
}
```

## Using Exa Search

The `exaSearch` tool can be used with any model regardless of the model provider or creator. [Exa](https://exa.ai/) returns web results and extracted content for agent workflows that need current information, domain filters, date filters, and token-efficient excerpts.

To use Exa Search, import `gateway` from `ai` and pass `gateway.tools.exaSearch()` to the `tools` parameter. When the model needs current information, it calls the tool and AI Gateway routes the request to [Exa's Search API](https://exa.ai/docs/reference/search-api-guide-for-coding-agents).

> **💡 Note:** Exa web search requests are charged at $7 per 1,000 requests. Each request
> includes up to 10 results. Additional requested results beyond 10 are charged
> at $1 per 1,000 additional results.

#### streamText

```typescript filename="exa-web-search.ts" {9-11}
import { gateway, streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'openai/gpt-5.6-sol', // Works with any model
    prompt,
    tools: {
      exa_search: gateway.tools.exaSearch(),
    },
  });

  for await (const part of result.fullStream) {
    if (part.type === 'text-delta') {
      process.stdout.write(part.text);
    } else if (part.type === 'tool-call') {
      console.log('Tool call:', part.toolName);
    } else if (part.type === 'tool-result') {
      console.log('Search results received');
    }
  }

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="exa-web-search.ts" {9-11}
import { gateway, generateText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'openai/gpt-5.6-sol', // Works with any model
    prompt,
    tools: {
      exa_search: gateway.tools.exaSearch(),
    },
  });

  return Response.json({ text });
}
```

### Exa parameters

You can configure the `exaSearch` tool with these parameters:

- `type`: Search mode. Values: `'auto'` (default), `'fast'`, or `'instant'`.
- `numResults`: Maximum number of results to return (1-100). Defaults to 10.
- `category`: Content category. Values: `'company'`, `'people'`, `'research paper'`, `'news'`, `'personal site'`, or `'financial report'`.
- `userLocation`: Two-letter ISO country code, such as `'US'`, for location-aware search.
- `includeDomains`: List of domains to restrict search results to.
- `excludeDomains`: List of domains to exclude from search results.
- `startPublishedDate`: Only return results published after this ISO 8601 date.
- `endPublishedDate`: Only return results published before this ISO 8601 date.
- `contents`: Controls extracted page content and freshness.
  - `text`: Return page text. You can set `maxCharacters`, `includeHtmlTags`, `verbosity`, `includeSections`, and `excludeSections`.
  - `highlights`: Return concise excerpts. You can set `query` and `maxCharacters`.
  - `maxAgeHours`: Maximum age of cached content in hours.
  - `livecrawlTimeout`: Timeout for live crawling in milliseconds.
  - `subpages`: Number of related subpages to crawl.
  - `subpageTarget`: Target page or pages for subpage crawling.
  - `extras`: Extract links or image links from pages with `links` and `imageLinks`.

#### streamText

```typescript filename="exa-web-search-params.ts" {9-20}
import { gateway, streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'openai/gpt-5.6-sol',
    prompt,
    tools: {
      exa_search: gateway.tools.exaSearch({
        type: 'fast',
        numResults: 5,
        category: 'news',
        includeDomains: ['reuters.com', 'bbc.com', 'nytimes.com'],
        contents: {
          highlights: true,
          maxAgeHours: 24,
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="exa-web-search-params.ts" {9-20}
import { gateway, generateText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'openai/gpt-5.6-sol',
    prompt,
    tools: {
      exa_search: gateway.tools.exaSearch({
        type: 'fast',
        numResults: 5,
        category: 'news',
        includeDomains: ['reuters.com', 'bbc.com', 'nytimes.com'],
        contents: {
          highlights: true,
          maxAgeHours: 24,
        },
      }),
    },
  });

  return Response.json({ text });
}
```

This initial AI Gateway integration supports Exa's standard Search modes and content extraction controls. Deep synthesis modes and generated summaries are not exposed yet because they have separate pricing.

For more details on search parameters and API options, see the [Exa Search API documentation](https://exa.ai/docs/reference/search-api-guide-for-coding-agents).

## Using Tako Search

The `takoSearch` tool searches the web and Tako's curated, real-time knowledge
graph in one call. It returns token-efficient web excerpts and knowledge graph
results backed by structured data, source attribution, and embed-ready
visualizations. Use it when your agent needs access to authoritative, real-time
finance, sports, weather, macroeconomics, and politics data or results from the
web. Set `sources.data.includeContents` to return the raw structured data that
backs the data results.

To use Tako Search, import `gateway` from `ai` and pass
`gateway.tools.takoSearch()` to `tools`:

```typescript filename="tako-search.ts" {9-18}
import { gateway, generateText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'openai/gpt-5.6-sol',
    prompt,
    tools: {
      tako_search: gateway.tools.takoSearch({
        effort: 'fast',
        sources: {
          data: { count: 2 },
          web: { count: 2 },
        },
      }),
    },
  });

  return Response.json({ text });
}
```

> **💡 Note:** Tako Search costs $7 per 1,000 instant or fast requests and $12 per 1,000 deep
> requests. `sources.data.includeContents` adds variable export surcharges based
> on the requested rows and underlying data source. Guide agents to search without
> it first, then inspect each card's `content.export_pricing` before exporting.
> See [Contents pricing](https://docs.tako.com/documentation/integrating-tako/contents/pricing)
> for details.

### Tako parameters

You can configure the `takoSearch` tool with these parameters:

- `effort`: Retrieval depth. Values: `'instant'` (cached, lowest latency),
  `'fast'` (default), or `'deep'` (broader retrieval with reranking, billed at
  the higher request rate).
- `sources`: Omit it to search both curated `data` and live `web`. When set,
  only the source keys present are searched.
- `sources.web`: Configure web results.
  - `count`: Maximum web results (1-20).
  - `includeDomains` / `excludeDomains`: Only return, or drop, results from
    these bare domains. Up to 20 each.
  - `publishedAfter` / `publishedBefore`: Keep results published on or after,
    or on or before, this `YYYY-MM-DD` date.
  - `highlights`: Return query-relevant passages as each result's snippet
    instead of the opening text of the page. Defaults to `true`.
  - `snippetMaxChars`: Character cap on each result's snippet. Maximum 20,000.
  - `includeContents`: Inline each page's extracted full text.
    `articleContentMaxChars` caps it, defaulting to 30,000 (maximum 1,000,000).
- `sources.data`: Configure knowledge graph results.
  - `count`: Maximum data results (1-20). Defaults to 5. The free row
    allowance is per result, so raising `count` raises both the rows you get
    and the baseline you pay.
  - `includeContents`: Inline each card's underlying rows in `content.dataset`
    as typed, unit-labeled columns. This is the parameter that adds row charges.
  - `maxRows`: Row cap per result. Omit it and each result returns the free
    allowance only (20 rows) with `truncated: true`. You pay for rows actually
    returned, so a value above the series length costs the series length. Each
    card reports its own ceiling in `content.export_pricing.max_rows_ceiling`.
  - `contentFormat`: Serialization for inlined card data. Values:
    `'json_compact'` (default), `'json_records'`, `'csv'`, or `'card_json'`.
  - `nodeIds`: Data Graph node IDs to prioritize. Up to 20.
  - `strict`: Only return cards matching `nodeIds`. Requires at least one
    `nodeIds` value.
- `includeRelated`: Number of related search suggestions to return (1-20).
- `location`: End-user `{ latitude, longitude }` coordinates for localized results.
- `countryCode`: ISO 3166-1 alpha-2 country code, such as `'US'`.
- `locale`: BCP-47 locale, such as `'en-US'`.
- `timezone`: IANA timezone, such as `'America/New_York'`.

AI Gateway applies options you set in `takoSearch()` as developer defaults, overriding model-generated values.

For the complete input and output schema, see the [AI SDK AI Gateway reference](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#tako-search). For search behavior, data cards, and Tako-specific options, see the [Tako Search documentation](https://docs.tako.com/documentation/integrating-tako/search/for-coding-agent).

## Using AI Gateway search tools with Chat Completions

Use AI Gateway server tools from the OpenAI-compatible Chat Completions API. AI
Gateway executes the search, adds the results to the model context, and returns
the final answer in the same response.

Choose the search provider by adding one server tool to `tools`:

| Tool type | Search provider | Required config field |
| --- | --- | --- |
| `vercel:exa_search` | Exa | `query` |
| `vercel:parallel_search` | Parallel | `objective` |
| `vercel:perplexity_search` | Perplexity | `query` |
| `vercel:tako_search` | Tako | `query` |

Put static tool settings in `config`. Use snake case for config keys. AI Gateway
uses these values as developer defaults and overrides model-generated values.

For example, this request requires an Exa search before the model answers:

```bash
curl https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
    "messages": [
      {
        "role": "user",
        "content": "Summarize Vercel AI Gateway in one sentence."
      }
    ],
    "tools": [
      {
        "type": "vercel:exa_search",
        "config": {
          "query": "Vercel AI Gateway",
          "type": "instant",
          "num_results": 1
        }
      }
    ],
    "tool_choice": "required",
    "max_tokens": 128
  }'
```

Use `tool_choice: "auto"` to let the model decide whether to search. Use
`"required"` when the request must make an initial search. Do not use a named
function `tool_choice` for server tools.

AI Gateway executes server tools internally. The final Chat Completions response
has `finish_reason: "stop"` and does not include client-facing `tool_calls` or raw
search results. Inspect `choices[0].message.provider_metadata.gateway.gatewayToolCalls`
for successful search-call counts and the gateway metadata for aggregate cost.

Use distinct names for your own function tools. Do not define a client function
named `exa_search`, `parallel_search`, `perplexity_search`, or `tako_search` in a
request that includes the corresponding AI Gateway server tool.

## Using Parallel Search

The `parallelSearch` tool can be used with any model regardless of the model provider or creator. [Parallel AI](https://parallel.ai/) provides LLM-optimized web search that extracts relevant excerpts from web pages, making it ideal for research tasks and information retrieval.

To use Parallel Search, import `gateway` from `ai` and pass `gateway.tools.parallelSearch()` to the `tools` parameter. When the model needs current information, it calls the tool and AI Gateway routes the request to [Parallel's search API](https://docs.parallel.ai/search/search-quickstart).

> **💡 Note:** Parallel web search requests are charged at $5 per 1,000 requests (includes up
> to 10 results per request). Additional results beyond 10 are charged at $1 per
> 1,000 additional results.

#### streamText

```typescript filename="parallel-web-search.ts" {9-11}
import { gateway, streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-opus-5', // Works with any model
    prompt,
    tools: {
      parallel_search: gateway.tools.parallelSearch(),
    },
  });

  for await (const part of result.fullStream) {
    if (part.type === 'text-delta') {
      process.stdout.write(part.text);
    } else if (part.type === 'tool-call') {
      console.log('Tool call:', part.toolName);
    } else if (part.type === 'tool-result') {
      console.log('Search results received');
    }
  }

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="parallel-web-search.ts" {9-11}
import { gateway, generateText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'anthropic/claude-opus-5', // Works with any model
    prompt,
    tools: {
      parallel_search: gateway.tools.parallelSearch(),
    },
  });

  return Response.json({ text });
}
```

### Parallel parameters

You can configure the `parallelSearch` tool with these parameters:

- `mode`: Search mode preset. Values: `'one-shot'` (comprehensive results with longer excerpts, default) or `'agentic'` (concise, token-efficient results for multi-step workflows).
- `maxResults`: Maximum number of results to return (1-20). Defaults to 10.
- `searchQueries`: Optional list of keyword search queries to supplement the objective.
- `sourcePolicy`: Controls which domains and date ranges to include or exclude.
  - `includeDomains`: List of domains to restrict search results to (e.g., `['arxiv.org', 'nature.com']`).
  - `excludeDomains`: List of domains to exclude from search results.
  - `afterDate`: Only return results published after this date (format: `YYYY-MM-DD`).
- `excerpts`: Controls result excerpt length.
  - `maxCharsPerResult`: Maximum characters per result excerpt.
  - `maxCharsTotal`: Maximum total characters across all result excerpts.
- `fetchPolicy`: Controls content freshness.
  - `maxAgeSeconds`: Maximum age of cached content in seconds for time-sensitive queries.

#### streamText

```typescript filename="parallel-web-search-params.ts" {9-21}
import { gateway, streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-opus-5',
    prompt,
    tools: {
      parallel_search: gateway.tools.parallelSearch({
        mode: 'one-shot',
        maxResults: 5,
        sourcePolicy: {
          includeDomains: ['arxiv.org', 'nature.com', 'science.org'],
          afterDate: '2025-01-01',
        },
        excerpts: {
          maxCharsPerResult: 5000,
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="parallel-web-search-params.ts" {9-21}
import { gateway, generateText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'anthropic/claude-opus-5',
    prompt,
    tools: {
      parallel_search: gateway.tools.parallelSearch({
        mode: 'one-shot',
        maxResults: 15,
        sourcePolicy: {
          includeDomains: ['arxiv.org', 'nature.com', 'science.org'],
          afterDate: '2025-01-01',
        },
        excerpts: {
          maxCharsPerResult: 5000,
        },
      }),
    },
  });

  return Response.json({ text });
}
```

For more details on search parameters and API options, see the [Parallel AI Search documentation](https://docs.parallel.ai/search/search-quickstart).

## Provider-specific search

Use native web search tools from Anthropic, OpenAI, Google, or SpaceXAI. These tools are optimized for their respective providers and may offer additional features.

> **💡 Note:** Pricing for provider-specific web search tools depends on the model you use.
> See the Web Search price column on the [model detail
> pages](/ai-gateway/models) for exact pricing.

### Anthropic web search

For Anthropic models, you can use the native [web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) provided by the `@ai-sdk/anthropic` package. Import `anthropic` from `@ai-sdk/anthropic` and pass `anthropic.tools.webSearch_20250305()` to the `tools` parameter. The tool returns source information including titles and URLs, which you can access through the `source` event type in the stream.

#### streamText

```typescript filename="anthropic-web-search.ts" {10-12}
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-opus-5',
    prompt,
    tools: {
      web_search: anthropic.tools.webSearch_20250305(),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="anthropic-web-search.ts" {10-12}
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'anthropic/claude-opus-5',
    prompt,
    tools: {
      web_search: anthropic.tools.webSearch_20250305(),
    },
  });

  return Response.json({ text });
}
```

#### Anthropic parameters

The following parameters are supported:

- `maxUses`: Maximum number of web searches Claude can perform during the conversation.
- `allowedDomains`: Optional list of domains Claude is allowed to search. If provided, searches will be restricted to these domains.
- `blockedDomains`: Optional list of domains Claude should avoid when searching.
- `userLocation`: Optional user location information to provide geographically relevant search results.

#### streamText

```typescript filename="anthropic-web-search-params.ts" {10-23}
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-opus-5',
    prompt,
    tools: {
      web_search: anthropic.tools.webSearch_20250305({
        maxUses: 3,
        allowedDomains: ['techcrunch.com', 'wired.com'],
        blockedDomains: ['example-spam-site.com'],
        userLocation: {
          type: 'approximate',
          country: 'US',
          region: 'California',
          city: 'San Francisco',
          timezone: 'America/Los_Angeles',
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="anthropic-web-search-params.ts" {10-23}
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'anthropic/claude-opus-5',
    prompt,
    tools: {
      web_search: anthropic.tools.webSearch_20250305({
        maxUses: 3,
        allowedDomains: ['techcrunch.com', 'wired.com'],
        blockedDomains: ['example-spam-site.com'],
        userLocation: {
          type: 'approximate',
          country: 'US',
          region: 'California',
          city: 'San Francisco',
          timezone: 'America/Los_Angeles',
        },
      }),
    },
  });

  return Response.json({ text });
}
```

For more details on using the Anthropic Messages API directly, see the [Anthropic advanced features](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced#web-search) documentation.

### OpenAI web search

For OpenAI models, you can use the native [web search tool](https://platform.openai.com/docs/guides/tools-web-search) provided by the `@ai-sdk/openai` package. Import `openai` from `@ai-sdk/openai` and pass `openai.tools.webSearch({})` to the `tools` parameter.

#### streamText

```typescript filename="openai-web-search.ts" {10-12}
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'openai/gpt-5.6-sol',
    prompt,
    tools: {
      web_search: openai.tools.webSearch({}),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="openai-web-search.ts" {10-12}
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'openai/gpt-5.6-sol',
    prompt,
    tools: {
      web_search: openai.tools.webSearch({}),
    },
  });

  return Response.json({ text });
}
```

### Google web search

For Google Gemini models, you can use [Grounding with Google Search](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-google-search). Google offers two providers: Google Vertex and Google AI Studio. Choose the one that matches your setup. The Google Search tool returns source information including titles and URLs, which you can access through the `source` event type in the stream.

#### Google Vertex

Import `vertex` from `@ai-sdk/google-vertex` and pass `vertex.tools.googleSearch({})` to the `tools` parameter. For users who need zero data retention, see [Enterprise web search](#enterprise-web-search) below.

#### streamText

```typescript filename="google-vertex-web-search.ts" {10-12}
import { streamText } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'google/gemini-3.1-pro-preview',
    prompt,
    tools: {
      google_search: vertex.tools.googleSearch({}),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="google-vertex-web-search.ts" {10-12}
import { generateText } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'google/gemini-3.1-pro-preview',
    prompt,
    tools: {
      google_search: vertex.tools.googleSearch({}),
    },
  });

  return Response.json({ text });
}
```

#### Enterprise web search

For users who need zero data retention, you can use [Enterprise Web Grounding](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/grounding/web-grounding-enterprise) instead. Pass `vertex.tools.enterpriseWebSearch({})` to the `tools` parameter.

> **💡 Note:** Enterprise web search uses indexed content that is a subset of the full web.
> Use Google search for more up-to-date and comprehensive results.

#### streamText

```typescript filename="enterprise-web-grounding.ts" {10-12}
import { streamText } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'google/gemini-3.1-pro-preview',
    prompt,
    tools: {
      enterprise_web_search: vertex.tools.enterpriseWebSearch({}),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="enterprise-web-grounding.ts" {10-12}
import { generateText } from 'ai';
import { vertex } from '@ai-sdk/google-vertex';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'google/gemini-3.1-pro-preview',
    prompt,
    tools: {
      enterprise_web_search: vertex.tools.enterpriseWebSearch({}),
    },
  });

  return Response.json({ text });
}
```

#### Google AI Studio

Import `google` from `@ai-sdk/google` and pass `google.tools.googleSearch({})` to the `tools` parameter.

#### streamText

```typescript filename="google-ai-studio-web-search.ts" {10-12}
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'google/gemini-3.1-pro-preview',
    prompt,
    tools: {
      google_search: google.tools.googleSearch({}),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="google-ai-studio-web-search.ts" {10-12}
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'google/gemini-3.1-pro-preview',
    prompt,
    tools: {
      google_search: google.tools.googleSearch({}),
    },
  });

  return Response.json({ text });
}
```

### SpaceXAI web search

For SpaceXAI Grok models, you can use the native web search tool provided by the `@ai-sdk/xai` package. Import `xai` from `@ai-sdk/xai` and pass `xai.tools.webSearch({})` to the `tools` parameter. The tool returns source information including titles and URLs, which you can access through the `source` event type in the stream.

#### streamText

```typescript filename="xai-web-search.ts" {10-12}
import { streamText } from 'ai';
import { xai } from '@ai-sdk/xai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'spacexai/grok-4.20-non-reasoning',
    prompt,
    tools: {
      web_search: xai.tools.webSearch({}),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="xai-web-search.ts" {10-12}
import { generateText } from 'ai';
import { xai } from '@ai-sdk/xai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'spacexai/grok-4.20-non-reasoning',
    prompt,
    tools: {
      web_search: xai.tools.webSearch({}),
    },
  });

  return Response.json({ text });
}
```

#### SpaceXAI parameters

The following parameters are supported:

- `allowedDomains`: Optional list of domains to restrict searches to (max 5). Cannot be combined with `excludedDomains`.
- `excludedDomains`: Optional list of domains to exclude from searches (max 5). Cannot be combined with `allowedDomains`.
- `enableImageSearch`: Let the model use image search as a separate mode.
- `enableImageUnderstanding`: Let the model analyze images found during the search.

#### streamText

```typescript filename="xai-web-search-params.ts" {10-15}
import { streamText } from 'ai';
import { xai } from '@ai-sdk/xai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'spacexai/grok-4.20-non-reasoning',
    prompt,
    tools: {
      web_search: xai.tools.webSearch({
        allowedDomains: ['arxiv.org', 'openai.com'],
        enableImageUnderstanding: true,
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

#### generateText

```typescript filename="xai-web-search-params.ts" {10-15}
import { generateText } from 'ai';
import { xai } from '@ai-sdk/xai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const { text } = await generateText({
    model: 'spacexai/grok-4.20-non-reasoning',
    prompt,
    tools: {
      web_search: xai.tools.webSearch({
        allowedDomains: ['arxiv.org', 'openai.com'],
        enableImageUnderstanding: true,
      }),
    },
  });

  return Response.json({ text });
}
```


---

[View full sitemap](/docs/sitemap)
