---
source: "https://ai-sdk.dev/providers/community-providers/crosshatch.md"
fetched_at: "2026-06-11T15:39:44.005Z"
sha256: "92aa5ef5cd58c5f119e01ee6b40415ac069c65434b12afcdfe99026d28e09f20"
---

# Crosshatch Provider

<Note type="warning">
  This community provider is not yet compatible with AI SDK 5. Please wait for
  the provider to be updated or consider using an [AI SDK 5 compatible
  provider](/providers/ai-sdk-providers).
</Note>

The [Crosshatch](https://crosshatch.io) provider supports secure inference from popular language models with permissioned access to data users share, giving responses personalized with complete user context.

It creates language model objects that can be used with the `generateText` and `streamText` functions, and supports structured data generation with [`Output`](/docs/reference/ai-sdk-core/output).

## Setup

The Crosshatch provider is available via the `@crosshatch/ai-provider` module.
You can install it with:

<Tabs items={['pnpm', 'npm', 'yarn', 'bun']}>
  <Tab>
    <Snippet text="pnpm add @crosshatch/ai-provider" dark />
  </Tab>
  <Tab>
    <Snippet text="npm install @crosshatch/ai-provider" dark />
  </Tab>
  <Tab>
    <Snippet text="yarn add @crosshatch/ai-provider" dark />
  </Tab>

  <Tab>
    <Snippet text="bun add @crosshatch/ai-provider" dark />
  </Tab>
</Tabs>

The [Crosshatch](https://crosshatch.io/) provider supports all of their available models such as OpenAI's GPT and Anthropic's Claude. This provider also supports the querying interface for controlling Crosshatch's custom data integration behaviors. This provider wraps the existing underlying providers ([@ai-sdk/openai](/providers/ai-sdk-providers/openai), [@ai-sdk/anthropic](/providers/ai-sdk-providers/openai).

### Credentials

The Crosshatch provider is authenticated by user-specific tokens, enabling permissioned access to personalized inference.

You can obtain synthetic and test user tokens from the [your Crosshatch developer dashboard](https://platform.crosshatch.io/).

Production user tokens are provisioned and accessed with the [Link SDK](https://www.npmjs.com/package/@crosshatch/link) using your Crosshatch developer client id.

## Provider Instance

To create a Crosshatch provider instance, use the `createCrosshatch` function:

```ts
import createCrosshatch from '@crosshatch/ai-provider';
```

## Language Models

You can create [Crosshatch models](https://docs.crosshatch.io/endpoints/ai#supported-model-providers) using a provider instance.

```ts
import { createCrosshatch } from '@crosshatch/ai-provider';
const crosshatch = createCrosshatch();
```

To create a model instance, call the provider instance and specify the model you would like to use in the first argument. In the second argument, specify the user auth token, desired context, and model arguments.
You can use Crosshatch to get generated text based on permissioned user context and your favorite language model.

### Example: Generate Text with Context

This example uses `gpt-4o-mini` to generate text.

```ts
import { generateText } from 'ai';
import createCrosshatch from '@crosshatch/ai-provider':
const crosshatch = createCrosshatch();

const { text } = await generateText({
  model: crosshatch.languageModel("gpt-4o-mini", {
    token: 'YOUR_ACCESS_TOKEN',
    replace: {
      restaurants: {
        select: ["entity_name", "entity_city", "entity_region"],
        from: "personalTimeline",
        where: [
          { field: "event", op: "=", value: "confirmed" },
          { field: "entity_subtype2", op: "=", value: "RESTAURANTS" }
        ],
        groupby: ["entity_name", "entity_city", "entity_region"],
        orderby: "count DESC",
        limit: 5
      }
    }
  }),
  system: `The user recently ate at these restaurants: {restaurants}`,
  messages: [{role: "user", content: "Where should I stay in Paris?"}]
});
```

### Example: Recommend Items based on Context

Use crosshatch to re-rank items based on recent user purchases.

```ts
import { streamText, Output } from 'ai';
import createCrosshatch from `@crosshatch/ai-provider`
const crosshatch = createCrosshatch();

const itemSummaries = [...]; // list of items
const ids = (itemSummaries?.map(({ itemId }) => itemId) ?? []) as string[];

const { elementStream } = streamText({
  output: Output.array({
    element: jsonSchema<{ id: string; reason: string }>({
      type: "object",
      properties: {
        id: { type: "string", enum: ids },
        reason: { type: "string", description: "Explain your ranking." },
      },
    }),
  }),
  model: crosshatch.languageModel("gpt-4o-mini", {
    token,
    replace: {
      "orders": {
        select: ["originalTimestamp", "entity_name", "order_total", "order_summary"],
        from: "personalTimeline",
        where: [{ field: "event", op: "=", value: "purchased" }],
        orderBy: [{ field: "originalTimestamp", dir: "desc" }],
        limit: 5,
      },
    },
  }),
  system: `Rerank the following items based on alignment with users recent purchases {orders}`,
  messages: [{role: "user", content: "Heres a list of item: ${JSON.stringify(itemSummaries)"},],
})
```


## Navigation

- [Writing a Custom Provider](/providers/community-providers/custom-providers)
- [A2A](/providers/community-providers/a2a)
- [ACP (Agent Client Protocol)](/providers/community-providers/acp)
- [Aihubmix](/providers/community-providers/aihubmix)
- [AI/ML API](/providers/community-providers/aimlapi)
- [Anthropic Vertex](/providers/community-providers/anthropic-vertex-ai)
- [Automatic1111](/providers/community-providers/automatic1111)
- [Azure AI](/providers/community-providers/azure-ai)
- [Browser AI](/providers/community-providers/browser-ai)
- [Claude Code](/providers/community-providers/claude-code)
- [Cloudflare AI Gateway](/providers/community-providers/cloudflare-ai-gateway)
- [Cloudflare Workers AI](/providers/community-providers/cloudflare-workers-ai)
- [Codex CLI](/providers/community-providers/codex-cli)
- [Crosshatch](/providers/community-providers/crosshatch)
- [Dify](/providers/community-providers/dify)
- [Firemoon](/providers/community-providers/firemoon)
- [FriendliAI](/providers/community-providers/friendliai)
- [Gemini CLI](/providers/community-providers/gemini-cli)
- [Helicone](/providers/community-providers/helicone)
- [Inflection AI](/providers/community-providers/inflection-ai)
- [Jina AI](/providers/community-providers/jina-ai)
- [LangDB](/providers/community-providers/langdb)
- [Letta](/providers/community-providers/letta)
- [llama.cpp](/providers/community-providers/llama-cpp)
- [LlamaGate](/providers/community-providers/llamagate)
- [MCP Sampling AI Provider](/providers/community-providers/mcp-sampling)
- [Mem0](/providers/community-providers/mem0)
- [MiniMax](/providers/community-providers/minimax)
- [Mixedbread](/providers/community-providers/mixedbread)
- [Ollama](/providers/community-providers/ollama)
- [OpenCode](/providers/community-providers/opencode-sdk)
- [OpenRouter](/providers/community-providers/openrouter)
- [Portkey](/providers/community-providers/portkey)
- [Qwen](/providers/community-providers/qwen)
- [React Native Apple](/providers/community-providers/react-native-apple)
- [Requesty](/providers/community-providers/requesty)
- [Runpod](/providers/community-providers/runpod)
- [SambaNova](/providers/community-providers/sambanova)
- [SAP AI Core](/providers/community-providers/sap-ai)
- [Sarvam](/providers/community-providers/sarvam)
- [Soniox](/providers/community-providers/soniox)
- [Spark](/providers/community-providers/spark)
- [Supermemory](/providers/community-providers/supermemory)
- [Voyage AI](/providers/community-providers/voyage-ai)
- [Zhipu AI (Z.AI)](/providers/community-providers/zhipu)
- [vectorstores](/providers/community-providers/vectorstores)
- [Codex CLI (App Server)](/providers/community-providers/codex-app-server)
- [Apertis](/providers/community-providers/apertis)
- [OLLM](/providers/community-providers/ollm)
- [Cencori](/providers/community-providers/cencori)
- [Hindsight](/providers/community-providers/hindsight)
- [Nia](/providers/community-providers/nia)
- [ZeroEntropy](/providers/community-providers/zeroentropy)
- [Flowise](/providers/community-providers/flowise)


[Full Sitemap](/sitemap.md)
