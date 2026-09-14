---
source: "https://ai-sdk.dev/providers/community-providers/telnyx.md"
fetched_at: "2026-09-14T09:43:19.624Z"
sha256: "80c6e1199ba8c5b5216f8b64bb88a856106c0b9c7118b77dfad6d945e1fef695"
---

# Telnyx

[Telnyx](https://telnyx.com/) provides an AI SDK provider for the [Vercel AI SDK](https://ai-sdk.dev), giving developers access to chat models, embeddings, speech-to-text, and text-to-speech through a single package.

The Telnyx provider is a good fit if you want:

- **One package for multiple AI capabilities**: chat, embeddings, transcription, and speech generation
- **OpenAI-compatible model access**: use Telnyx-hosted models through a familiar API pattern
- **Speech support in the same provider**: combine text and voice workflows in one integration
- **Simple setup**: standard API key configuration with the AI SDK

Learn more in the [Telnyx documentation](https://developers.telnyx.com/docs/inference/getting-started).

## Setup

The `@telnyx/ai-sdk-provider` package (v2.0.0+) supports AI SDK 7 and the Provider V4 specification.

Install it alongside AI SDK 7:

<Tabs items={['pnpm', 'npm', 'yarn', 'bun']}>
  <Tab>
    <Snippet text="pnpm add @telnyx/ai-sdk-provider ai@^7 zod" dark />
  </Tab>
  <Tab>
    <Snippet text="npm install @telnyx/ai-sdk-provider ai@^7 zod" dark />
  </Tab>
  <Tab>
    <Snippet text="yarn add @telnyx/ai-sdk-provider ai@^7 zod" dark />
  </Tab>

  <Tab>
    <Snippet text="bun add @telnyx/ai-sdk-provider ai@^7 zod" dark />
  </Tab>
</Tabs>

Set your Telnyx API key as an environment variable:

```bash
export TELNYX_API_KEY="your_api_key_here"
```

## Provider Instance

To create a Telnyx provider instance, use the `createTelnyx` function:

```typescript
import { createTelnyx } from '@telnyx/ai-sdk-provider';

const telnyx = createTelnyx({
  apiKey: process.env.TELNYX_API_KEY,
});
```

You can also use the default `telnyx` export when `TELNYX_API_KEY` is set in your environment.

## Examples

### `generateText`

```typescript
import { telnyx } from '@telnyx/ai-sdk-provider';
import { generateText } from 'ai';

const { text } = await generateText({
  model: telnyx('Qwen/Qwen3-235B-A22B'),
  prompt: 'Explain WebRTC in simple terms.',
});

console.log(text);
```

### `embed`

```typescript
import { telnyx } from '@telnyx/ai-sdk-provider';
import { embed } from 'ai';

const { embedding } = await embed({
  model: telnyx.embeddingModel('thenlper/gte-large'),
  value: 'What is WebRTC?',
});

console.log(embedding);
```

### `experimental_transcribe`

```typescript
import { telnyx } from '@telnyx/ai-sdk-provider';
import { experimental_transcribe as transcribe } from 'ai';
import { readFile } from 'node:fs/promises';

const result = await transcribe({
  model: telnyx.transcriptionModel('distil-whisper/distil-large-v2'),
  audio: await readFile('./audio.wav'),
});

console.log(result.text);
```

### `experimental_generateSpeech`

```typescript
import { telnyx } from '@telnyx/ai-sdk-provider';
import { experimental_generateSpeech as generateSpeech } from 'ai';

const { audio } = await generateSpeech({
  model: telnyx.speech('Telnyx.NaturalHD.astra'),
  text: 'Hello from Telnyx!',
  voice: 'Telnyx.NaturalHD.astra',
});

await audio.writeToFile('./speech.mp3');
```

## Additional Resources

- [Telnyx Provider Repository](https://github.com/team-telnyx/ai-sdk-provider)
- [NPM Package](https://www.npmjs.com/package/@telnyx/ai-sdk-provider)
- [Telnyx AI Inference Docs](https://developers.telnyx.com/docs/inference/getting-started)
- [Telnyx Model Catalog](https://developers.telnyx.com/docs/inference/models)
- [Telnyx Speech Docs](https://developers.telnyx.com/docs/tts-stt/overview)


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
- [Interfaze](/providers/community-providers/interfaze)
- [Telnyx](/providers/community-providers/telnyx)
- [Flowise](/providers/community-providers/flowise)


[Full Sitemap](/sitemap.md)
