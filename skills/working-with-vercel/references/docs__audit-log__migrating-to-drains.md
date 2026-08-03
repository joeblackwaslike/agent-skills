---
title: Migrating from Custom SIEM Log Streaming to Audit Log Drains
product: vercel
url: /docs/audit-log/migrating-to-drains
canonical_url: "https://vercel.com/docs/audit-log/migrating-to-drains"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/audit-log
related:
  - /docs/drains/reference/audit-logs
  - /docs/activity-log
  - /docs/drains/using-drains
  - /docs/drains/audit-logs-to-s3
  - /docs/drains/audit-logs-to-splunk
summary: Move your SIEM integration from Custom SIEM Log Streaming to Audit Log Drains, with wider event coverage and a new event schema.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/audit-log/migrating-to-drains.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "3bbe944d3c8f5ddb91f8fc40e2120f20504ead6743fe1f8f19f18de43904ce41"
---

# Migrating from Custom SIEM Log Streaming to Audit Log Drains

> **🔒 Permissions Required**: Audit Log Drains

Vercel is replacing Custom SIEM Log Streaming with [Audit Log Drains](/docs/drains/reference/audit-logs). Audit Log Drains forward the events from your [Activity Log](/docs/activity-log) including audit metadata, which covers more team activity than the legacy integration. If you stream audit logs to a Security Information and Event Management (SIEM) system today, migrate your integration to keep receiving events.

You can run Audit Log Drains and Custom SIEM Log Streaming at the same time. Keep the existing stream active while you set up and validate the drain, then remove it once your SIEM ingests the new events and schema correctly.

## What changes

| Area           | Custom SIEM Log Streaming             | Audit Log Drains                                              |
| -------------- | ------------------------------------- | ------------------------------------------------------------ |
| Setup location | Team Settings > Security & Privacy > Audit Log | [Team Settings > Drains](/docs/drains/using-drains)          |
| Event coverage | Audit log events only                 | Activity Log events plus audit metadata                      |
| Destinations   | AWS S3, Splunk, Datadog, HTTP          | Custom HTTPS endpoint, [Amazon S3](/docs/drains/audit-logs-to-s3), [Splunk](/docs/drains/audit-logs-to-splunk), Datadog, or [Panther](/docs/drains/audit-logs-to-panther) |
| Schema         | Events with `actor`, `context`, and `targets` objects | `vercel.audit_log.v1` with `actor` and `payload` objects    |

Audit Log Drains are available to all [Enterprise](/docs/plans/enterprise) teams and billed on the volume of data exported. See [Drains usage and pricing](/docs/drains#usage-and-pricing) for details.

## Migrate your integration

- ### Create an Audit Log drain
  In Team Settings, go to [**Drains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fdrains\&title=Go+to+Drains+settings), click **Add Drain**, and choose **Audit Log** as the data type. Audit Log Drains apply to the whole team, so project selection, filters, and sampling aren't available.

- ### Point the drain at your SIEM
  Choose a destination that matches your current setup:
  - **Custom endpoint**: Send events to any HTTPS endpoint with a `200 OK` response. Add custom headers for authentication and a signature secret to [verify deliveries](/docs/drains/security#secure-drains).
  - **S3 bucket**: Write events straight to Amazon S3. See [Drain Audit Logs to S3](/docs/drains/audit-logs-to-s3) for the AWS IAM setup.
  - **Splunk**: Send events to your Splunk HTTP Event Collector (HEC). See [Drain Audit Logs to Splunk](/docs/drains/audit-logs-to-splunk) for the HEC setup.
  - **Datadog**: Send events to Datadog Logs. Select your [Datadog site](https://docs.datadoghq.com/getting_started/site/) and enter a Datadog API key.
  - **Panther**: Send events to Panther's built-in Vercel source. See [Drain Audit Logs to Panther](/docs/drains/audit-logs-to-panther) for source and destination setup.
  For custom endpoints and S3, select **JSON** or **NDJSON** to match the format your SIEM expects. Splunk, Datadog, and Panther use fixed formats:
  - Splunk uses the [HEC event envelope](/docs/drains/reference/audit-logs#splunk-hec).
  - Datadog uses [JSON tagged for Datadog](/docs/drains/reference/audit-logs#datadog).
  - Panther uses the [standard Audit Log Drain JSON format](/docs/drains/reference/audit-logs#panther) with Bearer authentication.

- ### Update your SIEM parsing
  Map your existing fields to the [`vercel.audit_log.v1` schema](/docs/drains/reference/audit-logs#audit-log-schema). The `context` fields move to top-level `ipAddress` and `userAgent` fields, the previous and next state in `targets` becomes a single action-specific `payload`, and the ISO 8601 `occurred_at` becomes a `timestamp` in Unix milliseconds. Audit Log Drains also emit a different set of events than the legacy stream, so review any rules that match on specific `action` values. See [Map the schema](#map-the-schema) for the full field mapping.

- ### Test and switch over
  Use the **Test** button on the Drains page to send a sample event, then confirm your SIEM ingests it. Once events flow correctly, remove the old stream from **Security & Privacy** > **Audit Log**.

## Map the schema

Audit Log Drains send one event per audit log record. Update your SIEM field mappings:

| Custom SIEM field      | Audit Log Drains field | Notes                                          |
| ---------------------- | ---------------------- | ---------------------------------------------- |
| `occurred_at`          | `timestamp`            | Changes from an ISO 8601 string to a Unix timestamp in milliseconds |
| `action`               | `action`              | Values don't map one-to-one to the legacy actions |
| `actor.metadata.email` | `actor.email`          |                                                |
| `context.location`     | `ipAddress`            |                                                |
| `context.user_agent`   | `userAgent`            |                                                |
| `metadata.request_id`  | `requestId`            |                                                |
| `targets`              | `payload`              | Previous and next state entries become one action-specific object with native JSON values instead of JSON-encoded strings |

For full field descriptions, including fields new in the drain schema, see the [Audit Log Drains reference](/docs/drains/reference/audit-logs). With the Datadog destination, the event fields move to the top level instead of nesting under `message`, so update any Datadog pipelines, facets, or monitors that reference paths under `message`.

Audit Log Drains emit a different set of events than Custom SIEM Log Streaming. Some events are logically similar to legacy actions, but the `action` values don't follow a one-to-one renaming, so review the full list in [Events logged](/docs/activity-log#events-logged) and update any detection or routing rules that match on specific `action` values.

A migrated event looks like this:

```json
{
  "schema": "vercel.audit_log.v1",
  "id": "uev_O0Sn1S6VHTDuKJ6sNs3hLIEy",
  "teamId": "team_123",
  "action": "drain-created",
  "timestamp": 1779444000123,
  "actor": {
    "type": "user",
    "id": "user_123",
    "name": "Test User",
    "email": "test@example.com"
  },
  "requestId": "req_123",
  "payload": {
    "drainUrl": "https://example.com"
  }
}
```

## More resources

- [Audit Log Drains reference](/docs/drains/reference/audit-logs)
- [Configure Drains](/docs/drains/using-drains)
- [Drain Audit Logs to S3](/docs/drains/audit-logs-to-s3)
- [Drain Audit Logs to Splunk](/docs/drains/audit-logs-to-splunk)
- [Drain Audit Logs to Panther](/docs/drains/audit-logs-to-panther)
- [Audit Logs](/docs/audit-log)


---

[View full sitemap](/docs/sitemap)
