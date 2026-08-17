---
title: Vercel Connect pricing and limits
product: vercel
url: /docs/connect/pricing
canonical_url: "https://vercel.com/docs/connect/pricing"
last_updated: 2026-06-09
type: reference
prerequisites:
  - /docs/connect
related:
  - /docs/plans/hobby
  - /docs/plans/pro-plan
  - /docs/plans/enterprise
  - /docs/connect/ts-sdk-reference
  - /docs/connect/concepts/project-links
summary: How Vercel Connect is billed across plans, how to stop being billed, and the platform limits that apply during beta.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/pricing.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "140d1ece2911bde2eab89e616d9e2cb744fcaa0e4a0575a424bfc0ed0d865b6a"
---

# Vercel Connect pricing and limits

Vercel Connect is billed by token request. A token request is a single call to the Vercel Connect API that returns a provider token, for example a `getToken` call from your application or agent.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Give your agents secure access to third-party APIs](https://vercel.com/kb/guide/vercel-connect?from=related) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Discord, Notion, Figma, Snowflake, and Salesforce f
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Authentication](https://vercel.com/docs/connect/concepts/authentication?from=related) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [Tokens](https://vercel.com/docs/connect/concepts/tokens?from=related) — Short-lived provider credentials issued by Vercel Connect. Each token request specifies a subject, optional installation
- [Pricing](https://vercel.com/docs/pricing?from=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Get a Connect token](https://vercel.com/docs/rest-api/connect/get-a-connect-token?from=related)
- [Pricing and Limits](https://vercel.com/docs/queues/pricing?from=related) — Understand how Vercel Queues billing works, what's included, and which service limits apply.

Full cross-link map for this page: [/docs/connect/pricing.graph.md](/docs/connect/pricing.graph.md)
<!-- /docsgraph:related -->

## Pricing

| Plan                                 | Token request pricing                                      |
| ------------------------------------ | ---------------------------------------------------------- |
| [Hobby](/docs/plans/hobby)           | 5,000 token requests per month included at no extra charge |
| [Pro](/docs/plans/pro-plan)               | $3 per 10,000 token requests                               |
| [Enterprise](/docs/plans/enterprise) | $3 per 10,000 token requests                               |

In-process [token caching](/docs/connect/ts-sdk-reference#caching) reduces token requests significantly. The SDK reuses a cached token across calls until it falls inside the validity buffer, so a typical agent that makes many provider calls in one invocation pays for one token request, not many.

## How to stop being billed

To stop being billed for Vercel Connect:

- Stop calling `getToken` from your application
- Remove the connector from any [linked projects](/docs/connect/concepts/project-links)
- Revoke or delete existing provider tokens from the connector's settings page

## Limits

The following limits apply during beta. Contact your account team if you need higher ceilings.

| Resource                                 | Limit                            |
| ---------------------------------------- | -------------------------------- |
| Trigger destinations per connector       | 3                                |
| Projects returned by `?include=projects` | 100 (paginated beyond)           |
| Default token validity buffer            | 30 seconds                       |
| Connector branding icon                  | PNG or JPEG, square              |
| Connector types in beta                  | slack, github, oauth (+ flagged) |
| Trigger forwarding in beta               | Slack only                       |


---

[View full sitemap](/docs/sitemap)
