---
title: Vercel Agent Pricing
product: vercel
url: /docs/agent/pricing
canonical_url: "https://vercel.com/docs/agent/pricing"
last_updated: 2026-08-28
type: reference
prerequisites:
  - /docs/agent
related:
  - /docs/agent/chat
  - /docs/agent/chat/slack
  - /docs/agent/pr-review
  - /docs/agent/security-review
  - /docs/agent/investigation
summary: Understand Vercel Agent pricing and how to track costs
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent/pricing.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "ce88f7a3a1120e17645c0a0c586bd8fc2db5c87bb0c09cfe7e2159f2e50dfb26"
---

# Vercel Agent Pricing

Vercel Agent charges the underlying provider inference rate with no markup, plus a Vercel Token Rate of $0.25 per million tokens (input, output, and cached).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Vercel Agent can now validate alerts before paging](https://vercel.com/changelog/vercel-agent-can-now-validate-alerts-before-paging-you)
- [Vercel Agent investigations now included in Observability Plus](https://vercel.com/changelog/vercel-agent-investigations-now-included-in-observability-plus)
- [Vercel Agent sessions now cost 67% less](https://vercel.com/changelog/vercel-agent-sessions-now-cost-67-percent-less)
- [Vercel for Slack now in public beta](https://vercel.com/changelog/vercel-for-slack-now-in-public-beta)
- [Vercel Security Review now in public beta](https://vercel.com/changelog/vercel-security-review-public-beta)
- [Introducing Vercel Security Review](https://vercel.com/blog/vercel-security-review)
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [AI Gateway Pricing](https://vercel.com/docs/ai-gateway/pricing) — Understand AI Gateway token pricing, free and paid credits, BYOK costs, add-on charges, and payment fees. Manage credit
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Billing FAQ for Pro Plan](https://vercel.com/docs/plans/pro-plan/billing) — This page covers frequently asked questions around payments, invoices, and billing on the Pro plan.
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and

Full cross-link map for this page: [/docs/agent/pricing.graph.md](/docs/agent/pricing.graph.md)
<!-- /docsgraph:related -->

## Pricing summary

| Feature | Included usage | Pricing |
| --- | --- | --- |
| [Chat](/docs/agent/chat) | 50 messages per team member per day during the beta, excluding approved plans | Provider inference at the underlying token rate with no markup, plus $0.25 per million tokens |
| [Slack](/docs/agent/chat/slack) | Shares the Chat allowance of 50 messages per team member per day | Provider inference at the underlying token rate with no markup, plus $0.25 per million tokens |
| [Code Review](/docs/agent/pr-review) | None | Provider inference at the underlying token rate with no markup, plus $0.25 per million tokens |
| [Security Review](/docs/agent/security-review) | None | Provider inference at the underlying token rate with no markup, plus $0.25 per million tokens |
| [Vercel Agent Investigation](/docs/agent/investigation) | 10 investigations per billing cycle with Observability Plus | Additional investigations use provider inference at the underlying token rate with no markup, plus $0.25 per million tokens |
| [Installation](/docs/agent/installation) | No charge for installation | Standard usage charges for installed products still apply |

## Vercel Token Rate

The Vercel Token Rate is $0.25 per million tokens for paid Vercel Agent work. It is charged in addition to provider inference costs and applies to all tokens (input, output, and cached).

The Vercel Token Rate covers:

- Joining your project context, including logs, deployments, configuration, and runtime data
- Custom model routing and execution across your projects
- Processing and infrastructure costs

The amount you pay depends on the work required. A quick question costs less than an investigation that reads logs and configuration, runs commands in a sandbox, or writes across projects.

## Chat

Each team member gets 50 free Chat messages per day on each team during the beta. The allowance resets at 00:00 UTC. Messages you send to Vercel Agent in Slack count toward the same allowance.

A Chat message incurs charges when:

- You approve a plan that Vercel Agent proposes, even if you have free messages left
- You send more messages after you use the day's 50 free messages

A message that only proposes a plan counts like any other message. It uses one of your free messages, or incurs charges after you use the day's 50 free messages. Selecting **Cancel** on a proposed plan does not run or charge for the work described in that plan.

## Code Review

Code Review uses provider inference at the underlying token rate with no markup, plus the Vercel Token Rate of $0.25 per million tokens. The cost varies based on the complexity of the changes and the amount of code Vercel Agent analyzes.

## Security Review

Security Review uses provider inference at the underlying token rate with no markup, plus the Vercel Token Rate of $0.25 per million tokens. Security reviews are billed as Vercel Agent usage.

Reviews run per Git push event rather than per pull request, so cost scales with how often you push and how much code changed.

Fixes made with Vercel Agent from Security Review findings are separate work, billed as Vercel Agent usage at the same rate.

If your team hasn't enabled Vercel Agent usage-based billing, only a team Owner can turn on Security Review. The Owner accepts usage-based billing when they save the setting. If your team has a flexible commitment, Security Review usage counts toward that commitment instead.

## Vercel Agent Investigation

Observability Plus includes 10 investigations per billing cycle. Additional investigations use provider inference at the underlying token rate with no markup, plus the Vercel Token Rate of $0.25 per million tokens. The cost varies based on how much log and metric data Vercel Agent analyzes.

## Installation

There is no charge for using Vercel Agent Installation. Standard usage charges for installed products, such as Web Analytics or Speed Insights, still apply.

## Track costs and usage

To view Vercel Agent usage and costs:

1. Select [**Agent**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fagent%2Ftasks\&title=Open+Vercel+Agent) in the top-right corner of the dashboard.
2. Open **Usage**.
3. Select a time range and review the usage and cost information for Chat, Code Review, Security Review, and investigations.

If certain repositories, alerts, or Chat tasks consistently cost more, adjust your settings or usage patterns to control spending.

## Manage usage

An Owner or Billing member can manage Vercel Agent billing from the team's [Billing settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling\&title=Open+Billing+Settings).

To reduce new Vercel Agent usage, manage each source of automatic usage separately:

- Disable [Dashboard chat](/docs/agent/chat/dashboard#enable-or-disable-dashboard-chat) to prevent new dashboard conversations.
- Turn off [automatic Code Reviews](/docs/agent/pr-review/usage#turn-off-automatic-code-reviews) to stop automatic pull request reviews.
- Turn off Security Review in the team's [Agent settings](/docs/agent/security-review) to stop automatic security reviews of new pushes.
- Disable [Vercel Agent Investigation](/docs/agent/investigation#disable-vercel-agent-investigation) to stop automatic alert investigations.

Manual investigations and investigation reruns remain available and can create paid usage. Review the [Agent Usage page](#track-costs-and-usage) after you change a setting.

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
