---
title: vercel dns
product: vercel
url: /docs/cli/dns
canonical_url: "https://vercel.com/docs/cli/dns"
last_updated: 2026-08-21
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Learn how to manage your DNS records for your domains using the vercel dns CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/dns.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "a83c20fe16b5e484ee06bfa0263118a794358045c33d7dfec19e24ebf051d370"
---

# vercel dns

The `vercel dns` command manages DNS records for domains: list, inspect, add, update, remove, and import records.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [Vercel CLI expands commands for DNS, domains, and projects](https://vercel.com/changelog/vercel-cli-expands-commands-for-dns-domains-and-projects)
- [Working with DNS](https://vercel.com/docs/domains/working-with-dns) — Learn how DNS works to properly configure your domain.
- [vercel domains](https://vercel.com/docs/cli/domains) — Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.
- [Managing DNS Records](https://vercel.com/docs/domains/managing-dns-records) — Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
- [Update an existing DNS record](https://vercel.com/docs/rest-api/dns/update-an-existing-dns-record) — PATCH /v1/domains/records/{recordId} — Updates an existing DNS record for a domain name.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain) — Add and configure a custom domain for your Vercel project using the CLI.

Full cross-link map for this page: [/docs/cli/dns.graph.md](/docs/cli/dns.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** When adding DNS records, please wait up to 24 hours for new records to
> propagate.

## Usage

```bash filename="terminal"
vercel dns ls
```

*Using the \`vercel dns\` command to list all DNS records
under the current scope.*

## Extended Usage

```bash filename="terminal"
vercel dns add [domain] [subdomain] [A || AAAA || ALIAS || CNAME || TXT] [value]
```

*Using the \`vercel dns\` command to add an A record for a
subdomain.*

```bash filename="terminal"
vercel dns add [domain] '@' MX [record-value] [priority]
```

*Using the \`vercel dns\` command to add an MX record for
a domain.*

```bash filename="terminal"
vercel dns add [domain] [name] SRV [priority] [weight] [port] [target]
```

*Using the \`vercel dns\` command to add an SRV record for
a domain.*

```bash filename="terminal"
vercel dns add [domain] [name] CAA '[flags] [tag] "[value]"'
```

*Using the \`vercel dns\` command to add a CAA record for
a domain.*

```bash filename="terminal"
vercel dns update [record-id] --name [name] --type [type] --value [value] --ttl [seconds]
```

*Using the \`vercel dns\` command to update fields of an
existing DNS record in place, using its ID.*

```bash filename="terminal"
vercel dns update [record-id] --mx-priority [priority]
```

*Using the \`vercel dns\` command to update the priority
of an MX record.*

```bash filename="terminal"
vercel dns update [record-id] --srv-priority [priority] --srv-weight [weight] --srv-port [port] --srv-target [target]
```

*Using the \`vercel dns\` command to update an SRV record.
All four \`--srv-\` options must be provided together.*

```bash filename="terminal"
vercel dns update [record-id] --comment "[comment]"
```

*Using the \`vercel dns\` command to update the comment
that describes what a DNS record is for.*

```bash filename="terminal"
vercel dns inspect [record-id]
```

*Using the \`vercel dns\` command to show a single DNS
record in full using its ID.*

```bash filename="terminal"
vercel dns rm [record-id]
```

*Using the \`vercel dns\` command to remove a record for a
domain.*

```bash filename="terminal"
vercel dns import [domain] [path-to-zonefile]
```

*Using the \`vercel dns\` command to import a zonefile for
a domain.*

## Unique Options

These are options that only apply to the `vercel dns` command.

### Limit

The `--limit` option can be used to specify the maximum number of dns records returned when using `ls`. The default value is `20` and the maximum is `100`.

```bash filename="terminal"
vercel dns ls --limit 100
```

*Using the \`vercel dns ls\` command with the
\`--limit\` option.*

### Name

Use the `--name` option with `update` to set a new name for the DNS record. Using `'@'` as the name refers to the domain itself.

```bash filename="terminal"
vercel dns update rec_1a2b3c4d5e6f --name api
```

*Using the \`vercel dns update\` command with the
\`--name\` option.*

### Type

Use the `--type` option with `update` to set a new type for the DNS record. Valid types are `A`, `AAAA`, `ALIAS`, `CAA`, `CNAME`, `MX`, `SRV`, and `TXT`.

```bash filename="terminal"
vercel dns update rec_1a2b3c4d5e6f --type CNAME
```

*Using the \`vercel dns update\` command with the
\`--type\` option.*

### Value

Use the `--value` option with `update` to set a new value for the DNS record.

```bash filename="terminal"
vercel dns update rec_1a2b3c4d5e6f --value 198.51.100.100
```

*Using the \`vercel dns update\` command with the
\`--value\` option.*

### TTL

Use the `--ttl` option with `update` to set a new Time to Live (TTL) for the DNS record, in seconds.

```bash filename="terminal"
vercel dns update rec_1a2b3c4d5e6f --ttl 300
```

*Using the \`vercel dns update\` command with the
\`--ttl\` option.*

### MX Priority

Use the `--mx-priority` option with `update` to set a new priority for an MX record.

```bash filename="terminal"
vercel dns update rec_1a2b3c4d5e6f --mx-priority 10
```

*Using the \`vercel dns update\` command with the
\`--mx-priority\` option.*

### SRV Options

Use the `--srv-priority`, `--srv-weight`, `--srv-port`, and `--srv-target` options with `update` to set new values for an SRV record. All four options must be provided together.

```bash filename="terminal"
vercel dns update rec_1a2b3c4d5e6f --srv-priority 10 --srv-weight 0 --srv-port 389 --srv-target example.com
```

*Using the \`vercel dns update\` command with the
\`--srv-priority\`, \`--srv-weight\`,
\`--srv-port\`, and \`--srv-target\`
options.*

### Comment

Use the `--comment` option with `update` to add context on what the DNS record is for.

```bash filename="terminal"
vercel dns update rec_1a2b3c4d5e6f --comment "used for the marketing site"
```

*Using the \`vercel dns update\` command with the
\`--comment\` option.*

### Format

Use the `--format` option with `inspect` to specify the output format. `json` is the only supported format.

```bash filename="terminal"
vercel dns inspect rec_1a2b3c4d5e6f --format json
```

*Using the \`vercel dns inspect\` command with the
\`--format\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel dns` command:

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
