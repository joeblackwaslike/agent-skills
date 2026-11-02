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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "fc1a0ac7e2fc0a7d81069ca790a427ce200f25956f7e6239883dab74a45a0752"
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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
