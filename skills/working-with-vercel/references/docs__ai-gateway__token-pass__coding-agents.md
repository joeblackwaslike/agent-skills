---
title: Using Token Pass with Coding and Personal Agents
product: vercel
url: /docs/ai-gateway/token-pass/coding-agents
canonical_url: "https://vercel.com/docs/ai-gateway/token-pass/coding-agents"
last_updated: 2026-10-14
type: how-to
prerequisites:
  - /docs/ai-gateway/token-pass
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/token-pass/getting-started
  - /docs/ai-gateway/coding-agents
  - /docs/environment-variables
  - /docs/ai-gateway/token-pass/models-and-routing
summary: Set up fx, Claude Code, Codex, Cline, and OpenCode to use Token Pass, and use Token Pass in agents you build yourself.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/token-pass/coding-agents.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "41bf007701b5fd492e5d7578c306dff7d59de014bbb9e082a611f860e15f6642"
---

# Using Token Pass with Coding and Personal Agents

Token Pass works in any agent that connects to AI Gateway. For each agent, you sign in with your Vercel account where the agent supports it, such as fx, or connect it with an AI Gateway API key, and then select a featured model. This page covers the agent-specific settings that decide whether a request draws from Token Pass credit.

## Before you start

Make sure that:

- Your team has an active Token Pass. See [Getting started](/docs/ai-gateway/token-pass/getting-started).
- To authenticate with an API key, `AI_GATEWAY_API_KEY` holds an AI Gateway API key (any type).

Use one of the featured model IDs:

| Model               | Model ID                       |
| ------------------- | ------------------------------ |
| Kimi K3             | `moonshotai/kimi-k3`           |
| Kimi K3.1 Pro       | `moonshotai/kimi-k3.1-pro`     |
| GLM 5.3             | `zai/glm-5.3`                  |
| GLM 5.3 Flash       | `zai/glm-5.3-flash`            |
| DeepSeek V4.1 Flash | `deepseek/deepseek-v4.1-flash` |

Token Pass credit only covers featured models. These agent settings send requests somewhere Token Pass doesn't cover, so those requests bill your AI Gateway credits instead of Token Pass credit (and fail with a `403` if you use a Token Pass-scoped key):

- **Fast mode.** Fast variants aren't featured models.
- **Background models.** Some agents send side requests, such as titles, summaries, and subagents, to a different model. Point them at a featured model too, or those requests bill AI Gateway credits.
- **Provider order.** If your agent's config routes a featured model to a provider other than `token-pass`, put `token-pass` first or remove the setting. Otherwise the request bills AI Gateway credits.

Token Pass credit applies whichever credential you use. An AI Gateway API key, a deployment's OIDC token, and signing in with your Vercel account all draw from Token Pass credit for featured models.

To configure every installed agent at once, run:

```bash filename="terminal"
npx vercel@latest ai-gateway setup
```

This creates a standard AI Gateway API key. To reuse a specific existing key instead, add `--key "$AI_GATEWAY_API_KEY"`.

## fx

Sign in with your Vercel account:

```bash filename="terminal"
fx login vercel
```

You don't need to create or manage an API key. Featured-model requests draw from your team's Token Pass credit automatically, and when that credit runs out they fall back to your team's AI Gateway credits. Sign in with a Vercel account on the team that has Token Pass.

To use an API key instead, connect fx with the setup command:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent fx
```

This exports `AI_GATEWAY_API_KEY` from your shell startup file and pins fx's `credential_source` to that key. Open a new terminal so the key loads.

In fx, run `/model` and choose `zai/glm-5.3`, `zai/glm-5.3-flash`, `moonshotai/kimi-k3`, `moonshotai/kimi-k3.1-pro`, or `deepseek/deepseek-v4.1-flash`. When you pick Kimi K3, fx preselects **Fast** in the speed step. Choose standard speed instead. If Fast is already on, run `/fast` to turn it off.

To start fx on a featured model without changing your saved default:

```bash filename="terminal"
fx --provider gateway --model zai/glm-5.3
```

To confirm Token Pass served a request, run a one-off prompt and check `resolved_provider` in the output:

```bash filename="terminal"
fx ask --json --model zai/glm-5.3 "Reply with one short sentence."
```

`resolved_provider` should be `token-pass`.

> **💡 Note:** If you set `provider_order` in `.fx.json` or `~/.fx/settings.json`, put
> `token-pass` first or remove it. Otherwise, featured-model requests bill AI
> Gateway credits.

## Claude Code

Connect Claude Code:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent claude-code
```

This points Claude Code at `https://ai-gateway.vercel.sh/claude-code` and turns on gateway model discovery, so featured models appear in `/model`.

Start Claude Code on a featured model:

```bash filename="terminal"
claude --model zai/glm-5.3
```

