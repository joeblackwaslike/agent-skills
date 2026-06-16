---
title: API Keys
product: vercel
url: /docs/ai-gateway/authentication-and-byok/api-keys
canonical_url: "https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys"
last_updated: 2026-05-30
type: how-to
prerequisites:
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/cli
  - /docs/rest-api/reference/welcome
  - /docs/ai-gateway/capabilities/quotas
summary: Create, view, edit, and delete AI Gateway API keys from the dashboard, CLI, or API, with optional spending budgets.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/authentication-and-byok/api-keys.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "9588de2d28debf670dc504705d7e10a103e9394d77514cfc4719e3977e2257f9"
---

# API Keys

API keys authenticate your requests to the AI Gateway. This page covers how to:

- **Create** a key in the dashboard, with the Vercel CLI, or via the Vercel API
- **View** your keys and their usage
- **Edit** a key's budget
- **Delete or revoke** a key

You can optionally give any key a **budget** to cap how much it can spend. For how to use a key in your code, see [Authentication](/docs/ai-gateway/authentication-and-byok#api-keys).

> **⚠️ Warning:** When a team member leaves your team, Vercel deactivates any API keys they
> created. If you need authentication that isn't tied to a specific person, use
> [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc)
> on Vercel deployments.

## Create a key

Create a key from the dashboard, the Vercel CLI, or the Vercel API.

#### Dashboard

1. **Open the API Keys page.** Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys) and click **Create key**.
2. **Name and create the key.** Give the key a name and create it.
3. **Save the key.** Copy the key value immediately (you cannot retrieve it again) and save it as `AI_GATEWAY_API_KEY`.

#### CLI

Make sure you're on the [latest CLI version](/docs/cli). The key is created under your current CLI scope; check it with `vercel whoami`, change it with `vercel switch`, or pass `--scope <team>` per command.

```bash filename="terminal"
vercel ai-gateway api-keys create --name my-api-key
```

Copy the key value immediately. You cannot retrieve it again.

#### API

Call `POST /v1/api-keys` with a [Vercel access token](/docs/rest-api/reference/welcome#creating-an-access-token), passing the team ID as a query parameter.

```bash filename="terminal"
curl -X POST "https://api.vercel.com/v1/api-keys?teamId=$VERCEL_TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "purpose": "ai-gateway", "name": "my-api-key" }'
```

| Field       | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| `purpose`   | string | Required. Use `ai-gateway`.                  |
| `name`      | string | Optional. Human-readable name.               |
| `projectId` | string | Optional. Scope the key to a Vercel project. |
| `expiresAt` | number | Optional. Expiry as a UNIX timestamp (ms).   |

The response includes `apiKeyString` (the secret; save it now) and the key's `id`.

### Create a key with a budget

A budget is optional. It sets a spending limit on the key: AI Gateway checks the budget before each request and rejects further requests once the limit is exceeded, until the budget resets or you raise it.

> **💡 Note:** A budget is a soft cap, not a hard limit. The check runs at the start of each request, so the request that crosses the limit still completes and total spend can end up slightly over the budget.

Add one when you create the key:

#### Dashboard

1. **Open the create-key dialog.** On the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys), click **Create key**.
2. **Enable a budget.** Turn on the budget option and enter a spending limit in dollars.
3. **Choose a refresh period.** Select how often the budget resets (see the table below).
4. **Save the key.** Save the key, and copy its value immediately. You cannot retrieve it again.

#### CLI

```bash filename="terminal"
vercel ai-gateway api-keys create --name my-api-key --budget 10 --refresh-period monthly
```

| Flag                        | Description                                              |
| --------------------------- | ------------------------------------------------------- |
| `--budget <AMOUNT>`         | Spending limit in dollars (minimum `$1`).               |
| `--refresh-period <PERIOD>` | `daily`, `weekly`, `monthly`, or `none` (default).      |

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

