---
title: AI Gateway Virtual Models for Reusable Model Configurations
product: vercel
url: /docs/ai-gateway/models-and-providers/virtual-models
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/virtual-models"
last_updated: 2026-10-02
type: how-to
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/cli
  - /docs/ai-gateway/models-and-providers/decision-fallbacks
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/security-and-compliance/model-allowlist
summary: Save a model with its provider routing, fallbacks, regional inference, zero data retention, and provider options under one vmc/ model ID. Your code,...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/virtual-models.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "366c4a0cec6bb9f7f93e1583f0761345e16bfeab3ed13a9e0c5ba0cfe1e26ea7"
---

# AI Gateway Virtual Models for Reusable Model Configurations

A virtual model is a saved AI Gateway model configuration with its own model ID, `vmc/<slug>`. It pairs a model with the provider routing, fallbacks, regional inference, compliance settings, provider options, and observability tags its requests should use. Any client that takes a model name gets that configuration without sending the options itself, whether it's your own code, a chat platform, or a coding agent like Claude Code or Codex that can't pass AI Gateway options per request. Virtual models work with every model type in the catalog, and you can change their settings later without redeploying your app or editing anyone's config.

## When to use a virtual model

Use a virtual model to:

- Configure the model that coding agents and harnesses such as Claude Code or Codex use, including routing and provider options they can't send per request, and change it later without touching each developer's config.
- Change the model or routing your app uses without redeploying.
- Set provider order, fallbacks, fast mode, service tier, prompt caching, and provider options once per slug instead of on every request.
- Share one approved configuration across your team's apps, chat platforms, and other tools that list AI Gateway models.
- Enforce zero data retention or block provider training for all traffic through the slug.
- Tag requests for usage attribution.

## Creating a virtual model

