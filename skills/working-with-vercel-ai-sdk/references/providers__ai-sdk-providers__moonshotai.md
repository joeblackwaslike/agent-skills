---
source: "https://ai-sdk.dev/providers/ai-sdk-providers/moonshotai.md"
fetched_at: "2026-08-17T04:48:04.925Z"
sha256: "cf7335a86f508ce07d2289a14b4ec7ef4b5d6fcf1992979844e9ac1a7ec76e8a"
---

# Moonshot AI Provider

The [Moonshot AI](https://www.moonshot.ai) provider offers access to powerful language models through the Moonshot API, including the Kimi series of models with reasoning capabilities.

API keys can be obtained from the [Moonshot Platform](https://platform.moonshot.ai).

## Setup

The Moonshot AI provider is available via the `@ai-sdk/moonshotai` module. You can install it with:

<InstallPackages packages="@ai-sdk/moonshotai" />

## Provider Instance

You can import the default provider instance `moonshotai` from `@ai-sdk/moonshotai`:

```ts
import { moonshotai } from '@ai-sdk/moonshotai';
```

For custom configuration, you can import `createMoonshotAI` and create a provider instance with your settings:

```ts
import { createMoonshotAI } from '@ai-sdk/moonshotai';

const moonshotai = createMoonshotAI({
  apiKey: process.env.MOONSHOT_API_KEY ?? '',
});
```

You can use the following optional settings to customize the Moonshot AI provider instance:

- **baseURL** _string_

  Use a different URL prefix for API calls.
  The default prefix is `https://api.moonshot.ai/v1`

- **apiKey** _string_

  API key that is being sent using the `Authorization` header. It defaults to
  the `MOONSHOT_API_KEY` environment variable

- **headers** _Record&lt;string,string&gt;_

  Custom headers to include in the requests

- **fetch** _(input: RequestInfo, init?: RequestInit) => Promise&lt;Response&gt;_

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation

## Language Models

You can create language models using a provider instance:

```ts
import { moonshotai } from '@ai-sdk/moonshotai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: moonshotai('kimi-k3'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

You can also use the `.chatModel()` or `.languageModel()` factory methods:

```ts
const model = moonshotai.chatModel('kimi-k3');
// or
const model = moonshotai.languageModel('kimi-k3');
```

Moonshot AI language models can be used in the `streamText` function
(see [AI SDK Core](/docs/ai-sdk-core)).

#### Structured Outputs

Native structured outputs are enabled for Moonshot models whose model ID starts with `kimi-`.

For other Moonshot models, object generation falls back to JSON mode instead of schema-constrained decoding.

For best reliability, it is strongly recommended to include your schema requirements in your prompt in addition to passing the schema through `Output`.

### Reasoning Models

Kimi K3 always reasons. It currently supports only the `max` reasoning effort,
which you can configure through provider options:

```ts
import {
  moonshotai,
  type MoonshotAILanguageModelOptions,
} from '@ai-sdk/moonshotai';
import { generateText } from 'ai';

const { text, reasoningText } = await generateText({
  model: moonshotai('kimi-k3'),
  providerOptions: {
    moonshotai: {
      reasoningEffort: 'max',
    } satisfies MoonshotAILanguageModelOptions,
  },
  prompt: 'How many "r"s are in the word "strawberry"?',
});

console.log(reasoningText);
console.log(text);
```

Moonshot AI offers thinking models like `kimi-k2-thinking` that generate intermediate reasoning tokens before their final response. The reasoning output is streamed through the standard AI SDK reasoning parts.

```ts
import {
  moonshotai,
  type MoonshotAILanguageModelOptions,
} from '@ai-sdk/moonshotai';
import { generateText } from 'ai';

const { text, reasoningText } = await generateText({
  model: moonshotai('kimi-k2-thinking'),
  providerOptions: {
    moonshotai: {
      thinking: { type: 'enabled', budgetTokens: 2048 },
      reasoningHistory: 'interleaved',
    } satisfies MoonshotAILanguageModelOptions,
  },
  prompt: 'How many "r"s are in the word "strawberry"?',
});

console.log(reasoningText);
console.log(text);
```

See [AI SDK UI: Chatbot](/docs/ai-sdk-ui/chatbot#reasoning) for more details on how to integrate reasoning into your chatbot.

### Video Input

Kimi K3, Kimi K2.7 Code, Kimi K2.6, and Kimi K2.5 support video input. Pass the video as a `file` content part with a video media type:

```ts
import { moonshotai } from '@ai-sdk/moonshotai';
import { generateText } from 'ai';
import fs from 'node:fs';

const { text } = await generateText({
  model: moonshotai('kimi-k3'),
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Summarize what happens in this video.' },
        {
          type: 'file',
          data: fs.readFileSync('./video.mp4'),
          mediaType: 'video/mp4',
        },
      ],
    },
  ],
});

