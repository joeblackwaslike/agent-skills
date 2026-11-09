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
  - /docs/networking/privatelink
  - /docs/oidc
  - /docs/networking/static-ips/getting-started
summary: Access IP-restricted backend services through shared static egress IPs for Pro and Enterprise teams.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking/static-ips.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "6f610c260499ce95e2e81536fbbe6fe08e54a08fe23bfdcbd91117c9af16497c"
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
- [ Run a Docker monolith with workers on Vercel](https://vercel.com/kb/guide/docker-monolith-workers-vercel) — Run a Dockerized monolith on Vercel with Container Images, move long-running workers to Vercel Queues and Vercel Workflo
- [Running Docker on Vercel vs Render](https://vercel.com/kb/guide/docker-on-vercel-vs-render) — Compare how Vercel and Render run Docker workloads, including deployment model, scaling, image sources, state, and netwo
- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments) — Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with A
- [Static IPs are now available for more secure connectivity](https://vercel.com/changelog/static-ips-are-now-available-for-more-secure-connectivity)
- [Route build traffic through Static IPs](https://vercel.com/changelog/route-build-traffic-through-static-ips)
- [Improved infrastructure pricing](https://vercel.com/blog/improved-infrastructure-pricing)
- [Introducing Flat Rate CDN](https://vercel.com/blog/introducing-flat-rate-cdn)
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.

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

### Static IPs or PrivateLink

If the service you call runs on AWS and publishes an AWS PrivateLink endpoint service, [PrivateLink](/docs/networking/privatelink) connects to it without an IP allowlist. The service provider allowlists an AWS IAM role assigned to your team, and traffic stays on the AWS private network.

| Feature | Static IPs | PrivateLink |
| --- | --- | --- |
| **How the backend authorizes Vercel** | Allowlists your static egress IP addresses | Allowlists your team's AWS IAM role |
| **Supported backends** | Any service that accepts connections from an allowlisted IP address | AWS-hosted services that publish a PrivateLink endpoint service, such as Amazon RDS, Aurora, Neon, Redshift, S3, and DynamoDB |
| **Network path** | Public internet from a managed NAT gateway | AWS private network |

Use Static IPs for on-premises backends, services in other clouds, and services that don't publish a PrivateLink endpoint service.

### Alternatives to an IP allowlist

An IP allowlist confirms where a request came from, but not who sent it. Keep your backend's authentication, such as database credentials, an API key, or mutual TLS, in place after you add the static IPs to an allowlist.

If your backend runs on AWS, Google Cloud, or Azure, consider [OpenID Connect (OIDC) federation](/docs/oidc) instead of Static IPs. Your functions and builds exchange short-lived Vercel-issued tokens for cloud credentials, so the cloud provider authorizes Vercel by identity and you don't need to maintain an allowlist.

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
3. Under **Advanced Networking**, click **Static IPs**, click **Manage**, turn on **Use for builds**, and click **Save**

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

## Troubleshooting

If you've added the static IPs to your backend's allowlist but requests are still rejected, check these causes in order:

| Symptom | Cause | Fix |
| --- | --- | --- |
| Functions reach the backend, but builds fail against the same allowlist | Build traffic uses dynamic IP addresses unless you route it through Static IPs. This affects anything that runs during the build, such as database migrations or content fetches. | Turn on **Use for builds** in your project's **Settings** > **Networking**. See [Routing build traffic](#routing-build-traffic). |
| No requests come from the static IPs | The project also uses [Secure Compute](/docs/networking/secure-compute), which takes precedence over Static IPs. | Allowlist the Secure Compute network's IP addresses, or remove the project from the Secure Compute network. |
| Requests from Routing Middleware are rejected | [Routing Middleware](#routing-middleware-support) doesn't use static IPs. | Move the IP-restricted call into a Vercel Function and call that function from your middleware. |
| Vercel can't access a GitHub repository after your organization enabled an IP allowlist | Vercel's Git integration connects from Vercel's infrastructure, not your project's static IPs. | Build and deploy from GitHub Actions with `vercel build` and `vercel deploy --prebuilt`. See [Using Vercel with GitHub IP restrictions](/kb/guide/use-vercel-with-github-ip-restrictions). |

## Limits and pricing

### Limits

- Static IP addresses are shared across a small group of customers in the same region
- Project-level configuration: You cannot isolate static IPs to specific deployment environments
- Static IPs support the [extended max duration](/docs/functions/configuring-functions/duration#extended-max-duration-beta), [large functions](/docs/functions/limitations#large-functions-beta), and [container images](/docs/functions/container-images) betas, which require [fluid compute](/docs/fluid-compute) with [Active CPU](/docs/functions/usage-and-pricing#active-cpu) enabled. See [Vercel Functions limits](/docs/functions/limitations) for current limits and compatibility

### Pricing

Static IPs are priced at $100/month per project for Pro plus Private Data Transfer priced regionally based on \[regional pricing documentation]\(/docs/pricing/regional-pricing).

## Frequently asked questions

### How do I allowlist my Vercel deployment's IP address?

Turn on Static IPs for your project, then add the static IPs to your backend's allowlist:

1. In your project's **Settings**, go to **Networking**
2. Turn on **Advanced Networking**, click **Static IPs**, and then click **Configure Regions**
3. Select up to three regions close to your backend, then copy the static IP addresses shown for each region
4. Add those addresses to your database, API, or firewall allowlist, then redeploy your project

If your build also connects to the backend, turn on [Use for builds](#routing-build-traffic). See [Getting started with Static IPs](/docs/networking/static-ips/getting-started) for the full walkthrough.

### Does Vercel publish a fixed IP address or IP range I can allowlist?

No. Without Static IPs, outbound traffic from your deployments uses dynamic IP addresses, and Vercel doesn't publish a fixed range for you to allowlist. To get fixed outbound addresses, use Static IPs on Pro or Enterprise, or [Secure Compute](/docs/networking/secure-compute) on Enterprise. If your backend runs on AWS, Google Cloud, or Azure, you can avoid an allowlist with [OIDC federation](/docs/oidc). If it publishes an AWS PrivateLink endpoint service, you can use [PrivateLink](/docs/networking/privatelink).

### Can I use Static IPs to give my app a fixed inbound IP address?

No. Static IPs only apply to outbound (egress) traffic, such as requests your Vercel Functions send to a database or API. Incoming requests to your app don't route through them, so you can't use your static IPs in a DNS record or give them out as your app's address. To control who can reach your app, use the [Vercel Firewall](/docs/vercel-firewall) or [Deployment Protection](/docs/deployment-protection).

### Are my static IP addresses dedicated to my team?

No. Each configured region provides two static IP addresses from a shared pool, and a small group of customers in the same region shares them. Keep your backend's authentication in place, because other customers' traffic can come from the same addresses. If you need IP addresses that only your team uses, use [Secure Compute](/docs/networking/secure-compute), which gives each network its own dedicated IP pair.

### Do Static IPs apply to preview deployments, builds, and middleware?

Static IPs apply to every [environment](/docs/deployments/environments) in the project, including preview and production, and you can't limit them to one environment. Builds use dynamic IP addresses until you turn on [Use for builds](#routing-build-traffic). [Routing Middleware](#routing-middleware-support) never uses static IPs, so make IP-restricted calls from a Vercel Function instead.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
