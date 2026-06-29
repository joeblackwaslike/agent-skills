---
source: "https://ai-sdk.dev/docs/troubleshooting/high-memory-usage-with-images.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "c2183e95b3c7bec248290692708ce192e9cd2b12269f33c02bb08571461f3a87"
---

# High memory usage when processing many images

## Issue

When using `generateText` or `streamText` with many images (e.g., in a loop or batch processing), you may notice:

- Memory usage grows continuously and doesn't decrease
- Application eventually runs out of memory
- Memory is not reclaimed even after garbage collection

This is especially noticeable when using `experimental_download` to process images from URLs, or when sending base64-encoded images in prompts.

## Background

By default, the AI SDK includes the full request messages plus request and response bodies in the step results. When processing images, the request messages and request body can contain base64-encoded image data, which can be very large (a single image can be 1MB+ when base64 encoded). If you process many images and keep references to the results, this data accumulates in memory.

For example, processing 100 images of 500KB each would include ~50MB+ of request body data in memory.

## Solution

Use the `include` option to disable inclusion of request messages and/or request and response bodies:

```ts
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = await generateText({
  model: openai('gpt-4o'),
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Describe this image' },
        { type: 'file', mediaType: 'image', data: imageUrl },
      ],
    },
  ],
  // Request and response bodies are excluded by default.
  include: {
    requestBody: false,
    responseBody: false,
  },
});
```

### Options

The `include` option accepts:

- `requestBody`: Set to `true` to include the request body in step results. The request body is where base64-encoded images are often stored. Default: `false`. Available in both `generateText` and `streamText`.
- `requestMessages`: Set to `true` to include the request messages in step results. The request messages can contain large message content such as images and files. Default: `false`. Available in both `generateText` and `streamText`.
- `rawChunks`: Set to `true` to include raw provider chunks in the stream. Default: `false`. Only available in `streamText`.
- `responseBody`: Set to `true` to include the response body in step results. Default: `false`. Only available in `generateText`.

### When to use

- **Batch processing images**: When processing many images in a loop
- **Long-running agents**: When an agent may process many images over its lifetime
- **Memory-constrained environments**: When running in environments with limited memory

### Trade-offs

When you disable body inclusion:

- You won't have access to `result.request.body` or `result.response.body`
- You won't have access to `result.request.messages` unless `requestMessages` is enabled
- Debugging may be harder since you can't inspect the raw request/response
- If you need the bodies for logging or debugging, consider extracting the data you need before the next iteration

## Example: Processing multiple images

```ts
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const imageUrls = [
  /* array of image URLs */
];
const results = [];

for (const imageUrl of imageUrls) {
  const result = await generateText({
    model: openai('gpt-4o'),
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Describe this image' },
          { type: 'file', mediaType: 'image', data: imageUrl },
        ],
      },
    ],
    include: {
      requestBody: false,
    },
  });

  // Only store the text result, not the full result object
  results.push(result.text);
}
```

## Learn more

- [`generateText` API Reference](/docs/reference/ai-sdk-core/generate-text)
- [`streamText` API Reference](/docs/reference/ai-sdk-core/stream-text)


## Navigation

- [Azure OpenAI Slow to Stream](/docs/troubleshooting/azure-stream-slow)
- [Server Actions in Client Components](/docs/troubleshooting/server-actions-in-client-components)
- [useChat/useCompletion stream output contains 0:... instead of text](/docs/troubleshooting/strange-stream-output)
- [Streamable UI Errors](/docs/troubleshooting/streamable-ui-errors)
- [Tool Invocation Missing Result Error](/docs/troubleshooting/tool-invocation-missing-result)
- [Streaming Not Working When Deployed](/docs/troubleshooting/streaming-not-working-when-deployed)
- [Streaming Not Working When Proxied](/docs/troubleshooting/streaming-not-working-when-proxied)
- [Getting Timeouts When Deploying on Vercel](/docs/troubleshooting/timeout-on-vercel)
- [Unclosed Streams](/docs/troubleshooting/unclosed-streams)
- [useChat Failed to Parse Stream](/docs/troubleshooting/use-chat-failed-to-parse-stream)
- [Server Action Plain Objects Error](/docs/troubleshooting/client-stream-error)
- [useChat No Response](/docs/troubleshooting/use-chat-tools-no-response)
- [Custom headers, body, and credentials not working with useChat](/docs/troubleshooting/use-chat-custom-request-options)
- [TypeScript performance issues with Zod and AI SDK 5](/docs/troubleshooting/typescript-performance-zod)
- [useChat "An error occurred"](/docs/troubleshooting/use-chat-an-error-occurred)
- [Repeated assistant messages in useChat](/docs/troubleshooting/repeated-assistant-messages)
- [onEnd not called when stream is aborted](/docs/troubleshooting/stream-abort-handling)
- [Tool calling with structured outputs](/docs/troubleshooting/tool-calling-with-structured-outputs)
- [Abort and resumable streams](/docs/troubleshooting/abort-breaks-resumable-streams)
- [streamText fails silently](/docs/troubleshooting/stream-text-not-working)
- [Streaming Status Shows But No Text Appears](/docs/troubleshooting/streaming-status-delay)
- [Stale body values with useChat](/docs/troubleshooting/use-chat-stale-body-data)
- [Type Error with onToolCall](/docs/troubleshooting/ontoolcall-type-narrowing)
- [Unsupported model version error](/docs/troubleshooting/unsupported-model-version)
- [Object generation failed with OpenAI](/docs/troubleshooting/no-object-generated-content-filter)
- [Missing Tool Results Error](/docs/troubleshooting/missing-tool-results-error)
- [Model is not assignable to type "LanguageModelV1"](/docs/troubleshooting/model-is-not-assignable-to-type)
- [TypeScript error "Cannot find namespace 'JSX'"](/docs/troubleshooting/typescript-cannot-find-namespace-jsx)
- [React error "Maximum update depth exceeded"](/docs/troubleshooting/react-maximum-update-depth-exceeded)
- [Jest: cannot find module '@ai-sdk/rsc'](/docs/troubleshooting/jest-cannot-find-module-ai-rsc)
- [High memory usage when processing many images](/docs/troubleshooting/high-memory-usage-with-images)


[Full Sitemap](/sitemap.md)
