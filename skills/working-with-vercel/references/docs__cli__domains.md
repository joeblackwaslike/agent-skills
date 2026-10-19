---
title: vercel domains
product: vercel
url: /docs/cli/domains
canonical_url: "https://vercel.com/docs/cli/domains"
last_updated: 2026-08-21
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/domains/troubleshooting
  - /docs/cli/global-options
summary: Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/domains.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "9150f78fff3dcd03ce8b1472579a5fef1cbc6eee4a334188deaf213c3ea4c955"
---

# vercel domains

The `vercel domains` command manages domains under the current scope. With it, you can list, inspect, verify, add, remove, purchase, renew, move, transfer in, search, price, check the availability of, and manage automatic renewal for domains.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agents can now buy domains with the Vercel CLI](https://vercel.com/changelog/agents-can-now-buy-domains-with-the-vercel-cli)
- [Search domains without authentication](https://vercel.com/changelog/search-domains-without-authentication)
- [Vercel CLI now supports verifying DNS configuration](https://vercel.com/changelog/vercel-cli-now-supports-verifying-dns-configuration)
- [vercel buy](https://vercel.com/docs/cli/buy) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.
- [vercel dns](https://vercel.com/docs/cli/dns) — Learn how to manage your DNS records for your domains using the vercel dns CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel alerts](https://vercel.com/docs/cli/alerts) — List and inspect alerts, and manage alert rules for projects and teams with the Vercel CLI.

Full cross-link map for this page: [/docs/cli/domains.graph.md](/docs/cli/domains.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** You can manage domains with further options and greater control under a Vercel
> Project's Domains section in the sidebar from the Vercel Dashboard.

## Usage

```bash filename="terminal"
vercel domains ls
```

*Using the \`vercel domains\` command to list all domains
under the current scope.*

## Extended Usage

```bash filename="terminal"
vercel domains inspect [domain]
```

*Using the \`vercel domains\` command to retrieve
information about a specific domain.*

```bash filename="terminal"
vercel domains verify [domain]
```

*Using the \`vercel domains\` command to verify the DNS
configuration of a domain.*

```bash filename="terminal"
vercel domains add [domain] [project]
```

*Using the \`vercel domains\` command to add a domain to
the current scope or a Vercel Project.*

```bash filename="terminal"
vercel domains rm [domain]
```

*Using the \`vercel domains\` command to remove a domain
from the current scope.*

```bash filename="terminal"
vercel domains buy [domain]
```

*Using the \`vercel domains\` command to buy a domain for
the current scope.*

```bash filename="terminal"
vercel domains search [query]
```

*Using the \`vercel domains\` command to discover
domain candidates from a keyword or domain fragment.*

```bash filename="terminal"
vercel domains price [domain] [...domain]
```

*Using the \`vercel domains\` command to return
pricing for one or more domains.*

```bash filename="terminal"
vercel domains check [domain] [...domain]
```

*Using the \`vercel domains\` command to check
availability for one or more domains.*

```bash filename="terminal"
vercel domains move [domain] [scope-name]
```

*Using the \`vercel domains\` command to move a domain to
another scope.*

```bash filename="terminal"
vercel domains transfer-in [domain]
```

*Using the \`vercel domains\` command to transfer in a
domain to the current scope.*

```bash filename="terminal"
vercel domains renew [domain]
```

*Using the \`vercel domains\` command to renew a
registered domain before it expires. The command shows the renewal
price and term, then asks you to confirm the charge.*

```bash filename="terminal"
vercel domains auto-renew [domain] [on|off]
```

*Using the \`vercel domains\` command to turn automatic
renewal on or off for a registered domain. Both the domain and the
\`on|off\` state are required.*

## Buy or renew without prompts

With Vercel CLI 63.1.0 and later, scripts and agents can use `domains buy` and `domains renew` without an interactive terminal. The commands also skip prompts in CI when you pass `--json`.

Before charging a team, pass `--scope <team>` or set `VERCEL_ORG_ID` to that team's ID. A saved team selection or `vercel.json` scope alone isn't sufficient. If `VERCEL_ORG_ID` names a different team, the command refuses the charge.

1. Run the command without `--amount` to get the current price and required action:

   ```bash filename="terminal"
   vercel domains buy example.com --scope my-team --json
   vercel domains renew example.com --scope my-team --json
   ```

   Without `--amount`, these non-interactive commands charge nothing and exit with a non-zero status. The response identifies the paying team, price, term, and next command. For a purchase, it also reports renewal terms and missing registrant details.

   For example, a renewal priced at $20 for one year returns these fields on stdout. This excerpt omits the message and hint fields. The amount is illustrative; always use the price returned for your domain:

   ```json filename="Approval response (excerpt)"
   {
     "status": "action_required",
     "reason": "confirmation_required",
     "action": "confirmation_required",
     "userActionRequired": true,
     "data": {
       "domain": "example.com",
       "team": "my-team",
       "amount": 20,
       "currency": "USD",
       "years": 1
     },
     "missing": ["--amount"],
     "next": [
       {
         "command": "vercel domains renew example.com --scope my-team --amount 20.00 --json",
         "when": "Only after a human approves: charges $20.00 now"
       }
     ]
   }
   ```

   Human-readable guidance may also appear on stderr. Parse stdout for the JSON response; don't combine the two streams.

2. Review the refund policy before approval. The CLI warns that domain registrations are non-refundable. Some purchases qualify for limited exceptions; see [domain refund eligibility](/docs/domains/troubleshooting#purchasing-a-domain-through-vercel). Domain renewals are never refundable.

3. Ask a person to approve the price, paying team, and, for a purchase, automatic renewal. Then run the returned command with `--amount <approved-price-in-USD>` and any missing details. The amount must match the current price; it isn't a spending limit. If the price changes, the CLI charges nothing and asks for approval again.

For supported flags and required fields, see [purchase options](#purchase-options) and [renewal options](#renewal-options).

### Failed or unconfirmed charges

The CLI doesn't automatically retry a purchase or renewal. In non-interactive mode or with `--json`, a failed or unconfirmed charge returns a JSON error. If the outcome is unknown, inspect the domain before retrying:

```bash filename="terminal"
vercel domains inspect example.com --scope my-team --json
```

An unknown outcome can mean the charge succeeded even though the CLI couldn't confirm it. Retrying immediately can charge you twice.

## Unique Options

These are options that only apply to the `vercel domains` command.

### Purchase options

Use these options with the [prompt-free purchase procedure](#buy-or-renew-without-prompts). Approved billing details can supply available valid email and address fields, but never the registrant's first name, last name, or phone:

| Option | Required without prompts | Description |
| --- | --- | --- |
| `--amount <USD>` | To charge | The purchase price a person approved, in US dollars. Omit it to request the price without charging. |
| `--use-billing-details` | When using team billing fields | Approve using available team billing email and address fields for the registrant. |
| `--first-name <TEXT>` | Yes | Registrant's first name. |
| `--last-name <TEXT>` | Yes | Registrant's last name. |
| `--email <TEXT>` | Unless supplied by approved billing details | Registrant's email address. |
| `--phone <TEXT>` | Yes | Registrant's phone number, starting with `+` and containing 10-15 digits, including the country code. |
| `--address <TEXT>` | Unless supplied by approved billing details | Street address. Quote values that contain spaces. |
| `--city <TEXT>` | Unless supplied by approved billing details | City. |
| `--state <TEXT>` | Unless supplied by approved billing details | State or province. The CLI requires this for every country. |
| `--zip <TEXT>` | Unless supplied by approved billing details | Postal or ZIP code. The CLI requires this for every country. |
| `--country <CODE>` | Unless supplied by approved billing details | Two-letter country code, such as `US`. |
| `--company <TEXT>` | No | Registrant company name. |
| `--auto-renew` | One of `--auto-renew` or `--no-auto-renew` | Allow recurring renewal charges at the end of each term. |
| `--no-auto-renew` | One of `--auto-renew` or `--no-auto-renew` | Turn automatic renewal off. |
| `--json` or `--format json` | No | Return structured output without prompts. |

Contact flags override billing details. Replacing an existing billing address field with a flag discards the remaining billing address fields, so supply the complete replacement address. Adding a field missing from billing details keeps the other billing address fields.

Pass exactly one of `--auto-renew` and `--no-auto-renew`. These flags don't take values such as `false`. To stop automatic renewal after a purchase, use [`vercel domains auto-renew <domain> off`](#extended-usage).

### Renewal options

`domains renew` accepts `--amount <USD>`, `--json`, and `--format json`. The amount approves the current renewal price for the reported term. Renewal doesn't require new registrant details or change the domain's automatic-renewal setting.

### Yes

Use the `--yes` option to bypass the confirmation prompt when removing a domain.

```bash filename="terminal"
vercel domains rm [domain] --yes
```

*Using the \`vercel domains rm\` command with the
\`--yes\` option.*

### Limit

Use the `--limit` option to specify the maximum number of domains that `ls` returns. The default value is `20` and the maximum is `100`.

```bash filename="terminal"
vercel domains ls --limit 100
```

*Using the \`vercel domains ls\` command with the
\`--limit\` option.*

You can also use the `--limit` option with `search` to specify the number of domain candidates to check per page. The default value is `20` and the maximum is `200`.

```bash filename="terminal"
vercel domains search acme --limit 200
```

*Using the \`vercel domains search\` command with the
\`--limit\` option.*

### Next

The `--next` option enables pagination when listing domains. Pass the timestamp (in milliseconds since the UNIX epoch) from a previous response to get the next page of results.

```bash filename="terminal"
vercel domains ls --next 1584722256178
```

*Using the \`vercel domains ls\` command with the
\`--next\` option for pagination.*

You can also use the `--next` option with `search` to fetch the next page of candidates. Pass the cursor returned in the previous search response or printed in the continuation command.

```bash filename="terminal"
vercel domains search acme --next [cursor]
```

*Using the \`vercel domains search\` command with the
\`--next\` option for pagination.*

### Force

The `--force` option forces a domain on a project, removing it from an existing one.

```bash filename="terminal"
vercel domains add my-domain.com my-project --force
```

*Using the \`vercel domains add\` command with the
\`--force\` option.*

### Available

Use the `--available` option with `search` to show only domain candidates that are available to register.

```bash filename="terminal"
vercel domains search acme --available
```

*Using the \`vercel domains search\` command with the
\`--available\` option.*

### Order

Use the `--order` option with `search` to order candidates by `relevance`, `alphabetical`, or `length`. The default value is `relevance`.

```bash filename="terminal"
vercel domains search acme --order alphabetical
```

*Using the \`vercel domains search\` command with the
\`--order\` option.*

### TLD

Use the `--tld` option with `search` to filter candidates by exact top-level domain. Repeat the option to search multiple TLDs.

```bash filename="terminal"
vercel domains search acme --tld com --tld dev
```

*Using the \`vercel domains search\` command with the
\`--tld\` option.*

### Format

Use the `--format=json` option with `search` to return structured JSON output.

```bash filename="terminal"
vercel domains search acme --format=json
```

*Using the \`vercel domains search\` command with the
\`--format=json\` option.*

You can also use the `--format=json` option with `verify` to return structured JSON output describing the current and expected DNS records for the domain.

```bash filename="terminal"
vercel domains verify my-domain.com --format=json
```

*Using the \`vercel domains verify\` command with the
\`--format=json\` option.*

You can also use the `--format=json` option with `buy` or `renew` to return structured JSON without prompts. Without `--amount`, the command charges nothing and returns the current price and approval instructions. To complete the charge, follow [Buy or renew without prompts](#buy-or-renew-without-prompts).

```bash filename="terminal"
vercel domains renew my-domain.com --scope my-team --format=json
```

*Checking the renewal price for \`my-team\` without charging, using the
\`--format=json\` option.*

You can also use the `--format=json` option with `auto-renew` to return a structured JSON result describing the domain's new automatic renewal state.

```bash filename="terminal"
vercel domains auto-renew my-domain.com on --format=json
```

*Using the \`vercel domains auto-renew\` command with the
\`--format=json\` option.*

### Project

Use the `--project` option with `verify` to check the DNS configuration against the records expected by a specific Vercel Project.

```bash filename="terminal"
vercel domains verify my-domain.com --project my-project
```

*Using the \`vercel domains verify\` command with the
\`--project\` option.*

### Strict

Use the `--strict` option with `verify` to check DNS for the exact domain only, without falling back to the parent zone's configuration.

```bash filename="terminal"
vercel domains verify my-domain.com --strict
```

*Using the \`vercel domains verify\` command with the
\`--strict\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel domains` command:

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
