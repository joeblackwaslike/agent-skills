---
title: DNS_HOSTNAME_EMPTY
product: vercel
url: /docs/errors/DNS_HOSTNAME_EMPTY
canonical_url: "https://vercel.com/docs/errors/DNS_HOSTNAME_EMPTY"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/domains/working-with-dns
  - /docs/deployments/logs
summary: An empty DNS record was received as part of the DNS response. This is a DNS error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/dns_hostname_empty.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "25406189e2a426173ef053c4bba73285a1016da179ce5484d74a17a68da945b5"
---

# DNS_HOSTNAME_EMPTY

The `DNS_HOSTNAME_EMPTY` error occurs when an empty DNS record is received as part of the DNS response while resolving the destination hostname of an external rewrite.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review DNS configuration:** Check the [DNS configuration](/docs/domains/working-with-dns) to ensure that it's correctly set up and doesn't have any empty or incorrect entries
2. **Check the rewrite destination:** Ensure that the destination hostname of the external rewrite is correct and has a DNS record that resolves to an IP address
3. **Review application logs:** Inspect the [application logs](/docs/deployments/logs) for any warnings or errors related to DNS or the attempted connections

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
