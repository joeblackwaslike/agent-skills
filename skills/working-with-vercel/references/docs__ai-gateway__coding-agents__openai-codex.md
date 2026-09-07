---
title: OpenAI Codex
product: vercel
url: /docs/ai-gateway/coding-agents/openai-codex
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/openai-codex"
last_updated: 2026-09-03
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/sdks-and-apis/responses/websockets
  - /docs/ai-gateway/sdks-and-apis/responses
summary: Connect OpenAI Codex to AI Gateway with one CLI command, or configure it manually.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/openai-codex.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "59b3777e887d59d94502fcd94de06f79cc58cbafc6b5c0490962223076edfe3d"
---

# OpenAI Codex

[OpenAI Codex](https://github.com/openai/codex) is OpenAI's agentic coding tool. You can configure it to use Vercel AI Gateway, enabling you to:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [GPT 5.2 Codex now available on Vercel AI Gateway](https://vercel.com/changelog/gpt-5-2-codex-now-available-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=related)
- [Codex CLI](https://ai-sdk.dev/providers/community-providers/codex-cli?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=related)
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=related)
- [GPT 5.1 Codex Max now available on Vercel AI Gateway](https://vercel.com/changelog/gpt-5-1-codex-max-now-available-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=related)
- [Codex](https://ai-sdk.dev/providers/ai-sdk-harnesses/codex?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=related)
- [GPT 5.1 Codex models now available in Vercel AI Gateway](https://vercel.com/changelog/gpt-5-1-codex-models-now-available-in-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=related)
- [Codex CLI (App Server)](https://ai-sdk.dev/providers/community-providers/codex-app-server?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=related)
- [GPT 5.3 Codex is now on AI Gateway](https://vercel.com/changelog/gpt-5-3-codex-is-now-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=related)
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.
- [Compaction](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/compaction?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=related) — Compress long conversations into a single compaction item with the OpenAI Responses API through AI Gateway.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/openai-codex.graph.md](/docs/ai-gateway/coding-agents/openai-codex.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopenai-codex&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- Route requests through multiple AI providers
- Monitor traffic and spend in your AI Gateway Overview
- View detailed traces in Vercel Observability under AI
- Use any model available through the gateway

## Quick setup

Make sure the Vercel CLI is installed:

```bash filename="terminal"
npm i -g vercel
```

Then run the setup command for Codex:

```bash filename="terminal"
vercel ai-gateway coding-agents setup --agent codex
```

The command configures everything Codex needs to route through the gateway:

- Provisions an AI Gateway API key, or reuses one you pass with `--key`
- Writes `~/.codex/config.toml` with a `vercel` model provider pointed at the [Codex compatibility endpoint](#codex-compatibility-endpoint) (`wire_api = "responses"`)
- Exports `AI_GATEWAY_API_KEY` from a managed block in your shell startup file, backed by the macOS Keychain when available so the key stays out of plaintext config
- Copies your existing Codex Desktop sessions across (see [session migration](/docs/cli/ai-gateway#desktop-session-migration))

Every file the command changes is backed up alongside as a `.bak` file. Pass `--dry-run` to preview the changes without writing them. For the full command reference, see [`vercel ai-gateway coding-agents setup`](/docs/cli/ai-gateway#setup).

To configure every installed supported agent at once, run the command without `--agent`. It detects and configures each supported agent it finds:

```bash filename="terminal"
vercel ai-gateway coding-agents setup
```

To verify the setup, run Codex:

```bash filename="terminal"
codex
```

The gateway routes your requests. Confirm they appear in your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.

## Manual setup

Only needed on machines where you can't use the Vercel CLI. When you use the CLI, it handles key storage for you, exporting `AI_GATEWAY_API_KEY` from a managed block in your shell startup file that is backed by the macOS Keychain when available. The steps below do the same configuration by hand.

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

## Enable WebSocket streaming

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

## Choose a different model

Run `/model` inside Codex to switch models without leaving your session. The picker lists the full gateway catalog and sets reasoning effort at the same time, because the Codex compatibility endpoint serves `/codex/v1/models` when the CLI starts.

To start a session on a specific model, pass `--model` (or `-m`):

```bash
codex --model openai/gpt-5.5-pro
```

To change the model for every session, update the `model` field in your config:

```toml filename="~/.codex/config.toml"
model = "openai/gpt-5.5-pro"
# Or try other models:
# model = "openai/gpt-5.4-mini"
# model = "openai/gpt-5.4-nano"
```

Every model in the gateway catalog works here, not only OpenAI ones. The examples stay on OpenAI models because Codex reads their metadata natively.

> **💡 Note:** When using non-OpenAI models through the gateway, you may see warnings about
> model metadata not being found. These warnings are safe to ignore since the
> gateway handles model routing.

## Define multiple profiles

Profiles let you switch models from the CLI. Create a file named `~/.codex/<profile-name>.config.toml` for each profile, using top-level keys for the values that differ from your base config:

```toml filename="~/.codex/fast.config.toml"
model = "openai/gpt-5.4-nano"
```

```toml filename="~/.codex/pro.config.toml"
model = "openai/gpt-5.5-pro"
```

Codex loads `~/.codex/config.toml` first, then overlays the profile file, so `model_provider = "vercel"` is inherited from your base config.

Switch between profiles using the `--profile` flag:

```bash
codex --profile fast
codex --profile pro
```

> **💡 Note:** Codex 0.134.0 and later no longer reads `[profiles.<name>]` tables or the
> `profile` selector from `config.toml`. If you have legacy profile tables,
> move each one into its own `~/.codex/<profile-name>.config.toml` file.

## Keeping your Codex Desktop sessions

Codex records each session against the provider that served it, so switching to the gateway hides the sessions you created before the switch. To bring them across, re-run the quick setup command:

```bash filename="terminal"
vercel ai-gateway coding-agents setup --agent codex
```

The command copies each rollout file under `sessions` and `archived_sessions` to a new deterministic session ID with `model_provider` set to `vercel`. Originals are never moved, edited, or deleted, and re-running never duplicates a session it already copied. Pass `--no-session-migration` to skip the step, and decompress any `.jsonl.zst` sessions first, since compressed rollouts can't be rewritten. See [session migration](/docs/cli/ai-gateway#desktop-session-migration) for details.

## Codex compatibility endpoint

Point Codex at its own compatibility endpoint:

```toml filename="~/.codex/config.toml"
[model_providers.vercel]
base_url = "https://ai-gateway.vercel.sh/codex/v1"
```

Use it everywhere on this page. It serves `/codex/v1/models` in the proprietary `ModelsResponse` shape Codex decodes at startup, so the CLI attaches its shell tool and sees the full gateway catalog. Every other path falls through to the standard handlers, so routing, billing, and errors are unchanged. To call the gateway from your own code rather than through Codex, see the [Responses API](/docs/ai-gateway/sdks-and-apis/responses) instead.

`wire_api` must be `responses`. Codex removed Chat Completions support, and the gateway serves the Responses API at `/v1/responses`.


---

[View full sitemap](/docs/sitemap)
