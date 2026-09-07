---
title: Cline
product: vercel
url: /docs/ai-gateway/coding-agents/cline
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/cline"
last_updated: 2026-08-12
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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "81923cc27a3e0f2a03262ff5aca03d48fa5f43d18f5677e722dfc6424fcff560"
---

# Cline

[Cline](https://cline.bot) is a VS Code extension that provides autonomous coding assistance. You can configure it to use AI Gateway for unified model access and spend monitoring.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Cline now runs on Vercel AI Gateway](https://vercel.com/blog/cline-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcline&source_site=vercel-docs&relationship=related)
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcline&source_site=vercel-docs&relationship=related)
- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcline&source_site=vercel-docs&relationship=related) — Use OpenClaw with the AI Gateway as a model provider.
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcline&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [OpenClaw \\(Clawdbot\\)](https://vercel.com/docs/ai-gateway/chat-platforms/openclaw?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcline&source_site=vercel-docs&relationship=related) — Use OpenClaw \\(formerly Clawdbot\\) with AI Gateway.
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcline&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.
- [Blackbox AI](https://vercel.com/docs/ai-gateway/coding-agents/blackbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcline&source_site=vercel-docs&relationship=related) — Use the Blackbox AI CLI with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/cline.graph.md](/docs/ai-gateway/coding-agents/cline.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fcline&source_site=vercel-docs&relationship=graph)
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
