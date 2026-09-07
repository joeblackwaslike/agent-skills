---
title: Migrate to AI Gateway using your agent
product: vercel
url: /docs/ai-gateway/getting-started/migrate-to-ai-gateway
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/migrate-to-ai-gateway"
last_updated: 2026-08-24
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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "7332eeb31d2cd5789cc0f59301c3fc193a09bd3f34d5d56f696f75360313898d"
---

# Migrate to AI Gateway using your agent

AI Gateway puts one endpoint and one API key in front of hundreds of models, and layers on automatic provider fallbacks, per-request observability, spend limits, and pricing with no token markup. It speaks the [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk) natively and treats every model as a `creator/model` string, so it stays provider-neutral: switching providers becomes a one-line string change instead of an integration rewrite.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related)
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [AI Gateway: Production-ready reliability for your AI apps](https://vercel.com/blog/ai-gateway-is-now-generally-available?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related)
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [How I use OpenCode with Vercel AI Gateway to build features fast](https://vercel.com/kb/guide/how-i-use-opencode-with-vercel-ai-gateway-to-build-features-fast?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — How to route different AI models to different coding tasks automatically, cutting token costs by ~70% without losing qua
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/migrate-to-ai-gateway.graph.md](/docs/ai-gateway/getting-started/migrate-to-ai-gateway.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fmigrate-to-ai-gateway&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Rather than make those edits by hand, you hand the job to your coding agent. It reads the whole project, finds every place you call a model, including the background jobs and summary generators that are easy to forget, and reroutes each one through AI Gateway without changing what your app does. Your framework, streaming, tool schemas, and response shapes all stay put.

**Agent prompt**

```text
MIGRATION_PROMPT
```

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
  ```text
  MIGRATION_PROMPT
  ```

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
