---
title: Coding Agents and Chat Platforms with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents"
last_updated: 2026-09-08
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/leaderboards
  - /docs/ai-gateway/coding-agents/aider
  - /docs/ai-gateway/coding-agents/claude-code
  - /docs/ai-gateway/coding-agents/cline
summary: Connect coding agents and chat platforms to AI Gateway. Configure Claude Code, Codex, Chatbox, Open WebUI, and more.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "fa36113a930b4871b4c9645ec639e6d865e5c220a36faf46ef2c5ddb7e14a275"
---

# Coding Agents and Chat Platforms with AI Gateway

Route coding agents and chat platforms through AI Gateway to share model access, track spend, and configure provider fallbacks in one place.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related)
- [10x more capacity for Laguna S 2.1 on AI Gateway](https://vercel.com/changelog/10x-more-capacity-for-laguna-s-2-1-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related)
- [Claude Fable 5.1 now available on AI Gateway](https://vercel.com/changelog/claude-fable-5-1-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related)
- [DeepSeek V4.1 Flash now available on AI Gateway](https://vercel.com/changelog/deepseek-v4-1-flash-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related)
- [DeepSeek V4 Flash now runs updated weights on AI Gateway](https://vercel.com/changelog/deepseek-v4-flash-now-runs-updated-weights-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related)
- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [AI Gateway SDKs and APIs](https://vercel.com/docs/ai-gateway/sdks-and-apis?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related) — Connect to AI Gateway with the AI SDK, Python, REST, or compatible OpenAI, Anthropic Messages, OpenResponses, and Cohere
- [Agent Resources](https://vercel.com/docs/agent-resources?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=related) — Set up AI coding tools with Vercel documentation, reusable skills, and secure access to projects, deployments, and logs.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents.graph.md](/docs/ai-gateway/coding-agents.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fcoding-agents&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Set up with the Vercel CLI

The [Vercel CLI](/docs/cli/ai-gateway#setup) is the recommended way to connect a coding agent. One command provisions or reuses an API key, writes each agent's configuration, and points every agent at the right gateway endpoint:

```bash filename="terminal"
npx vercel ai-gateway setup
```

`npx` runs Vercel CLI without installing it globally. To keep `vercel` available as a global command, install or update the CLI before running setup:

```bash filename="terminal"
npm i -g vercel@latest
vercel ai-gateway setup
```

The command detects the agents installed on your machine, shows you a diff of every planned change before it writes anything, and stores your key in the macOS Keychain instead of in plaintext config. It reuses an existing key when your configs already point at the gateway, and accepts a pasted key so you don't have to mint a new one. Model lists written into agent configs come from the [AI Gateway leaderboards](/docs/ai-gateway/leaderboards), so the defaults track what's actually being used. It also copies your existing Claude Desktop and Codex Desktop sessions so your history survives the provider switch.

Read the [full documentation for the command](/docs/cli/ai-gateway#setup).

| Agent | `--agent` value |
| --- | --- |
| [Aider](/docs/ai-gateway/coding-agents/aider) | `aider` |
| [Claude Code](/docs/ai-gateway/coding-agents/claude-code) | `claude-code` |
| [Cline](/docs/ai-gateway/coding-agents/cline) | `cline` |
| [Codex](/docs/ai-gateway/coding-agents/openai-codex) | `codex` |
| [Continue CLI](/docs/ai-gateway/coding-agents/continue) | `continue` |
| [GitHub Copilot CLI](/docs/ai-gateway/coding-agents/copilot) | `copilot` |
| [Crush](/docs/ai-gateway/coding-agents/crush) | `crush` |
| [Cursor](/docs/ai-gateway/coding-agents/cursor) | `cursor` |
| [Deep Agents CLI](/docs/ai-gateway/coding-agents/deepagents) | `deepagents` |
| [DeepSeek Harness](/docs/ai-gateway/coding-agents/deepseek) | `deepseek` |
| [Factory Droid](/docs/ai-gateway/coding-agents/droid) | `droid` |
| [ForgeCode](/docs/ai-gateway/coding-agents/forge) | `forge` |
| [fx](/docs/ai-gateway/coding-agents/fx) | `fx` |
| [Goose](/docs/ai-gateway/coding-agents/goose) | `goose` |
| [gptme](/docs/ai-gateway/coding-agents/gptme) | `gptme` |
| [Grok Build](/docs/ai-gateway/coding-agents/grok-build) | `grok` |
| [Hermes](/docs/ai-gateway/coding-agents/hermes) | `hermes` |
| [Junie CLI](/docs/ai-gateway/coding-agents/junie) | `junie` |
| [Kilo Code](/docs/ai-gateway/coding-agents/kilo-code) | `kilo` |
| [Kimi CLI](/docs/ai-gateway/coding-agents/kimi) | `kimi` |
| [omp](/docs/ai-gateway/coding-agents/omp) | `omp` |
| [OpenClaw](/docs/ai-gateway/coding-agents/openclaw) | `openclaw` |
| [OpenCode](/docs/ai-gateway/coding-agents/opencode) | `opencode` |
| [OpenHands](/docs/ai-gateway/coding-agents/openhands) | `openhands` |
| [Pi](/docs/ai-gateway/coding-agents/pi) | `pi` |
| [Qwen Code](/docs/ai-gateway/coding-agents/qwen) | `qwen` |
| [Mistral Vibe](/docs/ai-gateway/coding-agents/vibe) | `vibe` |
| [ZCode](/docs/ai-gateway/coding-agents/zcode) | `zcode` |
| [Zed](/docs/ai-gateway/coding-agents/zed) | `zed` |

Detection pre-selects the agents already installed on your machine, and `--all` covers every agent in the table. To connect a subset, name each one with `--agent <value>`.

> **💡 Note:** Every agent above also works when you configure it by hand, and the agents
> the CLI doesn't cover can only be set up that way. For the full command
> reference, including flags, key storage, session migration, and
> non-interactive output, see [`vercel
>   ai-gateway`](/docs/cli/ai-gateway#setup).

## Which base URL to use

Configuring an agent by hand means telling it where the gateway is. Unless the agent has an endpoint of its own, point it at the coding agent surface:

```bash
https://ai-gateway.vercel.sh/coding-agent/v1
```

That URL passes straight through to the standard `/v1` handlers, so auth, routing, billing, and errors are identical to the gateway's bare `/v1` surface. Prefer it anyway because it marks the traffic as coming from a coding agent. Behavior shared across harnesses can also land there without requiring another config edit. For a client that speaks the Anthropic protocol and appends `/v1/messages` itself, drop the `/v1` and use `https://ai-gateway.vercel.sh/coding-agent`.

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

## Featured agents

These featured integrations provide a starting point. The setup table above lists every agent supported by the Vercel CLI, and the sidebar lists all integration guides alphabetically.

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

### Command Code

[Command Code](https://commandcode.ai/) supports manual setup with your own AI Gateway API key and a custom base URL. Add AI Gateway as a provider in `~/.commandcode/providers.json`, using `https://ai-gateway.vercel.sh/coding-agent/v1` as the `baseURL`.

Run `/model` to select one of your configured models under **Vercel AI Gateway**.

See the [Command Code documentation](/docs/ai-gateway/coding-agents/command-code) for the provider configuration and API key setup.

### OpenCode

[OpenCode](https://opencode.ai/) is an open-source, terminal-based AI coding agent with native support. The CLI connects it for you with `--agent opencode`. You can also connect directly from within the tool:

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

[Cline](https://cline.bot) is a [VS Code extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) and CLI that provides autonomous coding assistance. The CLI connects it for you with `--agent cline`. To configure the extension by hand:

1. Open the Cline settings panel
2. Select **Vercel AI Gateway** as your API Provider
3. Paste your API key
4. Choose a model from the auto-populated catalog

Cline tracks detailed metrics including reasoning tokens, cache performance, and latency.

See the [Cline documentation](/docs/ai-gateway/coding-agents/cline) for troubleshooting tips.

### Amp

[Amp](https://ampcode.com) connects to AI Gateway through Amp's Model Routing settings. The integration is currently early access for Amp Megawatt and Gigawatt members and requires manual configuration.

See [Configure Amp with AI Gateway](/docs/ai-gateway/coding-agents/amp) for eligibility, setup, and model selection.

### Aider

[Aider](https://aider.chat) is an open-source terminal pair-programming agent. The Vercel CLI configures its AI Gateway base URL, default model, model metadata, and API key environment variable.

See [Configure Aider with AI Gateway](/docs/ai-gateway/coding-agents/aider) for manual setup, model metadata, and model selection.

### Cursor

[Cursor](https://cursor.com) is an AI-first code editor. The Vercel CLI provisions an API key and prints the values you need to finish configuration in Cursor's account-synced settings.

See [Configure Cursor with AI Gateway](/docs/ai-gateway/coding-agents/cursor) for the full setup and Cursor's BYOK limitations.

### GitHub Copilot CLI

[GitHub Copilot CLI](https://docs.github.com/en/copilot/github-copilot-in-the-cli) is GitHub's terminal coding agent. Its BYOK mode uses environment variables, so the Vercel CLI can connect it without a config file or GitHub sign-in.

See [Configure GitHub Copilot CLI with AI Gateway](/docs/ai-gateway/coding-agents/copilot) for automatic and manual setup.

## Evaluate agents with Harbor

[Harbor](/docs/ai-gateway/coding-agents/harbor) runs benchmarks such as Terminal-Bench with your choice of coding-agent harness. It supports built-in adapters, including Claude Code, Codex, fx, OpenCode, and Pi, as well as custom agents. Connect a harness to AI Gateway through its adapter's provider or compatible API settings. Configure Harbor with `harbor run`; Harbor does not have a `vercel ai-gateway setup --agent` value.

See the [Harbor guide](/docs/ai-gateway/coding-agents/harbor) for Codex, Claude Code, OpenCode, Pi, and fx examples, connection settings for more harnesses, and separate verifier credentials.

## Chat platforms

Chatbox and Open WebUI require manual configuration. OpenClaw works with `vercel ai-gateway setup --agent openclaw`:

- [Chatbox](/docs/ai-gateway/coding-agents/chatbox), a cross-platform desktop chat interface
- [Open WebUI](/docs/ai-gateway/coding-agents/open-webui), a self-hosted web interface
- [OpenClaw](/docs/ai-gateway/coding-agents/openclaw), which connects coding agents and messaging platforms

## Getting started

1. **Run the CLI**: `vercel ai-gateway setup` creates a key and configures every agent it supports. Skip to step 4 when it finishes
2. **Get an API key**: to configure a tool by hand, create a key in the [AI Gateway page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=AI+Gateway)
3. **Configure the connection**: point the tool at the endpoint named on its setup page
4. **Start using the tool**: requests now route through AI Gateway

## Monitoring usage

Once your tools are connected, view usage in the [Observability section in the sidebar](https://vercel.com/dashboard/observability):

- **Spend by tool**: See how much each tool costs
- **Model usage**: Track which models your tools use most
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
- [Configure Command Code](/docs/ai-gateway/coding-agents/command-code) with your own API key and a custom base URL
- [Install Roo Code](/docs/ai-gateway/coding-agents/roo-code) as a VS Code extension
- [Configure Conductor](/docs/ai-gateway/coding-agents/conductor) for parallel agents
- [Configure Crush](/docs/ai-gateway/coding-agents/crush) for LSP-enhanced coding
- [Configure Grok Build](/docs/ai-gateway/coding-agents/grok-build) for SpaceXAI's terminal coding agent
- [Configure Hermes](/docs/ai-gateway/coding-agents/hermes) for Nous Research's terminal coding agent
- [Configure Kilo Code](/docs/ai-gateway/coding-agents/kilo-code) as an OpenAI-compatible provider
- [Configure omp](/docs/ai-gateway/coding-agents/omp) for its inherited first-class gateway provider
- [Configure OpenClaw](/docs/ai-gateway/coding-agents/openclaw) for multi-provider routing
- [Configure Superset](/docs/ai-gateway/coding-agents/superset) for terminal-first AI coding
- [Configure Aider](/docs/ai-gateway/coding-agents/aider) for AI pair programming in git
- [Configure Continue CLI](/docs/ai-gateway/coding-agents/continue) for `cn` and IDE extensions
- [Configure GitHub Copilot CLI](/docs/ai-gateway/coding-agents/copilot) for BYOK mode
- [Configure Deep Agents CLI](/docs/ai-gateway/coding-agents/deepagents) for LangChain's terminal agent
- [Configure DeepSeek Harness](/docs/ai-gateway/coding-agents/deepseek) for DeepSeek's terminal agent
- [Configure Factory Droid](/docs/ai-gateway/coding-agents/droid) with BYOK custom models
- [Configure ForgeCode](/docs/ai-gateway/coding-agents/forge) with a custom provider
- [Configure fx](/docs/ai-gateway/coding-agents/fx) for its native gateway support
- [Configure Goose](/docs/ai-gateway/coding-agents/goose) with a custom provider
- [Configure gptme](/docs/ai-gateway/coding-agents/gptme) with a custom provider
- [Configure Junie CLI](/docs/ai-gateway/coding-agents/junie) with model profiles
- [Configure Kimi CLI](/docs/ai-gateway/coding-agents/kimi) with a `[models]` shortlist
- [Configure OpenHands](/docs/ai-gateway/coding-agents/openhands) for app and headless runs
- [Configure Qwen Code](/docs/ai-gateway/coding-agents/qwen) with model providers
- [Configure Mistral Vibe](/docs/ai-gateway/coding-agents/vibe) with a custom provider
- [Configure ZCode](/docs/ai-gateway/coding-agents/zcode) with a custom provider
- [Configure Zed](/docs/ai-gateway/coding-agents/zed) with its first-party gateway provider


---

[View full sitemap](/docs/sitemap)
