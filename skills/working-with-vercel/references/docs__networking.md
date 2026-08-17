---
title: Networking
product: vercel
url: /docs/networking
canonical_url: "https://vercel.com/docs/networking"
last_updated: 2026-06-16
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "73e24004aca8b2ff4ede671b0ec7081170f8db6d5490351cc58c328573e008a5"
---

# Networking

Connect your projects to backend services that require IP allowlisting or dedicated private networking.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I allowlist IP addresses for a deployment?](https://vercel.com/kb/guide/how-to-allowlist-deployment-ip-address?from=related) — You can securely connect a deployment to external services by using a stable set of IP addresses.
- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address?from=related) — You can allowlist IP addresses with Vercel Secure Compute and Static IPs
- [Pricing and Limits](https://vercel.com/docs/services/pricing?from=related) — Understand how billing works for Vercel Services, what's charged, and which limits apply.
- [Overview](https://vercel.com/docs/cdn?from=related) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo
- [Create a Secure Compute network](https://vercel.com/docs/rest-api/networking/create-a-secure-compute-network?from=related)
- [Paris, France \(cdg1\)](https://vercel.com/docs/pricing/regional-pricing/cdg1?from=related) — Vercel pricing for the Paris, France \(cdg1\) region.
- [Portland, USA \(pdx1\)](https://vercel.com/docs/pricing/regional-pricing/pdx1?from=related) — Vercel pricing for the Portland, USA \(pdx1\) region.

Full cross-link map for this page: [/docs/networking.graph.md](/docs/networking.graph.md)
<!-- /docsgraph:related -->

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
