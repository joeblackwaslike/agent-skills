---
title: AI Gateway Zero Data Retention (ZDR)
product: vercel
url: /docs/ai-gateway/security-and-compliance/zdr
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance/zdr"
last_updated: 2026-09-22
type: how-to
prerequisites:
  - /docs/ai-gateway/security-and-compliance
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/security-and-compliance/disallow-prompt-training
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/token-pass
  - /docs/ai-gateway/faq
summary: Learn about zero data retention policies and how to enforce ZDR on a per-request basis with AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/security-and-compliance/zdr.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "322521ae7aa314937d072dc7ae97ab9daa5b74d545942834e99eb28c28fea1c4"
---

# AI Gateway Zero Data Retention (ZDR)

Zero data retention (ZDR) is available on AI Gateway for Pro and Enterprise teams and for any team that has purchased AI Gateway credits. See [Availability](#availability) for details. There are two ways to enforce ZDR:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway now supports Private Inference](https://vercel.com/changelog/ai-gateway-now-supports-private-inference)
- [ Routing rules now available on AI Gateway](https://vercel.com/changelog/ai-gateway-routing-rules)
- [Cat Jam is now available in stealth for free on AI Gateway](https://vercel.com/changelog/cat-jam-is-now-available-in-stealth-for-free-on-ai-gateway)
- [Claude Fable 5.2 now available on AI Gateway](https://vercel.com/changelog/claude-fable-5-2-now-available-on-ai-gateway)
- [Claude Haiku 5.5 now available on AI Gateway](https://vercel.com/changelog/claude-haiku-5-5-now-available-on-ai-gateway)
- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [How to classify, route, and score with Jev and AI SDK](https://vercel.com/kb/guide/typesafe-jev-and-ai-sdk) — Use Jev from TypeSafe AI with AI SDK's experimental \\`evaluate\\` API to classify, route, score, and verify inside your a
- [Vercel Ship 2026 recap](https://vercel.com/blog/vercel-ship-2026-recap)
- [GPT-Live](https://vercel.com/docs/ai-gateway/modalities/realtime/gpt-live) — Connect GPT-Live through AI Gateway to stream voice, handle client delegation, and track session duration.
- [AI Gateway Trace Drains](https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains) — Forward an OpenTelemetry trace of every AI Gateway request to your own observability tool, and understand trace drain bi

Full cross-link map for this page: [/docs/ai-gateway/security-and-compliance/zdr.graph.md](/docs/ai-gateway/security-and-compliance/zdr.graph.md)
<!-- /docsgraph:related -->

- **Team-wide**: Enable ZDR globally from the [AI Gateway Dashboard Settings tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=AI+Gateway). Once enabled, all requests are routed to ZDR-compliant providers.
- **Per-request**: Set `zeroDataRetention: true` in `providerOptions.gateway` for individual requests. This gives you fine-grained control over which requests require ZDR.

These two methods work as an OR: if either is enabled, ZDR is enforced for that request.

> **💡 Note:** A provider that offers ZDR may exclude specific models, tools, or request
> types from it. AI Gateway rejects requests in some of these cases. ZDR doesn't
> extend to others, such as tools that a provider runs. Check [what ZDR
> covers](#what-zdr-covers) before you send data.

ZDR and [disallowing prompt training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training) are separate controls.

> **💡 Note:** AI Gateway skips your [BYOK (Bring Your Own
> Key)](/docs/ai-gateway/authentication-and-byok/byok) keys by default when ZDR
> is enabled, since BYOK keys operate under your own agreements with providers.
> You can mark individual BYOK keys as ZDR-compliant to include them in the ZDR
> routing set. See [BYOK](#byok) for details.

## Pricing

| Option                          | Cost                     |
| ------------------------------- | ------------------------ |
| Per-request zero data retention | No additional cost       |
| Team-wide zero data retention   | $0.10 per 1,000 requests |

Team-wide ZDR is charged on each request AI Gateway bills. That includes a request billed without completing normally, such as a response the provider blocks on safety grounds and still charges for. Requests that fail and that AI Gateway doesn't bill are not charged.

## Availability

Per-request and team-wide ZDR both require a paid account, which means a Pro or Enterprise plan or purchased AI Gateway credits. Hobby teams and teams on a Pro trial can use ZDR once they [purchase credits](/docs/ai-gateway/pricing#top-up-your-ai-gateway-credits). Free credits don't count.

With an active [Token Pass](/docs/ai-gateway/token-pass), you can also use per-request ZDR for as long as the pass is active, even after you've used its monthly credit. Turning on team-wide ZDR in the dashboard still requires a Pro or Enterprise plan or purchased AI Gateway credits.

If you request ZDR from a team that isn't eligible, AI Gateway returns a `403`:

```json
{
  "error": "Zero Data Retention (ZDR) requires a paid account. Current plan: hobby. Please purchase AI Gateway credits at https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dtop-up or upgrade your plan at https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling to access this feature. If you purchased credits in the last few minutes, retry shortly.",
  "type": "permission_denied",
  "statusCode": 403
}
```

AI Gateway checks your payment status again before it returns this error, so a credit purchase usually applies to your next request. If you purchased credits in the last few minutes and still get a `403`, retry shortly.

## Vercel

AI Gateway has a ZDR policy and does not retain the prompts or responses in your requests. That content is immediately and permanently deleted after requests are completed. No action is needed on the user side.

AI Gateway does record request metadata for billing, observability, and debugging, such as the model, provider, token usage, cost, and duration. For the full list, see [what AI Gateway logs about your requests](/docs/ai-gateway/faq#what-does-ai-gateway-log-about-my-requests).

## Providers

AI Gateway has agreements in place to offer ZDR with specific providers. A provider's default policy may not match with the status that AI Gateway has in place due to these agreements.

Provider ZDR on AI Gateway is self-reported. Each provider states its ZDR commitment in its own policy or in its agreement with Vercel, and AI Gateway routes ZDR requests based on that commitment.

By default, AI Gateway does not route based on the data retention policy of providers.

> **💡 Note:** If we do not know a provider's ZDR stance or have not yet established an
> agreement with them, they are treated as not being ZDR-compliant. If ZDR is
> enabled for a request, it will not be routed through this provider.

## What ZDR covers

ZDR applies per model and per provider. A provider in the [ZDR providers list](#zdr-providers-and-policies) can offer ZDR for some of its models and not for others, and some tools and request types fall outside a provider's ZDR policy.

With ZDR enabled, AI Gateway handles each case as follows:

| Case                                                                                                                                                                                                 | What AI Gateway does                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| A provider doesn't offer ZDR for the model you request                                                                                                                                               | Skips that provider and routes to one that does. If none remain, the request fails with a `no_zdr_providers_available` error.                    |
| The model retains data on every provider, such as the Claude Fable models                                                                                                                            | Fails the request.                                                                                                                               |
| Tools that AI Gateway runs, such as the [AI Gateway search and fetch tools](/docs/ai-gateway/models-and-providers/web-search)                                                                        | Fails the request with a `400` error when the tool's vendor has no ZDR commitment. The error names the tool and the vendor.                      |
| [Batch jobs](/docs/ai-gateway/models-and-providers/batch-processing#zero-data-retention) | Rejects the batch at submission, because providers store batch inputs and results for the lifetime of the batch. Send synchronous requests instead. |
| [Asynchronous video jobs](/docs/ai-gateway/modalities/video-generation#asynchronous-generation) | Rejects the job at submission. Asynchronous video jobs don't support ZDR yet. |
| Tools that the provider runs, such as [provider-specific web search](/docs/ai-gateway/models-and-providers/web-search#provider-specific-search) or grounding                                         | **Doesn't block the request.** A separate service can process and retain the data you send to the tool, under its own terms.                     |
| [Prompt caching](#caching-and-zero-data-retention)                                                                                                                                                   | **Doesn't block the request.** AI Gateway doesn't count a provider's short-lived prompt cache as retaining data. |

These cases describe requests served with Vercel's provider keys. With a [BYOK](#byok) key that you marked as ZDR, your own agreement with the provider decides which models and tools are covered.

> **💡 Note:** ZDR applies to which provider serves the model request. It doesn't extend to
> tools that the provider runs, such as web search or grounding. A separate
> service may run those tools and keep the data you send, under its own
> retention policy. Review that policy if you have strict retention
> requirements.

> **💡 Note:** Providers keep repeated prompt data in a short-lived cache so they don't
> process it again. AI Gateway doesn't count this as retaining data, so ZDR
> requests can use models that cache prompts. If your definition of zero data
> retention rules out cached data, review the provider's policy before you rely
> on caching.

## Team-wide zero data retention

Pro and Enterprise teams, and teams that have purchased AI Gateway credits, can enable ZDR globally for all requests from the [AI Gateway Dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=AI+Gateway). If your team isn't eligible, you can't turn on the toggle, and the settings page links to buying AI Gateway credits. If your team stops being eligible while team-wide ZDR is on, for example after downgrading from Pro, you can still turn it off.

To enable team-wide ZDR:

1. Go to the [AI Gateway Dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway)
2. Navigate to the [**Settings** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fsettings\&title=AI+Gateway+Settings)
3. Toggle on the **Zero Data Retention** option

Once enabled, team-wide ZDR applies to all requests through the Vercel team you configured it for. For how team-wide ZDR interacts with [BYOK](/docs/ai-gateway/authentication-and-byok/byok) keys, see [BYOK](#byok).

Team-wide ZDR and [team-wide disallow prompt training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training#team-wide-disallow-prompt-training) are separate settings, and turning on one doesn't turn on the other. To enforce both for your team, turn on both the **Zero Data Retention** and **Disallow Prompt Training** toggles. Team-wide disallow prompt training has no additional cost.

### Exempt an API key from team-wide ZDR

Team owners can create an API key that's exempt from the team's ZDR-only model restriction, for work that needs a model without ZDR. Create it with the Vercel CLI, and give it an expiration so the exemption doesn't outlive that work:

```bash filename="terminal"
vercel ai-gateway api-keys create --name escape-hatch --zdr-exempt --expiration 7d
```

`vercel ai-gateway api-keys inspect` shows a `zdr exempt` row for these keys, so you can audit which keys carry the exemption. See [`api-keys create`](/docs/cli/ai-gateway#create) for every option.

## Per-request zero data retention

You can enforce ZDR on individual requests using the `zeroDataRetention` parameter in `providerOptions.gateway`. Set `zeroDataRetention` to `true` to route the request only through providers that have zero data retention agreements with Vercel AI Gateway.

If your team isn't eligible for ZDR, the request fails with a `403` (see [Availability](#availability)). If no ZDR-compliant providers are available for the requested model, the request fails with an error:

```json
{
  "error": "No ZDR (Zero Data Retention) providers or ZDR-attested BYOK credentials available for model: example/model-name. Providers considered: provider-a, provider-b",
  "type": "no_zdr_providers_available",
  "statusCode": 400
}
```

When ZDR is enabled, successful responses include `enabledZeroDataRetention: true` in the gateway metadata. The `routing.skippedProviderAttempts` array lists each provider AI Gateway removed for ZDR, with the reason:

```json
{
  "gateway": {
    "routing": {
      "skippedProviderAttempts": [
        {
          "provider": "provider-c",
          "credentialType": "system",
          "reason": "zdr_not_supported"
        }
      ]
    },
    "enabledZeroDataRetention": true
  }
}
```

| Reason                 | Meaning                                                                           |
| ---------------------- | --------------------------------------------------------------------------------- |
| `zdr_not_supported`    | The provider doesn't offer ZDR for this model.                                    |
| `zdr_not_attested`     | Your BYOK key for this provider isn't marked as ZDR-compliant. See [BYOK](#byok). |
| `zdr_ineligible_model` | The model retains data, so no provider can serve it with ZDR.                     |

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

When ZDR is enabled, either team-wide or per-request, AI Gateway skips your [BYOK](/docs/ai-gateway/authentication-and-byok/byok) keys by default. BYOK keys operate under your own agreements and permissions with providers, which can differ from the ZDR agreements Vercel has negotiated for its own provider keys.

If you have your own ZDR agreement with a provider, you can mark a BYOK key as ZDR-compliant. AI Gateway then includes that key in the ZDR routing set. This option applies to both team-wide and request-level ZDR.

Marking a key as ZDR makes it eligible for ZDR routing. It does not enable ZDR by itself. ZDR routing applies only when team-wide ZDR is on or the request sets `zeroDataRetention: true`.

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
2. If those BYOK keys fail or are unavailable, AI Gateway falls back to Vercel's provider keys for the ZDR-compliant providers in the routing set. If your team turned off [Fallback to Vercel Keys](/docs/ai-gateway/authentication-and-byok/byok#turn-off-fallback-to-vercel-keys), the request fails instead.
3. If no ZDR-compliant providers are available for the model, the request fails with a `no_zdr_providers_available` error.

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

**Routing set for Vercel's provider keys:**

- Providers that serve `anthropic/claude-sonnet-5` on Vercel's provider keys: Anthropic, Google Vertex, Amazon Bedrock
- Filter to providers Vercel has ZDR agreements with: Anthropic, Google Vertex, Amazon Bedrock

**Final routing order:**

1. Anthropic BYOK (ZDR-marked) is tried first.
2. If that fails, AI Gateway falls back to Vercel's provider keys for Anthropic, Google Vertex, or Amazon Bedrock. With Fallback to Vercel Keys off, the request fails instead.

Your Google Vertex BYOK is filtered out because you didn't mark it as ZDR, but Google Vertex is still reachable through Vercel's provider keys. With Fallback to Vercel Keys off, it isn't. Your OpenAI BYOK is filtered out because OpenAI doesn't serve `anthropic/claude-sonnet-5`.

## Using both account and request-level ZDR

Team-wide ZDR toggled to enabled overrides request-level `zeroDataRetention: false` since these options work together as an OR. If either option is enabled, ZDR is enforced on the request.

## Caching and zero data retention

When you use [prompt caching](/docs/ai-gateway/models-and-providers/automatic-caching) through AI Gateway, caching happens at the provider level. To serve a cache hit, the provider holds a representation of your prompt for the cache lifetime, which can be up to 24 hours.

AI Gateway doesn't count this short-lived cache as retaining data, so ZDR requests can use models that cache prompts. If your definition of zero data retention rules out cached data, review the provider's policy for where it holds cached data and for how long.

## ZDR providers and policies

The following providers currently offer ZDR on AI Gateway. Please review each provider's ZDR policy and terms carefully. A provider's default policy may not match with the status that AI Gateway has in place due to negotiated agreements. We are constantly coordinating and revising agreements to be able to enforce stricter retention policies for customers. The full terms of service are available for each provider on the [model pages](/ai-gateway/models).

The table also shows whether each provider [disallows prompt training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training), which is a separate control from ZDR.

A checkmark in the ZDR column means the provider offers self-reported ZDR on AI Gateway. It may still exclude specific models, tools, or request types. See [What ZDR covers](#what-zdr-covers) for how AI Gateway handles each exclusion, and review the provider's policy in the table for the details.

Provider

No prompt training

ZDR

Policy

Notes

Alibaba Cloud

✓

✓

Custom policy

—

Anthropic

\*

✓

✓

ZDR policy

Claude Fable models are not ZDR. Anthropic retains prompts and outputs for 30 days.
Excludes the code execution tool and programmatic tool calling. Container data is kept for up to 30 days.
Excludes the MCP connector and Agent Skills.
Excludes dynamic filtering for web search and web fetch.

Azure

✓

✓

Data privacy

—

Baseten

✓

✓

Security

—

Bedrock

\*

✓

✓

Data protection

—

Claude Platform on AWS

✓

✓

ZDR policy

Excludes the code execution tool, programmatic tool calling, the MCP connector, and Agent Skills.
Excludes dynamic filtering for web search and web fetch.

DigitalOcean

✓

✓

Data policy

—

Exa

✓

✓

Custom Policy

Covers the Exa search tool: Exa's own web crawl and search index are outside ZDR.

Fireworks

✓

✓

Data handling

—

Google Vertex AI

\*

✓

✓

ZDR policy

—

Groq

✓

✓

ZDR policy

—

Meta

✓

✓

ZDR policy

Muse Spark contributor models are not ZDR.
Meta may retain content where the law requires it or to address misuse.

Mistral

✓

✓

Terms of service

—

Modal

✓

✓

ZDR policy

—

Moonshot AI

✓

✓

Custom policy

—

Morph

✓

✓

ZDR policy

—

Nebius

✓

✓

Legal quick guide

—

OpenAI

✓

✓

ZDR with safety retention

Image, transcription, realtime, embedding, and speech models are not ZDR.
OpenAI scans image and file inputs for CSAM and retains flagged images for manual review.
Data sent to a remote MCP server follows that server's retention policy.

Parallel AI

✓

✓

Custom terms

Covers the Parallel search tool only. The Parallel Decisions model is not ZDR.

Parasail

✓

✓

Terms of service

—

Particle.AI

✓

✓

ZDR policy

—

Perplexity

✓

✓

ZDR policy

Covers the Perplexity search tool only. Sonar, embedding, and Decider models are not ZDR.

Relace

✓

✓

ZDR policy

—

Runware

✓

✓

ZDR policy

—

Together AI

✓

✓

Terms of service

—

TypeSafe AI

✓

✓

Legal policy

Except as necessary to comply with its legal obligations, TypeSafe shall not retain (a) prompts that are Customer Data for any longer than is necessary to generate Output for Customer and (b) Output for any longer than necessary to enable TypeSafe to fulfil its obligations to Customer under the Agreement.

Wafer

✓

✓

ZDR policy

—

xAI

✓

✓

ZDR policy

Grok Imagine video models are not ZDR.

\* Claude Fable models do not support ZDR on any provider, including Anthropic, Google Vertex, and Amazon Bedrock. Anthropic has determined this is required because some misuse patterns only become visible across cumulative requests. Prompts and completions are retained for 30 days and are not used to train Claude.

Vercel Token Pass models are served through the `token-pass` provider. Token Pass currently serves its models through Wafer and follows Wafer's zero data retention policy and terms.

## Zero data retention in virtual models

A [virtual model](/docs/ai-gateway/models-and-providers/virtual-models) can restrict its traffic to zero-data-retention providers. The setting only tightens: either side can turn it on, and neither side can turn it off.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
