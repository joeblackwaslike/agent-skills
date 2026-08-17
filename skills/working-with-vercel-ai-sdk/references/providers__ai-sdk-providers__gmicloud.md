---
source: "https://ai-sdk.dev/providers/ai-sdk-providers/gmicloud.md"
fetched_at: "2026-08-17T04:48:04.925Z"
sha256: "5746c4b7b207828b991c2a2831ea91344dbaddedc8ebacbce67283359a14259d"
---

# GMI Cloud Provider

The [GMI Cloud](https://www.gmicloud.ai) provider offers access to open-weight language models through GMI Cloud's GPU inference platform, over an OpenAI-compatible API.

API keys can be obtained from the [GMI Cloud console](https://console.gmicloud.ai).

## Setup

The GMI Cloud provider is available via the `@ai-sdk/gmicloud` module. You can install it with:

<InstallPackages packages="@ai-sdk/gmicloud" />

## Provider Instance

You can import the default provider instance `gmicloud` from `@ai-sdk/gmicloud`:

```ts
import { gmicloud } from '@ai-sdk/gmicloud';
```

For custom configuration, you can import `createGmicloud` and create a provider instance with your settings:

```ts
import { createGmicloud } from '@ai-sdk/gmicloud';

const gmicloud = createGmicloud({
  apiKey: process.env.GMI_CLOUD_APIKEY ?? '',
});
```

You can use the following optional settings to customize the GMI Cloud provider instance:

- **baseURL** _string_

  Use a different URL prefix for API calls.
  The default prefix is `https://api.gmi-serving.com/v1`.

- **apiKey** _string_

  API key that is being sent using the `Authorization` header. It defaults to
  the `GMI_CLOUD_APIKEY` environment variable.

- **headers** _Record&lt;string,string&gt;_

  Custom headers to include in the requests.

- **fetch** _FetchFunction_

  Custom fetch implementation.

## Language Models

```ts
import { gmicloud } from '@ai-sdk/gmicloud';
import { generateText } from 'ai';

const { text } = await generateText({
  model: gmicloud('deepseek-ai/DeepSeek-V4-Flash-0731'),
  prompt: 'What is the capital of France?',
});
```

GMI Cloud serves an evolving catalog of open-weight models, so model ids are typed as `string`. Embedding and image models are not supported.

## Error diagnostics

GMI Cloud's edge reports a generic banner in `error.message` on rejections and nests the backend engine's diagnostic in `error.details`. This provider unwraps the nested diagnostic, so `AI_APICallError.message` carries the engine's reason (e.g. `The request is invalid: Invalid max_tokens value, the valid range of max_tokens is [1, 393216].`) instead of `Backend request failed with status 400`.


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