Claude Code also sends requests, such as background tasks and subagents, to separate model slots. By default those slots use Claude models, which Token Pass credit doesn't cover, so they bill your AI Gateway credits. To keep every request on Token Pass credit, point the slots at a featured model in `~/.claude/settings.json`:

```json filename="~/.claude/settings.json"
{
  "env": {
    "ANTHROPIC_MODEL": "zai/glm-5.3",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "zai/glm-5.3",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "zai/glm-5.3",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "zai/glm-5.3",
    "CLAUDE_CODE_SUBAGENT_MODEL": "zai/glm-5.3"
  }
}
```

Merge these keys into the `env` block the setup command wrote. Don't replace the file.

## Codex

Connect Codex:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent codex
```

Start Codex on a featured model:

```bash filename="terminal"
codex --model zai/glm-5.3
```

To make Token Pass a profile you can switch to, create `~/.codex/token-pass.config.toml`:

```toml filename="~/.codex/token-pass.config.toml"
model = "zai/glm-5.3"
```

Then run `codex --profile token-pass`. You can also switch models in a session with `/model`.

> **💡 Note:** Remove `supports_websockets = true` from the `vercel` provider in
> `~/.codex/config.toml` if you added it. WebSocket streaming only works with
> OpenAI models. Codex may also warn that it can't find metadata for non-OpenAI
> models. You can ignore that warning.

## Cline

To connect the Cline CLI and set a featured model, run:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent cline
cline auth -p vercel-ai-gateway -m zai/glm-5.3
```

To set up the Cline VS Code extension, open Cline's settings and follow these steps:

1. Set **API Provider** to **Vercel AI Gateway**.
2. Paste your AI Gateway API key.
3. Set the model to `zai/glm-5.3`, `zai/glm-5.3-flash`, `moonshotai/kimi-k3`, `moonshotai/kimi-k3.1-pro`, or `deepseek/deepseek-v4.1-flash`.

## OpenCode

Connect OpenCode:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent opencode
```

In OpenCode, run `/models` and choose GLM 5.3, GLM 5.3 Flash, Kimi K3, Kimi K3.1 Pro, or DeepSeek V4.1 Flash under Vercel AI Gateway. To make one the default, set `model` in `opencode.json`:

```json filename="opencode.json"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "vercel/zai/glm-5.3"
}
```

If `opencode.json` sets `options.order` for a featured model, put `token-pass` first or remove the entry.

## Other agents

Any agent in [Coding Agents](/docs/ai-gateway/coding-agents) can use Token Pass. Connect it with `npx vercel@latest ai-gateway setup --agent <name>`, then select a featured model ID. The rules in [Before you start](#before-you-start) apply to every agent.

## Personal agents

You can also use Token Pass in agents you build and run yourself, such as an Eve agent or an AI SDK app on your laptop or deployed to Vercel. Authenticate with an AI Gateway API key or, in a Vercel deployment, the deployment's OIDC token, then use a featured model ID:

```ts filename="agent.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'zai/glm-5.3',
  prompt: 'Summarize my open pull requests.',
});
```

The AI SDK reads `AI_GATEWAY_API_KEY` from the environment. On Vercel, add an AI Gateway API key as an [environment variable](/docs/environment-variables) on your project, or rely on the deployment's OIDC token. Both draw from Token Pass credit for featured models.

When your Token Pass credit runs out, a standard AI Gateway API key or an OIDC token falls back automatically to your team's AI Gateway credits at the serving provider's rates. No catch-and-retry code is needed. Keep enough AI Gateway credits on the team for the fallback to succeed.

The manual failover pattern below is only needed if you deliberately use a Token Pass-scoped key, which has no fallback and returns a `403` once credit runs out. This example stores the Token Pass-scoped key in `TOKEN_PASS_API_KEY` and a standard key in `AI_GATEWAY_API_KEY`:

```ts filename="agent.ts"
import { createGateway } from '@ai-sdk/gateway';
import { generateText } from 'ai';

const tokenPass = createGateway({ apiKey: process.env.TOKEN_PASS_API_KEY });
const gateway = createGateway({ apiKey: process.env.AI_GATEWAY_API_KEY });

export async function run(prompt: string) {
  try {
    return await generateText({ model: tokenPass('zai/glm-5.3'), prompt });
  } catch {
    // The Token Pass-scoped request failed, for example because credit ran out.
    // Retry with a standard key, billed to AI Gateway credits.
    return await generateText({
      model: gateway('zai/glm-5.3'),
      prompt,
      providerOptions: { gateway: { order: ['zai'] } },
    });
  }
}
```

See [When credit runs out](/docs/ai-gateway/token-pass/models-and-routing#when-credit-runs-out) for the error details.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