Create a virtual model from the dashboard or the [Vercel CLI](/docs/cli/ai-gateway#virtual-models).

#### Dashboard

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

  For a decision model, select **Add Condition** on the first model fallback to define the request question conditions that should rerun the complete decision on it. Question IDs are free-form because a virtual model does not know the questions a future request will send. AI Gateway validates the IDs and question types when the request arrives.

  Toggle **Fast Mode** to serve the model's fast tier when available. **Fallback From Fast Mode** is on by default and drops the request back to the base model when the fast tier fails.

  Use **Sort By**, **Service Tier**, and **Prompt Caching** to control how AI Gateway ranks providers, which provider service tier requests run on, and whether repeated prompt prefixes are cached. Each of these also accepts **System Default**, explained in **Unset, `@default`, and cleared settings** below.

  Under **Required Capabilities**, require providers to support implicit caching or vision. Those are the only two capabilities today. Under **Compliance**, restrict routing to zero-data-retention providers or providers that don't train on request data.

  Under **Provider Options**, attach arbitrary per-provider AI SDK options as JSON, for example `{ "anthropic": { "effort": "high" } }`. Keys must be known provider slugs.

- ### Add observability tags and create
  Under **Observability Tags**, add a comma-separated list of tags to attach to every request that uses this slug. AI Gateway records the tags with each request for usage attribution, in place of any tags the request itself sends.

  Click **Create Virtual Model** to save.

#### CLI

Make sure you're on the [latest CLI version](/docs/cli). The virtual model is created under your current CLI scope. Check it with `vercel whoami`, change it with `vercel switch`, or pass `--scope <team>` per command.

Run `create` with no arguments to be prompted for the slug and model, or pass them directly:

```bash filename="terminal"
vercel ai-gateway virtual-models create abc-123 --model anthropic/claude-opus-5.5
```

The model, display name, description, and provider routing have their own flags. Set every other field with `--config`, a JSON object of virtual model fields. When a flag and a `--config` key set the same field, the flag wins. This command creates the `vmc/coding-agent-eu` virtual model from the diagram at the top of this page:

```bash filename="terminal"
vercel ai-gateway virtual-models create coding-agent-eu \
  --model anthropic/claude-opus-5.5 \
  --provider-order bedrock,vertex \
  --config '{
    "inferenceRegion": { "scope": "zone", "geoRegion": "eu" },
    "providerOptions": { "anthropic": { "effort": "high" } },
    "observabilityTags": ["coding-agents"]
  }'
```

Each dashboard setting maps to a flag or a `--config` key:

| Dashboard setting | CLI flag | `--config` key | Example value |
| --- | --- | --- | --- |
| **Slug** | First argument | | `coding-agent-eu` |
| **Model** | `--model` | `modelSlug` | `anthropic/claude-opus-5.5` |
| **Display Name** | `--display-name` | `displayName` | `Coding agent (EU)` |
| **Description** | `--description` | `description` | `Opus 5.5 pinned to the EU` |
| **Provider Order** | `--provider-order` | `providerOrder` | `bedrock,vertex` as a flag, `["bedrock", "vertex"]` in `--config` |
| **Provider Only** | `--provider-only` | `providerOnly` | `bedrock,vertex` as a flag, `["bedrock", "vertex"]` in `--config` |
| **Inference Region** | | `inferenceRegion` | `{ "scope": "zone", "geoRegion": "eu" }` |
| **Model Fallbacks** | | `models` | `["anthropic/claude-sonnet-5.5"]` |
| **Fast Mode** | | `speed` | `"fast"` |
| **Fallback From Fast Mode** | | `allowFallbackFromFast` | `true` |
| **Sort By** | | `sort` | `"cost"` |
| **Service Tier** | | `serviceTier` | `"priority"` or `"flex"` |
| **Prompt Caching** | | `caching` | `"auto"` |
| Provider timeouts | | `providerTimeouts` | `{ "byok": { "openai": 15000 } }` |
| **Required Capabilities** | | `has` | `["implicit-caching"]` |
| **Compliance**: zero data retention | | `zeroDataRetention` | `true` |
| **Compliance**: no prompt training | | `disallowPromptTraining` | `true` |
| **Provider Options** | | `providerOptions` | `{ "anthropic": { "effort": "high" } }` |
| **Observability Tags** | | `observabilityTags` | `["coding-agents"]` |

`sort`, `serviceTier`, `caching`, and `providerTimeouts` also accept `"@default"`, described in [Unset, `@default`, and cleared settings](#unset-default-and-cleared-settings). For a decision model's conditional fallback, see [Decision Fallbacks](/docs/ai-gateway/models-and-providers/decision-fallbacks#store-the-fallback-policy-in-a-virtual-model).

Add `--format json` (or `--json`) to any `virtual-models` subcommand for machine-readable output.

## Using a virtual model with Claude Code, Codex, and other coding agents

Coding agents send AI Gateway a model ID with each request, but they usually can't attach AI Gateway options such as provider order, model fallbacks, regional inference, or zero data retention. To give an agent those settings, create a virtual model and select `vmc/<slug>` as the agent's model, so every request the agent sends uses the virtual model's configuration. From the terminal, create the virtual model and connect your agents with [`vercel ai-gateway setup`](/docs/cli/ai-gateway#setup):

```bash filename="terminal"
vercel ai-gateway virtual-models create coding-agent --model anthropic/claude-opus-5.5
vercel ai-gateway setup
```

AI Gateway lists your team's virtual models in the model catalogs it serves to coding agents, so the slug appears next to the catalog models:

- **Claude Code**: the `/model` picker lists `claude-code/vmc/<slug>`, with a `[1m]` suffix when the underlying model has a context window of 1M tokens or more.
- **Codex**: pick the slug from `/model`, pass `codex --model vmc/<slug>`, or set `model = "vmc/<slug>"` in `~/.codex/config.toml`.
- **Other agents**: use `vmc/<slug>` anywhere the agent accepts an AI Gateway model ID.

AI Gateway lists only virtual models that point at a language model. If a running agent doesn't show a new slug yet, restart it so it reloads the model list.

Each agent stores only the slug, so editing the virtual model changes the configuration for every developer at once. For example, `vercel ai-gateway virtual-models edit coding-agent --model anthropic/claude-fable-5.1` moves every agent using `vmc/coding-agent` to Fable 5.1 for new requests within a few minutes.

## Using a virtual model in your app

Once you create a virtual model, call it like any other AI Gateway model with the `vmc/` prefix. The slug works in every request format AI Gateway supports, and you don't need to send any AI Gateway options with it. These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling:

#### AI SDK

#### TypeScript

```typescript filename="virtual-model.ts" {4}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'vmc/abc-123',
  prompt: 'Hello, world!',
});

console.log(text);
```

#### Python (beta)

```python filename="virtual_model_ai.py" {5}
import asyncio
import ai

async def main():
    model = ai.get_model("vmc/abc-123")
    messages = [ai.user_message("Hello, world!")]
    async with ai.stream(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="virtual-model-chat.ts" {9}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: 'vmc/abc-123',
  messages: [{ role: 'user', content: 'Hello, world!' }],
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="virtual_model_chat.py" {10}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="vmc/abc-123",
    messages=[{"role": "user", "content": "Hello, world!"}],
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="virtual-model-chat.sh" {5}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "vmc/abc-123",
  "messages": [{ "role": "user", "content": "Hello, world!" }]
}'
```

#### Messages API

#### TypeScript

```typescript filename="virtual-model-messages.ts" {9}
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await client.messages.create({
  model: 'vmc/abc-123',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, world!' }],
});

for (const block of message.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="virtual_model_messages.py" {10}
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

message = client.messages.create(
    model="vmc/abc-123",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, world!"}],
)

for block in message.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="virtual-model-messages.sh" {6}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "vmc/abc-123",
  "max_tokens": 1024,
  "messages": [{ "role": "user", "content": "Hello, world!" }]
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="virtual-model-responses.ts" {9}
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

#### Python

```python filename="virtual_model_responses.py" {10}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="vmc/abc-123",
    input="Hello, world!",
)

print(response.output_text)
```

#### cURL

```bash filename="virtual-model-responses.sh" {5}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "vmc/abc-123",
  "input": "Hello, world!"
}'
```

Click the `vmc/<slug>` pill on any row in the Virtual Models list to copy the full identifier to your clipboard.

## Using a virtual model with other model types

Virtual models work with every model type in the AI Gateway catalog, including embedding, image, video, speech, transcription, reranking, and decision models. Pass the `vmc/` slug to the AI SDK function for that model type, the same way you would pass the underlying model:

#### Embeddings

```typescript filename="embed.ts"
import { embed } from 'ai';

