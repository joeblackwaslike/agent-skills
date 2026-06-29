---
title: Coding Agents
product: vercel
url: /docs/ai-gateway/coding-agents
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents"
last_updated: 2026-06-20
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/coding-agents/claude-code
  - /docs/ai-gateway/coding-agents/openai-codex
  - /docs/ai-gateway/coding-agents/opencode
  - /docs/ai-gateway/coding-agents/blackbox
  - /docs/ai-gateway/coding-agents/cline
summary: Configure popular AI coding agents to use the AI Gateway for unified model access and spend monitoring.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "82acbdc4e6beccc32eb11af72769d63bedba81e382d67621ad3750c1bcc45696"
---

# Coding Agents

AI coding agents are transforming how developers write, debug, and refactor code. Route these agents through AI Gateway to get a single dashboard for spend tracking, access to any model, and automatic fallbacks, all while using the familiar interfaces of your favorite tools.

## Why route coding agents here?

| Benefit            | Without                              | With                            |
| ------------------ | ------------------------------------ | ------------------------------- |
| **Spend tracking** | Separate dashboards per provider     | Single unified view             |
| **Model access**   | Limited to agent's default models    | 200+ models from all providers  |
| **Billing**        | Multiple invoices, multiple accounts | One Vercel invoice              |
| **Reliability**    | Single point of failure              | Automatic provider fallbacks    |
| **Observability**  | Limited or no visibility             | Full request traces and metrics |

## Supported agents

### Claude Code

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) is Anthropic's agentic coding tool for the terminal. Configure it with environment variables:

```bash
export ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh"
export ANTHROPIC_API_KEY="your-ai-gateway-api-key"
```

Once configured, Claude Code works exactly as before, but requests route through the gateway.

See the [Claude Code documentation](/docs/ai-gateway/coding-agents/claude-code) for advanced configuration.

### OpenAI Codex

