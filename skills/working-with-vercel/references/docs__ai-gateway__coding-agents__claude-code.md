---
title: Claude Code and Claude Agent SDK
product: vercel
url: /docs/ai-gateway/coding-agents/claude-code
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/claude-code"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/models-and-providers/fast-mode
summary: Use Claude Code and the Claude Agent SDK with AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/claude-code.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "e0d1c0a6b16888414ce6728c4dfcd9ef5d1009cfd9704c1297e5401eb2942157"
---

# Claude Code and Claude Agent SDK

AI Gateway provides [Anthropic-compatible API endpoints](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) so you can use [Claude Code](https://www.claude.com/product/claude-code) and the [Claude Agent SDK](https://docs.anthropic.com/en/docs/agent-sdk/overview) through a unified gateway.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to Run Claude Managed Agents with Chat SDK](https://vercel.com/kb/guide/claude-managed-agents-chat-sdk?from=related) — Learn how to pair Vercel's Chat SDK with Claude Managed Agents to run a streaming research analyst in a browser chat, us
- [Claude Code](https://ai-sdk.dev/providers/community-providers/claude-code?from=related)
- [Get started with Claude 4](https://ai-sdk.dev/cookbook/guides/claude-4?from=related)
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk?from=related) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Build an agent with Vercel and Flue](https://vercel.com/kb/guide/build-an-agent-with-vercel-and-flue?from=related) — Build and deploy an agent with Flue, Vercel Sandbox, and AI Gateway
- [How I use OpenCode with Vercel AI Gateway to build features fast](https://vercel.com/kb/guide/how-i-use-opencode-with-vercel-ai-gateway-to-build-features-fast?from=related) — How to route different AI models to different coding tasks automatically, cutting token costs by ~70% without losing qua
- [Claude Code](https://ai-sdk.dev/providers/ai-sdk-harnesses/claude-code?from=related)
- [OpenClaw](https://vercel.com/docs/ai-gateway/coding-agents/openclaw?from=related) — Learn about openclaw on Vercel.
- [OpenCode](https://vercel.com/docs/ai-gateway/coding-agents/opencode?from=related) — Use OpenCode with the AI Gateway.
- [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [OpenAI Codex](https://vercel.com/docs/ai-gateway/coding-agents/openai-codex?from=related) — Use OpenAI Codex CLI with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/claude-code.graph.md](/docs/ai-gateway/coding-agents/claude-code.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** The Vercel CLI is the recommended way to set this up. [`vercel ai-gateway
>   coding-agents setup --agent claude-code`](/docs/cli/ai-gateway#setup)
> provisions a key, writes `~/.claude/settings.json` with the [Claude Code
> compatibility endpoint](#claude-code-compatibility-endpoint), keeps the key
> in your macOS Keychain instead of plaintext config, and copies your existing
> Claude Desktop sessions across. The manual steps below are for machines where
> you'd rather configure it yourself.

> **💡 Note:** If you're routing through Bedrock or Vertex AI providers, set
> `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1` in your environment. Claude Code
> and the Agent SDK automatically add Anthropic-specific beta headers that
> Bedrock and Vertex AI don't support, which can cause errors.

## Claude Code compatibility endpoint

Point Claude Code and the Claude Agent SDK at Claude Code's own compatibility endpoint:

```bash
https://ai-gateway.vercel.sh/claude-code
```

Use it everywhere on this page. The URL takes no `/v1` suffix, because the Anthropic SDK appends `/v1/messages` itself, so adding it yourself produces a 404. To call the gateway from your own code rather than through Claude Code, see the [Anthropic Messages API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) instead.

On the `/claude-code` surface, gateway models are listed with a `claude-code/` prefix, for example `claude-code/openai/gpt-5.6-sol`, and models with a context window of 1M tokens or more carry a `[1m]` suffix. Those are display IDs for the picker: the gateway strips them before routing, so a request still bills and traces against the underlying model. Image generation models are filtered out, since Claude Code can't use them.

To turn the picker on, set `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` alongside the base URL:

```bash
export ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh/claude-code"
export CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1
```

Then run `/model` inside Claude Code to switch between gateway models. [`vercel ai-gateway coding-agents setup`](/docs/cli/ai-gateway#setup) writes both of these for you.

## Configuring Claude Code

[Claude Code](https://code.claude.com/docs) is Anthropic's agentic coding tool. You can configure it to use Vercel AI Gateway, enabling you to:

- Monitor traffic and token usage in your AI Gateway Overview
- View detailed traces in Vercel Observability under AI

- ### Configure environment variables
  First, log out if you're already logged in:
  ```bash
  claude /logout
  ```
  Next, ensure you have your AI Gateway API key handy, and configure Claude Code to use the AI Gateway by adding this to your shell configuration file, for example in `~/.zshrc` or `~/.bashrc`:
  ```bash
  export ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh/claude-code"
  export ANTHROPIC_AUTH_TOKEN="your-ai-gateway-api-key"
  export ANTHROPIC_API_KEY=""
  ```
  > **💡 Note:** Setting `ANTHROPIC_API_KEY` to an empty string is important. Claude Code
  > checks this variable first, and if it's set to a non-empty value, it will use
  > that instead of `ANTHROPIC_AUTH_TOKEN`.

- ### Run Claude Code
  Run `claude` to start Claude Code with AI Gateway:
  ```bash
  claude
  ```
  Your requests will now be routed through Vercel AI Gateway.

- ### (Optional) macOS: Secure token storage with Keychain
  If you're on a Mac and would like to manage your API key through a keychain for improved security, set your API key in the keystore with:
  ```bash
  security add-generic-password -a "$USER" -s "ANTHROPIC_AUTH_TOKEN" \
    -w "your-ai-gateway-api-key"
  ```
  and edit the `ANTHROPIC_AUTH_TOKEN` line above to:
  ```bash
  export ANTHROPIC_AUTH_TOKEN=$(
    security find-generic-password -a "$USER" -s "ANTHROPIC_AUTH_TOKEN" -w
  )
  ```
  If you need to update the API key value later, you can do it with:
  ```bash
  security add-generic-password -U -a "$USER" -s "ANTHROPIC_AUTH_TOKEN" \
    -w "new-ai-gateway-api-key"
  ```

## With Claude Code Max

If you have a [Claude subscription](https://claude.com/pricing), you can use your subscription through the AI Gateway. This allows you to leverage your existing Claude subscription while still benefiting from the gateway's observability, monitoring, and routing features.

- ### Set up environment variables
  Add the following to your shell configuration file (e.g., `~/.zshrc` or `~/.bashrc`):
  ```bash
  export ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh/claude-code"
  export ANTHROPIC_CUSTOM_HEADERS="x-ai-gateway-api-key: Bearer your-ai-gateway-api-key"
  ```
  Replace `your-ai-gateway-api-key` with your actual AI Gateway API key.

- ### Start Claude Code
  Start Claude Code:
  ```bash
  claude
  ```

- ### Log in with your Claude subscription
  If you're not already logged in, Claude Code will prompt you to authenticate. Choose **Option 1 - Claude account with subscription** and log in as normal with your Anthropic account.
  > **💡 Note:** If you encounter issues, try logging out with `claude /logout` and logging in
  > again.

Your requests will now be routed through Vercel AI Gateway using your Claude subscription. You'll be able to monitor usage and view traces in your Vercel dashboard while using your Anthropic subscription for model access.

## Enabling fast mode

[Fast mode](https://code.claude.com/docs/en/fast-mode) makes Claude Opus 4.6 and Opus 4.7 responses up to 2.5x faster at a higher per-token cost. It uses the same model with the same quality, just with a configuration that prioritizes speed.

To use fast mode with AI Gateway, set `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK`. You can either add it to your shell configuration file (e.g., `~/.zshrc` or `~/.bashrc`):

```bash
export CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK=1
```

Or add it to `~/.claude/settings.json`:

```json filename="~/.claude/settings.json"
{
  "env": {
    "CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK": "1"
  }
}
```

For Opus 4.7, also set `CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE`:

```bash
export CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE=1
export CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK=1
```

```json filename="~/.claude/settings.json"
{
  "env": {
    "CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK": "1",
    "CLAUDE_CODE_ENABLE_OPUS_4_7_FAST_MODE": "1"
  }
}
```

Then toggle fast mode on or off inside Claude Code by typing `/fast`.

Fast mode usage is billed at the fast tier rate for the model that was served. When you hit the fast mode rate limit, Claude Code automatically falls back to standard Opus speed and pricing. For current rates, see [Fast Mode](/docs/ai-gateway/models-and-providers/fast-mode#pricing).

## With the Claude Desktop app

The Claude Desktop app switches providers in its own settings, under **Developer** -> **Configure Third-Party Inference**. Point it at the same base URL and key.

Desktop records sessions per identity, so the sessions you created before the switch don't appear under the gateway identity. To bring them across, launch the desktop app once on the gateway provider, then re-run:

```bash filename="terminal"
vercel ai-gateway coding-agents setup --agent claude-code
```

The command copies each session record into the gateway identity and rewrites its model to the matching gateway ID. Your original sessions are left untouched, and re-running never duplicates a session it already copied. See [session migration](/docs/cli/ai-gateway#desktop-session-migration) for details.

## With the Claude Agent SDK

The [Claude Agent SDK](https://docs.anthropic.com/en/docs/agent-sdk/overview) (`@anthropic-ai/claude-agent-sdk`) lets you build AI agents that use the same tools and agentic loop that power Claude Code. You can route Agent SDK requests through AI Gateway by setting environment variables in the `env` option:

```ts filename="agent.ts"
import { query } from '@anthropic-ai/claude-agent-sdk';

for await (const message of query({
  prompt: 'Find and fix the bug in auth.py',
  options: {
    model: 'anthropic/claude-sonnet-5',
    allowedTools: ['Read', 'Edit', 'Bash'],
    env: {
      ...process.env,
      ANTHROPIC_BASE_URL: 'https://ai-gateway.vercel.sh/claude-code',
      ANTHROPIC_AUTH_TOKEN: 'your-ai-gateway-api-key',
      ANTHROPIC_API_KEY: '',
    },
  },
})) {
  if ('result' in message) console.log(message.result);
}
```

The Agent SDK spawns Claude Code as a subprocess, so the same environment variables apply. All requests, including messages and token counting, route through AI Gateway.


---

[View full sitemap](/docs/sitemap)
