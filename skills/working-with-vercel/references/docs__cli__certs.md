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
  - /docs/cli/global-options
summary: Learn how to manage certificates for your domains using the vercel certs CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/certs.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "29ad7b4330faea39a681f7c674a24c695e6c6c7f9b2365fe12f94a71a471d174"
---

# vercel certs

The `vercel certs` command is used to manage certificates for domains, providing functionality to list, issue, upload, and delete them. Vercel manages certificates for domains automatically.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_certs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/list_certs) — Use list_certs with Vercel MCP.
- [Get certs](https://vercel.com/docs/rest-api/certs/get-certs) — GET /v8/certs — Get certs
- [Issue a new cert](https://vercel.com/docs/rest-api/certs/issue-a-new-cert) — POST /v8/certs — Issue a new cert
- [Working with SSL Certificates](https://vercel.com/docs/domains/working-with-ssl) — Learn how Vercel uses SSL certification to keep your site secure.
- [vercel dns](https://vercel.com/docs/cli/dns) — Learn how to manage your DNS records for your domains using the vercel dns CLI command.

Full cross-link map for this page: [/docs/cli/certs.graph.md](/docs/cli/certs.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel certs list
```

*Using the \`vercel certs\` command to list all
certificates under the current scope.*

## Extended Usage

```bash filename="terminal"
vercel certs issue [domain1, domain2, domain3]
```

*Using the \`vercel certs\` command to issue a certificate
that covers multiple domains.*

```bash filename="terminal"
vercel certs add --crt certificate.pem --key private-key.pem --ca ca.pem
```

*Using the \`vercel certs\` command to upload a
custom SSL certificate, which
requires an Enterprise team. You must pass the certificate, private key,
and Certificate Authority files.*

```bash filename="terminal"
vercel certs delete [certificate-id]
```

*Using the \`vercel certs\` command to delete a
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

The `--limit` option can be used to specify the maximum number of certs returned when using `list`. The default value is `20` and the maximum is `100`.

```bash filename="terminal"
vercel certs list --limit 100
```

*Using the \`vercel certs list\` command with the
\`--limit\` option.*

### Next

Use the `--next` option with `list` to show the next page of certificates. When more certificates remain, the output includes the command for the next page. Pass the `--next` value from that command:

```bash filename="terminal"
vercel certs list --next 1234567890123
```

*Using the \`vercel certs list\` command with the
\`--next\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel certs` command:

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
