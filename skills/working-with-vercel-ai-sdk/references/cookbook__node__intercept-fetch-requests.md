---
title: Intercepting Fetch Requests
description: Learn how to intercept fetch requests using the AI SDK and Node
url: "https://ai-sdk.dev/cookbook/node/intercept-fetch-requests"
docs_index: /llms.txt
tags:
  - node
source: "https://ai-sdk.dev/cookbook/node/intercept-fetch-requests.md"
fetched_at: "2026-11-16T12:32:31.917Z"
sha256: "e8d4b5e4c335cc110a1ebfcdda81b373a2478edc4ae4e8ec1f9a2ac703c57307"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Many providers support setting a custom `fetch` function using the `fetch` argument in their factory function.

A custom `fetch` function can be used to intercept and modify requests before they are sent to the provider's API,
and to intercept and modify responses before they are returned to the caller.

Use cases for intercepting requests include:

- Logging requests and responses
- Adding authentication headers
- Modifying request bodies
- Caching responses
- Using a custom HTTP client

## Preserving URL download protection

A fetch wrapper that logs requests, adds authentication, or retries failures
does not provide SSRF protection. If the wrapped fetch is used to download
untrusted URLs on Node.js, wrap a `guarded-fetch` transport instead of the
global fetch, and preserve the request's abort signal and redirect mode. See [Secure URL Fetching](/docs/advanced/secure-url-fetching).

## Example

```ts title='index.ts' {5-13}
import { generateText, createGateway } from 'ai';

const gateway = createGateway({
  // example fetch wrapper that logs the input to the API call:
  fetch: async (url, options) => {
    console.log('URL', url);
    console.log('Headers', JSON.stringify(options!.headers, null, 2));
    console.log(
      `Body ${JSON.stringify(JSON.parse(options!.body! as string), null, 2)}`,
    );
    return await fetch(url, options);
  },
});

const { text } = await generateText({
  model: gateway('openai/gpt-6-astra'),
  prompt: 'Why is the sky blue?',
});
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)