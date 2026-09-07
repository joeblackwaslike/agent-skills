---
title: Pi
product: vercel
url: /docs/ai-gateway/coding-agents/pi
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/pi"
last_updated: 2026-09-03
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/observability-and-spend/budgets
summary: Connect Pi to AI Gateway with one CLI command, or configure it manually.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/pi.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "5e4ed02626c24570669225c95d4bfb6a5f91a0b4514264e10a200f775d584942"
---

# Pi

[Pi](https://github.com/earendil-works/pi) is an open-source terminal coding agent. It ships a first-class `vercel-ai-gateway` provider, so it already knows the gateway's base URL and model catalog and only needs your API key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fpi&source_site=vercel-docs&relationship=related)
- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fpi&source_site=vercel-docs&relationship=related) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fpi&source_site=vercel-docs&relationship=related) — Create an AI Gateway API key, make your first request with TypeScript, Python, or cURL, and verify how the request was r
- [Kilo Code](https://vercel.com/docs/ai-gateway/coding-agents/kilo-code?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fpi&source_site=vercel-docs&relationship=related) — Use the Kilo Code CLI with the AI Gateway as an OpenAI-compatible provider.
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fpi&source_site=vercel-docs&relationship=related) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fpi&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.
- [Blackbox AI](https://vercel.com/docs/ai-gateway/coding-agents/blackbox?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fpi&source_site=vercel-docs&relationship=related) — Use the Blackbox AI CLI with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/pi.graph.md](/docs/ai-gateway/coding-agents/pi.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents%2Fpi&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Quick setup

The Vercel CLI provisions a key and wires it into Pi in one command. Before you run it:

- Install the Vercel CLI:

  ```bash filename="terminal"
  npm i -g vercel
  ```

- Install the Pi coding agent (the CLI configures Pi but does not install it):

  ```bash filename="terminal"
  npm install -g @earendil-works/pi-coding-agent
  ```

Then run the setup command:

```bash filename="terminal"
vercel ai-gateway coding-agents setup --agent pi
```

This command:

- Provisions an AI Gateway API key, or reuses one you pass with `--key`.
- Writes the key to Pi's auth file (`~/.pi/agent/auth.json`, or `$PI_CODING_AGENT_DIR/auth.json` when that variable is set) under the `vercel-ai-gateway` provider key, with owner-only (`0600`) permissions.
- Backs up any file it changes alongside the original as `.bak`. Add `--dry-run` to preview changes without writing them.

> **💡 Note:** Pi always keeps the key in `auth.json`, so the command writes it there even in
> macOS Keychain mode. Pi reads its agent directory from `$PI_CODING_AGENT_DIR`
> when that variable is set, and falls back to `~/.pi/agent` otherwise.

Run the command without `--agent` to detect and configure every installed supported agent at once:

```bash filename="terminal"
vercel ai-gateway coding-agents setup
```

For the full command reference, see [`vercel ai-gateway`](/docs/cli/ai-gateway#setup).

To verify the setup, start Pi and choose a gateway model with `/model` (or `--model`), then confirm your requests appear in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) Overview in the Vercel dashboard.

## Manual setup

Only needed on machines where you can't use the Vercel CLI.

- ### Install Pi
  Install the Pi coding agent from npm:
  ```bash filename="Terminal"
  npm install -g @earendil-works/pi-coding-agent
  ```

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

- ### Add the key to Pi
  Pi keeps credentials in `~/.pi/agent/auth.json`. Add an entry for the gateway provider:
  ```json filename="~/.pi/agent/auth.json"
  {
    "vercel-ai-gateway": {
      "type": "api_key",
      "key": "your-ai-gateway-api-key"
    }
  }
  ```
  The file holds a secret, so create it with owner-only permissions:
  ```bash filename="Terminal"
  chmod 600 ~/.pi/agent/auth.json
  ```
  > **💡 Note:** Pi reads its agent directory from `$PI_CODING_AGENT_DIR` when that variable
  > is set, and falls back to `~/.pi/agent` otherwise.

- ### Pick a model
  Start Pi and choose a gateway model with `/model`, or name one when you launch:
  ```bash filename="Terminal"
  pi --model anthropic/claude-opus-5
  ```
  Model IDs use the gateway's `creator/model-name` format. Browse the [models catalog](/ai-gateway/models) for what's available.

## Next steps

- Browse the [models catalog](/ai-gateway/models) for available models
- Read Pi's own [provider documentation](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/providers.md)
- Configure [spend limits](/docs/ai-gateway/observability-and-spend/budgets) on your API key
- Connect your other agents with the [Vercel CLI](/docs/cli/ai-gateway#setup)


---

[View full sitemap](/docs/sitemap)
