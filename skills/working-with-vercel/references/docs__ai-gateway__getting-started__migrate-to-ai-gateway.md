---
title: Migrate to AI Gateway Using Your Coding Agent
product: vercel
url: /docs/ai-gateway/getting-started/migrate-to-ai-gateway
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/migrate-to-ai-gateway"
last_updated: 2026-09-15
type: how-to
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/models-and-providers
summary: "Move your app's model calls to Vercel AI Gateway with a single coding-agent prompt, whatever provider or SDK you use today."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/migrate-to-ai-gateway.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "b2bf9f166f377b433f6590e0b5e0c0aa3fc7e9665229fad53203d8ef4d42b88e"
---

# Migrate to AI Gateway Using Your Coding Agent

AI Gateway puts one endpoint and one API key in front of hundreds of models, and layers on automatic provider fallbacks, per-request observability, spend limits, and pricing with no token markup. It speaks the [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk) natively and treats every model as a `creator/model` string, so it stays provider-neutral: switching providers becomes a one-line string change instead of an integration rewrite.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Cost-aware model routing through AI Gateway](https://vercel.com/kb/guide/cost-aware-model-routing-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — Route easy requests to a cheap model and escalate only hard ones to a frontier model through one AI Gateway endpoint, wi
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [How to migrate from DurableAgent to WorkflowAgent](https://vercel.com/kb/guide/durableagent-to-workflowagent?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — Switch your app from \\`DurableAgent\\` \\(@workflow/ai\\) to \\`WorkflowAgent\\` \\(@ai-sdk/workflow\\) by updating imports, st
- [How I use OpenCode with Vercel AI Gateway to build features fast](https://vercel.com/kb/guide/how-i-use-opencode-with-vercel-ai-gateway-to-build-features-fast?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — How to route different AI models to different coding tasks automatically, cutting token costs by ~70% without losing qua
- [Building an AI chat app with RAG and source citations on Vercel](https://vercel.com/kb/guide/building-ai-chat-app-with-rag-and-citations-on-vercel?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — A production stack for AI chat with retrieval, reranking, source citations, and background ingestion on Vercel using Nex
- [AI Gateway SDKs and APIs](https://vercel.com/docs/ai-gateway/sdks-and-apis?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — Connect to AI Gateway with the AI SDK, Python, REST, or compatible OpenAI, Anthropic Messages, OpenResponses, and Cohere
- [vercel ai-gateway](https://vercel.com/docs/cli/ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — Manage AI Gateway resources from the Vercel CLI: API keys, budgets, routing rules, virtual models, models, leaderboards,
- [Incremental Migration to Vercel](https://vercel.com/docs/incremental-migration?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — Learn how to migrate your app or website to Vercel with minimal risk and high impact.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/migrate-to-ai-gateway.graph.md](/docs/ai-gateway/getting-started/migrate-to-ai-gateway.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Rather than make those edits by hand, you hand the job to your coding agent. It reads the whole project, finds every place you call a model, including the background jobs and summary generators that you might overlook, and reroutes each one through AI Gateway without changing what your app does. Your framework, streaming, tool schemas, and response shapes all stay put.

**Agent prompt**

````text
Migrate this app's AI integrations to **Vercel AI Gateway**.

Use the AI Gateway skill for this task. If it is unavailable, run `npx skills add vercel/vercel-plugin --skill ai-gateway`, then find and read its `SKILL.md` before continuing. Do not add the skill as an application dependency.

Replace direct providers, gateways, proxies, and hand-written HTTP integrations, including OpenAI, Anthropic, Gemini, Vertex AI, Bedrock, Azure OpenAI, SpaceXAI, Mistral, Cohere, Groq, Together, Fireworks, DeepSeek, and Perplexity, as well as OpenRouter, LiteLLM, Portkey, Cloudflare AI Gateway, Helicone, and custom proxies.

## 1. Inventory first, then stop

Do not edit anything yet. Search the repository for AI integration code:

`openai`, `@ai-sdk/`, `@anthropic-ai/sdk`, the Google Gen AI SDK package, `generateText`, `streamText`, `generateObject`, `embed`, `embedMany`, `rerank`, `useChat`, `baseURL`, `base_url`, `apiKey`, `api_key`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`, `GEMINI_API_KEY`, `MISTRAL_API_KEY`, `GROQ_API_KEY`, `COHERE_API_KEY`, `OPENROUTER_API_KEY`, `openrouter`, `litellm`, `portkey`, `helicone`, and direct `fetch` calls to model APIs.

Include the call sites that you might overlook: title and summary generators, classification, extraction, moderation, autocomplete, command palettes, background jobs, and cron tasks. Do not limit the inventory to obvious `/api/chat/*` routes.

For each call site, record the language, SDK, endpoint, model, modality, streaming behavior, tool use, and credential.

Then count the blast radius. If components, tests, database rows, or public APIs depend on a protocol such as AI SDK `UIMessage`, tool UI parts, persisted message shapes, or vector dimensions, preserve that protocol and migrate only the model-execution boundary behind it.

Present the inventory and a migration plan, then wait for approval before editing. If the run is non-interactive, take the least disruptive path and say in the final report that you proceeded without approval.

## 2. Check credentials before migrating

Confirm that `AI_GATEWAY_API_KEY` is present, or that Vercel OIDC is configured. Check for presence only and never print the value. Confirm the credential works before you change any code:

```bash
curl -s -H "Authorization: Bearer $AI_GATEWAY_API_KEY" https://ai-gateway.vercel.sh/v1/models
```

If that fails, stop and tell the user. Never expose credentials in browser code.

## 3. Route each call site

Keep the format the app already speaks. Migrating a format to itself is the smallest possible change: the base URL, the API key, and the model ID. Request and response shapes stay identical, so streaming, tool schemas, and response parsing do not move.

| Current integration | Migrate to | Base URL |
| --- | --- | --- |
| OpenAI Chat Completions | Chat Completions | `https://ai-gateway.vercel.sh/v1` |
| OpenAI Responses | Responses | `https://ai-gateway.vercel.sh/v1` |
| OpenResponses | OpenResponses | `https://ai-gateway.vercel.sh/v1` |
| Anthropic Messages | Messages | `https://ai-gateway.vercel.sh` |
| Cohere Rerank | Cohere Rerank | `https://ai-gateway.vercel.sh` |
| AI SDK without AI Gateway | AI SDK with AI Gateway | model IDs become `creator/model` |

In every case the model ID becomes a `creator/model` slug and the credential becomes `AI_GATEWAY_API_KEY`. The Anthropic Messages surface also accepts the key in `x-api-key`, so the Anthropic SDK's own auth convention keeps working.

The wire format is independent of which provider serves the request. AI Gateway maps parameters across formats, so an Anthropic-format request can be served by an OpenAI model and the reverse. Never rewrite a working integration into a different format to reach a different model.

Change format only when the app needs a capability its current surface does not expose: embeddings and image generation are on Chat Completions only, and reranking is on the Cohere surface only.

Support also differs by modality. Do not assume an OpenAI-compatible base URL works for everything.

| Modality | Supported paths |
| --- | --- |
| Text, tools, structured output | AI SDK `creator/model` IDs; `https://ai-gateway.vercel.sh/v1` for `/v1/chat/completions` and `/v1/responses`; `https://ai-gateway.vercel.sh` for `/v1/messages` |
| Image | AI SDK; `/v1/chat/completions` for multimodal models; `/v1/images/generations` for image-only models |
| Reranking | AI SDK `rerank`, or `/v1/rerank` and `/v2/rerank`. Not available on the OpenAI-compatible or Anthropic surfaces. |
| Text to speech | AI SDK `experimental_generateSpeech`, or POST `/v4/ai/speech-model` with an `ai-model-id` header |
| Speech to text | AI SDK `experimental_transcribe`, or POST `/v4/ai/transcription-model` with an `ai-model-id` header |
| Video | AI SDK `experimental_generateVideo` only. Requires AI SDK 6 or later. TypeScript only. |
| Realtime | AI SDK `gateway.experimental_realtime` only. TypeScript only. |
| Embeddings | See step 4 |

If a call site has no supported path for its modality and language, such as video or realtime from Python, stop and report it. Do not force it through a different endpoint.

Treat `experimental_` APIs as unstable and say so in your report when you use one.

## 4. Leave embeddings alone unless asked

Changing an embedding model changes the vector space, and often the dimension count. An existing index keeps returning results that are silently wrong, and no test catches it.

Leave embedding calls on their current provider and list them in your report. Migrate them only if the user explicitly asks and you have a reindexing plan.

Apply the same caution to anything else with a persisted data contract, including vector columns, completions cached by model ID, and stored tool schemas.

## 5. Resolve model IDs against the catalog

Fetch the catalog. Unlike `/v1/models`, it maps every gateway slug to the provider-native names it is served under, which is what makes translation possible:

```bash
curl -s https://ai-gateway.vercel.sh/v1/models/catalog
```

Each entry is `{ slug, providers: [{ provider, providerModelId }] }`. Resolve every model string the app uses today, in this order:

1. If the string is already an exact `slug`, keep it. Model strings from OpenRouter and other `creator/model` gateways usually match directly, so treat the catalog as a validity check rather than a translation.
2. Otherwise match it case-insensitively against `providerModelId` and take that entry's `slug`. Casing is inconsistent in the data, so `Qwen/Qwen3-14B` and `qwen/qwen3-14b` both need to resolve.
3. If more than one slug matches, prefer the unsuffixed one. A `-fast` slug is Fast Mode: the same model on a faster serving path at a higher per-token cost, equivalent to setting `providerOptions.gateway.speed: 'fast'` on the base slug. Both slugs therefore share a `providerModelId`, which is why the lookup returns two. Fast Mode is a deliberate opt-in, so migrate to the base slug and mention Fast Mode in your report instead of changing tiers on the app's behalf.

A provider model ID can match more than one distinct catalog entry. If filtering by provider still leaves multiple candidates, stop and ask which one is intended. Do not assume that a newer version is an equivalent replacement.

Do not extrapolate variants by analogy. If a model in use has no entry at all, stop and ask rather than substituting one.

## 6. Make the changes

Preserve existing behavior, including streaming, tool calls, schemas, reasoning, multimodal inputs, retries, error handling, fallbacks, and provider-specific options. Update environment examples and documentation, then remove provider dependencies that are no longer used.

## 7. Verify

* Add a no-network test proving the base URL, auth variable, model slug, tool definitions, and streaming are wired correctly. It has to run under the project's existing test setup.
* Run the project's formatter, linter, type check, tests, and production build.
* Search again for stale provider keys, base URLs, model IDs, and imports left behind.
* Exercise one real route per modality you migrated.

## 8. Report

1. Call sites migrated, grouped by modality
2. Models and endpoints changed
3. Files and dependencies changed
4. Environment or Vercel configuration required
5. Verification results
6. Anything left on its original provider, and why

Do the migration now. Do not stop after giving advice.
````

## What it migrates

Coverage differs by modality, because AI Gateway exposes some of them only through the AI SDK:

| Modality                       | Migrated by default | Notes                                                            |
| ------------------------------ | ------------------- | ---------------------------------------------------------------- |
| Text, tools, structured output | Yes                 | Every surface and language                                       |
| Image                          | Yes                 | Chat Completions, or the images endpoint for image-only models   |
| Reranking                      | Yes                 | AI SDK or the Cohere-compatible REST endpoints only              |
| Speech and transcription       | Yes                 | AI SDK, or the REST speech and transcription endpoints           |
| Video and realtime             | TypeScript only     | AI SDK only. Video needs AI SDK 6 or later. Both are experimental. |
| Embeddings                     | No                  | Changing models invalidates an existing index. Ask for these.    |

If your app calls video or realtime models from Python, the agent reports it rather than attempting the migration.

## Run the migration

- ### Open your coding agent in the repository
  Launch your agent (Claude Code, Cursor, Codex CLI, or similar) at the root of the project you want to migrate so it can read and edit every file. Start from a fresh branch with a clean working tree, so the whole migration arrives as a single diff you can review before merging.

- ### Authenticate with AI Gateway
  Give the agent a credential so it can validate model IDs and run a verification request. Create a key on the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys%3FshowCreateKeyModal%3Dtrue\&title=AI+Gateway+API+Keys), then store it locally:
  ```bash filename=".env.local"
  AI_GATEWAY_API_KEY=your_ai_gateway_api_key
  ```
  The prompt only confirms this variable is present and that it works; it never prints the value.
  > **💡 Note:** Already deploying on Vercel? Skip the key and run `vercel env pull` to pull an
  > [OIDC token](/docs/ai-gateway/authentication-and-byok/oidc) that authenticates
  > automatically in both local development and production. If your models fall
  > outside the [free tier](/docs/ai-gateway/pricing), add credits or connect your
  > own provider keys with [BYOK](/docs/ai-gateway/authentication-and-byok/byok).

- ### Paste the prompt and review the plan
  Drop the prompt into your agent. It runs read-only first: it takes inventory of your model calls and lays out a migration plan before touching anything. Approve the plan, then follow the diff as it works. The agent keeps your framework in place and edits only the model-call boundary. It stops to ask when a call site has no supported path for its language, and it leaves embeddings on their current provider unless you tell it otherwise.

  **Agent prompt**
  ````text
  Migrate this app's AI integrations to **Vercel AI Gateway**.

  Use the AI Gateway skill for this task. If it is unavailable, run `npx skills add vercel/vercel-plugin --skill ai-gateway`, then find and read its `SKILL.md` before continuing. Do not add the skill as an application dependency.

  Replace direct providers, gateways, proxies, and hand-written HTTP integrations, including OpenAI, Anthropic, Gemini, Vertex AI, Bedrock, Azure OpenAI, SpaceXAI, Mistral, Cohere, Groq, Together, Fireworks, DeepSeek, and Perplexity, as well as OpenRouter, LiteLLM, Portkey, Cloudflare AI Gateway, Helicone, and custom proxies.

  ## 1. Inventory first, then stop

  Do not edit anything yet. Search the repository for AI integration code:

  `openai`, `@ai-sdk/`, `@anthropic-ai/sdk`, the Google Gen AI SDK package, `generateText`, `streamText`, `generateObject`, `embed`, `embedMany`, `rerank`, `useChat`, `baseURL`, `base_url`, `apiKey`, `api_key`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_API_KEY`, `GEMINI_API_KEY`, `MISTRAL_API_KEY`, `GROQ_API_KEY`, `COHERE_API_KEY`, `OPENROUTER_API_KEY`, `openrouter`, `litellm`, `portkey`, `helicone`, and direct `fetch` calls to model APIs.

  Include the call sites that you might overlook: title and summary generators, classification, extraction, moderation, autocomplete, command palettes, background jobs, and cron tasks. Do not limit the inventory to obvious `/api/chat/*` routes.

  For each call site, record the language, SDK, endpoint, model, modality, streaming behavior, tool use, and credential.

  Then count the blast radius. If components, tests, database rows, or public APIs depend on a protocol such as AI SDK `UIMessage`, tool UI parts, persisted message shapes, or vector dimensions, preserve that protocol and migrate only the model-execution boundary behind it.

  Present the inventory and a migration plan, then wait for approval before editing. If the run is non-interactive, take the least disruptive path and say in the final report that you proceeded without approval.

  ## 2. Check credentials before migrating

  Confirm that `AI_GATEWAY_API_KEY` is present, or that Vercel OIDC is configured. Check for presence only and never print the value. Confirm the credential works before you change any code:

  ```bash
  curl -s -H "Authorization: Bearer $AI_GATEWAY_API_KEY" https://ai-gateway.vercel.sh/v1/models
  ```

  If that fails, stop and tell the user. Never expose credentials in browser code.

  ## 3. Route each call site

  Keep the format the app already speaks. Migrating a format to itself is the smallest possible change: the base URL, the API key, and the model ID. Request and response shapes stay identical, so streaming, tool schemas, and response parsing do not move.

  | Current integration | Migrate to | Base URL |
  | --- | --- | --- |
  | OpenAI Chat Completions | Chat Completions | `https://ai-gateway.vercel.sh/v1` |
  | OpenAI Responses | Responses | `https://ai-gateway.vercel.sh/v1` |
  | OpenResponses | OpenResponses | `https://ai-gateway.vercel.sh/v1` |
  | Anthropic Messages | Messages | `https://ai-gateway.vercel.sh` |
  | Cohere Rerank | Cohere Rerank | `https://ai-gateway.vercel.sh` |
  | AI SDK without AI Gateway | AI SDK with AI Gateway | model IDs become `creator/model` |

  In every case the model ID becomes a `creator/model` slug and the credential becomes `AI_GATEWAY_API_KEY`. The Anthropic Messages surface also accepts the key in `x-api-key`, so the Anthropic SDK's own auth convention keeps working.

  The wire format is independent of which provider serves the request. AI Gateway maps parameters across formats, so an Anthropic-format request can be served by an OpenAI model and the reverse. Never rewrite a working integration into a different format to reach a different model.

  Change format only when the app needs a capability its current surface does not expose: embeddings and image generation are on Chat Completions only, and reranking is on the Cohere surface only.

  Support also differs by modality. Do not assume an OpenAI-compatible base URL works for everything.

  | Modality | Supported paths |
  | --- | --- |
  | Text, tools, structured output | AI SDK `creator/model` IDs; `https://ai-gateway.vercel.sh/v1` for `/v1/chat/completions` and `/v1/responses`; `https://ai-gateway.vercel.sh` for `/v1/messages` |
  | Image | AI SDK; `/v1/chat/completions` for multimodal models; `/v1/images/generations` for image-only models |
  | Reranking | AI SDK `rerank`, or `/v1/rerank` and `/v2/rerank`. Not available on the OpenAI-compatible or Anthropic surfaces. |
  | Text to speech | AI SDK `experimental_generateSpeech`, or POST `/v4/ai/speech-model` with an `ai-model-id` header |
  | Speech to text | AI SDK `experimental_transcribe`, or POST `/v4/ai/transcription-model` with an `ai-model-id` header |
  | Video | AI SDK `experimental_generateVideo` only. Requires AI SDK 6 or later. TypeScript only. |
  | Realtime | AI SDK `gateway.experimental_realtime` only. TypeScript only. |
  | Embeddings | See step 4 |

  If a call site has no supported path for its modality and language, such as video or realtime from Python, stop and report it. Do not force it through a different endpoint.

  Treat `experimental_` APIs as unstable and say so in your report when you use one.

  ## 4. Leave embeddings alone unless asked

  Changing an embedding model changes the vector space, and often the dimension count. An existing index keeps returning results that are silently wrong, and no test catches it.

  Leave embedding calls on their current provider and list them in your report. Migrate them only if the user explicitly asks and you have a reindexing plan.

  Apply the same caution to anything else with a persisted data contract, including vector columns, completions cached by model ID, and stored tool schemas.

  ## 5. Resolve model IDs against the catalog

  Fetch the catalog. Unlike `/v1/models`, it maps every gateway slug to the provider-native names it is served under, which is what makes translation possible:

  ```bash
  curl -s https://ai-gateway.vercel.sh/v1/models/catalog
  ```

  Each entry is `{ slug, providers: [{ provider, providerModelId }] }`. Resolve every model string the app uses today, in this order:

  1. If the string is already an exact `slug`, keep it. Model strings from OpenRouter and other `creator/model` gateways usually match directly, so treat the catalog as a validity check rather than a translation.
  2. Otherwise match it case-insensitively against `providerModelId` and take that entry's `slug`. Casing is inconsistent in the data, so `Qwen/Qwen3-14B` and `qwen/qwen3-14b` both need to resolve.
  3. If more than one slug matches, prefer the unsuffixed one. A `-fast` slug is Fast Mode: the same model on a faster serving path at a higher per-token cost, equivalent to setting `providerOptions.gateway.speed: 'fast'` on the base slug. Both slugs therefore share a `providerModelId`, which is why the lookup returns two. Fast Mode is a deliberate opt-in, so migrate to the base slug and mention Fast Mode in your report instead of changing tiers on the app's behalf.

  A provider model ID can match more than one distinct catalog entry. If filtering by provider still leaves multiple candidates, stop and ask which one is intended. Do not assume that a newer version is an equivalent replacement.

  Do not extrapolate variants by analogy. If a model in use has no entry at all, stop and ask rather than substituting one.

  ## 6. Make the changes

  Preserve existing behavior, including streaming, tool calls, schemas, reasoning, multimodal inputs, retries, error handling, fallbacks, and provider-specific options. Update environment examples and documentation, then remove provider dependencies that are no longer used.

  ## 7. Verify

  * Add a no-network test proving the base URL, auth variable, model slug, tool definitions, and streaming are wired correctly. It has to run under the project's existing test setup.
  * Run the project's formatter, linter, type check, tests, and production build.
  * Search again for stale provider keys, base URLs, model IDs, and imports left behind.
  * Exercise one real route per modality you migrated.

  ## 8. Report

  1. Call sites migrated, grouped by modality
  2. Models and endpoints changed
  3. Files and dependencies changed
  4. Environment or Vercel configuration required
  5. Verification results
  6. Anything left on its original provider, and why

  Do the migration now. Do not stop after giving advice.
  ````

- ### Verify the migration
  When the agent finishes, confirm your app behaves exactly as before, both in the code and in your Vercel dashboard.

  Exercise the real paths:
  - Trigger a streaming response, a tool call, and a structured-output request, and confirm each one still completes end to end.
  - Run the project's own gates: formatting, linting, type checking, tests, and a production build.
  Confirm the wiring:
  - Traffic now reaches `https://ai-gateway.vercel.sh` and authenticates with `AI_GATEWAY_API_KEY` or your OIDC token.
  - Every model reference uses the `creator/model` slug form and resolves against the [model catalog](/docs/ai-gateway/models-and-providers).
  Watch it live:
  - Open AI Gateway in your [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=AI+Gateway) and confirm each request appears with its model, latency, token usage, and cost. See [Observability and spend](/docs/ai-gateway/observability-and-spend) for what the views cover.
  - Set a spend limit so an unexpected loop can't run up a bill, and confirm any provider fallbacks trigger in the order you configured.

## Use AI Gateway in your coding agent

AI coding agents are transforming how developers write, debug, and refactor code. Route these agents through AI Gateway to get a single dashboard for spend tracking, access to any model, and automatic fallbacks, all while using the familiar interfaces of your favorite tools.

See [Coding agents](/docs/ai-gateway/coding-agents) to set it up.

## Next steps

- Compare model pricing and capabilities in the [model catalog](/docs/ai-gateway/models-and-providers).
- Add [provider fallbacks](/docs/ai-gateway/models-and-providers/provider-options) so a single provider outage doesn't take your app down.
- Set [spend limits and budgets](/docs/ai-gateway/observability-and-spend) before you send production traffic.


---

[View full sitemap](/docs/sitemap)
