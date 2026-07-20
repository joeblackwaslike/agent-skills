---
title: DNS_HOSTNAME_SERVER_ERROR
product: vercel
url: /docs/errors/DNS_HOSTNAME_SERVER_ERROR
canonical_url: "https://vercel.com/docs/errors/DNS_HOSTNAME_SERVER_ERROR"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/domains/working-with-dns
  - /docs/domains/working-with-domains/view-and-search-domains
summary: The DNS server was unable to fulfill the DNS request due to an internal issue or misconfiguration. This is a DNS error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/dns_hostname_server_error.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "9b8531c0caf6e8b2e13f73e6b1a6479d34de13a4424d07b1fe7becf49f557693"
---

# DNS_HOSTNAME_SERVER_ERROR

The `DNS_HOSTNAME_SERVER_ERROR` error occurs when attempting to connect to a private IP from an external rewrite. This error typically means that the DNS server was unable to fulfill the DNS request due to an internal issue or misconfiguration.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review DNS configuration:** Check the [DNS configuration](/docs/domains/working-with-dns) to ensure it's correctly set up and doesn't contain any errors or misconfigurations
2. **Inspect network connectivity:** Ensure that there are no network issues that could be affecting the DNS resolution
3. **Check DNS server logs:** Review the logs of the DNS server for any warnings or errors that might indicate what's causing the issue
4. **Verify domain registration:** Ensure that the domain has been [registered](/docs/domains/working-with-domains/view-and-search-domains) and is currently active


---

[View full sitemap](/docs/sitemap)
