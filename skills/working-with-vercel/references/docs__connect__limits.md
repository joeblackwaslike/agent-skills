---
title: Vercel Connect Limits
product: vercel
url: /docs/connect/limits
canonical_url: "https://vercel.com/docs/connect/limits"
last_updated: 2026-08-26
type: reference
prerequisites:
  - /docs/connect
related:
  - /docs/oidc
  - /docs/connect/ts-sdk-reference
  - /docs/cli/connect
  - /docs/connect/concepts/triggers
summary: Platform limits and per-minute rate limits for Vercel Connect SDK methods, CLI commands, and public endpoints.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/limits.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "9ccf190579b4efee808aebbbaaf3816469a770b27fe5538a9901836e79b0e329"
---

# Vercel Connect Limits

## Platform limits


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga?from=related&source_path=%2Fdocs%2Fconnect%2Flimits&source_site=vercel-docs&relationship=related)
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Flimits&source_site=vercel-docs&relationship=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Authentication](https://vercel.com/docs/connect/concepts/authentication?from=related&source_path=%2Fdocs%2Fconnect%2Flimits&source_site=vercel-docs&relationship=related) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [Optimizing Vercel Connect Usage](https://vercel.com/docs/connect/optimizing-usage?from=related&source_path=%2Fdocs%2Fconnect%2Flimits&source_site=vercel-docs&relationship=related) — Reduce billed token requests and triggers by using the SDK cache effectively, tuning refresh behavior, and pruning trigg
- [Vercel Connect Pricing](https://vercel.com/docs/connect/pricing?from=related&source_path=%2Fdocs%2Fconnect%2Flimits&source_site=vercel-docs&relationship=related) — How Vercel Connect is billed for token requests and triggers across plans and how to stop being billed.
- [Get a Connect token](https://vercel.com/docs/rest-api/connect/get-a-connect-token?from=related&source_path=%2Fdocs%2Fconnect%2Flimits&source_site=vercel-docs&relationship=related) — POST /v1/connect/token/{connector} — Get an access token for a connector identified by the path parameter and scoped to
- [Limits](https://vercel.com/docs/limits?from=related&source_path=%2Fdocs%2Fconnect%2Flimits&source_site=vercel-docs&relationship=related) — Look up account limits, usage summaries, rate limits, and resource constraints for every Vercel plan.

Full cross-link map for this page: [/docs/connect/limits.graph.md](/docs/connect/limits.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Flimits&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

The following limits apply. Contact your account team if you need higher limits.

| Resource                                 | Limit                            |
| ---------------------------------------- | -------------------------------- |
| Trigger destinations per connector       | 3                                |
| Projects returned by `?include=projects` | 100 (paginated beyond)           |
| Default token validity buffer            | 30 seconds                       |
| Connector branding icon                  | PNG or JPEG, square              |

## Rate limits

Vercel Connect applies per-minute rate limits to protect shared infrastructure. Each limit resets after one minute.

Limits are scoped by **team**, **IP address**, or **connector ID**, depending on how the endpoint is accessed.

### SDK and CLI operations

SDK calls and CLI commands authenticate with your team identity (Vercel [OIDC](/docs/oidc) token, access token, or session). Rate limits are scoped per team.

#### Read operations (200 requests per minute per team)

| Operation | Interface | Description |
| --- | --- | --- |
| `getToken` | [SDK](/docs/connect/ts-sdk-reference#gettoken) | Request a provider token |
| `getTokenResponse` | [SDK](/docs/connect/ts-sdk-reference#gettokenresponse) | Request a provider token with full response metadata |
| `getConnectorMetadata` | [SDK](/docs/connect/ts-sdk-reference#getconnectormetadata) | Retrieve a connector's public metadata |
| `vercel connect list` | [CLI](/docs/cli/connect#vercel-connect-list) | List connectors for your team or project |
| `vercel connect token` | [CLI](/docs/cli/connect#vercel-connect-token) | Get a runtime token from a connector |

Dashboard reads (viewing connectors, project links, installations, observability events, and metrics) also count against this limit.

#### Write operations (50 requests per minute per team)

| Operation | Interface | Description |
| --- | --- | --- |
| `revokeToken` | [SDK](/docs/connect/ts-sdk-reference#revoketoken) | Revoke a provider grant and clear the token cache |
| `vercel connect create` | [CLI](/docs/cli/connect#vercel-connect-create) | Create a new connector |
| `vercel connect attach` | [CLI](/docs/cli/connect#vercel-connect-attach) | Link a project to a connector |
| `vercel connect detach` | [CLI](/docs/cli/connect#vercel-connect-detach) | Unlink a project from a connector |
| `vercel connect update` | [CLI](/docs/cli/connect#vercel-connect-update) | Update connector branding |
| `vercel connect remove` | [CLI](/docs/cli/connect#vercel-connect-remove) | Delete a connector |

Manual Vercel Connect Dashboard write operations (creating, updating, or deleting connectors, managing project links, and starting authorization or installation flows) also count against these limits.

### OAuth gateway (6,000 requests per minute)

These endpoints are called by external OAuth clients against Vercel Connect acting as an OAuth authorization server. They do not require Vercel user authentication. Each endpoint is rate-limited to 6,000 requests per minute, keyed as shown.

| Endpoint | Method | Keyed by | Description |
| --- | --- | --- | --- |
| `/connect/oauth/authorize` | GET | IP & Connector | Start OAuth authorization |
| `/connect/oauth/token` | POST | Connector | Exchange authorization code for tokens |
| `/connect/oauth/revoke` | POST | Connector | Revoke a token issued by Connect to an OAuth client |
| `/connect/oauth/userinfo` | GET | Connector | Retrieve user claims for an access token |

### Provider webhooks (6,000 requests per minute)

| Endpoint | Method | Keyed by | Description |
| --- | --- | --- | --- |
| `/connect/trigger/:connectorId` | POST | Connector | Receive a [webhook from a provider](/docs/connect/concepts/triggers) |

### What happens when you hit a rate limit

When you exceed a rate limit, the API returns a `429 Too Many Requests` response. Wait for the limit window to reset (one minute) before retrying.

For the SDK methods `getToken` and `getTokenResponse`, a `429` response throws an error in your application. Use in-process [token caching](/docs/connect/ts-sdk-reference#caching) to reduce the number of token requests and stay within limits.


---

[View full sitemap](/docs/sitemap)
