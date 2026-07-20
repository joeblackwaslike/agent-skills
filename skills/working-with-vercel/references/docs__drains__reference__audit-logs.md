---
title: Audit Log Drains Reference
product: vercel
url: /docs/drains/reference/audit-logs
canonical_url: "https://vercel.com/docs/drains/reference/audit-logs"
last_updated: 2026-07-03
type: reference
prerequisites:
  - /docs/drains
related:
  - /docs/activity-log
  - /docs/drains/using-drains
  - /docs/drains/audit-logs-to-s3
  - /docs/drains/audit-logs-to-splunk
  - /docs/drains
summary: Learn about Audit Log Drains - data formats, fields, and team activity events.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains/reference/audit-logs.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "f300c92fccc9cfeddcc892e142b184ce731325835275cd8a49473d4569597c17"
---

# Audit Log Drains Reference

> **🔒 Permissions Required**: Audit Log Drains

Audit Log Drains forward team activity events to external endpoints for storage, compliance review, and analysis. Vercel sends Audit Log events to custom HTTP endpoints over HTTPS when team activity creates audit log records.

Audit Log Drains apply to the whole team. Filtering, sampling, and project selection are not available for Audit Log Drains.

Audit Log events include the events shown in the [Activity Log](/docs/activity-log) and additional audit metadata.

## Audit Log schema

The following table describes the possible fields sent via Audit Log Drains:

| Name            | Type   | Required | Description                                                        | Example                         |
| --------------- | ------ | -------- | ------------------------------------------------------------------ | ------------------------------- |
| `schema`        | string | Yes      | Schema version identifier                                          | `vercel.audit_log.v1`           |
| `id`            | string | Yes      | Unique identifier for the audit log event                          | `uev_O0Sn1S6VHTDuKJ6sNs3hLIEy`                     |
| `teamId`        | string | No       | Identifier for the Vercel team                                     | `team_123`                      |
| `projectId`     | string | No       | Identifier for the Vercel project related to the event             | `prj_123`                       |
| `action`        | string | Yes      | Name of the action that created the audit log event                 | `drain-created`                 |
| `timestamp`     | number | Yes      | Unix timestamp in milliseconds when the event occurred              | 1779444000123                   |
| `actor`         | object | Yes      | Principal that performed the action                                | See actor fields below          |
| `actor.type`    | enum   | Yes\*    | Type of actor                                                      | `user`, `app`, `system`, or `integration` |
| `actor.id`      | string | Yes\*    | Identifier for the actor                                           | `user_123`                      |
| `actor.name`    | string | Yes\*    | Vercel username, app name, integration name, or `system` for the actor | `test-user`                     |
| `actor.email`   | string | No       | Email address for the actor                                        | `test@example.com`              |
| `via`           | array  | No       | Delegation chain for actions performed through another actor        | See via fields below            |
| `via[].type`    | enum   | Yes\*\*  | Type of delegated actor                                            | `app`                           |
| `via[].id`      | string | Yes\*\*  | Identifier for the delegated actor                                 | `app_123`                       |
| `via[].name`    | string | Yes\*\*  | Display name for the delegated actor                               | `Test App`                      |
| `via[].email`   | string | No       | Email address for the delegated actor                              | `app-user@example.com`          |
| `requestId`     | string | No       | Identifier for the request that triggered the event                 | `req_123`                       |
| `userAgent`     | string | No       | User agent from the request that triggered the event                | `Mozilla/5.0...`                |
| `ipAddress`     | string | No       | IP address from the request that triggered the event                | `203.0.113.42`                  |
| `tokenId`       | string | No       | Identifier for the token used to authenticate the request           | `token_123`                     |
| `payload`       | object | Yes      | Event-specific metadata for the action. This object can be empty    | `{ "drainUrl": "https://example.com" }` |

\*Required when `actor` is present.

\*\*Required for each object in the `via` array.

## Format