console.log(text);
```

You can also pass a URL. Since Moonshot AI does not fetch external URLs, the AI SDK downloads the video and inlines it as base64 before sending:

```ts
{
  type: 'file',
  data: new URL('https://example.com/video.mp4'),
  mediaType: 'video/mp4',
}
```

<Note>
  Moonshot AI recommends videos up to 1080p. For larger videos, or videos you
  reuse across many requests, upload them with the [Moonshot Files
  API](https://platform.moonshot.ai/docs/api/files) instead. Audio and PDF
  inputs are not supported by Moonshot AI chat completions.
</Note>

### Provider Options

The following optional provider options are available for Moonshot AI language models:

- **reasoningEffort** _'max'_

  Reasoning effort for Kimi K3. Currently, only `'max'` is supported.

- **thinking** _object_

  Configuration for thinking/reasoning models like Kimi K2 Thinking.
  - **type** _'enabled' | 'disabled'_

    Whether to enable thinking mode

  - **budgetTokens** _number_

    Maximum number of tokens for thinking (minimum 1024)

- **reasoningHistory** _'disabled' | 'interleaved' | 'preserved'_

  Controls how reasoning history is handled in multi-turn conversations:
  - `'disabled'`: Remove reasoning from history
  - `'interleaved'`: Include reasoning between tool calls within a single turn
  - `'preserved'`: Keep all reasoning in history. Mapped to Moonshot's
    `thinking.keep: 'all'` request field.

## Model Capabilities

| Model                    | Image Input | Video Input | Object Generation | Tool Usage | Tool Streaming |
| ------------------------ | ----------- | ----------- | ----------------- | ---------- | -------------- |
| `moonshot-v1-8k`         | <Cross />   | <Cross />   | <Check />         | <Check />  | <Check />      |
| `moonshot-v1-32k`        | <Cross />   | <Cross />   | <Check />         | <Check />  | <Check />      |
| `moonshot-v1-128k`       | <Cross />   | <Cross />   | <Check />         | <Check />  | <Check />      |
| `kimi-k2`                | <Cross />   | <Cross />   | <Check />         | <Check />  | <Check />      |
| `kimi-k2.5`              | <Check />   | <Check />   | <Check />         | <Check />  | <Check />      |
| `kimi-k2-thinking`       | <Cross />   | <Cross />   | <Check />         | <Check />  | <Check />      |
| `kimi-k2-thinking-turbo` | <Cross />   | <Cross />   | <Check />         | <Check />  | <Check />      |
| `kimi-k2-turbo`          | <Cross />   | <Cross />   | <Check />         | <Check />  | <Check />      |
| `kimi-k2.6`              | <Check />   | <Check />   | <Check />         | <Check />  | <Check />      |
| `kimi-k2.7-code`         | <Check />   | <Check />   | <Check />         | <Check />  | <Check />      |
| `kimi-k3`                | <Check />   | <Check />   | <Check />         | <Check />  | <Check />      |

<Note>
  Please see the [Moonshot AI docs](https://platform.moonshot.ai/docs/intro) for
  a full list of available models. You can also pass any available provider
  model ID as a string if needed.
</Note>


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
