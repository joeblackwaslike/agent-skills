---
title: Provider Options
product: vercel
url: /docs/ai-gateway/models-and-providers/provider-options
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-options"
last_updated: 2026-06-01
type: conceptual
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/models-and-providers/automatic-caching
  - /docs/ai-gateway/models-and-providers/provider-timeouts
  - /docs/ai-gateway/models-and-providers/model-fallbacks
  - /docs/ai-gateway/authentication-and-byok/byok
summary: Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/provider-options.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "1b9cfa8d5e9fd2bf6ee05ec9fb9cc4b45f8f6fbe83c8b3bf573d2e76adde4371"
---

# Provider Options

AI Gateway can route your AI model requests across multiple AI providers. Each provider offers different models, pricing, and performance characteristics. By default, Vercel AI Gateway dynamically chooses the default providers to give you the best experience based on a combination of recent uptime and latency.

With the Gateway Provider Options however, you have control over the routing order and fallback behavior of the models.

> **💡 Note:** If you want to customize individual AI model provider settings rather than
> general AI Gateway behavior, please refer to the model-specific provider
> options in the [AI SDK
> documentation](https://ai-sdk.dev/docs/foundations/prompts#provider-options).

## Provider filtering, ordering, and sorting

You can use `order`, `only`, and `sort` in `providerOptions.gateway` to control which providers handle your requests, in what order, and how they are ranked.

```typescript
providerOptions: {
  gateway: {
    order: ['bedrock', 'anthropic'], // Try Bedrock first, then Anthropic
    only: ['bedrock', 'anthropic'],  // Only allow these two providers
  },
},
```

You can also use `sort` to rank providers by a performance or cost metric. The gateway sorts providers by the chosen metric and tries them in that order:

```typescript
providerOptions: {
  gateway: {
    sort: 'cost', // Sort by cost, latency ('ttft'), or throughput ('tps')
  },
},
```

For full details, examples, and provider metadata output, see [Provider Filtering, Ordering & Sorting](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering).

## Automatic caching

You can use `caching: 'auto'` in `providerOptions.gateway` to let AI Gateway automatically apply the appropriate caching strategy based on the provider. This is useful for providers like Anthropic and MiniMax that require explicit cache markers.

```typescript
providerOptions: {
  gateway: {
    caching: 'auto',
  },
},
```

For full details, supported providers, and examples across all APIs, see [Automatic Caching](/docs/ai-gateway/models-and-providers/automatic-caching).

## Provider timeouts

You can set per-provider timeouts to trigger fast failover when a provider is slow to respond. See the dedicated [Provider Timeouts](/docs/ai-gateway/models-and-providers/provider-timeouts) documentation.

## Model fallbacks

For model-level failover strategies that try backup models when your primary model fails or is unavailable, see the dedicated [Model Fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks) documentation.

## Advanced configuration

### Combining AI Gateway provider options with provider-specific options

You can combine AI Gateway provider options with provider-specific options. This allows you to control both the routing behavior and provider-specific settings in the same request:

```typescript filename="app/api/chat/route.ts"
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-opus-4.7',
    prompt,
    providerOptions: {
      anthropic: {
        thinkingBudget: 0.001,
      },
      gateway: {
        order: ['vertex'],
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

In this example:

- We're using an Anthropic model (e.g. Claude 4 Sonnet) but accessing it through Vertex AI
- The Anthropic-specific options still apply to the model:
  - `thinkingBudget` sets a cost limit of $0.001 per request for the Claude model
- You can read more about provider-specific options in the [AI SDK documentation](https://ai-sdk.dev/docs/foundations/prompts#provider-options)

### Request-scoped BYOK

You can pass your own provider credentials on a per-request basis using the `byok` option in `providerOptions.gateway`. This allows you to use your existing provider accounts for specific requests without configuring credentials in the dashboard.

```typescript filename="app/api/chat/route.ts" {9-13}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'anthropic/claude-opus-4.7',
    prompt,
    providerOptions: {
      gateway: {
        byok: {
          anthropic: [{ apiKey: process.env.ANTHROPIC_API_KEY }],
        },
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

For detailed information about credential structures, multiple credentials, and usage with the Chat Completions API, see the [BYOK documentation](/docs/ai-gateway/authentication-and-byok/byok#request-scoped-byok).

### Reasoning

For models that support reasoning (also known as "thinking"), you can use
`providerOptions` to configure reasoning behavior. The example below shows
how to control the computational effort and summary detail level when using OpenAI's `gpt-oss-120b` model.

For more details on reasoning support across different models and providers, see the [AI SDK providers documentation](https://ai-sdk.dev/providers/ai-sdk-providers), including [OpenAI](https://ai-sdk.dev/providers/ai-sdk-providers/openai#reasoning), [DeepSeek](https://ai-sdk.dev/providers/ai-sdk-providers/deepseek#reasoning), and [Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic#reasoning).

```typescript filename="app/api/chat/route.ts" {9-12}
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'openai/gpt-oss-120b',
    prompt,
    providerOptions: {
      openai: {
        reasoningEffort: 'high',
        reasoningSummary: 'detailed',
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

**Note:** For `openai/gpt-5.5` models, you must set both `reasoningEffort` and `reasoningSummary` in `providerOptions` to receive reasoning output.

```typescript
providerOptions: {
  openai: {
    reasoningEffort: 'high', // or 'minimal', 'low', 'medium', 'none'
    reasoningSummary: 'detailed', // or 'auto', 'concise'
  },
}
```

## Available providers

You can view the available models for a provider
in the [**Model List**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fmodels\&title=Go+to+Model+List) section under
the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in your Vercel dashboard sidebar
or in the public [models page](https://vercel.com/ai-gateway/models).

| **Slug**     | **Name**          | **Website**                                                      |
| ------------ | ----------------- | ---------------------------------------------------------------- |
| `alibaba`    | Alibaba Cloud     | [alibabacloud.com](https://www.alibabacloud.com)                 |
| `anthropic`  | Anthropic         | [anthropic.com](https://anthropic.com)                           |
| `arcee-ai`   | Arcee AI          | [arcee.ai](https://arcee.ai)                                     |
| `azure`      | Azure             | [ai.azure.com](https://ai.azure.com/)                            |
| `baseten`    | Baseten           | [baseten.co](https://www.baseten.co/)                            |
| `bedrock`    | Amazon Bedrock    | [aws.amazon.com/bedrock](https://aws.amazon.com/bedrock)         |
| `bfl`        | Black Forest Labs | [bfl.ai](https://bfl.ai/)                                        |
| `blackbox`   | Blackbox          | [blackbox.ai](https://www.blackbox.ai)                           |
| `bytedance`  | ByteDance         | [byteplus.com](https://www.byteplus.com/en)                      |
| `cerebras`   | Cerebras          | [cerebras.net](https://www.cerebras.net)                         |
| `claudeaws`  | Claude Platform on AWS | [aws.amazon.com/claude-platform](https://aws.amazon.com/claude-platform/) |
| `cohere`     | Cohere            | [cohere.com](https://cohere.com)                                 |
| `crusoe`     | Crusoe            | [crusoe.ai](https://crusoe.ai)                                   |
| `deepinfra`  | DeepInfra         | [deepinfra.com](https://deepinfra.com)                           |
| `deepseek`   | DeepSeek          | [deepseek.ai](https://deepseek.ai)                               |
| `fireworks`  | Fireworks         | [fireworks.ai](https://fireworks.ai)                             |
| `google`     | Google            | [ai.google.dev](https://ai.google.dev/)                          |
| `groq`       | Groq              | [groq.com](https://groq.com)                                     |
| `inception`  | Inception         | [inceptionlabs.ai](https://inceptionlabs.ai)                     |
| `inceptron`  | Inceptron         | [inceptron.io](https://inceptron.io)                             |
| `interfaze`  | Interfaze         | [interfaze.ai](https://interfaze.ai)                             |
| `klingai`    | Kling AI          | [klingai.com/](http://klingai.com/)                              |
| `meituan`    | Meituan           | [longcat.ai](https://longcat.ai/)                                |
| `minimax`    | MiniMax           | [minimax.io](https://www.minimax.io/)                            |
| `mistral`    | Mistral           | [mistral.ai](https://mistral.ai)                                 |
| `moonshotai` | Moonshot AI       | [moonshot.ai](https://www.moonshot.ai)                           |
| `morph`      | Morph             | [morphllm.com](https://morphllm.com)                             |
| `nebius`     | Nebius            | [nebius.com](https://nebius.com)                                 |
| `novita`     | Novita            | [novita.ai](https://novita.ai/)                                  |
| `openai`     | OpenAI            | [openai.com](https://openai.com)                                 |
| `parasail`   | Parasail          | [parasail.io](https://www.parasail.io)                           |
| `perplexity` | Perplexity        | [perplexity.ai](https://www.perplexity.ai)                       |
| `prodia`     | Prodia            | [prodia.com](https://www.prodia.com)                             |
| `quiverai`   | QuiverAI          | [quiver.ai](https://quiver.ai)                                   |
| `recraft`    | Recraft           | [recraft.ai](https://www.recraft.ai)                             |
| `sambanova`  | SambaNova         | [sambanova.ai](https://sambanova.ai/)                            |
| `stepfun`    | StepFun           | [platform.stepfun.ai](https://platform.stepfun.ai)               |
| `streamlake` | StreamLake        | [streamlake.ai](https://streamlake.ai/)                          |
| `togetherai` | Together AI       | [together.ai](https://together.ai/)                              |
| `vertex`     | Vertex AI         | [cloud.google.com/vertex-ai](https://cloud.google.com/vertex-ai) |
| `voyage`     | Voyage AI         | [voyageai.com](https://www.voyageai.com)                         |
| `xiaomi`     | Xiaomi            | [mimo.xiaomi.com](https://mimo.xiaomi.com)                       |
| `xai`        | xAI               | [x.ai](https://x.ai)                                             |
| `zai`        | Z.ai              | [z.ai](https://z.ai/model-api)                                   |

> **💡 Note:** Provider availability may vary by model. Some models may only be available
> through specific providers or may have different capabilities depending on the
> provider used.


---

[View full sitemap](/docs/sitemap)
