---
title: Getting Started with AI Gateway
product: vercel
url: /docs/ai-gateway/getting-started
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started"
last_updated: 2026-09-08
type: tutorial
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/getting-started/migrate-to-ai-gateway
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/sdks-and-apis
summary: Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScript, or Python.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "d583ade0186749f44fdbbe4ab72a8fe52842b687db251827324337d22a32abac"
---

# Getting Started with AI Gateway

Use AI Gateway from any environment to call models, connect coding agents, and inspect routing and spend. AI Gateway API keys belong to a Vercel team and work in local development, CI, external servers, and Vercel deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build realtime voice agents on AI Gateway](https://vercel.com/blog/realtime-voice-agents-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related)
- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related)
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.

Full cross-link map for this page: [/docs/ai-gateway/getting-started.graph.md](/docs/ai-gateway/getting-started.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Choose how to start

| Goal                                     | Start here                                                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Ask a coding agent to make a request     | [Copy the agent setup prompt](#ask-a-coding-agent-to-make-a-request)                                                                         |
| Route a coding agent through AI Gateway  | [Run the coding-agent setup](#connect-a-coding-agent)                                                                                       |
| Make your first request                  | [Use cURL, TypeScript, or Python](#make-your-first-request)                                                                                 |
| Use AI Gateway with existing code        | [Use an SDK or API](#use-ai-gateway-with-existing-code), or [migrate to AI Gateway](/docs/ai-gateway/getting-started/migrate-to-ai-gateway) |

## For agents

### Ask a coding agent to make a request

Use this path when you want a coding agent to write and run an AI Gateway request in your current environment.

Paste this prompt into a coding agent with terminal access:

**Agent prompt**

```text
Set up AI Gateway and make one text-generation request from this environment. Use the AI Gateway skill for this task. If it is unavailable, run npx skills add vercel/vercel-plugin --skill ai-gateway, then find and read its SKILL.md before continuing. Reuse the environment's language, package manager, and AI client when possible; otherwise use cURL. Reuse AI_GATEWAY_API_KEY without exposing it. If the key is missing, use npx vercel@latest to create a team-scoped key without installing the Vercel CLI globally. Ask for the team slug only if the current CLI scope is ambiguous, and capture the new key without printing it. Use openai/gpt-6-astra. Run the request and report only the generated text and any action I need to take.
```

> Install the [Vercel plugin](/docs/agent-resources/vercel-plugin?from=docs-callout\&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started) to give your coding agent Vercel guidance beyond AI Gateway.
>
> ```bash
> npx plugins add vercel/vercel-plugin
> ```

### Route a coding agent through AI Gateway

Use this path when you want to route a coding agent's own model requests through AI Gateway. The Vercel CLI detects supported agents, including Claude Code, and lets you select which ones to connect:

```bash filename="Terminal"
npx vercel@latest ai-gateway setup
```

The command provisions or reuses an API key, previews its configuration changes, and connects the agents you select. For Claude Code, it uses the dedicated AI Gateway endpoint and adds Gateway models to the `/model` picker. See [Coding Agents](/docs/ai-gateway/coding-agents) for supported agents and manual setup.

## Make your first request

### Create an API key

You need a [Vercel account](https://vercel.com/signup). To use free AI Gateway Credits, [add a valid payment method](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card) to your team. The cURL path needs no runtime. The TypeScript path needs [Node.js 22.18 or later](https://nodejs.org/), and the Python path needs [Python 3.12 or later](https://www.python.org/) with [uv](https://docs.astral.sh/uv/).

Create and export an API key:

1. Open the [Create API Key dialog](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys%3FshowCreateKeyModal%3Dtrue\&title=AI+Gateway+API+Keys), enter a name, and select **Create API Key**. The link opens the dialog directly.
2. Copy the key immediately and export it in the terminal where you will run the example. You cannot retrieve its value again.

```bash filename="Terminal"
export AI_GATEWAY_API_KEY="your_ai_gateway_api_key"
```

> **💡 Note:** Vercel deployments can use an [OIDC
> token](/docs/ai-gateway/authentication-and-byok/oidc) instead of a long-lived
> API key. This tutorial uses an API key so the examples work in any
> environment.

These examples use `openai/gpt-6-astra` and consume [AI Gateway Credits](/docs/ai-gateway/pricing). You can replace the model slug with any model your team can access. If your team has not purchased credits, choose a [free-tier model](/ai-gateway/models?freeTier=true).

#### cURL

Send a Chat Completions request directly to AI Gateway:

```bash filename="Terminal"
curl https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-6-astra",
    "messages": [
      {
        "role": "user",
        "content": "Invent a new holiday and describe its traditions."
      }
    ]
  }'
```

#### TypeScript

Install the AI SDK:

```bash filename="Terminal"
pnpm add ai@latest
```

Create `index.mts`:

```typescript filename="index.mts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-6-astra',
  prompt: 'Invent a new holiday and describe its traditions.',
});

console.log(text);
```

Run the script:

```bash filename="Terminal"
node index.mts
```

#### Python

Create `quickstart.py`:

```python filename="quickstart.py"
import asyncio
import ai


async def main() -> None:
    model = ai.get_model('openai/gpt-6-astra')
    messages = [
        ai.user_message('Invent a new holiday and describe its traditions.')
    ]

    async with ai.stream(model, messages) as stream:
        async for event in stream:
            if isinstance(event, ai.events.TextDelta):
                print(event.chunk, end='', flush=True)

    print()


if __name__ == '__main__':
    asyncio.run(main())
```

Run the script with the AI SDK for Python:

```bash filename="Terminal"
uv run --with ai quickstart.py
```

### Monitor your request

After the request completes, open [AI Gateway Logs](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Flogs\&title=AI+Gateway+Logs) and select the newest request. You can inspect its status, model, provider, token usage, cost, duration, and routing attempts.

Logs may take up to 90 seconds to appear. Refresh the page if you don't see the request.

## Use AI Gateway with existing code

Use a [supported SDK or API](/docs/ai-gateway/sdks-and-apis) to connect an existing client. To move calls from a provider endpoint without changing their behavior, [migrate to AI Gateway](/docs/ai-gateway/getting-started/migrate-to-ai-gateway).

## Next steps

- [Troubleshoot request errors](/docs/ai-gateway/faq#why-did-my-ai-gateway-request-fail) by status code, type, and message
- Generate [text](/docs/ai-gateway/getting-started/text), [images](/docs/ai-gateway/getting-started/image), [video](/docs/ai-gateway/getting-started/video), [realtime audio](/docs/ai-gateway/getting-started/realtime), or [speech](/docs/ai-gateway/getting-started/speech)
- [Browse models](/ai-gateway/models) by capability, provider, price, and free-tier availability, or query [`GET /v1/models`](/docs/ai-gateway/sdks-and-apis/rest-api#list-models)
- Configure [provider routing](/docs/ai-gateway/models-and-providers/provider-options) and [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks)
- [Build an agent application](https://ai-sdk.dev/docs/agents/building-agents)


---

[View full sitemap](/docs/sitemap)
