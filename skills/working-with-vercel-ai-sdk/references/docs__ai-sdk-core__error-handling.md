---
source: "https://ai-sdk.dev/docs/ai-sdk-core/error-handling.md"
fetched_at: "2026-07-20T06:52:37.869Z"
sha256: "bffbb5faf71fa1c48dcabc2cdb723a5b2cfac2beaf2a43269b559682a287fad1"
---

# Error Handling

## Handling regular errors

Regular errors are thrown and can be handled using the `try/catch` block.

```ts highlight="4,9-11"
import { generateText } from 'ai';
__PROVIDER_IMPORT__;

try {
  const { text } = await generateText({
    model: __MODEL__,
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });
} catch (error) {
  // handle error
}
```

See [Error Types](/docs/reference/ai-sdk-errors) for more information on the different types of errors that may be thrown.

## Handling streaming errors (simple streams)

When errors occur during streams that do not support error chunks,
the error is thrown as a regular error.
You can handle these errors using the `try/catch` block.

```ts highlight="4,13-15"
import { streamText } from 'ai';
__PROVIDER_IMPORT__;

try {
  const { textStream } = streamText({
    model: __MODEL__,
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });

  for await (const textPart of textStream) {
    process.stdout.write(textPart);
  }
} catch (error) {
  // handle error
}
```

## Handling streaming errors (streaming with `error` support)

The `stream` result supports error parts.
You can handle those parts similar to other parts.
It is recommended to also add a try-catch block for errors that
happen outside of the streaming.

```ts highlight="14-22"
import { streamText } from 'ai';
__PROVIDER_IMPORT__;

try {
  const { stream } = streamText({
    model: __MODEL__,
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });

  for await (const part of stream) {
    switch (part.type) {
      // ... handle other part types

      case 'error': {
        const error = part.error;
        // handle error
        break;
      }

      case 'abort': {
        // handle stream abort
        break;
      }

      case 'tool-error': {
        const error = part.error;
        // handle error
        break;
      }
    }
  }
} catch (error) {
  // handle error
}
```

## Handling stream aborts

When streams are aborted (e.g., via chat stop button), you may want to perform cleanup operations like updating stored messages in your UI. Use the `onAbort` callback to handle these cases.

The `onAbort` callback is called when a stream is aborted via `AbortSignal`, but `onEnd` is not called. This ensures you can still update your UI state appropriately.

```ts highlight="6-10"
import { streamText } from 'ai';
__PROVIDER_IMPORT__;

const { textStream } = streamText({
  model: __MODEL__,
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  onAbort: ({ steps }) => {
    // Update stored messages or perform cleanup
    console.log('Stream aborted after', steps.length, 'steps');
  },
  onEnd: ({ steps, totalUsage }) => {
    // This is called on normal completion
    console.log('Stream completed normally');
  },
});

for await (const textPart of textStream) {
  process.stdout.write(textPart);
}
```

The `onAbort` callback receives:

- `steps`: An array of all completed steps before the abort

You can also handle abort events directly in the stream:

```ts highlight="11-14"
import { streamText } from 'ai';
__PROVIDER_IMPORT__;

const { stream } = streamText({
  model: __MODEL__,
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});

for await (const chunk of stream) {
  switch (chunk.type) {
    case 'abort': {
      // Handle abort directly in stream
      console.log('Stream was aborted');
      break;
    }
    // ... handle other part types
  }
}
```


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
