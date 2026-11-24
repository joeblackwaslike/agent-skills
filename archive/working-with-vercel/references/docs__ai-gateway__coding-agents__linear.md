---
title: Linear Cloud Coding Agent with AI Gateway
product: vercel
url: /docs/ai-gateway/coding-agents/linear
canonical_url: "https://vercel.com/docs/ai-gateway/coding-agents/linear"
last_updated: 2026-11-13
type: how-to
prerequisites:
  - /docs/ai-gateway/coding-agents
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/cli/ai-gateway
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/observability-and-spend/budgets
summary: "Connect Linear's cloud coding agent to AI Gateway with bring your own key (BYOK). Bill Claude Code and Codex model usage to your Vercel team and..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/coding-agents/linear.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "da498080db0df17d668387b0bb73ead26b44067d4c8e9eb4d0607bafff6b0cf6"
---

# Linear Cloud Coding Agent with AI Gateway

[Linear's cloud coding agent](https://linear.app/docs/linear-cloud-coding-agent) turns Linear issues into draft pull requests by running Claude Code or Codex in a cloud sandbox. With Linear's bring your own key (BYOK) setting, you can send the agent's model requests through AI Gateway, so model usage bills to your Vercel team and appears in [AI Gateway observability](/docs/ai-gateway/observability-and-spend/observability).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway)
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [OpenCode with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/opencode) — Connect OpenCode to AI Gateway with one CLI command, or configure it in-app.
- [AI Gateway Ecosystem and Integrations](https://vercel.com/docs/ai-gateway/ecosystem) — Connect frameworks, coding tools, and billing integrations to AI Gateway. Configure app attribution and explore integrat
- [Cline with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/cline) — Connect Cline to AI Gateway through the Vercel CLI or VS Code settings. Configure model access and monitor usage and spe

Full cross-link map for this page: [/docs/ai-gateway/coding-agents/linear.graph.md](/docs/ai-gateway/coding-agents/linear.graph.md)
<!-- /docsgraph:related -->

A Linear workspace owner or admin sets up the connection once, and every new coding session in the workspace uses it. The agent runs in Linear's cloud, so the [Vercel CLI setup command](/docs/cli/ai-gateway#setup) doesn't configure it.

> **💡 Note:** BYOK means something different in each product. In Linear, BYOK replaces
> Linear credits with your own API key, which here is your AI Gateway API key.
> In AI Gateway, [BYOK](/docs/ai-gateway/authentication-and-byok/byok) adds
> your own provider credentials, such as an Anthropic or OpenAI key, to your
> Vercel team. You can use both together.

## Prerequisites

Before you connect Linear to AI Gateway, you need:

- The owner or admin role in your Linear workspace
- A Linear Free, Basic, Business, or Enterprise plan. Linear doesn't support BYOK on legacy plans
- The [cloud coding agent enabled](https://linear.app/docs/linear-cloud-coding-agent#setup) in your Linear workspace
- [Linear AI credits](https://linear.app/docs/ai-credits) in your workspace, because Linear still charges for the sandbox that runs your code
- A Vercel team with [AI Gateway Credits](/docs/ai-gateway/pricing#top-up-your-ai-gateway-credits). The free tier covers only a subset of models, so purchase credits to use any other model

## Connect Linear to AI Gateway

- ### Create an API key
  Go to the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar and click **API keys** to create a new API key.

  Create a key that only Linear uses. AI Gateway groups usage by API key, so a dedicated key shows what the Linear agent spends, and you can give it a [budget](/docs/ai-gateway/observability-and-spend/budgets#api-key-budgets) or delete it without affecting your other tools.

  New keys default to **User** [spend attribution](/docs/ai-gateway/authentication-and-byok/api-keys#spend-attribution), which counts the key's spend toward your own user budget as well as the team budget. Because the whole workspace shares this key, ask a team Owner or AI Gateway Budget Manager to change its attribution to **Team**.
  > **💡 Note:** Linear shares this key with your whole workspace. When a member leaves your
  > Vercel team, Vercel deactivates the API keys that member created. If the
  > key's creator leaves, replace the key in Linear.

- ### Open Linear's inference settings
  In Linear, go to [**Settings** > **AI & agents** > **Cloud coding agent**](https://linear.app/settings/ai/coding-sessions) and find the **Inference** section below **Agent configuration**.

  The **Anthropic** row sets the connection for Claude Code, and the **OpenAI** row sets the connection for Codex. Connect one or both. A row you don't change keeps billing model usage to Linear credits.

- ### Connect Claude Code
  In the **Anthropic** row, select **API key**. In the **Provider** dropdown, choose **Custom endpoint**, then enter these values:

  | Field | Value |
  | --- | --- |
  | **Endpoint URL** | `https://ai-gateway.vercel.sh/claude-code` |
  | **API key** | Your AI Gateway API key |

  The URL is the [Claude Code compatibility endpoint](/docs/ai-gateway/coding-agents/claude-code#claude-code-compatibility-endpoint), which serves the Anthropic Messages API that Linear requires for a custom endpoint. It takes no `/v1` suffix because Claude Code appends `/v1/messages` itself.

  Select **Test connection** to check the endpoint and key, then select **Save**. Linear validates the credentials before it saves them.

- ### Connect Codex
  In the **OpenAI** row, select **OpenAI API key** to open the **Add OpenAI API key** dialog. In the **Provider** dropdown, choose **Custom endpoint**, then enter these values:

  | Field | Value |
  | --- | --- |
  | **Endpoint URL** | `https://ai-gateway.vercel.sh/codex/v1` |
  | **API key** | Your AI Gateway API key |

  The URL is the [Codex compatibility endpoint](/docs/ai-gateway/coding-agents/openai-codex#codex-compatibility-endpoint), which serves the OpenAI Responses API that Linear requires for a custom endpoint.

  Select **Test connection**, then select **Save**.

- ### Start a coding session and verify
  Delegate an issue to Linear to start a new coding session. New sessions use the connection you saved, including sessions that a [Loop](https://linear.app/docs/loops) starts. Workspace members don't need their own keys.

  Then open [AI Gateway logs](/docs/ai-gateway/observability-and-spend/logs) and confirm that the session's requests list your API key under **Authentication**.

## How billing works

Connecting AI Gateway changes who bills you for model usage, and Linear keeps billing you for the sandbox:

| Cost | Who bills you | How |
| --- | --- | --- |
| Model usage for Claude Code and Codex | Vercel | Vercel deducts each request from your team's AI Gateway Credits at [AI Gateway rates](/docs/ai-gateway/pricing#ai-gateway-rates), which add no markup to the provider's list price |
| Sandbox runtime | Linear | Linear deducts [Linear AI credits](https://linear.app/docs/linear-cloud-coding-agent#ai-credits) based on sandbox size and runtime |

If your team also adds provider credentials through [AI Gateway BYOK](/docs/ai-gateway/authentication-and-byok/byok), the provider bills you directly for the requests that use those credentials. AI Gateway BYOK requires purchased AI Gateway Credits. When a request with your credentials fails, AI Gateway retries it with system credentials and charges that request to your credits. See [AI Gateway pricing](/docs/ai-gateway/pricing#bring-your-own-key-byok) for the surcharges that still apply to BYOK requests.

### Limit or stop AI Gateway charges

You can cap or stop the agent's AI Gateway spend in three ways:

- **Cap spend**: Set a [budget on the API key](/docs/ai-gateway/observability-and-spend/budgets#api-key-budgets). A budget is a soft cap. The request that crosses the limit still completes, then AI Gateway rejects the key's requests with an HTTP `402` response until the budget resets or you raise it. Budgets don't count spend through your own provider credentials, so a budget can't cap AI Gateway BYOK spend.
- **Switch back to Linear credits**: In Linear's **Inference** settings, switch the row from your API key back to Linear credits. The change applies to new sessions only. A session that started on AI Gateway keeps using AI Gateway, and it needs a valid key to resume.
- **Revoke access**: [Delete the API key](/docs/ai-gateway/authentication-and-byok/api-keys#delete-a-key) in Vercel. AI Gateway rejects every later request that uses the key.

## Monitor usage and spend

View the agent's requests, token usage, and cost in the [**AI Gateway**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway\&title=Go+to+AI+Gateway) section in the Vercel dashboard sidebar. The [observability documentation](/docs/ai-gateway/observability-and-spend/observability#api-keys) explains how to view usage for a single API key.

## Next steps

- Read [Linear's BYOK documentation](https://linear.app/docs/linear-cloud-coding-agent#bring-your-own-key-\(byok\))
- Set [budgets and spend alerts](/docs/ai-gateway/observability-and-spend/budgets) for your AI Gateway API key
- Add your own provider credentials with [AI Gateway BYOK](/docs/ai-gateway/authentication-and-byok/byok)
- Connect Claude Code and Codex on your own machine with the [Vercel CLI](/docs/cli/ai-gateway#setup)

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
