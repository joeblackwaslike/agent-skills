---
title: OpenCode with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/opencode
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/opencode"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/agent-harnesses/opencode
  - /docs/ai-gateway/observability-and-spend/observability
summary: Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/coding-agents/opencode.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "1c520039039d1c3a0e8b9a48965a599f28548d412533c56249f83844d39685a6"
---

# OpenCode with AI Gateway

[OpenCode](https://opencode.ai) is a terminal-based AI coding agent that runs in your development environment. Here's how to use OpenCode with Vercel AI Gateway to access models from OpenAI, Anthropic, Google, SpaceXAI, and more through a unified endpoint.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How I use OpenCode with Vercel AI Gateway to build features fast](https://vercel.com/kb/guide/how-i-use-opencode-with-vercel-ai-gateway-to-build-features-fast) — How to route different AI models to different coding tasks automatically, cutting token costs by ~70% without losing qua
- [Command Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/command-code) — Connect Command Code to AI Gateway with your own API key and a custom base URL. Configure models, switch between them, a
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [Kilo Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code) — Connect Kilo Code to AI Gateway with the Vercel CLI or an OpenAI-compatible provider configuration. Set your API key and
- [OpenClaw with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openclaw) — Connect OpenClaw to AI Gateway with the Vercel CLI or manual provider configuration. Use gateway models across coding ag
- [ForgeCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/forge) — Connect ForgeCode to AI Gateway with the Vercel CLI or custom provider and credential files.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/opencode.graph.md](/docs/ai-gateway/coding-agents/opencode.graph.md)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for OpenCode:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent opencode
```

This command:

- Provisions an AI Gateway API key, or reuses one you pass with `--key`.
- Adds the `vercel` provider to `~/.config/opencode/opencode.json`.
- Stores the key in your macOS Keychain instead of plaintext config.
- Backs up any file it changes alongside the original as a `.bak` file.

Pass `--dry-run` to preview the changes without applying them. To detect and configure every installed supported agent at once, run `npx vercel@latest ai-gateway setup` without the `--agent` flag. See the [CLI reference](/docs/cli/ai-gateway#setup) for all options.

To verify the setup:

1. Run `opencode` in your terminal.
2. Run the `/models` command and pick a gateway model.
3. Confirm your requests appear in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar.

## Manual setup

Only needed on machines where you can't use the Vercel CLI. The Vercel CLI setup command handles key storage automatically, keeping the key in your macOS Keychain instead of plaintext config, so you don't need to visit the dashboard or run `/connect` on that path.

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

## Configure provider routing

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

## Run OpenCode durably

To deploy OpenCode as a service that resumes after crashes, function timeouts, and deployments, use `durable-harness`. OpenCode runs in your Vercel Function, with model calls routed through AI Gateway and session progress persisted across turns. Follow the [durable OpenCode guide](/docs/agent-harnesses/opencode) for agent, chat route, queue, and tool setup.

## Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
