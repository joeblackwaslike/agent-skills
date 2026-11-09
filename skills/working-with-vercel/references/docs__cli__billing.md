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
  - /docs/cli/contract
  - /docs/cli/usage
  - /docs/cli/global-options
summary: Learn how to view usage, contracts, budgets, and invoices for your Vercel team using the vercel billing CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/billing.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "5555bbdf87982a99f6a63448bfa752a27cebe9ce6bf27b40332ee4695248a135"
---

# vercel billing

The `vercel billing` command groups the commands for your team's billing. Use it to check usage and costs, review contract commitments, manage your Spend Management budget, list, inspect, or download invoices, and see an estimate of your next invoice.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel buy](https://vercel.com/docs/cli/buy) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.
- [vercel organizations](https://vercel.com/docs/cli/organizations) — Create and manage organizations and their child teams with the vercel organizations CLI command.
- [vercel pricing](https://vercel.com/docs/cli/pricing) — Look up Hobby, Pro, and Enterprise features from the public Vercel pricing table using the CLI.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/billing.graph.md](/docs/cli/billing.graph.md)
<!-- /docsgraph:related -->

Running `vercel billing` with no subcommand lists these commands.

| Command                                                       | Description                                                  |
| ------------------------------------------------------------- | ------------------------------------------------------------ |
| [`vercel billing budgets`](/docs/cli/budgets)                 | View and manage your team's on-demand spend budget           |
| [`vercel billing contract`](/docs/cli/contract)               | Show contract information for all billing periods            |
| [`vercel billing invoices`](#vercel-billing-invoices)         | List, inspect, and download invoices                         |
| [`vercel billing usage`](/docs/cli/usage)                     | Show billing usage and costs                                 |

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
vercel billing invoices download <INVOICE_ID> --output invoice.pdf
```

*Downloading an invoice to a specific file*

| Option     | Required | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `--output` | No       | Shorthand `-o`. The file to write. Use `-` to write the PDF to stdout. |

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
