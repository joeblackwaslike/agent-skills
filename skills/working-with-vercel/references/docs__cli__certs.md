---
title: vercel certs
product: vercel
url: /docs/cli/certs
canonical_url: "https://vercel.com/docs/cli/certs"
last_updated: 2026-04-07
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/domains/pre-generating-ssl-certs
summary: Learn how to manage certificates for your domains using the vercel certs CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/certs.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "af09f13ca2e4216a52d559a26ae3cec4e485c4faf2efaa7cf0bc46c26b0567e0"
---

# vercel certs

The `vercel certs` command is used to manage certificates for domains, providing functionality to list, issue, and remove them. Vercel manages certificates for domains automatically.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get certs](https://vercel.com/docs/rest-api/certs/get-certs?from=related)
- [vercel dns](https://vercel.com/docs/cli/dns?from=related) — Learn how to manage your DNS records for your domains using the vercel dns CLI command.
- [Working with SSL](https://vercel.com/docs/domains/working-with-ssl?from=related) — Learn how Vercel uses SSL certification to keep your site secure.
- [Issue a new cert](https://vercel.com/docs/rest-api/certs/issue-a-new-cert?from=related)
- [vercel domains](https://vercel.com/docs/cli/domains?from=related) — Learn how to buy, sell, transfer, and manage your domains using the vercel domains CLI command.

Full cross-link map for this page: [/docs/cli/certs.graph.md](/docs/cli/certs.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel certs ls
```

*Using the \`vercel certs\` command to list all
certificates under the current scope.*

## Extended Usage

```bash filename="terminal"
vercel certs issue [domain1, domain2, domain3]
```

*Using the \`vercel certs\` command to issue certificates
for multiple domains.*

```bash filename="terminal"
vercel certs rm [certificate-id]
```

*Using the \`vercel certs\` command to remove a
certificate by ID.*

## Unique Options

These are options that only apply to the `vercel certs` command.

### Challenge Only

The `--challenge-only` option can be used to only show the challenges needed to issue a certificate. This is useful when [pre-generating SSL certificates](/docs/domains/pre-generating-ssl-certs).

```bash filename="terminal"
vercel certs issue foo.com --challenge-only
```

*Using the \`vercel certs\` command with the
\`--challenge-only\` option.*

### Limit

The `--limit` option can be used to specify the maximum number of certs returned when using `ls`. The default value is `20` and the maximum is `100`.

```bash filename="terminal"
vercel certs ls --limit 100
```

*Using the \`vercel certs ls\` command with the
\`--limit\` option.*


---

[View full sitemap](/docs/sitemap)
