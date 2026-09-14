---
title: OpenAI Responses Compaction with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/compaction
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/compaction"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/coding-agents/openai-codex
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/security-and-compliance/zdr
summary: Compress long conversations into a single compaction item with the OpenAI Responses API through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/compaction.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "f11cc3cc8dd31a75fdbad25be855281ea8bdd26f1e0785ae434274e6ba7b60c2"
---

# OpenAI Responses Compaction with AI Gateway

Long agent sessions eventually fill the model's context window. [Compaction](https://developers.openai.com/api/docs/guides/compaction) lets you hand the conversation so far to the model and get back a shorter version you can carry forward: your user messages, followed by one opaque `compaction` item that stands in for everything else.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenResponses Configuration with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/advanced?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fcompaction&source_site=vercel-docs&relationship=related) — Configure provider routing, fallbacks, and restrictions using the OpenResponses API through AI Gateway.
- [OpenResponses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fcompaction&source_site=vercel-docs&relationship=related) — Use the OpenResponses API specification with AI Gateway for a unified, provider-agnostic interface.
- [OpenAI Responses API WebSocket Mode with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/websockets?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fcompaction&source_site=vercel-docs&relationship=related) — Keep a persistent connection open across turns with the OpenAI Responses API over WebSocket through AI Gateway.
- [OpenAI Responses Images and PDFs with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/images?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fcompaction&source_site=vercel-docs&relationship=related) — Send images and PDF documents for analysis using the OpenAI Responses API through AI Gateway.
- [OpenAI Chat Completions API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fcompaction&source_site=vercel-docs&relationship=related) — Use OpenAI SDKs with the AI Gateway Chat Completions API. Configure the base URL and authentication for chat, streaming,

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/compaction.graph.md](/docs/ai-gateway/sdks-and-apis/responses/compaction.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fresponses%2Fcompaction&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

AI Gateway serves OpenAI's compaction endpoint at the same path as OpenAI:

```
POST https://ai-gateway.vercel.sh/v1/responses/compact
```

Requests are forwarded to OpenAI unchanged apart from the model ID, and OpenAI's response is returned as is. Coding agents that support server-side compaction, such as [OpenAI Codex](/docs/ai-gateway/coding-agents/openai-codex), call this endpoint automatically when you point them at AI Gateway.

## Compacting a conversation

Send the conversation you want to shrink as `input`. The response contains a `compaction` item you can pass back in the `input` of your next request in place of the original history:

#### TypeScript

```typescript filename="compact.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const compacted = await client.responses.compact({
  model: 'openai/gpt-6-astra',
  input: [
    {
      role: 'user',
      content: 'Refactor the auth module to use the new session store.',
    },
    {
      role: 'assistant',
      content: 'I updated session.ts and login.ts to read from SessionStore...',
    },
    {
      role: 'user',
      content: 'Now add tests for the logout path.',
    },
  ],
});

// Continue the conversation from the compacted history
const next = await client.responses.create({
  model: 'openai/gpt-6-astra',
  input: [
    ...(compacted.output as OpenAI.Responses.ResponseInputItem[]),
    {
      role: 'user',
      content: 'Also cover the token refresh path.',
    },
  ],
});

console.log(next.output_text);
```

#### Python

```python filename="compact.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

compacted = client.responses.compact(
    model='openai/gpt-6-astra',
    input=[
        {'role': 'user', 'content': 'Refactor the auth module to use the new session store.'},
        {'role': 'assistant', 'content': 'I updated session.ts and login.ts to read from SessionStore...'},
        {'role': 'user', 'content': 'Now add tests for the logout path.'},
    ],
)

# Continue the conversation from the compacted history
next_response = client.responses.create(
    model='openai/gpt-6-astra',
    input=[
        *compacted.output,
        {'role': 'user', 'content': 'Also cover the token refresh path.'},
    ],
)

print(next_response.output_text)
```

#### cURL

```bash filename="compact.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses/compact" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "input": [
      { "role": "user", "content": "Refactor the auth module to use the new session store." },
      { "role": "assistant", "content": "I updated session.ts and login.ts to read from SessionStore..." },
      { "role": "user", "content": "Now add tests for the logout path." }
    ]
  }'
```

The response is a `response.compaction` object:

```json
{
  "id": "resp_0f3a...",
  "object": "response.compaction",
  "created_at": 1756800000,
  "output": [
    { "type": "message", "role": "user", "content": [{ "type": "input_text", "text": "Refactor the auth module..." }] },
    { "type": "message", "role": "user", "content": [{ "type": "input_text", "text": "Now add tests for the logout path." }] },
    { "type": "compaction", "id": "cmp_8b2e...", "encrypted_content": "gAAAAAB..." }
  ],
  "usage": {
    "input_tokens": 1240,
    "output_tokens": 310,
    "total_tokens": 1550
  }
}
```

The `compaction` item's `encrypted_content` is opaque to you. Replay it in `input` on later turns and the model recovers the compacted context. You can compact again later; a new `compaction` item stacks on top of the previous one.

## Parameters

### Required

| Parameter | Type            | Description                                                                                         |
| --------- | --------------- | --------------------------------------------------------------------------------------------------- |
| `model`   | string          | An OpenAI model ID in `provider/model` format (for example, `openai/gpt-6-astra`)                    |
| `input`   | string or array | The conversation to compact. Must include at least one `user` message                                |

### Optional

| Parameter              | Type   | Description                                                                          |
| ---------------------- | ------ | ------------------------------------------------------------------------------------ |
| `instructions`         | string | System-level instructions to include in the compacted context                        |
| `previous_response_id` | string | ID of a previous response whose conversation state you want to compact               |
| `prompt_cache_key`     | string | Key to identify cached prompts (max 64 characters)                                   |
| `service_tier`         | string | OpenAI service tier: `auto`, `default`, `flex`, or `priority`                        |

## Supported models

Compaction runs on OpenAI's servers, so the `model` must be an OpenAI model. Requests for models from other providers return `400`:

```json
{
  "error": {
    "type": "invalid_request_error",
    "message": "Model \"anthropic/claude-sonnet-5\" is not available on OpenAI; /v1/responses/compact is only supported for OpenAI-routed models"
  }
}
```

AI Gateway does not fail over to another provider for compaction requests. The `compaction` item is OpenAI server-side state that other providers can't read.

## Pricing

A compaction request runs the model over your conversation, and you pay for it like any other Responses API request: input, cached input, reasoning, and output tokens from the response's `usage` block, at the [model's listed rates](/docs/ai-gateway/pricing). The request appears in your AI Gateway usage alongside your other requests to the same model.

With [your own OpenAI key](/docs/ai-gateway/authentication-and-byok/byok), OpenAI bills the tokens to your account and AI Gateway charges nothing.

## Bring Your Own Key

Compaction works with [your own OpenAI key](/docs/ai-gateway/authentication-and-byok/byok) configured at the team level, including any custom base URL and [model mappings](/docs/ai-gateway/authentication-and-byok/byok#model-mappings) on the credential. Without a team-level OpenAI credential, requests use AI Gateway's OpenAI credentials.

Per-request keys passed in `providerOptions.gateway.byok` aren't supported for compaction. Configure the credential at the team level instead.

## Zero data retention

Compaction is designed for clients that don't rely on OpenAI storing conversation state: everything the model needs to continue lives in the `compaction` item you carry in `input`. This makes it a good fit for `store: false` and for accounts under [zero data retention](/docs/ai-gateway/security-and-compliance/zdr).


---

[View full sitemap](/docs/sitemap)
