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
  - /docs/deployments/environments
summary: Access IP-restricted backend services through shared static egress IPs for Pro and Enterprise teams.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking/static-ips.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "33c591cb6bad19134c73f16db1b21e8dea3d2e342624daef07db7a360422fbd1"
---

# Static IPs

> Static IPs are available on Enterprise and Pro plans

With Static IPs (shared pool), you can access backend services that require IP allowlisting through static egress IPs. It's designed for Pro and Enterprise teams who need static IP functionality without the dedicated network or security features of [Secure Compute](/docs/networking/secure-compute).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Secure Compute and Static IP builds start 64% faster](https://vercel.com/changelog/secure-compute-and-static-ip-builds-start-64-faster)
- [Vercel Functions can now be up to 5GB in package size](https://vercel.com/changelog/vercel-functions-can-now-be-up-to-5-gb-in-package-size)
- [Durable agent approval workflows on Vercel](https://vercel.com/kb/guide/agent-approval-workflow-stack-guide) — How enterprise architects choose a stack and decide where to run durable, human-in-the-loop agent approval workflows on
- [The Complete Guide to Bring Your Own Cloud](https://vercel.com/kb/guide/byoc) — Use Bring Your Own Cloud \\(BYOC\\) to run Vercel Functions as AWS Lambda functions in your own AWS account, from setup to
- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address) — Vercel deployments use dynamic IPs by default. Learn how Static IPs, Secure Compute, and AWS PrivateLink give you a fixe
- [ Run a Docker monolith with workers on Vercel](https://vercel.com/kb/guide/docker-monolith-workers-vercel) — Run a Dockerized monolith on Vercel with Container Images, move long-running workers to Vercel Queues and Vercel Workflo
- [Running Docker on Vercel vs Render](https://vercel.com/kb/guide/docker-on-vercel-vs-render) — Compare how Vercel and Render run Docker workloads, including deployment model, scaling, image sources, state, and netwo
- [Static IPs are now available for more secure connectivity](https://vercel.com/changelog/static-ips-are-now-available-for-more-secure-connectivity)
- [Route build traffic through Static IPs](https://vercel.com/changelog/route-build-traffic-through-static-ips)
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Flat Rate CDN](https://vercel.com/docs/pricing/flat-rate-cdn) — Flat Rate CDN gives you fixed monthly CDN pricing and protection against usage spikes across capacity tiers.
- [Using Vercel with Microsoft Azure](https://vercel.com/docs/integrations/external-platforms/azure) — Run your frontend on Vercel alongside backends hosted in Microsoft Azure, with private network connectivity, keyless aut

Full cross-link map for this page: [/docs/networking/static-ips.graph.md](/docs/networking/static-ips.graph.md)
<!-- /docsgraph:related -->

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
| **Pricing**           | $100/month per project, plus [Private Data Transfer](/docs/pricing/regional-pricing) at regional rates | Custom pricing                               |

### Static IPs with Secure Compute

If your project uses [Secure Compute](/docs/networking/secure-compute) and you have enabled Static IPs, Static IPs will be ignored.

## Getting started

Read our [getting started guide](/docs/networking/static-ips/getting-started) to learn how to set up Static IPs.

## How it works

When you enable Static IPs, you get:

- **Shared infrastructure**: Each VPC serves a small group of customers
- **Static egress**: Outbound traffic from your Vercel Functions routes through shared static IP pairs. This doesn't include [Routing Middleware](#routing-middleware-support)
- **Logical isolation**: Subnet-level isolation maintains security between customers on the same VPC
- **NAT gateway**: Traffic exits through a managed NAT gateway for consistent IPs
- **Build traffic**: You can also route build traffic through the static IPs by [enabling it for your project](#routing-build-traffic)

## Managing your static IPs

### Routing build traffic

If your application calls data sources at build time, you can route its build traffic through your static IPs to keep your data sources secure.

To enable this, go to your [project's networking settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fnetworking%23static-ips\&title=Go+to+Networking+Settings):

1. Go to your project's **Settings**
2. Navigate to **Networking**
3. Toggle **Use Static IPs for builds** under **Static IPs**

This setting is disabled by default. When enabled, both your project's build and deployed function traffic will route through static IPs and count as [Private Data Transfer](#pricing).

### Routing Middleware support

Static IPs (region-specific) don't apply to [middleware](/docs/routing-middleware) (which are deployed at the edge).

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
