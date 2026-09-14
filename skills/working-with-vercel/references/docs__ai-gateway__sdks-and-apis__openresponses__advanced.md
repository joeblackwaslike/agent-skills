---
title: OpenResponses Configuration with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses/advanced
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/models-and-providers/provider-timeouts
  - /docs/ai-gateway/models-and-providers/automatic-caching
summary: Configure provider routing, fallbacks, and restrictions using the OpenResponses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "ba21f2a126de6076a1130f0513fa77882948eed61f2def780ee1547b2ec9769e"
---

# OpenResponses Configuration with AI Gateway

The [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses) lets you configure AI Gateway behavior using `providerOptions`. The `gateway` namespace gives you control over provider routing, fallbacks, and restrictions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenResponses API now supported on Vercel AI Gateway](https://vercel.com/changelog/openresponses-api-now-supported-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fadvanced&source_site=vercel-docs&relationship=related)
- [Anthropic Messages Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fadvanced&source_site=vercel-docs&relationship=related) — Advanced Anthropic API features including web search, provider timeouts, and automatic caching through AI Gateway.
- [AI Gateway Provider Routing and Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fadvanced&source_site=vercel-docs&relationship=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway.
- [AI Gateway Models and Providers](https://vercel.com/docs/ai-gateway/models-and-providers?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fadvanced&source_site=vercel-docs&relationship=related) — Choose AI Gateway models and providers. Configure routing, fallbacks, timeouts, prompt caching, reasoning, and web searc
- [OpenAI Responses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fadvanced&source_site=vercel-docs&relationship=related) — Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported
- [AI Gateway Model Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/model-fallbacks?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fadvanced&source_site=vercel-docs&relationship=related) — Configure AI Gateway model fallbacks to try backup models when the primary model is unavailable. Set fallback order and

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses/advanced.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses/advanced.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses%2Fadvanced&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Model fallbacks

Set up automatic fallbacks so if your primary model is unavailable, requests route to backup models in order. Use the `models` array to specify the fallback chain.

#### TypeScript

```typescript filename="fallbacks.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'anthropic/claude-opus-5',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'Tell me a fun fact about octopuses.',
      },
    ],
    providerOptions: {
      gateway: {
        models: ['openai/gpt-6-astra', 'google/gemini-3.1-pro-preview'],
      },
    },
  }),
});

if (!response.ok) throw new Error(await response.text());
console.log(await response.json());
```

#### Python

```python filename="request.py"
import json
import os
import urllib.request

request = urllib.request.Request(
    'https://ai-gateway.vercel.sh/v1/responses',
    data=json.dumps({'model': 'anthropic/claude-opus-5', 'input': [{'type': 'message', 'role': 'user', 'content': 'Tell me a fun fact about octopuses.'}], 'providerOptions': {'gateway': {'models': ['openai/gpt-6-astra', 'google/gemini-3.1-pro-preview']}}}).encode(),
    headers={'Content-Type': 'application/json', 'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"]},
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="request.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-opus-5",
  "input": [
    {
      "type": "message",
      "role": "user",
      "content": "Tell me a fun fact about octopuses."
    }
  ],
  "providerOptions": {
    "gateway": {
      "models": [
        "openai/gpt-6-astra",
        "google/gemini-3.1-pro-preview"
      ]
    }
  }
}'
```

## Provider routing

Control the order in which providers are tried using the `order` array. AI Gateway will attempt providers in the specified order until one succeeds.

#### TypeScript

```typescript filename="routing.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'google/gemini-3.1-pro-preview',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'Explain quantum computing in one sentence.',
      },
    ],
    providerOptions: {
      gateway: {
        order: ['google', 'vertex'],
      },
    },
  }),
});

if (!response.ok) throw new Error(await response.text());
console.log(await response.json());
```

#### Python

```python filename="request.py"
import json
import os
import urllib.request

request = urllib.request.Request(
    'https://ai-gateway.vercel.sh/v1/responses',
    data=json.dumps({'model': 'google/gemini-3.1-pro-preview', 'input': [{'type': 'message', 'role': 'user', 'content': 'Explain quantum computing in one sentence.'}], 'providerOptions': {'gateway': {'order': ['google', 'vertex']}}}).encode(),
    headers={'Content-Type': 'application/json', 'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"]},
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="request.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "google/gemini-3.1-pro-preview",
  "input": [
    {
      "type": "message",
      "role": "user",
      "content": "Explain quantum computing in one sentence."
    }
  ],
  "providerOptions": {
    "gateway": {
      "order": [
        "google",
        "vertex"
      ]
    }
  }
}'
```

## Provider restriction

Restrict requests to specific providers using the `only` array. This ensures your requests only go to approved providers, which can be useful for compliance or cost control.

#### TypeScript

```typescript filename="restriction.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'anthropic/claude-sonnet-5',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'What makes a great cup of coffee?',
      },
    ],
    providerOptions: {
      gateway: {
        only: ['anthropic', 'bedrock'],
      },
    },
  }),
});

if (!response.ok) throw new Error(await response.text());
console.log(await response.json());
```

#### Python

```python filename="request.py"
import json
import os
import urllib.request

request = urllib.request.Request(
    'https://ai-gateway.vercel.sh/v1/responses',
    data=json.dumps({'model': 'anthropic/claude-sonnet-5', 'input': [{'type': 'message', 'role': 'user', 'content': 'What makes a great cup of coffee?'}], 'providerOptions': {'gateway': {'only': ['anthropic', 'bedrock']}}}).encode(),
    headers={'Content-Type': 'application/json', 'Authorization': "Bearer " + os.environ["AI_GATEWAY_API_KEY"]},
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="request.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": [
    {
      "type": "message",
      "role": "user",
      "content": "What makes a great cup of coffee?"
    }
  ],
  "providerOptions": {
    "gateway": {
      "only": [
        "anthropic",
        "bedrock"
      ]
    }
  }
}'
```

## Provider timeouts

You can set per-provider timeouts for BYOK credentials to trigger fast failover when a provider is slow to respond. Pass `providerTimeouts` in `providerOptions.gateway`:

```json
"providerOptions": {
  "gateway": {
    "providerTimeouts": {
      "byok": { "anthropic": 3000, "bedrock": 5000 }
    }
  }
}
```

For full details, limits, and response metadata, see [Provider Timeouts](/docs/ai-gateway/models-and-providers/provider-timeouts).

## Automatic caching

Use `caching: 'auto'` in the request body to let AI Gateway automatically add cache markers for providers that require them (like Anthropic). For full details, supported providers, and examples, see [Automatic Caching](/docs/ai-gateway/models-and-providers/automatic-caching).


---

[View full sitemap](/docs/sitemap)
