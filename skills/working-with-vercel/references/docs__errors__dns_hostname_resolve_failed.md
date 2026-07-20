---
title: DNS_HOSTNAME_RESOLVE_FAILED
product: vercel
url: /docs/errors/DNS_HOSTNAME_RESOLVE_FAILED
canonical_url: "https://vercel.com/docs/errors/DNS_HOSTNAME_RESOLVE_FAILED"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/domains/working-with-domains/view-and-search-domains
  - /docs/domains/working-with-dns
summary: No error with the DNS resolution but no IP was returned. This is a DNS error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/dns_hostname_resolve_failed.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "75b908775c5399fac7352aa35a782c1a06c988907b590442fb9e7aac6dee576a"
---

# DNS_HOSTNAME_RESOLVE_FAILED

The `DNS_HOSTNAME_RESOLVE_FAILED` error occurs when attempting to connect to a private IP from an external rewrite. Although there's no error with the DNS resolution, no IP address is returned. This could be due to an issue with the domain name being queried, corrupted or malformed DNS responses, or network issues.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check the domain name:** Ensure that the [domain name](/docs/domains/working-with-domains/view-and-search-domains) you are trying to resolve is spelled correctly and is a valid domain. Typos or incorrect domain names can lead to DNS lookup failures
2. **Check DNS configuration:** Verify the [configuration](/docs/domains/working-with-dns) of the DNS server and ensure it is set up correctly
3. **Firewall and security software:** Check if any firewall or security software on your system is blocking DNS requests. Ensure that the DNS queries are allowed through your firewall
4. **Inspect network connectivity:** Ensure that there are no network issues that could be affecting the DNS resolution


---

[View full sitemap](/docs/sitemap)
