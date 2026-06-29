---
source: "https://ai-sdk.dev/providers/community-providers/sap-ai.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "f8cbf5da95162fabe541f3302416030f44d7d083e24d71e9b65acc97809efcca"
---

# SAP AI Core Provider

[jerome-benoit/sap-ai-provider](https://github.com/jerome-benoit/sap-ai-provider) is a community provider for SAP AI Core built on the official **@sap-ai-sdk/orchestration** and **@sap-ai-sdk/foundation-models** packages.

Two npm packages are published from this repository:

- `@jerome-benoit/sap-ai-provider` - Language Model V4 for AI SDK 5.x & 6.x (recommended)
- `@jerome-benoit/sap-ai-provider-v2` - Language Model V2 for AI SDK 5.x

## Features

Both providers offer:

- **Dual API Support**: Choose between Orchestration API (with data masking, content filtering, document grounding, translation) or Foundation Models API (`logprobs`, `seed`, `dataSources`)
- **Tool calling** and **multi-modal input** (images)
- **Streaming support** for real-time text generation
- **Text embeddings** for RAG and semantic search

## Setup

### @jerome-benoit/sap-ai-provider (recommended)

<Tabs items={['pnpm', 'npm', 'yarn', 'bun']}>
  <Tab>
    <Snippet text="pnpm add @jerome-benoit/sap-ai-provider" dark />
  </Tab>
  <Tab>
    <Snippet text="npm install @jerome-benoit/sap-ai-provider" dark />
  </Tab>
  <Tab>
    <Snippet text="yarn add @jerome-benoit/sap-ai-provider" dark />
  </Tab>
  <Tab>
    <Snippet text="bun add @jerome-benoit/sap-ai-provider" dark />
  </Tab>
</Tabs>

### @jerome-benoit/sap-ai-provider-v2

<Tabs items={['pnpm', 'npm', 'yarn', 'bun']}>
  <Tab>
    <Snippet text="pnpm add @jerome-benoit/sap-ai-provider-v2" dark />
  </Tab>
  <Tab>
    <Snippet text="npm install @jerome-benoit/sap-ai-provider-v2" dark />
  </Tab>
  <Tab>
    <Snippet text="yarn add @jerome-benoit/sap-ai-provider-v2" dark />
  </Tab>
  <Tab>
    <Snippet text="bun add @jerome-benoit/sap-ai-provider-v2" dark />
  </Tab>
</Tabs>

Authentication is handled automatically via the `AICORE_SERVICE_KEY` environment variable (local) or `VCAP_SERVICES` (SAP BTP).

## Provider Instance

You can import the default provider instance `sapai` from `@jerome-benoit/sap-ai-provider`:

```ts
import { sapai } from '@jerome-benoit/sap-ai-provider';
```

If you need a customized setup, you can import `createSAPAIProvider` and create a provider instance with your settings:

```ts
import { createSAPAIProvider } from '@jerome-benoit/sap-ai-provider';

const sapai = createSAPAIProvider({
  resourceGroup: 'default',
  api: 'orchestration', // or 'foundation-models'
});
```

You can use the following optional settings to customize the SAP AI provider instance:

- **resourceGroup** _string_

  SAP AI Core resource group. Defaults to `'default'`.

- **deploymentId** _string_

  Specific deployment ID. If not provided, the SDK resolves deployment automatically.

- **api** _'orchestration' | 'foundation-models'_

  API to use. Defaults to `'orchestration'`. Can be overridden per model or per call via `providerOptions`.

- **name** _string_

  Provider name used as key in `providerOptions`. Defaults to `'sap-ai'`.

- **defaultSettings** _object_

  Default model settings including `modelParams`, `masking`, `filtering`, `grounding`, and `translation`.

## Language Models

You can create models that call the SAP AI Core API using the provider instance. The first argument is the model id. Model naming follows SAP AI Core conventions with vendor prefixes:

```ts
const model = sapai('gpt-4.1');
const claudeModel = sapai('anthropic--claude-3.5-sonnet');
const geminiModel = sapai('gemini-2.0-flash');
```

<Note>
  Model availability depends on your SAP AI Core tenant configuration and
  region.
</Note>

## Embedding Models

You can create models that call the SAP AI Core embeddings API using the `.embeddingModel()` factory method:

```ts
const model = sapai.embeddingModel('text-embedding-3-small');
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
