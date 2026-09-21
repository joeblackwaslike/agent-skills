---
title: GitHub Copilot CLI with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/copilot
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/copilot"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Connect GitHub Copilot CLI to AI Gateway with the Vercel CLI or environment variables for the provider URL, API key, and model.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/copilot.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "5395cfde2f8826e086bb2f7b3b2337d9252c5a1eb615d0bb632745e4fc74e6ea"
---

# GitHub Copilot CLI with AI Gateway

[GitHub Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli) is GitHub's terminal coding agent. Its bring-your-own-key mode uses environment variables, so this mode needs no config file or GitHub sign-in.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcopilot&source_site=vercel-docs&relationship=related)
- [Continue CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/continue?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcopilot&source_site=vercel-docs&relationship=related) — Connect Continue CLI to AI Gateway with the Vercel CLI or a YAML model configuration that reads your API key from the en
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcopilot&source_site=vercel-docs&relationship=related) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [Command Code with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/command-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcopilot&source_site=vercel-docs&relationship=related) — Connect Command Code to AI Gateway with your own API key and a custom base URL. Configure models, switch between them, a
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcopilot&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [ForgeCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/forge?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcopilot&source_site=vercel-docs&relationship=related) — Connect ForgeCode to AI Gateway with the Vercel CLI or custom provider and credential files.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/copilot.graph.md](/docs/ai-gateway/coding-agents/copilot.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcopilot&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for GitHub Copilot CLI:

```bash filename="terminal"
npx vercel ai-gateway setup --agent copilot
```

The command exports `COPILOT_PROVIDER_BASE_URL`, `COPILOT_PROVIDER_API_KEY`, and `COPILOT_MODEL` from a managed block in your shell startup file. It doesn't write a config file.

## Configuring GitHub Copilot CLI

If you can't use the Vercel CLI, configure GitHub Copilot CLI manually:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Export the environment variables
  Copilot CLI activates its BYOK provider as soon as `COPILOT_PROVIDER_BASE_URL` is set. Export all three variables in your shell:
  ```bash filename="Terminal"
  export COPILOT_PROVIDER_BASE_URL="https://ai-gateway.vercel.sh/coding-agent/v1"
  export COPILOT_PROVIDER_API_KEY="your-ai-gateway-api-key"
  export COPILOT_MODEL="openai/gpt-6-astra"
  ```
  To persist them, add the same lines to your shell's startup file. `COPILOT_PROVIDER_API_KEY` carries the key, and `COPILOT_MODEL` selects the default gateway model.

- ### Start Copilot CLI
  Open a new terminal so the variables are loaded, then start the agent:
  ```bash filename="Terminal"
  copilot
  ```
  GitHub sign-in is not required in this mode.

- ### Switch models
  Set `COPILOT_MODEL` to any gateway model ID, or pass it per run:
  ```bash filename="Terminal"
  copilot --model anthropic/claude-sonnet-5
  ```

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

## Environment variables

| Variable                    | Description                                                                 |
| --------------------------- | --------------------------------------------------------------------------- |
| `COPILOT_PROVIDER_BASE_URL` | The gateway base URL: `https://ai-gateway.vercel.sh/coding-agent/v1`. Setting it activates BYOK mode. Required |
| `COPILOT_PROVIDER_API_KEY`  | Your AI Gateway API key. Required                                            |
| `COPILOT_MODEL`             | Default gateway model ID, for example `openai/gpt-6-astra`. Optional         |

> **💡 Note:** Copilot CLI calls AI Gateway through the [OpenAI-compatible Chat Completions
> API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), so any model
> that supports Chat Completions works.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key


---

[View full sitemap](/docs/sitemap)
