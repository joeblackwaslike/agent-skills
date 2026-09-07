---
title: Coding Agents
product: vercel
url: /docs/ai-gateway/coding-agents
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents"
last_updated: 2026-08-26
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/coding-agents/claude-code
  - /docs/ai-gateway/coding-agents/cline
  - /docs/ai-gateway/coding-agents/openai-codex
  - /docs/ai-gateway/coding-agents/cursor
summary: Configure popular AI coding agents to use the AI Gateway for unified model access and spend monitoring.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "8f7d8ea70e774437a4689ca7ed8aea606d998c1893ff6d08a74c31c7c5072590"
---

# Coding Agents

AI coding agents are transforming how developers write, debug, and refactor code. Route these agents through AI Gateway to get a single dashboard for spend tracking, access to any model, and automatic fallbacks, all while using the familiar interfaces of your favorite tools.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related)
- [10x more capacity for Laguna S 2.1 on AI Gateway](https://vercel.com/changelog/10x-more-capacity-for-laguna-s-2-1-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related)
- [Claude Fable 5.1 now available on AI Gateway](https://vercel.com/changelog/claude-fable-5-1-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related)
- [DeepSeek V4 Flash now runs updated weights on AI Gateway](https://vercel.com/changelog/deepseek-v4-flash-now-runs-updated-weights-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related)
- [DeepSeek V4 Flash Vision Experimental now available on AI Gateway](https://vercel.com/changelog/deepseek-v4-flash-with-vision-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related)
- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Collaborating with Anthropic on Claude Sonnet 4.5 to power intelligent coding agents](https://vercel.com/blog/collaborating-with-anthropic-on-claude-sonnet-4-5?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related)
- [Xcode](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related) — Use Xcode's coding assistant with the AI Gateway.
- [Agent Resources](https://vercel.com/docs/agent-resources?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related) — Set up AI coding tools with Vercel documentation, reusable skills, and secure access to projects, deployments, and logs.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents.graph.md](/docs/ai-gateway/coding-agents.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

The [Vercel CLI](/docs/cli/ai-gateway#setup) is the recommended way to connect a coding agent. One command provisions an API key, writes each agent's configuration, and points every agent at the right gateway endpoint:

```bash filename="terminal"
vercel ai-gateway coding-agents setup
```

The command detects the agents installed on your machine, shows you a diff of every planned change before it writes anything, and stores your key in the macOS Keychain instead of in plaintext config. It also copies your existing Claude Desktop and Codex Desktop sessions so your history survives the provider switch.

Read the [full documentation for the command](/docs/cli/ai-gateway#coding-agents).

| Agent | `--agent` value |
| --- | --- |
| [Claude Code](/docs/ai-gateway/coding-agents/claude-code) | `claude-code` |
| [Cline](/docs/ai-gateway/coding-agents/cline) | `cline` |
| [OpenAI Codex](/docs/ai-gateway/coding-agents/openai-codex) | `codex` |
| [Cursor](/docs/ai-gateway/coding-agents/cursor) | `cursor` |
| [Hermes](/docs/ai-gateway/coding-agents/hermes) | `hermes` |
| [Kilo Code](/docs/ai-gateway/coding-agents/kilo-code) | `kilo` |
| [omp](/docs/ai-gateway/coding-agents/omp) | `omp` |
| [OpenClaw](/docs/ai-gateway/coding-agents/openclaw) | `openclaw` |
| [OpenCode](/docs/ai-gateway/coding-agents/opencode) | `opencode` |
| [Pi](/docs/ai-gateway/coding-agents/pi) | `pi` |

Detection pre-selects the agents already installed on your machine, and `--all` covers every agent in the table. To connect a subset, name each one with `--agent <value>`.

> **💡 Note:** Every agent above also works when you configure it by hand, and the agents
> the CLI doesn't cover can only be set up that way. For the full command
> reference, including flags, key storage, session migration, and
> non-interactive output, see [`vercel
>   ai-gateway`](/docs/cli/ai-gateway#coding-agents).

## Which base URL to use

Configuring an agent by hand means telling it where the gateway is. Unless the agent has an endpoint of its own, point it at the coding agent surface:

```bash
https://ai-gateway.vercel.sh/coding-agent/v1
```

That URL passes straight through to the standard `/v1` handlers, so auth, routing, billing, and errors are identical to the gateway's bare `/v1` surface. Prefer it anyway: it marks the traffic as coming from a coding agent, and behavior that turns out to be shared across harnesses can land there without you editing your config again. For a client that speaks the Anthropic protocol and appends `/v1/messages` itself, drop the `/v1` and use `https://ai-gateway.vercel.sh/coding-agent`.

Three agents have a dedicated endpoint, because each needs something the generic surface doesn't do:

| Agent | Endpoint |
| --- | --- |
| [Claude Code](/docs/ai-gateway/coding-agents/claude-code) | `https://ai-gateway.vercel.sh/claude-code` |
| [OpenAI Codex](/docs/ai-gateway/coding-agents/openai-codex) | `https://ai-gateway.vercel.sh/codex/v1` |
| [Cursor](/docs/ai-gateway/coding-agents/cursor) | `https://ai-gateway.vercel.sh/cursor/v1` |

See each agent's page for what its endpoint adds. Agents with a first-party AI Gateway provider, such as Cline, OpenCode, Pi, and omp, already know the URL and only need your API key.

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

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) is Anthropic's agentic coding tool for the terminal. The CLI connects it for you with `--agent claude-code`. To configure it by hand, use environment variables:

```bash
export ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh/claude-code"
export ANTHROPIC_API_KEY=""
export ANTHROPIC_AUTH_TOKEN="your-ai-gateway-api-key"
export CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1
```

Once configured, Claude Code works exactly as before, but requests route through the gateway. `/claude-code` is Claude Code's own compatibility endpoint, and the discovery variable puts every gateway model in its `/model` picker.

See the [Claude Code documentation](/docs/ai-gateway/coding-agents/claude-code) for the dedicated Claude Code compatibility endpoint, model discovery, and advanced configuration.

### OpenAI Codex

[OpenAI Codex](https://github.com/openai/codex) is OpenAI's terminal-based coding agent. The CLI connects it for you with `--agent codex`. To configure it by hand, add the following to its configuration file:

```toml filename="~/.codex/config.toml"
model_provider = "vercel"

[model_providers.vercel]
name = "Vercel AI Gateway"
base_url = "https://ai-gateway.vercel.sh/codex/v1"
env_key = "AI_GATEWAY_API_KEY"
wire_api = "responses"
```

`/codex/v1` is Codex's own compatibility endpoint, and `wire_api = "responses"` is required, since Codex no longer speaks Chat Completions.

Then start Codex, optionally on a specific model:

```bash
codex
codex --model openai/gpt-5.5-pro
```

Codex reads the gateway catalog from `/codex/v1/models` at startup, so `/model` inside a session lists every gateway model.

For full configuration options, including the dedicated Codex compatibility endpoint and profiles, see [Configure OpenAI Codex](/docs/ai-gateway/coding-agents/openai-codex).

### OpenCode

[OpenCode](https://opencode.ai/) is an open-source, terminal-based AI coding assistant with native support. The CLI connects it for you with `--agent opencode`. You can also connect directly from within the tool:

```bash
opencode
> /connect
# Select "Vercel AI Gateway" and enter your API key
```

OpenCode automatically discovers available models and lets you switch between them on the fly.

See the [OpenCode documentation](/docs/ai-gateway/coding-agents/opencode) for more features.

### Pi

[Pi](https://github.com/earendil-works/pi) is an open-source terminal coding agent with a first-class `vercel-ai-gateway` provider, so it already knows the gateway's URL and model catalog. The CLI connects it for you with `--agent pi`, writing only the credential:

```bash filename="terminal"
vercel ai-gateway coding-agents setup --agent pi
```

See the [Pi documentation](/docs/ai-gateway/coding-agents/pi) for manual setup and model selection.

### Cursor

[Cursor](https://cursor.com) is an AI-first code editor. It keeps API-key settings in its own account-synced store, so `--agent cursor` provisions the key and walks you through the last few clicks in **Settings** -> **Models**. Set **Override OpenAI Base URL** to Cursor's own compatibility endpoint:

```bash
https://ai-gateway.vercel.sh/cursor/v1
```

See the [Cursor documentation](/docs/ai-gateway/coding-agents/cursor) for the full walkthrough and Cursor's BYOK limitations.

### Blackbox AI

[Blackbox AI](https://blackbox.ai) is a terminal-based CLI for AI-powered code generation and debugging. Configure it with the interactive setup:

```bash
blackbox configure
# Select "Configure Providers", choose "Vercel AI Gateway", and enter your API key
```

See the [Blackbox AI documentation](/docs/ai-gateway/coding-agents/blackbox) for installation and setup.

### Cline

[Cline](https://cline.bot) is a [VS Code extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) and CLI that provides autonomous coding assistance. The CLI connects it for you with `--agent cline`. To configure the extension by hand:

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
3. Set `ANTHROPIC_BASE_URL` to `https://ai-gateway.vercel.sh/coding-agent`

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

[Grok Build](https://docs.x.ai/build/overview) is SpaceXAI's terminal-based coding agent. Point it at AI Gateway with two environment variables:

```bash
export GROK_MODELS_BASE_URL="https://ai-gateway.vercel.sh/coding-agent/v1"
export GROK_CODE_XAI_API_KEY="your-ai-gateway-api-key"
```

The in-CLI model picker is then populated from the gateway's full catalog.

See the [Grok Build documentation](/docs/ai-gateway/coding-agents/grok-build) for full setup.

### Hermes

[Hermes](https://github.com/NousResearch/hermes-agent) is Nous Research's terminal-based coding agent. The CLI connects it for you with `--agent hermes`. To configure it by hand, set your key and name the provider:

```bash
export AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
hermes --provider ai-gateway -m openai/gpt-5.6-sol
```

Run `hermes model` instead to pick from the gateway's live catalog with pricing.

See the [Hermes documentation](/docs/ai-gateway/coding-agents/hermes) for fallback providers and configuration.

### Kilo Code

[Kilo Code](https://kilo.ai) is a terminal coding agent that reads a global config at `~/.config/kilo/kilo.json`. The CLI connects it for you with `--agent kilo`, adding the gateway as an OpenAI-compatible provider and keeping your key in the environment.

Kilo Code fetches the model list from the gateway automatically, so you pick a model with `/models` in a session.

See the [Kilo Code documentation](/docs/ai-gateway/coding-agents/kilo-code) for manual setup.

### omp

[omp](https://omp.sh) (oh-my-pi) is an open-source terminal coding agent forked from Pi, inheriting its first-class `vercel-ai-gateway` provider. The CLI connects it with `--agent omp`, adding only an `AI_GATEWAY_API_KEY` export to your shell profile. omp reads the key from the environment and fills its `/model` picker from the gateway catalog.

See the [omp documentation](/docs/ai-gateway/coding-agents/omp) for manual setup and model selection.

### OpenClaw

[OpenClaw](https://github.com/openclaw/openclaw) is an open-source agent gateway that routes work to multiple providers. The CLI connects it for you with `--agent openclaw`, adding a `vercel-ai-gateway` provider and a starter model list to `~/.openclaw/openclaw.json`.

See the [OpenClaw documentation](/docs/ai-gateway/coding-agents/openclaw) for manual setup and how to add more models.

### Superset

[Superset](https://superset.sh) is a terminal-first AI coding agent that works with CLI agents like Claude Code, Codex, and Cursor Agents. Configure it with environment variables:

```bash
export ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh/coding-agent"
export ANTHROPIC_AUTH_TOKEN="your-ai-gateway-api-key"
export ANTHROPIC_API_KEY=""
```

Superset also includes a Chat UI with built-in provider configuration.

See the [Superset documentation](/docs/ai-gateway/coding-agents/superset) for Chat UI setup.

## Getting started

1. **Run the CLI**: `vercel ai-gateway coding-agents setup` creates a key and configures every agent it supports. Skip to step 4 when it finishes
2. **Get an API key**: to configure an agent by hand, create a key in the [AI Gateway page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=AI+Gateway)
3. **Configure the connection**: point the agent at `https://ai-gateway.vercel.sh/coding-agent/v1`, or at the [endpoint its own page names](#which-base-url-to-use)
4. **Start coding**: use the agent as normal, and all requests route through the gateway

## Monitoring usage

Once your coding agents are connected, view usage in the [Observability section in the sidebar](https://vercel.com/dashboard/observability):

- **Spend by agent**: See how much each tool costs
- **Model usage**: Track which models your agents use most
- **Request traces**: Debug issues with full request/response logs

## Next steps

- [Connect your agents with the Vercel CLI](/docs/cli/ai-gateway#setup)
- [Set up Claude Code](/docs/ai-gateway/coding-agents/claude-code)
- [Configure OpenAI Codex](/docs/ai-gateway/coding-agents/openai-codex) with custom profiles
- [Try OpenCode](/docs/ai-gateway/coding-agents/opencode) for native integration
- [Set up Pi](/docs/ai-gateway/coding-agents/pi) for its first-class gateway provider
- [Configure Cursor](/docs/ai-gateway/coding-agents/cursor) with a custom OpenAI base URL
- [Set up Blackbox AI](/docs/ai-gateway/coding-agents/blackbox) CLI for code generation
- [Configure Cline](/docs/ai-gateway/coding-agents/cline) for autonomous coding assistance
- [Install Roo Code](/docs/ai-gateway/coding-agents/roo-code) as a VS Code extension
- [Configure Conductor](/docs/ai-gateway/coding-agents/conductor) for parallel agents
- [Configure Crush](/docs/ai-gateway/coding-agents/crush) for LSP-enhanced coding
- [Configure Grok Build](/docs/ai-gateway/coding-agents/grok-build) for SpaceXAI's terminal coding agent
- [Configure Hermes](/docs/ai-gateway/coding-agents/hermes) for Nous Research's terminal coding agent
- [Configure Kilo Code](/docs/ai-gateway/coding-agents/kilo-code) as an OpenAI-compatible provider
- [Configure omp](/docs/ai-gateway/coding-agents/omp) for its inherited first-class gateway provider
- [Configure OpenClaw](/docs/ai-gateway/coding-agents/openclaw) for multi-provider routing
- [Configure Superset](/docs/ai-gateway/coding-agents/superset) for terminal-first AI coding


---

[View full sitemap](/docs/sitemap)
