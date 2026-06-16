---
title: Claude Code and Claude Agent SDK
product: vercel
url: /docs/ai-gateway/coding-agents/claude-code
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/claude-code"
last_updated: 2026-05-13
type: conceptual
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-compat
summary: Use Claude Code and the Claude Agent SDK with AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/coding-agents/claude-code.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "09dc6bbaa58000fd86fc4641ad1d64e31b6997c9bbccc482743da63348b81c8c"
---

# Claude Code and Claude Agent SDK

AI Gateway provides [Anthropic-compatible API endpoints](/docs/ai-gateway/sdks-and-apis/anthropic-compat) so you can use [Claude Code](https://www.claude.com/product/claude-code) and the [Claude Agent SDK](https://docs.anthropic.com/en/docs/agent-sdk/overview) through a unified gateway.

> **💡 Note:** If you're routing through Bedrock or Vertex AI providers, set
> `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1` in your environment. Claude Code
> and the Agent SDK automatically add Anthropic-specific beta headers that
> Bedrock and Vertex AI don't support, which can cause errors.

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
  export ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh"
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
  export ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh"
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

To use fast mode with AI Gateway on Opus 4.6, set the `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK` variable. You can either add it to your shell configuration file (e.g., `~/.zshrc` or `~/.bashrc`):

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

Fast mode usage is billed as extra usage at $30/$150 per million input/output tokens, even if you have remaining usage on your plan. When you hit the fast mode rate limit, Claude Code automatically falls back to standard Opus speed and pricing.

## With the Claude Agent SDK

The [Claude Agent SDK](https://docs.anthropic.com/en/docs/agent-sdk/overview) (`@anthropic-ai/claude-agent-sdk`) lets you build AI agents that use the same tools and agentic loop that power Claude Code. You can route Agent SDK requests through AI Gateway by setting environment variables in the `env` option:

```ts filename="agent.ts"
import { query } from '@anthropic-ai/claude-agent-sdk';

for await (const message of query({
  prompt: 'Find and fix the bug in auth.py',
  options: {
    model: 'anthropic/claude-sonnet-4.6',
    allowedTools: ['Read', 'Edit', 'Bash'],
    env: {
      ...process.env,
      ANTHROPIC_BASE_URL: 'https://ai-gateway.vercel.sh',
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
