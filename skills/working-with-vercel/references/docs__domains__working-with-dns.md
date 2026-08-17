---
title: Working with DNS
product: vercel
url: /docs/domains/working-with-dns
canonical_url: "https://vercel.com/docs/domains/working-with-dns"
last_updated: 2026-06-08
type: conceptual
prerequisites:
  - /docs/domains
related:
  - /docs/domains/managing-dns-records
  - /docs/domains/troubleshooting
summary: Learn how DNS works in order to properly configure your domain.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-dns.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d9729ed64d3d7d86d8ed99d74f72c1cc2e086baf2aed8671f71a17f82610630c"
---

# Working with DNS

DNS is the system used to connect domain names to IP addresses. When you make a request for a website, the browser performs a DNS query. It's usually the recursive resolver that carries out this work, going to the root DNS nameserver, TLD nameserver, and the authoritative server, if it isn't found in the cache.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I use my domain on Vercel with A records?](https://vercel.com/kb/guide/a-record-and-caa-with-vercel?from=related) — Point your apex domain to Vercel with an A record \(76.76.21.21 or your domain card's value\), pair it with a www CNAME,
- [Migrate self-hosted Next.js and containers from AWS to Vercel](https://vercel.com/kb/guide/migrate-containers-from-aws-to-vercel?from=related) — Migrate containers from AWS to Vercel: deploy with Dockerfile.vercel, keep RDS, S3, and SQS in AWS over OIDC, and cut ov
- [Why am I no longer receiving email after adding my domain to Vercel?](https://vercel.com/kb/guide/why-has-email-stopped-working?from=related) — Fix email that stopped working after adding your domain to Vercel, with a concrete MX record table and the DNS preset cl
- [How can I manage my Vercel DNS records?](https://vercel.com/kb/guide/how-to-manage-vercel-dns-records?from=related) — Add, edit, and delete Vercel DNS records from the dashboard, CLI, or REST API, and fix the Invalid Configuration error o
- [How long will it take for my Vercel DNS records to update?](https://vercel.com/kb/guide/how-long-to-update-dns-records?from=related) — Information on the length of time it may take for Vercel DNS changes to take place.
- [Working with Nameservers](https://vercel.com/docs/domains/working-with-nameservers?from=related) — Learn about nameservers and the benefits Vercel nameservers provide.
- [Working with Domains](https://vercel.com/docs/domains/working-with-domains?from=related) — Learn how domains work and the options Vercel provides for managing them.
- [Set Up Custom Domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [vercel dns](https://vercel.com/docs/cli/dns?from=related) — Learn how to manage your DNS records for your domains using the vercel dns CLI command.
- [Create a DNS record](https://vercel.com/docs/rest-api/dns/create-a-dns-record?from=related)

Full cross-link map for this page: [/docs/domains/working-with-dns.graph.md](/docs/domains/working-with-dns.graph.md)
<!-- /docsgraph:related -->

![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/dns-record-example.png`)

### DNS records

There are a number of different types of DNS records that can be used together to create a DNS configuration. Some of the common information that you might see in a DNS record are:

- **Host Name**: The hostname of `www`
- **IP Address or URL**: The IP address (or domain or in the case of a CNAME record), for example, `76.76.21.21` or `cname.vercel-dns-0.com`.
- **TTL (Time to live)**: The length of time the recursive server should keep a particular record in its cache. You should set this time based on how often people are visiting your site and how often your site may change. For more information, see the [DNS propagation](#dns-propagation) section.
- **Record Type**: For example, `CNAME`. There are many different types of records, some of the most common are listed below.

To learn more about adding, verifying, and removing DNS records, see "[Managing DNS records](/docs/domains/managing-dns-records)".

| Type  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A     | This is used to translate domain names into IPv4 addresses. It is the most common type of DNS record.                                                                                                                                                                                                                                                                                                                                                                                    |
| AAAA  | Similar to `A`, but this is used to translate domain names into IPv6 addresses. **IPv6 is not supported on Vercel**. See [IPv6 support](/docs/domains/troubleshooting#ipv6-support) for more information.                                                                                                                                                                                                                                                                                |
| ALIAS | This is used to map a domain name to another domain name. It is similar to a `CNAME` record, but can only be used at the zone apex. The target domain must return `A` or `AAAA` record.                                                                                                                                                                                                                                                                                                  |
| CAA   | This is used to specify which certificate authorities are allowed to issue certificates for a domain. Vercel automatically adds a CAA record for Let's Encrypt at the zone apex.                                                                                                                                                                                                                                                                                                         |
| CNAME | This is used to specify that the domain name is an alias for another domain name. It cannot be used at the zone apex. See [Working with Apex domain](/docs/domains/troubleshooting#working-with-apex-domain) for more information.                                                                                                                                                                                                                                                       |
| HTTPS | This is used to achieve a CNAME-like functionality, but can be used at the zone apex. This is designed specifically for HTTP protocol to improve client performance in establishing secure connections. The record includes additional information about the target server, such as supported ALPN protocols (e.g., HTTP/2, HTTP/3, etc). This is a fairly new record type, and not all clients can support. See [RFC 9460](https://datatracker.ietf.org/doc/rfc9460/) for more details. |
| MX    | This is used to specify the mail server for the domain.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| NS    | This is used to specify the authoritative name server for the domain.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| TXT   | This is used to provide information about the domain in text format. Commonly used for verification purposes.                                                                                                                                                                                                                                                                                                                                                                            |
| SRV   | This is used to specify the location of the service. The record contains priority, weight, port, target, and other information.                                                                                                                                                                                                                                                                                                                                                          |

### DNS propagation

When you're configuring or making changes to your DNS settings, you should be aware that it doesn't happen instantaneously. There's a whole network of servers, each of which has their own cache, and each of these will need to be updated to any new values that you set. For this reason, it can be normal to take up to 24-48 hours to see changes fully propagate through the network.

As we described earlier, when you set a record, you normally set a **TTL** value, or **Time to Live**, on a DNS record. This value, set in seconds, is the length of time a DNS cache will store information about your site, before it requests a new copy of the record from the authoritative server.

When you set the TTL value in your DNS record, you need to find the balance between serving your users the site quickly, and ensuring they're not seeing outdated information. A short TTL (minimum 30s) is beneficial if you are constantly updating the content, but will cause slower load times for your site. Using a longer TTL (max 86400 seconds, or 24 hours) means that records are cached for longer, so the site can load quickly for your users. Vercel defaults to 60s for a DNS record.

### DNS best practices

When you are transferring an existing (in-use) domain to Vercel, it's a good practice to check the existing DNS record and its TTL before switching.
Ideally, about 24 hours in advance of changes, you should shorten the DNS TTL to 60s. Once it's propagated, you can then change the DNS record to Vercel so that traffic quickly moves over to the new site because now the DNS TTL is much shorter.

You can use tools such as <https://www.whatsmydns.net> to determine if your DNS settings have been fully propagated.

## Troubleshooting

To learn more about common DNS issues, see the [troubleshooting](/docs/domains/troubleshooting#common-dns-issues) doc.

## Related


---

[View full sitemap](/docs/sitemap)
