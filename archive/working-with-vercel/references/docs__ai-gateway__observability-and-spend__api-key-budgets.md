---
title: API Key Budgets
product: vercel
url: /docs/ai-gateway/observability-and-spend/api-key-budgets
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend/api-key-budgets"
last_updated: 2026-06-20
type: how-to
prerequisites:
  - /docs/ai-gateway/observability-and-spend
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/api-keys
summary: Cap how much an AI Gateway API key can spend with per-key budgets, refresh periods, and spend tracking from the dashboard, CLI, or API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend/api-key-budgets.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "663398902b5e079f1dd4358fc1e9eb4ea9b670b5057734cc071acc07550ee1b4"
---

# API Key Budgets

A budget caps how much an AI Gateway API key can spend. AI Gateway checks the budget before each request and rejects further requests once the limit is exceeded, until the budget resets or you raise it. Budgets are optional: a key without one has unlimited spend.

This page covers adding, checking, changing, and removing a key's budget. To create, view, or delete the keys themselves, see [API Keys](/docs/ai-gateway/authentication-and-byok/api-keys).

> **💡 Note:** A budget is a soft cap, not a hard limit. The check runs at the start of each request, so the request that crosses the limit still completes and total spend can end up slightly over the budget.

## Add a budget when creating a key

Add a budget at the time you create the key:

#### Dashboard

1. **Open the create-key dialog.** On the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys), click **Create key**.
2. **Enable a budget.** Turn on the budget option and enter a spending limit in dollars.
3. **Choose a refresh period.** Select how often the budget resets (see the table below).
4. **Save the key.** Save the key, and copy its value immediately. You cannot retrieve it again.

#### CLI

```bash filename="terminal"
vercel ai-gateway api-keys create --name my-api-key --budget 10 --refresh-period monthly
```

| Flag                        | Description                                        |
| --------------------------- | -------------------------------------------------- |
| `--budget <AMOUNT>`         | Spending limit in dollars (minimum `$1`).          |
| `--refresh-period <PERIOD>` | `daily`, `weekly`, `monthly`, or `none` (default). |

#### API

Add an `aiGatewayQuota` object to the create request:

```bash filename="terminal"
curl -X POST "https://api.vercel.com/v1/api-keys?teamId=$VERCEL_TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "purpose": "ai-gateway",
    "name": "my-api-key",
    "aiGatewayQuota": { "limitAmount": 10, "refreshPeriod": "monthly" }
  }'
```

| Field                          | Type   | Description                               |
| ------------------------------ | ------ | ----------------------------------------- |
| `aiGatewayQuota.limitAmount`   | number | Budget limit in dollars (minimum `1`).    |
| `aiGatewayQuota.refreshPeriod` | string | `daily`, `weekly`, `monthly`, or `none`.  |

Each refresh period resets at the start of its window in UTC:

| Period    | Resets at                             |
| --------- | ------------------------------------- |
| `daily`   | 12:00 AM UTC every day                |
| `weekly`  | 12:00 AM UTC every Monday             |
| `monthly` | 12:00 AM UTC on the 1st of each month |
| `none`    | Never; the limit accumulates forever  |

> **💡 Note:** A new budget is not enforced instantly. For up to a minute or two after the key is created, requests may not be counted against the budget. Once active, spend appears within about 20 seconds.

## Check a budget and spend

#### Dashboard

On the [API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys), a budgeted key shows its spend against the limit (for example, **$1.04 / $10 spent**) with the refresh period. A key without a budget shows **Unlimited quota**.

#### CLI

Each key in the list has a `quota` field, populated for budgeted keys and `null` otherwise:

```bash filename="terminal"
vercel api "/v1/api-keys?purpose=ai-gateway" \
  | jq '.apiKeys[] | select(.id=="<your_key_id>") | {name, quota}'
```

> **💡 Note:** The list shows `quota: null` both when a key never had a budget and when its budget was removed, and it can lag right after a change.

#### API

Read the key's quota (its `quotaEntityId` is `api_key_id_<your_key_id>`) with an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys):

```bash filename="terminal"
curl "https://ai-gateway.vercel.sh/v1/quotas?quotaEntityId=api_key_id_<your_key_id>" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY"
```

A budgeted key returns `200 OK`:

```json filename="Response"
{
  "quotaEntityId": "api_key_id_<your_key_id>",
  "apiKeyName": "my-api-key",
  "limitAmount": 10,
  "currentSpend": 1.04,
  "refreshPeriod": "monthly",
  "active": true
}
```

A key without a budget returns `404 Not Found`:

```json filename="Response"
{ "error": "Quota not found" }
```

## Add or change a budget

A key's budget is its only editable property. Budgets are managed through the Quotas API, so changes aren't available from the `vercel api` command; use the dashboard or the API.

#### Dashboard

1. **Open the API Keys page.** Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys).
2. **Edit the key.** Find the key, open its **···** menu, and select **Edit key**.
3. **Add or change the budget.** Enable or update the budget, set the limit and refresh period, and save.

#### API

A key's `quotaEntityId` is `api_key_id_` followed by the key's `id`. List your keys to find the `id`:

```bash filename="terminal"
vercel api "/v1/api-keys?purpose=ai-gateway"
```

For example, a key whose `id` is `abc123` has the `quotaEntityId` `api_key_id_abc123`. Use that value in the calls below.

Add a budget to a key that doesn't have one:

```bash filename="terminal"
curl -X POST "https://ai-gateway.vercel.sh/v1/quotas" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "quotaEntityId": "api_key_id_<your_key_id>", "limitAmount": 50, "refreshPeriod": "weekly" }'
```

Change the limit or reset period (send only what changes):

```bash filename="terminal"
curl -X PATCH "https://ai-gateway.vercel.sh/v1/quotas?quotaEntityId=api_key_id_<your_key_id>" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "limitAmount": 100, "refreshPeriod": "monthly" }'
```

| Field           | Type    | Description                              |
| --------------- | ------- | ---------------------------------------- |
| `limitAmount`   | number  | New limit in dollars (minimum `1`).      |
| `refreshPeriod` | string  | `daily`, `weekly`, `monthly`, or `none`. |
| `active`        | boolean | Enable or disable enforcement.           |

## Remove a budget

Removing a budget reverts the key to unlimited.

#### Dashboard

1. **Open the API Keys page.** Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys).
2. **Edit the key.** Find the key, open its **···** menu, and select **Edit key**.
3. **Remove the budget.** Turn off the budget and save. The key reverts to unlimited.

#### API

```bash filename="terminal"
curl -X DELETE "https://ai-gateway.vercel.sh/v1/quotas?quotaEntityId=api_key_id_<your_key_id>" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY"
```

To restore a removed budget, `PATCH` it back with `{ "archived": false, "active": true, "limitAmount": 50 }`. Removing a budget archives it rather than deleting it, so you restore it with `PATCH`, not `POST` (a `POST` would return `409` because the record still exists).

> **💡 Note:** Budget changes take effect after a short delay, typically tens of seconds and up to about 5 minutes for a key in active use. If a change doesn't appear right away, wait and retry rather than re-applying it.


---

[View full sitemap](/docs/sitemap)
