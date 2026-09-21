---
title: Stripe Usage-Based Billing with AI Gateway
product: vercel
url: /docs/ai-gateway/ecosystem/stripe-billing
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/stripe-billing"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/ecosystem
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis
summary: Send AI Gateway token usage to Stripe Billing Meters with an existing configured meter or private-preview access to meter dimensions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/stripe-billing.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "01b36f649a5a0f3b2605a37d170df28b42c03bf75379cbe51ffdb2a7b443e7a8"
---

# Stripe Usage-Based Billing with AI Gateway

Send AI Gateway token usage to an existing [Stripe Billing Meters integration](https://docs.stripe.com/api/billing/meter). When you include Stripe headers in your requests, AI Gateway automatically emits meter events for every successful response.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fstripe-billing&source_site=vercel-docs&relationship=related) — Use Vercel Sandbox with the agent frameworks, model SDKs, and coding agents you already work with.
- [Cost-aware model routing through AI Gateway](https://vercel.com/kb/guide/cost-aware-model-routing-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fstripe-billing&source_site=vercel-docs&relationship=related) — Route easy requests to a cheap model and escalate only hard ones to a frontier model through one AI Gateway endpoint, wi
- [AI Gateway FAQ](https://vercel.com/docs/ai-gateway/faq?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fstripe-billing&source_site=vercel-docs&relationship=related) — Answers to common questions about AI Gateway, including request errors, pricing and markup, SDK and API compatibility, m
- [AI Gateway Pricing](https://vercel.com/docs/ai-gateway/pricing?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fstripe-billing&source_site=vercel-docs&relationship=related) — Understand AI Gateway token pricing, free and paid credits, BYOK costs, add-on charges, and payment fees. Manage credit
- [AI Gateway Observability and Spend](https://vercel.com/docs/ai-gateway/observability-and-spend?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fstripe-billing&source_site=vercel-docs&relationship=related) — Monitor AI Gateway requests and control costs with logs, generation lookup, custom reporting, budgets, and OpenTelemetry
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fstripe-billing&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/stripe-billing.graph.md](/docs/ai-gateway/ecosystem/stripe-billing.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fstripe-billing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** This integration requires a Stripe billing meter with `model` and `token_type` dimensions. Stripe limits [meter dimensions to a private preview](https://docs.stripe.com/billing/subscriptions/usage-based/migrate-to-metronome/scope-your-migration#metering). Existing configured meters continue to work. To create a new dimensioned meter, you need Stripe preview access. Stripe recommends [Metronome for new integrations](https://docs.stripe.com/billing/subscriptions/usage-based#choosing-between-metronome-and-basic-usage-based-billing); see [Metronome compatibility](#metronome-compatibility) before starting.

## How it works

When you include Stripe headers in your requests, AI Gateway:

1. Routes the request to the appropriate AI provider
2. On a successful response, emits separate meter events for input, output, cache-read, and cache-write token counts when greater than zero
3. Includes the customer ID, token count, token type (`input`, `output`, `cached_input`, or `cached_write`), and model ID in each meter event

Stripe metering is **non-blocking**. If a meter event fails, AI Gateway still returns the AI response. Errors are logged for observability but don't affect the response.

## Prerequisites

Before you start, you'll need:

1. A [Stripe account](https://stripe.com) with access to the Billing Meter API
2. An existing billing meter with the event name `token-billing-tokens` and dimension payload keys `model` and `token_type`, or access to Stripe's private preview for meter dimensions. If you have preview access, you can create the meter in one of two ways:
   - Use the [token billing pricing plan flow](https://dashboard.stripe.com/token-billing), if Stripe has enabled it for your account. The flow creates pricing plans and the meter with the required configuration.
   - Manually create a billing meter in your Stripe dashboard with the event name `token-billing-tokens` and add `model` and `token_type` as dimension payload keys.
3. A Stripe [restricted access key](#stripe-restricted-access-keys) (`rk_...`) with permission to write meter events
4. Stripe customer IDs (`cus_...`) for the users you want to bill

If you don't have an existing configured meter or preview access, contact Stripe before following these setup steps. A standard Stripe account alone doesn't satisfy the prerequisites.

## Metronome compatibility

Stripe recommends [Metronome](https://docs.stripe.com/billing/usage-based) for new usage-based billing integrations. AI Gateway's Stripe headers send Billing Meter events; they don't send events to Metronome's ingest API.

To bill with Metronome, collect token usage from AI responses in your application and send usage events through your Metronome integration. With AI SDK, see [token usage](https://ai-sdk.dev/docs/ai-sdk-core/generating-text#generatetext). The Stripe header examples below apply only to the Billing Meters integration.

## Headers

You configure Stripe billing entirely through HTTP headers. No changes to the request body are needed:

| Header                         | Required | Description                                                                          |
| ------------------------------ | -------- | ------------------------------------------------------------------------------------ |
| `stripe-customer-id`           | Yes      | The Stripe customer ID to bill (e.g., `cus_abc123`)                                  |
| `stripe-restricted-access-key` | Yes      | A Stripe restricted API key with meter event write permissions (e.g., `rk_live_...`) |

Both headers must be present for meter events to fire. If either is missing, the request proceeds normally without billing.

## Examples

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY`, `STRIPE_CUSTOMER_ID`, and `STRIPE_RESTRICTED_ACCESS_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

```typescript filename="stripe-billing.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Explain quantum computing in two sentences.',
  headers: {
    'stripe-customer-id': process.env.STRIPE_CUSTOMER_ID!,
    'stripe-restricted-access-key': process.env.STRIPE_RESTRICTED_ACCESS_KEY!,
  },
});

console.log(text);
```

#### Python (beta)

```python filename="stripe-billing_ai.py"
import asyncio
import os
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("Explain quantum computing in two sentences.")]
    params = ai.InferenceRequestParams(
        extra_headers={"stripe-customer-id": os.environ["STRIPE_CUSTOMER_ID"], "stripe-restricted-access-key": os.environ["STRIPE_RESTRICTED_ACCESS_KEY"]}
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

```typescript filename="stripe-billing-chat.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
  defaultHeaders: {
    'stripe-customer-id': process.env.STRIPE_CUSTOMER_ID!,
    'stripe-restricted-access-key': process.env.STRIPE_RESTRICTED_ACCESS_KEY!,
  },
});

const response = await client.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'Explain quantum computing in two sentences.',
    },
  ],
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="stripe-billing_chat.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
    default_headers={"stripe-customer-id": os.environ["STRIPE_CUSTOMER_ID"], "stripe-restricted-access-key": os.environ["STRIPE_RESTRICTED_ACCESS_KEY"]},
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="stripe-billing-chat.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "stripe-customer-id: $STRIPE_CUSTOMER_ID" \
  -H "stripe-restricted-access-key: $STRIPE_RESTRICTED_ACCESS_KEY" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ]
}'
```

#### Messages API

#### TypeScript

```typescript filename="stripe-billing-messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
  defaultHeaders: {
    'stripe-customer-id': process.env.STRIPE_CUSTOMER_ID!,
    'stripe-restricted-access-key': process.env.STRIPE_RESTRICTED_ACCESS_KEY!,
  },
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
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="stripe-billing_messages.py"
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
    default_headers={"stripe-customer-id": os.environ["STRIPE_CUSTOMER_ID"], "stripe-restricted-access-key": os.environ["STRIPE_RESTRICTED_ACCESS_KEY"]},
)

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Explain quantum computing in two sentences."}],
    max_tokens=1024,
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="stripe-billing-messages.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -H "stripe-customer-id: $STRIPE_CUSTOMER_ID" \
  -H "stripe-restricted-access-key: $STRIPE_RESTRICTED_ACCESS_KEY" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Explain quantum computing in two sentences."
    }
  ],
  "max_tokens": 1024
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="stripe-billing-responses.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
  defaultHeaders: {
    'stripe-customer-id': process.env.STRIPE_CUSTOMER_ID!,
    'stripe-restricted-access-key': process.env.STRIPE_RESTRICTED_ACCESS_KEY!,
  },
});

const response = await client.responses.create({
  model: 'anthropic/claude-sonnet-5',
  input: 'Explain quantum computing in two sentences.',
});

console.log(response.output_text);
```

#### Python

```python filename="stripe-billing_responses.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
    default_headers={"stripe-customer-id": os.environ["STRIPE_CUSTOMER_ID"], "stripe-restricted-access-key": os.environ["STRIPE_RESTRICTED_ACCESS_KEY"]},
)

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input="Explain quantum computing in two sentences.",
)

