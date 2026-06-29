---
source: "https://ai-sdk.dev/docs/ai-sdk-core/file-uploads.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "03e966fbb7a9176be61e9e44c5c289de6f3acc9be3f39a02c283320c56d6d9a2"
---

# File Uploads

The AI SDK provides the [`uploadFile`](/docs/reference/ai-sdk-core/upload-file)
function to upload files to a provider and get back a `ProviderReference` that can be
used in subsequent API calls.

In the AI SDK, the uploaded file is identified by a `ProviderReference` — a
`Record<string, string>` mapping provider names to provider-specific identifiers.
This concept is used for other provider specific asset references too, such as
uploaded skills.

```ts
import { uploadFile, generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import fs from 'node:fs';

const { providerReference } = await uploadFile({
  api: openai.files(),
  data: fs.readFileSync('./photo.png'),
  filename: 'photo.png',
});

const { text } = await generateText({
  model: openai.responses('gpt-4o-mini'),
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Describe what you see in this image.' },
        { type: 'file', mediaType: 'image', data: providerReference },
      ],
    },
  ],
});
```

As a shorthand, you can pass a provider instance directly to `api` instead of calling `.files()` explicitly — the SDK will call `.files()` for you:

```ts highlight="3"
const { providerReference } = await uploadFile({
  api: openai, // shorthand for openai.files()
  data: fs.readFileSync('./photo.png'),
  filename: 'photo.png',
});
```

## Supported File Types

You can upload images, PDFs, text files, and other documents depending on the provider.
The media type is auto-detected from the file bytes when not specified explicitly:

```ts highlight="4"
const { providerReference } = await uploadFile({
  api: anthropic.files(),
  data: fs.readFileSync('./document.pdf'),
  mediaType: 'application/pdf', // optional, auto-detected if omitted
  filename: 'document.pdf',
});
```

Use the `providerReference` in a file content part with its media type:

```ts
{
  role: 'user',
  content: [
    { type: 'text', text: 'Summarize this document.' },
    { type: 'file', data: providerReference, mediaType: 'application/pdf' },
  ],
}
```

## Provider-Specific Options

Some providers accept additional options through `providerOptions`.
For example, OpenAI requires a `purpose` field:

```ts highlight="5-9"
import { openai, type OpenAIFilesOptions } from '@ai-sdk/openai';

const { providerReference } = await uploadFile({
  api: openai.files(),
  data: fs.readFileSync('./photo.png'),
  providerOptions: {
    openai: {
      purpose: 'assistants',
    } satisfies OpenAIFilesOptions,
  },
});
```

## Provider References

A `ProviderReference` is a `Record<string, string>` that maps provider names to
provider-specific file identifiers:

```ts
// Example ProviderReference
{
  openai: 'file-abc123',
}
```

When you pass a `ProviderReference` as the `data` or `image` field of a message content
part, the provider looks up its own file ID from the reference. If the reference doesn't
contain an entry for the current provider, an error is thrown.

## Multi-Provider Usage

If you switch providers mid-conversation (for example, continuing a chat started with
OpenAI using Anthropic), you need to upload the file to both providers and merge the
references:

```ts
const openaiResult = await uploadFile({
  api: openai.files(),
  data: imageBytes,
  filename: 'photo.png',
});

const anthropicResult = await uploadFile({
  api: anthropic.files(),
  data: imageBytes,
  filename: 'photo.png',
});

const mergedReference = {
  ...openaiResult.providerReference,
  ...anthropicResult.providerReference,
};

// mergedReference: { openai: 'file-abc123', anthropic: 'file-xyz789' }
```

The merged reference can then be used in messages regardless of which provider processes
the request — each provider will find its own file ID.

## Supported Providers

The following providers support `files()` and file uploads:

| Provider  | Factory Method      |
| --------- | ------------------- |
| Anthropic | `anthropic.files()` |
| Google    | `google.files()`    |
| OpenAI    | `openai.files()`    |
| xAI       | `xai.files()`       |

Providers without file upload support will throw an `UnsupportedFunctionalityError`
if they encounter a provider reference in a message.


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
