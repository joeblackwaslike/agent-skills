---
title: Kilo Code
product: vercel
url: /docs/ai-gateway/coding-agents/kilo-code
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/kilo-code"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Learn about kilo code on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/kilo-code.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "c3aaa47dfdebec52ba2074ccd0f275f7e82746a15cddee8461e1498644a927e3"
---

# Kilo Code

[Kilo Code](https://kilo.ai) is a terminal coding agent with its own provider registry. Add AI Gateway as an OpenAI-compatible provider to reach every model in the gateway catalog with one key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related) — Use OpenCode with the AI Gateway.
- [Roo Code](https://vercel.com/docs/ai-gateway/coding-agents/roo-code?from=related) — Use Roo Code with the AI Gateway.
- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related) — Learn about openclaw on Vercel.
- [Pi](https://vercel.com/docs/ai-gateway/coding-agents/pi?from=related) — Learn about pi on Vercel.
- [Pydantic AI](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai?from=related) — Learn how to integrate Vercel AI Gateway with Pydantic AI to access multiple AI models through a unified interface

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/kilo-code.graph.md](/docs/ai-gateway/coding-agents/kilo-code.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** The Vercel CLI is the recommended way to set this up. [`vercel ai-gateway
>   coding-agents setup --agent kilo`](/docs/cli/ai-gateway#setup) provisions a
> key, adds the provider to `~/.config/kilo/kilo.json`, and exports
> `AI_GATEWAY_API_KEY` from a managed block in your shell startup file.

## Configuring Kilo Code

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
