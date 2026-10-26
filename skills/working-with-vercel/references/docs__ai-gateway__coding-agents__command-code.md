---
title: Command Code with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/command-code
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/command-code"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway/observability-and-spend/logs
  - /docs/ai-gateway/observability-and-spend/usage
summary: Connect Command Code to AI Gateway with your own API key and a custom base URL. Configure models, switch between them, and monitor usage and spending.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/command-code.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c65928643c6b60cacba69df77dab5b98fea0ff8d0a10431ae0d9396db75cf441"
---

# Command Code with AI Gateway

Use [Command Code](https://commandcode.ai/) with AI Gateway for model access and spend monitoring. Command Code's bring your own key (BYOK) configuration, currently in beta, lets you set a custom provider endpoint and choose models.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [Kilo Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code) — Connect Kilo Code to AI Gateway with the Vercel CLI or an OpenAI-compatible provider configuration. Set your API key and
- [ForgeCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/forge) — Connect ForgeCode to AI Gateway with the Vercel CLI or custom provider and credential files.
- [GitHub Copilot CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/copilot) — Connect GitHub Copilot CLI to AI Gateway with the Vercel CLI or environment variables for the provider URL, API key, and

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/command-code.graph.md](/docs/ai-gateway/coding-agents/command-code.graph.md)
<!-- /docsgraph:related -->

Command Code requires manual configuration. The [Vercel CLI setup command](/docs/cli/ai-gateway#setup) does not configure it.

## Configuring Command Code

- ### Install Command Code
  With Node.js 22 or later installed, run:
  ```bash filename="Terminal"
  npm i -g command-code@latest
  command-code --version
  ```
  The second command prints the installed version. See the [Command Code installation instructions](https://commandcode.ai/docs/quickstart) for platform-specific details.

  If you haven't signed in to Command Code, run:
  ```bash filename="Terminal"
  command-code login
  ```
  Complete the sign-in in your browser, then return to the terminal after Command Code confirms the login.

- ### Create an API key
  Create an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok) and export it in the terminal where you run Command Code:
  ```bash filename="Terminal"
  export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  Replace `your-ai-gateway-api-key` with your key.

- ### Configure the provider
  Create `~/.commandcode/providers.json` with the following configuration. If the file exists, add the `vercel` entry to its `provider` object:
  ```json filename="~/.commandcode/providers.json"
  {
    "provider": {
      "vercel": {
        "name": "Vercel AI Gateway",
        "baseURL": "https://ai-gateway.vercel.sh/coding-agent/v1",
        "apiKey": "$AI_GATEWAY_API_KEY",
        "models": {
          "deepseek/deepseek-v4.1-flash": {}
        }
      }
    }
  }
  ```
  The `baseURL` uses the [coding agent endpoint](/docs/ai-gateway/coding-agents#which-base-url-to-use). Command Code uses OpenAI-compatible Chat Completions by default. Add an entry under `models` for each model you want to use, with its AI Gateway model ID.
  > **💡 Note:** Keep `apiKey` as an environment variable reference. Command Code rejects raw
  > secrets in `providers.json`. A key previously saved for this provider through
  > `/connect` takes precedence. Clear that saved key to use the environment
  > variable.

- ### Start Command Code
  Start a session in the same terminal:
  ```bash filename="Terminal"
  command-code
  ```
  Run `/model` and select a model under **Vercel AI Gateway**. Requests for that model route through AI Gateway. Reopen `/model` after editing `providers.json` to load your changes.

  Send a prompt, then check [AI Gateway logs](/docs/ai-gateway/observability-and-spend/logs) to verify the request.

## Next steps

- [Monitor usage and spending](/docs/ai-gateway/observability-and-spend/usage)
- [Explore Command Code's BYOK options](https://commandcode.ai/docs/byok)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
