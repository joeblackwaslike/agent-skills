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
  []
summary: Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/domains.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "cc945955d8f2b98d6fad1ae62e729ac7c6f0e7851d7907eff478d7a62bb54b1c"
---

# vercel domains

The `vercel domains` command manages domains under the current scope. With it, you can list, inspect, verify, add, remove, purchase, renew, move, transfer in, search, price, check the availability of, and manage automatic renewal for domains.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel CLI expands commands for DNS, domains, and projects](https://vercel.com/changelog/vercel-cli-expands-commands-for-dns-domains-and-projects?from=related&source_path=%2Fdocs%2Fcli%2Fdomains&source_site=vercel-docs&relationship=related)
- [Vercel CLI now supports verifying DNS configuration](https://vercel.com/changelog/vercel-cli-now-supports-verifying-dns-configuration?from=related&source_path=%2Fdocs%2Fcli%2Fdomains&source_site=vercel-docs&relationship=related)
- [vercel dns](https://vercel.com/docs/cli/dns?from=related&source_path=%2Fdocs%2Fcli%2Fdomains&source_site=vercel-docs&relationship=related) — Learn how to manage your DNS records for your domains using the vercel dns CLI command.
- [Working with domains](https://vercel.com/docs/domains/working-with-domains?from=related&source_path=%2Fdocs%2Fcli%2Fdomains&source_site=vercel-docs&relationship=related) — Learn how domains work and the options Vercel provides for managing them.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related&source_path=%2Fdocs%2Fcli%2Fdomains&source_site=vercel-docs&relationship=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Domains Overview](https://vercel.com/docs/domains?from=related&source_path=%2Fdocs%2Fcli%2Fdomains&source_site=vercel-docs&relationship=related) — Learn the fundamentals of how domains, DNS, and nameservers work on Vercel.
- [vercel buy](https://vercel.com/docs/cli/buy?from=related&source_path=%2Fdocs%2Fcli%2Fdomains&source_site=vercel-docs&relationship=related) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.

Full cross-link map for this page: [/docs/cli/domains.graph.md](/docs/cli/domains.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fdomains&source_site=vercel-docs&relationship=graph)
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

## Unique Options

These are options that only apply to the `vercel domains` command.

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

You can also use the `--format=json` option with `renew` to print the renewal result as structured JSON. The renewal still requires an interactive confirmation of the charge before the JSON result is printed.

```bash filename="terminal"
vercel domains renew my-domain.com --format=json
```

*Using the \`vercel domains renew\` command with the
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


---

[View full sitemap](/docs/sitemap)
