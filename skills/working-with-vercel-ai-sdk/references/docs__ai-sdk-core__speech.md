---
source: "https://ai-sdk.dev/docs/ai-sdk-core/speech.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "6e97118b20697d1cccb73fc6dbccad9a919b62c657b38a5bc44630bd5307d443"
---

# Speech

The AI SDK provides the [`generateSpeech`](/docs/reference/ai-sdk-core/generate-speech)
function to generate speech from text using a speech model.

```ts
import { generateSpeech } from 'ai';
import { openai } from '@ai-sdk/openai';

const audio = await generateSpeech({
  model: openai.speech('tts-1'),
  text: 'Hello, world!',
  voice: 'alloy',
});
```

### Language Setting

You can specify the language for speech generation (provider support varies):

```ts
import { generateSpeech } from 'ai';
import { lmnt } from '@ai-sdk/lmnt';

const audio = await generateSpeech({
  model: lmnt.speech('aurora'),
  text: 'Hola, mundo!',
  language: 'es', // Spanish
});
```

To access the generated audio:

```ts
const audioData = result.audio.uint8Array; // audio data as Uint8Array
// or
const audioBase64 = result.audio.base64; // audio data as base64 string
```

## Settings

### Provider-Specific settings

You can set model-specific settings with the `providerOptions` parameter.

```ts highlight="7-11"
import { generateSpeech } from 'ai';
import { openai } from '@ai-sdk/openai';

const audio = await generateSpeech({
  model: openai.speech('tts-1'),
  text: 'Hello, world!',
  providerOptions: {
    openai: {
      // ...
    },
  },
});
```

### Abort Signals and Timeouts

