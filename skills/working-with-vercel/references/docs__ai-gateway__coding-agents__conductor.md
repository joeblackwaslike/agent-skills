---
title: Conductor
product: vercel
url: /docs/ai-gateway/coding-agents/conductor
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/conductor"
last_updated: 2026-04-29
type: integration
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-compat
summary: Use Conductor with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/conductor.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "32750694b3bcc132fe1c2420e26fd482eaf49775e717ba874d5587cf7201037e"
---

# Conductor

AI Gateway provides [Anthropic-compatible API endpoints](/docs/ai-gateway/sdks-and-apis/anthropic-compat) so you can use [Conductor](https://conductor.build) through a unified gateway.

[Conductor](https://conductor.build) is a Mac app that lets you run multiple Claude Code agents in parallel, each with an isolated copy of your codebase. You can see what each agent is working on, then review and merge their changes in one place.

## Configuring Conductor

Conductor runs using your local Claude Code login. You can check your auth status by running `claude /login` in your terminal.

Conductor also supports running Claude Code on OpenRouter, AWS Bedrock, Google Vertex AI, Vercel AI Gateway, or any Anthropic API compatible provider. You can configure it to use Vercel AI Gateway, enabling you to:

- Monitor traffic and token usage in your AI Gateway Overview
- View detailed traces in Vercel Observability under AI

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Configure environment variables
  In Conductor, go to **Settings** -> **Env** to set environment variables. Add the following under **Claude Code**:
  ```bash
  ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh"
  ANTHROPIC_AUTH_TOKEN="your-vercel-ai-gateway-api-key"
  ANTHROPIC_API_KEY=""
  ```
  > **💡 Note:** Setting `ANTHROPIC_API_KEY` to an empty string is required. This prevents
  > Claude Code from attempting to authenticate with Anthropic directly.
  Check out the [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code) for a full list of environment variables.

- ### Start using Conductor
  Your requests will now be routed through Vercel AI Gateway. You can verify this by checking your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.


---

[View full sitemap](/docs/sitemap)