print(response.output_text)
```

#### cURL

```bash filename="stripe-billing-responses.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "stripe-customer-id: $STRIPE_CUSTOMER_ID" \
  -H "stripe-restricted-access-key: $STRIPE_RESTRICTED_ACCESS_KEY" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "Explain quantum computing in two sentences."
}'
```

## Share billing configuration across requests

Set the restricted key on a gateway instance, then pass the authenticated customer's Stripe ID on each request:

```typescript filename="billing-gateway.ts"
import { createGateway, generateText } from 'ai';

const gateway = createGateway({
  headers: {
    'stripe-restricted-access-key': process.env.STRIPE_RESTRICTED_ACCESS_KEY!,
  },
});

export async function generateForCustomer(
  stripeCustomerId: string,
  prompt: string,
) {
  const { text } = await generateText({
    model: gateway('anthropic/claude-sonnet-5'),
    prompt,
    headers: {
      'stripe-customer-id': stripeCustomerId,
    },
  });
  return text;
}
```

Look up `stripeCustomerId` from the authenticated user's billing record on your server. A shared customer ID would attribute every user's usage to the same customer. For HTTP clients, pass the customer header in the per-request options instead of setting it as a shared default.

## Stripe restricted access keys

For security, use a [Stripe restricted API key](https://docs.stripe.com/keys#limit-access) instead of your secret key. The restricted key only needs permission to **write billing meter events**.

To create one:

1. Go to **Stripe Dashboard > Developers > API keys**
2. Click **Create restricted key**
3. Enable **Write** permission for **Billing meter events**
4. Save the key (starts with `rk_live_` or `rk_test_`)

If the key is ever exposed, the blast radius is limited. It can't access customer data, create charges, or perform any other Stripe operations.

## Meter event format

Each successful request can emit up to four events to Stripe's `/v2/billing/meter_events` endpoint. AI Gateway skips token types with a zero count. This example shows an input-token event:

```json
{
  "event_name": "token-billing-tokens",
  "payload": {
    "stripe_customer_id": "cus_abc123",
    "value": "1500",
    "token_type": "input",
    "model": "anthropic/claude-sonnet-5"
  }
}
```

The `model` field identifies the serving provider and model. It uses `provider/creator/model-name` when the provider differs from the model creator, such as `bedrock/anthropic/claude-sonnet-5`. When they match, it uses `creator/model-name`, such as `anthropic/claude-sonnet-5`.

## Reliability

AI Gateway handles Stripe meter events with the following guarantees:

- **Non-blocking**: You always get the AI response, even if Stripe metering fails
- **Idempotent**: Each meter event has a unique identifier, which prevents duplicate billing
- **Conditional**: AI Gateway only emits events on successful responses and when token counts are greater than zero
- **Observable**: AI Gateway logs failed meter events for troubleshooting


---

[View full sitemap](/docs/sitemap)
