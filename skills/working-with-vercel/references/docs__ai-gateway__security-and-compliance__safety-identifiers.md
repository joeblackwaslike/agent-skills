---
title: AI Gateway Safety Identifiers
product: vercel
url: /docs/ai-gateway/security-and-compliance/safety-identifiers
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance/safety-identifiers"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/security-and-compliance
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis
summary: Learn how to send a unique safety identifier per end user through AI Gateway so provider-side abuse action isolates individual users instead of your...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/security-and-compliance/safety-identifiers.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "cced850e20820e03d806045188d0b18f010a32c9357378419f8a45281a5f232f"
---

# AI Gateway Safety Identifiers

A safety identifier tells providers like OpenAI, Anthropic, and Meta which of your end users a request belongs to, without sending anything that identifies that person. It gives providers a way to detect abuse at the level of a single user, so when one is flagged for a policy violation, the action targets that identifier instead of all of your team's traffic.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Provider Options](https://ai-sdk.dev/docs/foundations/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related)
- [AI Gateway App Attribution](https://vercel.com/docs/ai-gateway/ecosystem/app-attribution?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related) — Attribute your requests so Vercel can identify and feature your app on AI Gateway pages.
- [AI Gateway Provider Routing and Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway.
- [OpenAI Chat Completions Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related) — Configure provider options, model fallbacks, BYOK credentials, and prompt caching through AI Gateway.
- [OpenResponses Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API through AI Gateway.
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/security-and-compliance/safety-identifiers.graph.md](/docs/ai-gateway/security-and-compliance/safety-identifiers.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fsafety-identifiers&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set a safety identifier per request

Set `safetyIdentifier` in `providerOptions.gateway` to a unique, opaque ID for the end user on whose behalf the request is made, such as a UUID or a hash of your internal user ID. Hash a username or email address rather than sending it, and do not include personal information of any kind. For users who are not signed in, send a session ID instead. The value can be at most 64 characters.

> **💡 Note:** The Messages and Responses examples use `providerOptions.gateway`, which
> isn't part of the upstream SDK types. Their TypeScript examples spread these
> extension fields into the request, and their Python examples use `extra_body`.
> Chat Completions accepts the typed `safety_identifier` field directly.

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="safety-identifier.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-6-astra',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      safetyIdentifier: 'user_9f8e7d6c5b',
    },
  },
});

console.log(text);
```

#### Python (beta)

```python filename="safety-identifier_ai.py"
import asyncio
import ai

async def main():
    model = ai.get_model("openai/gpt-6-astra")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"safetyIdentifier": "user_9f8e7d6c5b"}}}
    )
    async with ai.stream(model, messages, params=params) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

Set `safety_identifier` at the top level of the Chat Completions request body. AI Gateway maps this field to `providerOptions.gateway.safetyIdentifier`, so it works across the [supported providers](#which-providers-receive-the-identifier). The value must be a non-empty string. AI Gateway truncates values longer than 64 characters.

#### TypeScript

```typescript filename="safety-identifier-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'openai/gpt-6-astra',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  safety_identifier: 'user_9f8e7d6c5b',
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="safety-identifier_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="openai/gpt-6-astra",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    safety_identifier="user_9f8e7d6c5b",
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="safety-identifier-chat.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "openai/gpt-6-astra",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "safety_identifier": "user_9f8e7d6c5b"
}'
```

#### Messages API

#### TypeScript

```typescript filename="safety-identifier-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: 'openai/gpt-6-astra',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  max_tokens: 1024,
  ...{
    providerOptions: {
      gateway: {
        safetyIdentifier: 'user_9f8e7d6c5b',
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="safety-identifier_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="openai/gpt-6-astra",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"safetyIdentifier": "user_9f8e7d6c5b"}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="safety-identifier-messages.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "openai/gpt-6-astra",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "max_tokens": 1024,
  "providerOptions": {
    "gateway": {
      "safetyIdentifier": "user_9f8e7d6c5b"
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="safety-identifier-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'openai/gpt-6-astra',
  input: 'Explain quantum computing in two sentences.',
  ...{
    providerOptions: {
      gateway: {
        safetyIdentifier: 'user_9f8e7d6c5b',
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="safety-identifier_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="openai/gpt-6-astra",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"safetyIdentifier": "user_9f8e7d6c5b"}}},
)

print(response.output_text)
```

#### cURL

```bash filename="safety-identifier-responses.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "openai/gpt-6-astra",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "gateway": {
      "safetyIdentifier": "user_9f8e7d6c5b"
    }
  }
}'
```

### Using the Embeddings API

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

  ...{
    providerOptions: {
      gateway: {
        safetyIdentifier: 'user_9f8e7d6c5b',
      },
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

## Which providers receive the identifier

AI Gateway forwards the identifier to whichever provider serves the request, using that provider's field:

- OpenAI models, including when served by Azure or Bedrock, receive it as OpenAI's `safety_identifier`
- Models served by Meta receive it as `safety_identifier`
- Anthropic models, including when served by Vertex or Claude Platform on AWS, receive it as Anthropic's `metadata.user_id`

The identifier follows the request across provider and model fallbacks, so the same value reaches whichever provider ultimately serves the request.

## Precedence

The `providerOptions.gateway.safetyIdentifier` option applies when you have not set a provider-specific identifier. If you set `providerOptions.openai.safetyIdentifier` or `providerOptions.anthropic.metadata.userId` directly, those values win for requests they apply to.

On the Chat Completions API, `providerOptions.gateway.safetyIdentifier` takes precedence over the top-level `safety_identifier` field. Both take precedence over the legacy `user` field, which also maps to a safety identifier for backwards compatibility.


---

[View full sitemap](/docs/sitemap)
