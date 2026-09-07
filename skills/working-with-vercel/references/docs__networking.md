---
title: Networking
product: vercel
url: /docs/networking
canonical_url: "https://vercel.com/docs/networking"
last_updated: 2026-08-20
type: reference
prerequisites:
  []
related:
  - /docs/networking/static-ips
  - /docs/networking/secure-compute
  - /docs/pricing/regional-pricing
summary: Connect your Vercel projects to backend services with static IPs and secure networking options.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "0b4d7064440511524dbe9e0f5c58a8b063556d37ba17fcac4eb38d561c6b8341"
---

# Networking

Connect your projects to backend services that require IP allowlisting or dedicated private networking.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I allowlist IP addresses for a deployment?](https://vercel.com/kb/guide/how-to-allowlist-deployment-ip-address?from=related&source_path=%2Fdocs%2Fnetworking&source_site=vercel-docs&relationship=related) — Vercel deployments use dynamic outbound IPs by default. Learn how to allowlist IP addresses for a deployment with Static
- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address?from=related&source_path=%2Fdocs%2Fnetworking&source_site=vercel-docs&relationship=related) — Vercel deployments use dynamic IPs by default. Learn how Static IPs, Secure Compute, and AWS PrivateLink give you a fixe
- [Vercel Pricing](https://vercel.com/pricing?from=related&source_path=%2Fdocs%2Fnetworking&source_site=vercel-docs&relationship=related) — Choose a Vercel plan and compare features and usage pricing.
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related&source_path=%2Fdocs%2Fnetworking&source_site=vercel-docs&relationship=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Pricing on Vercel](https://vercel.com/docs/pricing?from=related&source_path=%2Fdocs%2Fnetworking&source_site=vercel-docs&relationship=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Cleveland, USA \\(cle1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/cle1?from=related&source_path=%2Fdocs%2Fnetworking&source_site=vercel-docs&relationship=related) — Vercel pricing for the Cleveland, USA \\(cle1\\) region.
- [Portland, USA \\(pdx1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/pdx1?from=related&source_path=%2Fdocs%2Fnetworking&source_site=vercel-docs&relationship=related) — Vercel pricing for the Portland, USA \\(pdx1\\) region.
- [Services Pricing and Limits](https://vercel.com/docs/services/pricing?from=related&source_path=%2Fdocs%2Fnetworking&source_site=vercel-docs&relationship=related) — Understand how billing works for Vercel Services, what's charged, and which limits apply.
- [Vercel CDN overview](https://vercel.com/docs/cdn?from=related&source_path=%2Fdocs%2Fnetworking&source_site=vercel-docs&relationship=related) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo

Full cross-link map for this page: [/docs/networking.graph.md](/docs/networking.graph.md?from=related&source_path=%2Fdocs%2Fnetworking&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Choosing a networking option

Vercel has three networking options: [Static IPs](/docs/networking/static-ips), [Secure Compute](/docs/networking/secure-compute), and [Bring Your Own Cloud](#bring-your-own-cloud). This section details the requirements and costs of each option.

| Option | Best for | What it adds | Network model | Plan |
| --- | --- | --- | --- | --- |
| [Static IPs](/docs/networking/static-ips) | Teams that need IP allowlisting without infrastructure changes | A stable, dedicated egress surface you can allowlist | Multi-tenant compute, shared VPC with subnet-level isolation | Pro and Enterprise |
| [Secure Compute](/docs/networking/secure-compute) | Teams that need a private VPC, dedicated networks, or regulatory isolation | A network perimeter isolated from every other customer, with VPC peering | Single-tenant, dedicated VPC | Enterprise add-on |
| [Bring Your Own Cloud](#bring-your-own-cloud) | Compliance or data-residency mandates that require workloads in your cloud | A network and compute boundary you own end to end | Compute runs in your own AWS account | Enterprise |

Review the requirement for each option and choose the first one that matches your situation:

- Your backend, database, or API needs a set of known source IPs to add to an allowlist, and public connectivity is acceptable. Use [Static IPs](/docs/networking/static-ips).
- You need VPC peering into your own AWS environment, a dedicated single-tenant VPC, or network isolation to satisfy a regulatory requirement. Use [Secure Compute](/docs/networking/secure-compute).
- A compliance or data-residency mandate requires your compute to run inside your own AWS account. Use [Bring Your Own Cloud](#bring-your-own-cloud).

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

## Bring Your Own Cloud

Bring Your Own Cloud runs your functions inside your own AWS account, so your compute and data never leave your cloud boundary. Vercel orchestrates routing and invocation, and responses return over an encrypted connection.

It exists to satisfy strict security, compliance, or data-residency mandates that require workloads to run in your own cloud. Because it moves infrastructure out of Vercel's managed boundary, plan for a substantial setup project and ongoing ownership of your AWS account's service quotas, scaling headroom, and account health.

- **Use case**: Compliance or data-residency mandates that require workloads in your cloud
- **Network**: Compute runs in your own AWS account

Bring Your Own Cloud is available on the Enterprise plan. To scope it, [contact the Vercel sales team](https://vercel.com/contact/sales) or your Vercel account team.

## Pricing

Static IPs and Secure Compute usage includes **Private Data Transfer** priced regionally based on the [regional pricing documentation](/docs/pricing/regional-pricing).

[Bring Your Own Cloud](#bring-your-own-cloud) is an Enterprise feature with no published price. [Contact the Vercel sales team](https://vercel.com/contact/sales) to scope it.

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
