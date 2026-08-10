---
title: Regional Inference
product: vercel
url: /docs/ai-gateway/security-and-compliance/regional-inference
canonical_url: "https://vercel.com/docs/ai-gateway/security-and-compliance/regional-inference"
last_updated: 2026-07-25
type: conceptual
prerequisites:
  - /docs/ai-gateway/security-and-compliance
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/security-and-compliance/zdr
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/security-and-compliance/disallow-prompt-training
  - /docs/ai-gateway/models-and-providers
summary: Route AI Gateway inference to the region you choose and control where providers store data, for data residency and compliance requirements.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/security-and-compliance/regional-inference.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "1118173714552d7058630c55126d1ca54e6962536ff3a4ab7f31feaca2815be4"
---

# Regional Inference

AI Gateway lets you pick which region to route each request to your model's
provider, where available. This may help with your data residency, compliance,
and latency requirements. You choose the region per request.
AI Gateway routes your data to the provider in a data center in that region, and
to the extent the provider stores data, it's configured to store it there. If AI
Gateway can't honor the chosen region, the request fails instead of silently
running somewhere else.

> **💡 Note:** `inferenceRegion` pins where the provider runs inference and stores your data.
> It doesn't pin where your request reaches AI Gateway: your request can
> terminate and be processed in any Vercel region before AI Gateway forwards it
> to the provider. Region-pinned gateway hosts that terminate TLS and run gateway
> processing in a single region are coming.

## What regional routing controls

Set `inferenceRegion` on a request and the provider runs inference in that
region. To the extent it stores anything at rest, it stores it in the same
region. One setting covers both:

| What happens to your data | Where it happens |
|---------------------------|------------------|
| The provider runs inference on your prompt | The region you set with `inferenceRegion` |
| The provider stores data at rest, if it stores anything | The same region |

