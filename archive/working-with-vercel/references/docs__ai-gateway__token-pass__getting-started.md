---
title: Getting Started with Token Pass
product: vercel
url: /docs/ai-gateway/token-pass/getting-started
canonical_url: "https://vercel.com/docs/ai-gateway/token-pass/getting-started"
last_updated: 2026-10-14
type: how-to
prerequisites:
  - /docs/ai-gateway/token-pass
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/token-pass
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/ai-gateway/token-pass/coding-agents
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/token-pass/models-and-routing
summary: Subscribe to Token Pass, connect a coding agent with any AI Gateway API key, and confirm your first request uses Token Pass credit.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/token-pass/getting-started.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e74e299749f8f1a74a04e47fd57915c4c8e2be1c2fdc43b877fab65eabadb8ea"
---

# Getting Started with Token Pass

This guide covers subscribing, connecting a coding agent, and confirming that AI Gateway billed your first request to Token Pass credit. A standard API key, an OIDC token, and signing in with your Vercel account all work with Token Pass.

## Prerequisites

Before you start, you need:

- A Pro team. Hobby teams can upgrade from the Token Pass tab.
- Permission to manage billing on that team.
- [Node.js](https://nodejs.org) installed, to run the Vercel CLI with `npx`.

- ### Subscribe
  Open the [Token Pass tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Ftoken-pass\&title=Go+to+Token+Pass) in AI Gateway and click **Subscribe**.

  The confirmation shows today's prorated charge and the date your $30 monthly charge starts. Click **Enable and Pay** to subscribe and accept the [Token Pass Terms](/docs/ai-gateway/token-pass#terms).

  Checkout may offer an optional team-wide zero data retention toggle that applies to your whole team. Models served through Token Pass are zero data retention regardless of this setting.

  After checkout, the tab shows your credit balance and the featured models.

- ### Connect your coding agent
  You can use any AI Gateway API key. If you don't already have one, the setup command below creates a standard key for you. Run the Vercel CLI setup command:
  ```bash filename="terminal"
  npx vercel@latest ai-gateway setup
  ```
  The command detects the agents installed on your machine and asks which ones to configure. It backs up every file it changes, and on macOS it stores the key in your Keychain. Add `--dry-run` to preview the changes, or `--agent <name>` to configure one agent. To use a specific existing key instead of creating one, pass `--key "$AI_GATEWAY_API_KEY"`.
  > **💡 Note:** While your team has Token Pass credit, AI Gateway bills featured-model
  > requests to Token Pass credit with any key. Requests for non-featured models
  > bill AI Gateway credits instead, so pick a featured model to keep usage on
  > Token Pass.
  > **💡 Note:** To cap usage at your Token Pass credit with no fallback, turn on **Restrict
  > to Token Pass only** under **Advanced Configuration** during [key
  > creation](/docs/ai-gateway/authentication-and-byok/api-keys#create-a-key).
  > A Token Pass key only works with featured models, and you can't change its
  > type later.

- ### Select a featured model
  In your agent's model picker, choose `zai/glm-5.3`, `zai/glm-5.3-flash`, `moonshotai/kimi-k3`, `moonshotai/kimi-k3.1-pro`, or `deepseek/deepseek-v4.1-flash`. If the agent has a fast mode, turn it off. Fast variants aren't featured models, so with a standard key they bill AI Gateway credits instead of drawing from Token Pass credit.

  Each agent handles model selection differently. [Coding and personal agents](/docs/ai-gateway/token-pass/coding-agents) has the steps for fx, Claude Code, Codex, Cline, and OpenCode.

- ### Confirm Token Pass served the request
  Send a prompt from your agent, then check either of these:
  - The [Token Pass tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Ftoken-pass\&title=Go+to+Token+Pass), where your remaining credit goes down.
  - [Observability](/docs/ai-gateway/observability-and-spend/observability), where the request's provider is **Vercel Token Pass**.
  If the request failed or used another provider, see [When a request doesn't use Token Pass](/docs/ai-gateway/token-pass/models-and-routing#when-a-request-doesnt-use-token-pass).

## Test with cURL

To check your subscription without an agent, send a request to a featured model. Export an AI Gateway API key first:

```bash filename="terminal"
export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
```

```bash filename="terminal"
curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "model": "moonshotai/kimi-k3",
  "messages": [
    { "role": "user", "content": "Reply with one short sentence." }
  ]
}'
```

You don't need `providerOptions`. While you have Token Pass credit, AI Gateway sends featured-model requests to the Token Pass provider with any AI Gateway API key.

The same model IDs work with the [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk), the [OpenAI-compatible API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), and the [Anthropic-compatible API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api).

## Set up with an agent

To have a coding agent do the setup for you, give it this prompt:

```text filename="prompt"
Connect my coding agent to Vercel AI Gateway so it uses my Token Pass credit.
Run `npx vercel@latest ai-gateway setup` and let me choose which installed
agent to configure. The command creates a standard AI Gateway API key if I
don't have one. Show me the proposed changes before applying them. Then select
`zai/glm-5.3` in that agent's model picker, turn off any fast mode, and send
one test request. Confirm the provider was Vercel Token Pass (`token-pass`).
Never print, log, or commit an API key. Follow
https://vercel.com/docs/ai-gateway/token-pass/coding-agents.
```

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
