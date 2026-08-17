---
title: vercel dns
product: vercel
url: /docs/cli/dns
canonical_url: "https://vercel.com/docs/cli/dns"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Learn how to manage your DNS records for your domains using the vercel dns CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/dns.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "b94ab36f51ad721b8ec827e649ec59b0ee954cba39e3b1bb0c06079266879a85"
---

# vercel dns

The `vercel dns` command is used to manage DNS record for domains, providing functionality to list, add, remove, and import records.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records?from=related) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [How to Export Your Domain's DNS Records from Vercel](https://vercel.com/kb/guide/export-domain-dns-records-via-api?from=related) — Learn how to utilize our API to export your domain's DNS records from Vercel.
- [Does using Vercel's Nameserver's lock you in?](https://vercel.com/kb/guide/does-using-vercel-s-nameserver-s-lock-you-in?from=related) — Learn about how using Vercel's Nameservers doesn't lock you to anything.
- [Working with DNS](https://vercel.com/docs/domains/working-with-dns?from=related) — Learn how DNS works in order to properly configure your domain.
- [vercel domains](https://vercel.com/docs/cli/domains?from=related) — Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.
- [Managing DNS Records](https://vercel.com/docs/domains/managing-dns-records?from=related) — Learn how to add, verify, and remove DNS records for your domains on Vercel with this guide.
- [List existing DNS records](https://vercel.com/docs/rest-api/dns/list-existing-dns-records?from=related)
- [vercel certs](https://vercel.com/docs/cli/certs?from=related) — Learn how to manage certificates for your domains using the vercel certs CLI command.

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


---

[View full sitemap](/docs/sitemap)