const { embedding } = await embed({
  model: 'vmc/search-embeddings',
  value: 'sunny day at the beach',
});
```

#### Image

```typescript filename="generate-image.ts"
import { gateway } from '@ai-sdk/gateway';
import { generateImage } from 'ai';

const { image } = await generateImage({
  model: gateway.imageModel('vmc/product-images'),
  prompt: 'A red lighthouse on a rocky coast, flat illustration',
});
```

#### Video

```typescript filename="generate-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const { videos } = await generateVideo({
  model: 'vmc/promo-video',
  prompt: 'A paper boat drifting down a rainy street, slow camera pan',
  duration: 5,
});

fs.writeFileSync('output.mp4', videos[0].uint8Array);
```

#### Text to Speech

```typescript filename="generate-speech.ts"
import { generateSpeech } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { writeFile } from 'node:fs/promises';

const result = await generateSpeech({
  model: gateway.speechModel('vmc/narrator'),
  text: 'Hello from AI Gateway.',
  voice: 'alloy',
});

await writeFile('greeting.mp3', result.audio.uint8Array);
```

#### Speech to Text

```typescript filename="transcribe.ts"
import { transcribe } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { readFile } from 'node:fs/promises';

const result = await transcribe({
  model: gateway.transcriptionModel('vmc/meeting-notes'),
  audio: await readFile('meeting.mp3'),
});

console.log(result.text);
```

#### Reranking

```typescript filename="rerank.ts"
import { rerank } from 'ai';

const { ranking } = await rerank({
  model: 'vmc/search-rerank',
  query: 'What is the capital of France?',
  documents: [
    'Berlin is the capital of Germany.',
    'Paris is the capital of France.',
    'Madrid is the capital of Spain.',
  ],
  topN: 2,
});
```

#### Decision

```typescript filename="decide.ts"
import { experimental_decide as decide } from 'ai';

