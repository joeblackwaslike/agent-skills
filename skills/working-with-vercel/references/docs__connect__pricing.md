---
title: Vercel Connect Pricing
product: vercel
url: /docs/connect/pricing
canonical_url: "https://vercel.com/docs/connect/pricing"
last_updated: 2026-08-26
type: reference
prerequisites:
  - /docs/connect
related:
  - /docs/plans/hobby
  - /docs/plans/pro-plan
  - /docs/plans/enterprise
  - /docs/connect/ts-sdk-reference
  - /docs/connect/concepts/triggers
summary: How Vercel Connect is billed for token requests and triggers across plans and how to stop being billed.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/pricing.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "5794961e6c3812b2a82436caa78223089b6f82f1f74aad1ca551d106b8f4d650"
---

# Vercel Connect Pricing

Vercel Connect is billed by token requests and triggers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga?from=related&source_path=%2Fdocs%2Fconnect%2Fpricing&source_site=vercel-docs&relationship=related)
- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents?from=related&source_path=%2Fdocs%2Fconnect%2Fpricing&source_site=vercel-docs&relationship=related)
- [Pricing](https://v0.app/docs/pricing?from=related&source_path=%2Fdocs%2Fconnect%2Fpricing&source_site=vercel-docs&relationship=related) — Understand the v0 plans, pricing, and usage limits.
- [The Complete Guide to Vercel Connect](https://vercel.com/kb/guide/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fpricing&source_site=vercel-docs&relationship=related) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Microsoft, Discord, Snowflake, and Salesforce from
- [Optimizing Vercel Connect Usage](https://vercel.com/docs/connect/optimizing-usage?from=related&source_path=%2Fdocs%2Fconnect%2Fpricing&source_site=vercel-docs&relationship=related) — Reduce billed token requests and triggers by using the SDK cache effectively, tuning refresh behavior, and pruning trigg
- [Vercel Agent Pricing](https://vercel.com/docs/agent/pricing?from=related&source_path=%2Fdocs%2Fconnect%2Fpricing&source_site=vercel-docs&relationship=related) — Understand Vercel Agent pricing and how to track costs
- [Pricing on Vercel](https://vercel.com/docs/pricing?from=related&source_path=%2Fdocs%2Fconnect%2Fpricing&source_site=vercel-docs&relationship=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Account Plans on Vercel](https://vercel.com/docs/plans?from=related&source_path=%2Fdocs%2Fconnect%2Fpricing&source_site=vercel-docs&relationship=related) — Learn about the different plans available on Vercel.
- [Vercel KMS Pricing and Limits](https://vercel.com/docs/kms/pricing?from=related&source_path=%2Fdocs%2Fconnect%2Fpricing&source_site=vercel-docs&relationship=related) — How Vercel KMS is billed per signing operation, the platform limits that apply, and how to stop being billed.

Full cross-link map for this page: [/docs/connect/pricing.graph.md](/docs/connect/pricing.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fpricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

A **token request** is a single call to the Vercel Connect API that returns a provider token, for example a `getToken` call from your application or agent.

A **trigger** is an incoming webhook from a third-party service that Vercel Connect verifies and forwards to a trigger destination (a linked project).

> **💡 Note:** **Connect Beta Customers:** To give you time to adjust, both the updated token request pricing and
> trigger pricing will take effect on September 25, 2026. Until then, your current billing terms remain unchanged.

## Pricing

### Token requests

| Plan                                 | Token request pricing                                      |
| ------------------------------------ | ---------------------------------------------------------- |
| [Hobby](/docs/plans/hobby)           | 500 token requests per month included at no extra charge |
| [Pro](/docs/plans/pro-plan)          | $3.00 per 1,000 token requests                             |
| [Enterprise](/docs/plans/enterprise) | Custom                                                     |

In-process [token caching](/docs/connect/ts-sdk-reference#caching) reduces token requests significantly. The SDK reuses a cached token across calls until it falls inside the validity buffer, so a typical agent that makes many provider calls in one invocation pays for one token request, not many.

### Triggers

| Plan                                 | Trigger pricing                                       |
| ------------------------------------ | ------------------------------------------------------------- |
| [Hobby](/docs/plans/hobby)           | 1,000 triggers per month included at no extra charge  |
| [Pro](/docs/plans/pro-plan)          | $0.95 per 1,000 triggers                              |
| [Enterprise](/docs/plans/enterprise) | Custom                              |

Each trigger destination that receives the webhook event counts as one trigger. For example, a webhook event forwarded to three trigger destinations counts as three triggers. If no trigger destinations are configured, each incoming webhook event still counts as one trigger.

Triggers are only counted for connectors that support [trigger forwarding](/docs/connect/concepts/triggers). If your connector does not use triggers, you are not billed for them.

## How to stop being billed

To stop being billed for Vercel Connect:

- **Token requests:** Stop calling `getToken` from your application, remove the connector from any [linked projects](/docs/connect/concepts/project-links), and [revoke or delete](/docs/connect/concepts/tokens#revocation) existing provider tokens from the connector's settings page
- **Triggers:** Remove the webhook URL from the provider's dashboard so their webhook client stops sending events to Vercel Connect. Removing trigger destinations alone does not stop billing, because incoming webhook events still count as one trigger even without a configured destination

For platform limits and API rate limits, see [Limits](/docs/connect/limits).


---

[View full sitemap](/docs/sitemap)
