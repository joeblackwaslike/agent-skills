---
title: AI Gateway Authentication and BYOK
product: vercel
url: /docs/ai-gateway/authentication-and-byok
canonical_url: "https://vercel.com/docs/ai-gateway/authentication-and-byok"
last_updated: 2026-09-08
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/ai-gateway/observability-and-spend/budgets
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway/authentication-and-byok/byok
summary: Authenticate AI Gateway requests with API keys or OIDC tokens, and configure bring your own key (BYOK) credentials for model providers.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/authentication-and-byok.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "c832c2337586e2ac4f2746c7b63db22ca7a0b1dc79ccf9e16b4287dfcfbfdd0c"
---

# AI Gateway Authentication and BYOK

Every request to AI Gateway requires Vercel authentication. Use an AI Gateway API key or OpenID Connect (OIDC) token. Bring Your Own Key (BYOK) provider credentials control how AI Gateway authenticates to a model provider, but they don't replace request authentication.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [DeepSeek models now available via Azure on AI Gateway](https://vercel.com/changelog/deepseek-models-now-available-via-azure-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok&source_site=vercel-docs&relationship=related)
- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok&source_site=vercel-docs&relationship=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [How to build an AI agent for Slack with Chat SDK and AI SDK](https://vercel.com/kb/guide/how-to-build-an-ai-agent-for-slack-with-chat-sdk-and-ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok&source_site=vercel-docs&relationship=related) — Build a Slack AI agent using Chat SDK, AI SDK's ToolLoopAgent, and Vercel AI Gateway. Covers project setup, tool definit
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok&source_site=vercel-docs&relationship=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok&source_site=vercel-docs&relationship=related) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
- [Vercel & OpenAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok&source_site=vercel-docs&relationship=related) — Integrate your Vercel project with OpenAI's powerful suite of models.
- [AI Gateway Trace Drains](https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok&source_site=vercel-docs&relationship=related) — Forward an OpenTelemetry trace of every AI Gateway request to your own observability tool, and understand trace drain bi
- [vercel ai-gateway](https://vercel.com/docs/cli/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok&source_site=vercel-docs&relationship=related) — Manage AI Gateway resources from the Vercel CLI: API keys, budgets, routing rules, virtual models, models, leaderboards,

Full cross-link map for this page: [/docs/ai-gateway/authentication-and-byok.graph.md](/docs/ai-gateway/authentication-and-byok.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Quick start

Get authenticated in under a minute:

1. Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys) in your Vercel dashboard
2. Click **Create key** and follow the steps to generate a new API key.
3. Copy the API key and add it to your environment:

```bash {1}
export AI_GATEWAY_API_KEY="your_api_key_here"
```

The [AI SDK](https://ai-sdk.dev/) automatically uses this environment variable for authentication.
If you are using a different SDK, you may need to pass the API key manually.

## Authentication methods

### API keys

API keys work anywhere, whether it's local development, external servers, or CI pipelines. They never expire unless you revoke them. To create, view, or delete keys, see [API keys](/docs/ai-gateway/authentication-and-byok/api-keys). To cap how much a key can spend, see [Budgets](/docs/ai-gateway/observability-and-spend/budgets#api-key-budgets).

> **💡 Note:** When a team member leaves your team, Vercel deactivates any API keys
> they created. If you need authentication that isn't tied to a
> specific person, use [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc)
> on Vercel deployments.

When you specify a model id as a plain string, the AI SDK automatically uses the Vercel AI Gateway provider and reads the API key from the `AI_GATEWAY_API_KEY` environment variable:

These examples use AI SDK 7 and the AI SDK for Python beta. Set `AI_GATEWAY_API_KEY` before running them. See [API format differences](/docs/ai-gateway/sdks-and-apis#api-format-differences) for setup, request fields, and response handling.

#### AI SDK

#### TypeScript

See the [AI SDK authentication reference](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#authentication) for SDK configuration and usage.

```typescript filename="authentication.ts" {4}
import { generateText } from 'ai';

const { text } = await generateText({
  model: "anthropic/claude-sonnet-5",
  prompt: "Why is the sky blue?",
});

console.log(text);
```

#### Python (beta)

```python filename="authentication_ai.py" {5}
import asyncio
import ai

async def main():
    model = ai.get_model("anthropic/claude-sonnet-5")
    messages = [ai.user_message("Why is the sky blue?")]
    async with ai.stream(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end="", flush=True)
    print()

asyncio.run(main())
```

#### Chat Completions

#### TypeScript

```typescript filename="authentication-chat.ts" {4}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.chat.completions.create({
  model: "anthropic/claude-sonnet-5",
  messages: [{ "role": "user", "content": "Why is the sky blue?" }],
});

console.log(response.choices[0]?.message.content);
```

#### Python

```python filename="authentication_chat.py" {5}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.chat.completions.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Why is the sky blue?"}],
)

print(response.choices[0].message.content)
```

#### cURL

```bash filename="authentication-chat.sh" {2}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Why is the sky blue?"
    }
  ]
}'
```

#### Messages API

#### TypeScript

```typescript filename="authentication-messages.ts" {4}
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const response = await client.messages.create({
  model: "anthropic/claude-sonnet-5",
  messages: [{ "role": "user", "content": "Why is the sky blue?" }],
  max_tokens: 1024,
});

for (const block of response.content) {
  if (block.type === 'text') console.log(block.text);
}
```

#### Python

```python filename="authentication_messages.py" {5}
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh",
)

response = client.messages.create(
    model="anthropic/claude-sonnet-5",
    messages=[{"role": "user", "content": "Why is the sky blue?"}],
    max_tokens=1024,
)

for block in response.content:
    if block.type == "text":
        print(block.text)
```

#### cURL

```bash filename="authentication-messages.sh" {2}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "messages": [
    {
      "role": "user",
      "content": "Why is the sky blue?"
    }
  ],
  "max_tokens": 1024
}'
```

#### Responses / OpenResponses

#### TypeScript

```typescript filename="authentication-responses.ts" {4}
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await client.responses.create({
  model: "anthropic/claude-sonnet-5",
  input: "Why is the sky blue?",
});

console.log(response.output_text);
```

#### Python

```python filename="authentication_responses.py" {5}
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["AI_GATEWAY_API_KEY"],
    base_url="https://ai-gateway.vercel.sh/v1",
)

response = client.responses.create(
    model="anthropic/claude-sonnet-5",
    input="Why is the sky blue?",
)

print(response.output_text)
```

#### cURL

```bash filename="authentication-responses.sh" {2}
curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "anthropic/claude-sonnet-5",
  "input": "Why is the sky blue?"
}'
```

### OIDC tokens

Vercel deployments receive an OIDC token as `VERCEL_OIDC_TOKEN`, so you can authenticate without creating an API key. See [OIDC](/docs/ai-gateway/authentication-and-byok/oidc) for setup.

```typescript {2}
// An explicit API key takes precedence over the OIDC token.
const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;
```

## Bring Your Own Key (BYOK)

BYOK lets you use your own provider credentials. This is useful when you:

- **Have existing agreements**: Use enterprise pricing or credits from providers
- **Need zero markup**: BYOK requests have no additional fee
- **Require private access**: Access provider features that need your own credentials
- **Want automatic fallback**: If your credentials fail, requests can retry with system credentials

BYOK credentials are configured at the team level and work across all projects. See the [BYOK documentation](/docs/ai-gateway/authentication-and-byok/byok) for setup instructions.

## Next steps

- [Create an API key](/docs/ai-gateway/authentication-and-byok/api-keys#create-a-key) in the dashboard
- [Set up OIDC](/docs/ai-gateway/authentication-and-byok/oidc) for zero-configuration authentication on Vercel
- [Set up BYOK](/docs/ai-gateway/authentication-and-byok/byok) to use your provider credentials


---

[View full sitemap](/docs/sitemap)
