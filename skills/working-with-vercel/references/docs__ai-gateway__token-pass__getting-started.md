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
  - /docs/ai-gateway/token-pass/coding-agents
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/token-pass/models-and-routing
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
summary: Subscribe to Token Pass, create a Token Pass API key, connect a coding agent, and confirm your first request uses Token Pass credit.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/token-pass/getting-started.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "029a56444d89a8e75a7cf8d3198cc97cfecf608ab0dee65f9fb0d07ac2269c64"
---

# Getting Started with Token Pass

This guide covers subscribing, creating a Token Pass API key, connecting a coding agent, and confirming that AI Gateway billed your first request to Token Pass credit.

## Prerequisites

Before you start, you need:

- A Pro team. Hobby teams can upgrade from the Token Pass tab.
- Permission to manage billing on that team.
- [Node.js](https://nodejs.org) installed, to run the Vercel CLI with `npx`.

- ### Subscribe
  Open the [Token Pass tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Ftoken-pass\&title=Go+to+Token+Pass) in AI Gateway and click **Subscribe**.

  The confirmation shows today's prorated charge and the date your $30 monthly charge starts. Click **Enable and Pay** to subscribe and accept the [Token Pass Terms](/docs/ai-gateway/token-pass#terms).

  After checkout, the tab shows your credit balance and the featured models.

- ### Create a Token Pass API key
  On the Token Pass tab, click **Create API Key**. AI Gateway creates a Token Pass API key on the team that has Token Pass.

  A Token Pass API key only works with featured models, and you can't change its type later. Keep a regular AI Gateway API key for other models.

  Export the key in your shell:
  ```bash filename="terminal"
  export AI_GATEWAY_API_KEY="your-token-pass-api-key"
  ```

- ### Connect your coding agent
  Run the Vercel CLI setup command with your Token Pass API key:
  ```bash filename="terminal"
  npx vercel@latest ai-gateway setup --key "$AI_GATEWAY_API_KEY"
  ```
  The command detects the agents installed on your machine and asks which ones to configure. It backs up every file it changes, and on macOS it stores the key in your Keychain. Add `--dry-run` to preview the changes, or `--agent <name>` to configure one agent.

  Pass `--key`. Without it, the command creates a regular AI Gateway API key instead of using your Token Pass API key.
  > **💡 Note:** Each agent you configure uses the Token Pass API key for every request, so it
  > can only use featured models. To use other models in that agent, run the
  > setup command again with a regular AI Gateway API key.

- ### Select a featured model
  In your agent's model picker, choose `zai/glm-5.3` or `moonshotai/kimi-k3`. If the agent has a fast mode, turn it off. Fast variants aren't featured models, so a Token Pass API key can't use them.

  Each agent handles model selection differently. [Coding and personal agents](/docs/ai-gateway/token-pass/coding-agents) has the steps for fx, Claude Code, Codex, Cline, and OpenCode.

- ### Confirm Token Pass served the request
  Send a prompt from your agent, then check either of these:
  - The [Token Pass tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Ftoken-pass\&title=Go+to+Token+Pass), where your remaining credit goes down.
  - [Observability](/docs/ai-gateway/observability-and-spend/observability), where the request's provider is **Vercel Token Pass**.
  If the request failed or used another provider, see [When a request doesn't use Token Pass](/docs/ai-gateway/token-pass/models-and-routing#when-a-request-doesnt-use-token-pass).

## Test with cURL

To check your key and subscription without an agent, send a request to a featured model:

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

You don't need `providerOptions`. A Token Pass API key sends featured models to the Token Pass provider.

The same model IDs work with the [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk), the [OpenAI-compatible API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), and the [Anthropic-compatible API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api).

## Set up with an agent

To have a coding agent do the setup for you, export your Token Pass API key as `AI_GATEWAY_API_KEY`, then give the agent this prompt:

```text filename="prompt"
Connect my coding agent to Vercel AI Gateway so it uses my Token Pass credit.
My Token Pass API key is in the AI_GATEWAY_API_KEY environment variable. Run
`npx vercel@latest ai-gateway setup --key "$AI_GATEWAY_API_KEY"` and let me
choose which installed agent to configure. Show me the proposed changes before
applying them. Then select `zai/glm-5.3` in that agent's model picker, turn off
any fast mode, and send one test request. Confirm the provider was Vercel Token
Pass (`token-pass`). Never print, log, or commit an API key. Follow
https://vercel.com/docs/ai-gateway/token-pass/coding-agents.
```


---

[View full sitemap](/docs/sitemap)
