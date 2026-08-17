---
title: OpenAI Codex
product: vercel
url: /docs/ai-gateway/coding-agents/openai-codex
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/openai-codex"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/sdks-and-apis/responses/websockets
summary: Use OpenAI Codex CLI with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/openai-codex.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "28f2927519ca54bdfa71efc23181805825e0b5ceca56c27fddc91aee5005b80a"
---

# OpenAI Codex

[OpenAI Codex](https://github.com/openai/codex) is OpenAI's agentic coding tool. You can configure it to use Vercel AI Gateway, enabling you to:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Codex CLI](https://ai-sdk.dev/providers/community-providers/codex-cli?from=related)
- [Codex CLI (App Server)](https://ai-sdk.dev/providers/community-providers/codex-app-server?from=related)
- [Codex](https://ai-sdk.dev/providers/ai-sdk-harnesses/codex?from=related)
- [How I use OpenCode with Vercel AI Gateway to build features fast](https://vercel.com/kb/guide/how-i-use-opencode-with-vercel-ai-gateway-to-build-features-fast?from=related) — How to route different AI models to different coding tasks automatically, cutting token costs by ~70% without losing qua
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related) — Use OpenCode with the AI Gateway.
- [Claude Code](https://vercel.com/docs/ai-gateway/coding-agents/claude-code?from=related) — Use Claude Code and the Claude Agent SDK with AI Gateway.
- [Kilo Code](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code?from=related) — Learn about kilo code on Vercel.
- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related) — Learn about openclaw on Vercel.
- [Superset](https://vercel.com/docs/ai-gateway/coding-agents/superset?from=related) — Use Superset with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/openai-codex.graph.md](/docs/ai-gateway/coding-agents/openai-codex.graph.md)
<!-- /docsgraph:related -->

- Route requests through multiple AI providers
- Monitor traffic and spend in your AI Gateway Overview
- View detailed traces in Vercel Observability under AI
- Use any model available through the gateway

> **💡 Note:** The Vercel CLI is the recommended way to set this up. [`vercel ai-gateway
>   coding-agents setup --agent codex`](/docs/cli/ai-gateway#setup) provisions a
> key, writes `~/.codex/config.toml` with the [Codex compatibility
> endpoint](#codex-compatibility-endpoint), exports `AI_GATEWAY_API_KEY` from a
> managed block in your shell startup file, and copies your existing Codex
> Desktop sessions across. The manual steps below are for machines where you'd
> rather configure it yourself.

## Codex compatibility endpoint

Point Codex at its own compatibility endpoint:

```toml filename="~/.codex/config.toml"
[model_providers.vercel]
base_url = "https://ai-gateway.vercel.sh/codex/v1"
```

Use it everywhere on this page. It serves `/codex/v1/models` in the proprietary `ModelsResponse` shape Codex decodes at startup, so the CLI attaches its shell tool and sees the full gateway catalog. Every other path falls through to the standard handlers, so routing, billing, and errors are unchanged. To call the gateway from your own code rather than through Codex, see the [Responses API](/docs/ai-gateway/sdks-and-apis/responses) instead.

`wire_api` must be `responses`. Codex removed Chat Completions support, and the gateway serves the Responses API at `/v1/responses`.

## Configure OpenAI Codex

Configure Codex to use AI Gateway through its configuration file for persistent settings.

- ### Install OpenAI Codex CLI
  Follow the [installation instructions on the OpenAI Codex repository](https://github.com/openai/codex) to install the Codex CLI tool.

- ### Configure environment variables
  Set your [AI Gateway API key](/docs/ai-gateway/authentication-and-byok) in your shell configuration file, for example in `~/.zshrc` or `~/.bashrc`:
  ```bash
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  After adding this, reload your shell configuration:
  ```bash
  source ~/.zshrc  # or source ~/.bashrc
  ```

- ### Set up the Codex config file
  Open `~/.codex/config.toml` and add the following:
  ```toml filename="~/.codex/config.toml"
  model_provider = "vercel"
  model = "openai/gpt-5.6-sol"

  [model_providers.vercel]
  name = "Vercel AI Gateway"
  base_url = "https://ai-gateway.vercel.sh/codex/v1"
  env_key = "AI_GATEWAY_API_KEY"
  wire_api = "responses"
  ```
  The configuration above:
  - Sets up a model provider named `vercel` that points to the [Codex compatibility endpoint](#codex-compatibility-endpoint)
  - References your `AI_GATEWAY_API_KEY` environment variable
  - Sets the `vercel` provider as the default for all sessions
  - Uses the Responses API, which is the only wire protocol current Codex versions support
  - Specifies `openai/gpt-5.6-sol` as the default model

- ### Run Codex
  Start Codex:
  ```bash
  codex
  ```
  Vercel AI Gateway routes your requests. To confirm, check your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.

- ### (Optional) Enable WebSocket streaming
  Codex can stream Responses API traffic over a persistent WebSocket connection, reducing per-turn latency. This uses AI Gateway's [Responses API WebSocket mode](/docs/ai-gateway/sdks-and-apis/responses/websockets). Enable it in your config:
  ```toml filename="~/.codex/config.toml"
  [features]
  responses_websockets_v2 = true

  [model_providers.vercel]
  name = "Vercel AI Gateway"
  base_url = "https://ai-gateway.vercel.sh/codex/v1"
  env_key = "AI_GATEWAY_API_KEY"
  wire_api = "responses"
  supports_websockets = true
  ```
  > **💡 Note:** WebSocket streaming is available for OpenAI models such as `openai/gpt-5.6-sol`.
  > Other models return a `Model <name> is not available over WebSocket` error,
  > so remove `supports_websockets = true` when switching to a non-OpenAI model.

- ### (Optional) Use a different model
  To use a different model, update the `model` field in your config:
  ```toml filename="~/.codex/config.toml"
  model = "anthropic/claude-sonnet-5"
  # Or try other models:
  # model = "google/gemini-3.5-flash-lite"
  # model = "openai/gpt-5.6-sol"
  ```
  > **💡 Note:** When using non-OpenAI models through the gateway, you may see warnings about
  > model metadata not being found. These warnings are safe to ignore since the
  > gateway handles model routing.

- ### (Optional) Define multiple profiles
  Profiles let you switch models from the CLI. Create a file named `~/.codex/<profile-name>.config.toml` for each profile, using top-level keys for the values that differ from your base config:
  ```toml filename="~/.codex/fast.config.toml"
  model = "openai/gpt-5.4-nano"
  ```
  ```toml filename="~/.codex/claude.config.toml"
  model = "anthropic/claude-sonnet-5"
  ```
  Codex loads `~/.codex/config.toml` first, then overlays the profile file, so `model_provider = "vercel"` is inherited from your base config.

  Switch between profiles using the `--profile` flag:
  ```bash
  codex --profile fast
  codex --profile claude
  ```
  > **💡 Note:** Codex 0.134.0 and later no longer reads `[profiles.<name>]` tables or the
  > `profile` selector from `config.toml`. If you have legacy profile tables,
  > move each one into its own `~/.codex/<profile-name>.config.toml` file.

## Keeping your Codex Desktop sessions

Codex records each session against the provider that served it, so switching to the gateway hides the sessions you created before the switch. To bring them across, run:

```bash filename="terminal"
vercel ai-gateway coding-agents setup --agent codex
```

The command copies each rollout file under `sessions` and `archived_sessions` to a new deterministic session ID with `model_provider` set to `vercel`. Originals are never moved, edited, or deleted, and re-running never duplicates a session it already copied. Pass `--no-session-migration` to skip the step, and decompress any `.jsonl.zst` sessions first, since compressed rollouts can't be rewritten. See [session migration](/docs/cli/ai-gateway#desktop-session-migration) for details.


---

[View full sitemap](/docs/sitemap)
