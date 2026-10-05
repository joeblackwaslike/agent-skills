---
title: SambaNova
description: Learn how to use the SambaNova provider for the AI SDK.
url: "https://ai-sdk.dev/providers/community-providers/sambanova"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/community-providers/sambanova.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "b82601463ee0953f5e5a22d59f2e0bbfd42d34bf80d49a2bb8ae3a4a6de4a2ea"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[sambanova-ai-provider](https://github.com/sambanova/sambanova-ai-provider) contains language model support for the SambaNova API.

API keys can be obtained from the [SambaNova Cloud Platform](https://cloud.sambanova.ai/apis).

## Setup

The SambaNova provider is available via the `sambanova-ai-provider` module. You can install it with:

**Packages:** `sambanova-ai-provider`

### Environment variables

Create a `.env` file with a `SAMBANOVA_API_KEY` variable.

## Provider Instance

You can import the default provider instance `sambanova` from `sambanova-ai-provider`:

```ts
import { sambanova } from 'sambanova-ai-provider';
```

If you need a customized setup, you can import `createSambaNova` from `sambanova-ai-provider` and create a provider instance with your settings:

```ts
import { createSambaNova } from 'sambanova-ai-provider';

const sambanova = createSambaNova({
  // Optional settings
});
```

You can use the following optional settings to customize the SambaNova provider instance:

- **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api.sambanova.ai/v1`.

- **apiKey** *string*

  API key that is being sent using the `Authorization` header.
  It defaults to the `SAMBANOVA_API_KEY` environment variable.

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

## Models

You can use [SambaNova models](https://docs.sambanova.ai/cloud/docs/get-started/supported-models) on a provider instance.
The first argument is the model id, e.g. `Meta-Llama-3.1-70B-Instruct`.

```ts
const model = sambanova('Meta-Llama-3.1-70B-Instruct');
```

## Tested models and capabilities

This provider is capable of generating and streaming text, and interpreting image inputs.

At least it has been tested with the following features (which use the `/chat/completions` endpoint):

| Chat completion | Image input |
| --------------- | ----------- |
| ✓               | ✓           |

### Image input

You need to use any of the following models for visual understanding:

- Llama3.2-11B-Vision-Instruct
- Llama3.2-90B-Vision-Instruct

SambaNova does not support URLs, but the ai-sdk is able to download the file and send it to the model.

## Example Usage

Basic demonstration of text generation using the SambaNova provider.

```ts
import { createSambaNova } from 'sambanova-ai-provider';
import { generateText } from 'ai';

const sambanova = createSambaNova({
  apiKey: 'YOUR_API_KEY',
});

const model = sambanova('Meta-Llama-3.1-70B-Instruct');

const { text } = await generateText({
  model,
  prompt: 'Hello, nice to meet you.',
});

console.log(text);
```

You will get an output text similar to this one:

```
Hello. Nice to meet you too. Is there something I can help you with or would you like to chat?
```

## Intercepting Fetch Requests

This provider supports [Intercepting Fetch Requests](/examples/providers/intercepting-fetch-requests).

### Example

```ts
import { createSambaNova } from 'sambanova-ai-provider';
import { generateText } from 'ai';

const sambanovaProvider = createSambaNova({
  apiKey: 'YOUR_API_KEY',
  fetch: async (url, options) => {
    console.log('URL', url);
    console.log('Headers', JSON.stringify(options.headers, null, 2));
    console.log(`Body ${JSON.stringify(JSON.parse(options.body), null, 2)}`);
    return await fetch(url, options);
  },
});

const model = sambanovaProvider('Meta-Llama-3.1-70B-Instruct');

const { text } = await generateText({
  model,
  prompt: 'Hello, nice to meet you.',
});
```

And you will get an output like this:

```bash
URL https://api.sambanova.ai/v1/chat/completions
Headers {
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_API_KEY"
}
Body {
  "model": "Meta-Llama-3.1-70B-Instruct",
  "temperature": 0,
  "messages": [
    {
      "role": "user",
      "content": "Hello, nice to meet you."
    }
  ]
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)