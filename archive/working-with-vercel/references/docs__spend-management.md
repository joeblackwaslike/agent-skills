---
title: Spend Management
product: vercel
url: /docs/spend-management
canonical_url: "https://vercel.com/docs/spend-management"
last_updated: 2026-09-18
type: how-to
prerequisites:
  []
related:
  - /docs/plans/pro-plan
  - /docs/plans/enterprise
  - /docs/pricing/flex-commit
  - /docs/pricing
  - /docs/organizations
summary: Set budgets for your team, projects, products, or organization, and get notified, trigger a webhook, or pause deployments when spend reaches them.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/spend-management.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "5bf178bd6c458c55be33ef5dc60d2e9871a4c5d3dbc5a5e048cfdaa7b14c0463"
---

# Spend Management

> Spend Management is available on Enterprise and Pro plans (Enterprise teams require the Flexible Commitment plan)
>
> Those with the owner and billing roles can access this feature

Spend Management lets you set budgets on your spend and get notified or take action automatically when spend reaches them. A budget can cover your whole team, one project, one product, or your whole organization (see [Budget scopes](#budget-scopes)). When a budget is reached, you can:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel CLI adds Spend Management](https://vercel.com/changelog/vercel-cli-adds-spend-management)
- [Set budgets for projects and products in Spend Management](https://vercel.com/changelog/set-budgets-for-projects-and-products-in-spend-management)
- [Spend Management expands to Enterprise Flexible Commitment plans](https://vercel.com/changelog/spend-management-enterprise-flex)
- [How to keep your storefront running through Black Friday](https://vercel.com/kb/guide/black-friday-reliability) — Learn how to tune alerts, bot rules, and spend limits. Rehearse rollback so your team can recover quickly from checkout
- [How to reduce build costs on Vercel](https://vercel.com/kb/guide/how-to-reduce-build-costs) — Find which projects drive your Build CPU Minutes, then lower them by skipping unneeded builds, shortening each build, an
- [How to reduce Vercel Image Optimization costs](https://vercel.com/kb/guide/reduce-image-optimization-costs-on-vercel) — Learn how to reduce Vercel Image Optimization costs in Next.js by tuning cache TTLs, image sizes, formats, and quality.
- [The Complete Guide to Vercel Daemons](https://vercel.com/kb/guide/vercel-daemons) — Run background workers with Vercel Daemons. Learn how to deploy container images, configure resources, handle shutdowns,
- [Use Vercel Daemons with eve agents](https://vercel.com/kb/guide/vercel-daemons-eve-agents) — Connect eve agents to Vercel Daemons to process queued jobs, offload heavy work, and react to events. Includes code, aut
- [Spend Management now available for Pro users](https://vercel.com/changelog/spend-management-now-available-for-pro-users)
- [Introducing Spend Management](https://vercel.com/blog/introducing-spend-management-realtime-usage-alerts-sms-notifications)
- [Spend Management now pauses production deployments by default](https://vercel.com/changelog/spend-management-now-pauses-production-deployments-by-default)
- [AI Gateway Observability and Spend](https://vercel.com/docs/ai-gateway/observability-and-spend) — Monitor AI Gateway requests and control costs with logs, generation lookup, custom reporting, budgets, and OpenTelemetry

Full cross-link map for this page: [/docs/spend-management.graph.md](/docs/spend-management.graph.md)
<!-- /docsgraph:related -->

- [Receive a notification](/docs/spend-management#managing-alert-threshold-notifications)
- [Trigger a webhook](/docs/spend-management#configuring-a-webhook)
- [Pause production deployments](/docs/spend-management#pausing-projects), for team and project budgets

  > **💡 Note:** Setting a budget does not stop usage on its own. To stop incurring
  > costs above the budget amount, turn on [**Pause production
  > deployments**](#pausing-projects) on a team or project budget so Vercel
  > pauses your projects when spend reaches the budget amount.

Spend Management is available at no additional cost to [Pro](/docs/plans/pro-plan) teams and to [Enterprise](/docs/plans/enterprise) teams on the [Flexible Commitment](/docs/pricing/flex-commit) plan.

Each budget is an amount in USD per billing cycle.

Setting the amount halfway through a billing cycle considers your current spend. You can increase or decrease a budget as needed. If you set it below the current spend, Spend Management triggers the budget's actions (including pausing projects) on its [next check](#how-vercel-checks-your-spend-amount).

## What does Spend Management include?

Budgets apply to [metered resources](/docs/pricing#managed-infrastructure-billable-resources). What counts toward a team budget depends on your plan:

- **Pro**: metered usage that goes beyond your Pro plan [monthly credit](/docs/plans/pro-plan#monthly-credit)
- **Enterprise on Flexible Commitment**: the metered usage that draws down from your prepaid balance

It **does not** include seats, integrations (such as Marketplace), or separate [add-ons](/docs/pricing#pro-plan-add-ons), which Vercel charges on a monthly basis.

### Budget scopes

| Scope        | What counts toward it                                                                                                                                                                                                                                  | Can pause                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| Team         | Metered usage of every project on the team                                                                                                                                                                                                             | Every project on the team |
| Project      | Metered usage of one project. On Pro, this is usage before the [monthly credit](/docs/plans/pro-plan#monthly-credit)                                                                                                                                   | That project              |
| Product      | Metered usage of one product across the team, such as Fast Data Transfer. On Pro, this is usage before the [monthly credit](/docs/plans/pro-plan#monthly-credit) | No                        |
| Organization | Metered usage of every team in an [organization](/docs/organizations). Available on the Enterprise Flexible Commitment plan                                                                                             | No                        |

Usage counts toward every budget that covers it. For example, a project's usage counts toward its project budget and toward the team budget. When [AI Gateway](/docs/ai-gateway) and v0 usage is billed on your invoice, it counts toward the team budget but not toward project budgets, because it isn't tied to a project. On Pro, AI Gateway and v0 usage doesn't count toward budgets.

On Pro, a team budget only counts usage beyond the monthly credit, while project and product budgets count all of their usage, including usage the credit covers. A project or product budget can therefore be reached before the team budget counts any spend.

### How Vercel checks your spend

Vercel checks your metered resource usage often to determine if your spend is approaching or has exceeded a budget amount. This check happens every few minutes.

Because these checks are not continuous, notifications, webhooks, and project pausing can trigger several minutes after your spend reaches the budget amount. Plan for this delay if you are relying on Spend Management to cap usage, and consider setting your budget amount below the absolute maximum you are willing to spend.

## Managing budgets

1. You must have an [Owner](/docs/rbac/access-roles#owner-role) or [Billing](/docs/rbac/access-roles#billing-role) role on your team
2. From your team's [dashboard](/dashboard), open **Settings** in the sidebar, then select [**Billing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling\&title=Go+to+Billing) and **Spend Management**. For an organization budget, open **Billing** and **Spend Management** from your organization's sidebar instead
3. Select **Add Budget** and choose **Team**, **Project**, **Product**, or **Organization**
4. Set the budget amount in USD
5. Choose what happens when the budget is reached: [pause production deployments](#pausing-projects) or [trigger a webhook URL](#configuring-a-webhook). [Notifications](#managing-alert-threshold-notifications) are on for every budget

The Spend Management page lists all your budgets with their current spend. To edit or delete a budget, use the menu on its row. Deleting a budget keeps its alert history.

## Managing your budget from the CLI

You can view and manage your budgets from the Vercel CLI with the `vercel billing budgets` command. Team members can view budgets, and changing one requires the [Owner](/docs/rbac/access-roles#owner-role) or [Billing](/docs/rbac/access-roles#billing-role) role.

```bash filename="terminal"
vercel billing budgets
vercel billing budgets inspect
vercel billing budgets set --amount 200 --pause --webhook https://example.com/spend
vercel billing budgets set --project my-app --amount 100
vercel billing budgets alerts
vercel billing budgets remove --yes
```

`vercel billing budgets` lists every budget, and `inspect` shows this cycle's spend against one. `set` creates or updates a budget, and `remove` deletes it. They act on the team's budget unless you pass `--project`, `--product`, or `--organization`. `--pause` pauses production deployments when the budget is reached, and `--webhook` triggers an HTTPS POST at spend thresholds. `alerts` lists the alert history. For the full reference, see [`vercel billing budgets`](/docs/cli/budgets).

## Managing alert threshold notifications

When you create a budget, Vercel automatically enables web and email notifications for it. These get triggered when spend reaches **50%, 75%, and 100%** of the budget. You can also receive [SMS notifications](/docs/spend-management#sms-notifications) when spend reaches **100%** of a budget. To manage your notifications:

1. You must have an [Owner](/docs/rbac/access-roles#owner-role) or [Billing](/docs/rbac/access-roles#billing-role) role on your team
2. From your team's [dashboard](/dashboard), open **Settings** in the sidebar
3. Select **My Notifications** from the list
4. Under **Team**, ensure that **Spend Management** is selected
5. Select the  icon and select the thresholds for which you would like to receive web and email notification, as described in [Notifications](/docs/notifications)
6. Repeat the previous step for the Web, Email, and SMS notification sections

   > **💡 Note:** Following these steps only configures **your** notifications. Team members
   > with the Owner or Billing role can configure their own preferences

### SMS notifications

In addition to web and email notifications, you can enable SMS notifications for Spend Management. They are only triggered when spend reaches 100% of the budget amount.

To enable SMS notifications:

1. You must have an [Owner](/docs/rbac/access-roles#owner-role) or [Billing](/docs/rbac/access-roles#billing-role) role on your team. Note that following these steps only configures **your** SMS notifications. Each member with an Owner or Billing role can configure their own SMS notifications for Spend Management
2. [Add or edit a budget](#managing-budgets)
3. From your team's [dashboard](/dashboard), open **Settings** in the sidebar
4. Select **My Notifications** from the list, scroll to **SMS** at the bottom of the page and toggle the switch to Enabled. If your personal profile has a phone number associated with it, SMS notifications will be enabled by default
5. Under **Team**, ensure that **Spend Management** is selected
6. Enter your phone number and follow the steps to verify it

## Pausing projects

Team and project budgets can automatically pause production deployments when the budget is reached. A team budget pauses every project on the team, and a project budget pauses only that project. Product and organization budgets can't pause deployments. While paused, your production deployments stop serving traffic: your websites, APIs, and functions are unavailable to visitors until you resume each project.

1. On the **Spend Management** page, [add or edit](#managing-budgets) a team or project budget
2. Turn on **Pause production deployments** (**Pause production** for a project budget) and follow the prompts to confirm
3. When spend reaches the budget, Vercel pauses the production deployment of every project on the team, or of the one project

On Pro, a project budget counts usage before the [monthly credit](/docs/plans/pro-plan#monthly-credit), so it can pause a project while the credit still covers that project's usage.

> **💡 Note:** Pausing is not instantaneous. Because Vercel [checks your spend](#how-vercel-checks-your-spend-amount) every few minutes, projects can keep serving traffic and accruing usage for several minutes after your spend reaches the budget amount.

Pausing only affects production deployments. It does not stop [AI Gateway](/docs/ai-gateway) API key usage or v0 usage billed to your team. AI Gateway spend can be managed with [AI Gateway budgets](/docs/ai-gateway/observability-and-spend/budgets). Stored resources are not deleted, so any storage-related charges will continue to be billed to your team, including:

- [Deployment Storage and Functions Storage](/docs/deployment-storage): The build output and function bundles retained with your deployments, billed in GB-months. To reduce these charges, shorten your [deployment retention policy](/docs/deployment-retention) or [delete old deployments](/docs/deployment-storage/optimize).
- [Vercel Blob storage](/docs/vercel-blob/usage-and-pricing): Billed on the monthly average size of your blob stores.
- [Vercel Container Registry image storage](/docs/container-registry/limits-and-pricing): Billed for the container images stored in your registry.

When visitors access your production deployment while it is paused, they will see a [503 DEPLOYMENT\_PAUSED error](/docs/errors/deployment_paused).

### Unpausing projects

Projects need to be resumed on an individual basis, either [through the dashboard](/docs/projects/managing-projects#resuming-a-project), with **Resume Project** in the project budget's menu on the Spend Management page, or with the [Vercel REST API](/docs/rest-api/projects/unpause-a-project).

Projects won't automatically unpause if you increase the budget amount, so you must resume each project manually. When you raise a paused project's budget above its current spend on the Spend Management page, the page offers to resume the project.

## Configuring a webhook

You can configure a webhook URL to trigger events such as serving a static version of your site, [pausing a project](/docs/projects/managing-projects#pausing-a-project), or sending a Slack notification.

Each budget has its own webhook URL. Vercel sends an [HTTPS POST request](#webhook-payload) to it [when spend reaches one of the budget's thresholds](#spend-amount), and the payload says which budget it's for.

To configure a webhook for spend management:

1. [Add or edit a budget](#managing-budgets) on the **Spend Management** page
2. Enter the webhook URL for the endpoint that will receive a POST request. To be accessible, make sure your endpoints are public
3. Secure your webhooks by checking the [`x-vercel-signature`](/docs/headers/request-headers#x-vercel-signature) request header. The header contains an HMAC-SHA1 hash of the request body, created with the secret that Vercel shows when you first save your webhook. To learn more, see the [securing webhooks](/docs/webhooks/webhooks-api#securing-webhooks) documentation

### Webhook payload

The webhook URL receives an HTTP POST request with the following JSON payload for each event:

#### Budget reached

Sent when spend reaches 50%, 75%, and 100% of a budget. For budgets created before September 2025, this is only sent at 100%. If spend continues past the budget, Vercel also sends this event each time the spend crosses another 100% of the budget, from 200% up to 1,000%. For these events, `thresholdPercent` is greater than 100.

| Parameters         | Type                              | Description                                                                                                                                                     |
| ------------------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `budgetAmount`     | int    | The budget amount that you have set                                                                                                                             |
| `currentSpend`     | number | The spend that [counts toward the budget](/docs/spend-management#what-does-spend-management-include) during the current billing cycle                           |
| `teamId`           | string | Your Vercel Team ID                                                                      |
| `thresholdPercent` | int    | The percentage of the total budget amount for the threshold that triggered this alert                                                                           |
| `scope`            | string | The scope of the budget: `team`, `project`, `product`, or `organization`                                                                                   |
| `scopeId`          | string | What the budget covers: the team, project, product, or organization ID                                                                                          |
| `scopeName`        | string | The name of what the budget covers, such as the project's name. Omitted when the name can't be found. Names can change, so use `scopeId` to identify the budget |

Vercel sends these parameters inside the `payload` object of the request body. The request body uses the same format as other [webhook payloads](/docs/webhooks/webhooks-api#payload), and the event type is `budget.reached`:

```json filename="webhook-payload.json"
{
  "id": "2qn7PZrx89yxY34vEZPD3",
  "type": "budget.reached",
  "createdAt": 1759449600000,
  "payload": {
    "user": { "id": null },
    "team": { "id": "team_jkT8yZ3oE1u6xLo8h6dxfNc3" },
    "budgetAmount": 100,
    "currentSpend": 100,
    "teamId": "team_jkT8yZ3oE1u6xLo8h6dxfNc3",
    "thresholdPercent": 100,
    "scope": "project",
    "scopeId": "prj_9KdfNe3p7fBcA2qQYhEhrNLHgRzK",
    "scopeName": "my-app"
  }
}
```

## Spend Management activity

Vercel displays all spend management activity in the [**Activity** section in your team dashboard sidebar](/docs/activity-log). This includes budget creation and updates, and project pausing and unpausing.

## More resources

For more information on Vercel's pricing, guidance on optimizing consumption, and invoices, see the following resources:

- [How are resources used on Vercel?](/docs/pricing/how-does-vercel-calculate-usage-of-resources)
- [Manage and optimize usage](/docs/pricing/manage-and-optimize-usage)
- [Understanding my invoice](/docs/pricing/understanding-my-invoice)
- [How to reduce build costs on Vercel](/kb/guide/how-reduce-build-costs)
- [Spend limits for Vercel](https://youtu.be/-_vpoayWTps?si=Jv6b8szx68lVHGYz)

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
