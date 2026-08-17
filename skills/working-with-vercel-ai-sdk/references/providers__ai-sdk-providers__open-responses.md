---
source: "https://ai-sdk.dev/providers/ai-sdk-providers/open-responses.md"
fetched_at: "2026-08-17T04:48:04.925Z"
sha256: "b48d27d304e4f7743a819259dabbdc55e51f6567d6cc1988e7600a3797dee5ad"
---

# Open Responses Provider

The [Open Responses](https://www.openresponses.org/) provider connects AI SDK
Core to language model servers that implement an Open Responses-compatible
`POST` endpoint. Open Responses is an open specification based on the OpenAI
Responses API.

Use `@ai-sdk/open-responses` for third-party or self-hosted endpoints that
implement this protocol, such as LM Studio. If you call OpenAI directly and
need OpenAI-specific provider options or built-in tools, use the
[`@ai-sdk/openai` provider](/providers/ai-sdk-providers/openai) instead.

## Setup

The Open Responses provider is available in the `@ai-sdk/open-responses` module. You can install it with

<InstallPackages packages="@ai-sdk/open-responses" />

## Provider Instance

Create an Open Responses provider instance using `createOpenResponses`:

```ts
import { createOpenResponses } from '@ai-sdk/open-responses';

const openResponses = createOpenResponses({
  name: 'lmstudio',
  url: 'http://localhost:1234/v1/responses',
});
```

The `name` and `url` options are required:

- **name** _string_

  Provider name. Used in the model's provider identifier and as the key for
  provider options.

- **url** _string_

  Full URL for the Open Responses API `POST` endpoint. Pass the endpoint URL,
  such as `http://localhost:1234/v1/responses`, not only its base URL.

You can use the following optional settings to customize the Open Responses provider instance:

- **apiKey** _string_

  API key that is sent as a bearer token in the `Authorization` header.

- **headers** _Record&lt;string,string&gt;_

  Custom headers to include in the requests.

- **fetch** _(input: RequestInfo, init?: RequestInit) => Promise&lt;Response&gt;_

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.

### Endpoint Examples

For a local LM Studio server that does not require authentication:

```ts
import { createOpenResponses } from '@ai-sdk/open-responses';

const lmstudio = createOpenResponses({
  name: 'lmstudio',
  url: 'http://localhost:1234/v1/responses',
});
```

For the OpenAI Responses API:

```ts
import { createOpenResponses } from '@ai-sdk/open-responses';

const openAIResponses = createOpenResponses({
  name: 'openai',
  url: 'https://api.openai.com/v1/responses',
  apiKey: process.env.OPENAI_API_KEY,
});
```

You can use the same setup with another compatible service by changing the
`name`, `url`, authentication, and model ID.

## Language Models

The Open Responses provider instance is a function that you can invoke to create a language model:

```ts
const model = openResponses('your-model-id');
```

The model ID is passed to the endpoint unchanged.

You can use Open Responses models with the `generateText` and `streamText` functions,
and they support structured data generation with [`Output`](/docs/reference/ai-sdk-core/output)
(see [AI SDK Core](/docs/ai-sdk-core)).

### Generate Text

```ts
import { createOpenResponses } from '@ai-sdk/open-responses';
import { generateText } from 'ai';

const openResponses = createOpenResponses({
  name: 'lmstudio',
  url: 'http://localhost:1234/v1/responses',
});

const { text } = await generateText({
  model: openResponses('your-model-id'),
  prompt: 'Invent a new holiday and describe its traditions.',
});

console.log(text);
```

### Stream Text

```ts
import { createOpenResponses } from '@ai-sdk/open-responses';
import { streamText } from 'ai';

const openResponses = createOpenResponses({
  name: 'lmstudio',
  url: 'http://localhost:1234/v1/responses',
});

const result = streamText({
  model: openResponses('your-model-id'),
  prompt: 'Invent a new holiday and describe its traditions.',
});

for await (const textPart of result.textStream) {
  process.stdout.write(textPart);
}
```

## Reasoning and Provider Options

Use the top-level [`reasoning`](/docs/ai-sdk-core/reasoning) setting to control
reasoning effort. The provider maps supported values to the Open Responses
`reasoning.effort` field.

The provider also supports `reasoningEffort` and `reasoningSummary` through
`providerOptions`. The provider option key must match the `name` passed to
`createOpenResponses`:

```ts
import {
  createOpenResponses,
  type OpenResponsesLanguageModelOptions,
} from '@ai-sdk/open-responses';
import { generateText } from 'ai';

const lmstudio = createOpenResponses({
  name: 'lmstudio',
  url: 'http://localhost:1234/v1/responses',
});

const { text, reasoningText } = await generateText({
  model: lmstudio('your-reasoning-model-id'),
  reasoning: 'high',
  providerOptions: {
    lmstudio: {
      reasoningEffort: 'max',
      reasoningSummary: 'detailed',
    } satisfies OpenResponsesLanguageModelOptions,
  },
  prompt: 'Explain why the sky appears blue.',
});

console.log(reasoningText);
console.log(text);
```

`reasoningEffort` accepts any string and is passed through unchanged to the
endpoint's `reasoning.effort` field. Use it for endpoint-native values that are
not part of the top-level `reasoning` setting, such as `'max'`. When both are
set, `providerOptions` `reasoningEffort` takes precedence over the top-level
`reasoning` value.

`reasoningSummary` accepts `'auto'`, `'concise'`, or `'detailed'` and can be
combined with either reasoning effort setting. Reasoning support and accepted
effort values depend on the endpoint and model; unsupported values may be
rejected or ignored by the endpoint.

## File Inputs

The provider supports image and non-image file inputs in user messages. Images
are sent as `input_image` parts, while other media types, such as PDFs, are
sent as `input_file` parts.

You can provide a file as inline data:

```ts
import { createOpenResponses } from '@ai-sdk/open-responses';
import { readFileSync } from 'node:fs';
import { generateText } from 'ai';

const openResponses = createOpenResponses({
  name: 'lmstudio',
  url: 'http://localhost:1234/v1/responses',
});

const { text } = await generateText({
  model: openResponses('your-file-capable-model-id'),
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Summarize this document.',
        },
        {
          type: 'file',
          data: readFileSync('./document.pdf'),
          mediaType: 'application/pdf',
          filename: 'document.pdf',
        },
      ],
    },
  ],
});

console.log(text);
```

You can also set `data` to a `URL`. The endpoint and model must support the
file's media type. Provider file references, such as OpenAI file IDs, and
file data in `{ type: 'text', text: '...' }` format are not supported by this
provider.

## Limitations

- Stop sequences, `topK`, and `seed` are not supported and are ignored with warnings.
- The provider supports language models only. It does not provide embedding or
  image generation models.
- AI SDK function tools are supported. Provider-specific built-in tools and
  options require a dedicated provider implementation.


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
