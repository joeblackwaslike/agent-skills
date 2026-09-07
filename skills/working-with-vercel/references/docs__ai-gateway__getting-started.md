---
title: Getting Started with AI Gateway
product: vercel
url: /docs/ai-gateway/getting-started
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started"
last_updated: 2026-09-02
type: tutorial
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/getting-started/migrate-to-ai-gateway
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/observability-and-spend/budgets
  - /docs/ai-gateway/security-and-compliance/model-allowlist
summary: Create an AI Gateway API key, make your first request with TypeScript, Python, or cURL, and verify how the request was routed.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "82273b65e3efeaf4c20a3cbb811a43d76156da7b4e93cda705a31c0b0288ffc1"
---

# Getting Started with AI Gateway

Make your first AI Gateway request, then verify its model, provider, usage, cost, and routing in the Vercel dashboard. You can start with the AI SDK for TypeScript or Python, send raw HTTP with cURL, use an existing compatible client, or connect a coding agent.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build AI Agents with Vercel and the AI SDK](https://vercel.com/kb/guide/how-to-build-ai-agents-with-vercel-and-the-ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related) — Learn how to build, deploy, and scale AI agents on Vercel using the AI SDK. This guide covers calling LLMs, defining too
- [Build realtime voice agents on AI Gateway](https://vercel.com/blog/realtime-voice-agents-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related)
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related)
- [AI Gateway: Production-ready reliability for your AI apps](https://vercel.com/blog/ai-gateway-is-now-generally-available?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related)
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [Building AI apps on Vercel: an overview](https://vercel.com/kb/guide/how-to-build-ai-app?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related) — Learn the key AI concepts and tools for building and scaling AI apps.
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.
- [CLI Workflows](https://vercel.com/docs/agent-resources/workflows?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related) — End-to-end workflows that show how to compose Vercel CLI commands into complete debugging, deployment, and recovery sess
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/getting-started.graph.md](/docs/ai-gateway/getting-started.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

### Set up your API key

You need a [Vercel account](https://vercel.com/signup) and a team with a valid payment method, which unlocks free AI Gateway Credits. The TypeScript path needs [Node.js 22 or later](https://nodejs.org/), the Python path needs Python 3.12 or later, and the cURL path needs neither.

1. If your team does not have a valid payment method, [add one to unlock free credits](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card).
2. Open the [Create API Key dialog](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys%3FshowCreateKeyModal%3Dtrue\&title=AI+Gateway+API+Keys), enter a name, and create the key.
3. Copy the key immediately. You cannot retrieve its value again.
4. Export the key in the terminal where you will run the example:

```bash filename="Terminal"
export AI_GATEWAY_API_KEY="your_ai_gateway_api_key"
```

Keep this terminal open so the example can read `AI_GATEWAY_API_KEY`.

> **💡 Note:** Applications deployed on Vercel can use an [OIDC
> token](/docs/ai-gateway/authentication-and-byok/oidc) instead of a long-lived
> API key. This tutorial uses an API key so the same examples work locally and
> outside Vercel.

## Choose how to start

| What you want to do                      | Start here                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------- |
| Make a request with TypeScript, Python, or cURL | [Make your first request](#make-your-first-request)                      |
| Use the OpenAI or Anthropic API          | [Use an existing client](#use-an-existing-client)                               |
| Move an existing provider integration    | [Migrate to AI Gateway](/docs/ai-gateway/getting-started/migrate-to-ai-gateway) |
| Build an agent application               | [Build an agent](#build-an-agent-application)                                   |
| Route a coding agent through AI Gateway  | [Connect a coding agent](#connect-a-coding-agent)                               |

## Getting started with your first request

### Make your first request

These examples use `openai/gpt-5.6-sol` and consume [AI Gateway Credits](/docs/ai-gateway/pricing). You can replace the model slug with any model your team can access. The free tier covers a subset of the catalog, so if your team has not purchased credits, start from a [free-tier model](/ai-gateway/models?freeTier=true): any other model returns a `403` until you [add credits](/docs/ai-gateway/pricing#top-up-your-ai-gateway-credits).

#### TypeScript

Create a project and install the AI SDK:

```bash filename="Terminal"
mkdir ai-gateway-quickstart
cd ai-gateway-quickstart
pnpm init
pnpm add ai@latest tsx typescript @types/node
```

Create `index.ts`:

```typescript filename="index.ts"
import { generateText } from 'ai';

async function main() {
  const { text } = await generateText({
    model: 'openai/gpt-5.6-sol',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  console.log(text);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Run the script:

```bash filename="Terminal"
pnpm tsx index.ts
```

#### Python

Create a project with [uv](https://docs.astral.sh/uv/) and install the AI SDK for Python:

```bash filename="Terminal"
mkdir ai-gateway-python-quickstart
cd ai-gateway-python-quickstart
uv init
uv add ai
```

Create `quickstart.py`:

```python filename="quickstart.py"
import asyncio
import ai


async def main() -> None:
    model = ai.get_model('openai/gpt-5.6-sol')
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

Run the script:

```bash filename="Terminal"
uv run python quickstart.py
```

#### cURL

Send a Chat Completions request directly to AI Gateway:

```bash filename="Terminal"
curl https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
    "messages": [
      {
        "role": "user",
        "content": "Invent a new holiday and describe its traditions."
      }
    ]
  }'
```

The response is a Chat Completions JSON object. The generated text is in `choices[0].message.content`.

A successful request prints or returns the model's description of a new holiday.

### Verify the request

Open [AI Gateway Logs](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Flogs\&title=AI+Gateway+Logs) and select the newest request. The log shows:

- The HTTP status and model
- The provider that served the request
- Input and output token usage
- Cost and total duration
- Every routing attempt, including recovered failures

Request logs take about 90 seconds to fully ingest. If the request does not appear immediately, wait and refresh the page.

### Troubleshoot your first request

Match the response to its cause below. A `403` has three different causes, so read the error message rather than assuming the first one.

| Response or symptom                                 | What it means                                                                                       | What to do                                                                                                                                                                                             |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `401`                                               | The API key or OIDC token is missing, invalid, or revoked                                            | Export a current AI Gateway key and retry                                                                                                                                                              |
| `402` whose `type` is not `quota_for_entity_exceeded` | The team does not have a positive credit balance                                                    | [Add AI Gateway Credits](/docs/ai-gateway/pricing#top-up-your-ai-gateway-credits)                                                                                                                      |
| `402` with `quota_for_entity_exceeded`              | A team, project, API key, or user budget has reached its limit                                       | Wait for the budget to refresh or [raise its limit](/docs/ai-gateway/observability-and-spend/budgets)                                                                                                  |
| `403` with `customer_verification_required`          | The team must add a valid payment method before it can use free credits                             | Add a payment method from the link in the error response                                                                                                                                               |
| `403` whose message names the free tier             | The model is not in the free-tier subset, so it needs purchased credits                             | Pick a [free-tier model](/ai-gateway/models?freeTier=true) or [add AI Gateway Credits](/docs/ai-gateway/pricing#top-up-your-ai-gateway-credits)                                                        |
| `403` whose message names team restrictions         | A [model](/docs/ai-gateway/security-and-compliance/model-allowlist) or [provider](/docs/ai-gateway/security-and-compliance/provider-allowlist) allowlist blocks the request | Choose an allowed model, or ask a team owner to update the allowlist                                                            |
| `429`                                               | A [rate limit](/docs/ai-gateway/rate-limits) was exceeded, from AI Gateway or the upstream provider  | Retry after a short wait; the paid tier removes AI Gateway's rate limits                                                                                                                          |

## Find an AI model

AI Gateway model IDs use a `provider/model` format, such as `openai/gpt-5.6-sol` or `anthropic/claude-opus-5`. A provider's own model name needs its prefix to route, and you should use IDs exactly as the catalog returns them rather than constructing variants by analogy.

Find the current ID for a model in two places:

- The [model list](/ai-gateway/models), with filters for modality, capability, provider, price, and free-tier eligibility
- [`GET /v1/models`](/docs/ai-gateway/sdks-and-apis/rest-api#list-models), which returns every model's ID, modalities, capability tags, context window, and pricing, without authentication

For per-provider pricing, regional availability, and live performance on one model, query [`GET /v1/models/{creator}/{model}/endpoints`](/docs/ai-gateway/sdks-and-apis/rest-api#get-model-endpoints).

## Use an existing client

AI Gateway supports several API shapes. Point an existing client at the matching base URL and keep using the same `provider/model` slugs.

| Client or API                                            | AI Gateway URL                              | Guide                                                                                                                                              |
| -------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI SDK                                                   | No base URL needed for string model IDs     | [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk)                                                                                                    |
| AI SDK for Python                                        | No base URL needed for string model IDs     | [AI SDK for Python](/docs/ai-gateway/sdks-and-apis/ai-sdk-python)                                                                                  |
| OpenAI Chat Completions or Responses                     | `https://ai-gateway.vercel.sh/v1`           | [OpenAI Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions) and [OpenAI Responses](/docs/ai-gateway/sdks-and-apis/responses) |
| Anthropic Messages                                       | `https://ai-gateway.vercel.sh`              | [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api)                                                                        |
| OpenResponses                                            | `https://ai-gateway.vercel.sh/v1`           | [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses)                                                                                      |
| LangChain, LlamaIndex, Pydantic AI, and other frameworks | Varies by integration                       | [Framework integrations](/docs/ai-gateway/ecosystem/framework-integrations)                                                                        |

Authentication, model IDs, provider routing, fallbacks, billing, and observability work across these API shapes.

## Build or connect an agent

### Add AI Gateway with a coding assistant

Install Vercel's focused AI Gateway skill. The skill covers current authentication, model discovery, compatible clients, routing, budgets, observability, and verification:

```bash filename="Terminal"
npx skills add vercel/vercel-plugin --skill ai-gateway
```

Then copy the prompt below into a coding assistant with access to your project:

**Agent prompt**

```text
Use the AI Gateway skill to add text generation to this project. Read AI_GATEWAY_API_KEY from the environment or .env.local, and stop and tell me to create a key if it is not set anywhere. Choose a current text model such as openai/gpt-5.6-sol from the live AI Gateway model list, print the generated text, run the result, and run the project's type checker. Report the files changed and command output.
```

When the task moves into SDK-specific implementation, the skill can chain to Vercel's AI SDK skill. You can also [install the Vercel Plugin](https://github.com/vercel/vercel-plugin) with `npx plugins add vercel/vercel-plugin` for skills across the rest of the Vercel platform.

### Build an agent application

The AI SDK includes `ToolLoopAgent` for applications that need model-driven loops and tools, built on the same setup and API key as your first request. See [Build agents with the AI SDK](https://ai-sdk.dev/docs/agents/building-agents). Python applications can use [`ai.Agent`](/docs/ai-gateway/sdks-and-apis/ai-sdk-python#tool-calling-with-agents).

### Connect a coding agent

The Vercel CLI can configure supported coding agents to route their model requests through AI Gateway. Install the latest CLI and sign in if needed:

```bash filename="Terminal"
npm i -g vercel@latest
vercel login
```

Run the interactive setup:

```bash filename="Terminal"
vercel ai-gateway coding-agents setup
```

The command detects installed agents, provisions or reuses an AI Gateway API key, previews every planned configuration change, and asks for confirmation before writing. On macOS, it stores the key in your login Keychain by default rather than in plaintext configuration.

The command configures Claude Code, Cline, Codex, Cursor, Hermes, Kilo Code, omp, OpenClaw, OpenCode, and Pi. To connect specific agents, pass one or more `--agent` values. For example:

```bash filename="Terminal"
vercel ai-gateway coding-agents setup --agent claude-code --agent codex
```

For every `--agent` value, along with `--all`, `--yes`, custom paths, Keychain storage, and desktop session migration, see the [`vercel ai-gateway` CLI reference](/docs/cli/ai-gateway#setup). The [coding agents guide](/docs/ai-gateway/coding-agents) covers manual configuration, including agents the command does not handle.

### Give an AI agent the docs

Every docs page ships in agent-readable forms: append `.md` for Markdown or `.graph.md` for the cross-link map, and browse [llms.txt](/llms.txt) or the [semantic sitemap](https://vercel.com/docs/sitemap.md) for the full index.

## Choose what to build next

**Text Generation**: Generate and stream text with GPT 5.6 Sol, Claude Opus 5, Gemini 3.7 Flash, Llama 4 Maverick, and 350+ more models. [Learn more →](/docs/ai-gateway/getting-started/text)

**Image Generation**: Create images from text prompts or edit existing images with Gemini 3.1 Flash Image, GPT Image 2, FLUX.2 \[flex], and more. [Learn more →](/docs/ai-gateway/getting-started/image)

**Video Generation**: Create videos from text prompts, images, or video input with Veo 3.1, Seedance 2.5, Kling v3.0, Grok Imagine, and more. Run them over a single request or as background jobs. [Learn more →](/docs/ai-gateway/getting-started/video)

**Realtime**: Build low-latency, speech-to-speech voice agents that listen and respond over WebSockets. [Learn more →](/docs/ai-gateway/getting-started/realtime)

**Speech**: Generate spoken audio from text and transcribe audio back to text with TTS-1, Whisper, and more. [Learn more →](/docs/ai-gateway/getting-started/speech)

## Next steps

- [Browse models](/ai-gateway/models) by capability, provider, price, and free-tier availability, or query [`GET /v1/models`](/docs/ai-gateway/sdks-and-apis/rest-api#list-models)
- [Migrate an existing application](/docs/ai-gateway/getting-started/migrate-to-ai-gateway)
- Configure [provider routing](/docs/ai-gateway/models-and-providers/provider-options) and [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks)
- Read the [FAQ](/docs/ai-gateway/faq) for pricing, compatibility, and data-handling questions


---

[View full sitemap](/docs/sitemap)
