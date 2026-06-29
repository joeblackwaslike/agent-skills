---
title: OpenCode
product: vercel
url: /docs/ai-gateway/coding-agents/opencode
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/opencode"
last_updated: 2026-06-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/observability-and-spend/observability
summary: Use OpenCode with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/opencode.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "984dbb384f59d09d0f752f0093529050074912795c5cbfdcaeb272e3e715622c"
---

# OpenCode

[OpenCode](https://opencode.ai) is a terminal-based AI coding assistant that runs in your development environment. Here's how to use OpenCode with Vercel AI Gateway to access models from OpenAI, Anthropic, Google, xAI, and more through a unified endpoint.

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
          "anthropic/claude-sonnet-4.6": {
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
