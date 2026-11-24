---
title: Custom Routing Reference
product: vercel
url: /docs/ai-gateway/models-and-providers/custom-routing/reference
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/custom-routing/reference"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers/custom-routing
  - /docs/ai-gateway/models-and-providers
related:
  - /docs/ai-gateway/models-and-providers/automatic-caching
  - /docs/ai-gateway/models-and-providers/batch-processing
  - /docs/ai-gateway/models-and-providers/custom-routing
  - /docs/ai-gateway/models-and-providers/virtual-models
  - /docs/ai-gateway/models-and-providers/routing-rules
summary: Look up AI Gateway Custom Routing member types, selectors, session affinity, decision traces, limits, and permissions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/models-and-providers/custom-routing/reference.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "6a635c9cfe8bc91c2d25809e1b878741e58efcc0db783ff0749d8f437b8cc016"
---

# Custom Routing Reference

A Custom Router resolves `router/<slug>` to the models and providers that can serve a request, orders them with a selector, and tries them in that order until one succeeds. Use this reference to look up member types, selectors, limits, and what a router's decision trace means.

## Members

A router has a permanent slug and an ordered list of members. Each member is one of these types:

| Member type | Format | Behavior |
| --- | --- | --- |
| Model | `creator/model-name` | Adds the model. |
| Virtual model | `vmc/<slug>` | Adds the virtual model's target model with its routing and policy settings. |
| Router | `router/<slug>` | Adds the nested router's members at its position in the list. |

When the top-level router has a selector, it ranks every model together, including the models of nested routers. When it uses declared order, each nested router orders its own members with its own selector, at the nested router's position.

If a model appears more than once, AI Gateway keeps its first occurrence.

An authenticated `GET https://ai-gateway.vercel.sh/v1/models` request lists your team's active routers alongside models, with `type` set to `router`.

## Selectors

The selector decides the order AI Gateway tries a router's candidates in. A candidate is one model on one provider. If an attempt fails, AI Gateway moves on to the next candidate, up to 50 attempts.

| Selector | Value | Tries first |
| --- | --- | --- |
| **Declared Order** | `declared` | Members in the order you listed them. |
| **Cost** | `cost` | The candidate with the lowest estimated cost. |
| **Time to First Token (TTFT)** | `ttft` | The candidate with the fastest recent time to first token. |
| **Tokens per Second (TPS)** | `tps` | The candidate with the highest recent output speed. |

