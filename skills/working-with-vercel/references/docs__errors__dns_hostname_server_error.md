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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/dns_hostname_server_error.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "febba58a3339e86bbd43a5dfcbeabed22865d225a668796b42807fc03287eeeb"
---

# DNS_HOSTNAME_SERVER_ERROR

The `DNS_HOSTNAME_SERVER_ERROR` error occurs when the DNS server returns a server failure (`SERVFAIL`) response during the DNS resolution of the destination hostname of an external rewrite. This error typically means that the DNS server was unable to fulfill the DNS request due to an internal issue or misconfiguration.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review DNS configuration:** Check the [DNS configuration](/docs/domains/working-with-dns) to ensure it's correctly set up and doesn't contain any errors or misconfigurations
2. **Inspect network connectivity:** Ensure that there are no network issues that could be affecting the DNS resolution
3. **Check DNS server logs:** Review the logs of the DNS server for any warnings or errors that might indicate what's causing the issue
4. **Verify domain registration:** Ensure that the domain has been [registered](/docs/domains/working-with-domains/view-and-search-domains) and is currently active

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
