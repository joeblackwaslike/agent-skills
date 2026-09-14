---
title: Grok Build with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/grok-build
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/grok-build"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/authentication-and-byok
summary: Connect Grok Build to AI Gateway with environment variables. Populate the model picker from the model catalog and monitor requests and spending.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/grok-build.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "f0c6f2e4748c0be7a74007299b05ad7decf08135ee02118bd922ee531ffbb9c6"
---

# Grok Build with AI Gateway

[Grok Build](https://docs.x.ai/build/overview) is SpaceXAI's terminal-based coding agent. Point it at AI Gateway to:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Grok Build 0.1 now available on Vercel AI Gateway](https://vercel.com/changelog/grok-build-0-1-now-available-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgrok-build&source_site=vercel-docs&relationship=related)
- [Grok 4.6 now available on AI Gateway](https://vercel.com/changelog/grok-4-6-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgrok-build&source_site=vercel-docs&relationship=related)
- [Grok 4.3 on AI Gateway](https://vercel.com/changelog/grok-4-3-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgrok-build&source_site=vercel-docs&relationship=related)
- [Grok 4.5 now available on AI Gateway](https://vercel.com/changelog/grok-4-5-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgrok-build&source_site=vercel-docs&relationship=related)
- [GitHub Copilot CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/copilot?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgrok-build&source_site=vercel-docs&relationship=related) — Connect GitHub Copilot CLI to AI Gateway with the Vercel CLI or environment variables for the provider URL, API key, and
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgrok-build&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Vercel Groq Integration](https://vercel.com/docs/agent-resources/integrations-for-models/groq?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgrok-build&source_site=vercel-docs&relationship=related) — Learn how to add the Groq native integration with Vercel.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/grok-build.graph.md](/docs/ai-gateway/coding-agents/grok-build.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fgrok-build&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- Use any model available through the gateway
- Monitor traffic and spend in your AI Gateway Overview
- View detailed traces in Vercel Observability under AI
- Switch models from the in-CLI picker without re-authenticating

Set two environment variables and every request routes through AI Gateway, with the model picker populated from the gateway's full catalog.

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Grok Build:

```bash filename="terminal"
npx vercel ai-gateway setup --agent grok
```

The command provisions or reuses a key, configures the gateway endpoint and default model in `~/.grok/config.toml`, and adds the key to your shell profile.

## Configuring Grok Build

If you can't use the Vercel CLI, configure Grok Build manually:

- ### Install Grok Build
  Follow the [installation instructions in the SpaceXAI documentation](https://docs.x.ai/build/overview). Verify the install:
  ```bash
  grok --version
  ```

- ### Point Grok Build at AI Gateway
  Set both variables in your shell configuration file, for example `~/.zshrc` or `~/.bashrc`:
  ```bash
  export GROK_MODELS_BASE_URL="https://ai-gateway.vercel.sh/coding-agent/v1"
  export GROK_CODE_XAI_API_KEY="your-ai-gateway-api-key"
  ```
  Replace `your-ai-gateway-api-key` with a key from the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys). See [API key authentication](/docs/ai-gateway/authentication-and-byok) for details.

  `https://ai-gateway.vercel.sh/coding-agent/v1` is the [coding agent surface](/docs/cli/ai-gateway#the-coding-agent-surface), the default base URL for agents that have no dedicated endpoint. It passes through to the gateway's standard `/v1` handlers, so routing, billing, and errors are unchanged.

  Reload your shell:
  ```bash
  source ~/.zshrc  # or source ~/.bashrc
  ```
  > **💡 Note:** When `GROK_MODELS_BASE_URL` is set, Grok Build sends the API key as
  > `Authorization: Bearer` instead of session-based auth. If you've previously
  > signed in with `grok login`, run `grok logout` first. An existing session
  > takes precedence over the API key.

- ### Run Grok Build
  Start a session:
  ```bash
  grok
  ```
  Press `Ctrl+M` to open the model picker. It lists every model AI Gateway exposes at `/v1/models`. To set a default model, add it to `~/.grok/config.toml`:
  ```toml filename="~/.grok/config.toml"
  [models]
  default = "spacexai/grok-4.5"
  # Or try other models:
  # default = "anthropic/claude-sonnet-5"
  # default = "openai/gpt-6-astra"
  # default = "google/gemini-3.1-pro-preview"
  ```
  To confirm requests are flowing through the gateway, check your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.

## Enabling web search

Grok Build's web search tool requires a separate model configured to use the OpenAI Responses API.

- ### Add a Responses-backed model entry
  Add the entry below to `~/.grok/config.toml`:
  ```toml filename="~/.grok/config.toml"
  [model.vercel-search]
  model = "spacexai/grok-4.5"
  base_url = "https://ai-gateway.vercel.sh/coding-agent/v1"
  api_backend = "responses"
  ```

- ### Point web search at the new entry
  Set the env var in your shell configuration file:
  ```bash
  export GROK_WEB_SEARCH_MODEL="vercel-search"
  ```
  Reload your shell and restart Grok Build for the change to take effect.


---

[View full sitemap](/docs/sitemap)
