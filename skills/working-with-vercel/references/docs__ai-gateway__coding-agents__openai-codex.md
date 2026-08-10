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
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/sdks-and-apis/responses/websockets
summary: Use OpenAI Codex CLI with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/openai-codex.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "8043cea73c1be9e9ca6821483a747b392000f41cf37dd1aff1c53fec381508f2"
---

# OpenAI Codex

[OpenAI Codex](https://github.com/openai/codex) is OpenAI's agentic coding tool. You can configure it to use Vercel AI Gateway, enabling you to:

- Route requests through multiple AI providers
- Monitor traffic and spend in your AI Gateway Overview
- View detailed traces in Vercel Observability under AI
- Use any model available through the gateway

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
  base_url = "https://ai-gateway.vercel.sh/v1"
  env_key = "AI_GATEWAY_API_KEY"
  ```
  The configuration above:
  - Sets up a model provider named `vercel` that points to the AI Gateway
  - References your `AI_GATEWAY_API_KEY` environment variable
  - Sets the `vercel` provider as the default for all sessions
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
  base_url = "https://ai-gateway.vercel.sh/v1"
  env_key = "AI_GATEWAY_API_KEY"
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


---

[View full sitemap](/docs/sitemap)
