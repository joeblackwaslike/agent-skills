---
title: Networking
product: vercel
url: /docs/networking
canonical_url: "https://vercel.com/docs/networking"
last_updated: 2026-09-15
type: reference
prerequisites:
  []
related:
  - /docs/networking/static-ips
  - /docs/networking/privatelink
  - /docs/networking/secure-compute
  - /docs/networking/bring-your-own-cloud
  - /docs/pricing/regional-pricing
summary: Connect your Vercel projects to backend services with static IPs and secure networking options.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "da3530833654d0229bfa06aa46836543716d898cda6077f8fd5c2b4c898bbd16"
---

# Networking

Connect your projects to backend services that require IP allowlisting, AWS PrivateLink, or dedicated private networking.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to choose the right Vercel networking option](https://vercel.com/kb/guide/how-to-choose-the-right-vercel-networking-option) — Decide whether your project needs a networking option at all, then choose between Static IPs, AWS PrivateLink, Secure Co
- [The Complete Guide to Bring Your Own Cloud](https://vercel.com/kb/guide/byoc) — Use Bring Your Own Cloud \\(BYOC\\) to run Vercel Functions as AWS Lambda functions in your own AWS account, from setup to
- [How can I allowlist IP addresses for a deployment?](https://vercel.com/kb/guide/how-to-allowlist-deployment-ip-address) — Vercel deployments use dynamic outbound IPs by default. Learn how to allowlist IP addresses for a deployment with Static
- [Private enterprise agents on Vercel](https://vercel.com/kb/guide/private-enterprise-agents-vercel) — Design private enterprise agents that call internal APIs and databases with Vercel Functions, Secure Compute, AI Gateway
- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address) — Vercel deployments use dynamic IPs by default. Learn how Static IPs, Secure Compute, and AWS PrivateLink give you a fixe
- [AWS PrivateLink is now available on Pro and Enterprise](https://vercel.com/changelog/aws-privatelink-is-now-available-on-pro-and-enterprise)
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Portland, USA \\(pdx1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/pdx1) — Vercel pricing for the Portland, USA \\(pdx1\\) region.
- [Vercel CDN overview](https://vercel.com/docs/cdn) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo
- [Flat Rate CDN](https://vercel.com/docs/pricing/flat-rate-cdn) — Flat Rate CDN gives you fixed monthly CDN pricing and protection against usage spikes across capacity tiers.
- [Cleveland, USA \\(cle1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/cle1) — Vercel pricing for the Cleveland, USA \\(cle1\\) region.

Full cross-link map for this page: [/docs/networking.graph.md](/docs/networking.graph.md)
<!-- /docsgraph:related -->

## Choosing a networking option

Vercel has four networking options: [Static IPs](/docs/networking/static-ips), [AWS PrivateLink](/docs/networking/privatelink), [Secure Compute](/docs/networking/secure-compute), and [Bring Your Own Cloud](/docs/networking/bring-your-own-cloud). This section details the requirements and costs of each option.

| Option | Best for | What it adds | Network model | Plan |
| --- | --- | --- | --- | --- |
| [Static IPs](/docs/networking/static-ips) | Teams that need IP allowlisting without infrastructure changes | A stable, dedicated egress surface you can allowlist | Multi-tenant compute, shared VPC with subnet-level isolation | Pro and Enterprise |
| [AWS PrivateLink](/docs/networking/privatelink) | Reaching an AWS-hosted service behind a PrivateLink endpoint service | Private connectivity to AWS services with no public internet exposure | Shared VPC, dedicated endpoint per connection | Requires Advanced Networking |
| [Secure Compute](/docs/networking/secure-compute) | Teams that need a private VPC, dedicated networks, or regulatory isolation | A network perimeter isolated from every other customer, with VPC peering | Single-tenant, dedicated VPC | Enterprise add-on |
| [Bring Your Own Cloud](/docs/networking/bring-your-own-cloud) | Compliance or data-residency mandates that require workloads in your cloud | A network and compute boundary you own end to end | Compute runs in your own AWS account | Enterprise |

Review the requirement for each option and choose the first one that matches your situation:

- Your backend, database, or API needs a set of known source IPs to add to an allowlist, and public connectivity is acceptable. Use [Static IPs](/docs/networking/static-ips).
- Your target service is hosted on AWS behind a PrivateLink endpoint service, and traffic must stay off the public internet. Use [AWS PrivateLink](/docs/networking/privatelink).
- You need VPC peering into your own AWS environment, a dedicated single-tenant VPC, or network isolation to satisfy a regulatory requirement. Use [Secure Compute](/docs/networking/secure-compute).
- A compliance or data-residency mandate requires your compute to run inside your own AWS account. Use [Bring Your Own Cloud](/docs/networking/bring-your-own-cloud).

## Static IPs (shared pool)

When your database or API needs to see traffic from known IP addresses, Static IPs give you shared static egress IPs that won't change. Perfect for Pro and Enterprise teams who need IP allowlisting without the complexity.

- **Use case**: IP allowlisting for databases, APIs, and legacy systems
- **Network**: Shared VPC with subnet-level isolation
- [**Pricing**](/docs/networking/static-ips#pricing): $100.00/month per project + [Private Data Transfer](/docs/pricing/regional-pricing) at regional rates

[Learn more about Static IPs](/docs/networking/static-ips)

## AWS PrivateLink

When an AWS-hosted service exposes an AWS PrivateLink endpoint, PrivateLink keeps traffic on the AWS private network instead of the public internet. It extends the same shared-network model as Static IPs with endpoint-specific routing and Vercel-managed DNS names.

- **Use case**: Private connectivity to RDS, SaaS with PrivateLink endpoints, S3 or DynamoDB gateway endpoints, and compliance-focused deployments
- **Network**: Shared VPC with dedicated endpoint interfaces per connection

[Learn more about AWS PrivateLink](/docs/networking/privatelink)

## Secure Compute

For when you need your own private Virtual Private Cloud (VPC). Secure Compute gives you dedicated networks with VPC peering, so your infrastructure stays completely isolated from other customers.

- **Use case**: Full network isolation and VPC peering
- **Network**: Dedicated VPC per customer

[Learn more about Secure Compute](/docs/networking/secure-compute)

## Bring Your Own Cloud

Bring Your Own Cloud (BYOC) runs your functions as AWS Lambda functions inside your own AWS account, so your function code and execution stay inside your cloud boundary. Vercel routes requests, serves static assets, and invokes your functions.

It exists to satisfy strict security, compliance, or data-residency mandates that require workloads to run in your own cloud. Because it moves infrastructure out of Vercel's managed boundary, plan for a substantial setup project and ongoing ownership of your AWS account's service quotas, scaling headroom, and account health.

- **Use case**: Compliance or data-residency mandates that require workloads in your cloud
- **Network**: Compute runs in your own AWS account

Bring Your Own Cloud is available on the Enterprise plan. To scope it, [contact the Vercel sales team](https://vercel.com/contact/sales) or your Vercel account team.

[Learn more about Bring Your Own Cloud](/docs/networking/bring-your-own-cloud)

## Pricing

Static IPs and Secure Compute usage includes **Private Data Transfer** priced regionally based on the [regional pricing documentation](/docs/pricing/regional-pricing).

PrivateLink usage is tracked separately on your team's Usage tab. See [AWS PrivateLink](/docs/networking/privatelink) for setup and behavior.

[Bring Your Own Cloud](/docs/networking/bring-your-own-cloud) is an Enterprise feature with custom pricing. [Contact the Vercel sales team](https://vercel.com/contact/sales) to scope it.

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