`generateSpeech` accepts an optional `abortSignal` parameter of
type [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
that you can use to abort the speech generation process or set a timeout.

```ts highlight="7"
import { openai } from '@ai-sdk/openai';
import { generateSpeech } from 'ai';

const audio = await generateSpeech({
  model: openai.speech('tts-1'),
  text: 'Hello, world!',
  abortSignal: AbortSignal.timeout(1000), // Abort after 1 second
});
```

### Custom Headers

`generateSpeech` accepts an optional `headers` parameter of type `Record<string, string>`
that you can use to add custom headers to the speech generation request.

```ts highlight="7"
import { openai } from '@ai-sdk/openai';
import { generateSpeech } from 'ai';

const audio = await generateSpeech({
  model: openai.speech('tts-1'),
  text: 'Hello, world!',
  headers: { 'X-Custom-Header': 'custom-value' },
});
```

### Warnings

Warnings (e.g. unsupported parameters) are available on the `warnings` property.

```ts
import { openai } from '@ai-sdk/openai';
import { generateSpeech } from 'ai';

const audio = await generateSpeech({
  model: openai.speech('tts-1'),
  text: 'Hello, world!',
});

const warnings = audio.warnings;
```

### Error Handling

When `generateSpeech` cannot generate a valid audio, it throws a [`AI_NoSpeechGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-speech-generated-error).

This error can arise for any of the following reasons:

- The model failed to generate a response
- The model generated a response that could not be parsed

The error preserves the following information to help you log the issue:

- `responses`: Metadata about the speech model responses, including timestamp, model, and headers.
- `cause`: The cause of the error. You can use this for more detailed error handling.

```ts
import { generateSpeech, NoSpeechGeneratedError } from 'ai';
import { openai } from '@ai-sdk/openai';

try {
  await generateSpeech({
    model: openai.speech('tts-1'),
    text: 'Hello, world!',
  });
} catch (error) {
  if (NoSpeechGeneratedError.isInstance(error)) {
    console.log('AI_NoSpeechGeneratedError');
    console.log('Cause:', error.cause);
    console.log('Responses:', error.responses);
  }
}
```

## Speech Models

| Provider                                                                 | Model                               |
| ------------------------------------------------------------------------ | ----------------------------------- |
| [OpenAI](/providers/ai-sdk-providers/openai#speech-models)               | `tts-1`                             |
| [OpenAI](/providers/ai-sdk-providers/openai#speech-models)               | `tts-1-hd`                          |
| [OpenAI](/providers/ai-sdk-providers/openai#speech-models)               | `gpt-4o-mini-tts`                   |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#speech-models)       | `eleven_v3`                         |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#speech-models)       | `eleven_multilingual_v2`            |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#speech-models)       | `eleven_flash_v2_5`                 |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#speech-models)       | `eleven_flash_v2`                   |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#speech-models)       | `eleven_turbo_v2_5`                 |
| [ElevenLabs](/providers/ai-sdk-providers/elevenlabs#speech-models)       | `eleven_turbo_v2`                   |
| [LMNT](/providers/ai-sdk-providers/lmnt#speech-models)                   | `aurora`                            |
| [LMNT](/providers/ai-sdk-providers/lmnt#speech-models)                   | `blizzard`                          |
| [Hume](/providers/ai-sdk-providers/hume#speech-models)                   | `default`                           |
| [Google](/providers/ai-sdk-providers/google#speech-models)               | `gemini-2.5-flash-preview-tts`      |
| [Google](/providers/ai-sdk-providers/google#speech-models)               | `gemini-2.5-pro-preview-tts`        |
| [Google](/providers/ai-sdk-providers/google#speech-models)               | `gemini-3.1-flash-tts-preview`      |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex#speech-models) | `gemini-2.5-flash-tts`              |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex#speech-models) | `gemini-2.5-pro-tts`                |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex#speech-models) | `gemini-2.5-flash-lite-preview-tts` |
| [Google Vertex](/providers/ai-sdk-providers/google-vertex#speech-models) | `gemini-3.1-flash-tts-preview`      |
| [xAI](/providers/ai-sdk-providers/xai#speech-models)                     | `default`                           |

Above are a small subset of the speech models supported by the AI SDK providers. For more, see the respective provider documentation.


## Navigation

- [Overview](/docs/ai-sdk-core/overview)
- [Generating Text](/docs/ai-sdk-core/generating-text)
- [Generating Structured Data](/docs/ai-sdk-core/generating-structured-data)
- [Tool Calling](/docs/ai-sdk-core/tools-and-tool-calling)
- [Model Context Protocol (MCP)](/docs/ai-sdk-core/mcp-tools)
- [MCP Apps](/docs/ai-sdk-core/mcp-apps)
- [Runtime and Tool Context](/docs/ai-sdk-core/runtime-and-tool-context)
- [Prompt Engineering](/docs/ai-sdk-core/prompt-engineering)
- [Settings](/docs/ai-sdk-core/settings)
- [Reasoning](/docs/ai-sdk-core/reasoning)
- [Embeddings](/docs/ai-sdk-core/embeddings)
- [Reranking](/docs/ai-sdk-core/reranking)
- [Image Generation](/docs/ai-sdk-core/image-generation)
- [Realtime](/docs/ai-sdk-core/realtime)
- [Transcription](/docs/ai-sdk-core/transcription)
- [Speech](/docs/ai-sdk-core/speech)
- [Video Generation](/docs/ai-sdk-core/video-generation)
- [File Uploads](/docs/ai-sdk-core/file-uploads)
- [Language Model Middleware](/docs/ai-sdk-core/middleware)
- [Skill Uploads](/docs/ai-sdk-core/skill-uploads)
- [Provider & Model Management](/docs/ai-sdk-core/provider-management)
- [Error Handling](/docs/ai-sdk-core/error-handling)
- [Testing](/docs/ai-sdk-core/testing)
- [Telemetry](/docs/ai-sdk-core/telemetry)
- [DevTools](/docs/ai-sdk-core/devtools)
- [Lifecycle Callbacks](/docs/ai-sdk-core/lifecycle-callbacks)


[Full Sitemap](/sitemap.md)
