---
title: Budgets
product: vercel
url: /docs/ai-gateway/observability-and-spend/budgets
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend/budgets"
last_updated: 2026-08-28
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
summary: Cap AI Gateway spend for your team, a project, an individual API key, or a team member with budgets, refresh periods, spend alerts, and defaults.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend/budgets.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "283050e047e10064a916b171f33e39384b9c897cef6d5bf050328086c3ba791d"
---

# Budgets

A budget caps AI Gateway spend at one of four scopes:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway now supports team and project spend budgets](https://vercel.com/changelog/ai-gateway-spend-budgets-and-alerts?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fbudgets&source_site=vercel-docs&relationship=related)
- [Set per-user budgets on AI Gateway](https://vercel.com/changelog/set-per-user-budgets-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fbudgets&source_site=vercel-docs&relationship=related)
- [Set up coding agents in one command with AI Gateway](https://vercel.com/changelog/set-up-coding-agents-in-one-command-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fbudgets&source_site=vercel-docs&relationship=related)
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fbudgets&source_site=vercel-docs&relationship=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [Budgets for API keys on AI Gateway](https://vercel.com/changelog/budgets-for-api-keys-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fbudgets&source_site=vercel-docs&relationship=related)
- [How to route your coding agent spend through AI Gateway](https://vercel.com/kb/guide/route-coding-agent-spend-through-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fbudgets&source_site=vercel-docs&relationship=related) — Point Claude Code, Codex, Cursor, and every other harness on your machine at AI Gateway with one CLI command, on a budge
- [Spend Management](https://vercel.com/docs/spend-management?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fbudgets&source_site=vercel-docs&relationship=related) — Learn how to get notified about your account spend and configure a webhook.
- [Custom Reporting](https://vercel.com/docs/ai-gateway/observability-and-spend/custom-reporting?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fbudgets&source_site=vercel-docs&relationship=related) — Query AI Gateway usage data grouped by model, user, tag, provider, or credential type using the Custom Reporting API.
- [Limits](https://vercel.com/docs/limits?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fbudgets&source_site=vercel-docs&relationship=related) — Look up account limits, usage summaries, rate limits, and resource constraints for every Vercel plan.
- [Hermes](https://vercel.com/docs/ai-gateway/coding-agents/hermes?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fbudgets&source_site=vercel-docs&relationship=related) — Use the Hermes agent with the AI Gateway.
- [omp](https://vercel.com/docs/ai-gateway/coding-agents/omp?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fbudgets&source_site=vercel-docs&relationship=related) — Use the omp coding agent with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/observability-and-spend/budgets.graph.md](/docs/ai-gateway/observability-and-spend/budgets.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fobservability-and-spend%2Fbudgets&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- **[Team](#team-and-project-budgets)**: everything your team spends, across every project and key.
- **[Project](#team-and-project-budgets)**: what one project's deployments spend, through their OIDC tokens.
- **[API key](#api-key-budgets)**: what one API key spends.
- **[User](#user-budgets)**: what one team member spends, across every API key attributed to them.

AI Gateway checks every budget in scope before each request and rejects further requests once a limit is exceeded, until the budget resets or you raise it. Budgets are optional, and a team, project, key, or member without one has unlimited spend.

To create, view, or delete the API keys themselves, see [API Keys](/docs/ai-gateway/authentication-and-byok/api-keys).

## How budgets work

Budgets stack, and which ones apply depends on how a request authenticates. A request has to pass every budget in scope, so if any one is exceeded, AI Gateway rejects the request even when the others have room.

Take a team with all four budget scopes in use:

| Budget in scope                          | Limit | Spent this period |
| ---------------------------------------- | ----- | ----------------- |
| Team `acme`                              | $500  | $110              |
| Project `storefront` in team `acme`      | $100  | $100              |
| API key, attributed to member `teammate` | $50   | $10               |
| Member `teammate` (user budget)          | $40   | $10               |

A single request adds its cost to every budget in scope at once. A $1 request from a `storefront` deployment adds $1 to the project budget and $1 to the team budget, exactly as the diagram shows.

The totals above are cumulative, so they overlap rather than add up. The team's $110 is the project's $100 plus the key's $10, because each of those requests also counted toward the team. The key's $10 and `teammate`'s $10 are the same $10, counted once against the key and once against the member it is attributed to.

Two requests against that team get different outcomes:

| Request                                            | Budgets in scope    | Outcome                                                      |
| -------------------------------------------------- | ------------------- | ------------------------------------------------------------ |
| A deployment in `storefront`, using its OIDC token | Team, project       | Rejected. The project budget is exhausted.                   |
| Any request using the API key                      | Team, API key, user | Succeeds. No project budget applies, and the rest have room. |

Each budget counts a specific set of authentication types:

- **Team budget**: [API keys](/docs/ai-gateway/authentication-and-byok/api-keys), [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc), [app tokens](/docs/sign-in-with-vercel/tokens), and [personal access tokens](/docs/cli/tokens)
- **Project budget**: [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc) from that project's deployments
- **API key budget**: that one [API key](/docs/ai-gateway/authentication-and-byok/api-keys)
- **User budget**: [API keys](/docs/ai-gateway/authentication-and-byok/api-keys) attributed to that team member
- **No budget**: [BYOK](/docs/ai-gateway/authentication-and-byok/byok) provider keys

An API key's spend is never attributed to a project, no matter which project uses the key. Spending down a project budget requires an OIDC token from that project's deployments.

Each API key is also attributed to either your team or the member who created it. A key attributed to a member counts its spend toward both the team budget and that member's user budget; a key attributed to the team counts toward the team budget only. Only API keys carry this attribution, so OIDC tokens, personal access tokens, and app tokens never count toward a user budget. See [Spend attribution](/docs/ai-gateway/authentication-and-byok/api-keys#spend-attribution) to set it.

### Default budgets

A default budget is a catch-all cap for one scope, with one default for projects, one for API keys, and one for team members:

- It applies to every project, key, or member without a custom budget, including ones that already exist and ones added later.
- Each covered resource gets its own allowance. A $50 API key default caps every covered key at $50 per period; it isn't $50 split across them.
- It never overrides a custom budget. The custom budget wins whether you set it before or after the default.
- Metering starts when the default takes effect. Spend from before that point doesn't count against it, so a key that has already spent $10,000 starts at $0 against a new $40 default.

A default takes effect as soon as you save it. AI Gateway caps every covered resource and lists it with the default's limit and a **Default** label. Spend shows as $0 until the resource's first request arrives, then starts filling in.

A default carries a limit and a refresh period only. It doesn't send [spend alerts](#spend-alerts); set a custom budget on a resource to get alerts for it.

Removing a default lifts that cap from every resource it covered. After that, only the team budget still applies to them, if you've set one.

> **💡 Note:** A budget is a soft cap, not a hard limit. The check runs at the start of each
> request, so the request that crosses the limit still completes and total spend
> can end up slightly over the budget.

Each refresh period resets at the start of its window in UTC:

| Period    | Resets at                              |
| --------- | -------------------------------------- |
| `daily`   | Midnight UTC each day                  |
| `weekly`  | Monday at midnight UTC                 |
| `monthly` | The first of the month at midnight UTC |
| `none`    | Never resets; the limit is cumulative  |

Editing a budget keeps the spend already accumulated in the current period. Deleting a budget removes that cap immediately. A project, key, or member covered by a [default budget](#default-budgets) falls back to the default rather than becoming unlimited. Re-creating a budget later starts metering from that point, not retroactively.

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

A user budget rejects the same way once a member's user-attributed keys exceed it, with the `message` naming the user scope.

Handle a `402` in your client by backing off until the budget resets, or raise the limit.

## Spend alerts

Spend alerts email someone as spend crosses a chosen percentage of the limit within a refresh period. They are off by default. When you add or edit a team, project, API key, or user budget, pick any combination of **50%**, **75%**, and **100%** under **Email ... when usage reaches**. Each threshold you select fires at most once per period.

Who receives the email depends on the budget's scope:

| Budget scope    | Alerts go to                                      |
| --------------- | ------------------------------------------------- |
| Team or project | Team owners and members with the **Billing** role |
| API key         | The key's creator                                 |
| User            | The team member whose budget it is                |

Alerts are informational. Crossing a threshold below 100% never blocks requests.

## Roles and permissions

Every [team role](/docs/rbac/access-roles/team-level-roles) except **Contributor** can see budgets. Owner, Member, Developer, Security, Viewer, and Billing all have read access to the **Budgets** page and its tabs.

Writing is more restricted. Besides the Owner role, an Owner can grant a member the **AI Gateway Budget Manager** permission from the team's [member settings](/docs/rbac/managing-team-members); it covers every budget action below without the rest of the Owner role.

| Action                                                                                                  | Who can do it                                      |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| View every budget, default, and spend                                                                   | Every team role except Contributor                 |
| Create, edit, or remove the team budget                                                                 | Owners and Budget Managers                         |
| Create, edit, or remove a project budget                                                                | Owners, Budget Managers, and that project's admins |
| Create, edit, or remove a user budget                                                                   | Owners and Budget Managers                         |
| Add, change, or remove an API key budget                                                                | Owners and Members (anyone who can edit the key)   |
| Set or remove a default budget (project, API key, or user)                                              | Owners and Budget Managers                         |
| Change a key's [spend attribution](/docs/ai-gateway/authentication-and-byok/api-keys#spend-attribution) | Owners and Budget Managers                         |

API key budgets are the one exception to the Budget Manager grant. They follow key-editing permission, so a Budget Manager changes them through their base role rather than the grant.

These rules apply the same way whether you use the dashboard or the [CLI](/docs/cli/ai-gateway#budgets).

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

Set the team budget, or scope a budget to a single project by name or ID (every budget subcommand and flag is in the [CLI reference](/docs/cli/ai-gateway#budgets)):

```bash filename="terminal"
vercel ai-gateway budgets set team --limit 500 --refresh-period monthly
vercel ai-gateway budgets set project my-project --limit 200 --refresh-period monthly
```

```text filename="Output"
✓ Set budget      team
  Limit           $500
  Refresh         monthly
```

| Flag                        | Description                                        |
| --------------------------- | -------------------------------------------------- |
| `--limit <AMOUNT>`          | Spending limit in dollars (minimum `$1`).          |
| `--refresh-period <PERIOD>` | `daily`, `weekly`, `monthly` (default), or `none`. |

### Check a team or project budget

#### Dashboard

The [**Team**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fteam\&title=AI+Gateway+Team+Budget) and [**Projects**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fprojects\&title=AI+Gateway+Project+Budgets) tabs show each budget's spend against its limit with a usage bar. The [**Overview**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets\&title=AI+Gateway+Budgets) tab breaks spend down across every scope, and the team budget includes a spend history chart.

A budget inherited from the project default is labeled **Default** until you set a custom one.

#### CLI

```bash filename="terminal"
vercel ai-gateway budgets list
```

```text filename="Output"
> Budgets
  scope      name          limit      spent    refresh
  team       acme           $500    $110.00    monthly
  project    storefront     $100    $100.00    monthly
```

### Change or remove a team or project budget

#### Dashboard

1. **Find the budget.** Open the [**Team** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fteam\&title=AI+Gateway+Team+Budget) or the [**Projects** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fprojects\&title=AI+Gateway+Project+Budgets).
2. **Open the budget's menu.** Find the budget and open its **···** menu.
3. **Edit or remove.** Select **Edit budget** to change the limit, refresh period, or spend alerts. Select **Remove budget** to lift the cap.

#### CLI

Re-run `budgets set` with new values to change a budget. Removing one lifts that cap; a project covered by the [project default](#project-default-budgets) falls back to it:

```bash filename="terminal"
vercel ai-gateway budgets remove team
vercel ai-gateway budgets remove project my-project
```

```text filename="Output"
✓ Removed         team budget
```

### Project default budgets

A default budget applies to every project without a custom budget, including projects that already exist. Setting a custom budget on a project overrides the default; see [Default budgets](#default-budgets) for the full semantics. API keys have a separate default, covered in [API key default budgets](#api-key-default-budgets).

#### Dashboard

1. **Open the projects tab.** Go to the [**Projects** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fprojects\&title=AI+Gateway+Project+Budgets) of the AI Gateway Budgets page.
2. **Set the project default.** Click **Set Default** (or the current default value, if one is set) and enter a spending limit in dollars and a refresh period in the **Project Default** dialog.
3. **Save.** Every project without its own budget now inherits this limit, shown as **Default** in the projects list.

#### CLI

```bash filename="terminal"
vercel ai-gateway budgets defaults set project --limit 200 --refresh-period monthly
```

```text filename="Output"
✓ Set default     project
  Limit           $200
  Refresh         monthly
  Applies to      every project without its own budget, including existing ones
```

List defaults with `vercel ai-gateway budgets defaults list`, and remove the project default with `vercel ai-gateway budgets defaults remove project`.

## API key budgets

An API key budget caps how much a single key can spend, independently of any team or project budget. You manage it from the API Keys page or the CLI.

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

```text filename="Output"
your_new_api_key_here
> Success! API key my-api-key (key_123) created [212ms]
```

| Flag                        | Description                                                            |
| --------------------------- | ---------------------------------------------------------------------- |
| `--budget <AMOUNT>`         | Spending limit in dollars (minimum `$1`).                              |
| `--refresh-period <PERIOD>` | `daily`, `weekly`, `monthly`, or `none` (default).                     |
| `--expiration <PERIOD>`     | `7d`, `30d`, `60d`, `90d`, `1y`, or `none` (default).                  |
| `--alert-thresholds <LIST>` | Comma-separated subset of `50`, `75`, and `100`, for example `75,100`. |

To bound spend in time as well as amount, pair the budget with an expiration. Budgets never end on their own, so this is how you cap a contractor or experiment key in both dimensions. The key below allows at most $50 total, and stops working entirely after 30 days.

```bash filename="terminal"
vercel ai-gateway api-keys create --name contractor --budget 50 --refresh-period none --expiration 30d
```

> **💡 Note:** A new budget is not enforced instantly. For up to a minute or two after the
> key is created, requests may not be counted against the budget. Once active,
> spend appears within about 20 seconds.

### Check an API key budget and spend

#### Dashboard

On the [API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys), a budgeted key shows its spend against the limit (for example, **$1.04 / $10 spent**) with the refresh period. A key without a budget shows **Unlimited budget**.

To compare every key's budget in one place, use the [**API Keys** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fapi-keys\&title=AI+Gateway+API+Key+Budgets) of the Budgets page.

#### CLI

List every key with its budget, spend, and refresh period:

```bash filename="terminal"
vercel ai-gateway api-keys list
```

```text filename="Output"
> API keys [387ms]
  id         name          key      budget    spend    refresh    created
  key_123    my-api-key    …1fAj    $10       $1.04    monthly    8/24/2026
```

Inspect one key for the full picture, including BYOK spend and alert thresholds:

```bash filename="terminal"
vercel ai-gateway api-keys inspect key_123
```

```text filename="Output"
> API key my-api-key [154ms]
  id              key_123
  name            my-api-key
  key             …1fAj
  purpose         ai-gateway
  project         all projects
  created         8/24/2026, 10:15:03 AM
  last used       8/24/2026, 11:02:47 AM
  expires         never
  created by      your_user_id_here
  budget          $10
  spend           $1.04
  byok spend      $0
  include byok    no
  refresh         monthly
  alerts          none
  active          yes
```

Both commands accept `--format json` for scripting; in the JSON output, a key without a budget has a `null` quota.

> **💡 Note:** A key shows no budget both when it never had one and after you remove its
> budget. The value can lag right after a change.

### Add or change an API key budget

Give an existing key a budget, or change the one it has, from the dashboard or the CLI.

#### Dashboard

1. **Open the API Keys page.** Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys).
2. **Edit the key.** Find the key, open its **···** menu, and select **Edit key**.
3. **Add or change the budget.** Enable or update the budget, set the limit and refresh period, and save.

#### CLI

Identify the key by name or ID (a name shared by several keys errors and asks for the ID; find IDs with `api-keys list`):

```bash filename="terminal"
vercel ai-gateway budgets set api-key my-key --limit 50 --refresh-period weekly
```

```text filename="Output"
✓ Set budget      api key my-key
  Limit           $50
  Refresh         weekly
```

| Flag                        | Description                                        |
| --------------------------- | -------------------------------------------------- |
| `--limit <AMOUNT>`          | Spending limit in dollars (minimum `$1`).          |
| `--refresh-period <PERIOD>` | `daily`, `weekly`, `monthly` (default), or `none`. |

### Remove an API key budget

Removing a budget lifts that key's own cap. A key covered by the [API key default](#api-key-default-budgets) falls back to it; otherwise the key reverts to unlimited.

#### Dashboard

1. **Open the API Keys page.** Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys).
2. **Edit the key.** Find the key, open its **···** menu, and select **Edit key**.
3. **Remove the budget.** Turn off the budget and save. The key falls back to the API key default if your team has one, and is otherwise unlimited.

#### CLI

```bash filename="terminal"
vercel ai-gateway budgets remove api-key my-key
```

```text filename="Output"
✓ Removed         budget for my-key
```

Removing the budget doesn't touch the key itself. To give the key a budget again later, re-run `budgets set api-key`; metering starts from that point, not retroactively.

### API key default budgets

A default budget applies to every API key without a custom budget, including keys that already exist. Setting a custom budget on a key overrides the default; see [Default budgets](#default-budgets) for the full semantics.

#### Dashboard

1. **Open the API Keys tab.** Go to the [**API Keys** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fapi-keys\&title=AI+Gateway+API+Key+Budgets) of the AI Gateway Budgets page.
2. **Set the API key default.** Click **Set Default** (or the current default value, if one is set) and enter a spending limit in dollars and a refresh period in the **API Key Default** dialog.
3. **Save.** Every key without its own budget now inherits this limit.

#### CLI

```bash filename="terminal"
vercel ai-gateway budgets defaults set api-key --limit 50 --refresh-period monthly
```

```text filename="Output"
✓ Set default     api-key
  Limit           $50
  Refresh         monthly
  Applies to      every API key without its own budget, including existing ones
```

List defaults with `vercel ai-gateway budgets defaults list`, and remove the API key default with `vercel ai-gateway budgets defaults remove api-key`.

> **💡 Note:** Budget changes take effect after a short delay, typically tens of seconds and
> up to about 5 minutes for a key in active use. If a change doesn't appear
> right away, wait and retry rather than re-applying it.

## User budgets

A user budget caps how much a single team member can spend, across every API key attributed to that member. It stacks with the team budget, so a member's request has to pass both their user budget and the team budget.

Only API keys attributed to a member count toward their user budget. [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc), [personal access tokens](/docs/cli/tokens), and [app tokens](/docs/sign-in-with-vercel/tokens) carry no member attribution, so their spend never counts toward a user budget. See [Spend attribution](/docs/ai-gateway/authentication-and-byok/api-keys#spend-attribution) for how a key is attributed to a member or the team.

### Set a user budget

#### Dashboard

1. **Open the Users tab.** Go to the [**Users** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fusers\&title=AI+Gateway+User+Budgets) of the AI Gateway Budgets page.
2. **Add the budget.** Click **Add budget**, pick a team member, enter a spending limit in dollars, and choose a refresh period.
3. **Save.** The budget takes effect within a few minutes.

#### CLI

Identify the member by email, username, or user ID:

```bash filename="terminal"
vercel ai-gateway budgets set user teammate@example.com --limit 100 --refresh-period monthly
```

```text filename="Output"
✓ Set budget      user teammate
  Limit           $100
  Refresh         monthly
```

| Flag                        | Description                                        |
| --------------------------- | -------------------------------------------------- |
| `--limit <AMOUNT>`          | Spending limit in dollars (minimum `$1`).          |
| `--refresh-period <PERIOD>` | `daily`, `weekly`, `monthly` (default), or `none`. |

### Check a user budget

#### Dashboard

The [**Users** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fusers\&title=AI+Gateway+User+Budgets) groups spend by the team member who owns the key used for each request, showing each member's spend against their limit with a usage bar.

#### CLI

```bash filename="terminal"
vercel ai-gateway budgets list
```

```text filename="Output"
> Budgets
  scope    name        limit     spent    refresh
  user     teammate     $100    $12.40    monthly
```

User-scoped budgets are listed by member handle.

### Change or remove a user budget

#### Dashboard

1. **Open the Users tab.** Go to the [**Users** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fusers\&title=AI+Gateway+User+Budgets).
2. **Open the budget's menu.** Find the member and open the **···** menu.
3. **Edit or remove.** Select **Edit budget** to change the limit, refresh period, or spend alerts. Select **Remove budget** to lift the cap.

#### CLI

Re-run `budgets set user` with new values to change a budget. Removing one lifts that cap; a member covered by the [user default](#user-default-budgets) falls back to it:

```bash filename="terminal"
vercel ai-gateway budgets remove user teammate@example.com
```

```text filename="Output"
✓ Removed         budget for teammate
```

### User default budgets

A default budget applies to every team member without a custom budget, including members who join later. Setting a custom budget on a member overrides the default; see [Default budgets](#default-budgets) for the full semantics.

#### Dashboard

1. **Open the Users tab.** Go to the [**Users** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fbudgets%2Fusers\&title=AI+Gateway+User+Budgets) of the AI Gateway Budgets page.
2. **Set the user default.** Click **Set Default** (or the current default value, if one is set) and enter a spending limit in dollars and a refresh period in the **User Default** dialog.
3. **Save.** Every member without their own budget now inherits this limit.

#### CLI

```bash filename="terminal"
vercel ai-gateway budgets defaults set user --limit 50 --refresh-period monthly
```

```text filename="Output"
✓ Set default     user
  Limit           $50
  Refresh         monthly
  Applies to      every team member without their own budget, including existing ones
```

List defaults with `vercel ai-gateway budgets defaults list`, and remove the user default with `vercel ai-gateway budgets defaults remove user`.

## Budgets and credits

Budgets limit usage; they do not reserve or purchase capacity. Your team still needs [credits or a payment method](/docs/ai-gateway/pricing) to make requests.

> **💡 Note:** [BYOK](/docs/ai-gateway/authentication-and-byok/byok) spend isn't counted in
> budgets. Spend that draws on your own provider keys is metered separately and
> doesn't count toward any limit.


---

[View full sitemap](/docs/sitemap)
