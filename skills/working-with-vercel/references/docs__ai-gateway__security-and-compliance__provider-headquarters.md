---
title: AI Gateway Provider Headquarters
product: vercel
url: /docs/ai-gateway/security-and-compliance/provider-headquarters
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance/provider-headquarters"
last_updated: 2026-10-26
type: how-to
prerequisites:
  - /docs/ai-gateway/security-and-compliance
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/security-and-compliance/regional-inference
  - /docs/ai-gateway/security-and-compliance/zdr
  - /docs/ai-gateway/sdks-and-apis/rest-api
  - /docs/ai-gateway/models-and-providers/batch-processing
summary: Limit AI Gateway routing to providers whose parent company is headquartered in the countries you choose.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/security-and-compliance/provider-headquarters.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "457ba6d15bb533624291e8eb39dce14b646a61277fa1b9cc59f8f11e277001a4"
---

# AI Gateway Provider Headquarters

Provider headquarters lets you choose the countries that the providers serving your requests can be based in. A provider's headquarters country is where its parent company is headquartered, and a subsidiary counts as its parent company's country. List the countries to allow, or the countries to exclude, and AI Gateway only routes to providers based in an allowed country.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Team-wide provider allowlist on AI Gateway](https://vercel.com/changelog/team-wide-provider-allowlist-on-ai-gateway)
- [AI Gateway Provider Allowlist](https://vercel.com/docs/ai-gateway/security-and-compliance/provider-allowlist) — Restrict which AI providers your team can route through AI Gateway. Available on Pro and Enterprise.
- [AI Gateway Models and Providers](https://vercel.com/docs/ai-gateway/models-and-providers) — Choose AI Gateway models and providers. Configure routing, fallbacks, timeouts, prompt caching, reasoning, and web searc
- [AI Gateway Regional Hosting](https://vercel.com/docs/ai-gateway/security-and-compliance/regional-hosting) — Regional hosting lets you choose the region where AI Gateway receives your requests, by sending them to a regional endpo
- [OpenResponses Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API through AI Gateway.
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq) — Answers to common questions about AI Gateway, including request errors, pricing and markup, caching, SDK and API compati

Full cross-link map for this page: [/docs/ai-gateway/security-and-compliance/provider-headquarters.graph.md](/docs/ai-gateway/security-and-compliance/provider-headquarters.graph.md)
<!-- /docsgraph:related -->

You can set it per request with `headquarters` in `providerOptions.gateway`. It's available on all plans at no additional cost.

Pro and Enterprise teams can also set a team-wide list in the [AI Gateway Settings tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fsettings\&title=AI+Gateway+Settings). It applies to every request from the team and costs $0.10 per 1,000 billed requests.

> **💡 Note:** Provider headquarters controls who owns the provider, not where inference
> runs or where data is stored. To control where inference runs, use [regional
> inference](/docs/ai-gateway/security-and-compliance/regional-inference).

## Pricing

| Option | Cost | Availability |
| --- | --- | --- |
| Per-request `headquarters` option | No additional cost | All plans |
| Team-wide list | $0.10 per 1,000 billed requests | Pro and Enterprise |

The team-wide charge applies to each request AI Gateway bills. That includes a request billed without completing normally, such as a response the provider blocks on safety grounds and still charges for. Requests the list blocks (`400`) and other failures that AI Gateway doesn't bill aren't charged. It's charged separately from the provider and model allowlists, and from [zero data retention](/docs/ai-gateway/security-and-compliance/zdr).

## How filtering works

Provider headquarters filters providers, not models. A model stays available as long as at least one of its providers is headquartered in an allowed country. For example, `openai/gpt-oss-120b` is served by several providers. With `headquarters: ['US']`, AI Gateway routes it only to the providers based in the US and skips the others.

These rules apply whenever a list is set:

- **Providers without a headquarters country on record are excluded.** A provider with no country on record never matches your list, so a new or unreviewed provider can't receive your requests.
- **Stealth and unannounced models are excluded.** AI Gateway treats them as having no headquarters country on record, so they're never available while a list is set.
- **New countries depend on the kind of list.** With a list of allowed countries, a provider based in a country you haven't listed doesn't receive your requests until you add that country. With a list of excluded countries, it does, unless you exclude its country too.
- **BYOK requests are filtered too.** A request that uses your own provider key still goes to that provider, so the provider must be based in an allowed country.
- **Gateway-executed tools are checked too.** A request that uses a tool whose vendor isn't based in an allowed country fails with a `400` error.

If no provider for the model is based in an allowed country, AI Gateway tries your fallback models. The request fails with a `400` error only when none of them has an allowed provider. For example, with `headquarters: ['JP']` and no fallback models:

```json
{
  "error": "No providers headquartered in an allowed country (JP) are available for model: example/model-name. Providers considered: provider-a, provider-b",
  "type": "invalid_request_error",
  "statusCode": 400
}
```

`headquarters` applies on top of `only` and `order`. If `only` leaves no provider in an allowed country, the request fails the same way, after any fallback models.

> **💡 Note:** An authenticated request to
> [`/v1/models`](https://ai-gateway.vercel.sh/v1/models) with
> `include_availability` sets `model_eligibility.reason` to
> `headquarters_country_not_allowed` on models that no provider in an allowed
> country serves under your team's setting, so you can check the setting's
> effect before sending a request. See [team availability
> annotations](/docs/ai-gateway/sdks-and-apis/rest-api#team-availability-annotations).
> The models list doesn't reflect a per-request `headquarters` option, so a
> model listed as available can still return a `400` error when that option
> leaves no allowed provider.

## Provider countries

This table shows the countries that AI Gateway providers are headquartered in today, and the providers based in each. Use these codes in your list. The table updates as new providers are added.

Country

Code

Providers

Canada

\`CA\`

Cohere

China

\`CN\`

Alibaba Cloud, ByteDance, DeepSeek, Kling AI, Meituan LongCat, MiniMax, Moonshot AI, Novita AI, StepFun, StreamLake, Tencent Cloud, Xiaomi, Z.AI

France

\`FR\`

Mistral

Germany

\`DE\`

Black Forest Labs, Mixedbread

Japan

\`JP\`

Sakana AI

Netherlands

\`NL\`

Nebius

Poland

\`PL\`

Callstack

Sweden

\`SE\`

Inceptron

United Kingdom

\`GB\`

ElevenLabs, Recraft, Runware

United States

\`US\`

Anthropic, Azure, Baseten, Bedrock, Boundless, Browserbase, Cerebras, Claude Platform on AWS, Crusoe, DeepInfra, DigitalOcean, Elorian, Exa, Fireworks, Fish Audio, FriendliAI, GMICloud, Google, Google Vertex AI, Groq, HeyGen, Humans&, Inception, Inference.net, Interfaze, Liquid AI, Meta, Modal, Morph, Nace AI, NVIDIA, OpenAI, Parallel AI, Parasail, Pareto Inference, Particle.AI, Perplexity, Prodia, QuiverAI, Reflection, Relace, RightNow AI, Sail Research, ScaleDown, Subconscious, Tako, Telnyx, Thinking Machines, Together AI, Topaz Labs, TypeSafe AI, Voyage AI by MongoDB, Wafer, xAI

## Set it per request

Pass a list of [ISO 3166-1 alpha-2](https://www.iso.org/iso-3166-country-codes.html) country codes as `headquarters`. Codes are case-insensitive. An empty list or a code that isn't an assigned country code returns a `400` error, the same as the team list. For example, `XX` is rejected, and so is `UK` (the United Kingdom's code is `GB`).

To exclude countries instead, prefix every code with `!`. AI Gateway then routes to providers based in any country except those:

```typescript
providerOptions: {
  gateway: {
    headquarters: ['!US'], // any country except the US
  },
},
```

Each code after the `!` must also be an assigned country code. A list either allows countries or excludes them. A list that mixes the two, like `['US', '!GB']`, returns a `400` error. Providers without a headquarters country on record are still excluded under an exclusion list.

The examples below use a list of allowed countries.

#### AI SDK

#### TypeScript

```typescript filename="provider-headquarters.ts" {8}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-oss-120b',
  prompt: 'Explain quantum computing in two sentences.',
  providerOptions: {
    gateway: {
      headquarters: ['US', 'GB', 'DE', 'FR'],
    },
  },
});

console.log(text);
```

#### Python (beta)

```python filename="provider_headquarters_ai.py" {8}
import asyncio
import ai

async def main():
    model = ai.get_model("openai/gpt-oss-120b")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_body={"providerOptions": {"gateway": {"headquarters": ["US", "GB", "DE", "FR"]}}}
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

```typescript filename="provider-headquarters-chat.ts" {20}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'openai/gpt-oss-120b',
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
        headquarters: ['US', 'GB', 'DE', 'FR'],
      },
    },
  },
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="provider_headquarters_chat.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    extra_body={"providerOptions": {"gateway": {"headquarters": ["US", "GB", "DE", "FR"]}}},
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="provider-headquarters-chat.sh" {11}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions -H "Authorization: Bearer $AI_GATEWAY_API_KEY" -H "Content-Type: application/json" -d '{
  "model": "openai/gpt-oss-120b",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "providerOptions": {
    "gateway": {
      "headquarters": ["US", "GB", "DE", "FR"]
    }
  }
}'
```

#### Messages API

#### TypeScript

```typescript filename="provider-headquarters-messages.ts" {21}
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
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    providerOptions: {
      gateway: {
        headquarters: ['US', 'GB', 'DE', 'FR'],
      },
    },
  },
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="provider_headquarters_messages.py" {13}
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
    extra_body={"providerOptions": {"gateway": {"headquarters": ["US", "GB", "DE", "FR"]}}},
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="provider-headquarters-messages.sh" {12}
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
      "headquarters": ["US", "GB", "DE", "FR"]
    }
  }
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="provider-headquarters-responses.ts" {15}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'openai/gpt-oss-120b',
  input: 'Explain quantum computing in two sentences.',
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    providerOptions: {
      gateway: {
        headquarters: ['US', 'GB', 'DE', 'FR'],
      },
    },
  },
});

console.log(response.output_text);
```

#### Python

```python filename="provider_headquarters_responses.py" {12}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="openai/gpt-oss-120b",
    input="Explain quantum computing in two sentences.",
    extra_body={"providerOptions": {"gateway": {"headquarters": ["US", "GB", "DE", "FR"]}}},
)

print(response.output_text)
```

#### cURL

```bash filename="provider-headquarters-responses.sh" {6}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses -H "Authorization: Bearer $AI_GATEWAY_API_KEY" -H "Content-Type: application/json" -d '{
  "model": "openai/gpt-oss-120b",
  "input": "Explain quantum computing in two sentences.",
  "providerOptions": {
    "gateway": {
      "headquarters": ["US", "GB", "DE", "FR"]
    }
  }
}'
```

The option also works with the embedding, image, video, speech, transcription, and reranking endpoints.

On realtime and other WebSocket sessions, set `headquarters` in the session's start frame. For sessions that use a client secret, pin `headquarters` when you mint the secret. The start frame can then only repeat the pinned list. Only the start frame's list applies. AI Gateway ignores a `headquarters` list on later frames, so open a new session to change it.

For [batches](/docs/ai-gateway/models-and-providers/batch-processing) started with the AI SDK `startBatch` or the Anthropic Message Batches API, set `headquarters` in the batch-level `providerOptions.gateway`, next to `requests`. A request inside the batch can't set it, and batches created through the OpenAI Batch API can't set a list. AI Gateway checks the list when the batch starts. If no provider for the model is based in an allowed country, the request that starts the batch fails with a `400` error and nothing is sent to a provider.

Batches also follow your team list, and a batch list can only narrow it. Batches created through the OpenAI Batch API follow the team list only. If the team list excludes OpenAI, the file upload or the request that starts the batch fails with a `400` error. If the team list later excludes the batch's provider, retrieving the batch or its files also fails with a `400` error.

## Set it for your team

On Pro and Enterprise teams (not Pro trial), owners and members with permission to update AI Gateway settings can set a team-wide list:

1. Open the [AI Gateway **Settings** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fsettings\&title=AI+Gateway+Settings).
2. Toggle on **Provider Headquarters**.
3. Under **Countries**, choose one:
   - **Allow selected countries**: every listed country starts selected. Uncheck the countries you don't want. **All countries** selects every country again. A country added to AI Gateway later isn't allowed until you select it.
   - **Exclude selected countries**: check the countries to exclude. A country added to AI Gateway later is allowed unless you exclude it too.
4. Click **Save**.

Once a list is saved, the other option is turned off. To change from allowing countries to excluding them, or back, click **Switch to an exclusion list** or **Switch to an allow list** and confirm. Your saved list keeps applying until you save the new one, which replaces it.

Each country in the list shows the providers based there. The card also lists providers that don't have a headquarters country on record yet, which the setting always excludes while it's on. The team list only accepts assigned country codes, so a code like `XX` is rejected.

To remove the restriction, toggle the setting off and confirm. You can always remove it, even after your team moves off Pro or Enterprise.

## Combining the team list with a request list

When both are set, the team list is the ceiling. A request's `headquarters` list can narrow it but never widen it, and either list can allow or exclude countries. For example:

- With a team list of `US` and `DE`, a request with `headquarters: ['DE', 'FR']` only routes to providers based in Germany.
- With a team list of `US` and `GB`, a request with `headquarters: ['!GB']` only routes to providers based in the US.
- With a team list that excludes `US`, a request with `headquarters: ['!GB']` excludes both countries.

If the two lists leave no country that both allow, for example a team list of `US` and a request with `headquarters: ['!US']`, the request fails with a `400` `invalid_request_error` that names both lists. This applies to HTTP requests and to WebSocket client secrets and start frames.

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
