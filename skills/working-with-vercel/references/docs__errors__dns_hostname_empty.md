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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "7682a1bc0e43c06293b163d6dbabdb24164160959c71d6ba745b856b2931b36b"
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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