The value is what the [decision trace](#decision-trace) reports.

### Selectors by model type

All members of a router share one model type, and the type decides which selectors the router can use. Creating or updating a router that mixes model types, or that uses a selector its type doesn't support, returns `400`.

| Model type | Supported selectors |
| --- | --- |
| Text | Declared order, cost, TTFT, and TPS |
| Embedding | Declared order and cost |
| Evaluation and decision | Declared order and cost |
| Image, video, speech, transcription, and reranking | Declared order |

### Cost

The cost selector estimates what each candidate would charge for the request and tries the cheapest first. The estimate combines the provider's prices with the size of the request and how similar requests typically use prompt caching and output tokens.

> **💡 Note:** The cost score is an estimate, not a price guarantee. The amount you're
> billed depends on the actual response.

### TTFT and TPS

The TTFT and TPS selectors rank candidates by recent median measurements for each provider, adjusted for its recent error rate. Candidates without enough measurements run after measured ones, and occasionally first so they can collect data.

## Session affinity

Session affinity keeps a conversation on the provider that already holds its prompt cache, which is usually faster and cheaper than starting with a cold cache. It's on by default for router requests, and a warm session takes precedence over the selector:

- On a TTFT or TPS router, the provider that served the session goes first unless it's down.
- On a cost router, the selector counts the session's cached prompt as a discount, so the session stays on its provider unless another candidate is still cheaper.

AI Gateway identifies sessions automatically. To group requests reliably, pass a stable session ID with the `sessionId` provider option or the `x-session-id` header:

```typescript
import { streamText } from 'ai';

const result = streamText({
  model: 'router/production-chat',
  prompt: 'Continue the conversation',
  providerOptions: {
    gateway: {
      sessionId: 'conversation_123',
    },
  },
});
```

Set the `sessionAffinity` provider option to `false` to turn session affinity off for a request. See [Automatic caching](/docs/ai-gateway/models-and-providers/automatic-caching) for more on prompt caching.

## Request options

Most request options work the same way on a router as on a model. These behave differently:

| Request option | On a router request |
| --- | --- |
| Provider order (`order`) | Ignored. The router decides the order. |
| Model fallbacks (`models`) | Returns `400`. Add fallback models as router members instead. |
| Provider restriction (`only`) | Narrows each candidate's providers before the selector runs. If the router or a virtual model member restricts its own providers, that list replaces the request's. |
| Compliance (`zeroDataRetention`, `disallowPromptTraining`) | Applies when the request, the router, any member, or your team requires it. |

## Policies and nesting

A router's constraints apply to every member it contains, including nested virtual models and routers. A nested member can tighten them but can't relax them:

- Required capabilities combine, so a candidate must support all of them.
- Zero data retention and prompt training restrictions apply when any level requires them.
- Provider restrictions intersect. A member whose allowed providers don't overlap with the router's is left out.

Team policies, such as model and provider allowlists and routing rules, apply to every candidate. Nesting a less restrictive virtual model or router doesn't bypass them.

## Decision trace

AI Gateway returns the router's decision at `providerMetadata.gateway.router` in AI SDK responses, and at `provider_metadata.gateway.router` in the compatible REST APIs. The request details in the AI Gateway dashboard's logs show the same decision under **Routing Decision**.

The following example trace shows the candidates in the order the router would try them, and the members it left out:

```json
{
  "gateway": {
    "router": {
      "slug": "production-chat",
      "selector": "cost",
      "candidates": [
        {
          "model": "openai/gpt-6-astra",
          "provider": "openai",
          "reason": "ranked"
        },
        {
          "model": "anthropic/claude-sonnet-5",
          "provider": "anthropic",
          "reason": "ranked"
        }
      ],
      "dropped": [
        {
          "member": "router/archived-fallback",
          "reason": "is not active"
        }
      ]
    }
  }
}
```

| Field | Meaning |
| --- | --- |
| `slug` | The router that handled the request. |
| `selector` | `cost`, `ttft`, `tps`, or `declared`. |
| `candidates` | The planned attempt order, with a `reason` for each candidate. The list can include candidates that never ran. `routing.modelAttempts` in the same metadata shows what actually ran. |
| `dropped` | Members and providers the router left out, with a plain-language `reason`. Omitted when the router left nothing out. |

Each candidate's `reason` is one of these values:

| Reason | Meaning |
| --- | --- |
| `ranked` | Placed by the selector. |
| `declared` | Placed in declared order. |
| `session-pin` | The session's warm prompt cache is on this provider. |
| `near-best-sample` | Picked from TTFT or TPS candidates that scored close to the best. |
| `exploration` | Tried first so AI Gateway can collect measurements for it. |
| `rate-limit-shed` | The provider was returning `429` errors, so it moved to the back. |
| `down` | The provider is down. |
| `no-data` | The provider doesn't have enough measurements to rank. |
| `zero-success` | The provider is failing every recent request. |
| `unpriced` | The provider has no pricing for this model. |
| `metrics-unavailable` | Speed measurements weren't available, so the router kept declared order. |

### When no member can serve a request

If no candidate can serve the request, AI Gateway returns `400` before it tries any provider. The message lists each dropped member with its reason:

```json
{
  "error": {
    "message": "Routing rule configuration error: Router \"production-chat\" has no candidate that can serve this request: router/archived-fallback (is not active); openai/gpt-6-astra (lacks the required capabilities (vision))",
    "type": "invalid_request_error"
  }
}
```

## Limits and validation

| Limit | Value | Behavior |
| --- | --- | --- |
| Members per router | 1 to 50 | AI Gateway rejects an empty router or one with more than 50 members. |
| Member model types | One per router | AI Gateway rejects members of different model types. Evaluation and decision models count as one type. |
| Request types | HTTP requests | [Batch jobs](/docs/ai-gateway/models-and-providers/batch-processing) return `400` for a router model ID, and WebSocket connections don't support routers. |
| Routers per team | 50 | Active and archived routers both count. |
| Nesting depth | Five router levels | AI Gateway rejects a deeper router. |
| Slug | 1 to 64 characters | Lowercase letters, numbers, or hyphens, starting and ending with a letter or number. The slug can't change after creation. |

Routers can't contain cycles, and every `vmc/<slug>` or `router/<slug>` member must exist and be active.

## Permissions and lifecycle

Any member of your team can call an active router. Only team **Owners** and **Members** can create routers, and only the router's creator and team **Owners** can edit, archive, or restore it.

Archiving a router stops it from serving requests. Requests to an archived router return `404` until you restore it, and archived routers count toward your team's 50-router limit. You can't delete a router, so archive a router you no longer need.

## Related

- [Create and use a Custom Router](/docs/ai-gateway/models-and-providers/custom-routing)
- [Virtual Models](/docs/ai-gateway/models-and-providers/virtual-models)
- [AI Gateway routing rules](/docs/ai-gateway/models-and-providers/routing-rules)
- [Automatic caching](/docs/ai-gateway/models-and-providers/automatic-caching)

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
