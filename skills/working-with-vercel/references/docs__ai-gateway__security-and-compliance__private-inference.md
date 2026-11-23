---
title: AI Gateway Private Inference
product: vercel
url: /docs/ai-gateway/security-and-compliance/private-inference
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance/private-inference"
last_updated: 2026-09-16
type: how-to
prerequisites:
  - /docs/ai-gateway/security-and-compliance
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway/sdks-and-apis/rest-api
  - /docs/cli/ai-gateway
summary: Register your own model endpoints behind a compatible API format and call them through AI Gateway, scoped to your team.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/security-and-compliance/private-inference.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "8af6fce1067e7088530e9c1aeb0664378736ca79284592c9e6d935762b606035"
---

# AI Gateway Private Inference

Private inference lets you connect your own model endpoints to AI Gateway and call them with the same SDKs, authentication, and observability you use for the public catalog. A private model can be a self-hosted model, a fine-tune, or a private deployment behind [a compatible API format](#compatible-api-formats). Private models are scoped to your Vercel team and never appear in the public model catalog.

In the Vercel dashboard, this feature lives in the **AI Gateway** section under [Private Inference](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fprivate-inference\&title=AI+Gateway+Private+Inference). The page lists each private provider. Expand a provider to see its models:

![Private providers, expanded to show their models, on the Private Inference page.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/ai-gateway/private-inference/providers-list-2-light.png)

> **💡 Note:** Private inference is distinct from [Bring Your Own Key
> (BYOK)](/docs/ai-gateway/authentication-and-byok/byok): BYOK supplies your own
> credentials for a provider that AI Gateway already supports, while private
> inference adds an endpoint and model that AI Gateway would not otherwise know
> about.

## How it works

Private inference has two building blocks:

- **Private providers** are a connection to your upstream API: a publicly reachable HTTPS **base URL** and the **credentials** AI Gateway uses to authenticate to it. Providers must expose [a compatible API format](#compatible-api-formats) to be used. Credentials are stored encrypted; only the last four characters are shown after you save them.
- **Private models** are a model served by one of your private providers. Each private model has a slug, the upstream model id to forward to your endpoint, and a [type](#supported-model-types) (such as language or embedding).

You call a private model by prefixing its slug with `private/`. A private model with the slug `glm-5.2-fine-tuned` is addressed as `private/glm-5.2-fine-tuned`.

Private models are isolated to the team that owns them. They only resolve for that team's [authenticated requests](/docs/ai-gateway/authentication-and-byok) (including API Keys and OIDC). Private models don't appear in the public [models list](/docs/ai-gateway/models-and-providers) or in unauthenticated `/v1/models` responses. When your team sends an authenticated [`GET /v1/models`](/docs/ai-gateway/sdks-and-apis/rest-api#list-models) request, the response includes your private models as `private/<slug>`.

## Compatible API formats

Your private provider's endpoint must accept requests in one of the API formats below. In the dashboard, you choose the format as the provider's **Connection type**. AI Gateway translates your request into the format the provider expects, so you keep using the same SDKs and request shape across public and private models.

| API format              | Specification                                                                      | Request path        | Model types                |
| ----------------------- | ---------------------------------------------------------------------------------- | ------------------- | -------------------------- |
| OpenAI Chat Completions | [OpenAI API reference](https://platform.openai.com/docs/api-reference/chat)        | `/chat/completions` | Language, embedding, image |
| OpenAI Responses        | [OpenAI API reference](https://platform.openai.com/docs/api-reference/responses)   | `/responses`        | Language only              |
| Open Responses          | [Open Responses specification](https://www.openresponses.org/specification)        | `/responses`        | Language only              |
| Anthropic Messages      | [Anthropic API reference](https://platform.claude.com/docs/en/api/messages/create) | `/messages`         | Language only              |

AI Gateway appends the request path to your provider's base URL. For example, a provider with the base URL `https://llm.internal.example.com/v1` and the Anthropic Messages format receives requests at `https://llm.internal.example.com/v1/messages`, so include any path prefix your endpoint expects (commonly `/v1`) in the base URL.

OpenAI Responses and Open Responses both send requests to `/responses`, but they differ in dialect. Choose **OpenAI Responses** when your endpoint emulates the OpenAI API exactly, including its model-specific reasoning behavior. Choose **Open Responses** when your endpoint implements [Open Responses](https://www.openresponses.org/), the open standard based on the OpenAI Responses API, which is supported by self-hosted servers such as vLLM and LM Studio. When in doubt, use Open Responses.

## Getting started

- ### Add a private provider
  1. Go to the [Private Inference](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fprivate-inference\&title=AI+Gateway+Private+Inference) page of the AI Gateway dashboard and click **Add Provider**.
  2. In **Provider details**, enter a **Name** and a **Slug**. The slug identifies the provider when you add models, and you can't change it later.
  3. In **Connection**, choose the **Connection type** your endpoint speaks (see [compatible API formats](#compatible-api-formats)). Then enter the **Base URL**, a publicly reachable HTTPS endpoint, and the **API Key** that AI Gateway sends to your endpoint with every request.
  4. In **Data retention**, turn on **Zero Data Retention** only if your endpoint doesn't retain request data.
  5. Click **Add Provider**. The **Add Private Model** panel opens with the new provider selected, so you can add your first model right away.
  Here's the **Connection** step filled in for an OpenAI Chat Completions endpoint:

  ![The Connection step when adding a private provider.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/ai-gateway/private-inference/add-provider-light.png)

  Adding a provider doesn't test the connection. To confirm that the endpoint and API key work, [make a request](#making-requests) to one of its models.

- ### Add private models
  You can add the models your endpoint lists in one pass, or add a single model by its ID.

  To add several models at once:
  1. On the Private Inference page, open the menu for your provider and select **Discover Models**. From the provider's own page, open the menu next to **Add Model** instead.
  2. Select the models to add. The panel shows the `private/<slug>` each model gets, which AI Gateway derives from the model's ID. Models you already added are marked **Added**.
  3. Click **Add Models**.
  For example, with three of a provider's eight models selected:

  ![Choosing which of a provider's models to add.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/ai-gateway/private-inference/discover-models-light.png)

  AI Gateway adds discovered models as language models. To change the type, open the model and edit it on its page. Discovery needs an endpoint that lists its models. If yours doesn't, add models one at a time.

  To add a single model:
  1. On the provider's page, click **Add Model**.
  2. In **Provider & identity**, set the **Slug** you want to call the model by (this becomes `private/<slug>`), the **API Model ID** your endpoint expects, and the model **Type**.
  3. In **Limits & metadata**, optionally set the context window, maximum output tokens, and tags.

## Manage providers and models

Select a provider or a model on the Private Inference page to open its page. From there you can:

- Edit details, change a provider's connection or API key, and set a model's limits.
- Mark a provider or model inactive, or delete it. You must remove a provider's models before you can delete the provider.
- See a provider's models, and add more with **Add Model**.
- Click **Open in Observability** to see that provider's or model's traffic on the AI Gateway overview. See [Pricing and observability](#pricing-and-observability).

You can also add, discover, update, and delete private providers and models from your terminal with [`vercel ai-gateway private-inference`](/docs/cli/ai-gateway#private-inference). For example, connect a provider with its API key read from stdin, then add one of its models:

```bash filename="terminal"
cat key.txt | vercel ai-gateway private-inference providers create acme-vllm --base-url https://vllm.example.com/v1 --api-key -
vercel ai-gateway private-inference models create --provider acme-vllm --api-model acme/llama-70b
```

## Making requests

Use your private model id (`private/<slug>`) anywhere you would use a public model id, when authenticated under the correct team.

#### TypeScript

```typescript filename="app/api/chat/route.ts" {4}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'private/gpt-latest',
  prompt: 'Why is the sky blue?',
});
```

#### Python

```python filename="index.py" {10}
import os
from openai import OpenAI

client = OpenAI(
  api_key=os.getenv('AI_GATEWAY_API_KEY'),
  base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.chat.completions.create(
  model='private/gpt-latest',
  messages=[{'role': 'user', 'content': 'Why is the sky blue?'}],
)
```

#### cURL

```bash filename="index.sh" {5}
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
-H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
-H "Content-Type: application/json" \
-d '{
  "model": "private/gpt-latest",
  "messages": [{ "role": "user", "content": "Why is the sky blue?" }]
}'
```

## Requirements

- The provider **base URL** must be a publicly reachable **HTTPS** endpoint. It can't embed credentials, use a non-standard port, or resolve to a private, loopback, or link-local address.
- The endpoint must use [a compatible API format](#compatible-api-formats).
- Each team can register up to **25 private providers** and **100 private models**.

* Private models need purchased [AI Gateway Credits](/docs/ai-gateway/pricing#top-up-your-ai-gateway-credits) and a positive credit balance. Without them, your private model requests fail.

## Supported model types

A private model declares the modality it serves so AI Gateway routes and reports it correctly: `language`, `embedding`, and `image`. Set the type to match what your upstream endpoint returns.

> **💡 Note:** Only the OpenAI Chat Completions format serves embedding and image models.
> The other [API formats](#compatible-api-formats) are limited to language
> models, and creating a private model of another type on such a provider is
> rejected.

## Pricing and observability

Vercel doesn't bill you for tokens on private models, but private model requests incur a [per-request fee](#fees-for-private-models-without-a-fallback) unless they have a Vercel-provided fallback. The requests run against your own endpoint, and you pay your provider directly. The [observability](/docs/ai-gateway/observability-and-spend/observability) views show only what Vercel bills, so they show no inference spend for private models.

Private model requests appear in observability alongside the rest of your AI Gateway traffic. They are attributed to the **private provider** that served them and flagged as private so you can filter for them.

To see only this traffic, click **Observability** on the Private Inference page. To narrow it to one provider or model, click **Open in Observability** on that provider's or model's page. The usage charts break down time to first token, requests, and tokens by private model:

![AI Gateway usage charts filtered to Private Inference.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/ai-gateway/private-inference/observability-charts-2-light.png)

### Fees for private models without a fallback

By default, AI Gateway charges $0.20 per 1,000 private model requests, because a request that names only a private model has no Vercel-provided fallback. A Vercel-provided fallback is a model from the AI Gateway catalog that AI Gateway can serve with Vercel's provider keys. A private model request has no fee when its model chain includes a Vercel-provided fallback and [Fallback to Vercel Keys](/docs/ai-gateway/authentication-and-byok/byok#turn-off-fallback-to-vercel-keys) is on, which is the default.

| Private model request                                                   | AI Gateway fee           |
| ----------------------------------------------------------------------- | ------------------------ |
| Vercel-provided fallback in the model chain, Fallback to Vercel Keys on | No additional cost       |
| No Vercel-provided fallback in the model chain                          | $0.20 per 1,000 requests |
| Any request while Fallback to Vercel Keys is off                        | $0.20 per 1,000 requests |

The model chain has a Vercel-provided fallback when it includes either of the following:

- A catalog model before or after the private model, as `model` or in [`models`](/docs/ai-gateway/models-and-providers/model-fallbacks), including inside a [virtual model's](/docs/ai-gateway/models-and-providers/virtual-models) chain
- A [decision fallback](/docs/ai-gateway/models-and-providers/decision-fallbacks) to a catalog model

For example, this request has a Vercel-provided fallback, so it incurs no fee:

```typescript filename="private-model-fallback.ts" {7}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'private/gpt-latest',
  prompt: 'Why is the sky blue?',
  providerOptions: {
    gateway: { models: ['openai/gpt-5.4-mini'] },
  },
});
```

If your private model fails and `openai/gpt-5.4-mini` serves the request, AI Gateway bills that model's token price, as for any request on Vercel's provider keys, and doesn't charge the fee.

While [Fallback to Vercel Keys](/docs/ai-gateway/authentication-and-byok/byok#turn-off-fallback-to-vercel-keys) is off, a catalog fallback can't run on Vercel's provider keys, so private model requests incur the fee.

AI Gateway charges the fee as follows:

- The fee applies to all inference requests that your private model serves, across all routes.
- AI Gateway doesn't charge requests that fail, for example because of a provider error or rate limit.
- AI Gateway deducts the fee from your AI Gateway Credits balance, and the fee counts toward your [budgets](/docs/ai-gateway/observability-and-spend/budgets).
- The fee applies on every plan at list price. [Enterprise](/docs/plans/enterprise) teams can [contact sales](/contact/sales) for custom rates.
- At list price, 1,000,000 requests that incur the fee cost $200.

To stop the fee, add a Vercel-provided fallback to the model chain and keep Fallback to Vercel Keys on. For every AI Gateway fee, see [AI Gateway Pricing](/docs/ai-gateway/pricing#byok-without-fallback).

## Permissions

Managing private inference uses your Vercel team role:

| Action                                              | Required role   |
| --------------------------------------------------- | --------------- |
| View private providers and models                   | Any team member |
| Create, edit, or delete a private provider or model | Member or Owner |
| Enable zero data retention on a provider            | Member or Owner |

If your endpoint does not retain request data, anyone who can create a private provider (Member or Owner) can attest [zero data retention](/docs/ai-gateway/security-and-compliance/zdr) on the provider.

## Next steps

- [Authentication](/docs/ai-gateway/authentication-and-byok): Create an API key to call your private models
- [Observability](/docs/ai-gateway/observability-and-spend/observability): Monitor usage and spend across your traffic
- [Bring Your Own Key (BYOK)](/docs/ai-gateway/authentication-and-byok/byok): Use your own credentials with supported public providers
- [`vercel ai-gateway private-inference`](/docs/cli/ai-gateway#private-inference): Manage private providers and models from the CLI

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
