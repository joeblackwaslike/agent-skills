---
title: Kilo Code with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/kilo-code
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/kilo-code"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Connect Kilo Code to AI Gateway with the Vercel CLI or an OpenAI-compatible provider configuration. Set your API key and choose models.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/coding-agents/kilo-code.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "8fa73b2bf2ffe2fffdeeecb9f73f7bb059676d7a3a18d27d3d0f51c56bb55188"
---

# Kilo Code with AI Gateway

[Kilo Code](https://kilo.ai) is a terminal coding agent with its own provider registry. Add AI Gateway as an OpenAI-compatible provider to reach every model in the gateway catalog with one key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [Command Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/command-code) — Connect Command Code to AI Gateway with your own API key and a custom base URL. Configure models, switch between them, a
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/kilo-code.graph.md](/docs/ai-gateway/coding-agents/kilo-code.graph.md)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Kilo Code:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent kilo
```

The command provisions a key, adds the provider to `~/.config/kilo/kilo.json`, and exports `AI_GATEWAY_API_KEY` from a managed block in your shell startup file.

## Configuring Kilo Code

If you can't use the Vercel CLI, configure Kilo Code manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the key
  Add the key to your shell configuration file, for example `~/.zshrc` or `~/.bashrc`:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```

- ### Add the provider
  Kilo Code reads a global config at `~/.config/kilo/kilo.json`, or under `$XDG_CONFIG_HOME` when that variable is set. Add the gateway as an `openai-compatible` provider:
  ```json filename="~/.config/kilo/kilo.json"
  {
    "provider": {
      "openai-compatible": {
        "options": {
          "apiKey": "{env:AI_GATEWAY_API_KEY}",
          "baseURL": "https://ai-gateway.vercel.sh/coding-agent/v1"
        }
      }
    }
  }
  ```
  The `{env:...}` reference is Kilo Code's own substitution syntax. It resolves the value at runtime for configs in trusted locations, which includes the global config, so your key stays in the environment instead of in the file.

  `https://ai-gateway.vercel.sh/coding-agent/v1` is the [coding agent surface](/docs/cli/ai-gateway#the-coding-agent-surface), the default base URL for agents that have no dedicated endpoint. It's the same URL the setup command writes.
  > **💡 Note:** If you keep your configuration in `kilo.jsonc` instead of `kilo.json`, add
  > the provider block there. The Vercel CLI only writes `kilo.json`, so merge
  > the block by hand in that case.

- ### Pick a model
  Kilo Code fetches the catalog from the gateway's `/models` endpoint, so no per-model declarations are needed. Start a session and run `/models` to choose one. IDs are namespaced by the provider, for example `openai-compatible/anthropic/claude-opus-5`.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Read Kilo Code's [OpenAI-compatible provider documentation](https://kilo.ai/docs/ai-providers/openai-compatible)
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Connect your other agents with the [Vercel CLI](/docs/cli/ai-gateway#setup)

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
