---
title: Safety Identifiers
product: vercel
url: /docs/ai-gateway/security-and-compliance/safety-identifiers
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance/safety-identifiers"
last_updated: 2026-08-28
type: how-to
prerequisites:
  - /docs/ai-gateway/security-and-compliance
  - /docs/ai-gateway
related:
  []
summary: Learn how to send a unique safety identifier per end user through AI Gateway so provider-side abuse action isolates individual users instead of your...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/security-and-compliance/safety-identifiers.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "519820cf94bfd79aa54685ad6b55b4d4159e3617a6565afa1f0dad609db23fab"
---

# Safety Identifiers

A safety identifier tells providers like OpenAI and Anthropic which of your end users a request belongs to, without sending anything that identifies that person. It gives providers a way to detect abuse at the level of a single user, so when one is flagged for a policy violation, the action targets that identifier instead of all of your team's traffic.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related)
- [Provider & Model Management](https://ai-sdk.dev/docs/ai-sdk-core/provider-management?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related)
- [Choosing a Provider](https://ai-sdk.dev/docs/getting-started/choosing-a-provider?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related)
- [SDKs & APIs](https://vercel.com/docs/ai-gateway/sdks-and-apis?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related) — Use the AI Gateway with various SDKs and API specifications including OpenAI, Anthropic, and OpenResponses.
- [Advanced Configuration](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related) — Configure provider options, model fallbacks, BYOK credentials, and prompt caching.
- [Provider Options](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway
- [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [Reasoning](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related) — Control how much a model thinks before answering with the OpenAI Chat Completions API.

Full cross-link map for this page: [/docs/ai-gateway/security-and-compliance/safety-identifiers.graph.md](/docs/ai-gateway/security-and-compliance/safety-identifiers.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set a safety identifier per request

Set `safetyIdentifier` in `providerOptions.gateway` to a unique, opaque ID for the end user on whose behalf the request is made, such as a UUID or a hash of your internal user ID. Hash a username or email address rather than sending it, and do not include personal information of any kind. For users who are not signed in, send a session ID instead. The value can be at most 64 characters.

> **💡 Note:** Because the `providerOptions.gateway` fields aren't part of the OpenAI or
> Anthropic SDK types, TypeScript needs a `// @ts-expect-error` comment above the
> option. In Python, pass the same object through the SDK's `extra_body`
> parameter.

### Using the AI SDK

```ts filename="safety-identifier.ts"
import { generateText } from 'ai';
import { gateway } from '@ai-sdk/gateway';

const result = await generateText({
  model: gateway('openai/gpt-5'),
  prompt: 'Hello',
  providerOptions: {
    gateway: {
      safetyIdentifier: 'user_9f8e7d6c5b', // unique per end user
    },
  },
});
```

### Using the Chat Completions API

#### cURL

```bash filename="safety-identifier.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5",
    "messages": [
      { "role": "user", "content": "Hello" }
    ],
    "providerOptions": {
      "gateway": {
        "safetyIdentifier": "user_9f8e7d6c5b"
      }
    }
  }'
```

#### TypeScript

```typescript filename="safety-identifier.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'openai/gpt-5',
  messages: [{ role: 'user', content: 'Hello' }],
  // @ts-expect-error -- providerOptions is not in the OpenAI SDK types
  providerOptions: {
    gateway: {
      safetyIdentifier: 'user_9f8e7d6c5b', // unique per end user
    },
  },
});
```

#### Python

```python filename="safety-identifier.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh/v1",
)

completion = client.chat.completions.create(
    model="openai/gpt-5",
    messages=[{"role": "user", "content": "Hello"}],
    extra_body={
        "providerOptions": {
            "gateway": {"safetyIdentifier": "user_9f8e7d6c5b"}
        }
    },
)
```

### Using the Responses API

#### cURL

```bash filename="safety-identifier.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5",
    "input": "Hello",
    "providerOptions": {
      "gateway": {
        "safetyIdentifier": "user_9f8e7d6c5b"
      }
    }
  }'
```

#### TypeScript

```typescript filename="safety-identifier.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'openai/gpt-5',
    input: 'Hello',
    providerOptions: {
      gateway: {
        safetyIdentifier: 'user_9f8e7d6c5b',
      },
    },
  }),
});
```

#### Python

```python filename="safety-identifier.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="openai/gpt-5",
    input="Hello",
    extra_body={
        "providerOptions": {
            "gateway": {"safetyIdentifier": "user_9f8e7d6c5b"}
        }
    },
)
```

### Using the Anthropic Messages API

#### cURL

```bash filename="safety-identifier.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/messages" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-5",
    "max_tokens": 1024,
    "messages": [
      { "role": "user", "content": "Hello" }
    ],
    "providerOptions": {
      "gateway": {
        "safetyIdentifier": "user_9f8e7d6c5b"
      }
    }
  }'
```

#### TypeScript

```typescript filename="safety-identifier.ts"
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-sonnet-5',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello' }],
  // @ts-expect-error -- providerOptions is not in the Anthropic SDK types
  providerOptions: {
    gateway: {
      safetyIdentifier: 'user_9f8e7d6c5b',
    },
  },
});
```

#### Python

```python filename="safety-identifier.py"
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh",
)

message = client.messages.create(
    model="anthropic/claude-sonnet-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}],
    extra_body={
        "providerOptions": {
            "gateway": {"safetyIdentifier": "user_9f8e7d6c5b"}
        }
    },
)
```

### Using the Embeddings API

#### cURL

```bash filename="safety-identifier.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/embeddings" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/text-embedding-3-small",
    "input": "Sunny day at the beach",
    "providerOptions": {
      "gateway": {
        "safetyIdentifier": "user_9f8e7d6c5b"
      }
    }
  }'
```

#### TypeScript

```typescript filename="safety-identifier.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await openai.embeddings.create({
  model: 'openai/text-embedding-3-small',
  input: 'Sunny day at the beach',
  // @ts-expect-error -- providerOptions is not in the OpenAI SDK types
  providerOptions: {
    gateway: {
      safetyIdentifier: 'user_9f8e7d6c5b',
    },
  },
});
```

#### Python

```python filename="safety-identifier.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.embeddings.create(
    model="openai/text-embedding-3-small",
    input="Sunny day at the beach",
    extra_body={
        "providerOptions": {
            "gateway": {"safetyIdentifier": "user_9f8e7d6c5b"}
        }
    },
)
```

## Which providers receive the identifier

AI Gateway forwards the identifier to whichever provider serves the request, using that provider's field:

- OpenAI models, including when served by Azure or Bedrock, receive it as OpenAI's `safety_identifier`
- Anthropic models, including when served by Vertex or Claude Platform on AWS, receive it as Anthropic's `metadata.user_id`

The identifier follows the request across provider and model fallbacks, so the same value reaches whichever provider ultimately serves the request.

## Precedence

The top-level `safetyIdentifier` applies when you have not set a provider-specific identifier. If you set `openai.safetyIdentifier` or `anthropic.metadata.userId` directly, those values win for requests they apply to.

On the OpenAI Chat Completions API, the `user` field also maps to a safety identifier for backwards compatibility. If you set both `user` and `safetyIdentifier`, the `safetyIdentifier` value is used.


---

[View full sitemap](/docs/sitemap)
