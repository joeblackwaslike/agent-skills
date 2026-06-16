---
title: Networking
product: vercel
url: /docs/networking
canonical_url: "https://vercel.com/docs/networking"
last_updated: 2026-05-15
type: reference
prerequisites:
  []
related:
  - /docs/networking/static-ips
  - /docs/pricing/regional-pricing
  - /docs/networking/secure-compute
summary: Connect your Vercel projects to backend services with static IPs and secure networking options.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "1ae0d0209c2de7a9e3731f9a93c77b4299d41b7d9165a95b898a0fe1564ac167"
---

# Networking

Connect your projects to backend services that require IP allowlisting or dedicated private networking.

## Static IPs (shared pool)

When your database or API needs to see traffic from known IP addresses, Static IPs give you shared static egress IPs that won't change. Perfect for Pro and Enterprise teams who need IP allowlisting without the complexity.

- **Use case**: IP allowlisting for databases, APIs, and legacy systems
- **Network**: Shared VPC with subnet-level isolation
- [**Pricing**](/docs/networking/static-ips#pricing): $100.00/month per project + [Private Data Transfer](/docs/pricing/regional-pricing) at regional rates

[Learn more about Static IPs](/docs/networking/static-ips)

## Secure Compute

For when you need your own private Virtual Private Cloud (VPC). Secure Compute gives you dedicated networks with VPC peering — your infrastructure stays completely isolated from other customers.

- **Use case**: Full network isolation and VPC peering
- **Network**: Dedicated VPC per customer

[Learn more about Secure Compute](/docs/networking/secure-compute)

## Pricing

Static IPs and Secure Compute usage includes **Private Data Transfer** priced regionally based on the [regional pricing documentation](/docs/pricing/regional-pricing).

| Resource | Pro Price |
| --- | --- |
| Static IPs | $100.00 |


### Understanding data transfer costs

Data transfer costs kick in for all traffic to or from your Vercel Functions, including those to external services and to the Vercel CDN:

- Database queries and responses
- API calls to third-party services
- File uploads and downloads
- Any other inbound or outbound network traffic

Keep tabs on your usage in the **Team Settings** **Usage** tab under the **Private Data Transfer** section.


---

[View full sitemap](/docs/sitemap)
