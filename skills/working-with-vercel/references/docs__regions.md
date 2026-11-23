---
title: Global network and regions
product: vercel
url: /docs/regions
canonical_url: "https://vercel.com/docs/regions"
last_updated: 2026-08-11
type: reference
prerequisites:
  []
related:
  - /docs/pricing/regional-pricing
  - /docs/domains/working-with-domains/add-a-domain
  - /docs/frameworks/full-stack/nextjs
  - /docs/security/reverse-proxy
  - /docs/cli/dev
summary: "View the list of regions supported by Vercel's CDN and learn about our global infrastructure."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/regions.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "1564987576f8c653c39c4fa4573313f3d8577cf59e0bb066b45e3f5047bc5bf3"
---

# Global network and regions

**Vercel's CDN** is a globally distributed platform that stores content and runs compute close to your users and data, reducing latency and improving performance. This page details the [supported regions](#region-list) and explains our global infrastructure.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Custom OIDC Token Audiences](https://vercel.com/changelog/custom-oidc-token-audiences)
- [Expanded search for workflow runs in Vercel Observability](https://vercel.com/changelog/expanded-search-for-workflow-runs-in-vercel-observability)
- [Introducing the Montréal, Canada region (yul1) ](https://vercel.com/changelog/introducing-the-montreal-canada-vercel-region-yul1)
- [Vercel Sandbox is now available in all regions](https://vercel.com/changelog/vercel-sandbox-is-now-available-in-all-regions)
- [How to improve Core Web Vitals](https://vercel.com/kb/guide/how-to-improve-core-web-vitals) — Improve Core Web Vitals \\(INP, LCP, CLS\\) with metric-specific fixes, field-data measurement, and Next.js/Vercel perform
- [Managing Redirects from your CMS using Vercel Bulk Redirects](https://vercel.com/kb/guide/managing-redirects-from-your-cms-using-vercel-bulk-redirects) — Learn how to sync redirect rules from your CMS to Vercel at build time with vercel.ts, allowing non-technical teams to m
- [Migrate Fly.io worker processes to Vercel Daemons](https://vercel.com/kb/guide/migrate-fly-io-workers-to-vercel-daemons) — Migrate Fly.io workers to Vercel Daemons with your existing Dockerfile. Map process settings, preserve queue state, and
- [The Complete Guide to Vercel Daemons](https://vercel.com/kb/guide/vercel-daemons) — Run background workers with Vercel Daemons. Learn how to deploy container images, configure resources, handle shutdowns,
- [Update regarding Vercel service disruption on October 20, 2025](https://vercel.com/blog/update-regarding-vercel-service-disruption-on-october-20-2025)
- [Vercel CDN overview](https://vercel.com/docs/cdn) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [Security & Compliance Measures](https://vercel.com/docs/security/compliance) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti

Full cross-link map for this page: [/docs/regions.graph.md](/docs/regions.graph.md)
<!-- /docsgraph:related -->

![Our global CDN has 126 Points of Presence in 94 cities across 51 countries.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/edge-network/cdn-pops-light.png)

## Global infrastructure

Vercel's CDN is built on a sophisticated global infrastructure designed to optimize performance and reliability:

- **Points of Presence (PoPs)**: We operate over 126 PoPs distributed across the globe. These PoPs serve as the first point of contact for incoming requests, ensuring low-latency access for users worldwide.
- **Vercel Regions**: Behind these PoPs, we maintain 19 compute-capable regions where your code can run close to your data.
- **Private Network**: Traffic flows from PoPs to the nearest region through private, low-latency connections, ensuring fast and efficient data transfer.

This architecture balances the benefits of widespread geographical distribution with the efficiency of concentrated caching and compute resources.

### Caching strategy

Our approach to caching is designed to maximize efficiency and performance:

- By maintaining fewer, dense regions, we increase cache hit probability. This means that popular content is more likely to be available in each region's cache.
- The extensive PoP network ensures that users can quickly access regional caches, minimizing latency.
- This concentrated caching strategy results in higher cache hit ratios, reducing the need for requests to go back to the origin server and significantly improving response times.

## Region list

| Region Code | Region Name | Reference Location |
|-------------|-------------|--------------------|
| arn1 | eu-north-1 | Stockholm, Sweden |
| bom1 | ap-south-1 | Mumbai, India |
| cdg1 | eu-west-3 | Paris, France |
| cle1 | us-east-2 | Cleveland, USA |
| cpt1 | af-south-1 | Cape Town, South Africa |
| dub1 | eu-west-1 | Dublin, Ireland |
| fra1 | eu-central-1 | Frankfurt, Germany |
| gru1 | sa-east-1 | São Paulo, Brazil |
| hkg1 | ap-east-1 | Hong Kong |
| hnd1 | ap-northeast-1 | Tokyo, Japan |
| iad1 | us-east-1 | Washington, D.C., USA |
| icn1 | ap-northeast-2 | Seoul, South Korea |
| kix1 | ap-northeast-3 | Osaka, Japan |
| lhr1 | eu-west-2 | London, United Kingdom |
| pdx1 | us-west-2 | Portland, USA |
| sfo1 | us-west-1 | San Francisco, USA |
| sin1 | ap-southeast-1 | Singapore |
| syd1 | ap-southeast-2 | Sydney, Australia |
| yul1 | ca-central-1 | Montréal, Canada |


For information on different resource pricing based on region, see the [regional pricing](/docs/pricing/regional-pricing) page.

### Points of Presence (PoPs)

In addition to our 19 compute-capable regions, Vercel's CDN includes 126 PoPs distributed across the globe. These PoPs serve several crucial functions:

1. TCP termination and routing: PoPs terminate TCP and route requests over a private network to the nearest Vercel region with single-digit millisecond latency.
2. DDoS protection: They provide a first line of defense against distributed denial-of-service attacks.
3. TLS termination: The Vercel region the request is routed to handles TLS encryption and decryption.

The extensive PoP network ensures that users worldwide can access your content with minimal latency, even if compute resources are concentrated in fewer regions.

## Access from mainland China

Vercel has no regions or Points of Presence in mainland China. Sites hosted on Vercel can load slowly or fail to load for visitors there, and Vercel can't guarantee availability or performance in mainland China.

Three factors limit access:

| Cause | What it means for your site |
| --- | --- |
| No infrastructure in mainland China | Requests from mainland China travel to Vercel infrastructure outside it, which adds latency |
| Network controls | China's network controls, often called the Great Firewall, can block or throttle traffic to domains hosted outside the country, including `.vercel.app` domains. Traffic that isn't blocked still passes through international gateways, which slows connections. Blocking applies per domain, can differ between internet service providers, and can change without notice |
| Licensing | Hosting a site in mainland China requires an Internet Content Provider (ICP) license. Vercel doesn't offer hosting in mainland China or support for ICP licensing |

### Improve access for visitors in mainland China

A site hosted outside mainland China can't be made reliably reachable there, but these approaches reduce slow and blocked requests. They are listed from least to most effort:

| Approach | Infrastructure changes | ICP license required | Trade-offs |
| --- | --- | --- | --- |
| Use a custom domain | None | No | Least effort, but the domain can still be blocked |
| Self-host third-party resources | Minimal | No | Removes dependencies on services that are blocked in mainland China |
| Deploy a static mirror outside mainland China | A second deployment target | No | Routing can improve, but you maintain two builds |
| Deploy a separate version in mainland China | Hosting in mainland China | Yes | Most reliable access, with the most compliance and maintenance work |

- **Use a custom domain**: [Add a custom domain](/docs/domains/working-with-domains/add-a-domain) to your project and share that domain instead of the `.vercel.app` domain. A custom domain is less likely to be blocked than a `.vercel.app` domain.
- **Self-host third-party resources**: Fonts, analytics scripts, and other resources loaded from services that are blocked in mainland China can stall a page that is otherwise reachable. Serve those files from your own domain. In Next.js, [`next/font`](/docs/frameworks/full-stack/nextjs#font-optimization) downloads font files at build time and serves them with your deployment.
- **Deploy a static mirror outside mainland China**: Deploy a static copy of your site to infrastructure with more reliable routing into mainland China. Vercel [doesn't recommend placing a reverse proxy](/docs/security/reverse-proxy) in front of your Vercel project to do this.
- **Deploy a separate version in mainland China**: Run a separate version of the site on hosting infrastructure in mainland China. This gives visitors there the most reliable access, but requires an ICP license and a second site to maintain.

Start with a custom domain and self-hosted resources, because neither needs new infrastructure. Consider a mirror or a deployment in mainland China when reliable access there is a business requirement.

## Local development regions

When you use [the `vercel dev` CLI command to mimic your deployment environment locally](/docs/cli/dev), the region is assigned `dev1` to mimic the Vercel platform infrastructure.

| Region Code | Reference Location |
| ----------- | ------------------ |
| dev1        | localhost          |

## Compute defaults

- Vercel Functions default to running in the `iad1` (Washington, D.C., USA) region. Learn more about [changing function regions](/docs/functions/configuring-functions/region)

Functions should be executed in the same region as your database, or as close to it as possible, [for the lowest latency](/docs/functions/configuring-functions/region).

## Outage resiliency

Vercel's CDN is designed with high availability and fault tolerance in mind:

- In the event of regional downtime, application traffic is automatically rerouted to the next closest region. This ensures that your application remains available to users even during localized outages.
- Traffic will be rerouted to the next closest region in the following order:

**Default region (iad1) failover priority:**

| Priority | Region |
|----------|--------|
| P0 | iad1 |
| P1 | cle1 |
| P2 | yul1 |
| P3 | sfo1 |
| P4 | pdx1 |
| P5 | dub1 |
| P6 | lhr1 |
| P7 | cdg1 |
| P8 | fra1 |
| P9 | arn1 |
| P10 | gru1 |
| P11 | hnd1 |
| P12 | kix1 |
| P13 | icn1 |
| P14 | bom1 |
| P15 | syd1 |
| P16 | hkg1 |
| P17 | sin1 |
| P18 | cpt1 |


- For Enterprise customers, Vercel functions can automatically failover to a different region if the region they are running in becomes unavailable. Learn more about [Vercel Function failover](/docs/functions/configuring-functions/region#automatic-failover).

This multi-layered approach to resiliency, combining our extensive PoP network with intelligent routing and regional failover capabilities, ensures high availability and consistent performance for your applications.

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
