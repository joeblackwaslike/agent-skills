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
source: "https://vercel.com/docs/errors/dns_hostname_empty.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "865c65204dfd63659d0361e82be10e4e92846c639d649a98ad30382e45bb7abb"
---

# DNS_HOSTNAME_EMPTY

The `DNS_HOSTNAME_EMPTY` error occurs when an empty DNS record is received as part of the DNS response while attempting to connect to a private IP from an external rewrite.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review DNS configuration:** Check the [DNS configuration](/docs/domains/working-with-dns) to ensure that it's correctly set up and doesn't have any empty or incorrect entries
2. **Check for private IP addresses:** Ensure that the request isn't attempting to connect to a private IP address from an external source
3. **Review application logs:** Inspect the [application logs](/docs/deployments/logs) for any warnings or errors related to DNS or the attempted connections


---

[View full sitemap](/docs/sitemap)
