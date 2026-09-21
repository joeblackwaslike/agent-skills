---
title: Virtual Models
product: vercel
url: /docs/ai-gateway/models-and-providers/virtual-models
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/virtual-models"
last_updated: 2026-09-17
type: how-to
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/model-fallbacks
  - /docs/cli/ai-gateway
  - /docs/ai-gateway
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
summary: Bundle an AI Gateway model with provider routing, fallback behavior, observability tags, and more under one custom slug your app calls.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/virtual-models.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "1fcc3ee345061e1dba9ce8ce3ba3eca38dfc1053ec2df483ae19deb5becb8ea2"
---

# Virtual Models

A Virtual Model is a custom slug that points to a model with the provider routing, fallback behavior, observability tags, and other settings it should use. Your app calls one stable name, and you can change any of those settings later without redeploying your application.

## When to use a virtual model

A virtual model is useful when you want to:

- Set up the model configurations you commonly use once, then update the model or routing at any time without pushing new code.
- Pin a slug to a specific provider or order providers to try, per slug instead of per request.
- Give a slug its own fallback chain, fast mode, provider sort, service tier, or prompt caching behavior.
- Restrict a slug's routing for compliance: zero data retention, HIPAA, or blocking provider training on request data.
- Attach arbitrary provider options, such as Anthropic's reasoning effort, to every request through the slug.
- Tag every request to a slug with custom labels for usage attribution and reporting.

## Creating a virtual model

- ### Open the Virtual Models page
  Go to the [Virtual Models page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fvirtual-models\&title=AI+Gateway+Virtual+Models) in your Vercel dashboard, then click **Create Virtual Model**.

- ### Set the slug and model
  Enter a **Slug** for your virtual model. This is the name your app will call with the `vmc/` prefix, for example `abc-123`. The slug cannot be changed after creation.

  Pick a **Model** from the AI Gateway catalog. This is the concrete model that requests to this slug will route to. Models with a fast tier appear twice: the base model and a **(Fast)** variant that locks the slug to the fast tier.

  Optionally add a **Display Name** and **Description** to identify the virtual model in the dashboard.

- ### Set provider routing (optional)
  Under **Provider Order**, select providers and drag them into the order AI Gateway should try them. Provider order only reorders routing. Providers you don't list can still serve the request as fallbacks after the ordered ones.

  Under **Provider Only**, select providers to restrict the slug to exactly that list. This list is a filter, not an order. The routing order still applies within it. There is no fallback outside the list, so the request fails if all listed providers fail.

  Under **Inference Region**, pin requests that use system credentials to a region.

- ### Set behavior (optional)
  Under **Model Fallbacks**, add models AI Gateway should try when every provider of the primary model fails, in order.

  Toggle **Fast Mode** to serve the model's fast tier when available. **Fallback From Fast Mode** is on by default and drops the request back to the base model when the fast tier fails.

  Use **Sort By**, **Service Tier**, and **Prompt Caching** to control how AI Gateway ranks providers, which provider service tier requests run on, and whether repeated prompt prefixes are cached. Each of these also accepts **System Default**, explained in **Unset, `@default`, and cleared settings** below.

  Under **Required Capabilities**, require providers to support implicit caching or vision. Those are the only two capabilities today. Under **Compliance**, restrict routing to zero-data-retention providers, HIPAA-compliant providers, or providers that don't train on request data.

  Under **Provider Options**, attach arbitrary per-provider AI SDK options as JSON, for example `{ "anthropic": { "effort": "high" } }`. Keys must be known provider slugs.

- ### Add observability tags and create
  Under **Observability Tags**, add a comma-separated list of tags to attach to every request that uses this slug. AI Gateway records the tags with each request for usage attribution, in place of any tags the request itself sends.

  Click **Create Virtual Model** to save.

## Using a virtual model in your app

Once you create a virtual model, call it like any other AI Gateway model with the `vmc/` prefix. The slug works in any request format AI Gateway supports:

#### AI SDK

```typescript filename="app/api/chat/route.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'vmc/abc-123',
  prompt: 'Hello, world!',
});
```

#### Chat Completions

```typescript filename="client.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await openai.chat.completions.create({
  model: 'vmc/abc-123',
  messages: [{ role: 'user', content: 'Hello, world!' }],
});
```

#### OpenAI Responses

```typescript filename="client.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: 'vmc/abc-123',
  input: 'Hello, world!',
});

console.log(response.output_text);
```

#### Anthropic Messages

```typescript filename="client.ts"
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'vmc/abc-123',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, world!' }],
});
```

Click the `vmc/<slug>` pill on any row in the Virtual Models list to copy the full identifier to your clipboard.

## How virtual model settings interact with request options