const { answers } = await decide({
  model: 'vmc/support-triage',
  state: 'Help! My payouts have been failing for 3 days.',
  questions: {
    urgent: { type: 'boolean', instructions: 'Is this request urgent?' },
  },
});
```

The same slugs work in the HTTP endpoints for each model type, such as `/v1/embeddings`, `/v1/images/generations`, `/v2/rerank`, and `/v1/evaluate`. In the AI SDK, `providerMetadata.gateway.virtualModelConfig.modelId` on the result names the virtual model that served the request.

A few things to keep in mind:

- **Request options still belong to the underlying model.** Options such as `voice`, `size`, or `duration` pass through unchanged, so use values the model behind the slug accepts.
- **A slug only serves its own model type.** Sending an image virtual model to Chat Completions, for example, returns a `400` error that names the API to use instead.
- **Decision virtual models can store a fallback policy.** See [Decision Fallbacks](/docs/ai-gateway/models-and-providers/decision-fallbacks#store-the-fallback-policy-in-a-virtual-model) to escalate uncertain answers to another model for every caller.

## How virtual models interact with team settings

Your team's AI Gateway settings apply to every request, including requests through a virtual model. A virtual model can add restrictions for its own traffic, but it can't bypass or loosen a team setting:

| Team setting | Effect on requests through a virtual model |
| --- | --- |
| [Model allowlist](/docs/ai-gateway/security-and-compliance/model-allowlist#virtual-models) | AI Gateway checks the model the virtual model points at, not the `vmc/` slug. If that model isn't on the allowlist, the request is blocked. |
| [Provider allowlist](/docs/ai-gateway/security-and-compliance/provider-allowlist) | Applies on top of the virtual model's **Provider Order** and **Provider Only** lists. A provider your team disabled can't serve the request, even when the virtual model lists it. |
| [Routing rules](/docs/ai-gateway/models-and-providers/routing-rules#virtual-models) | A deny rule on the underlying model blocks it through the virtual model too. If the virtual model has model fallbacks, AI Gateway skips the denied attempt and tries the next one. Rewrites run before AI Gateway resolves the virtual model, so a rewrite can send direct callers to a `vmc/` slug, and AI Gateway doesn't apply rewrites again to the model inside it. |
| [Team-wide zero data retention](/docs/ai-gateway/security-and-compliance/zdr#team-wide-zero-data-retention) | Stays on for virtual model traffic. A virtual model can turn on ZDR for its own traffic, but it can't turn off the team setting. |
| [Budgets](/docs/ai-gateway/observability-and-spend/budgets) | A request through a virtual model counts toward every budget in scope for how it authenticates, the same as a direct request. |
| [BYOK credentials](/docs/ai-gateway/authentication-and-byok/byok) | A virtual model's inference region applies only to attempts on AI Gateway's system credentials, not to attempts on your team's own credentials. |

## How virtual model settings interact with request options

Requests to `vmc/<slug>` go through the same AI Gateway routing as direct model requests, so many options can come from either side. The resolving rule depends on the field:

| Setting | Virtual model sets it | Request also sets it |
| --- | --- | --- |
| Provider order (`order`) | Wins | Ignored |
| Provider restriction (`only`) | Wins | Ignored |
| Model fallbacks (`models`) | Wins, replaces the request's string or conditional chain | Ignored |
| Fast mode (`speed`, `allowFallbackFromFast`) | Wins | Ignored |
| Provider sort (`sort`) | Wins | Ignored |
| Service tier (`serviceTier`) | Wins | Ignored |
| Prompt caching (`caching`) | Wins | Ignored |
| Provider timeouts (`providerTimeouts`) | Wins | Ignored |
| Inference region (`inferenceRegion`) | Wins on system-credential attempts | Ignored |
| Required capabilities (`has`) | Wins | Ignored |
| Observability tags (`tags`) | Wins | Ignored |
| Provider options (`providerOptions`) | Wins per option | Applies for options the virtual model doesn't set |
| Compliance (ZDR, block training) | Turns it on | On when either side turns it on, neither side turns it off |

For example, `vmc/coding-agent-eu` from the diagram at the top of this page sets an EU inference region, provider order `bedrock, vertex`, the Anthropic provider option `effort: high`, and the tag `coding-agents`. It leaves prompt caching unset. A caller sends its own options anyway:

```typescript filename="review.ts" {6-15}
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'vmc/coding-agent-eu',
  prompt: 'Review this diff for bugs.',
  providerOptions: {
    gateway: {
      order: ['anthropic'],
      tags: ['feature:review'],
      caching: 'auto',
      zeroDataRetention: true,
    },
    anthropic: {
      effort: 'low',
    },
  },
});
```

AI Gateway resolves each option like this:

- **Provider order**: AI Gateway tries `bedrock`, then `vertex`, in the EU. The virtual model sets an order, so the request's `['anthropic']` is ignored.
- **Tags**: AI Gateway records `coding-agents`. The request's `feature:review` tag is ignored.
- **Prompt caching**: `auto`, from the request, because the virtual model leaves caching unset.
- **Zero data retention**: on. The request turned it on, and neither side can turn it off.
- **Reasoning effort**: `high`. Provider options merge option by option, and the virtual model sets `effort`, so its value wins over the request's `low`.

A few details worth knowing:

- **A setting the virtual model leaves unset still comes from the request.** "Wins" applies only to settings the virtual model actually carries, so a slug can decide some options and leave the rest to the caller.
- **Provider options combine option by option.** Every other setting is a single value, so one side's wins outright. Provider options are a map, so the two are merged: the virtual model's value wins for each option it sets, and the request keeps the rest.
- **Required capabilities replace, so check `has: ['free']`.** A virtual model's capability list replaces the request's rather than adding to it, so a request using `has: ['free']` to stay on free providers loses that guard if the slug sets its own capabilities.
- **Compliance settings only tighten.** Zero data retention and blocking prompt training turn on when either side enables them. A virtual model can't relax a restriction the request set, and a request can't relax one the virtual model set. In exchange, these fields reject the `@default` sentinel described below.
- **Model fallbacks resolve per attempt.** You can also use `vmc/<slug>` anywhere in a request's own [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks) array. Each model in a chain resolves independently, so a virtual model's routing and settings apply only to its own attempt and don't carry over to the next model in the list.
- **Decision fallbacks rerun the full request.** A decision virtual model can store one conditional policy. When it matches, AI Gateway reruns every question with the fallback and returns only that complete result. See [Decision Fallbacks](/docs/ai-gateway/models-and-providers/decision-fallbacks#store-the-fallback-policy-in-a-virtual-model).

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

Changes to a virtual model, including archive and restore, take effect for new requests within a few minutes. The slug can't be changed after creation.

#### Dashboard

To edit a virtual model, open it and use the sections on the Configure tab. You can change the model, provider routing, inference region, fallback chain, decision fallback, fast mode, sort, service tier, prompt caching, required capabilities, compliance settings, provider options, observability tags, display name, and description.

To archive a virtual model, open the menu on its row and click **Archive**. Archived virtual models stop serving traffic and return 404 to any request that uses their slug. The row stays visible in the Archived section at the bottom of the list. Open the menu on an archived row and click **Restore** to start serving traffic again.

#### CLI

List your team's virtual models. Add `--include-archived` to also show ones archived in the dashboard:

```bash filename="terminal"
vercel ai-gateway virtual-models list
```

Show every field set on a virtual model:

```bash filename="terminal"
vercel ai-gateway virtual-models inspect coding-agent-eu
```

`edit` takes the same flags and `--config` keys as `create`, except `--kind`, and needs at least one of them. Fields you leave out keep their current values. Set a field to `null` to clear it, or to `"@default"` to drop the caller's value in favor of the system default. To clear model fallbacks, set `models` to `[]`:

```bash filename="terminal"
vercel ai-gateway virtual-models edit coding-agent-eu --model anthropic/claude-sonnet-5.5
vercel ai-gateway virtual-models edit coding-agent-eu --config '{"caching":"auto","serviceTier":"@default"}'
vercel ai-gateway virtual-models edit coding-agent-eu --config '{"inferenceRegion":null,"models":[]}'
```

`remove` runs without a confirmation prompt. Requests to the slug stop resolving, and the virtual model no longer appears in `list`, even with `--include-archived`. AI Gateway keeps its configuration, so `restore` brings it back as it was:

```bash filename="terminal"
vercel ai-gateway virtual-models remove coding-agent-eu
vercel ai-gateway virtual-models restore coding-agent-eu
```

Removing is separate from archiving in the dashboard. An archived virtual model still appears in `list --include-archived`, labeled `archived`.

`vercel ai-gateway models ls` lists your team's virtual models alongside the catalog models. Add `--virtual` to show only virtual models. See the [`vercel ai-gateway virtual-models` reference](/docs/cli/ai-gateway#virtual-models) for every option.

## Permissions

Any member of your team can use a virtual model in their application. Team **Owners** and **Members** can create virtual models. Only the member who created a virtual model or a team **Owner** can edit, archive, remove, or restore it, in the dashboard or the CLI.

## Related

- [`vercel ai-gateway virtual-models` CLI reference](/docs/cli/ai-gateway#virtual-models)
- [AI Gateway overview](/docs/ai-gateway)
- [Provider filtering, ordering, and sorting](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering)
- [Decision Fallbacks](/docs/ai-gateway/models-and-providers/decision-fallbacks)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
