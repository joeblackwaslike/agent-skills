---
title: AI Gateway Regional Hosting
product: vercel
url: /docs/ai-gateway/security-and-compliance/regional-hosting
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance/regional-hosting"
last_updated: 2026-11-11
type: conceptual
prerequisites:
  - /docs/ai-gateway/security-and-compliance
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/security-and-compliance/regional-inference
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/models-and-providers/web-search
summary: Regional hosting lets you choose the region where AI Gateway receives your requests, by sending them to a regional endpoint in the EU or the US.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/security-and-compliance/regional-hosting.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c2ae04df6facdfc61b3cb3bb668c2dd3378152bdaa18f23be6ac479733b8e999"
---

# AI Gateway Regional Hosting

> **💡 Note:** Regional hosting is in beta. The behavior described here can change before
> general availability.

Regional hosting controls where your request enters AI Gateway. You use it by
sending requests to a regional endpoint. Requests sent to a region's endpoint
are received and decrypted in that region, wherever your app runs:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Regional inference now available on AI Gateway](https://vercel.com/changelog/regional-inference-now-available-on-ai-gateway)
- [AI Gateway Provider Headquarters](https://vercel.com/docs/ai-gateway/security-and-compliance/provider-headquarters) — Limit AI Gateway routing to providers whose parent company is headquartered in the countries you choose.
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq) — Answers to common questions about AI Gateway, including request errors, pricing and markup, caching, SDK and API compati
- [AI Gateway App Attribution](https://vercel.com/docs/ai-gateway/ecosystem/app-attribution) — Attribute your requests so Vercel can identify and feature your app on AI Gateway pages.
- [AI Gateway Models and Providers](https://vercel.com/docs/ai-gateway/models-and-providers) — Choose AI Gateway models and providers. Configure routing, fallbacks, timeouts, prompt caching, reasoning, and web searc
- [Go with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/go) — Use AI Gateway from any Go application with the OpenAI or Anthropic Go SDKs, including model fallbacks, cost tracking, a

Full cross-link map for this page: [/docs/ai-gateway/security-and-compliance/regional-hosting.graph.md](/docs/ai-gateway/security-and-compliance/regional-hosting.graph.md)
<!-- /docsgraph:related -->

| Region         | Endpoint                          |
| -------------- | --------------------------------- |
| European Union | `https://eu.ai-gateway.vercel.sh` |
| United States  | `https://us.ai-gateway.vercel.sh` |

On `https://ai-gateway.vercel.sh`, the Vercel data center nearest your app
receives the request, so a request sent from the US is received in the US even
when it sets an EU `inferenceRegion`.

Regional hosting doesn't choose where the model runs.
[Regional inference](/docs/ai-gateway/security-and-compliance/regional-inference)
controls that. The two are separate settings, and you can
[use them together](#using-regional-hosting-with-regional-inference).

## Pricing

| Option                          | Cost                 | Availability       |
| ------------------------------- | -------------------- | ------------------ |
| Requests to a regional endpoint | 5% of inference cost | Pro and Enterprise |

The 5% applies to every request sent to a regional endpoint, wherever the model
runs, including requests that use your
[BYOK](/docs/ai-gateway/authentication-and-byok/byok) keys. See
[pricing](/docs/ai-gateway/pricing#regional-hosting) for details. Requests from
Hobby teams and teams on a Pro trial fail with HTTP 403.

## Keeping requests in one region

To keep requests in the EU from end to end, use regional hosting and regional
inference together:

```typescript filename="regional-hosting-and-inference.ts" {5-6,13-14}
import { createGateway } from '@ai-sdk/gateway';
import { generateText } from 'ai';

const gateway = createGateway({
  // Regional hosting: AI Gateway receives the request in the EU
  baseURL: 'https://eu.ai-gateway.vercel.sh/v4/ai',
});

const { text } = await generateText({
  model: gateway('openai/gpt-6-astra'),
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    // Regional inference: the model runs in the EU
    gateway: { inferenceRegion: { scope: 'zone', geoRegion: 'eu' } },
  },
});
```

The highlighted lines are the two settings: the regional endpoint, and the
inference region. To apply both to all of your team's traffic:

1. Send requests to `https://eu.ai-gateway.vercel.sh` (see
   [using a regional endpoint](#using-a-regional-endpoint) for other API
   formats and languages).
2. Pin your team's inference region to the EU with a
   [team-wide pin](/docs/ai-gateway/security-and-compliance/regional-inference#team-wide-region-pinning). The pin applies to every
   request, so a client that leaves out `inferenceRegion` is still covered. To
   pin single requests instead, set `inferenceRegion` on each one.

With both in place:

- AI Gateway receives and decrypts the request in the EU.
- The model runs in the EU.
- A request the EU can't serve fails instead of running in another region.
  That includes models with no EU endpoint, and image, video, speech,
  transcription, and realtime models, which don't have regional endpoints yet.

The same works for the US, with `https://us.ai-gateway.vercel.sh` and a US pin.

Two things to check before you rely on this:

- AI Gateway doesn't reject requests sent to `https://ai-gateway.vercel.sh`, so
  make sure every client uses the regional endpoint.
- Search and fetch tools, the background processing of async batch jobs, and
  stored logs, usage, and billing records stay outside the region (see
  [what regional hosting doesn't cover](#what-regional-hosting-doesnt-cover)).

## Using a regional endpoint

Point your client at the regional endpoint. These examples use the EU endpoint
and also set `inferenceRegion` to the EU, so the request is both received and
run there. The highlighted lines are the regional endpoint and the inference
region. Regional hosting also works without `inferenceRegion` (see
[using regional hosting with regional inference](#using-regional-hosting-with-regional-inference)).

For the US, replace `eu` with `us` in the base URL and in `geoRegion`. See
[base URLs](#base-urls) for both endpoints side by side.

Set `AI_GATEWAY_API_KEY` before running them. See
[API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences)
for setup, request fields, and response handling.

#### AI SDK

```typescript filename="regional-hosting.ts" {5-6,13-14}
import { createGateway } from '@ai-sdk/gateway';
import { generateText } from 'ai';

const gateway = createGateway({
  // Regional hosting: AI Gateway receives the request in the EU
  baseURL: 'https://eu.ai-gateway.vercel.sh/v4/ai',
});

const { text } = await generateText({
  model: gateway('openai/gpt-6-astra'),
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    // Regional inference: the model runs in the EU
    gateway: { inferenceRegion: { scope: 'zone', geoRegion: 'eu' } },
  },
});

console.log(text);
```

#### Chat Completions

#### TypeScript

```typescript filename="regional-hosting-chat.ts" {5,20-23}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://eu.ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'openai/gpt-6-astra',
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
        inferenceRegion: {
          scope: 'zone',
          geoRegion: 'eu',
        },
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="regional-hosting_chat.py" {6,12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://eu.ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="openai/gpt-6-astra",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    extra_body={"providerOptions": {"gateway": {"inferenceRegion": {"scope": "zone", "geoRegion": "eu"}}}},
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="regional-hosting-chat.sh" {1,14-17}
curl --fail-with-body https://eu.ai-gateway.vercel.sh/v1/chat/completions \
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
  "providerOptions": {
    "gateway": {
      "inferenceRegion": {
        "scope": "zone",
        "geoRegion": "eu"
      }
    }
  }
}'
```

#### Messages API

#### TypeScript

```typescript filename="regional-hosting-messages.ts" {5,20-23}
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://eu.ai-gateway.vercel.sh',
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
        inferenceRegion: {
          scope: 'zone',
          geoRegion: 'eu',
        },
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="regional-hosting_messages.py" {6,13}
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://eu.ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="openai/gpt-6-astra",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
    extra_body={"providerOptions": {"gateway": {"inferenceRegion": {"scope": "zone", "geoRegion": "eu"}}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="regional-hosting-messages.sh" {1,16-19}
curl --fail-with-body https://eu.ai-gateway.vercel.sh/v1/messages \
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
      "inferenceRegion": {
        "scope": "zone",
        "geoRegion": "eu"
      }
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="regional-hosting-responses.ts" {5,14-17}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://eu.ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'openai/gpt-6-astra',
  input: 'Explain quantum computing in two sentences.',
  ...{
    providerOptions: {
      gateway: {
        inferenceRegion: {
          scope: 'zone',
          geoRegion: 'eu',
        },
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="regional-hosting_responses.py" {6,12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://eu.ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="openai/gpt-6-astra",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"inferenceRegion": {"scope": "zone", "geoRegion": "eu"}}}},
)

print(response.output_text)
```

#### cURL

```bash filename="regional-hosting-responses.sh" {1,9-12}
curl --fail-with-body https://eu.ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "openai/gpt-6-astra",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "gateway": {
      "inferenceRegion": {
        "scope": "zone",
        "geoRegion": "eu"
      }
    }
  }
}'
```

## Base URLs

Keep the path your client already uses and change only the hostname:

| API format or client                                                        | EU base URL                                   | US base URL                                   |
| --------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| AI SDK 7                                                                    | `https://eu.ai-gateway.vercel.sh/v4/ai`       | `https://us.ai-gateway.vercel.sh/v4/ai`       |
| AI SDK 6                                                                    | `https://eu.ai-gateway.vercel.sh/v3/ai`       | `https://us.ai-gateway.vercel.sh/v3/ai`       |
| OpenAI-compatible (Chat Completions, Responses, Embeddings, Images, Rerank) | `https://eu.ai-gateway.vercel.sh/v1`          | `https://us.ai-gateway.vercel.sh/v1`          |
| Anthropic-compatible (Messages)                                             | `https://eu.ai-gateway.vercel.sh`             | `https://us.ai-gateway.vercel.sh`             |
| Claude Code (`ANTHROPIC_BASE_URL`)                                          | `https://eu.ai-gateway.vercel.sh/claude-code` | `https://us.ai-gateway.vercel.sh/claude-code` |
| Codex (`base_url`)                                                          | `https://eu.ai-gateway.vercel.sh/codex/v1`    | `https://us.ai-gateway.vercel.sh/codex/v1`    |

For any other client, replace `ai-gateway.vercel.sh` in its base URL with
`eu.ai-gateway.vercel.sh` or `us.ai-gateway.vercel.sh`.

## Using regional hosting with regional inference

A regional endpoint and `inferenceRegion` are separate settings. One decides
where AI Gateway receives your request, and the other decides where the model
runs. You can set either one, both, or neither, and they don't have to name the
same region:

| You set | AI Gateway receives the request | The model runs |
| --- | --- | --- |
| Neither | At the data center nearest your app | In any region that can serve the model |
| A regional endpoint only | In the endpoint's region | In any region that can serve the model |
| `inferenceRegion` or a team-wide pin only | At the data center nearest your app | In the pinned region |
| Both, with the same region | In that region | In that region |
| Both, with different regions | In the endpoint's region | In the pinned region |

Setting one never sets the other. A request to the EU endpoint with no
`inferenceRegion` can run on a provider in the US, and a request that pins EU
inference on `https://ai-gateway.vercel.sh` can be received in the US.

Pick the combination that matches what you need:

- **Keep requests and inference in one region.** For a compliance or residency
  requirement, use both and make them match. See
  [keeping requests in one region](#keeping-requests-in-one-region) for the
  steps and what to check.
- **Choose where the model runs.** To run inference close to your users or your
  data, which may help with latency, or in a region your provider agreement
  covers, set `inferenceRegion` and keep using `https://ai-gateway.vercel.sh`.
  The nearest data center receives your requests, and the regional
  hosting charge doesn't apply.
- **Control where requests enter and leave the model unpinned.** If your
  requirement is only about where traffic enters, use a regional endpoint
  without `inferenceRegion`. AI Gateway can then use any provider and region
  that serves the model, which keeps the most models and failover options
  available.
- **Use different regions for different providers.**
  [Per-provider overrides](/docs/ai-gateway/security-and-compliance/regional-inference#per-provider-overrides-advanced) pin one provider
  to a region, send another to a different region, or leave one unpinned, on
  any endpoint. To rule a region out, pin the regions you do allow: a team-wide
  pin accepts more than one region and never routes outside them.
- **Bring your own keys.** BYOK works with both settings. AI Gateway applies
  `inferenceRegion` to your key the same way it does with Vercel's provider keys,
  and without one, a region saved on the credential applies where it has one
  (see [BYOK and data residency](/docs/ai-gateway/security-and-compliance/regional-inference#byok-and-data-residency)). BYOK requests on
  a regional endpoint pay the [regional hosting charge](#pricing) too.

For a request that sets both, see [using a regional endpoint](#using-a-regional-endpoint).

## What regional hosting doesn't cover

Regional hosting is a network control. It isn't a data residency guarantee,
and it doesn't change where AI Gateway runs background work or keeps records:

- Async batch and video jobs are accepted on the endpoint but run on
  background infrastructure that may be outside the region.
- Request logs, usage, and billing records are stored in the United States.
- [Search and fetch tools](/docs/ai-gateway/models-and-providers/web-search)
  that AI Gateway runs call their vendor's API wherever the vendor runs it.

## Confirming where a request was received

The response's `x-vercel-id` header starts with the Vercel data center that
received the request (for example, `fra1::`). On the OpenAI-compatible
endpoints, `usage.regional_hosting_cost` shows the regional hosting charge
when it applies.

To confirm where inference ran, see
[confirming where a request ran](/docs/ai-gateway/security-and-compliance/regional-inference#confirming-where-a-request-ran).

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