What varies by provider is whether anything is stored at rest at all. Many
providers store nothing for inference, and
[zero data retention](/docs/ai-gateway/security-and-compliance/zdr) has the
provider delete prompts and responses after the request (see
[where your data goes](#where-your-data-goes)).

## Choosing a region

Set `providerOptions.gateway.inferenceRegion` on the request, and AI Gateway
routes inference to that region:

| Value | Where AI Gateway routes inference |
|-------|-----------------------------------|
| `{ scope: 'zone', geoRegion: 'us' }` | A US data center |
| `{ scope: 'zone', geoRegion: 'eu' }` | An EU data center |
| `{ scope: 'global' }` (or omitted) | Any region |

- The default (no `inferenceRegion`) is `global`, which means AI Gateway picks
  whichever region can serve the model, based on availability and latency. It can
  resolve to a different region on each request, and that region may be outside
  your users' jurisdiction. Residency is opt-in: pin a region if where inference
  runs matters to you.
- `zone` requires `geoRegion` (`us` or `eu`). If you omit it, the request fails.
- You set the region in the request body or config only. There's no HTTP header
  for it.

### Using AI SDK

Set `inferenceRegion` in `providerOptions`:

#### streamText

```typescript filename="inference-region.ts" {10-13}
import type { GatewayProviderOptions } from '@ai-sdk/gateway';
import { streamText } from 'ai';

export async function POST(request: Request) {
  const result = streamText({
    model: 'openai/gpt-5.6-sol',
    prompt: 'Summarize this contract clause.',
    providerOptions: {
      gateway: {
        inferenceRegion: {
          scope: 'zone',
          geoRegion: 'us',
        },
      } satisfies GatewayProviderOptions,
    },
  });

  return result.toDataStreamResponse();
}
```

#### generateText

```typescript filename="inference-region.ts" {10-13}
import type { GatewayProviderOptions } from '@ai-sdk/gateway';
import { generateText } from 'ai';

export async function POST(request: Request) {
  const { text } = await generateText({
    model: 'openai/gpt-5.6-sol',
    prompt: 'Summarize this contract clause.',
    providerOptions: {
      gateway: {
        inferenceRegion: {
          scope: 'zone',
          geoRegion: 'us',
        },
      } satisfies GatewayProviderOptions,
    },
  });

  return Response.json({ text });
}
```

### Using the Chat Completions API

Set `inferenceRegion` in `providerOptions`:

#### TypeScript

```typescript filename="inference-region.ts" {20-23}
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'openai/gpt-5.6-sol',
  messages: [
    {
      role: 'user',
      content: 'Summarize this contract clause.',
    },
  ],
  providerOptions: {
    gateway: {
      inferenceRegion: {
        scope: 'zone',
        geoRegion: 'us',
      },
    },
  },
});
```

#### Python

```python filename="inference-region.py" {20}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh/v1",
)

completion = client.chat.completions.create(
    model="openai/gpt-5.6-sol",
    messages=[
        {
            "role": "user",
            "content": "Summarize this contract clause.",
        }
    ],
    extra_body={
        "providerOptions": {
            "gateway": {
                "inferenceRegion": {"scope": "zone", "geoRegion": "us"}
            }
        }
    },
)
```

### Using the Responses API

Set `inferenceRegion` in `providerOptions`:

#### TypeScript

```typescript filename="inference-region.ts" {20-23}
const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'openai/gpt-5.6-sol',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'Summarize this contract clause.',
      },
    ],
    providerOptions: {
      gateway: {
        inferenceRegion: {
          scope: 'zone',
          geoRegion: 'us',
        },
      },
    },
  }),
});
```

#### Python

```python filename="inference-region.py" {20}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="openai/gpt-5.6-sol",
    input=[
        {
            "role": "user",
            "content": "Summarize this contract clause.",
        }
    ],
    extra_body={
        "providerOptions": {
            "gateway": {
                "inferenceRegion": {"scope": "zone", "geoRegion": "us"}
            }
        }
    },
)
```

### Using the Anthropic Messages API

Set `inferenceRegion` in `providerOptions`:

#### TypeScript

```typescript filename="inference-region.ts" {22-25}
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-opus-5',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Summarize this contract clause.',
    },
  ],
  // @ts-expect-error -- providerOptions is not in the Anthropic SDK types
  providerOptions: {
    gateway: {
      inferenceRegion: {
        scope: 'zone',
        geoRegion: 'us',
      },
    },
  },
});
```

#### Python

```python filename="inference-region.py" {21}
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh",
)

message = client.messages.create(
    model="anthropic/claude-opus-5",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": "Summarize this contract clause.",
        }
    ],
    extra_body={
        "providerOptions": {
            "gateway": {
                "inferenceRegion": {"scope": "zone", "geoRegion": "us"}
            }
        }
    },
)
```

### Per-provider overrides (advanced)

Most callers set one region and stop. If more than one provider can serve a single
request, you can set a default plus per-provider overrides. The top-level value
applies to every provider unless you list that provider under `providers`:

```jsonc {6-7}
{
  "inferenceRegion": {
    "scope": "zone",
    "geoRegion": "us",           // default for all providers
    "providers": {
      "bedrock": { "scope": "zone", "geoRegion": "eu" },  // Bedrock only: EU
      "anthropic": null                                   // Anthropic: no region pinned
    }
  }
}
```

This reads as: AI Gateway routes your data to every provider in the US, except it
routes Bedrock traffic to the EU and leaves Anthropic unconstrained. AI Gateway
ignores unknown provider keys.

## Where your data goes

AI Gateway routes your data to the provider in the region you pin. To the extent
that provider stores your request data at rest, it's configured to store it in
that region. Each provider's own terms set what it keeps and for how long, so
check the provider's documentation for the specifics.

Abuse and safety monitoring is separate. Regardless of your pinned region or
retention settings, a provider handles and retains requests it flags for abuse
or safety review under its own policies, which can fall outside your region.
Vercel doesn't control that or guarantee it beyond what the provider documents,
so check the provider's terms.

To limit retention, add [zero data retention (ZDR)](/docs/ai-gateway/security-and-compliance/zdr),
where available. With ZDR, the provider deletes your prompts and responses after
the request rather than retaining them. Some provider models do not have ZDR. For
example, Anthropic's `fable-5` is ineligible for ZDR on every provider, so a
request with ZDR configured fails rather than route to it.

Not every provider serves every region, so coverage varies by provider and model
(see [Current limits](#current-limits)). Don't assume a request ran where you
asked; confirm the resolved region from the response (see [Confirming where a
request ran](#confirming-where-a-request-ran)).

## Regional pricing

Pinning a region can raise what a request costs. Providers often price regional
inference above their default routing, and one region can cost more than another
for the same model. The provider sets that price.

AI Gateway passes the provider's regional price straight through. Choosing a
region adds no AI Gateway markup on top of it: you pay the provider's rate for
the region you picked.

To see what a model charges per region, open it from the
[model list](/ai-gateway/models) and hover the price in the **Providers** table.
The **Price by region** card shows each region's rate as a percentage difference
from the global price, for example `EU +10%`. A region that costs the same as
global reads `Same as global`.

The `https://ai-gateway.vercel.sh/v1/models` endpoint returns the same rates as
absolute per-token numbers, under `pricing.regional`:

```jsonc {4-7}
{
  "pricing": {
    "input": "0.000005",
    "regional": {
      "eu": { "input": "0.0000055" },
      "us": { "input": "0.0000055" }
    }
  }
}
```

To see what a specific request cost, check the cost reported in the response
metadata.

You only take on a region's rate when you set `inferenceRegion`. Leave it unset
(the `global` default) to route at the provider's standard rate.

## BYOK and data residency

Bringing your own key doesn't opt you out of residency. When you use
[BYOK credentials](/docs/ai-gateway/authentication-and-byok/byok), AI Gateway
applies `inferenceRegion` the same way it does with system credentials:

- **AI Gateway routes your key's requests to in-region endpoints.** Your key
  material is untouched; AI Gateway regionalizes how it's used, calling the
  provider's in-region endpoint with your key.
- **An explicit region overrides a region saved on the credential.** If your
  Vertex credential is saved with a `location` and the request asks for a
  different region, the request's region wins. If you don't set a region, the
  credential's saved location applies where it has one.
- **Failure behavior is the same.** If no provider can honor the region with
  your credentials, the request fails with HTTP 400. AI Gateway doesn't fall
  back to an out-of-region endpoint, even when the credentials are your own.
- **Verification is the same.** Responses report the resolved region for BYOK
  requests too, so you can confirm residency from the response metadata.
- **Zero data retention skips BYOK keys by default.** If you pair a pinned region
  with ZDR, AI Gateway routes around your own credentials unless you mark a key as
  ZDR-compliant, since those keys run under your provider agreements rather than
  Vercel's. See [ZDR and BYOK](/docs/ai-gateway/security-and-compliance/zdr#byok).

## Keeping a request in-region

Set `inferenceRegion` and the provider processes your prompts and completions,
and stores anything it keeps at rest, only in your chosen region. If it can't,
the request fails instead of running elsewhere.

To limit retention, add
[zero data retention](/docs/ai-gateway/security-and-compliance/zdr) and
[disallow prompt training](/docs/ai-gateway/security-and-compliance/disallow-prompt-training),
so the provider deletes your data after the request and doesn't train on it.
Whether a provider stores anything by default is provider-dependent (see
[where your data goes](#where-your-data-goes)).

Region coverage varies by model. To find models that support a region, filter the
[model list](/ai-gateway/models):

- [Models available in the US](/ai-gateway/models?inferenceRegionUs=true)
- [Models available in the EU](/ai-gateway/models?inferenceRegionEu=true)

The [`/v1/models`](https://ai-gateway.vercel.sh/v1/models) endpoint returns the
same coverage as a `regions` array per model (for example, `["eu", "us"]`); a
model with no `regions` field doesn't support regional routing.

This pins where the provider processes and stores your data. It doesn't pin the
network path your request takes to reach the provider.

## Defaults and failure behavior

- If you request no region, AI Gateway routes your data globally. This isn't an
  error.
- If AI Gateway can't honor the region, the request fails with HTTP 400
  (`invalid_request_error`). AI Gateway doesn't silently fall back to another
  region.
- There's no automatic downgrade from a preferred region to a broader one.

## Confirming where a request ran

Every response reports where AI Gateway actually ran inference, so you can verify
residency instead of assuming it. The resolved region is in the gateway routing
metadata, on the provider attempt that served the request.

With the AI SDK, read it from `providerMetadata.gateway`. On the OpenAI-compatible
endpoints, the same object sits on each choice's message as
`provider_metadata.gateway`:

```jsonc {10-14}
{
  "gateway": {
    "routing": {
      "finalProvider": "openai",
      "modelAttempts": [
        {
          "providerAttempts": [
            {
              "provider": "openai",
              "inferenceEndpoint": {
                "slug": "geo-us",
                "scope": "zone",
                "geoRegion": "us"
              }
            }
          ]
        }
      ]
    }
  }
}
```

Read `inferenceEndpoint.geoRegion` (here `us`) and compare it against the region
you asked for; `finalProvider` names the provider that served the request. When
you don't pin a region, `inferenceEndpoint` is `null`, matching the `global`
default, which doesn't pin a region.

## GDPR and regional routing

If GDPR is the driver for pinning a region, consider your compliance needs: where
personal data is processed is one obligation among many. Regional routing answers
the location question; it doesn't by itself make a workload GDPR-compliant.

## Current limits

- The regions available today are `us` and `eu`, and not every model supports
  both. Check a model's `regions` in the [model list](/docs/ai-gateway/models-and-providers)
  or from `https://ai-gateway.vercel.sh/v1/models`.
- Region selection is opt-in; the default is `global`.
- There's no cross-region fallback: a region that AI Gateway can't honor fails the
  request.


---

[View full sitemap](/docs/sitemap)
