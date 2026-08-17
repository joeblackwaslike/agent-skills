---
title: Cline
product: vercel
url: /docs/ai-gateway/coding-agents/cline
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/cline"
last_updated: 2026-07-24
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/observability
summary: Use Cline with the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/cline.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "7aad03b65bda1110062fe69b6d122f3033bba1ee284257596979cc38e49c6264"
---

# Cline

[Cline](https://cline.bot) is a VS Code extension that provides autonomous coding assistance. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related) — Learn about openclaw on Vercel.
- [OpenClaw \(Clawdbot\)](https://vercel.com/docs/ai-gateway/chat-platforms/openclaw?from=related) — Use OpenClaw \(formerly Clawdbot\) with AI Gateway.
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related) — Use OpenCode with the AI Gateway.
- [Claude Code](https://vercel.com/docs/ai-gateway/coding-agents/claude-code?from=related) — Use Claude Code and the Claude Agent SDK with AI Gateway.
- [Blackbox AI](https://vercel.com/docs/ai-gateway/coding-agents/blackbox?from=related) — Use the Blackbox AI CLI with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/cline.graph.md](/docs/ai-gateway/coding-agents/cline.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** For Cline's CLI, the Vercel CLI can do this for you: [`vercel ai-gateway
>   coding-agents setup --agent cline`](/docs/cli/ai-gateway#setup) provisions a
> key and writes Cline's provider store at
> `~/.cline/data/settings/providers.json`. The VS Code steps below stay the
> same either way.

## Configuring Cline

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

- ### (Optional) Use specific model IDs
  Models follow the `creator/model-name` format. Check the [models catalog](/ai-gateway/models) for the right slug to avoid "404 Model Not Found" errors.

- ### (Optional) Monitor usage and spend
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
