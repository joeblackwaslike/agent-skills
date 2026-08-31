---
title: Static IPs
product: vercel
url: /docs/networking/static-ips
canonical_url: "https://vercel.com/docs/networking/static-ips"
last_updated: 2026-06-30
type: reference
prerequisites:
  - /docs/networking
related:
  - /docs/networking/secure-compute
  - /docs/pricing/regional-pricing
  - /docs/networking/static-ips/getting-started
  - /docs/routing-middleware
  - /docs/glossary
summary: Access IP-restricted backend services through shared static egress IPs for Pro and Enterprise teams.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking/static-ips.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "9c6525a9c9370ae1bdfd28c5a40b850acb2c881fbe1203b83ed22d74045f8260"
---

# Static IPs

> **🔒 Permissions Required**: Static IPs


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I allowlist IP addresses for a deployment?](https://vercel.com/kb/guide/how-to-allowlist-deployment-ip-address?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=related) — Vercel deployments use dynamic outbound IPs by default. Learn how to allowlist IP addresses for a deployment with Static
- [Vercel Functions can now be up to 5GB in package size](https://vercel.com/changelog/vercel-functions-can-now-be-up-to-5-gb-in-package-size?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=related)
- [Durable agent approval workflows on Vercel](https://vercel.com/kb/guide/agent-approval-workflow-stack-guide?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=related) — How enterprise architects choose a stack and decide where to run durable, human-in-the-loop agent approval workflows on
- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=related) — Vercel deployments use dynamic IPs by default. Learn how Static IPs, Secure Compute, and AWS PrivateLink give you a fixe
- [Running Docker on Vercel vs Render](https://vercel.com/kb/guide/docker-on-vercel-vs-render?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=related) — Compare how Vercel and Render run Docker workloads, including deployment model, scaling, image sources, state, and netwo
- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=related) — Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with A
- [Static IPs are now available for more secure connectivity](https://vercel.com/changelog/static-ips-are-now-available-for-more-secure-connectivity?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=related)
- [Route build traffic through Static IPs](https://vercel.com/changelog/route-build-traffic-through-static-ips?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=related)
- [Simpler Pricing](https://vercel.com/blog/simpler-pricing?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=related)
- [Vercel Pricing](https://vercel.com/pricing?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=related) — Choose a Vercel plan and compare features and usage pricing.
- [Restrict deployment access by IP address](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/trusted-ips?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=related) — Trusted IPs let you restrict access to your deployments to a list of allowed IP addresses.
- [Pricing on Vercel](https://vercel.com/docs/pricing?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.

Full cross-link map for this page: [/docs/networking/static-ips.graph.md](/docs/networking/static-ips.graph.md?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

With Static IPs (shared pool), you can access backend services that require IP allowlisting through static egress IPs. It's designed for Pro and Enterprise teams who need static IP functionality without the dedicated network or security features of [Secure Compute](/docs/networking/secure-compute).

> **💡 Note:** If you need dedicated infrastructure, VPC peering, or complete network isolation, consider [Secure Compute](/docs/networking/secure-compute).

## When to use Static IPs

- Connect to databases such as Amazon RDS, Google Cloud SQL, Azure SQL, and MongoDB Atlas
- Connect to APIs such as Auth0, PayPal, Stripe, internal corporate APIs
- Connect to systems such as on-premises databases and services behind firewalls
- Support compliance and business requirements

## When not to use Static IPs

Static IP is a service provided by Vercel that assigns a set of fixed outbound IP addresses used for egress traffic from your deployments. It does not assign a fixed public IP that external users or services can use to directly access or initiate inbound (ingress) traffic to your app.
Therefore, Static IPs should not be used if you need your app to be reachable through a fixed inbound IP or require ingress traffic support, as inbound connections do not route through the Static IP service.

### Static IPs or Secure Compute

| Feature               | Static IPs (Pro & Enterprise)                                                                          | Secure Compute (Enterprise only)             |
| --------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **IP type**           | Static in shared Virtual Private Cloud (VPC)                                                           | Static in dedicated VPC                      |
| **Network isolation** | Shared VPC for a small group of customers with subnet-level isolation                                  | Dedicated VPC and subnet per customer        |
| **Use cases**         | IP allowlisting, database access                                                                       | IP allowlisting, VPC Peering, full isolation |
| **Pricing**           | $100.00/month per project, plus [Private Data Transfer](/docs/pricing/regional-pricing) at regional rates | Custom pricing                               |

### Static IPs with Secure Compute

If your project uses [Secure Compute](/docs/networking/secure-compute) and you have enabled Static IPs, Static IPs will be ignored.

## Getting started

Read our [getting started guide](/docs/networking/static-ips/getting-started) to learn how to set up Static IPs.

## How it works

When you enable Static IPs, you get:

- **Shared infrastructure**: Each VPC serves a small group of customers
- **Static egress**: All outbound traffic routes through shared static IP pairs
- **Logical isolation**: Subnet-level isolation maintains security between customers on the same VPC
- **NAT gateway**: Traffic exits through a managed NAT gateway for consistent IPs
- **Build traffic**: Traffic from both deployed functions and builds will route through the static IPs

## Managing your static IPs

### Routing build traffic

If your application calls data sources at build time, you can route its build traffic through your static IPs to keep your data sources secure.

To enable this, go to your [project's networking settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fnetworking%23static-ips\&title=Go+to+Networking+Settings):

1. Go to your project's **Settings**
2. Navigate to **Networking**
3. Toggle **Use Static IPs for builds** under **Static IPs**

This setting is disabled by default. When enabled, both your project's build and deployed function traffic will route through static IPs and count as [Private Data Transfer](#pricing).

### Routing Middleware support

Static IPs (region-specific) don't apply to [middleware](/docs/routing-middleware) (which are deployed at the [edge](/docs/glossary#edge)).

### Checking usage

1. Go to your **Team** and click the **Usage** tab
2. Scroll down to the **Content, Caching & Optimization** section. Static IPs data transfer is metered by **Private Data Transfer**
3. Click **Private Data Transfer** for more detail about direction, regions, and projects

### Static IPs with deployment environments

When you configure static IPs in a project, they apply to all the [environments](/docs/deployments/environments) set up in this project.

### Regional considerations

- Choose regions close to your backend services to reduce latency
- Each configured region has its own static IP pair

## Limits and pricing

### Limits

- Static IP addresses are shared across a small group of customers in the same region
- Project-level configuration: You cannot isolate static IPs to specific deployment environments
- Static IPs do not support the extended max duration beta, large functions beta or [container images](/docs/functions/container-images) beta. See [Vercel Functions limits](/docs/functions/limitations) for current limits and compatibility

### Pricing

Static IPs are priced at $100/month per project for Pro plus Private Data Transfer priced regionally based on \[regional pricing documentation]\(/docs/pricing/regional-pricing).


---

[View full sitemap](/docs/sitemap)
