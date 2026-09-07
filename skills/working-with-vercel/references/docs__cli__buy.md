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
  - /docs/cli/domains
  - /docs/cli/global-options
summary: Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/buy.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "66e229ea51dc2744a2b9756e0dba1b01f2c5d8e6330cbf5e007c1cab51390a67"
---

# vercel buy

The `vercel buy` command allows you to purchase Vercel products for your team directly from the CLI. You can buy credits, addons, subscriptions, and domains.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Inside the Vercel intern experience](https://vercel.com/blog/inside-the-vercel-intern-experience?from=related&source_path=%2Fdocs%2Fcli%2Fbuy&source_site=vercel-docs&relationship=related)
- [vercel usage](https://vercel.com/docs/cli/usage?from=related&source_path=%2Fdocs%2Fcli%2Fbuy&source_site=vercel-docs&relationship=related) — Learn how to view billing usage and costs, for your Vercel account using the vercel usage CLI command.
- [vercel api](https://vercel.com/docs/cli/api?from=related&source_path=%2Fdocs%2Fcli%2Fbuy&source_site=vercel-docs&relationship=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel teams](https://vercel.com/docs/cli/teams?from=related&source_path=%2Fdocs%2Fcli%2Fbuy&source_site=vercel-docs&relationship=related) — Learn how to list, add, switch, invite, and manage your teams with the vercel teams CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related&source_path=%2Fdocs%2Fcli%2Fbuy&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fbuy&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/buy.graph.md](/docs/cli/buy.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fbuy&source_site=vercel-docs&relationship=graph)
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

Purchase a Vercel addon for your team. Your team must be on the Flex plan to purchase addons. Run `vercel buy addon --help` to see all available addon options.

> **⚠️ Warning:** The `siem` addon is deprecated. To send audit logs to external systems, use
> [Audit Log Drains](/docs/drains/reference/audit-logs).

```bash filename="terminal"
vercel buy addon [addon-name] [quantity]
```

*Using the \`vercel buy addon\` command to purchase an
addon for the current team.*

| Argument     | Required | Description                    |
| ------------ | -------- | ------------------------------ |
| `addon-name` | Yes      | Name of the addon to purchase  |
| `quantity`   | Yes      | Number of units to purchase    |

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

The `--yes` option skips the confirmation prompt. This is required when running in non-interactive environments like CI.

```bash filename="terminal"
vercel buy credits v0 100 --yes
```

*Using the \`vercel buy credits\` command with the
\`--yes\` option to skip confirmation.*

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
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)
