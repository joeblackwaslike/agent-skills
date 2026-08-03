---
title: Budgets
product: vercel
url: /docs/ai-gateway/observability-and-spend/budgets
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend/budgets"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/ai-gateway/observability-and-spend
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/sign-in-with-vercel/tokens
  - /docs/cli/tokens
  - /docs/ai-gateway/authentication-and-byok/byok
summary: Cap AI Gateway spend for your team, a single project, or an individual API key with budgets, refresh periods, spend alerts, and defaults.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend/budgets.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "f317c9feb172fd8efabc8f62a536983fbcadcfae9c34d184fa84a7ed5882b16e"
---

# Budgets

A budget caps how much your team, a single project, or an individual API key can spend on AI Gateway. AI Gateway checks the budget before each request and rejects further requests once the limit is exceeded, until the budget resets or you raise it. Budgets are optional: a team, project, or key without one has unlimited spend.

This page covers all three scopes. To create, view, or delete the API keys themselves, see [API Keys](/docs/ai-gateway/authentication-and-byok/api-keys).

## How budgets work

Budgets stack, but which ones apply depends on how a request authenticates. Every request counts toward the team budget. Beyond that, an OIDC token counts toward its project's budget, and an API key counts toward that key's budget. A request has to pass every budget in scope, so if any one is exceeded, AI Gateway rejects the request even when the others have room.

Take a team with all three budgets set:

| Budget in scope                     | Limit | Spent this period |
| ----------------------------------- | ----- | ----------------- |
| Team `acme`                         | $500  | $120              |
| Project `storefront` in team `acme` | $100  | $100              |
| API key (any project)               | $50   | $10               |

A single request adds its cost to every budget in scope at once. A $1 request from a `storefront` deployment adds $1 to the project budget and $1 to the team budget. That's why the team's $120 already includes the project's $100 and the key's $10, rather than sitting alongside them.

Two requests against that team get different outcomes:

| Request                                            | Budgets in scope | Outcome                                    |
| -------------------------------------------------- | ---------------- | ------------------------------------------ |
| A deployment in `storefront`, using its OIDC token | Team, project    | Rejected. The project budget is exhausted. |
| Any request using the API key                      | Team, API key    | Succeeds. No project budget applies.       |

Each budget counts a specific set of authentication types:

- **Team budget**: [API keys](/docs/ai-gateway/authentication-and-byok/api-keys), [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc), [app tokens](/docs/sign-in-with-vercel/tokens), and [personal access tokens](/docs/cli/tokens)
- **Project budget**: [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc) from that project's deployments
- **API key budget**: that one [API key](/docs/ai-gateway/authentication-and-byok/api-keys)
- **No budget**: [BYOK](/docs/ai-gateway/authentication-and-byok/byok) provider keys

An API key's spend is never attributed to a project, no matter which project uses the key. Spending down a project budget requires an OIDC token from that project's deployments.

A default budget is a catch-all:

- It applies to every project or key without an explicit budget, including ones that already exist.
- It never overrides an explicit budget. The explicit budget wins whether it was set before or after the default.
- Metering starts when the default takes effect. Spend from before that point doesn't count against it, so a key that has already spent $10,000 starts at $0 against a new $40 default.

> **💡 Note:** A budget is a soft cap, not a hard limit. The check runs at the start of each request, so the request that crosses the limit still completes and total spend can end up slightly over the budget.

Each refresh period resets at the start of its window in UTC:

| Period    | Resets at                              |
| --------- | -------------------------------------- |
| `daily`   | Midnight UTC each day                  |
| `weekly`  | Monday at midnight UTC                 |
| `monthly` | The first of the month at midnight UTC |
| `none`    | Never resets; the limit is cumulative  |

Editing a budget keeps the spend already accumulated in the current period. Deleting a budget removes the cap immediately; re-creating it later starts metering from that point, not retroactively.

## When a budget is exceeded

