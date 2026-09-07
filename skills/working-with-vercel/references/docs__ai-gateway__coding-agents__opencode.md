---
title: OpenCode
product: vercel
url: /docs/ai-gateway/coding-agents/opencode
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/opencode"
last_updated: 2026-09-03
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/observability-and-spend/observability
summary: Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/opencode.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "20042458cda31d15b32a3d6cb35b428ccd2f18184ae91cc46de1c5f752cb2ce8"
---

# OpenCode

[OpenCode](https://opencode.ai) is a terminal-based AI coding assistant that runs in your development environment. Here's how to use OpenCode with Vercel AI Gateway to access models from OpenAI, Anthropic, Google, SpaceXAI, and more through a unified endpoint.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopencode&source_site=vercel-docs&relationship=related)
- [How I use OpenCode with Vercel AI Gateway to build features fast](https://vercel.com/kb/guide/how-i-use-opencode-with-vercel-ai-gateway-to-build-features-fast?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopencode&source_site=vercel-docs&relationship=related) — How to route different AI models to different coding tasks automatically, cutting token costs by ~70% without losing qua
- [Kilo Code](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopencode&source_site=vercel-docs&relationship=related) — Use the Kilo Code CLI with the AI Gateway as an OpenAI-compatible provider.
- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopencode&source_site=vercel-docs&relationship=related) — Use OpenClaw with the AI Gateway as a model provider.
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopencode&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.
- [Roo Code](https://vercel.com/docs/ai-gateway/coding-agents/roo-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopencode&source_site=vercel-docs&relationship=related) — Use Roo Code with the AI Gateway.
- [Vercel & OpenAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopencode&source_site=vercel-docs&relationship=related) — Integrate your Vercel project with OpenAI's powerful suite of models.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/opencode.graph.md](/docs/ai-gateway/coding-agents/opencode.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fopencode&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Quick setup

Install the Vercel CLI:

```bash filename="terminal"
npm i -g vercel
```

Then connect OpenCode to AI Gateway with a single command:

```bash filename="terminal"
vercel ai-gateway coding-agents setup --agent opencode
```

This command:

- Provisions an AI Gateway API key, or reuses one you pass with `--key`.
- Adds the `vercel` provider to `~/.config/opencode/opencode.json`.
- Stores the key in your macOS Keychain instead of plaintext config.
- Backs up any file it changes alongside the original as a `.bak` file.

Pass `--dry-run` to preview the changes without applying them. To detect and configure every installed supported agent at once, run `vercel ai-gateway coding-agents setup` without the `--agent` flag. See the [CLI reference](/docs/cli/ai-gateway#setup) for all options.

To verify the setup:

1. Run `opencode` in your terminal.
2. Run the `/models` command and pick a gateway model.
3. Confirm your requests appear in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar.

## Manual setup

Only needed on machines where you can't use the Vercel CLI. The quick setup command handles key storage automatically, keeping the key in your macOS Keychain instead of plaintext config, so you don't need to visit the dashboard or run `/connect` on that path.

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

## Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.


---

[View full sitemap](/docs/sitemap)
