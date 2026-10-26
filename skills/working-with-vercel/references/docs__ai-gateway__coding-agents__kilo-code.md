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
source: "https://vercel.com/docs/ai-gateway/coding-agents/kilo-code.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e46039281754cddea774e6635bc83b3bab80ee927da35a8dd6dd054b07cd5159"
---

# Kilo Code with AI Gateway

[Kilo Code](https://kilo.ai) is a terminal coding agent with its own provider registry. Add AI Gateway as an OpenAI-compatible provider to reach every model in the gateway catalog with one key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway)
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [Command Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/command-code) — Connect Command Code to AI Gateway with your own API key and a custom base URL. Configure models, switch between them, a
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Qwen Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/qwen) — Connect Qwen Code to AI Gateway with the Vercel CLI or OpenAI-compatible model provider entries.

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


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
