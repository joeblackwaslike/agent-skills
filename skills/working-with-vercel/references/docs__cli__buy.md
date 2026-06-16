---
title: vercel buy
product: vercel
url: /docs/cli/buy
canonical_url: "https://vercel.com/docs/cli/buy"
last_updated: 2026-05-28
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/domains
summary: Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/buy.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "afe841780f5627490270d7de76e281d9a1cad6303fa908caa5c4aea3575d3c5e"
---

# vercel buy

The `vercel buy` command allows you to purchase Vercel products for your team directly from the CLI. You can buy credits, addons, subscriptions, and domains.

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

```bash filename="terminal"
vercel buy addon [addon-name] [quantity]
```

*Using the \`vercel buy addon\` command to purchase an
addon for the current team.*

| Argument     | Required | Description                           |
| ------------ | -------- | ------------------------------------- |
| `addon-name` | Yes      | Name of the addon to purchase: `siem` |
| `quantity`   | Yes      | Number of units to purchase           |

#### Example

```bash filename="terminal"
vercel buy addon siem 1
```

*Purchase one unit of the SIEM addon.*

### `pro`

Purchase a Vercel Pro subscription for your team.

```bash filename="terminal"
vercel buy pro
```

*Using the \`vercel buy pro\` command to upgrade the
current team to Vercel Pro.*

### `v0`

Purchase a v0 subscription for your team.

```bash filename="terminal"
vercel buy v0
```

*Using the \`vercel buy v0\` command to purchase a v0
subscription for the current team.*

> **💡 Note:** v0 subscription purchase is not yet available via the CLI.

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


---

[View full sitemap](/docs/sitemap)
