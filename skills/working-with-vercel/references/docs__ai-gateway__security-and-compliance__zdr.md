---
title: AI Gateway Zero Data Retention (ZDR)
product: vercel
url: /docs/ai-gateway/security-and-compliance/zdr
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance/zdr"
last_updated: 2026-09-10
type: how-to
prerequisites:
  - /docs/ai-gateway/security-and-compliance
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/security-and-compliance/disallow-prompt-training
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/models-and-providers/automatic-caching
summary: Learn about zero data retention policies and how to enforce ZDR on a per-request basis with AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/security-and-compliance/zdr.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "e9313c2862e02b707decd8669f2d03f30aaf28047ac4ecb46d1370059d40bf30"
---

# AI Gateway Zero Data Retention (ZDR)

Zero data retention (ZDR) is available for Pro and Enterprise users on AI Gateway. There are two ways to enforce ZDR:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [ Routing rules now available on AI Gateway](https://vercel.com/changelog/ai-gateway-routing-rules?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fzdr&source_site=vercel-docs&relationship=related)
- [Inkling Small from Thinking Machines is now available on AI Gateway](https://vercel.com/changelog/inkling-small-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fzdr&source_site=vercel-docs&relationship=related)
- [Kimi K3 and Kimi K3 Fast with ZDR and US-based providers now on AI Gateway](https://vercel.com/changelog/kimi-k3-and-kimi-k3-fast-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fzdr&source_site=vercel-docs&relationship=related)
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fzdr&source_site=vercel-docs&relationship=related)
- [TypeSafe AI's Jev now available on AI Gateway](https://vercel.com/changelog/typesafe-ai-jev-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fzdr&source_site=vercel-docs&relationship=related)
- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fzdr&source_site=vercel-docs&relationship=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fzdr&source_site=vercel-docs&relationship=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [How to classify, route, and score with Jev and AI SDK](https://vercel.com/kb/guide/typesafe-jev-and-ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fzdr&source_site=vercel-docs&relationship=related) — Use Jev from TypeSafe AI with AI SDK's experimental \\`evaluate\\` API to classify, route, score, and verify inside your a
- [GPT-Live](https://vercel.com/docs/ai-gateway/modalities/realtime/gpt-live?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fzdr&source_site=vercel-docs&relationship=related) — Connect GPT-Live through AI Gateway to stream voice, handle client delegation, and track session duration.
- [AI Gateway Trace Drains](https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fzdr&source_site=vercel-docs&relationship=related) — Forward an OpenTelemetry trace of every AI Gateway request to your own observability tool, and understand trace drain bi
- [vercel ai-gateway](https://vercel.com/docs/cli/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fzdr&source_site=vercel-docs&relationship=related) — Manage AI Gateway resources from the Vercel CLI: API keys, budgets, routing rules, virtual models, models, leaderboards,

Full cross-link map for this page: [/docs/ai-gateway/security-and-compliance/zdr.graph.md](/docs/ai-gateway/security-and-compliance/zdr.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsecurity-and-compliance%2Fzdr&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- **Team-wide**: Enable ZDR globally from the [AI Gateway Dashboard Settings tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=AI+Gateway). Once enabled, all requests are routed to ZDR-compliant providers.
- **Per-request**: Set `zeroDataRetention: true` in `providerOptions.gateway` for individual requests. This gives you fine-grained control over which requests require ZDR.

These two methods work as an OR: if either is enabled, ZDR is enforced for that request.

ZDR is a superset of [disallowing prompt training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training). All ZDR-compliant providers also disallow prompt training, but not all providers that disallow prompt training offer full zero data retention.

> **💡 Note:** AI Gateway skips your [BYOK (Bring Your Own
> Key)](/docs/ai-gateway/authentication-and-byok/byok) keys by default when ZDR
> is enabled, since BYOK keys operate under your own agreements with providers.
> You can mark individual BYOK keys as ZDR-compliant to include them in the ZDR
> routing set. See [BYOK](#byok) for details.

## Pricing

| Option                          | Cost                     | Availability       |
| ------------------------------- | ------------------------ | ------------------ |
| Per-request zero data retention | No additional cost       | Pro and Enterprise |
| Team-wide zero data retention   | $0.10 per 1,000 requests | Pro and Enterprise |

Team-wide ZDR is only charged on successful responses that return usage data. Requests that fail or return errors are not charged.

## Vercel

AI Gateway has a ZDR policy and does not retain prompts, outputs, or sensitive data. User data is immediately and permanently deleted after requests are completed. No action is needed on the user side.

## Providers

AI Gateway has agreements in place to offer ZDR with specific providers. A provider's default policy may not match with the status that AI Gateway has in place due to these agreements.

By default, AI Gateway does not route based on the data retention policy of providers.

> **💡 Note:** If we do not know a provider's ZDR stance or have not yet established an
> agreement with them, they are treated as not being ZDR-compliant. If ZDR is enabled
> for a request, it will not be routed through this provider.

## Team-wide zero data retention

Pro and Enterprise customers can enable ZDR globally for all requests from the [AI Gateway Dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=AI+Gateway).

To enable team-wide ZDR:

1. Go to the [AI Gateway Dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway)
2. Navigate to the [**Settings** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fsettings\&title=AI+Gateway+Settings)
3. Toggle on the **Zero Data Retention** option

Once enabled, team-wide ZDR applies to all requests through the Vercel team you configured it for. For how team-wide ZDR interacts with [BYOK](/docs/ai-gateway/authentication-and-byok/byok) keys, see [BYOK](#byok).

## Per-request zero data retention

You can enforce ZDR on individual requests using the `zeroDataRetention` parameter in `providerOptions.gateway`. Set `zeroDataRetention` to `true` to route the request only through providers that have zero data retention agreements with Vercel AI Gateway.

If no ZDR-compliant providers are available for the requested model, the request fails with an error:

```json
{
  "error": "No ZDR (Zero Data Retention) providers available for model: example/model-name. Providers considered: provider-a, provider-b",
  "type": "no_providers_available",
  "statusCode": 400
}
```

When ZDR is enabled, the routing metadata in successful responses shows how AI Gateway filtered providers. The `planningReasoning` field indicates which providers were considered:

```json
{
  "gateway": {
    "routing": {
      "planningReasoning": "ZDR requested: 5 attempts → 2 ZDR attempts. ZDR execution order: anthropic(system) → bedrock(system)"
    }
  }
}
```

ZDR enforcement also applies to any fallback providers. For how per-request ZDR interacts with [BYOK](/docs/ai-gateway/authentication-and-byok/byok) keys, see [BYOK](#byok).

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

See the [AI SDK zero-data-retention reference](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#zero-data-retention-example) for SDK configuration and usage.

```typescript filename="zdr.ts" {8}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Analyze this example business data: revenue grew by 5%.',
  providerOptions: {
    gateway: {
      zeroDataRetention: true,
    },
  },
});

console.log(text);
```

#### Python (beta)

```python filename="zdr_ai.py" {8}
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("Analyze this example business data: revenue grew by 5%.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"zeroDataRetention": True}}}
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

```typescript filename="zdr-chat.ts" {20}
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
      content: 'Analyze this example business data: revenue grew by 5%.',
    },
  ],
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    providerOptions: {
      gateway: {
        zeroDataRetention: true,
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="zdr_chat.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Analyze this example business data: revenue grew by 5%."}],
    extra_body={"providerOptions": {"gateway": {"zeroDataRetention": True}}},
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="zdr-chat.sh" {11}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions -H "Authorization: Bearer $AI_GATEWAY_API_KEY" -H "Content-Type: application/json" -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Analyze this example business data: revenue grew by 5%."
    }
  ],
  "providerOptions": {
    "gateway": {
      "zeroDataRetention": true
    }
  }
}'
```

#### Messages API

#### TypeScript

```typescript filename="zdr-messages.ts" {20}
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
      content: 'Analyze this example business data: revenue grew by 5%.',
    },
  ],
  max_tokens: 1024,
  ...{
    providerOptions: {
      gateway: {
        zeroDataRetention: true,
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="zdr_messages.py" {13}
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Analyze this example business data: revenue grew by 5%."}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"zeroDataRetention": True}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="zdr-messages.sh" {12}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages -H "Authorization: Bearer $AI_GATEWAY_API_KEY" -H "Content-Type: application/json" -H "anthropic-version: 2023-06-01" -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Analyze this example business data: revenue grew by 5%."
    }
  ],
  "max_tokens": 1024,
  "providerOptions": {
    "gateway": {
      "zeroDataRetention": true
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="zdr-responses.ts" {14}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'anthropic/claude-sonnet-5',
  input: 'Analyze this example business data: revenue grew by 5%.',
  ...{
    providerOptions: {
      gateway: {
        zeroDataRetention: true,
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="zdr_responses.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input="Analyze this example business data: revenue grew by 5%.",
    extra_body={"providerOptions": {"gateway": {"zeroDataRetention": True}}},
)

print(response.output_text)
```

#### cURL

```bash filename="zdr-responses.sh" {6}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses -H "Authorization: Bearer $AI_GATEWAY_API_KEY" -H "Content-Type: application/json" -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "Analyze this example business data: revenue grew by 5%.",
  "providerOptions": {
    "gateway": {
      "zeroDataRetention": true
    }
  }
}'
```

## BYOK

When ZDR is enabled, either team-wide or per-request, AI Gateway skips your [BYOK](/docs/ai-gateway/authentication-and-byok/byok) keys by default. BYOK keys operate under your own agreements and permissions with providers, which can differ from the ZDR agreements Vercel has negotiated for AI Gateway system credentials.

If you have your own ZDR agreement with a provider, you can mark a BYOK key as ZDR-compliant. AI Gateway then includes that key in the ZDR routing set. This option applies to both team-wide and request-level ZDR.

To mark a BYOK key as ZDR:

1. Go to the [AI Gateway Bring Your Own Key (BYOK) page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbyok\&title=AI+Gateway+BYOK) in your Vercel dashboard.
2. Add a new key or edit an existing one.
3. Toggle on **Zero Data Retention**.

> **💡 Note:** You take responsibility for any BYOK key you mark as ZDR. Vercel has no
> visibility into your agreements with providers, so confirm your contract
> covers zero data retention before marking a key.

### Fallback behavior

When ZDR is enabled, AI Gateway filters the routing set for each model to ZDR-compliant providers only:

1. If you have BYOK keys for a ZDR-compliant provider that you marked as ZDR, AI Gateway tries those keys first.
2. If those BYOK keys fail or are unavailable, AI Gateway falls back to AI Gateway system credentials for the ZDR-compliant providers in the routing set.
3. If no ZDR-compliant providers are available for the model, the request fails with a `no_providers_available` error.

### Example

Consider the following setup:

- You have a BYOK key for Anthropic, marked as ZDR, because you have a direct ZDR agreement with Anthropic.
- You have a BYOK key for Google Vertex, not marked as ZDR.
- You have a BYOK key for OpenAI, not marked as ZDR.
- You send a request to `anthropic/claude-sonnet-5` with `zeroDataRetention: true`.

AI Gateway builds the ZDR routing set in two parts.

**BYOK routing set:**

- Your BYOK keys: Anthropic, Google Vertex, OpenAI
- Filter to ZDR-marked keys: Anthropic
- Filter to keys for providers serving `anthropic/claude-sonnet-5`: Anthropic

**System credentials routing set:**

- System providers serving `anthropic/claude-sonnet-5`: Anthropic, Google Vertex, Amazon Bedrock
- Filter to providers Vercel has ZDR agreements with: Anthropic, Google Vertex, Amazon Bedrock

**Final routing order:**

1. Anthropic BYOK (ZDR-marked) is tried first.
2. If that fails, AI Gateway falls back to system credentials for Anthropic, Google Vertex, or Amazon Bedrock.

Your Google Vertex BYOK is filtered out because you didn't mark it as ZDR, but Google Vertex is still reachable through system credentials. Your OpenAI BYOK is filtered out because OpenAI doesn't serve `anthropic/claude-sonnet-5`.

## Using both account and request-level ZDR

Team-wide ZDR toggled to enabled overrides request-level `zeroDataRetention: false` since these options work together as an OR. If either option is enabled, ZDR is enforced on the request.

## Caching and zero data retention

When you use [prompt caching](/docs/ai-gateway/models-and-providers/automatic-caching) through AI Gateway, caching happens at the provider level. Whether that caching is ZDR-compliant depends on the provider.

## ZDR providers and policies

The following providers currently offer ZDR on AI Gateway. Please review each provider's ZDR policy and terms carefully. A provider's default policy may not match with the status that AI Gateway has in place due to negotiated agreements. We are constantly coordinating and revising agreements to be able to enforce stricter retention policies for customers. The full terms of service are available for each provider on the [model pages](/ai-gateway/models).

All ZDR-compliant providers also disallow prompt training, since ZDR is a superset of [disallowing prompt training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training). In some cases, certain models or functionalities may be excluded from a provider's ZDR policy. AI Gateway will not fail these requests if zero data retention is enabled, so review the provider's policy in the table below to understand the nuances of specific tools and how they affect data retention.

Provider

No prompt training

ZDR

Policy

Alibaba Cloud

✓

✓

Custom policy

Anthropic

\*

✓

✓

ZDR policy

Azure

✓

✓

Data privacy

Baseten

✓

✓

Security

Bedrock

\*

✓

✓

Data protection

Cerebras

✓

✓

Privacy policy

Claude Platform on AWS

✓

✓

ZDR policy

DeepInfra

✓

✓

Data handling

DigitalOcean

✓

✓

ZDR policy

Fireworks

✓

✓

Data handling

Google Vertex AI

\*

✓

✓

ZDR policy

Groq

✓

✓

ZDR policy

Mistral

✓

✓

Terms of service

Modal

✓

✓

ZDR policy

Moonshot AI

✓

✓

Custom policy

Morph

✓

✓

ZDR policy

Nebius

✓

✓

Legal quick guide

Parasail

✓

✓

Terms of service

Particle.AI

✓

✓

ZDR policy

Together AI

✓

✓

Terms of service

TypeSafe AI

✓

✓

Except as necessary to comply with its legal obligations, TypeSafe shall not retain (a) prompts that are Customer Data for any longer than is necessary to generate Output for Customer and (b) Output for any longer than necessary to enable TypeSafe to fulfil its obligations to Customer under the Agreement.

Wafer

✓

✓

ZDR policy

xAI

✓

✓

ZDR policy

\* `anthropic/claude-fable-5` does not support ZDR on any provider, including Anthropic, Google Vertex, and Amazon Bedrock. Anthropic has determined this is required because some misuse patterns only become visible across cumulative requests. Prompts and completions are retained for 30 days and are not used to train Claude.


---

[View full sitemap](/docs/sitemap)
