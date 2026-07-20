---
title: DNS_HOSTNAME_RESOLVED_PRIVATE
product: vercel
url: /docs/errors/DNS_HOSTNAME_RESOLVED_PRIVATE
canonical_url: "https://vercel.com/docs/errors/DNS_HOSTNAME_RESOLVED_PRIVATE"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/deployments/logs
summary: The DNS hostname resolved to a private IP address or an IPv6 address during an external rewrite. This is a DNS error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/dns_hostname_resolved_private.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "46df5105699fb51e1e68861b2ea475ba4c33d38a34f17a8b773dc5d2e39a8b51"
---

# DNS_HOSTNAME_RESOLVED_PRIVATE

The `DNS_HOSTNAME_RESOLVED_PRIVATE` error occurs when attempting to connect to a private IP from an external rewrite, or when trying to connect to an IPv6 address. The error indicates that the DNS hostname resolved to a private or inaccessible IP address.

Examples of such IPs would be:

- `192.0.0.1`
- `168.0.0.1`

**Error Code:** `404`

**Name:** Not Found

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check the IP address:** Ensure that the IP address you are trying to connect to is publicly accessible and not a private or reserved IP address
2. **Inspect network connectivity:** Ensure that there are no network issues that could be affecting the DNS resolution
3. **Review application logs:** Inspect the [application logs](/docs/deployments/logs) for any warnings or errors related to DNS or the attempted connections


---

[View full sitemap](/docs/sitemap)
