---
title: vercel billing budgets
product: vercel
url: /docs/cli/budgets
canonical_url: "https://vercel.com/docs/cli/budgets"
last_updated: 2026-11-03
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/spend-management
  - /docs/cli/alerts
  - /docs/cli/global-options
summary: "View and manage your team's on-demand spend budget from the Vercel CLI."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/budgets.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "4e821cf244da5c5306158325c3634072e800025f9d0fb1a3c623ca76328e9d02"
---

# vercel billing budgets

Use the `vercel billing budgets` command to view and manage your team's on-demand spend budget from the terminal. The budget you set here is the same [On-Demand Budget](/docs/spend-management) shown in your team's billing settings in the dashboard, so changes made from the CLI apply everywhere.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel CLI adds Spend Management](https://vercel.com/changelog/vercel-cli-adds-spend-management)
- [vercel billing](https://vercel.com/docs/cli/billing) — Learn how to view usage, contracts, budgets, and invoices for your Vercel team using the vercel billing CLI command.
- [vercel billing usage](https://vercel.com/docs/cli/usage) — Learn how to view billing usage and costs, for your Vercel account using the vercel billing usage CLI command.
- [vercel organizations](https://vercel.com/docs/cli/organizations) — Create and manage organizations and their child teams with the vercel organizations CLI command.
- [vercel buy](https://vercel.com/docs/cli/buy) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.
- [vercel domains](https://vercel.com/docs/cli/domains) — Learn how to buy, transfer, and manage your domains using the vercel domains CLI command.

Full cross-link map for this page: [/docs/cli/budgets.graph.md](/docs/cli/budgets.graph.md)
<!-- /docsgraph:related -->

Because the command reads and writes the budget programmatically, your agents and scripts can manage spend alongside human operators. Every subcommand supports `--json`, which prints the result as JSON.

`vercel billing budgets` requires the Owner or Billing role on the team. [Spend Management](/docs/spend-management) is available at no additional cost to teams on the Pro plan and to Enterprise teams on the Flexible Commitment plan.

## vercel billing budgets list

Use `vercel billing budgets list` to list the budgets on your team. Running `vercel billing budgets` with no subcommand runs the same listing.

```bash filename="terminal"
$ vercel billing budgets list
> Budgets
  scope    amount    status    pause    webhook
  team       $200    active    yes      https://example.com/spend
```

*Listing the team's budgets*

The `scope` column shows what the budget applies to. Budgets apply to your team, which is separate from the global `--scope` option that selects the team the CLI acts on.

## vercel billing budgets inspect

Use `vercel billing budgets inspect` to see your current spend for the billing cycle against the configured budget. When no budget is set, the command reports your spend and shows how to create one.

```bash filename="terminal"
$ vercel billing budgets inspect
> No budget set on team my-team. Current spend is $63.33. Create one with `vercel --scope my-team billing budgets set --amount <dollars>`.
```

*Viewing current spend when no budget is set*

Once a budget is set, the command shows the current spend and the percent of the budget used alongside the budget's configuration.

```bash filename="terminal"
$ vercel billing budgets inspect
  scope    amount    spent     used    status    pause    webhook
  team       $200    $63.33     32%    active    yes      https://example.com/spend
```

*Output when a budget is active*

When the budget has alert history, `vercel billing budgets inspect` also prints the three most recent alerts under a Recent alerts heading.

## vercel billing budgets set

Use `vercel billing budgets set` to create or update your team's budget. The `--amount` option sets the budget per billing cycle in whole dollars, with a minimum of 1. You must provide it when creating a budget. If you set an amount partway through a cycle, it accounts for your current spend.

For an existing budget, you can update pause or webhook settings without passing `--amount`. Omitted settings keep their existing values.

```bash filename="terminal"
$ vercel billing budgets set --amount 200 --pause --webhook https://example.com/spend

> Pause all projects on team my-team at 100% ($200). Production deployments become unavailable.
> Success! Budget updated on team my-team.
  scope    amount    status    pause    webhook
  team       $200    active    yes      https://example.com/spend
> Webhook secret: <WEBHOOK_SECRET>
> Store it now — it cannot be retrieved later.
```

*Creating a budget that pauses projects and calls a webhook*

When `set` adds a webhook, it prints the webhook's secret once. Store it then, because it can't be retrieved later.

To turn off automatic pausing without changing the budget amount:

```bash filename="terminal"
vercel billing budgets set --no-pause
```

*Updating pause settings on an existing budget*

### Options

| Option                      | Required     | Description                                                                                                                                                                                                         |
| --------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--amount`                  | For creation | The budget in whole dollars, set per billing cycle. Minimum 1. Omit it to keep the existing amount when updating pause or webhook settings.                                                                         |
| `--pause`, `--no-pause`     | No           | Pass `--pause` to pause the production deployments of all projects on the team when the budget is reached. Pass `--no-pause` to turn automatic pausing off.                                                         |
| `--webhook`, `--no-webhook` | No           | Pass `--webhook <url>` to send an HTTPS POST to that URL at spend thresholds. Pass `--no-webhook` to remove the existing budget webhook. See [configuring a webhook](/docs/spend-management#configuring-a-webhook). |

Pass at least one setting to `set`. You can't combine `--pause` with `--no-pause`, or `--webhook` with `--no-webhook`.

Vercel checks spend every few minutes, so the configured actions can trigger several minutes after your spend crosses the budget.

> **💡 Note:** Pausing stops the production deployments of every project on the team from
> serving traffic. Each project stays paused until you resume it manually.

## vercel billing budgets remove

Use `vercel billing budgets remove` to delete the team's budget. Pass `--yes` to skip the confirmation prompt, which is useful in scripts and automation.

```bash filename="terminal"
$ vercel billing budgets remove --yes
> Success! Removed the $200 budget on team my-team.
```

*Removing the budget without a confirmation prompt*

### Options

| Option  | Required | Description                        |
| ------- | -------- | ---------------------------------- |
| `--yes` | No       | Skip the confirmation prompt.      |

## vercel billing budgets alerts

Use `vercel billing budgets alerts` to list your team's budget alert history, newest first. Before this subcommand, you only heard about each alert as it fired through notifications, emails, and webhooks. Now you can review every alert the budget has triggered in one place.

```bash filename="terminal"
$ vercel billing budgets alerts
> 3 budget alerts on team my-team
  date                    budget    threshold      spent    budget amount    actions configured
  2026-09-21 14:33 UTC    team            50%    $313.33             $600    notify
  2026-09-19 23:12 UTC    team           100%    $313.33             $250    notify, pause
  2026-09-19 02:35 UTC    team            75%    $230.00             $300    notify
```

*Listing budget alert history, newest first*

Each row shows the alert date in UTC, the budget scope, the threshold crossed, the spend and budget amount at that time, and the actions configured for that threshold. The actions configured column reports what the threshold was set to do, such as notify, webhook, or pause, not whether each action ran. Every threshold prints as a plain percent, including thresholds above 100%.

Budget alerts are distinct from observability alerts. For those, see [`vercel alerts`](/docs/cli/alerts).

### Options

| Option     | Required | Description                                                                                                                             |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `--since`  | No       | Shorthand `-s`. Only show alerts on or after this time. Accepts an ISO 8601 timestamp or a relative time like `1d`, `7d`, `30d`. Must be earlier than `--until`. |
| `--until`  | No       | Shorthand `-u`. Only show alerts on or before this time. Accepts an ISO 8601 timestamp or a relative time like `1d`, `7d`, `30d`. Must be later than `--since`.  |
| `--limit`  | No       | The number of alerts to return, between 1 and 100.                                                                                      |
| `--next`   | No       | Show the next page of results. Pass the cursor from the previous page.                                                                  |
| `--json`   | No       | Print the alerts with the team and the next-page cursor as JSON.                                                                        |

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