| Field                               | Type    | Description                                               |
| ----------------------------------- | ------- | -------------------------------------------------------- |
| `aiGatewayQuota.limitAmount`        | number  | Budget limit in dollars (minimum `1`).                  |
| `aiGatewayQuota.refreshPeriod`      | string  | `daily`, `weekly`, `monthly`, or `none`.                |

Each refresh period resets at the start of its window in UTC:

| Period    | Resets at                             |
| --------- | ------------------------------------- |
| `daily`   | 12:00 AM UTC every day                |
| `weekly`  | 12:00 AM UTC every Monday             |
| `monthly` | 12:00 AM UTC on the 1st of each month |
| `none`    | Never; the limit accumulates forever  |

> **💡 Note:** A new budget is not enforced instantly. For up to a minute or two after the key is created, requests may not be counted against the budget. Once active, spend appears within about 20 seconds.

## View a key

List your keys from the dashboard, the Vercel CLI, or the Vercel API.

#### Dashboard

The [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys) lists every key with its last-used time.

#### CLI

List all AI Gateway keys (the CLI injects your current team scope if you omit `teamId`):

```bash filename="terminal"
vercel api "/v1/api-keys?purpose=ai-gateway"
```

#### API

```bash filename="terminal"
curl "https://api.vercel.com/v1/api-keys?teamId=$VERCEL_TEAM_ID&purpose=ai-gateway" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

### Check a key's budget and spend

#### Dashboard

On the API Keys page, a budgeted key shows its spend against the limit (for example, **$1.04 / $10 spent**) with the refresh period. A key without a budget shows **Unlimited quota**.

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

## Edit a key

A key's only editable property is its budget. To change anything else, such as the name, [delete the key](#delete-a-key) and create a new one.

> **💡 Note:** Budget changes aren't available from the CLI: budgets live in the Quotas API, which the `vercel api` command can't reach. Use the dashboard or the API.

### Add or change a budget

#### Dashboard

1. **Open the API Keys page.** Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys).
2. **Edit the key.** Find the key, open its **···** menu, and select **Edit key**.
3. **Add or change the budget.** Enable or update the budget, set the limit and refresh period, and save.

#### API

Budgets are managed through the [Quotas API](/docs/ai-gateway/capabilities/quotas) with an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys).

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

| Field                | Type    | Description                                  |
| -------------------- | ------- | -------------------------------------------- |
| `limitAmount`        | number  | New limit in dollars (minimum `1`).          |
| `refreshPeriod`      | string  | `daily`, `weekly`, `monthly`, or `none`.     |
| `active`             | boolean | Enable or disable enforcement.               |

### Remove a budget

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

## Delete a key

Deleting a key immediately invalidates it. Any request using it afterward fails authentication.

#### Dashboard

On the API Keys page, open a key's **···** menu to delete it, or use the **···** menu next to **Create key** to delete all keys at once.

#### CLI

List your keys to find the `id` of the one to revoke:

```bash filename="terminal"
vercel api "/v1/api-keys?purpose=ai-gateway"
```

Each key in the response has an `id`. Pass it to the delete endpoint:

```bash filename="terminal"
vercel api "/v1/api-keys/$API_KEY_ID" -X DELETE
```

The CLI asks for confirmation before deleting. To revoke several keys, repeat the delete for each `id`.

#### API

List keys with `GET /v1/api-keys` (see [View a key](#view-a-key)) to get each `id`, then delete one:

```bash filename="terminal"
curl -X DELETE "https://api.vercel.com/v1/api-keys/$API_KEY_ID?teamId=$VERCEL_TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

### Report a compromised key

If a raw key has leaked, revoke it without authentication by reporting it:

```bash filename="terminal"
curl -X POST "https://api.vercel.com/external/compromised_secret" \
  -H "Content-Type: application/json" \
  -d '{ "secret": { "api_key": "vck_..." } }'
```


---

[View full sitemap](/docs/sitemap)
