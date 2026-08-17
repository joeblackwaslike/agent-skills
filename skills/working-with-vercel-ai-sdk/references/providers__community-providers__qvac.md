---
source: "https://ai-sdk.dev/providers/community-providers/qvac.md"
fetched_at: "2026-08-17T04:48:04.925Z"
sha256: "17fd1401ba554edcb1bc29d88061ef2a3bc63b7568346c2fa95854e31239b7c5"
---

# QVAC Provider

[QVAC](https://qvac.tether.io) is an open-source, cross-platform runtime for local-first, peer-to-peer AI — LLMs, embeddings, transcription, translation, speech, and image generation, all running on the user's own hardware.

[`@qvac/ai-sdk-provider`](https://www.npmjs.com/package/@qvac/ai-sdk-provider) is a branded wrapper around [`@ai-sdk/openai-compatible`](https://www.npmjs.com/package/@ai-sdk/openai-compatible) that points at a local `qvac serve openai` HTTP server and re-exports QVAC's typed model metadata.

<Note>
  This provider talks to a local OpenAI-compatible server. Install
  [`@qvac/cli`](https://www.npmjs.com/package/@qvac/cli) and start it with `qvac
  serve openai` before using the provider.
</Note>

## Setup

The QVAC provider is available in the `@qvac/ai-sdk-provider` module. You can install it with:

<Tabs items={['pnpm', 'npm', 'yarn', 'bun']}>
  <Tab>
    <Snippet
      text="pnpm add @qvac/ai-sdk-provider ai @ai-sdk/openai-compatible"
      dark
    />
  </Tab>
  <Tab>
    <Snippet
      text="npm install @qvac/ai-sdk-provider ai @ai-sdk/openai-compatible"
      dark
    />
  </Tab>
  <Tab>
    <Snippet
      text="yarn add @qvac/ai-sdk-provider ai @ai-sdk/openai-compatible"
      dark
    />
  </Tab>
  <Tab>
    <Snippet
      text="bun add @qvac/ai-sdk-provider ai @ai-sdk/openai-compatible"
      dark
    />
  </Tab>
</Tabs>

`ai` and `@ai-sdk/openai-compatible` are peer dependencies — install them alongside.

## Provider Instance

Import `createQvac` from `@qvac/ai-sdk-provider` and create a provider instance pointing at your running `qvac serve openai`:

```ts
import { createQvac } from '@qvac/ai-sdk-provider';

const qvac = createQvac({
  baseURL: 'http://127.0.0.1:11434/v1', // match your `qvac serve` port
  apiKey: 'qvac', // anything non-empty; serve does not validate
});
```

## Language Models

You can create models by passing a `qvac serve` alias to the provider instance:

```ts
import { createQvac } from '@qvac/ai-sdk-provider';
import { generateText } from 'ai';

const qvac = createQvac({
  baseURL: 'http://127.0.0.1:11434/v1',
  apiKey: 'qvac',
});

const { text } = await generateText({
  model: qvac('qwen3.5-0.8b'),
  prompt: 'Write a haiku about local-first AI.',
});

console.log(text);
```

## Additional Resources

- [QVAC](https://qvac.tether.io)
- [npm Package](https://www.npmjs.com/package/@qvac/ai-sdk-provider)


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
- [Crusoe](/providers/community-providers/crusoe)
- [Neon AI Gateway](/providers/community-providers/neon-ai-gateway)
- [QVAC](/providers/community-providers/qvac)
- [Flowise](/providers/community-providers/flowise)


[Full Sitemap](/sitemap.md)
