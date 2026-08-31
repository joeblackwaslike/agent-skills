---
source: "https://ai-sdk.dev/providers/ai-sdk-providers/zai.md"
fetched_at: "2026-08-31T10:43:45.904Z"
sha256: "90b05dfb3d68561434f2174347f3af03ad9b8493253a89d620d4db04e6e41776"
---

# Z.AI Provider

The [Z.AI](https://z.ai/) provider gives you access to GLM language and vision models through the Z.AI API.

API keys can be created in the [Z.AI API key console](https://z.ai/manage-apikey/apikey-list).

## Setup

The Z.AI provider is available through the `@ai-sdk/zai` package. Install it with:

<InstallPackages packages="@ai-sdk/zai" />

Set the `ZAI_API_KEY` environment variable:

```bash
ZAI_API_KEY=your-api-key
```

## Provider Instance

Import the default provider instance `zai` from `@ai-sdk/zai`:

```ts
import { zai } from '@ai-sdk/zai';
```

For custom configuration, use `createZai`:

```ts
import { createZai } from '@ai-sdk/zai';

const zai = createZai({
  apiKey: process.env.ZAI_API_KEY,
  baseURL: 'https://api.z.ai/api/paas/v4',
});
```

The provider accepts these optional settings:

- **apiKey** _string_

  API key sent in the `Authorization` header. It defaults to the `ZAI_API_KEY` environment variable.

- **baseURL** _string_

  URL prefix for API requests. It defaults to `https://api.z.ai/api/paas/v4`.

- **headers** _Record&lt;string, string&gt;_

  Additional request headers.

- **fetch** _FetchFunction_

  Custom fetch implementation, for example to intercept requests in middleware.

## Language Models

Create a language model by passing its model id to the provider:

```ts
import { zai } from '@ai-sdk/zai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: zai('glm-5.3'),
  prompt: 'Explain quantum entanglement in simple terms.',
});
```

Current model families include GLM 5, GLM 4.7, GLM 4.6, GLM 4.5, and the GLM vision models. Model availability changes over time; see the [Z.AI model documentation](https://docs.z.ai/guides/llm) for the current catalog.

The provider supports:

- text generation and streaming
- reasoning output and reasoning history
- function calling, including incremental tool-call streaming
- JSON object output
- URL-based image and video inputs on compatible vision models

## Provider Options

Z.AI-specific options can be passed through `providerOptions.zai`:

```ts
import { zai } from '@ai-sdk/zai';
import { generateText } from 'ai';

const result = await generateText({
  model: zai('glm-5.3'),
  prompt: 'Compare two approaches to implementing a rate limiter.',
  providerOptions: {
    zai: {
      thinking: { type: 'enabled', clearThinking: true },
      reasoningEffort: 'high',
      requestId: 'request-123456',
      userId: 'user-123456',
    },
  },
});
```

The following options are available:

- **doSample** _boolean_

  Enables sampling. When disabled, `temperature` and `topP` do not take effect.

- **thinking** _object_

  Controls thinking with `type: 'enabled' | 'disabled'`. Set `clearThinking` to `false` to retain reasoning from previous assistant messages.

- **reasoningEffort** _'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | 'max'_

  Controls reasoning effort on supported models.

- **toolStream** _boolean_

  Enables incremental function-call argument streaming on supported models.

- **requestId** _string_

  A caller-provided request id between 6 and 64 characters.

- **userId** _string_

  A non-sensitive end-user id between 6 and 128 characters.

## Streaming Tool Calls

Enable `toolStream` when you want supported GLM models to stream function-call arguments incrementally:

```ts
import { zai } from '@ai-sdk/zai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

const result = streamText({
  model: zai('glm-5.3'),
  prompt: 'What is the weather in San Francisco?',
  tools: {
    weather: tool({
      description: 'Get the weather for a city',
      inputSchema: z.object({ city: z.string() }),
    }),
  },
  providerOptions: {
    zai: { toolStream: true },
  },
});

for await (const part of result.fullStream) {
  console.log(part);
}
```


## Navigation

- [AI Gateway](/providers/ai-sdk-providers/ai-gateway)
- [xAI Grok](/providers/ai-sdk-providers/xai)
- [OpenAI](/providers/ai-sdk-providers/openai)
- [Azure OpenAI](/providers/ai-sdk-providers/azure)
- [Anthropic](/providers/ai-sdk-providers/anthropic)
- [Open Responses](/providers/ai-sdk-providers/open-responses)
- [Claude Platform on AWS](/providers/ai-sdk-providers/anthropic-aws)
- [Amazon Bedrock](/providers/ai-sdk-providers/amazon-bedrock)
- [Groq](/providers/ai-sdk-providers/groq)
- [Fal](/providers/ai-sdk-providers/fal)
- [AssemblyAI](/providers/ai-sdk-providers/assemblyai)
- [GMI Cloud](/providers/ai-sdk-providers/gmicloud)
- [DeepInfra](/providers/ai-sdk-providers/deepinfra)
- [Deepgram](/providers/ai-sdk-providers/deepgram)
- [Black Forest Labs](/providers/ai-sdk-providers/black-forest-labs)
- [Gladia](/providers/ai-sdk-providers/gladia)
- [LMNT](/providers/ai-sdk-providers/lmnt)
- [Google](/providers/ai-sdk-providers/google)
- [Hume](/providers/ai-sdk-providers/hume)
- [Google Vertex AI](/providers/ai-sdk-providers/google-vertex)
- [Rev.ai](/providers/ai-sdk-providers/revai)
- [Baseten](/providers/ai-sdk-providers/baseten)
- [Hugging Face](/providers/ai-sdk-providers/huggingface)
- [QuiverAI](/providers/ai-sdk-providers/quiverai)
- [Fish Audio](/providers/ai-sdk-providers/fish-audio)
- [Mistral AI](/providers/ai-sdk-providers/mistral)
- [Z.AI](/providers/ai-sdk-providers/zai)
- [Together.ai](/providers/ai-sdk-providers/togetherai)
- [Cohere](/providers/ai-sdk-providers/cohere)
- [Fireworks](/providers/ai-sdk-providers/fireworks)
- [Voyage AI](/providers/ai-sdk-providers/voyage)
- [DeepSeek](/providers/ai-sdk-providers/deepseek)
- [Moonshot AI](/providers/ai-sdk-providers/moonshotai)
- [Alibaba](/providers/ai-sdk-providers/alibaba)
- [MiniMax](/providers/ai-sdk-providers/minimax)
- [Cerebras](/providers/ai-sdk-providers/cerebras)
- [Replicate](/providers/ai-sdk-providers/replicate)
- [Prodia](/providers/ai-sdk-providers/prodia)
- [Perplexity](/providers/ai-sdk-providers/perplexity)
- [Luma](/providers/ai-sdk-providers/luma)
- [ByteDance](/providers/ai-sdk-providers/bytedance)
- [Kling AI](/providers/ai-sdk-providers/klingai)
- [ElevenLabs](/providers/ai-sdk-providers/elevenlabs)
- [Cartesia](/providers/ai-sdk-providers/cartesia)


[Full Sitemap](/sitemap.md)