Once spend reaches the limit, AI Gateway rejects further requests for that scope with an HTTP `402` response until the budget resets or you raise it. The `type` is always `quota_for_entity_exceeded`, and the `message` names the scope that was exceeded along with its current spend and limit.

A team or project budget:

```json filename="Response"
{
  "error": {
    "message": "Project budget exceeded. Current spend: $200.00, limit: $200.00. Please contact your administrator to increase the budget.",
    "type": "quota_for_entity_exceeded"
  }
}
```

An API key budget:

```json filename="Response"
{
  "error": {
    "message": "Quota limit exceeded for \"api_key_id_<your_key_id>\". Current spend: $10.00, limit: $10.00. Please contact your administrator to increase the quota.",
    "type": "quota_for_entity_exceeded"
  }
}
```

Handle a `402` in your client by backing off until the budget resets, or raise the limit.

## Spend alerts

Spend alerts email someone as spend crosses a chosen percentage of the limit within a refresh period. They are off by default. When you add or edit a team or project budget, pick any combination of **50%**, **75%**, and **100%** under **Email ... when usage reaches**. Each threshold you select fires at most once per period.

Who receives the email depends on the budget's scope:

| Budget scope    | Alerts go to                                      |
| --------------- | ------------------------------------------------- |
| Team or project | Team owners and members with the **Billing** role |
| API key         | The key's creator                                 |

Alerts are informational: crossing a threshold below 100% never blocks requests.

## Roles and permissions

Every [team role](/docs/rbac/access-roles/team-level-roles) except **Contributor** can see budgets. Owner, Member, Developer, Security, Viewer, and Billing all have read access to the **Budgets** page and its tabs.

Managing a budget is more restricted, and depends on the scope:

| Budget scope                   | Who can create, edit, and remove it |
| ------------------------------ | ----------------------------------- |
| Team                           | Owner                               |
| Project                        | Owner, or an admin on that project  |
| API key                        | Owner or Member                     |
| Defaults (project and API key) | Owner                               |

These rules apply the same way whether you use the dashboard or the CLI. See [Roles & Permissions](/docs/ai-gateway/roles-and-permissions) for the full AI Gateway access matrix.

## Team and project budgets

The two scopes are independent, and you can use either or both:

- A **team budget** caps all AI Gateway spend across your team for the refresh period. When it is exceeded, every gateway request from your team is rejected until the budget resets.
- A **project budget** caps the spend attributed to one project. When it is exceeded, only that project's requests are rejected; the rest of your team is unaffected.

### Set a team or project budget

#### Dashboard

1. **Choose the scope.** Open the [**Team** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fteam\&title=AI+Gateway+Team+Budget) for a team budget, or the [**Projects** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fprojects\&title=AI+Gateway+Project+Budgets) to pick a project.
2. **Add the budget.** Click **Add budget**, enter a spending limit in dollars, and choose a refresh period.
3. **Save.** The budget takes effect within a few minutes.

#### CLI

Set the team budget, or scope a budget to a single project by name or ID:

```bash filename="terminal"
vercel ai-gateway budgets set team --limit 500 --refresh-period monthly
vercel ai-gateway budgets set project my-project --limit 200 --refresh-period monthly
```

| Flag                        | Description                                        |
| --------------------------- | -------------------------------------------------- |
| `--limit <AMOUNT>`          | Spending limit in dollars (minimum `$1`).          |
| `--refresh-period <PERIOD>` | `daily`, `weekly`, `monthly` (default), or `none`. |

### Check a team or project budget

#### Dashboard

The [**Team**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fteam\&title=AI+Gateway+Team+Budget) and [**Projects**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fprojects\&title=AI+Gateway+Project+Budgets) tabs show each budget's spend against its limit with a usage bar. The [**Overview**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets\&title=AI+Gateway+Budgets) tab breaks spend down across every scope, and the team budget includes a spend history chart.