Vercel supports the following formats for Audit Log Drains. You can configure the format when [configuring the Drain destination](/docs/drains/using-drains#configure-destination).

Audit Log Drains can also write events directly to Amazon S3. See [Drain Audit Logs to S3](/docs/drains/audit-logs-to-s3) for AWS IAM setup, file structure, and destination fields.

To send Audit Logs to Splunk over the HTTP Event Collector, see [Drain Audit Logs to Splunk](/docs/drains/audit-logs-to-splunk).

### JSON

Vercel sends Audit Log data as JSON arrays containing event objects:

```json
[
  {
    "schema": "vercel.audit_log.v1",
    "id": "uev_O0Sn1S6VHTDuKJ6sNs3hLIEy",
    "teamId": "team_123",
    "projectId": "prj_123",
    "action": "drain-created",
    "timestamp": 1779444000123,
    "actor": {
      "type": "user",
      "id": "user_123",
      "name": "Test User",
      "email": "test@example.com"
    },
    "via": [
      {
        "type": "app",
        "id": "app_123",
        "name": "Test App"
      }
    ],
    "requestId": "req_123",
    "payload": {
      "drainUrl": "https://example.com"
    }
  },
  {
    "schema": "vercel.audit_log.v1",
    "id": "uev_O0Sn1S6VHTDuKJ6sNs3hLIEz",
    "teamId": "team_123",
    "action": "team-updated",
    "timestamp": 1779444000456,
    "actor": {
      "type": "system",
      "id": "system",
      "name": "System"
    },
    "payload": {}
  }
]
```

### NDJSON

Vercel sends Audit Log data as newline-delimited JSON objects:

```json
{"schema":"vercel.audit_log.v1","id":"uev_O0Sn1S6VHTDuKJ6sNs3hLIEy","teamId":"team_123","projectId":"prj_123","action":"drain-created","timestamp":1779444000123,"actor":{"type":"user","id":"user_123","name":"Test User","email":"test@example.com"},"via":[{"type":"app","id":"app_123","name":"Test App"}],"requestId":"req_123","payload":{"drainUrl":"https://example.com"}}
{"schema":"vercel.audit_log.v1","id":"uev_O0Sn1S6VHTDuKJ6sNs3hLIEz","teamId":"team_123","action":"team-updated","timestamp":1779444000456,"actor":{"type":"system","id":"system","name":"System"},"payload":{}}
```

### Splunk (HEC)

When the destination is Splunk, Vercel wraps each event in the [Splunk HTTP Event Collector event envelope](https://help.splunk.com/en/data-management/collect-http-event-data/use-hec-in-splunk-cloud-platform/format-events-for-http-event-collector). The `time` field is the event time in epoch seconds with millisecond precision, and the `event` field contains the audit log event. Vercel tags each envelope with the `vercel` source and the `vercel:audit_log` source type:

```json
{"time":1779444000.123,"source":"vercel","sourcetype":"vercel:audit_log","event":{"schema":"vercel.audit_log.v1","id":"uev_O0Sn1S6VHTDuKJ6sNs3hLIEy","teamId":"team_123","action":"drain-created","timestamp":1779444000123,"actor":{"type":"user","id":"user_123","name":"Test User"},"payload":{"drainUrl":"https://example.com"}}}
```

See [Drain Audit Logs to Splunk](/docs/drains/audit-logs-to-splunk) for HEC setup and destination fields.

### Datadog

When the destination is Datadog, Vercel sends events as JSON to the [Datadog Logs API](https://docs.datadoghq.com/api/latest/logs/) for your selected [Datadog site](https://docs.datadoghq.com/getting_started/site/). Each event contains the audit log fields at the top level, tagged with `ddsource` set to `vercel` and `service` set to `audit-logs` so you can filter and route Vercel audit log events in Datadog.

## Audit Log actions

The `action` value identifies the team activity that created the audit log event. For the full list of `action` values, see [Events logged](/docs/activity-log#events-logged).

The `payload` object contains action-specific metadata. Its fields depend on the `action` value.

## More resources

For more information on Audit Log Drains and how to use them, check out the following resources:

- [Drains overview](/docs/drains)
- [Configure Drains](/docs/drains/using-drains)
- [Drain Audit Logs to S3](/docs/drains/audit-logs-to-s3)
- [Drain Audit Logs to Splunk](/docs/drains/audit-logs-to-splunk)
- [Audit Logs](/docs/audit-log)
- [Migrating from Custom SIEM Log Streaming](/docs/audit-log/migrating-to-drains)


---

[View full sitemap](/docs/sitemap)
