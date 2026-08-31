---
source: "https://ai-sdk.dev/providers/ai-sdk-providers/cerebras.md"
fetched_at: "2026-08-31T10:43:45.904Z"
sha256: "e061cb10f24a1cdefb02d484de5d0db5e070400f3af80576c7bfecb2818368ff"
---

# Cerebras Provider

The [Cerebras](https://cerebras.ai) provider offers access to powerful language models through the Cerebras API, including their high-speed inference capabilities powered by Wafer-Scale Engines and CS-3 systems.

API keys can be obtained from the [Cerebras Platform](https://cloud.cerebras.ai).

## Setup

The Cerebras provider is available via the `@ai-sdk/cerebras` module. You can install it with:

<InstallPackages packages="@ai-sdk/cerebras" />

## Provider Instance

You can import the default provider instance `cerebras` from `@ai-sdk/cerebras`:

```ts
import { cerebras } from '@ai-sdk/cerebras';
```

For custom configuration, you can import `createCerebras` and create a provider instance with your settings:

```ts
import { createCerebras } from '@ai-sdk/cerebras';

const cerebras = createCerebras({
  apiKey: process.env.CEREBRAS_API_KEY ?? '',
});
```

You can use the following optional settings to customize the Cerebras provider instance:

- **baseURL** _string_

  Use a different URL prefix for API calls.
  The default prefix is `https://api.cerebras.ai/v1`.

- **apiKey** _string_

  API key that is being sent using the `Authorization` header. It defaults to
  the `CEREBRAS_API_KEY` environment variable.

- **headers** _Record&lt;string,string&gt;_

  Custom headers to include in the requests.

- **fetch** _(input: RequestInfo, init?: RequestInit) => Promise&lt;Response&gt;_

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.

## Language Models

You can create language models using a provider instance:

```ts
import { cerebras } from '@ai-sdk/cerebras';
import { generateText } from 'ai';

const { text } = await generateText({
  model: cerebras('gpt-oss-120b'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

Cerebras language models can be used in the `streamText` function
(see [AI SDK Core](/docs/ai-sdk-core)).

You can create Cerebras language models using a provider instance. The first argument is the model ID, e.g. `gpt-oss-120b`:

```ts
const model = cerebras('gpt-oss-120b');
```

You can also use the `.languageModel()` and `.chat()` methods:

```ts
const model = cerebras.languageModel('gpt-oss-120b');
const model = cerebras.chat('gpt-oss-120b');
```

### Reasoning Models

Cerebras offers reasoning models including `gpt-oss-120b` and `gemma-4-31b` that generate intermediate thinking tokens before their final response. The reasoning output is streamed through the standard AI SDK reasoning parts.

For `gpt-oss-120b`, you can control the reasoning depth using the `reasoningEffort` provider option:

```ts
import { cerebras } from '@ai-sdk/cerebras';
import { streamText } from 'ai';

const result = streamText({
  model: cerebras('gpt-oss-120b'),
  providerOptions: {
    cerebras: {
      reasoningEffort: 'medium',
    },
  },
  prompt: 'How many "r"s are in the word "strawberry"?',
});

for await (const part of result.stream) {
  if (part.type === 'reasoning') {
    console.log('Reasoning:', part.text);
  } else if (part.type === 'text-delta') {
    process.stdout.write(part.textDelta);
  }
}
```

See [AI SDK UI: Chatbot](/docs/ai-sdk-ui/chatbot#reasoning) for more details on how to integrate reasoning into your chatbot.

### Provider Options

The following optional provider options are available for Cerebras language models:

- **parallelToolCalls** _boolean_

  Whether to enable parallel function calling during tool use. Defaults to `true`.

- **logprobs** _boolean_

  Whether to return log probabilities for generated tokens. Defaults to `false`.

- **topLogprobs** _number_

  Number of most likely tokens to return at each token position. Accepts values from `0` through `20`. Requires `logprobs` to be `true`.

- **logitBias** _Record&lt;string, number&gt;_

  Maps token IDs to bias values from `-100` through `100`.

- **serviceTier** _'auto' | 'default' | 'flex' | 'priority'_

  Controls request priority. Availability depends on your account and endpoint.

- **reasoningEffort** _'none' | 'low' | 'medium' | 'high'_

  Controls the amount of reasoning performed by supported models. Supported values and defaults depend on the model.

- **reasoningFormat** _'none' | 'parsed' | 'text_parsed' | 'raw' | 'hidden'_

  Controls how reasoning content appears in the response. Format support depends on the model.

- **prediction** _&#123; type: 'content'; content: string | Array&lt;&#123; type: 'text'; text: string &#125;&gt; &#125;_

  Supplies predicted output that can accelerate requests where most of the response is already known.

- **promptCacheKey** _string_

  Routes related requests to the same prompt cache. The value can contain up to 1024 characters and requires account-level enablement.

- **user** _string_

  A unique identifier representing your end-user, which can help with monitoring and abuse detection.

- **strictJsonSchema** _boolean_

  Whether to use strict JSON schema validation. When `true`, the model uses constrained decoding to guarantee schema compliance. Defaults to `true`.

For example:

```ts
import {
  cerebras,
  type CerebrasLanguageModelChatOptions,
} from '@ai-sdk/cerebras';
import { generateText } from 'ai';

const result = await generateText({
  model: cerebras('gpt-oss-120b'),
  prompt: 'Explain why the sky is blue.',
  providerOptions: {
    cerebras: {
      reasoningEffort: 'low',
      reasoningFormat: 'parsed',
      promptCacheKey: 'conversation-123',
    } satisfies CerebrasLanguageModelChatOptions,
  },
});
```

## Model Capabilities

| Model          | Image Input | Object Generation | Tool Usage | Tool Streaming | Reasoning |
| -------------- | ----------- | ----------------- | ---------- | -------------- | --------- |
| `gpt-oss-120b` | <Cross />   | <Check />         | <Check />  | <Check />      | <Check /> |
| `gemma-4-31b`  | <Check />   | <Check />         | <Check />  | <Check />      | <Check /> |


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
