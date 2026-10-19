---
title: AI Gateway Session Affinity
product: vercel
url: /docs/ai-gateway/models-and-providers/session-affinity
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/session-affinity"
last_updated: 2026-10-13
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/automatic-caching
  - /docs/ai-gateway/models-and-providers/model-fallbacks
summary: Keep AI Gateway conversations on the provider that holds their prompt cache, using session IDs, fingerprinting, and pin lifetimes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/session-affinity.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a4687d0ceb4e970e2fdf6a43ebe575d1787377539eafa0631aa7e5aa063374d7"
---

# AI Gateway Session Affinity

A provider's prompt cache lives on the provider account that served your request. When the next request in a conversation goes somewhere else, that cache is cold and you pay full price for the prompt again.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway logs now show session affinity](https://vercel.com/changelog/ai-gateway-logs-now-show-session-affinity)
- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway) — Learn how to use the AI Gateway provider with the AI SDK.
- [AI Gateway Regional Inference](https://vercel.com/docs/ai-gateway/security-and-compliance/regional-inference) — Route AI Gateway inference to the region you choose and control where providers store data, for data residency and compl
- [OpenAI Chat Completions Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced) — Configure provider options, model fallbacks, BYOK credentials, and prompt caching through AI Gateway.
- [AI Gateway Provider Routing and Fallbacks](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options) — Configure provider routing, ordering, and fallback behavior in Vercel AI Gateway.
- [AI Gateway Provider Timeouts](https://vercel.com/docs/ai-gateway/models-and-providers/provider-timeouts) — Configure AI Gateway timeouts for BYOK providers. Fail over to the next provider when a request takes too long to start

Full cross-link map for this page: [/docs/ai-gateway/models-and-providers/session-affinity.graph.md](/docs/ai-gateway/models-and-providers/session-affinity.graph.md)
<!-- /docsgraph:related -->

Session affinity keeps a conversation on the provider that already holds its cache. AI Gateway groups related requests into a session, remembers which provider served the session's last request, and tries that provider first on the next one. Session affinity is on by default for text and chat requests, so existing traffic benefits without code changes. For the most reliable results, [send a session ID](#identify-a-session).

Session affinity doesn't apply to other request types, such as embeddings, images, or realtime sessions. They have no prompt cache to keep warm.

Session affinity also improves cache hits upstream. AI Gateway forwards the `x-session-affinity` header to the provider, which can route the request to the same inference cluster. See [Improve cache hits with session affinity](/docs/ai-gateway/models-and-providers/automatic-caching#improve-cache-hits-with-session-affinity).

## How it works

1. **Identify the session.** AI Gateway reads a [session ID](#identify-a-session) from the request. If you don't send one, AI Gateway [fingerprints the conversation](#fingerprint-requests-without-a-session-id).
2. **Pin the provider.** When a provider accepts a request, AI Gateway saves that provider as the session's pin for the model that served the request. For session IDs you send and for Claude Code sessions, the pin also names the exact credential, because each account keeps its own cache.
3. **Promote the pin.** On the next request in the session, AI Gateway moves the pinned provider to the front of the providers it already planned to try. It never adds a provider that your routing settings exclude.
4. **Renew or expire.** Each successful request renews the pin. A pin expires shortly before the provider's cache does. See [Pin lifetime](#pin-lifetime).

If the pinned provider fails, AI Gateway tries the next provider as usual. A request that fails after the provider accepted it removes that pin, so the next request can choose again.

## Interaction with your routing settings

Session affinity runs after AI Gateway applies your filters, so it only reorders providers you already allow.

| Setting                                         | Behavior with session affinity                                                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `only` and compliance settings, such as zero data retention | Filters apply first. AI Gateway ignores a pinned provider that the filters removed.                                                        |
| `order`                                         | The pinned provider goes first, ahead of your order. Set `sessionAffinity: false` to keep your order exactly.                              |
| `sort`                                          | The pinned provider goes ahead of the sort winner. A warm cache usually lowers latency and cost, which is what sorting aims for.           |
| Provider health                                 | AI Gateway never promotes a provider that it treats as down.                                                                               |
| BYOK credentials                                | A pin reorders only within its own group. It never moves a system credential ahead of your BYOK credentials, or the reverse.               |

## Identify a session

Send a session ID that stays the same for every request in a conversation, agent run, or workflow. Use an opaque value of up to 256 characters. AI Gateway hashes longer values, so grouping stays stable. Don't include personal data, and don't reuse one ID across unrelated work.

AI Gateway checks these sources in order and uses the first one it finds:

| Priority | Source                           | How to set it                                                                                                                                                                                  |
| -------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1        | `sessionId` provider option      | `providerOptions.gateway.sessionId`. On Chat Completions, OpenAI Responses, and Anthropic Messages, the top-level `session_id` body field sets the same option. The provider option wins.       |
| 2        | `x-session-id` header            | Send it as an HTTP header, or with the AI SDK `headers` option.                                                                                                                                |
| 3        | `x-session-affinity` header      | Same as `x-session-id`.                                                                                                                                                                        |
| 4        | `prompt_cache_key`               | The OpenAI request field. See the note below.                                                                                                                                                  |
| 5        | `x-claude-code-session-id` header | Claude Code sends it automatically.                                                                                                                                                            |
| 6        | Conversation fingerprint         | AI Gateway derives it from the request. See [Fingerprint requests without a session ID](#fingerprint-requests-without-a-session-id).                                                           |

Many callers share one `prompt_cache_key` across users, for example one key per prompt template. AI Gateway treats it as a label for a shared prefix instead of one conversation. It pins only the provider, not the credential, so shared traffic doesn't pile onto a single account.

AI Gateway also forwards the `x-session-id` and `x-session-affinity` headers to the provider it selects, so providers that use them for their own cache routing can.

#### Send a session ID with the AI SDK

Set `sessionId` in `providerOptions.gateway` on each call:

```typescript filename="session-id.ts"
import { streamText } from 'ai';

const result = streamText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Hello world',
  providerOptions: {
    gateway: {
      sessionId: 'sess_8f3KQ2vXr9mT',
    },
  },
});
```

#### Send a session ID with compatibility APIs

AI Gateway reads `x-session-id` and `x-session-affinity` through its OpenAI-compatible, Anthropic-compatible, and OpenResponses API formats. Set the header as a default SDK client header or include it in each HTTP request:

#### Chat Completions

```typescript filename="chat-completions.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
  defaultHeaders: {
    'x-session-id': 'sess_8f3KQ2vXr9mT',
  },
});

const response = await openai.chat.completions.create({
  model: 'deepseek/deepseek-v4-flash-0731',
  messages: [{ role: 'user', content: 'Hello world' }],
});
```

#### OpenAI Responses

```typescript filename="responses.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
  defaultHeaders: {
    'x-session-id': 'sess_8f3KQ2vXr9mT',
  },
});

const response = await openai.responses.create({
  model: 'deepseek/deepseek-v4-flash-0731',
  input: 'Hello world',
});
```

#### Anthropic Messages

```typescript filename="messages.ts"
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
  defaultHeaders: {
    'x-session-id': 'sess_8f3KQ2vXr9mT',
  },
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-sonnet-5',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello world' }],
});
```

#### OpenResponses

```typescript filename="openresponses.ts"
const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
    'x-session-id': 'sess_8f3KQ2vXr9mT',
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-v4-flash-0731',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'Hello world',
      },
    ],
  }),
});
```

## Fingerprint requests without a session ID

When a request has no session ID, AI Gateway derives one from the conversation itself. Every request in a conversation repeats the same opening, so the opening identifies the conversation.

AI Gateway hashes these parts of the request with SHA-256, together with your team ID:

- The first system or developer message.
- The first message that isn't a system or developer message.
- The set of tools, including each tool's name, description, and schema.

The hash works like this:

- **Text only.** AI Gateway uses at most the first 4,096 characters of each message.
- **Stable across turns.** Later turns, tool results, and new user messages don't change the fingerprint, so a conversation stays in one session.
- **Independent of tool order.** A client that lists the same tools in a different order gets the same fingerprint.
- **Private to your team.** The team ID is part of the hash, so two teams that run the same agent never share a session ID. AI Gateway keeps only the hash as the session ID.

Two conversations that open with the same system prompt, tools, and first user message share a fingerprint. A script that starts every run with a templated message such as "Begin the task." does this. When you run many similar conversations, send a session ID instead.

Fingerprinted sessions pin only the provider, not the credential, because unrelated users can share the same opening. AI Gateway pins a fingerprinted session only for models that support prompt caching, and only when the prompt is large enough to cache. See [Minimum prompt size](#minimum-prompt-size).

There is no separate option for fingerprinting. Sending a session ID replaces the fingerprint.

## Keep caches warm across models

A prompt cache belongs to one model on one provider, so a session can hold several warm caches at once. AI Gateway keeps one pin per model in a session, for up to eight models.

- **Switching models.** When your client moves to another model mid-session, such as from `anthropic/claude-opus-5` to `anthropic/claude-sonnet-5`, AI Gateway pins the new model and keeps the pin for the old one. If you switch back before the old pin expires, the request goes to the provider that still holds that model's cache.
- **Model fallbacks.** When a request falls back to another model with [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks), AI Gateway pins the model that served the request and keeps the other pins. If the fallback model already has a pin in the session, AI Gateway tries that provider first. A failed request removes only the pin for the model that failed.
- **One session across models.** Use the same session ID for every model in a workflow, so all of their pins belong to one session.

AI Gateway can't move a cache from one model to another. The first request to a model you haven't used in the session writes a new cache at the cache-write rate. See [Cost tradeoff](/docs/ai-gateway/models-and-providers/automatic-caching#cost-tradeoff).

## Pin lifetime

A pin lasts as long as the provider keeps its cache. AI Gateway starts from a default lifetime for each provider, then subtracts 15 seconds so a pin never outlives the cache. Each successful request renews the pin.

| Provider                                                                                                         | Default pin lifetime |
| ---------------------------------------------------------------------------------------------------------------- | -------------------- |
| OpenAI and Azure                                                                                                 | 10 minutes           |
| DeepSeek                                                                                                         | 1 hour               |
| All other providers, including Anthropic, Amazon Bedrock, Google, Google Vertex AI, Alibaba, and Moonshot AI     | 5 minutes            |

When your request asks for a longer cache lifetime, the pin follows it:

- **Anthropic models:** a 1-hour cache lifetime, set with `cacheControl.ttl: '1h'` in the AI SDK, `cache_control.ttl: '1h'` on Anthropic Messages, or `cache_ttl: '1h'` with [`caching: 'auto'`](/docs/ai-gateway/models-and-providers/automatic-caching#cache-lifetime).
- **OpenAI and Azure models:** `promptCacheRetention: '24h'` in the AI SDK, or `prompt_cache_retention: '24h'` on OpenAI APIs.

A pin never lasts longer than 1 hour, even when the cache does. This keeps routing flexible when you set a 24-hour retention.

## Minimum prompt size

Providers only cache prompts above a minimum length. For sessions that AI Gateway identifies itself, from the Claude Code header or a fingerprint, AI Gateway skips pinning when the prompt is below that minimum. It follows each provider's documented minimum, for example 1,024 tokens for most OpenAI and Google models, and uses 256 tokens when a model has no documented minimum. Anthropic minimums vary by model. See [Anthropic prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching).

AI Gateway applies this check to those sessions only. It pins explicit session IDs, including `prompt_cache_key`, at any prompt size, because your ID says the prefix matters.

## Opt out

Set `sessionAffinity` to `false` in `providerOptions.gateway` to stop AI Gateway from pinning and promoting providers for a request. The default is `true`.

#### AI SDK

```typescript filename="opt-out.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-5',
  prompt: 'Hello world',
  providerOptions: {
    gateway: {
      sessionAffinity: false,
    },
  },
});
```

#### Chat Completions

```typescript filename="opt-out-chat.ts"
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await openai.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [{ role: 'user', content: 'Hello world' }],
  // AI Gateway extension fields are not included in the upstream SDK types.
  ...{
    providerOptions: {
      gateway: {
        sessionAffinity: false,
      },
    },
  },
});
```

The request can still carry a session ID, but AI Gateway doesn't write pins or reorder providers for it. The response reports the outcome `skipped_mode_off`.

## Read session details from responses

AI Gateway reports the session and what it did in `providerMetadata.gateway.routing` in the AI SDK, or in `provider_metadata.gateway.routing` on Chat Completions, OpenAI Responses, and Anthropic Messages responses.

| Field                        | Description                                                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clientSessionId`            | The session ID AI Gateway used.                                                                                                                                      |
| `clientSessionIdSource`      | `explicit` for IDs you send, including `prompt_cache_key`. `agent` for the Claude Code header. `fingerprint` for IDs AI Gateway derived.                              |
| `affinity.outcome`           | What session affinity did for this request. See the outcomes below.                                                                                                  |
| `affinity.pinnedProvider`    | The provider the session's pin named.                                                                                                                                |
| `affinity.displacedProvider` | The provider AI Gateway would have tried first without the pin. It appears only when the pin moved a different provider to the front.                                |

```json
{
  "provider_metadata": {
    "gateway": {
      "routing": {
        "clientSessionId": "sess_8f3KQ2vXr9mT",
        "clientSessionIdSource": "explicit",
        "affinity": {
          "outcome": "promoted",
          "pinnedProvider": "anthropic",
          "displacedProvider": "bedrock"
        }
      }
    }
  }
}
```

The `affinity.outcome` field has one of these values. AI Gateway can add values over time, so handle unknown values as "no change".

| Outcome                    | Meaning                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `promoted`                 | AI Gateway moved the pinned provider ahead of the provider it would have tried first.    |
| `confirmed`                | The pinned provider already came first, so nothing moved.                                |
| `no_pin`                   | The session has no pin for this model yet.                                               |
| `pin_expired`              | The session had a pin for this model, but it expired. The provider's cache is likely cold. |
| `skipped_not_in_plan`      | Your routing settings removed the pinned provider from this request.                     |
| `skipped_health_down`      | The pinned provider is unhealthy, so AI Gateway didn't promote it.                       |
| `skipped_below_min_prefix` | The prompt is below the minimum cacheable size.                                          |
| `not_cache_capable`        | AI Gateway identified the session itself, and the model doesn't support prompt caching.  |
| `skipped_mode_off`         | You set `sessionAffinity: false`.                                                        |


---

[View full sitemap](/docs/sitemap)
