---
title: Grok Build
product: vercel
url: /docs/ai-gateway/coding-agents/grok-build
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/grok-build"
last_updated: 2026-05-30
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok
summary: Use Grok Build with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/grok-build.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "4cf3b2cddf45c4606cc0131da6b677cbdb2e2085efd2282b82af7d1731dfb383"
---

# Grok Build

[Grok Build](https://docs.x.ai/build/overview) is xAI's terminal-based coding agent. Point it at AI Gateway to:

- Use any model available through the gateway
- Monitor traffic and spend in your AI Gateway Overview
- View detailed traces in Vercel Observability under AI
- Switch models from the in-CLI picker without re-authenticating

Set two environment variables and every request routes through AI Gateway, with the model picker populated from the gateway's full catalog.

## Configuring Grok Build

- ### Install Grok Build
  Follow the [installation instructions in the xAI documentation](https://docs.x.ai/build/overview). Verify the install:
  ```bash
  grok --version
  ```

- ### Point Grok Build at AI Gateway
  Set both variables in your shell configuration file, for example `~/.zshrc` or `~/.bashrc`:
  ```bash
  export GROK_MODELS_BASE_URL="https://ai-gateway.vercel.sh/v1"
  export GROK_CODE_XAI_API_KEY="your-ai-gateway-api-key"
  ```
  Replace `your-ai-gateway-api-key` with a key from the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys). See [API key authentication](/docs/ai-gateway/authentication-and-byok) for details.

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
  default = "xai/grok-4.3"
  # Or try other models:
  # default = "anthropic/claude-sonnet-4.6"
  # default = "openai/gpt-5.5"
  # default = "google/gemini-3.1-pro-preview"
  ```
  To confirm requests are flowing through the gateway, check your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.

## Enabling web search

Grok Build's web search tool requires a separate model configured to use the OpenAI Responses API.

- ### Add a Responses-backed model entry
  Add the entry below to `~/.grok/config.toml`:
  ```toml filename="~/.grok/config.toml"
  [model.vercel-search]
  model = "xai/grok-4.3"
  base_url = "https://ai-gateway.vercel.sh/v1"
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
