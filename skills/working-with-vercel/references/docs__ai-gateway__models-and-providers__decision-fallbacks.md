---
title: Decision Fallbacks
product: vercel
url: /docs/ai-gateway/models-and-providers/decision-fallbacks
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/decision-fallbacks"
last_updated: 2026-10-08
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/routing-rules
  - /docs/ai-gateway/modalities/decision
  - /docs/ai-gateway/models-and-providers/model-fallbacks
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/sdks-and-apis/openai-decisions
summary: Escalate uncertain AI Gateway decision results to another model with confidence, probability, and compound conditions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/decision-fallbacks.md"
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "7f4078b8332d8963a92adce6acb0684d9499585e34cfca48910e05b6c7336b38"
---

# Decision Fallbacks

Decision fallbacks rerun a successful decision with another model when an answer is uncertain. You opt in per request by adding one conditional object to `providerOptions.gateway.models`. Requests without a conditional `models` entry keep their existing behavior.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway adds confidence-based decision fallbacks](https://vercel.com/changelog/confidence-based-decision-fallbacks?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fdecision-fallbacks&source_site=vercel-docs&relationship=related)
- [Decisions](https://ai-sdk.dev/docs/ai-sdk-core/decisions?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fdecision-fallbacks&source_site=vercel-docs&relationship=related) — Decide answers to Choice, Score, and Boolean questions against shared state.
- [Route form submissions with Jev and AI SDK](https://vercel.com/kb/guide/jev-ai-sdk-form-router?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fdecision-fallbacks&source_site=vercel-docs&relationship=related) — Route form submissions to the right team with the Jev x AI SDK Form Router template. Jev routes clear cases and a fallba
- [Cost-aware model routing through AI Gateway](https://vercel.com/kb/guide/cost-aware-model-routing-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fdecision-fallbacks&source_site=vercel-docs&relationship=related) — Route easy requests to a cheap model and escalate only hard ones to a frontier model through one AI Gateway endpoint, wi
- [AI Gateway](https://vercel.com/docs/agent-resources/vercel-mcp/tools/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fdecision-fallbacks&source_site=vercel-docs&relationship=related) — Vercel MCP tools for ai gateway.
- [experimental_decide](https://ai-sdk.dev/docs/reference/ai-sdk-core/decide?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fdecision-fallbacks&source_site=vercel-docs&relationship=related) — Decide answers to typed questions against shared state with a decision model.

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/decision-fallbacks.graph.md](/docs/ai-gateway/models-and-providers/decision-fallbacks.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodels-and-providers%2Fdecision-fallbacks&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** Decision fallbacks were previously called evaluation fallbacks. The
> `experimental_evaluate` export and `gateway.evaluationModel()` still work as
> deprecated aliases with the same request and response shapes. The
> TypeSafe-compatible API also still sends the deprecated
> `x-ai-gateway-evaluation-fallback-*` response headers.

## How decision fallbacks differ from failure fallbacks

The `models` array accepts two entry types with different triggers:

| Entry | Trigger | Behavior |
| --- | --- | --- |
| `"anthropic/claude-sonnet-5"` | The preceding model cannot execute successfully | Tries the string model as an execution-error fallback |
| `{ "model": "openai/gpt-6-astra", "when": condition }` | The primary decision succeeds and `condition` matches | Reruns the complete decision with the object entry's model |

A string entry can name a native decision model or a language model, with or without a conditional object in the request. A language model answers through structured output, and for a request with images it must also support vision.

The conditional object must be the first entry in `models`, and `models` can contain only one conditional object. You can add string execution-error fallbacks after it:

```json
{
  "gateway": {
    "models": [
      {
        "model": "openai/gpt-6-astra",
        "when": {
          "question": "intent",
          "confidenceBelow": 0.6
        }
      },
      "anthropic/claude-sonnet-5"
    ]
  }
}
```

AI Gateway supports one conditional object and one successful-response fallback stage in a request. String entries after the object remain available if the conditional model fails during execution.

If the primary model fails before returning answers, AI Gateway tries the conditional object's model under the execution-error fallback behavior. It cannot check `when` without a successful primary result.

## Configure a Choice or Score confidence fallback

Use `confidenceBelow` with a Choice or Score question. Choice and Score confidence measures the concentration of the answer's probability distribution. It is not the probability of a Boolean value.

The following example escalates an uncertain Choice answer to a language model:

#### AI SDK

```typescript filename="decide-with-fallback.ts" {1,20-32}
import { gateway, type GatewayProviderOptions } from '@ai-sdk/gateway';
import { experimental_decide as decide } from 'ai';

const questions = {
  intent: {
    type: 'choice',
    instructions: 'Which team should handle this support request?',
    criteria: {
      billing: 'Charges, invoices, and refunds',
      technical: 'Bugs and outages',
      account: 'Sign-in and account access',
    },
  },
} as const;

const result = await decide({
  model: gateway.decisionModel('typesafe-ai/jev'),
  state: 'I was charged twice and cannot sign in to request a refund.',
  questions,
  providerOptions: {
    gateway: {
      models: [
        {
          model: 'openai/gpt-6-astra',
          when: {
            question: 'intent',
            confidenceBelow: 0.6,
          },
        },
      ],
    } satisfies GatewayProviderOptions,
  },
});

console.log(result.answers);
console.log(result.response.modelId);
console.log(result.providerMetadata?.gateway);
```

#### HTTP API

#### TypeScript

```typescript filename="decide-with-fallback-rest.ts"
const response = await fetch('https://ai-gateway.vercel.sh/v1/evaluate', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'typesafe-ai/jev',
    state: 'I was charged twice and cannot sign in to request a refund.',
    questions: {
      intent: {
        type: 'choice',
        instructions: 'Which team should handle this support request?',
        criteria: {
          billing: 'Charges, invoices, and refunds',
          technical: 'Bugs and outages',
          account: 'Sign-in and account access',
        },
      },
    },
    providerOptions: {
      gateway: {
        models: [
          {
            model: 'openai/gpt-6-astra',
            when: { question: 'intent', confidenceBelow: 0.6 },
          },
        ],
      },
    },
  }),
});
if (!response.ok) throw new Error(await response.text());
console.log(await response.json());
```

#### Python

```python filename="decide-with-fallback-rest.py"
import json
import os
import urllib.request

body = {
    "model": "typesafe-ai/jev",
    "state": "I was charged twice and cannot sign in to request a refund.",
    "questions": {
        "intent": {
            "type": "choice",
            "instructions": "Which team should handle this support request?",
            "criteria": {
                "billing": "Charges, invoices, and refunds",
                "technical": "Bugs and outages",
                "account": "Sign-in and account access",
            },
        }
    },
    "providerOptions": {
        "gateway": {
            "models": [
                {
                    "model": "openai/gpt-6-astra",
                    "when": {"question": "intent", "confidenceBelow": 0.6},
                }
            ]
        }
    },
}

request = urllib.request.Request(
    "https://ai-gateway.vercel.sh/v1/evaluate",
    data=json.dumps(body).encode(),
    headers={
        "Authorization": "Bearer " + os.environ["AI_GATEWAY_API_KEY"],
        "Content-Type": "application/json",
    },
)
with urllib.request.urlopen(request) as response:
    print(json.load(response))
```

#### cURL

```bash filename="decide-with-fallback.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/evaluate \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "typesafe-ai/jev",
  "state": "I was charged twice and cannot sign in to request a refund.",
  "questions": {
    "intent": {
      "type": "choice",
      "instructions": "Which team should handle this support request?",
      "criteria": {
        "billing": "Charges, invoices, and refunds",
        "technical": "Bugs and outages",
        "account": "Sign-in and account access"
      }
    }
  },
  "providerOptions": {
    "gateway": {
      "models": [
        {
          "model": "openai/gpt-6-astra",
          "when": { "question": "intent", "confidenceBelow": 0.6 }
        }
      ]
    }
  }
}'
```

`confidenceBelow` also matches conservatively when the primary Choice or Score answer has no finite confidence value. AI Gateway records the trigger reason as `confidence_unavailable` instead of silently accepting an answer it cannot assess.

Only native decision models report confidence. A language-model fallback returns one structured value per question, so its Choice and Score answers have no `confidence`. See [Use the HTTP decision API](#use-the-http-decision-api).

## Configure a Boolean probability fallback

A Boolean answer contains `P(true)`, the probability that the answer is true. It does not contain Choice or Score confidence. Use the inclusive `probabilityBetween` range to identify an uncertain probability band:

#### AI SDK

```typescript filename="decide-with-probability-fallback.ts" {16-26}
import { gateway, type GatewayProviderOptions } from '@ai-sdk/gateway';
import { experimental_decide as decide } from 'ai';

const questions = {
  requestsRefund: {
    type: 'boolean',
    instructions: 'Does the customer ask for a refund?',
  },
} as const;

const result = await decide({
  model: gateway.decisionModel('typesafe-ai/jev'),
  state: 'I was charged twice and now the app will not load at all.',
  questions,
  providerOptions: {
    gateway: {
      models: [
        {
          model: 'openai/gpt-6-astra',
          when: {
            question: 'requestsRefund',
            probabilityBetween: [0.4, 0.6],
          },
        },
      ],
    } satisfies GatewayProviderOptions,
  },
});

console.log(result.answers.requestsRefund.probability);
```

#### cURL

```bash filename="decide-with-probability-fallback.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/evaluate \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "typesafe-ai/jev",
  "state": "I was charged twice and now the app will not load at all.",
  "questions": {
    "requestsRefund": {
      "type": "boolean",
      "instructions": "Does the customer ask for a refund?"
    }
  },
  "providerOptions": {
    "gateway": {
      "models": [
        {
          "model": "openai/gpt-6-astra",
          "when": {
            "question": "requestsRefund",
            "probabilityBetween": [0.4, 0.6]
          }
        }
      ]
    }
  }
}'
```

The condition matches when `P(true)` is greater than or equal to `0.4` and less than or equal to `0.6`. On the TypeSafe-compatible API, the equivalent question type is Noul and its answer field is `noul`.

Do not use `confidenceBelow` with a Boolean or Noul question. AI Gateway validates condition predicates against the declared question types before running the primary model.

## Check every question

Leave out `question` to check every question of the matching type. `{ confidenceBelow }` checks each Choice and Score answer, and `{ probabilityBetween }` checks each Boolean and Noul answer. The condition matches when some answer crosses the threshold, so one unsure answer is enough to fall back:

```json
{ "confidenceBelow": 0.6 }
```

## Combine conditions

A condition can be direct or combine other conditions:

| Form | Matches when |
| --- | --- |
| `{ question, confidenceBelow }` | The named Choice or Score confidence is below the threshold, or finite confidence is unavailable |
| `{ question, probabilityBetween }` | The named Boolean or Noul `P(true)` is inside the inclusive range |
| `{ confidenceBelow }` | Some Choice or Score confidence is below the threshold, or unavailable |
| `{ probabilityBetween }` | Some Boolean or Noul `P(true)` is inside the inclusive range |
| `{ any: conditions }` | At least one nested condition matches |
| `{ all: conditions }` | Every nested condition matches |
| `{ atLeast: { count, conditions } }` | At least `count` nested conditions match |

For example, use `any` to escalate when either signal is uncertain:

#### AI SDK

```typescript filename="decide-with-compound-fallback.ts" {24-37}
import { gateway, type GatewayProviderOptions } from '@ai-sdk/gateway';
import { experimental_decide as decide } from 'ai';

const questions = {
  intent: {
    type: 'choice',
    instructions: 'Which team should handle this support request?',
    criteria: {
      billing: 'Charges, invoices, and refunds',
      technical: 'Bugs and outages',
    },
  },
  requestsRefund: {
    type: 'boolean',
    instructions: 'Does the customer ask for a refund?',
  },
} as const;

const result = await decide({
  model: gateway.decisionModel('typesafe-ai/jev'),
  state: 'I was charged twice and now the app will not load at all.',
  questions,
  providerOptions: {
    gateway: {
      models: [
        {
          model: 'openai/gpt-6-astra',
          when: {
            any: [
              { question: 'intent', confidenceBelow: 0.6 },
              { question: 'requestsRefund', probabilityBetween: [0.4, 0.6] },
            ],
          },
        },
        'anthropic/claude-sonnet-5',
      ],
    } satisfies GatewayProviderOptions,
  },
});
```

#### cURL

```bash filename="decide-with-compound-fallback.sh"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/evaluate \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "typesafe-ai/jev",
  "state": "I was charged twice and now the app will not load at all.",
  "questions": {
    "intent": {
      "type": "choice",
      "instructions": "Which team should handle this support request?",
      "criteria": {
        "billing": "Charges, invoices, and refunds",
        "technical": "Bugs and outages"
      }
    },
    "requestsRefund": {
      "type": "boolean",
      "instructions": "Does the customer ask for a refund?"
    }
  },
  "providerOptions": {
    "gateway": {
      "models": [
        {
          "model": "openai/gpt-6-astra",
          "when": {
            "any": [
              { "question": "intent", "confidenceBelow": 0.6 },
              { "question": "requestsRefund", "probabilityBetween": [0.4, 0.6] }
            ]
          }
        },
        "anthropic/claude-sonnet-5"
      ]
    }
  }
}'
```

The trailing `anthropic/claude-sonnet-5` string is an execution-error fallback. It runs only if `openai/gpt-6-astra` fails after the condition matched, or if both the primary and the conditional model fail to execute.

Use `all` to require both signals. This is the `when` value only:

```json
{
  "all": [
    { "question": "intent", "confidenceBelow": 0.6 },
    { "question": "severity", "confidenceBelow": 0.7 }
  ]
}
```

The following policy requires two of three conditions to match:

```json
{
  "model": "openai/gpt-6-astra",
  "when": {
    "atLeast": {
      "count": 2,
      "conditions": [
        { "question": "intent", "confidenceBelow": 0.6 },
        { "question": "severity", "confidenceBelow": 0.7 },
        {
          "question": "requestsRefund",
          "probabilityBetween": [0.4, 0.6]
        }
      ]
    }
  }
}
```

AI Gateway applies these structural rules:

- The conditional object must be the first `models` entry, and `models` can contain only one conditional object.
- The conditional object's `model` cannot be the primary model, including the primary model's fast-mode or base-tier counterpart.
- A `question` value, when present, must be 1 to 256 characters and name a question in the decision request.
- `confidenceBelow` and both `probabilityBetween` bounds must be finite numbers from `0` through `1`.
- The `probabilityBetween` lower bound cannot exceed its upper bound.
- `any`, `all`, and `atLeast.conditions` must each contain 1 to 20 conditions.
- `atLeast.count` must be an integer from `1` through the number of nested conditions.
- Conditions can nest at most 5 levels deep.
- Only decision requests accept a conditional object. Other request types that include one in `models` are rejected.

A request that breaks any of these rules returns a `400` validation error before AI Gateway runs the primary decision.

Compound conditions short-circuit after AI Gateway can determine their result. A missing or non-finite confidence counts as a conservative match inside `any`, `all`, and `atLeast`.

## How a matched fallback executes

Before any billable primary work, AI Gateway validates the condition structure and the question IDs and types it references, then checks that the conditional model exists and passes your [routing rules](/docs/ai-gateway/models-and-providers/routing-rules). A language-model fallback also gets a full routing check of the providers that can serve it. It then executes the policy as follows:

1. AI Gateway runs the primary decision with the original `state` and every original question.
2. AI Gateway checks `when` against the primary answers.
3. If `when` does not match, AI Gateway returns the primary result unchanged.
4. If `when` matches, AI Gateway reruns the original `state` and every original question with the conditional model.
5. AI Gateway returns the complete fallback result without merging answers from the two stages.

AI Gateway does not check the condition again against the fallback result, so a request runs at most two successful decision stages.

The check that each primary answer has the shape the condition needs runs after the billed primary stage. If the provider returns a malformed answer, such as a missing answer, an answer of the wrong type, or a non-finite probability, the request fails with a `500` status. `/v1/evaluate` returns an `internal_server_error` error, the TypeSafe-compatible API returns an `internal_error` error, and the AI SDK throws a `GatewayInternalServerError`. The primary stage is still billed.

If the condition matches and the fallback stage fails, including any string fallbacks listed after the conditional object, the request fails with the fallback's error. AI Gateway does not return the primary result in that case, and the primary stage is still billed.

The final response identifies the model that produced the returned answers. In the AI SDK, read `result.response.modelId`. `/v1/evaluate` returns the final model in its top-level `model` field. The TypeSafe-compatible API's top-level `model` echoes the model ID you requested when the primary answered, and names the fallback model whenever a fallback answered.

### Read why the fallback ran

When a condition matches, the fallback attempt in `routing.modelAttempts` carries `triggeredBy`, a list of `{ question, reason }` entries for the direct conditions that matched. In the AI SDK, read it from `result.providerMetadata?.gateway?.routing`. `/v1/evaluate` returns it under `providerMetadata.gateway.routing`, and the TypeSafe-compatible API under `provider_metadata.gateway.routing`.

| `reason` | Meaning |
| --- | --- |
| `confidence_below` | The Choice or Score answer's confidence was below `confidenceBelow` |
| `confidence_unavailable` | The Choice or Score answer had no finite confidence, so `confidenceBelow` matched conservatively |
| `probability_between` | The Boolean or Noul `P(true)` was inside the `probabilityBetween` range |
| `refused` | The model refused to answer the question |

A refused question, an answer with `type: 'refusal'`, matches any direct condition that covers it, so the fallback model can answer instead.

When the condition doesn't match, the conditional model doesn't appear in `modelAttempts`.

## Configure provider options for the fallback

Provider-specific options stay at the top level of `providerOptions`. They carry to every stage, and only a matching provider reads its namespace. AI Gateway routing fields remain inside `providerOptions.gateway`.

This direct language-model fallback requests high OpenAI reasoning effort:

```typescript filename="decide-with-reasoning-fallback.ts" {16-28}
import { gateway, type GatewayProviderOptions } from '@ai-sdk/gateway';
import { experimental_decide as decide } from 'ai';

const questions = {
  quality: {
    type: 'score',
    instructions: 'Rate the response quality.',
    criteria: ['incorrect', 'partially correct', 'fully correct'],
  },
} as const;

const result = await decide({
  model: gateway.decisionModel('typesafe-ai/jev'),
  state: 'The response to rate.',
  questions,
  providerOptions: {
    gateway: {
      models: [
        {
          model: 'openai/gpt-6-astra',
          when: { question: 'quality', confidenceBelow: 0.7 },
        },
      ],
    } satisfies GatewayProviderOptions,
    openai: {
      reasoningEffort: 'high',
    },
  },
});
```

The conditional model object currently does not accept nested `providerOptions`. Use top-level provider options for a direct model.

## Use the HTTP decision API

`POST /v1/evaluate` accepts the same conditional `providerOptions.gateway.models` object as AI SDK `decide`. The **HTTP API** and **cURL** tabs above show complete requests. Provider-specific options such as `openai.reasoningEffort` go at the top level of `providerOptions`, next to `gateway`.

Native decision results preserve Choice and Score confidence and probability distributions when the provider returns them. A language-model fallback doesn't produce `confidence`: it returns one structured value per question, with no probability distribution to measure concentration from. `/v1/evaluate` omits `confidence` and `probabilities` from those Choice and Score answers. Boolean answers continue to return their final `probability`.

## Use the TypeSafe-compatible API

`POST /typesafe/v1/systemone` accepts the same AI Gateway extension. The official TypeSafe SDK currently forwards `providerOptions` at runtime but does not include the field in its static request type. Supply it through an intermediate request object:

```typescript filename="typesafe-decision-fallback.ts" {21-30}
import { TypeSafeClient } from '@typesafe-ai/sdk';

const client = new TypeSafeClient({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/typesafe',
});

const request = {
  model: 'typesafe-ai/jev',
  state: 'I was charged twice and cannot sign in.',
  questions: {
    intent: {
      type: 'choice' as const,
      instructions: 'Which team should handle this?',
      criteria: {
        billing: 'Charges and refunds',
        account: 'Sign-in and account access',
      },
    },
  },
  providerOptions: {
    gateway: {
      models: [
        {
          model: 'openai/gpt-6-astra',
          when: { question: 'intent', confidenceBelow: 0.6 },
        },
      ],
    },
  },
};

const result = await client.systemOne(request);
```

The TypeSafe-compatible response must satisfy TypeSafe's required fields. When a language model produces the final Choice or Score answer, AI Gateway returns `confidence: 0` and `probabilities: {}` as unavailable sentinels. This response also shows `confidence_unavailable` after the primary result omitted finite confidence:

```json filename="TypeSafe-compatible fallback response"
{
  "model": "openai/gpt-6-astra",
  "answers": {
    "intent": {
      "type": "choice",
      "choice": "billing",
      "confidence": 0,
      "probabilities": {}
    }
  },
  "usage": {
    "input_tokens": 641,
    "output_tokens": 57
  },
  "provider_metadata": {
    "gateway": {
      "generationId": "gen_fallback",
      "routing": {
        "originalModelId": "typesafe-ai/jev",
        "canonicalSlug": "openai/gpt-6-astra",
        "finalProvider": "openai",
        "modelAttempts": [
          {
            "canonicalSlug": "typesafe-ai/jev",
            "success": true,
            "generationId": "gen_primary",
            "usage": { "inputTokens": 347, "outputTokens": 38 }
          },
          {
            "canonicalSlug": "openai/gpt-6-astra",
            "success": true,
            "triggeredBy": [
              { "question": "intent", "reason": "confidence_unavailable" }
            ],
            "generationId": "gen_fallback",
            "usage": { "inputTokens": 294, "outputTokens": 19 }
          }
        ]
      }
    }
  }
}
```

On this surface, `confidence: 0` and `probabilities: {}` mean the values are unavailable. They do not mean the fallback measured zero confidence. Native decision-model fallbacks preserve their native confidence and distributions.

Noul answers do not use the sentinel because Noul has no separate confidence or probability map. AI Gateway returns the fallback model's final `noul` value as `P(true)`.

The top-level `model` names the model that produced the returned answers. It echoes the model ID you requested when the primary answered, and names the fallback model whenever a fallback answered, whether a condition or an execution error started it. The requested ID is a TypeSafe ID such as `jev-latest`, while a fallback is named by its AI Gateway slug such as `openai/gpt-5-nano`. To read one namespace in every case, use `provider_metadata.gateway.routing.canonicalSlug`, which is always an AI Gateway slug. When a condition matched, the `x-ai-gateway-decision-fallback-final-model` header carries the same value. `routing.modelAttempts` lists every model AI Gateway tried, in order. The attempt your condition started carries `triggeredBy`, with the questions and reasons that matched. When the condition doesn't match, the conditional model doesn't appear in `modelAttempts`, the same way an unused error fallback doesn't.

### Detect a fallback from response headers

When a condition matches, the TypeSafe-compatible API also reports the fallback in response headers. Use them when your client only reads TypeSafe's typed response fields and ignores `provider_metadata`:

| Header | Value |
| --- | --- |
| `x-ai-gateway-decision-fallback-triggered` | `true` |
| `x-ai-gateway-decision-fallback-final-model` | The model that produced the returned answers |
| `x-ai-gateway-decision-fallback-primary-model` | The primary model whose answers matched the condition |
| `x-ai-gateway-decision-fallback-triggering-questions` | A percent-encoded JSON array of the question IDs that matched |
| `x-ai-gateway-decision-fallback-triggering-questions-truncated` | `true` when the question list was cut short |

AI Gateway sets these headers only on responses where the condition matched. When the encoded question list would exceed 2,048 characters, it carries the questions that fit and AI Gateway adds `x-ai-gateway-decision-fallback-triggering-questions-truncated: true`. `provider_metadata.gateway.routing` always has the full list. AI Gateway lists these headers in `Access-Control-Expose-Headers`, so browser clients can read them. Decode the question list with `decodeURIComponent`, then `JSON.parse`:

```typescript filename="detect-typesafe-fallback.ts"
const response = await fetch(
  'https://ai-gateway.vercel.sh/typesafe/v1/systemone',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  },
);

if (
  response.headers.get('x-ai-gateway-decision-fallback-triggered') === 'true'
) {
  const finalModel = response.headers.get(
    'x-ai-gateway-decision-fallback-final-model',
  );
  const primaryModel = response.headers.get(
    'x-ai-gateway-decision-fallback-primary-model',
  );
  const triggeringQuestions: string[] = JSON.parse(
    decodeURIComponent(
      response.headers.get(
        'x-ai-gateway-decision-fallback-triggering-questions',
      ) ?? '[]',
    ),
  );
  console.log({ finalModel, primaryModel, triggeringQuestions });
}
```

AI Gateway also sends the deprecated `x-ai-gateway-evaluation-fallback-*` headers with identical values. Read the `x-ai-gateway-decision-fallback-*` headers in new code.

## Account for two-stage usage and latency

A triggered fallback executes and bills both the primary and fallback stages. The top-level usage and cost total both calls, and the top-level `generationId` identifies the generation that was returned. Each successful attempt in `routing.modelAttempts` carries its own `generationId`, `usage`, and cost, so you can attribute spend to each call.

The stages run sequentially, so a triggered request includes the latency of both model calls.

If the condition matches and the fallback stage fails, the request fails with the fallback's error and does not return the primary result. The primary stage is still billed.

Choose thresholds from your own results and risk tolerance. Start by recording the confidence or Boolean probability ranges associated with incorrect primary answers, then set the narrowest threshold that catches the errors worth paying the second-stage cost and latency to reassess.

## Related

- [Decision](/docs/ai-gateway/modalities/decision)
- [Model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks)
- [Provider options](/docs/ai-gateway/models-and-providers/provider-options)
- [OpenAI-Compatible Decisions API](/docs/ai-gateway/sdks-and-apis/openai-decisions)
- [TypeSafe-compatible API](/docs/ai-gateway/sdks-and-apis/typesafe)


---

[View full sitemap](/docs/sitemap)
