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
  - /docs/plans/pro
  - /docs/plans/enterprise
  - /docs/connect/ts-sdk-reference
  - /docs/connect/concepts/project-links
summary: How Vercel Connect is billed across plans, how to stop being billed, and the platform limits that apply during beta.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/pricing.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "d48797cac911c2f2e24ab6822b0ec8a4475feee6a516bccd4104039af99b1420"
---

# Vercel Connect pricing and limits

Vercel Connect is billed by token request. A token request is a single call to the Vercel Connect API that returns a provider token, for example a `getToken` call from your application or agent.

## Pricing

| Plan                                 | Token request pricing                                      |
| ------------------------------------ | ---------------------------------------------------------- |
| [Hobby](/docs/plans/hobby)           | 5,000 token requests per month included at no extra charge |
| [Pro](/docs/plans/pro)               | $3 per 10,000 token requests                               |
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
