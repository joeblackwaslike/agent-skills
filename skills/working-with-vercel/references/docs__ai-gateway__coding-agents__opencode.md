---
title: OpenCode
product: vercel
url: /docs/ai-gateway/coding-agents/opencode
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/opencode"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/observability-and-spend/observability
summary: Use OpenCode with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/opencode.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "98949c771fb2c7a8d7208bd144c57c3b46b6b9d8feceff3f1ede53aa14b414cb"
---

# OpenCode

[OpenCode](https://opencode.ai) is a terminal-based AI coding assistant that runs in your development environment. Here's how to use OpenCode with Vercel AI Gateway to access models from OpenAI, Anthropic, Google, SpaceXAI, and more through a unified endpoint.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How I use OpenCode with Vercel AI Gateway to build features fast](https://vercel.com/kb/guide/how-i-use-opencode-with-vercel-ai-gateway-to-build-features-fast?from=related) — How to route different AI models to different coding tasks automatically, cutting token costs by ~70% without losing qua
- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox?from=related) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [Kilo Code](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code?from=related) — Learn about kilo code on Vercel.
- [Roo Code](https://vercel.com/docs/ai-gateway/coding-agents/roo-code?from=related) — Use Roo Code with the AI Gateway.
- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related) — Learn about openclaw on Vercel.
- [OpenAI](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related) — Integrate your Vercel project with OpenAI's powerful suite of models.
- [OpenAI Codex](https://vercel.com/docs/ai-gateway/coding-agents/openai-codex?from=related) — Use OpenAI Codex CLI with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/opencode.graph.md](/docs/ai-gateway/coding-agents/opencode.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** The Vercel CLI is the recommended way to set this up. [`vercel ai-gateway
>   coding-agents setup --agent opencode`](/docs/cli/ai-gateway#setup) provisions
> a key and adds the `vercel` provider to
> `~/.config/opencode/opencode.json` for you, keeping the key in your macOS
> Keychain instead of plaintext config. The steps below configure the same
> thing from inside OpenCode.

## Configuring OpenCode

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Start OpenCode
  Run `opencode` in your terminal to start OpenCode:
  ```bash filename="Terminal"
  opencode
  ```

- ### Connect to AI Gateway
  Run the `/connect` command and search for Vercel AI Gateway:
  ```bash filename="Terminal"
  /connect
  ```
  Enter your Vercel AI Gateway API key when prompted.

- ### Select a model
  Run the `/models` command to select a model:
  ```bash filename="Terminal"
  /models
  ```
  Your requests will now be routed through Vercel AI Gateway.

- ### (Optional) Configure provider routing
  You can customize models through your OpenCode config. Here's an example of specifying provider routing order in `opencode.json`:
  ```json filename="opencode.json"
  {
    "$schema": "https://opencode.ai/config.json",
    "provider": {
      "vercel": {
        "models": {
          "anthropic/claude-sonnet-5": {
            "options": {
              "order": ["anthropic", "vertex"]
            }
          }
        }
      }
    }
  }
  ```
  See the [provider options documentation](/docs/ai-gateway/models-and-providers/provider-options) for more details on supported routing options.

- ### (Optional) Monitor usage and spend
  View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
