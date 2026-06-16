---
title: API Reference
product: vercel
url: /docs/queues/api
canonical_url: "https://vercel.com/docs/queues/api"
last_updated: 2026-04-06
type: reference
prerequisites:
  - /docs/queues
related:
  - /docs/regions
  - /docs/queues/concepts
summary: HTTP API reference for Vercel Queues. Publish, consume, acknowledge, and manage messages.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/queues/api.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "94a0e901b6773822c9b436f3c58c6d875178ea4df1ddf7760baacb5c0998efd6"
---

# API Reference

The Vercel Queues API is a REST API for publishing, consuming, and managing messages. Endpoints are accessed through region-specific domains in the format `https://{region}.vercel-queue.com/api/v3`, where `{region}` is a [Vercel region code](/docs/regions#region-list) (for example, `iad1`, `fra1`, `sfo1`).

## Authentication

All endpoints require a Vercel OIDC token in the `Authorization` header:

```bash
Authorization: Bearer <vercel-oidc-token>
```

The token is a JWT verified against Vercel's JWKS endpoint. It contains claims for your team, project, and environment, which are used to scope all requests.

## Common headers

The following headers are used across multiple endpoints:

| Header              | Type     | Required | Default | Description                                                                                                                                           |
| ------------------- | -------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`     | `string` | Yes      | -       | `Bearer <vercel-oidc-token>`                                                                                                                          |
| `Vqs-Deployment-Id` | `string` | No       | -       | Deployment ID for [per-deployment isolation](/docs/queues/concepts#deployments-and-versioning). When omitted, requests operate in deploymentless mode |

## Naming constraints

Topic names and consumer group names must match the pattern `^[A-Za-z0-9_\-]+$` (alphanumeric characters, hyphens, and underscores only).

## Region routing

Each region has its own domain. Use the region code as a subdomain to route requests to a specific region:

```bash
POST https://fra1.vercel-queue.com/api/v3/topic/orders
```

Messages sent to one region cannot be consumed from another. For example, a message published to `iad1` can only be read by consumers in `iad1`. See the [regions documentation](/docs/regions#region-list) for the full list of available region codes.

## Endpoints

### SendMessage

**`POST /api/v3/topic/{topic}`**

Publishes a message to a topic. The request body is the raw message payload.

#### Request headers

| Header                  | Type      | Required | Default      | Description                                                                                   |
| ----------------------- | --------- | -------- | ------------ | --------------------------------------------------------------------------------------------- |
| `Content-Type`          | `string`  | No       | -            | MIME type of the message payload. Preserved and returned to consumers                         |
| `Vqs-Retention-Seconds` | `integer` | No       | 24 hours     | Message TTL. Minimum 60 seconds, maximum 7 days (604,800 seconds)                             |
| `Vqs-Delay-Seconds`     | `integer` | No       | Zero seconds | Delay before message becomes visible. Maximum 7 days (604,800 seconds), capped at message TTL |
| `Vqs-Idempotency-Key`   | `string`  | No       | -            | Deduplication key. Duplicate messages are silently dropped out-of-band                        |

#### Request body

Raw binary payload. The entire request body is stored as the message content.

#### Response

**`201 Created`** — Message stored and delivered to consumers:

```json
{
  "messageId": "msg_abc123..."
}
```

The `Vqs-Message-Id` response header also contains the assigned message ID.

**`202 Accepted`** — Message stored but delivery is deferred. This happens during [regional failover](/docs/queues/concepts#failover), when the message is temporarily stored in a neighboring region and will be relocated and delivered once the target region recovers:

```json
{
  "deferred": true
}
```

> **💡 Note:** Message IDs are opaque strings. Do not assume a specific length, format, or structure. The values shown in this documentation are illustrative.

#### Idempotency

When you provide `Vqs-Idempotency-Key`, Vercel deduplicates based on a hash of the key. Deduplication is handled out-of-band, so `SendMessage` always returns successfully. The duplicate message is silently dropped before it reaches any consumer. The original message continues to be delivered with at-least-once semantics.

If you use [ReceiveMessageById](#receivemessagebyid) to fetch a duplicate by its ID, the endpoint returns `409` with the `originalMessageId`, allowing you to follow the redirect to the original message.

The deduplication window lasts for the entire lifetime of the original message (up to its TTL), so you're protected from duplicates for the full retention period.

#### Error responses

| Status | Description                                   |
| ------ | --------------------------------------------- |
| `400`  | Invalid topic name, retention, or delay value |
| `401`  | Missing or invalid authentication token       |
| `429`  | Rate limited                                  |

***

### ReceiveMessages

**`POST /api/v3/topic/{topic}/consumer/{consumer}`**

Receives available messages from the topic for the specified consumer group. Returns immediately with available messages, or `204 No Content` if the topic is empty.

#### Request headers

| Header                           | Type      | Required | Default    | Description                                                                                                  |
| -------------------------------- | --------- | -------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| `Accept`                         | `string`  | **Yes**  | -          | Response format: `multipart/mixed` or `application/x-ndjson`                                                 |
| `Vqs-Max-Messages`               | `integer` | No       | `1`        | Maximum messages to return. Min: `1`, max: `10`                                                              |
| `Vqs-Visibility-Timeout-Seconds` | `integer` | No       | 60 seconds | Duration that received messages are hidden from other consumers. Set to zero seconds to peek without leasing |
| `Vqs-Max-Concurrency`            | `integer` | No       | Unlimited  | Maximum messages in-flight simultaneously for this consumer group. Returns `429` when exceeded               |

#### Response formats

The `Accept` header controls the response format. **`multipart/mixed` is recommended** for best performance as it supports true streaming of binary payloads without encoding overhead. `application/x-ndjson` is provided for compatibility with clients that cannot parse multipart responses. When both formats are specified, `multipart/mixed` takes precedence.

**`multipart/mixed` (recommended)**

Each message is a separate MIME part with the following headers:

| Header               | Type      | Description                                                   |
| -------------------- | --------- | ------------------------------------------------------------- |
| `Content-Type`       | `string`  | Original MIME type of the message payload                     |
| `Vqs-Message-Id`     | `string`  | Unique message identifier                                     |
| `Vqs-Receipt-Handle` | `string`  | Opaque handle for acknowledging or extending the lease        |
| `Vqs-Delivery-Count` | `integer` | Number of times this message has been delivered (starts at 1) |
| `Vqs-Timestamp`      | `string`  | ISO 8601 timestamp of when the message was sent               |
| `Vqs-Expires-At`     | `string`  | ISO 8601 timestamp of when the message expires                |

Example response:

```http
--vqs-boundary-550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json
Vqs-Message-Id: msg_abc123...
Vqs-Receipt-Handle: rh_xyz789...
Vqs-Delivery-Count: 1
Vqs-Timestamp: 2026-01-13T12:00:00.000Z
Vqs-Expires-At: 2026-01-14T12:00:00.000Z

{"order": "12345", "action": "process"}
--vqs-boundary-550e8400-e29b-41d4-a716-446655440000--
```

**`application/x-ndjson` (compatibility)**

Provided for clients that cannot parse multipart responses. Payloads are base64-encoded, which adds overhead compared to `multipart/mixed`. One JSON object per line:

```json
{"messageId":"msg_abc123...","receiptHandle":"rh_xyz789...","deliveryCount":1,"timestamp":"2026-01-13T12:00:00.000Z","expiresAt":"2026-01-14T12:00:00.000Z","contentType":"application/json","body":"eyJvcmRlciI6ICIxMjM0NSJ9"}
```

| Field           | Type      | Description                                            |
| --------------- | --------- | ------------------------------------------------------ |
| `messageId`     | `string`  | Unique message identifier                              |
| `receiptHandle` | `string`  | Opaque handle for acknowledging or extending the lease |
| `deliveryCount` | `integer` | Number of times this message has been delivered        |
| `timestamp`     | `string`  | ISO 8601 timestamp of when the message was sent        |
| `expiresAt`     | `string`  | ISO 8601 timestamp of when the message expires         |
| `contentType`   | `string`  | Original MIME type of the message payload              |
| `body`          | `string`  | Base64-encoded message payload                         |

**`204 No Content`** is returned when no messages are available.

#### Error responses

| Status | Description                                                |
| ------ | ---------------------------------------------------------- |
| `400`  | Missing or unsupported `Accept` header, invalid parameters |
| `401`  | Missing or invalid authentication token                    |
| `429`  | Concurrency limit exceeded or rate limited                 |

***

### ReceiveMessageById

**`POST /api/v3/topic/{topic}/consumer/{consumer}/id/{messageId}`**

Receives a specific message by its ID and claims it for the consumer group. Useful for callback-driven processing where the message ID is known in advance.

#### Request headers

| Header                           | Type      | Required | Default    | Description                                                              |
| -------------------------------- | --------- | -------- | ---------- | ------------------------------------------------------------------------ |
| `Accept`                         | `string`  | **Yes**  | -          | Response format: `multipart/mixed` or `application/x-ndjson`             |
| `Vqs-Visibility-Timeout-Seconds` | `integer` | No       | 60 seconds | Lease duration. Minimum zero seconds, maximum 60 minutes (3,600 seconds) |
| `Vqs-Max-Concurrency`            | `integer` | No       | Unlimited  | Maximum concurrent in-flight messages for this consumer group            |

#### Response

**`200 OK`** with the same format as [ReceiveMessages](#receivemessages), containing one message.

#### Error responses

| Status | Description                                                                            |
| ------ | -------------------------------------------------------------------------------------- |
| `400`  | Invalid parameters or topic name                                                       |
| `401`  | Missing or invalid authentication token                                                |
| `404`  | Message not found                                                                      |
| `409`  | Message locked by another consumer, or duplicate message (returns `originalMessageId`) |
| `410`  | Message already acknowledged                                                           |
| `429`  | Concurrency limit exceeded or rate limited                                             |

***

### AcknowledgeMessage

**`DELETE /api/v3/topic/{topic}/consumer/{consumer}/lease/{receiptHandle}`**

Acknowledges successful processing of a message. The message is permanently removed from the consumer group's view.

The `receiptHandle` must be URL-encoded in the path.

#### Request body

None.

#### Response

**`204 No Content`**

#### Error responses

| Status | Description                                 |
| ------ | ------------------------------------------- |
| `400`  | Invalid topic name or receipt handle format |
| `401`  | Missing or invalid authentication token     |
| `404`  | Message not found or already acknowledged   |
| `409`  | Lease expired or receipt handle mismatch    |
| `429`  | Rate limited                                |

***

### ExtendLease

**`PATCH /api/v3/topic/{topic}/consumer/{consumer}/lease/{receiptHandle}`**

Extends the [visibility timeout](/docs/queues/concepts#visibility-timeout) on a currently leased message. Use this to request more processing time before the lease expires.

An alternate URL for the same operation is also available:

**`PATCH /api/v3/topic/{topic}/consumer/{consumer}/lease/{receiptHandle}/visibility`**

The `receiptHandle` must be URL-encoded in the path.

#### Request body

```json
{
  "visibilityTimeoutSeconds": 120
}
```

| Field                      | Type      | Required | Description                                                                                                                                       |
| -------------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `visibilityTimeoutSeconds` | `integer` | Yes      | New visibility timeout from now. Minimum zero seconds, maximum 60 minutes (3,600 seconds). Set to zero seconds to release the message immediately |

> **💡 Note:** The visibility timeout cannot extend beyond the message's expiration time. If it would, the request returns `400` with the message's expiration timestamp.

#### Response

**`200 OK`**

```json
{
  "success": true
}
```

#### Error responses

| Status | Description                                                                        |
| ------ | ---------------------------------------------------------------------------------- |
| `400`  | Invalid visibility timeout, exceeds max, or would extend beyond message expiration |
| `401`  | Missing or invalid authentication token                                            |
| `404`  | Message not found or already acknowledged                                          |
| `409`  | Lease expired or receipt handle mismatch                                           |
| `429`  | Rate limited                                                                       |

***

## Limits

| Limit                   | Min          | Max                    | Default      |
| ----------------------- | ------------ | ---------------------- | ------------ |
| Message retention (TTL) | 60 seconds   | 7 days                 | 24 hours     |
| Delay before visible    | Zero seconds | 7 days (capped at TTL) | Zero seconds |
| Visibility timeout      | Zero seconds | 60 minutes             | 60 seconds   |
| Messages per receive    | 1            | 10                     | 1            |
| Max concurrency         | 1            | Unlimited              | Unlimited    |


---

[View full sitemap](/docs/sitemap)
