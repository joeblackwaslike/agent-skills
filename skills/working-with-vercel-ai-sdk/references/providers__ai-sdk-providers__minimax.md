---
source: "https://ai-sdk.dev/providers/ai-sdk-providers/minimax.md"
fetched_at: "2026-08-17T04:48:04.925Z"
sha256: "bd5922caf24e65688d315797546534f700cf242c0a4ba351016a35d08b602061"
---

# MiniMax Provider

The [MiniMax](https://www.minimax.io) provider offers access to the MiniMax-M
series of language models through the MiniMax API, including models with
reasoning capabilities, as well as video generation with the MiniMax-H series.

API keys can be obtained from the [MiniMax Platform](https://platform.minimax.io).

## Setup

The MiniMax provider is available via the `@ai-sdk/minimax` module. You can install it with:

<InstallPackages packages="@ai-sdk/minimax" />

## Provider Instance

You can import the default provider instance `minimax` from `@ai-sdk/minimax`:

```ts
import { minimax } from '@ai-sdk/minimax';
```

For custom configuration, you can import `createMiniMax` and create a provider instance with your settings:

```ts
import { createMiniMax } from '@ai-sdk/minimax';

const minimax = createMiniMax({
  apiKey: process.env.MINIMAX_API_KEY ?? '',
});
```

You can use the following optional settings to customize the MiniMax provider instance:

- **baseURL** _string_

  Use a different URL prefix for API calls. This provider speaks MiniMax's
  Anthropic-compatible protocol, so the default prefix is
  `https://api.minimax.io/anthropic/v1` — not the OpenAI-compatible
  `https://api.minimax.io/v1`.

- **videoBaseURL** _string_

  Use a different URL prefix for video generation API calls. The video API uses
  the MiniMax V2 native endpoint (not the Anthropic-compatible endpoint).
  The default prefix is `https://api.minimax.io`.

- **apiKey** _string_

  API key for the MiniMax API. It defaults to the `MINIMAX_API_KEY` environment
  variable. Language models send it in the `x-api-key` header (the
  Anthropic-compatible protocol); video models send it as
  `Authorization: Bearer`.

- **headers** _Record&lt;string,string&gt;_

  Custom headers to include in the requests

- **fetch** _(input: RequestInfo, init?: RequestInit) => Promise&lt;Response&gt;_

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation

## Language Models

You can create language models using a provider instance:

```ts
import { minimax } from '@ai-sdk/minimax';
import { generateText } from 'ai';

const { text } = await generateText({
  model: minimax('minimax-m3'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

You can also use the `.chat()` or `.languageModel()` factory methods:

```ts
const model = minimax.chat('minimax-m3');
// or
const model = minimax.languageModel('minimax-m3');
```

MiniMax language models can be used in the `streamText` function
(see [AI SDK Core](/docs/ai-sdk-core)).

### Reasoning

MiniMax-M models can produce intermediate reasoning ("thinking") before their
final response. You control this behavior through provider options. The reasoning
output is streamed through the standard AI SDK reasoning parts.

```ts
import { minimax, type MiniMaxLanguageModelOptions } from '@ai-sdk/minimax';
import { generateText } from 'ai';

const { text, reasoningText } = await generateText({
  model: minimax('minimax-m3'),
  providerOptions: {
    minimax: {
      thinking: { type: 'adaptive' },
    } satisfies MiniMaxLanguageModelOptions,
  },
  prompt: 'How many "r"s are in the word "strawberry"?',
});

console.log(reasoningText);
console.log(text);
```

See [AI SDK UI: Chatbot](/docs/ai-sdk-ui/chatbot#reasoning) for more details on how to integrate reasoning into your chatbot.

### Provider Options

The following optional provider options are available for MiniMax language models:

- **thinking** _object_

  Controls the model's reasoning ("thinking") behavior.
  - **type** _'adaptive' | 'disabled'_
    - `'adaptive'`: the model decides when to reason (deep reasoning enabled)
    - `'disabled'`: the model responds directly without reasoning, for higher
      throughput and lower latency

  When omitted, the model uses its provider-side default.

  <Note>
    Thinking control is only supported on `minimax-m3`. The M2.x models always
    think, so `'disabled'` has no effect on them.
  </Note>

## Video Models

You can generate videos with the MiniMax-H3 model using the
[`experimental_generateVideo`](/docs/reference/ai-sdk-core/generate-video)
function:

```ts
import { minimax, type MiniMaxVideoModelOptions } from '@ai-sdk/minimax';
import { experimental_generateVideo as generateVideo } from 'ai';

const { video } = await generateVideo({
  model: minimax.video('MiniMax-H3'),
  prompt: 'A white kitten chases a butterfly across a sunlit garden.',
  aspectRatio: '16:9',
  duration: 5,
  providerOptions: {
    minimax: {
      pollTimeoutMs: 600000, // 10 minutes
    } satisfies MiniMaxVideoModelOptions,
  },
});
```

MiniMax-H3 generates one video per call. Generation is asynchronous — the model
creates a task and polls until it completes, then returns the resulting MP4 URL.

`duration` accepts a whole number of seconds from 5 to 15, and defaults to 5. A
fractional value is rounded and an out-of-range value is clamped, each with a
warning. The only supported output resolution is `2K`.

For **text-to-video**, `aspectRatio` defaults to `16:9` when omitted. The MiniMax
API requires a concrete ratio for text-only requests and does not accept
`adaptive`. For **reference-to-video**, the API default is `adaptive` when
`aspectRatio` is omitted. For **image-to-video** with frame images, the aspect
ratio follows the input image.

<Note>
  Result URLs are time-limited. Download and persist the video to your own
  storage promptly after generation.
</Note>

### Generation modes

The generation mode is inferred from the inputs you pass:

- **Text-to-video** — `prompt` only.
- **First-frame image-to-video** — pass `image` (or a `frameImages` entry with
  `frameType: 'first_frame'`) to animate a starting image.
- **First-to-last keyframes** — pass `frameImages` with both a `first_frame` and
  a `last_frame` to control the transition.
- **Reference-to-video** — pass `inputReferences` (images and/or videos, routed
  by media type) to keep a subject/style or follow motion. Frame images and
  references are mutually exclusive.

When a frame image is supplied, the aspect ratio follows the image and any
explicit `aspectRatio` is ignored.

### Video Provider Options

The following optional provider options are available for MiniMax video models:

- **resolution** _string_

  Output resolution. MiniMax-H3 currently only supports `'2K'` (the default).

- **ratio** _'adaptive' | '21:9' | '16:9' | '4:3' | '1:1' | '3:4' | '9:16'_

  Aspect ratio of the generated video. Overrides the top-level `aspectRatio`.

- **referenceAudioUrls** _string[]_

  Reference audio URLs (or `mm_file://` handles) for reference-to-video
  generation. Must be paired with at least one reference image or video. Up to 3.

- **aigcWatermark** _boolean_

  Whether to embed an AIGC watermark in the output. Defaults to `false`.

- **pollIntervalMs** _number_

  Interval in milliseconds between task status polls. Default: `10000`.

- **pollTimeoutMs** _number_

  Maximum time in milliseconds to poll before timing out. Default: `600000`.

<Note>
  MiniMax `mm_file://` handles are only forwarded as-is for
  `referenceAudioUrls`. They cannot be used for `image`, `frameImages`, or
  `inputReferences`: those inputs go through the AI SDK's file handling, which
  base64-decodes any string that is not an `http(s)://` or `data:` URL. Pass
  those inputs as public URLs, data URIs, or binary data instead.
</Note>

### Video Provider Metadata

MiniMax video results include `providerMetadata.minimax`:

- **taskId** _string_

  ID of the MiniMax generation task.

- **videoUrl** _string_

  The MiniMax-hosted MP4 URL (the same URL as `video`). Time-limited.

- **resolvedInputs** _object_

  The inputs that were actually sent, after the caps and rejections H3 imposes
  (warnings report that an input was dropped, but not how many survived).
  - **imageCount** _number_ — number of images sent (frame images or reference
    images).
  - **referenceVideoUrls** _string[]_ — the URLs of the reference videos sent.
    Inline video data is omitted, since it is sent as a data URI.

- **duration** _number_

  Duration of the generated video in seconds, when reported by the API.

- **ratio** _string_

  Aspect ratio of the generated video, when reported by the API.

- **resolution** _string_

  Resolution tier of the generated video, when reported by the API.

- **usage** _object_

  Billed seconds, when reported by the API: `totalSeconds`, `inputSeconds`,
  and `outputSeconds`.

## Model Capabilities

| Model                    | Image Input | Object Generation | Tool Usage | Tool Streaming |
| ------------------------ | ----------- | ----------------- | ---------- | -------------- |
| `minimax-m3`             | <Cross />   | <Check />         | <Check />  | <Check />      |
| `minimax-m2.7`           | <Cross />   | <Check />         | <Check />  | <Check />      |
| `minimax-m2.7-highspeed` | <Cross />   | <Check />         | <Check />  | <Check />      |
| `minimax-m2.5`           | <Cross />   | <Check />         | <Check />  | <Check />      |
| `minimax-m2.5-highspeed` | <Cross />   | <Check />         | <Check />  | <Check />      |
| `minimax-m2.1`           | <Cross />   | <Check />         | <Check />  | <Check />      |
| `minimax-m2.1-highspeed` | <Cross />   | <Check />         | <Check />  | <Check />      |
| `minimax-m2`             | <Cross />   | <Check />         | <Check />  | <Check />      |

<Note>
  Please see the [MiniMax docs](https://platform.minimax.io/docs) for a full
  list of available models. You can also pass any available provider model ID as
  a string if needed.
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
