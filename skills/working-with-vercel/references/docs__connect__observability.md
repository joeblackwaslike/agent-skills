---
title: Observability
product: vercel
url: /docs/connect/observability
canonical_url: "https://vercel.com/docs/connect/observability"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/connect
related:
  - /docs/activity-log
  - /docs/plans/hobby
  - /docs/plans/pro
  - /docs/plans/enterprise
  - /docs/drains
summary: Learn about observability on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/observability.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "061cc667e75db46471702268529269b49b6d5fe54bc4c6fc76b3797cf8e3444c"
---

# Observability

Every connector has an **Observability** tab that shows runtime events for token and trigger lifecycles: who requested a token, which project used it, when a trigger arrived, and where it was forwarded.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Give your agents secure access to third-party APIs](https://vercel.com/kb/guide/vercel-connect?from=related) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Discord, Notion, Figma, Snowflake, and Salesforce f
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Authentication](https://vercel.com/docs/connect/concepts/authentication?from=related) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [Triggers](https://vercel.com/docs/connect/concepts/triggers?from=related) — Incoming webhooks from third-party services, verified by Vercel Connect and forwarded to your projects.
- [Tokens](https://vercel.com/docs/connect/concepts/tokens?from=related) — Short-lived provider credentials issued by Vercel Connect. Each token request specifies a subject, optional installation
- [SDK Reference](https://vercel.com/docs/connect/ts-sdk-reference?from=related) — API reference for @vercel/connect, the TypeScript SDK for requesting runtime tokens from Vercel Connect.
- [Overview](https://vercel.com/docs/observability?from=related) — Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application perfor

Full cross-link map for this page: [/docs/connect/observability.graph.md](/docs/connect/observability.graph.md)
<!-- /docsgraph:related -->

Observability is available on all plans. Enterprise teams also get connector audit logs and longer event retention.

## Event types

The Observability tab shows five event types:

| Event Type                       | Description                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Token Request**                | A `getToken` call or CLI `vercel connect token` invocation that returned a provider token.              |
| **Completed Authorization Request** | A user or app completed an OAuth authorization flow and obtained a grant.                            |
| **Revoked Token Request**        | A token was revoked from the dashboard, CLI, or REST API.                                               |
| **Inbound Trigger**              | A webhook event arrived directly from the provider (e.g., Slack).                                 |
| **Forward Trigger**              | Connect forwarded the inbound trigger to a registered project destination.                              |

## Filtering and searching

Use the filter menu to narrow the event list by fields like:

- **Timeline**: Select a time range from 30 minutes to 30 days, depending on your plan's retention window.
- **Event Type**: Show only token requests, triggers, authorizations, or revocations.
- **Status**: Filter by delivery status (for forward triggers).
- **Environment**: Filter by deployment environment (`production`, `preview`, `development`).
- **Project ID**: Show events from a specific linked project.
- **Subject Type**: Filter by token subject (`app`, `user`, or `jwt-bearer`).
- **Installation ID**: Narrow to a specific installation (for multi-tenant connectors).

You can also use the search bar to find events by any field value, such as a token ID or authorization ID.

## Correlation IDs

Each event carries stable identifiers you can use to trace the lifecycle of a single token or trigger across events and match Connect events to your own systems:

- **`tokenId`**: Identifies a specific issued token.
- **`authorizationId`**: Links to the OAuth authorization that produced the token.
- **`tokenGroupId`**: Groups tokens that share the same authorization context (same client, subject, environment, scopes, audience, and resources). Tokens within a group differ only in their credential values and expiry.
- **`triggerRequestId`**: Correlates an inbound trigger with its forwarded deliveries.

Select any event row to open the detail panel, where you can copy these IDs or click the filter icon to filter the event list by that value.

## Activity

The **Activity** button in the Observability toolbar opens the team [Activity Log](/docs/activity-log) pre-filtered to show configuration changes for the connector, such as when the connector was created, edited, or linked to a project.

## Event retention

How long events are retained depends on your plan:

| Plan                                 | Retention  |
| ------------------------------------ | ---------- |
| [Hobby](/docs/plans/hobby)           | 12 hours   |
| [Pro](/docs/plans/pro)               | 3 days     |
| [Enterprise](/docs/plans/enterprise) | 30 days    |

The timeline filter adapts to your plan. On Hobby, the maximum range is 12 hours. On Pro, the maximum is 3 days. On Enterprise, the maximum is 30 days.

## Drains

> **💡 Note:** Drains are available on [Pro](/docs/plans/pro) and [Enterprise](/docs/plans/enterprise) plans.

To retain Connect events beyond your plan's retention window, forward them to an external endpoint by adding a [Drain](/docs/drains). Connect drains deliver each event as a JSON webhook payload to any custom HTTP endpoint you configure.

This lets you:

- Store Connect events in your own logging or SIEM system
- Build custom dashboards and alerts around token activity
- Meet compliance requirements for long-term audit trails

To add a drain, click **Add Drain** in the Observability toolbar and provide a webhook URL. See [Working with Drains](/docs/drains) for setup details and [Pricing](/docs/drains#usage-and-pricing) for drain costs.

## Events reference

Each event delivered to a [drain](#drains) or shown in the detail panel includes the following common fields:

| Field         | Type     | Required | Description                                          |
| ------------- | -------- | -------- | ---------------------------------------------------- |
| `eventType`   | `string` | yes      | One of the five event types listed below.            |
| `timestamp`   | `number` | yes      | Unix timestamp in milliseconds.                      |
| `ownerId`     | `string` | yes      | The ID of the Vercel owner (also known as `teamId`). |
| `clientId`    | `string` | yes      | The ID of the Connect client.                        |
| `clientType`  | `string` | yes      | The type of the Connect client (e.g., `slack`, `oauth`). |
| `projectId`   | `string` | no       | The ID of the Vercel project if included in the request. |

### Token Request

Logged when a token is requested through `getToken` (SDK), `vercel connect token` (CLI), or the REST API.

| Field                  | Type     | Required | Description                                                          |
| ---------------------- | -------- | -------- | -------------------------------------------------------------------- |
| `subjectType`          | `string` | yes      | The type of the subject, e.g., `app` or `user`.                |
| `subjectId`            | `string` | no       | The ID of the subject associated with the token request.             |
| `authorizationId`      | `string` | no       | The authorization ID associated with the token.                      |
| `tokenGroupId`         | `string` | no       | Groups tokens that share the same authorization context. Tokens within a group were issued for the same client, subject, environment, scopes, audience, and resources, and differ only in their credential values and expiry.                                  |
| `tokenId`              | `string` | no       | Internal ID of the requested token. Used to deduplicate counts.      |
| `scopes`               | `string` | no       | The scopes associated with the token request.                        |
| `environment`          | `string` | no       | The project environment.                                             |
| `userId`               | `string` | no       | The Vercel user ID associated with the request.                             |
| `installationId`       | `string` | no       | The ID of the client installation associated with the token request. |
| `expiresAt`            | `number` | no       | The token expiration timestamp.                                      |
| `refreshTokenExpiresAt`| `number` | no       | The expiration timestamp of the refresh token.                       |

### Completed Authorization Request

Logged when a user or app completes an OAuth authorization flow and obtains a grant.

| Field                  | Type     | Required | Description                                                          |
| ---------------------- | -------- | -------- | -------------------------------------------------------------------- |
| `subjectType`          | `string` | yes      | The type of the subject, e.g., `app` or `user`.                |
| `subjectId`            | `string` | no       | The ID of the subject.                                               |
| `authorizationId`      | `string` | no       | The authorization ID.                                                |
| `tokenGroupId`         | `string` | no       | Groups tokens that share the same authorization context. Tokens within a group were issued for the same client, subject, environment, scopes, audience, and resources, and differ only in their credential values and expiry.                                  |
| `scopes`               | `string` | no       | The scopes granted in the authorization.                             |
| `environment`          | `string` | no       | The project environment.                                             |
| `userId`               | `string` | no       | The Vercel user ID associated with the request.                             |
| `installationId`       | `string` | no       | The ID of the client installation.                                   |
| `externalTenantId`     | `string` | no       | The external tenant ID from the provider.                            |
| `refreshTokenExpiresAt`| `number` | no       | The expiration timestamp of the refresh token.                       |

### Revoked Token Request

Logged when a token is revoked from the dashboard, CLI, or REST API.

| Field                  | Type     | Required | Description                                                          |
| ---------------------- | -------- | -------- | -------------------------------------------------------------------- |
| `subjectType`          | `string` | yes      | The type of the subject, e.g., `app` or `user`.                |
| `subjectId`            | `string` | no       | The ID of the subject.                                               |
| `authorizationId`      | `string` | no       | The authorization ID.                                                |
| `tokenId`              | `string` | no       | Internal ID of the revoked token.                                    |
| `tokenGroupId`         | `string` | no       | Groups tokens that share the same authorization context. Tokens within a group were issued for the same client, subject, environment, scopes, audience, and resources, and differ only in their credential values and expiry.                                  |
| `scopes`               | `string` | no       | The scopes associated with the revoked token.                        |
| `environment`          | `string` | no       | The project environment.                                             |
| `userId`               | `string` | no       | The Vercel user ID associated with the request.                             |
| `installationId`       | `string` | no       | The ID of the client installation.                                   |
| `tokenExpiresAt`       | `number` | no       | The expiration timestamp of the revoked token.                       |
| `refreshTokenExpiresAt`| `number` | no       | The expiration timestamp of the refresh token.                       |
| `revokedAt`            | `number` | yes      | The timestamp when the token was revoked.                            |

### Inbound Trigger

Logged when a webhook event arrives from the provider (e.g., a Slack event).

| Field              | Type     | Required | Description                                              |
| ------------------ | -------- | -------- | -------------------------------------------------------- |
| `triggerRequestId` | `string` | yes      | Internal ID for the processed event.                     |
| `bodySize`         | `number` | yes      | The body size of the event in bytes.                     |
| `externalEventId`  | `string` | no       | The event ID from the incoming request.                  |
| `externalEventType`| `string` | no       | The event type from the incoming request.                |

### Forward Trigger

Logged when Connect forwards an inbound trigger to a registered project destination.

| Field                | Type     | Required | Description                                              |
| -------------------- | -------- | -------- | -------------------------------------------------------- |
| `triggerRequestId`   | `string` | yes      | Internal ID for the processed event.                     |
| `bodySize`           | `number` | yes      | The body size of the event in bytes.                     |
| `destinationProjectId`| `string`| no      | Project ID the event is being relayed to.                |
| `destinationPath`    | `string` | no      | Path for the project the event is being relayed to.      |
| `externalEventId`    | `string` | no       | The event ID from the incoming request.                  |
| `externalEventType`  | `string` | no       | The event type from the incoming request.                |
| `status`             | `string` | yes      | The outcome of the forward trigger delivery (`success` or `error`). |
| `reason`             | `string` | no       | The reason for the status outcome, e.g., failure reason. |
| `statusCode`         | `number` | no       | The HTTP status code returned by the destination.        |


---

[View full sitemap](/docs/sitemap)
