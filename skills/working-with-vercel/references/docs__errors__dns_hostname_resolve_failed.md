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
  - /docs/routing/rewrites
  - /docs/errors/DNS_HOSTNAME_NOT_FOUND
  - /docs/errors/DNS_HOSTNAME_EMPTY
  - /docs/errors/DNS_HOSTNAME_SERVER_ERROR
  - /docs/domains/working-with-domains/view-and-search-domains
summary: No error with the DNS resolution but no IP was returned. This is a DNS error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/dns_hostname_resolve_failed.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "d5a8f1ab25c19af5fc6c3c1445fb89f2a9b7be7f37e4bc06e19feb0d62da0bd5"
---

# DNS_HOSTNAME_RESOLVE_FAILED

The `DNS_HOSTNAME_RESOLVE_FAILED` error occurs when Vercel can't resolve the destination hostname of an [external rewrite](/docs/routing/rewrites#rewrites-to-external-origins) to an IP address. This could be due to an issue with the domain name being queried, corrupted or malformed DNS responses, or network issues. If the domain does not exist, the DNS record is empty, or the DNS server reports a server failure (`SERVFAIL`), Vercel returns a more specific error instead: [`DNS_HOSTNAME_NOT_FOUND`](/docs/errors/DNS_HOSTNAME_NOT_FOUND), [`DNS_HOSTNAME_EMPTY`](/docs/errors/DNS_HOSTNAME_EMPTY), or [`DNS_HOSTNAME_SERVER_ERROR`](/docs/errors/DNS_HOSTNAME_SERVER_ERROR).

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
