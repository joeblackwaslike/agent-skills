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
source: "https://vercel.com/docs/ai-gateway/token-pass/coding-agents.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "d730d86b9491daafe2f394daacd4039cf9d6a9e150c770ab350a66a1f4150d0e"
---

# Using Token Pass with Coding and Personal Agents

Token Pass works in any agent that connects to AI Gateway with an API key. For each agent, you connect it with your Token Pass API key and then select a featured model. This page covers the agent-specific settings that decide whether a request succeeds on Token Pass.

## Before you start

Make sure that:

- Your team has an active Token Pass. See [Getting started](/docs/ai-gateway/token-pass/getting-started).
- `AI_GATEWAY_API_KEY` holds your Token Pass API key.

Use one of the featured model IDs:

| Model               | Model ID                       |
| ------------------- | ------------------------------ |
| Kimi K3             | `moonshotai/kimi-k3`           |
| GLM 5.3             | `zai/glm-5.3`                  |
| DeepSeek V4.1 Flash | `deepseek/deepseek-v4.1-flash` |

A Token Pass API key only works with featured models. These agent settings send requests elsewhere, so those requests fail with a `403`:

- **Fast mode.** Fast variants aren't featured models.
- **Background models.** Some agents send side requests, such as titles, summaries, and subagents, to a different model. Point them at a featured model too.
- **Provider order.** If your agent's config routes a featured model to a provider other than `token-pass`, put `token-pass` first or remove the setting.

Token Pass only works with an API key. Signing in to an agent with your Vercel account doesn't use Token Pass.

To configure every installed agent at once, run:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --key "$AI_GATEWAY_API_KEY"
```

## fx

Connect fx:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent fx --key "$AI_GATEWAY_API_KEY"
```

This exports `AI_GATEWAY_API_KEY` from your shell startup file and pins fx's `credential_source` to that key. Open a new terminal so the key loads.

In fx, run `/model` and choose `zai/glm-5.3`, `moonshotai/kimi-k3`, or `deepseek/deepseek-v4.1-flash`. When you pick Kimi K3, fx preselects **Fast** in the speed step. Choose standard speed instead. If Fast is already on, run `/fast` to turn it off.

To start fx on a featured model without changing your saved default:

```bash filename="terminal"
fx --provider gateway --model zai/glm-5.3
```

To confirm Token Pass served a request, run a one-off prompt and check `resolved_provider` in the output:

```bash filename="terminal"
fx ask --json --model zai/glm-5.3 "Reply with one short sentence."
```

`resolved_provider` should be `token-pass`.

> **💡 Note:** Don't use `fx login vercel` for Token Pass, because Token Pass only works with
> an API key. If you set `provider_order` in `.fx.json` or
> `~/.fx/settings.json`, put `token-pass` first or remove it.

## Claude Code

Connect Claude Code:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent claude-code --key "$AI_GATEWAY_API_KEY"
```

This points Claude Code at `https://ai-gateway.vercel.sh/claude-code` and turns on gateway model discovery, so featured models appear in `/model`.

Start Claude Code on a featured model:

```bash filename="terminal"
claude --model zai/glm-5.3
```

Claude Code also sends requests, such as background tasks and subagents, to separate model slots. By default those slots use Claude models, which a Token Pass API key can't use. To keep every request working, point the slots at a featured model in `~/.claude/settings.json`:

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
npx vercel@latest ai-gateway setup --agent codex --key "$AI_GATEWAY_API_KEY"
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
npx vercel@latest ai-gateway setup --agent cline --key "$AI_GATEWAY_API_KEY"
cline auth -p vercel-ai-gateway -m zai/glm-5.3
```

To set up the Cline VS Code extension, open Cline's settings and follow these steps:

1. Set **API Provider** to **Vercel AI Gateway**.
2. Paste your Token Pass API key.
3. Set the model to `zai/glm-5.3`, `moonshotai/kimi-k3`, or `deepseek/deepseek-v4.1-flash`.

## OpenCode

Connect OpenCode:

```bash filename="terminal"
npx vercel@latest ai-gateway setup --agent opencode --key "$AI_GATEWAY_API_KEY"
```

In OpenCode, run `/models` and choose GLM 5.3, Kimi K3, or DeepSeek V4.1 Flash under Vercel AI Gateway. To make one the default, set `model` in `opencode.json`:

```json filename="opencode.json"
{
  "$schema": "https://opencode.ai/config.json",
  "model": "vercel/zai/glm-5.3"
}
```

If `opencode.json` sets `options.order` for a featured model, put `token-pass` first or remove the entry.

## Other agents

Any agent in [Coding Agents](/docs/ai-gateway/coding-agents) can use Token Pass. Connect it with `npx vercel@latest ai-gateway setup --agent <name> --key "$AI_GATEWAY_API_KEY"`, then select a featured model ID. The rules in [Before you start](#before-you-start) apply to every agent.

## Personal agents

You can also use Token Pass in agents you build and run yourself, such as an Eve agent or an AI SDK app on your laptop or deployed to Vercel. Authenticate with your Token Pass API key and use a featured model ID:

```ts filename="agent.ts"
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'zai/glm-5.3',
  prompt: 'Summarize my open pull requests.',
});
```

The AI SDK reads `AI_GATEWAY_API_KEY` from the environment. On Vercel, add your Token Pass API key as an [environment variable](/docs/environment-variables) on your project. A deployment's OIDC token can't spend Token Pass, so the key has to be set explicitly.

When your credit runs out, requests with the Token Pass API key fail with a `403` error until your next billing period. AI Gateway doesn't switch to paid usage for you. If a deployed agent has to keep running, catch the error and retry with a regular AI Gateway API key.

This example stores the Token Pass API key in `TOKEN_PASS_API_KEY` and the regular key in `AI_GATEWAY_API_KEY`:

```ts filename="agent.ts"
import { createGateway } from '@ai-sdk/gateway';
import { generateText } from 'ai';

const tokenPass = createGateway({ apiKey: process.env.TOKEN_PASS_API_KEY });
const gateway = createGateway({ apiKey: process.env.AI_GATEWAY_API_KEY });

export async function run(prompt: string) {
  try {
    return await generateText({ model: tokenPass('zai/glm-5.3'), prompt });
  } catch {
    // The Token Pass request failed, for example because credit ran out.
    // Retry on another provider, billed to AI Gateway credits.
    return await generateText({
      model: gateway('zai/glm-5.3'),
      prompt,
      providerOptions: { gateway: { order: ['zai'] } },
    });
  }
}
```

See [When credit runs out](/docs/ai-gateway/token-pass/models-and-routing#when-credit-runs-out) for the error details.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
