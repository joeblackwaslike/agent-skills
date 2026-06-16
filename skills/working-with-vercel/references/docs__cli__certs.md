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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "064e618139b6cbb98d9c12ac41496e592e4e3e74ae744ce23e0fe6b55da80c39"
---

# vercel certs

The `vercel certs` command is used to manage certificates for domains, providing functionality to list, issue, and remove them. Vercel manages certificates for domains automatically.

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
