---
title: Cline with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/cline
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/cline"
last_updated: 2026-09-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
summary: Connect Cline to AI Gateway through the Vercel CLI or VS Code settings. Configure model access and monitor usage and spending in one dashboard.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/cline.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "a160039f6a6dc8d231900e19d793f9539297f2dad40d0a5a8ce3a6e588e338ef"
---

# Cline with AI Gateway

[Cline](https://cline.bot) is a VS Code extension that provides autonomous coding assistance. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [OpenClaw with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openclaw) — Connect OpenClaw to AI Gateway with the Vercel CLI or manual provider configuration. Use gateway models across coding ag
- [Continue CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/continue) — Connect Continue CLI to AI Gateway with the Vercel CLI or a YAML model configuration that reads your API key from the en
- [ZCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/zcode) — Connect ZCode to AI Gateway with the Vercel CLI or an OpenAI-compatible custom provider.
- [Deep Agents CLI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/deepagents) — Connect Deep Agents CLI to AI Gateway with the Vercel CLI or a TOML provider and model profiles.
- [Blackbox AI with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/blackbox) — Configure the Blackbox AI CLI to use AI Gateway for code generation and debugging. Set your API key and model and monito

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/cline.graph.md](/docs/ai-gateway/coding-agents/cline.graph.md)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

Run the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) for Cline CLI:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent cline
```

The command provisions a key and writes Cline's provider store at `~/.cline/data/settings/providers.json`.

## Configuring Cline

To configure the Cline VS Code extension manually, use these steps:

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Install Cline
  Install the [Cline extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) from the VS Code marketplace.

- ### Open Cline settings
  Open the Cline settings panel in VS Code.

- ### Configure AI Gateway
  In the settings panel:
  1. Select **Vercel AI Gateway** as your API Provider
  2. Paste your AI Gateway API Key
  3. Choose a model from the auto-populated catalog, or enter a specific model ID
  Cline automatically fetches all available models from AI Gateway. You can browse the full catalog on the [models page](/ai-gateway/models).

- ### Start coding
  Your requests will now be routed through AI Gateway. You can verify this by checking your [AI Gateway Overview](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) in the Vercel dashboard.

### Use specific model IDs

Models follow the `creator/model-name` format. Check the [models catalog](/ai-gateway/models) for the right slug to avoid "404 Model Not Found" errors.

### Monitor usage and spend

View your usage, spend, and request activity in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. The observability dashboard tracks:

- Input and output token counts (including reasoning tokens)
- Cached input and cache creation tokens
- Latency metrics (average TTFT)
- Per-project and per-model costs

See the [observability documentation](/docs/ai-gateway/observability-and-spend/observability) for more details.

> **💡 Note:** Maintain separate API keys for different environments (dev, staging, production) to better track usage across your workflow.

## Troubleshooting

Common issues and solutions:

- **401 Unauthorized**: Verify you're sending the AI Gateway key to the AI Gateway endpoint
- **404 Model Not Found**: Copy the exact model ID from the models catalog
- **Slow first token**: Check dashboard average TTFT and consider streaming-optimized models


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