[OpenAI Codex](https://github.com/openai/codex) is OpenAI's terminal-based coding agent. To connect it to AI Gateway, add the following to its configuration file:

```toml filename="~/.codex/config.toml"
[model_providers.vercel]
name = "Vercel AI Gateway"
base_url = "https://ai-gateway.vercel.sh/v1"
env_key = "AI_GATEWAY_API_KEY"
wire_api = "responses"

[profiles.vercel]
model_provider = "vercel"
model = "openai/gpt-5.5"
```

Then start Codex with the Vercel profile:

```bash
codex --profile vercel
```

For full configuration options, see [Configure OpenAI Codex](/docs/ai-gateway/coding-agents/openai-codex).

### OpenCode

[OpenCode](https://opencode.ai/) is an open-source, terminal-based AI coding assistant with native support. Connect directly from within the tool:

```bash
opencode
> /connect
# Select "Vercel AI Gateway" and enter your API key
```

OpenCode automatically discovers available models and lets you switch between them on the fly.

See the [OpenCode documentation](/docs/ai-gateway/coding-agents/opencode) for more features.

### Blackbox AI

[Blackbox AI](https://blackbox.ai) is a terminal-based CLI for AI-powered code generation and debugging. Configure it with the interactive setup:

```bash
blackbox configure
# Select "Configure Providers", choose "Vercel AI Gateway", and enter your API key
```

See the [Blackbox AI documentation](/docs/ai-gateway/coding-agents/blackbox) for installation and setup.

### Cline

[Cline](https://cline.bot) is a [VS Code extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) that provides autonomous coding assistance. Configure it directly in VS Code:

1. Open the Cline settings panel
2. Select **Vercel AI Gateway** as your API Provider
3. Paste your API key
4. Choose a model from the auto-populated catalog

Cline tracks detailed metrics including reasoning tokens, cache performance, and latency.

See the [Cline documentation](/docs/ai-gateway/coding-agents/cline) for troubleshooting tips.

### Roo Code

[Roo Code](https://roocode.com) is a [VS Code extension](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline) that brings AI assistance directly into your editor. Configure it through the settings panel:

1. Click the gear icon in the Roo Code panel
2. Select **Vercel AI Gateway** as your provider
3. Enter your API key
4. Choose from hundreds of available models

Roo Code includes prompt caching support for Claude and GPT models to reduce costs.

See the [Roo Code documentation](/docs/ai-gateway/coding-agents/roo-code) for setup details.

### Conductor

[Conductor](https://conductor.build) is a Mac app that lets you run multiple Claude Code agents in parallel, each with an isolated copy of your codebase. Configure it through the settings panel:

1. Go to **Settings** -> **Env**
2. Add the environment variables under **Claude Code**
3. Set `ANTHROPIC_BASE_URL` to `https://ai-gateway.vercel.sh`

Conductor lets you review and merge changes from multiple agents in one place.

See the [Conductor documentation](/docs/ai-gateway/coding-agents/conductor) for setup details.

### Crush

[Crush](https://github.com/charmbracelet/crush) is a terminal-based AI coding assistant by Charmbracelet with LSP integration and MCP support. Configure it interactively:

```bash
crush
# Select "Vercel AI Gateway", choose a model, and enter your API Key
```

See the [Crush documentation](/docs/ai-gateway/coding-agents/crush) for installation options.

### Grok Build

[Grok Build](https://docs.x.ai/build/overview) is xAI's terminal-based coding agent. Point it at AI Gateway with two environment variables:

```bash
export GROK_MODELS_BASE_URL="https://ai-gateway.vercel.sh/v1"
export GROK_CODE_XAI_API_KEY="your-ai-gateway-api-key"
```

The in-CLI model picker is then populated from the gateway's full catalog.

See the [Grok Build documentation](/docs/ai-gateway/coding-agents/grok-build) for full setup.

### Superset

[Superset](https://superset.sh) is a terminal-first AI coding agent that works with CLI agents like Claude Code, Codex, and Cursor Agents. Configure it with environment variables:

```bash
export ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh"
export ANTHROPIC_AUTH_TOKEN="your-ai-gateway-api-key"
export ANTHROPIC_API_KEY=""
```

Superset also includes a Chat UI with built-in provider configuration.

See the [Superset documentation](/docs/ai-gateway/coding-agents/superset) for Chat UI setup.

## Getting started

1. **Get an API key**: Create one in the [AI Gateway page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=AI+Gateway)
2. **Choose your agent**: Pick from Claude Code, OpenAI Codex, OpenCode, Blackbox AI, Cline, Roo Code, Conductor, Crush, Grok Build, or Superset
3. **Configure the connection**: Point the agent to `https://ai-gateway.vercel.sh`
4. **Start coding**: Use the agent as normal - all requests route through the gateway

## Monitoring usage

Once your coding agents are connected, view usage in the [Observability section in the sidebar](https://vercel.com/dashboard/observability):

- **Spend by agent**: See how much each tool costs
- **Model usage**: Track which models your agents use most
- **Request traces**: Debug issues with full request/response logs

## Next steps

- [Set up Claude Code](/docs/ai-gateway/coding-agents/claude-code)
- [Configure OpenAI Codex](/docs/ai-gateway/coding-agents/openai-codex) with custom profiles
- [Try OpenCode](/docs/ai-gateway/coding-agents/opencode) for native integration
- [Set up Blackbox AI](/docs/ai-gateway/coding-agents/blackbox) CLI for code generation
- [Configure Cline](/docs/ai-gateway/coding-agents/cline) for autonomous coding assistance
- [Install Roo Code](/docs/ai-gateway/coding-agents/roo-code) as a VS Code extension
- [Configure Conductor](/docs/ai-gateway/coding-agents/conductor) for parallel agents
- [Configure Crush](/docs/ai-gateway/coding-agents/crush) for LSP-enhanced coding
- [Configure Grok Build](/docs/ai-gateway/coding-agents/grok-build) for xAI's terminal coding agent
- [Configure Superset](/docs/ai-gateway/coding-agents/superset) for terminal-first AI coding


---

[View full sitemap](/docs/sitemap)
