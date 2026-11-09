---
title: vercel buy
product: vercel
url: /docs/cli/buy
canonical_url: "https://vercel.com/docs/cli/buy"
last_updated: 2026-07-24
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/drains/reference/audit-logs
  - /docs/observability/observability-plus
  - /docs/cli/domains
  - /docs/cli/global-options
summary: Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/buy.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "e99d5f75ada8b8f5672c141e27702df4bb09d0ecce5b3de9900e1ff6c4873d74"
---

# vercel buy

The `vercel buy` command allows you to purchase Vercel products for your team directly from the CLI. You can buy credits, addons, subscriptions, and domains.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Inside the Vercel intern experience](https://vercel.com/blog/inside-the-vercel-intern-experience)
- [vercel billing](https://vercel.com/docs/cli/billing) — Learn how to view usage, contracts, budgets, and invoices for your Vercel team using the vercel billing CLI command.
- [vercel billing budgets](https://vercel.com/docs/cli/budgets) — View and manage your team's on-demand spend budget from the Vercel CLI.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel pricing](https://vercel.com/docs/cli/pricing) — Look up Hobby, Pro, and Enterprise features from the public Vercel pricing table using the CLI.
- [vercel organizations](https://vercel.com/docs/cli/organizations) — Create and manage organizations and their child teams with the vercel organizations CLI command.

Full cross-link map for this page: [/docs/cli/buy.graph.md](/docs/cli/buy.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** All subcommands except `domain` require a team scope. Use `--scope` to
> specify a team if you haven't already.

## Usage

```bash filename="terminal"
vercel buy [subcommand]
```

*Running \`vercel buy\` without a subcommand displays
the help menu.*

## Subcommands

### `credits`

Purchase Vercel credits for your team. Supported credit types are `v0`, `gateway` (AI Gateway), and `agent` (Vercel Agent).

The `amount` argument is specified in whole US dollars. The maximum amount per purchase is $1,000.

```bash filename="terminal"
vercel buy credits [credit-type] [amount]
```

*Using the \`vercel buy credits\` command to purchase
credits for the current team.*

| Argument      | Required | Description                                           |
| ------------- | -------- | ----------------------------------------------------- |
| `credit-type` | Yes      | Type of credits to purchase: `v0`, `gateway`, `agent` |
| `amount`      | Yes      | Amount in whole US dollars (max $1,000 per purchase)  |

#### Examples

```bash filename="terminal"
vercel buy credits v0 100
```

*Purchase $100 of v0 credits.*

```bash filename="terminal"
vercel buy credits gateway 250
```

*Purchase $250 of AI Gateway credits.*

```bash filename="terminal"
vercel buy credits agent 50
```

*Purchase $50 of Vercel Agent credits.*

### `addon`

Purchase a Vercel addon for your team. Your team must be on a Pro or Enterprise plan to purchase addons. Run `vercel buy addon --help` to see all available addon options.

> **⚠️ Warning:** You can no longer purchase the `siem` addon with `vercel buy addon`. To send
> audit logs to external systems, use
> [Audit Log Drains](/docs/drains/reference/audit-logs).

```bash filename="terminal"
vercel buy addon [addon-name] [quantity]
```

*Using the \`vercel buy addon\` command to purchase an
addon for the current team.*

| Argument     | Required | Description                                                                                                 |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| `addon-name` | Yes      | Name of the addon to purchase, such as `observability-plus`                                                 |
| `quantity`   | Varies   | Number of units to purchase. Some addons require a quantity. Don't pass a quantity for `observability-plus` |

#### Example

To purchase [Observability Plus](/docs/observability/observability-plus) for your team, run:

```bash filename="terminal"
vercel buy addon observability-plus
```

*Purchase the Observability Plus addon.*

### `pro`

Purchase a Vercel Pro subscription for your team.

```bash filename="terminal"
vercel buy pro
```

*Using the \`vercel buy pro\` command to upgrade the
current team to Vercel Pro.*

### `domain`

Purchase a domain name. This delegates to the [`vercel domains buy`](/docs/cli/domains) command.

```bash filename="terminal"
vercel buy domain [domain]
```

*Using the \`vercel buy domain\` command to purchase a
domain.*

| Argument | Required | Description                 |
| -------- | -------- | --------------------------- |
| `domain` | Yes      | The root domain to purchase |

#### Example

```bash filename="terminal"
vercel buy domain example.com
```

*Purchase the domain \`example.com\`.*

## Unique options

These are options that apply to the `vercel buy credits`, `vercel buy addon`, and `vercel buy pro` subcommands.

### Yes

The `--yes` option skips the confirmation prompt for `vercel buy addon` and `vercel buy pro`. This is required when running in non-interactive environments like CI.

```bash filename="terminal"
vercel buy pro --yes
```

*Using the \`vercel buy pro\` command with the
\`--yes\` option to skip confirmation.*

To purchase credits without the confirmation prompt, use [`--amount`](#amount).

### Amount

With Vercel CLI 65.10.0 and later, the `--amount` option approves the charge for `vercel buy credits`, so the CLI doesn't ask you to confirm it. Use it in non-interactive environments like CI. Pass the same amount as the `amount` argument, and name the team with `--scope`:

```bash filename="terminal"
vercel buy credits v0 100 --amount 100.00 --scope my-team
```

*Using the \`vercel buy credits\` command with the
\`--amount\` option to purchase $100 of v0 credits without a prompt.*

If the two amounts don't match, the CLI charges nothing.

When Vercel CLI 65.10.0 or later detects that an AI agent runs `vercel buy credits`, the agent also needs `--amount`. Without it, the CLI charges nothing and tells the agent to ask for your approval.

### JSON output

The `--json` flag returns the purchase result as JSON instead of plain text.

```bash filename="terminal"
vercel buy credits gateway 250 --json
```

*Using the \`vercel buy credits\` command with the
\`--json\` option for structured output.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel buy` command:

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