A budget inherited from the project default is labeled **Default** until you set an explicit one.

#### CLI

```bash filename="terminal"
vercel ai-gateway budgets list
```

### Change or remove a team or project budget

#### Dashboard

1. **Find the budget.** Open the [**Team** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fteam\&title=AI+Gateway+Team+Budget) or the [**Projects** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fprojects\&title=AI+Gateway+Project+Budgets).
2. **Open the budget's menu.** Find the budget and open its **···** menu.
3. **Edit or remove.** Select **Edit budget** to change the limit, refresh period, or spend alerts. Select **Remove budget** to lift the cap.

#### CLI

Re-run `budgets set` with new values to change a budget. Removing one lifts the cap:

```bash filename="terminal"
vercel ai-gateway budgets remove team
vercel ai-gateway budgets remove project my-project
```

### Project default budgets

A default budget applies to every project without an explicit budget, including projects that already exist. Setting an explicit budget on a project overrides the default. API keys have a separate default, covered in [API key default budgets](#api-key-default-budgets).

#### Dashboard

1. **Open the projects tab.** Go to the [**Projects** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fprojects\&title=AI+Gateway+Project+Budgets) of the AI Gateway Budgets page.
2. **Set the project default.** In the **Project Default** card, enter a spending limit in dollars and choose a refresh period.
3. **Save.** Every project without its own budget now inherits this limit, shown as **Default** in the projects list.

#### CLI

```bash filename="terminal"
vercel ai-gateway budgets defaults set project --limit 200 --refresh-period monthly
```

List defaults with `vercel ai-gateway budgets defaults list`, and remove the project default with `vercel ai-gateway budgets defaults remove project`.

## API key budgets

An API key budget caps how much a single key can spend, independently of any team or project budget. You manage it from the API Keys page, the CLI, or the Quotas API.

### Set an API key budget at creation

Add a budget at the time you create the key:

#### Dashboard

1. **Open the create-key dialog.** On the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys), click **Create key**.
2. **Enable a budget.** Turn on the budget option and enter a spending limit in dollars.
3. **Choose a refresh period.** Select how often the budget resets (see [refresh periods](#how-budgets-work)).
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

> **💡 Note:** A new budget is not enforced instantly. For up to a minute or two after the key is created, requests may not be counted against the budget. Once active, spend appears within about 20 seconds.

### Check an API key budget and spend

#### Dashboard

On the [API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys), a budgeted key shows its spend against the limit (for example, **$1.04 / $10 spent**) with the refresh period. A key without a budget shows **Unlimited budget**.

To compare every key's budget in one place, use the [**API Keys** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fapi-keys\&title=AI+Gateway+API+Key+Budgets) of the Budgets page.

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

### Add or change an API key budget

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

### Remove an API key budget

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

### API key default budgets

A default budget applies to every API key without an explicit budget, including keys that already exist. Setting an explicit budget on a key overrides the default.

Set the API key default from the CLI:

```bash filename="terminal"
vercel ai-gateway budgets defaults set api-key --limit 50 --refresh-period monthly
```

List defaults with `vercel ai-gateway budgets defaults list`, and remove the API key default with `vercel ai-gateway budgets defaults remove api-key`.

> **💡 Note:** The dashboard has a card for the project default only. To set a default for API keys, use the CLI.

> **💡 Note:** Budget changes take effect after a short delay, typically tens of seconds and up to about 5 minutes for a key in active use. If a change doesn't appear right away, wait and retry rather than re-applying it.

## Budgets and credits

Budgets limit usage; they do not reserve or purchase capacity. Your team still needs [credits or a payment method](/docs/ai-gateway/pricing) to make requests.

> **💡 Note:** [BYOK](/docs/ai-gateway/authentication-and-byok/byok) spend isn't counted in budgets. Spend that draws on your own provider keys is metered separately and doesn't count toward any limit.


---

[View full sitemap](/docs/sitemap)
