---
title: Vercel Agent Pricing
product: vercel
url: /docs/agent/pricing
canonical_url: "https://vercel.com/docs/agent/pricing"
last_updated: 2026-08-19
type: reference
prerequisites:
  - /docs/agent
related:
  - /docs/agent/chat
  - /docs/agent/chat/slack
  - /docs/agent/pr-review
  - /docs/agent/investigation
  - /docs/agent/installation
summary: Understand Vercel Agent pricing and how to track costs
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/pricing.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "d941c9fcb2d0ffd4caf25108546fde65c5b286eb8b15ad561ac9361d3dd2be73"
---

# Vercel Agent Pricing

Vercel Agent charges the underlying provider inference rate with no markup, plus a Vercel Token Rate of $0.25 per million tokens.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=related) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Vercel Agent investigations now included in Observability Plus](https://vercel.com/changelog/vercel-agent-investigations-now-included-in-observability-plus?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=related)
- [Vercel for Slack now in public beta](https://vercel.com/changelog/vercel-for-slack-now-in-public-beta?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=related)
- [Using Vercel Agent to review pull requests](https://vercel.com/kb/guide/vercel-agent-code-review?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=related) — Set up Vercel Agent Code Review to automatically review pull requests, apply validated fixes, request reviews with @verc
- [Vercel Agent has updated pricing](https://vercel.com/changelog/vercel-agent-has-updated-pricing?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=related)
- [Pricing](https://v0.app/docs/pricing?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=related) — Understand the v0 plans, pricing, and usage limits.
- [An expanded Vercel Agent: chat, investigations, and approved actions, now in public beta](https://vercel.com/changelog/an-expanded-vercel-agent-chat-investigations-and-approved-actions-now-in-public-beta?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=related)
- [Pricing on Vercel](https://vercel.com/docs/pricing?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Pricing and Limits](https://vercel.com/docs/eve/pricing?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=related) — Understand how eve usage maps to Vercel resources and inherited platform limits.
- [AI Gateway Pricing](https://vercel.com/docs/ai-gateway/pricing?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=related) — Learn about pricing for AI Gateway.
- [Vercel Connect Pricing](https://vercel.com/docs/connect/pricing?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=related) — How Vercel Connect is billed for token requests and triggers across plans and how to stop being billed.
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y

Full cross-link map for this page: [/docs/agent/pricing.graph.md](/docs/agent/pricing.graph.md?from=related&source_path=%2Fdocs%2Fagent%2Fpricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Pricing summary

| Feature | Included usage | Pricing |
| --- | --- | --- |
| [Chat](/docs/agent/chat) | A limited number of simple requests during the beta | Provider inference at the underlying token rate with no markup, plus $0.25 per million tokens |
| [Slack](/docs/agent/chat/slack) | A limited number of simple requests during the beta | Provider inference at the underlying token rate with no markup, plus $0.25 per million tokens |
| [Code Review](/docs/agent/pr-review) | None | Provider inference at the underlying token rate with no markup, plus $0.25 per million tokens |
| [Vercel Agent Investigation](/docs/agent/investigation) | 10 investigations per billing cycle with Observability Plus | Additional investigations use provider inference at the underlying token rate with no markup, plus $0.25 per million tokens |
| [Installation](/docs/agent/installation) | No charge for installation | Standard usage charges for installed products still apply |

## Vercel Token Rate

The Vercel Token Rate is $0.25 per million tokens for paid Vercel Agent work. It is charged in addition to provider inference costs and applies to input, output, and cached tokens.

The Vercel Token Rate covers:

- Joining your project context, including logs, deployments, configuration, and runtime data
- Custom model routing and execution across your projects
- Processing and infrastructure costs

The amount you pay depends on the work required. A quick question costs less than an investigation that reads logs and configuration, runs commands in a sandbox, or writes across projects.

## Chat

Simple requests, such as finding a setting, explaining a DNS warning, or answering a documentation question, are included up to a limited number of messages during the beta.

A Chat response incurs charges when:

- The response requires Vercel Agent to investigate, plan, or write code
- You continue using Chat after the included messages are used

Selecting **Cancel** on a proposed plan does not run or charge for the work described in that plan.

## Code Review

Code Review uses provider inference at the underlying token rate with no markup, plus the Vercel Token Rate of $0.25 per million tokens. The cost varies based on the complexity of the changes and the amount of code Vercel Agent analyzes.

## Vercel Agent Investigation

Observability Plus includes 10 investigations per billing cycle. Additional investigations use provider inference at the underlying token rate with no markup, plus the Vercel Token Rate of $0.25 per million tokens. The cost varies based on how much log and metric data Vercel Agent analyzes.

## Installation

There is no charge for using Vercel Agent Installation. Standard usage charges for installed products, such as Web Analytics or Speed Insights, still apply.

## Track costs and usage

To view Vercel Agent usage and costs:

1. Select [**Agent**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fagent\&title=Open+Vercel+Agent) in the top-right corner of the dashboard.
2. Open **Usage**.
3. Select a time range and review the usage and cost information for Chat, Code Review, and investigations.

If certain repositories, alerts, or Chat tasks consistently cost more, adjust your settings or usage patterns to control spending.

## Manage usage

An Owner or Billing member can manage Vercel Agent billing from the team's [Billing settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling\&title=Open+Billing+Settings).

To reduce new Vercel Agent usage, manage each source of automatic usage separately:

- Disable [Dashboard chat](/docs/agent/chat/dashboard#enable-or-disable-dashboard-chat) to prevent new dashboard conversations.
- Turn off [automatic Code Reviews](/docs/agent/pr-review/usage#turn-off-automatic-code-reviews) to stop automatic pull request reviews. Manual reviews and explicit `@vercel` requests remain available and can create paid usage.
- Disable [Vercel Agent Investigation](/docs/agent/investigation#disable-vercel-agent-investigation) to stop automatic alert investigations.

Manual investigations and investigation reruns remain available and can create paid usage. Review the [Agent Usage page](#track-costs-and-usage) after you change a setting.


---

[View full sitemap](/docs/sitemap)
