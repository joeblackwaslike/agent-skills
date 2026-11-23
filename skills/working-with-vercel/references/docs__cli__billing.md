---
title: vercel billing
product: vercel
url: /docs/cli/billing
canonical_url: "https://vercel.com/docs/cli/billing"
last_updated: 2026-11-02
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/budgets
  - /docs/cli/usage
  - /docs/rbac/access-roles
  - /docs/cli/global-options
summary: Learn how to view your billing overview, usage, budgets, and invoices for your Vercel team using the vercel billing CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/billing.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "5e512b934ae733e876d98cbcc74b0e002733e745a5059c7b5e8a4e7f94d9e328"
---

# vercel billing

The `vercel billing` command groups the commands for your team's billing. Use it to see your plan and balance due, check usage and costs, manage your Spend Management budgets, list, inspect, or download invoices, and see an estimate of your next invoice.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Billing CLI is now available](https://vercel.com/changelog/vercel-billing-cli-is-now-available)
- [Billing & Invoices](https://vercel.com/docs/pricing/understanding-my-invoice) — Learn how Vercel invoices are structured for Pro and Enterprise plans, including plan charges, credits, and usage-based
- [Billing FAQ for Pro Plan](https://vercel.com/docs/plans/pro-plan/billing) — This page covers frequently asked questions around payments, invoices, and billing on the Pro plan.
- [Billing FAQ for Enterprise Plan](https://vercel.com/docs/plans/enterprise/billing) — This page covers frequently asked questions around payments, invoices, and billing on the Enterprise plan.
- [vercel organizations](https://vercel.com/docs/cli/organizations) — Create and manage organizations and their child teams with the vercel organizations CLI command.
- [vercel buy](https://vercel.com/docs/cli/buy) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.

Full cross-link map for this page: [/docs/cli/billing.graph.md](/docs/cli/billing.graph.md)
<!-- /docsgraph:related -->

Running `vercel billing` with no subcommand lists these commands.

| Command                                                       | Description                                                       |
| ------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`vercel billing budgets`](/docs/cli/budgets)                 | View and manage Spend Management budgets                          |
| [`vercel billing invoices`](#vercel-billing-invoices)         | List, inspect, and download invoices                              |
| [`vercel billing overview`](#vercel-billing-overview)         | Show the plan, billing cycle, balance due, overdue invoices, and invoice details |
| [`vercel billing usage`](/docs/cli/usage)                     | Show billing usage and costs                                      |

You can place options before or after subcommands. For example, list budget alerts as JSON:

```bash filename="terminal"
vercel billing --json budgets alerts
```

*Listing budget alerts with an option before the subcommands*

## vercel billing invoices

Use `vercel billing invoices` to work with your team's invoices from the terminal. Every subcommand supports `--json`.

### list

Use `vercel billing invoices list` to list your team's invoices, newest first. Running `vercel billing invoices` with no subcommand runs the same listing. For example, list the three most recent invoices:

```bash filename="terminal"
$ vercel billing invoices list --limit 3
  Team            my-team

  Issued       Number          Status   Total    Invoice ID
  2026-10-01   RPKFGFVN-0012   Paid     $10.00   inv_c3RyaXBlOmluXzFVTHFw…
  2026-09-01   RPKFGFVN-0011   Paid     $10.00   inv_c3RyaXBlOmluXzFVQXph…
  2026-08-01   RPKFGFVN-0010   Paid     $10.00   inv_c3RyaXBlOmluXzFUempN…

  Next page:
    vercel billing invoices list --limit 3 --next <NEXT_CURSOR>
```

*Listing the three most recent invoices*

This example abbreviates invoice IDs and uses `<NEXT_CURSOR>` for the pagination cursor. Copy the full values from your CLI output.

| Option     | Required | Description                                                                                                                   |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `--status` | No       | Only show invoices with this status. Repeat it for more than one: `draft`, `open`, `paid`, `uncollectible`, `void`. Defaults to `open`, `paid`, and `uncollectible`. |
| `--limit`  | No       | Shorthand `-n`. The number of invoices to show. Defaults to 20, up to 100.                                                    |
| `--next`   | No       | Show the next page of results, using the cursor from the previous page. The cursor keeps the statuses of the first page, so you can't combine `--next` with `--status`. |
| `--json`   | No       | Print the invoices and the next-page cursor as JSON.                                                                          |

### inspect

Use `vercel billing invoices inspect <invoice>` to show an invoice's status, dates, totals, and line items. Replace `<INVOICE_ID>` with the full invoice ID from `list`:

```bash filename="terminal"
$ vercel billing invoices inspect <INVOICE_ID>
  Invoice         RPKFGFVN-0012
  Status          Paid
  Issued          2026-10-01
  Paid            2026-10-01
  Subtotal        $10.00
  Total           $10.00
  Invoice ID      inv_c3RyaXBlOmluXzFVTHFw…

  Item                    Period                     Quantity   Amount
  Fast Data Transfer      2026-09-01 to 2026-10-01   0          $0.00
  Build CPU Minutes       2026-09-01 to 2026-10-01   0          $0.00
  ...
```

*Inspecting an invoice and its line items*

### upcoming

Use `vercel billing invoices upcoming` to see an estimate of your team's next invoice and its line items. Amounts can change until the end of the billing period. It shows up to five line items. Use `--json` to read all of them.

This subcommand is available in `vercel@65.10.0` and later.

```bash filename="terminal"
$ vercel billing invoices upcoming
  Team            my-team

  Invoice         Upcoming
  Scheduled       2026-12-01
  Subtotal        $0.00
  Estimated Total $0.00

  Item                          Period                     Quantity   Amount
  Blob Storage Size             2026-11-01 to 2026-12-01   0          $0.00
  Private Data Transfer         2026-11-01 to 2026-12-01   0          $0.00
  ...

  Amounts are estimates and may change until the end of the billing period.
```

*Viewing the upcoming invoice estimate*

Upcoming invoices need a team with an active paid subscription and access to its invoices. They have no invoice ID or PDF, so you can't pass them to `inspect` or `download`.

| Option   | Required | Description                                                                                               |
| -------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `--json` | No       | Print the estimates as JSON. An empty `invoices` array means the team has no upcoming invoice.             |

### download

Use `vercel billing invoices download <invoice>` to save an invoice as a PDF. By default, it writes `<INVOICE_NUMBER>.pdf` to the current directory. It never overwrites an existing file. Replace `<INVOICE_ID>` with the full invoice ID from `list`:

```bash filename="terminal"
$ vercel billing invoices download <INVOICE_ID> --output invoices/september.pdf
✓ Downloaded      invoices/september.pdf
```

*Downloading an invoice into an \`invoices\` folder in the current directory*

| Option     | Required | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `--output` | No       | Shorthand `-o`. The file to write. Use `-` to write the PDF to stdout. |

## vercel billing overview

Use `vercel billing overview` to see your team's plan, billing status, billing cycle, balance due, overdue invoices, and invoice details in one command.

This subcommand is available in `vercel@65.15.0` and later. It shows invoice details in `vercel@65.17.0` and later.

```bash filename="terminal"
$ vercel billing overview
  Team            my-team

  Plan            Pro
  Status          Active
  Billing Cycle   2026-10-01 to 2026-11-01
  Balance Due     $35.30
  Overdue         $20.10 (1 invoice)

  Invoice Email    invoices@example.com
  Company Name     Example Inc.
  Billing Address  340 S Lemon Ave, Walnut, CA 91789, US
  Tax ID           12-3456789 (us_ein)

  See unpaid invoices:
    vercel billing invoices list --status open --status uncollectible
```

*Viewing the billing overview for a team with an overdue invoice*

| Row             | Description                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `Plan`          | Your team's Vercel plan, such as Hobby, Pro, or Enterprise. The overview doesn't show v0 plans or add-ons.                                   |
| `Status`        | Your team's billing status, such as `Active`. During a trial, it shows when the trial ends, for example `Trial, ends 2026-11-20`, or `Trialing` if your role can't read the trial dates. |
| `Billing Cycle` | The start and end dates of the current billing cycle, in UTC. It only appears for plans that show a billing cycle in the dashboard.          |
| `Balance Due`   | The unpaid amount of your open and uncollectible invoices.                                                                                   |
| `Overdue`       | The part of the balance due that's past its due date, with the number of overdue invoices, or `None`.                                        |
| `Invoice Email` | The email address that receives your team's invoices. Without one, invoices go to the email address of the team's creator, or to your account's email address on a personal account.                  |
| `Company Name`  | The name shown on your invoices instead of your team name.                                                                                   |
| `Billing Address` | The billing address shown on your invoices, on one line.                                                                                   |
| `Tax ID`        | The tax ID shown on your invoices, followed by its type, for example `12-3456789 (us_ein)`.                                                  |
| `Purchase Order` | The purchase order line shown on your invoices.                                                                                             |
| `Invoice Language` | The language code for your invoices, such as `en`.                                                                                       |

`Balance Due` and `Overdue` count the same invoices as [`vercel billing invoices list`](#list), including v0 invoices, so both need access to your team's invoices. Without that access, the overview leaves out those two rows and shows a warning to ask a team owner for access, and the command still exits with `0`.

The invoice details appear in a second block after `Overdue`, with one row for each detail that's set. The overview also leaves out any detail your role can't read, so a missing row doesn't mean the detail is empty. The Owner, Billing, and Member [roles](/docs/rbac/access-roles) can read all six details, and other roles can't read any. When no details show, the overview leaves out the block.

| Option   | Required | Description                                                                                                                                                                                     |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--json` | No       | Print the overview as JSON. The `billing` object holds `plan`, `status`, `period`, `trial`, and `balance`, plus the invoice details `email`, `name`, `address`, `tax`, `purchaseOrder`, and `language` with the API's names and shapes. `address` is an object with up to six fields (`line1`, `line2`, `city`, `state`, `postalCode`, and `country`), and `tax` is an object with `type` and `id`. An empty invoice detail is `null` or left out. The API also leaves out any detail your role can't read, so a missing field doesn't mean the detail is empty. Dates are millisecond timestamps and amounts are strings. Without access to invoices, `billing.balance` is `null` and a top-level `warnings` array explains why. |

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel billing` command:

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