Requests to `vmc/<slug>` go through the same AI Gateway routing as direct model requests, so many options can come from either side. The resolving rule depends on the field:

| Setting | Virtual model sets it | Request also sets it |
| --- | --- | --- |
| Provider order (`order`) | Wins | Ignored |
| Provider restriction (`only`) | Wins | Ignored |
| Model fallbacks (`models`) | Wins, replaces the request's chain | Ignored |
| Fast mode (`speed`, `allowFallbackFromFast`) | Wins | Ignored |
| Provider sort (`sort`) | Wins | Ignored |
| Service tier (`serviceTier`) | Wins | Ignored |
| Prompt caching (`caching`) | Wins | Ignored |
| Provider timeouts (`providerTimeouts`) | Wins | Ignored |
| Inference region (`inferenceRegion`) | Wins on system-credential attempts | Ignored |
| Required capabilities (`has`) | Wins | Ignored |
| Observability tags (`tags`) | Wins | Ignored |
| Provider options (`providerOptions`) | Wins per option | Applies for options the virtual model doesn't set |
| Compliance (ZDR, HIPAA, block training) | Turns it on | On when either side turns it on, neither side turns it off |

A few details worth knowing:

- **A setting the virtual model leaves unset still comes from the request.** "Wins" applies only to settings the virtual model actually carries, so a slug can decide some options and leave the rest to the caller.
- **Provider options combine option by option.** Every other setting is a single value, so one side's wins outright. Provider options are a map, so the two are merged: the virtual model's value wins for each option it sets, and the request keeps the rest.
- **Required capabilities replace, so check `has: ['free']`.** A virtual model's capability list replaces the request's rather than adding to it, so a request using `has: ['free']` to stay on free providers loses that guard if the slug sets its own capabilities.
- **Compliance settings only tighten.** Zero data retention, HIPAA, and blocking prompt training turn on when either side enables them. A virtual model can't relax a restriction the request set, and a request can't relax one the virtual model set. In exchange, these fields reject the `@default` sentinel described below.
- **Model fallbacks resolve per attempt.** You can also use `vmc/<slug>` anywhere in a request's own [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks) array. Each model in a chain resolves independently, so a virtual model's routing and settings apply only to its own attempt and don't carry over to the next model in the list.

## Unset, `@default`, and cleared settings

Sort, service tier, prompt caching, and provider timeouts are tri-state. Understanding the three states matters when a caller and a virtual model could both set the same option:

| State | Effect |
| --- | --- |
| Unset (dashboard: **No Preference**) | The virtual model has no opinion. The request's own value applies, and when the request doesn't set one, the system default applies. |
| An explicit value | The virtual model's value wins. AI Gateway ignores the request's value. |
| `@default` (dashboard: **System Default**) | AI Gateway drops the request's value and applies the system default behavior. The virtual model actively removes the caller's choice without replacing it. |
| Cleared (API: `null`) | Removes the virtual model's setting, returning the field to unset, so requests flow with their own value or the system default again. |

Use `@default` when a team wants to guarantee standard behavior for all traffic through a slug, for example to keep callers from pinning priority tier through a shared virtual model.

AI Gateway accepts `@default` only on `sort`, `serviceTier`, `caching`, and `providerTimeouts`. The compliance settings reject it because an off choice would loosen a restriction the caller asked for. `speed`, `allowFallbackFromFast`, and `models` reject it because their unset state already is the default behavior, and `has` rejects it too, so on those a virtual model either sets a value or leaves the caller's alone.

## Managing virtual models

Changes to a virtual model, including archive and restore, take effect for new requests within a few minutes.

To manage virtual models from the terminal, use the [`vercel ai-gateway virtual-models`](/docs/cli/ai-gateway#virtual-models) command. It covers the same lifecycle as the dashboard: `create`, `list`, `inspect`, `edit`, `remove`, and `restore`.

To edit a virtual model, open it and use the sections on the Configure tab. You can change the model, provider routing, inference region, fallback chain, fast mode, sort, service tier, prompt caching, required capabilities, compliance settings, provider options, observability tags, display name, and description. The slug is immutable.

To archive a virtual model, open the menu on its row and click **Archive**. Archived virtual models stop serving traffic and return 404 to any request that uses their slug. The row stays visible in the Archived section at the bottom of the list. Open the menu on an archived row and click **Restore** to start serving traffic again.

## Permissions

Any member of your team can use a virtual model in their application. Only team **Owners** and **Members** can create, edit, archive, or restore virtual models.

## Related

- [`vercel ai-gateway virtual-models` CLI reference](/docs/cli/ai-gateway#virtual-models)
- [AI Gateway overview](/docs/ai-gateway)
- [Provider filtering, ordering, and sorting](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering)


---

[View full sitemap](/docs/sitemap)
