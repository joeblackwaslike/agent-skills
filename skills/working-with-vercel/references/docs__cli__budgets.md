---
title: vercel budgets
product: vercel
url: /docs/cli/budgets
canonical_url: "https://vercel.com/docs/cli/budgets"
last_updated: 2018-10-20
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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c673ea829a32c47a7b1e70542eb1b868398a508d8348008d5299da65693222ef"
---

# vercel budgets

Use the `vercel budgets` command to view and manage your team's on-demand spend budget from the terminal. The budget you set here is the same [On-Demand Budget](/docs/spend-management) shown in your team's billing settings in the dashboard, so changes made from the CLI apply everywhere.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel CLI adds Spend Management](https://vercel.com/changelog/vercel-cli-adds-spend-management)
- [vercel usage](https://vercel.com/docs/cli/usage) — Learn how to view billing usage and costs, for your Vercel account using the vercel usage CLI command.
- [vercel buy](https://vercel.com/docs/cli/buy) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.
- [vercel domains](https://vercel.com/docs/cli/domains) — Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.
- [List AI Gateway budgets](https://vercel.com/docs/rest-api/ai-gateway/list-ai-gateway-budgets) — GET /ai-gateway/budgets/list — List the team's AI Gateway budgets \\(team/project/user scopes, plus default-covered api-k
- [vercel teams](https://vercel.com/docs/cli/teams) — Learn how to list, create, switch, invite, and manage your teams with the vercel teams CLI command.

Full cross-link map for this page: [/docs/cli/budgets.graph.md](/docs/cli/budgets.graph.md)
<!-- /docsgraph:related -->

Because the command reads and writes the budget programmatically, your agents and scripts can manage spend alongside human operators.

`vercel budgets` requires the Owner or Billing role on the team. [Spend Management](/docs/spend-management) is available at no additional cost to teams on the Pro plan and to Enterprise teams on the Flexible Commitment plan. The command is available in `vercel@59.23.0` and later.

## Usage

Running `vercel budgets` with no subcommand shows your current spend for the billing cycle and the configured budget. When no budget is set, the command reports your spend and prompts you to create one.

```bash filename="terminal"
$ vercel budgets
> No budget set on team my-team. Current spend is $63.33. Create one with `vercel --scope my-team budgets set --amount <dollars>`.
```

*Viewing current spend when no budget is set*

Once a budget is set, the same command shows a table that includes the current spend and the percent of the budget used alongside the budget's configuration.

```bash filename="terminal"
$ vercel budgets
  scope    amount    spent     used    status    pause    webhook
  team       $200    $63.33     32%    active    yes      https://example.com/spend
```

*Output when a budget is active*

The `scope` column shows what the budget applies to. Budgets apply to your team, which is separate from the global `--scope` option that selects the team the CLI acts on.

When a budget has alert history, `vercel budgets` also prints the three most recent alerts under a Recent alerts heading.

## vercel budgets set

Use `vercel budgets set` to create or update your team's budget. The `--amount` option is required and takes the budget in dollars, set per billing cycle. If you set an amount partway through a cycle, it accounts for your current spend.

```bash filename="terminal"
$ vercel budgets set --amount 200 --pause --webhook https://example.com/spend

> Pause all projects at 100% ($200). Production deployments become unavailable.
> Budget updated on team my-team.
  scope    amount    spent     used    status    pause    webhook
  team       $200    $63.33     32%    active    yes      https://example.com/spend
```

*Creating a budget that pauses projects and calls a webhook*

### Options

| Option      | Required | Description                                                                                                                                 |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `--amount`  | Yes      | The budget in dollars, set per billing cycle.                                                                                               |
| `--pause`   | No       | Pause the production deployments of all projects on the team when the budget is reached.                                                     |
| `--webhook` | No       | Send an HTTPS POST to this URL at spend thresholds. See [configuring a webhook](/docs/spend-management#configuring-a-webhook).               |

Vercel checks spend every few minutes, so the configured actions can trigger several minutes after your spend crosses the budget.

> **💡 Note:** Pausing stops the production deployments of every project on the team from
> serving traffic. Each project stays paused until you resume it manually.

## vercel budgets remove

Use `vercel budgets remove` to delete the team's budget. Pass `--yes` to skip the confirmation prompt, which is useful in scripts and automation.

```bash filename="terminal"
$ vercel budgets remove --yes
> Success! Disabled the $200 budget.
```

*Removing the budget without a confirmation prompt*

### Options

| Option  | Required | Description                        |
| ------- | -------- | ---------------------------------- |
| `--yes` | No       | Skip the confirmation prompt.      |

## vercel budgets alerts

Use `vercel budgets alerts` to list your team's budget alert history, newest first. Before this subcommand, you only heard about each alert as it fired through notifications, emails, and webhooks. Now you can review every alert the budget has triggered in one place. The `list` and `ls` aliases run the same default listing.

This subcommand is available in `vercel@65.2.0` and later.

```bash filename="terminal"
$ vercel budgets alerts
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
| `--next`   | No       | Show the next page of results.                                                                                                          |
| `--json`   | No       | Print the alerts with the team and the next-page cursor as JSON. `--format json` is also accepted.                                      |

## Related resources

- [Spend Management](/docs/spend-management)
- [Configuring a webhook](/docs/spend-management#configuring-a-webhook)

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel budgets` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
