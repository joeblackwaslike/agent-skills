---
title: AI Gateway Disallow Prompt Training
product: vercel
url: /docs/ai-gateway/security-and-compliance/disallow-prompt-training
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance/disallow-prompt-training"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/security-and-compliance
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/security-and-compliance/zdr
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/sdks-and-apis
summary: Learn how to prevent AI providers from using your prompts and responses for model training through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/security-and-compliance/disallow-prompt-training.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "1814697cf41d4302f0eb073e7a4b9b93cbe23c8f195a3bd4cae2a70737e14d03"
---

# AI Gateway Disallow Prompt Training

No training on prompt data is available to all AI Gateway users at no extra charge. This feature ensures your prompts are not used by AI providers to train their models. Set `disallowPromptTraining: true` in `providerOptions` to ensure requests are only routed to providers that do not use your data for training.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Zero Data Retention on AI Gateway](https://vercel.com/blog/zdr-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fdisallow-prompt-training&source_site=vercel-docs&relationship=related)
- [Team-wide Zero Data Retention and prompt training controls now on AI Gateway](https://vercel.com/changelog/zero-data-retention-no-prompt-training-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fdisallow-prompt-training&source_site=vercel-docs&relationship=related)
- [Team-wide provider allowlist on AI Gateway](https://vercel.com/changelog/team-wide-provider-allowlist-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fdisallow-prompt-training&source_site=vercel-docs&relationship=related)
- [AI Gateway Provider Routing and Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fdisallow-prompt-training&source_site=vercel-docs&relationship=related) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway.
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fdisallow-prompt-training&source_site=vercel-docs&relationship=related) — Answers to common questions about AI Gateway, including request errors, pricing and markup, SDK and API compatibility, m
- [AI Gateway Models and Providers](https://vercel.com/docs/ai-gateway/models-and-providers?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fdisallow-prompt-training&source_site=vercel-docs&relationship=related) — Choose AI Gateway models and providers. Configure routing, fallbacks, timeouts, prompt caching, reasoning, and web searc
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fdisallow-prompt-training&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/security-and-compliance/disallow-prompt-training.graph.md](/docs/ai-gateway/security-and-compliance/disallow-prompt-training.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fdisallow-prompt-training&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Disallow prompt training is a subset of [Zero Data Retention (ZDR)](/docs/ai-gateway/security-and-compliance/zdr). All ZDR-compliant providers also disallow prompt training, but not all providers that disallow prompt training offer full zero data retention.

> **💡 Note:** Disallow prompt training enforcement does not apply to [BYOK (Bring Your Own
> Key)](/docs/ai-gateway/authentication-and-byok/byok) requests. When you use BYOK, this filter is not
> enforced since the request uses your own API key, your
> configuration, and agreement with the provider. However, if AI Gateway falls
> back to AI Gateway system credentials, the disallow prompt training
> filter is honored on the failover request.

## Vercel

AI Gateway does not use your prompts or responses for training purposes. Your data is processed solely to fulfill your requests and is not retained for model improvement.

## Providers

AI Gateway has agreements in place with specific providers regarding the use of prompt data for training. A provider's default policy may not match with the status that AI Gateway has in place due to these agreements.

By default, AI Gateway does not route based on the training data policy of providers.

> **💡 Note:** If we do not know a provider's training data stance or have not yet
> established an agreement with them, we assume that they train on your data. If
> disallow prompt training is enabled on a request, it will not be routed
> through that provider.

## Disallow prompt training per request

Set `disallowPromptTraining` to `true` in `providerOptions` to ensure requests are only routed to providers that do not use your data for training. If you are looking for stricter controls that apply for all requests without configuration each time, see [team-wide zero data retention](/docs/ai-gateway/security-and-compliance/zdr#team-wide-zero-data-retention).

If no compliant providers are available for the requested model, the request fails with an error:

```json
{
  "error": "No providers available that disallow prompt training for model: example/model-name. Providers considered: provider-a, provider-b",
  "type": "no_providers_available",
  "statusCode": 400
}
```

This filter also applies to any fallback providers.

This enforcement does not apply to [BYOK](/docs/ai-gateway/authentication-and-byok/byok) requests since those use your own API key, configuration, and agreement with the provider. If AI Gateway falls back to AI Gateway system credentials, it honors the disallow prompt training filter on the failover request.

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

See the [AI SDK prompt-training-filter reference](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#disallow-prompt-training-example) for SDK configuration and usage.

```typescript filename="disallow-training.ts" {8}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      disallowPromptTraining: true,
    },
  },
});

console.log(text);
```

#### Python (beta)

```python filename="disallow-training_ai.py" {8}
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"disallowPromptTraining": True}}}
    )
    async with ai.stream(model, messages, params=params) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="disallow-training-chat.ts" {20}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    providerOptions: {
      gateway: {
        disallowPromptTraining: true,
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="disallow-training_chat.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    extra_body={"providerOptions": {"gateway": {"disallowPromptTraining": True}}},
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="disallow-training-chat.sh" {11}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions -H "Authorization: Bearer $AI_GATEWAY_API_KEY" -H "Content-Type: application/json" -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "providerOptions": {
    "gateway": {
      "disallowPromptTraining": true
    }
  }
}'
```

#### Messages API

#### TypeScript

```typescript filename="disallow-training-messages.ts" {20}
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: 'anthropic/claude-sonnet-5',
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
        disallowPromptTraining: true,
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="disallow-training_messages.py" {13}
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"disallowPromptTraining": True}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="disallow-training-messages.sh" {12}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages -H "Authorization: Bearer $AI_GATEWAY_API_KEY" -H "Content-Type: application/json" -H "anthropic-version: 2023-06-01" -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "max_tokens": 1024,
  "providerOptions": {
    "gateway": {
      "disallowPromptTraining": true
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="disallow-training-responses.ts" {14}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-sonnet-5',
  input: 'Explain quantum computing in two sentences.',
  ...{
    providerOptions: {
      gateway: {
        disallowPromptTraining: true,
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="disallow-training_responses.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"disallowPromptTraining": True}}},
)

print(response.output_text)
```

#### cURL

```bash filename="disallow-training-responses.sh" {6}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses -H "Authorization: Bearer $AI_GATEWAY_API_KEY" -H "Content-Type: application/json" -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "gateway": {
      "disallowPromptTraining": true
    }
  }
}'
```

## Combining filters

Disallow prompt training works alongside other filtering options like [Zero Data Retention (ZDR)](/docs/ai-gateway/security-and-compliance/zdr). When multiple filters are enabled, they work as an AND: requests are only routed to providers that satisfy all enabled filters.

For example, if you enable both disallow prompt training and ZDR on a request, that request will only be routed to providers that meet both criteria.

## Disallow prompt training providers

The following providers currently support no training on prompt data on AI Gateway. Please review each provider's policy and terms carefully. A provider's default policy may not match with the status that AI Gateway has in place due to negotiated agreements. We are constantly coordinating and revising agreements to be able to enforce stricter training policies for customers. The full terms of service are available for each provider on the model pages.

Provider

No prompt training

Policy

Alibaba Cloud

✓

Product terms

Anthropic

✓

Commercial terms

Azure

✓

Data privacy

Baseten

✓

Security

Bedrock

✓

Service terms

ByteDance

✓

Service terms

Cerebras

✓

Policies

Chutes

✓

Terms

Claude Platform on AWS

✓

Data policy

Cohere

✓

Privacy policy

DeepInfra

✓

Terms

DigitalOcean

✓

—

Fireworks

✓

Privacy policy

Google

✓

API terms

Google Vertex AI

✓

Zero data retention

Groq

✓

Security

Inception

✓

Enterprise

Inceptron

✓

Data policy

Interfaze

✓

Privacy policy

Mistral

✓

Commercial terms

Modal

✓

Terms of service

Moonshot AI

✓

Custom policy

Morph

✓

Terms of service

Nebius

✓

Terms of service

Novita AI

✓

Privacy policy

OpenAI

✓

API data policy

Parallel AI

✓

Customer terms

Parasail

✓

Privacy policy

Particle.AI

✓

Data policy

Perplexity

✓

Data collection

Prodia

✓

Privacy policy

Sakana AI

✓

Privacy policy

Together AI

✓

Terms of service

Voyage AI by MongoDB

✓

Terms of service

Wafer

✓

Data processing addendum

xAI

✓

Terms of service


---

[View full sitemap](/docs/sitemap)
