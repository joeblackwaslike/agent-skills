---
title: vercel billing budgets
product: vercel
url: /docs/cli/budgets
canonical_url: "https://vercel.com/docs/cli/budgets"
last_updated: 2026-11-09
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/spend-management
  - /docs/rbac/access-roles
  - /docs/cli/alerts
  - /docs/cli/global-options
summary: View and manage Spend Management budgets for your team, projects, products, and organization from the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/budgets.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "69150f36a9f28dd38c34fc2701812ff2758bbbb5840963a7c2955829514a3113"
---

# vercel billing budgets

Use the `vercel billing budgets` command to view and manage your [Spend Management](/docs/spend-management) budgets from the terminal. These are the same budgets shown in your billing settings in the dashboard, so changes made from the CLI apply everywhere.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel CLI adds Spend Management](https://vercel.com/changelog/vercel-cli-adds-spend-management)
- [AI Gateway now supports team and project spend budgets](https://vercel.com/changelog/ai-gateway-spend-budgets-and-alerts)
- [Set per-user budgets on AI Gateway](https://vercel.com/changelog/set-per-user-budgets-on-ai-gateway)
- [vercel billing](https://vercel.com/docs/cli/billing) — Learn how to view your billing overview, usage, contracts, budgets, and invoices for your Vercel team using the vercel b
- [vercel billing usage](https://vercel.com/docs/cli/usage) — Learn how to view billing usage and costs, for your Vercel account using the vercel billing usage CLI command.
- [List AI Gateway budgets](https://vercel.com/docs/rest-api/ai-gateway/list-ai-gateway-budgets) — GET /ai-gateway/budgets/list — List the team's AI Gateway budgets \\(team/project/user scopes, plus default-covered api-k
- [vercel organizations](https://vercel.com/docs/cli/organizations) — Create and manage organizations and their child teams with the vercel organizations CLI command.
- [vercel buy](https://vercel.com/docs/cli/buy) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.

Full cross-link map for this page: [/docs/cli/budgets.graph.md](/docs/cli/budgets.graph.md)
<!-- /docsgraph:related -->

Because the command reads and writes budgets programmatically, your agents and scripts can manage spend alongside human operators. Every subcommand supports `--json`, which prints the result as JSON.

Team members can view budgets, spend, and alerts. Changing a budget requires the [Owner](/docs/rbac/access-roles#owner-role) or [Billing](/docs/rbac/access-roles#billing-role) role. The organization budget also needs an organization role: Admin or Viewer to view it, and Admin to change it. [Spend Management](/docs/spend-management) is available at no additional cost to teams on the Pro plan and to Enterprise teams on the Flexible Commitment plan.

## Choosing a budget

A budget can cover your whole team, one project, one product, or your whole organization. Pick one with an option:

| Option                           | Budget                                               |
| -------------------------------- | ---------------------------------------------------- |
| None                             | The team's budget                                    |
| `--project <name or ID>`, `-p`   | A project's budget                                   |
| `--product <name or ID>`         | A product's budget, such as `"Fast Data Transfer"`   |
| `--organization <slug or ID>`    | The organization's budget, from any team             |

`list` and `alerts` show every budget by default, and these options narrow them to one. They also take `--type` to filter by budget scope, for example `--type project,product`. `set` and `remove` act on the team's budget unless you pass an option. The global `--scope` option is different: it selects which team the CLI acts on.

## vercel billing budgets list

Use `vercel billing budgets list` to list your budgets. Running `vercel billing budgets` with no subcommand runs the same listing.

```bash filename="terminal"
$ vercel billing budgets list
> 3 budgets on team my-team
  type       name                 amount    status    pause    webhook
  project    my-app                 $100    active    yes      —
  product    Fast Data Transfer      $50    active    no       —
  team       my-team                $200    active    yes      https://example.com/spend
```

*Listing the team's budgets of every scope*

To list the organization budget, use `--organization`.

## vercel billing budgets inspect

Use `vercel billing budgets inspect` to see this billing cycle's spend against a budget, along with its most recent alerts. Without an option, it shows the team's budget.

```bash filename="terminal"
$ vercel billing budgets inspect
> Budget on team my-team
  type    name       amount     spent    used    status    pause    webhook
  team    my-team      $200    $63.33     32%    active    yes      https://example.com/spend
```

*Viewing spend against the team's budget*

When no budget is set, the command reports your current spend and shows how to create one:

```bash filename="terminal"
$ vercel billing budgets inspect --project my-app
> No budget set on project my-app. Current spend is $41.20. Create one with `vercel --scope my-team billing budgets set --project my-app --amount <dollars>`.
```

*Viewing a project's spend before it has a budget*

The CLI doesn't show spend for the organization budget yet. You can see it in the dashboard.

## vercel billing budgets set

Use `vercel billing budgets set` to create or update a budget. The `--amount` option sets the budget per billing cycle in whole dollars, and you must provide it when creating a budget. A new budget notifies you at 50%, 75%, and 100%. For an existing budget, you can change pause or webhook settings without passing `--amount`; settings you leave out keep their current values.

```bash filename="terminal"
$ vercel billing budgets set --amount 200 --pause --webhook https://example.com/spend
> Pause all projects on team my-team at 100% ($200). Production deployments become unavailable.
> Success! Budget created on team my-team.
  type    name       amount    status    pause    webhook
  team    my-team      $200    active    yes      https://example.com/spend
> Webhook secret: <WEBHOOK_SECRET>
> Store it now — it cannot be retrieved later.
```

*Creating a team budget that pauses projects and calls a webhook*

When `set` adds a webhook, it prints the webhook's secret once. Store it then, because it can't be retrieved later.

Use the same options to set other budgets:

```bash filename="terminal"
vercel billing budgets set --project my-app --amount 100 --pause
vercel billing budgets set --product "Fast Data Transfer" --amount 50
vercel billing budgets set --organization my-org --amount 10000
```

*Setting a project, product, and organization budget*

### Options

| Option                      | Required     | Description                                                                                                                                                                                          |
| --------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--amount`                  | For creation | The budget in whole dollars, per billing cycle. Omit it to keep the existing amount.                                                                                                                 |
| `--pause`, `--no-pause`     | No           | Pass `--pause` to pause production deployments when the budget is reached: every project for a team budget, or that project for a project budget. Pass `--no-pause` to turn pausing off.            |
| `--webhook`, `--no-webhook` | No           | Pass `--webhook <url>` to send an HTTPS POST to that URL at spend thresholds. Pass `--no-webhook` to remove it. See [configuring a webhook](/docs/spend-management#configuring-a-webhook).            |

Product and organization budgets can't pause deployments. They send notifications and call the webhook.

Vercel checks spend every few minutes, so the configured actions can trigger several minutes after your spend crosses the budget.

> **💡 Note:** Pausing stops the production deployments of the affected projects from
> serving traffic. Each project stays paused until you resume it manually.

## vercel billing budgets remove

Use `vercel billing budgets remove` to delete a budget. Without an option, it removes the team's budget. Pass `--yes` to skip the confirmation prompt, which is required in scripts and automation.

```bash filename="terminal"
$ vercel billing budgets remove --project my-app --yes
> Success! Removed the $100 budget on project my-app.
```

*Removing a project budget without a confirmation prompt*

A removed budget's alerts stay in `vercel billing budgets alerts`.

## vercel billing budgets alerts

Use `vercel billing budgets alerts` to list your budget alert history, newest first. It shows alerts for every budget unless you pass `--type` or one of the budget options above, and it includes alerts from earlier budgets on the same team, project, product, or organization.

```bash filename="terminal"
$ vercel billing budgets alerts
> 3 budget alerts on team my-team
  date                    type       name                 threshold      spent    budget amount    actions configured
  2026-11-02 14:33 UTC    project    my-app                     75%     $75.10             $100    notify
  2026-10-28 09:12 UTC    product    Fast Data Transfer         50%     $25.40              $50    notify
  2026-10-21 18:05 UTC    team       my-team                   100%    $200.00             $200    notify, webhook, pause
```

*Listing budget alert history, newest first*

Each row shows when the alert fired (in UTC), which budget it was for, the threshold crossed, the spend and budget amount at that time, and the actions configured for that threshold. The actions column reports what the threshold was set to do, not whether each action ran.

Budget alerts are distinct from observability alerts. For those, see [`vercel alerts`](/docs/cli/alerts).

### Options

| Option    | Required | Description                                                                                                                                  |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `--since` | No       | Shorthand `-s`. Only show alerts on or after this time. Accepts an ISO 8601 timestamp or a relative time like `1d`, `7d`, `30d`.             |
| `--until` | No       | Shorthand `-u`. Only show alerts on or before this time. Accepts an ISO 8601 timestamp or a relative time like `1d`, `7d`, `30d`.            |
| `--limit` | No       | The number of alerts to return, between 1 and 100.                                                                                           |
| `--next`  | No       | Show the next page of results. Pass the cursor from the previous page; it keeps the same filters.                                            |

## Related resources

- [Spend Management](/docs/spend-management)
- [Configuring a webhook](/docs/spend-management#configuring-a-webhook)

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel billing budgets` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).

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
