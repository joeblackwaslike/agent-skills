---
title: DNS_HOSTNAME_NOT_FOUND
product: vercel
url: /docs/errors/DNS_HOSTNAME_NOT_FOUND
canonical_url: "https://vercel.com/docs/errors/DNS_HOSTNAME_NOT_FOUND"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/domains/working-with-dns
  - /docs/domains/working-with-domains/view-and-search-domains
  - /docs/deployments/logs
summary: The domain does not exist, resulting in an NXDOMAIN error during DNS resolution. This is a DNS error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/dns_hostname_not_found.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "374c75f1a746a12b540a08b91d64280a05d64e76d419dc5f4a09df2640654e8c"
---

# DNS_HOSTNAME_NOT_FOUND

The `DNS_HOSTNAME_NOT_FOUND` error occurs when there's an `NXDOMAIN` error during the DNS resolution while attempting to connect to a private IP from an external rewrite. This error indicates that the domain being requested does not exist.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review DNS configuration:** Check the [DNS configuration](/docs/domains/working-with-dns) to ensure that the domain being requested is correctly set up and registered
2. **Verify domain registration:** Ensure that the domain has been [registered](/docs/domains/working-with-domains/view-and-search-domains) and is currently active
3. **Check for private IP addresses:** Ensure that the request isn't attempting to connect to a private IP address from an external source
4. **Review application logs:** Inspect the [application logs](/docs/deployments/logs) for any warnings or errors related to DNS or the attempted connections


---

[View full sitemap](/docs/sitemap)
