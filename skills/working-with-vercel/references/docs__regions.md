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
  - /docs/cli/dev
  - /docs/functions/configuring-functions/region
summary: "View the list of regions supported by Vercel's CDN and learn about our global infrastructure."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/regions.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "858e2a4e60e00748a781057e22460fd885c7357a4c294f76a09070ec1cd27bb6"
---

# Global network and regions

**Vercel's CDN** is a globally distributed platform that stores content and runs compute close to your users and data, reducing latency and improving performance. This page details the [supported regions](#region-list) and explains our global infrastructure.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Custom OIDC Token Audiences](https://vercel.com/changelog/custom-oidc-token-audiences?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=related)
- [Expanded search for workflow runs in Vercel Observability](https://vercel.com/changelog/expanded-search-for-workflow-runs-in-vercel-observability?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=related)
- [Introducing the Montréal, Canada region (yul1) ](https://vercel.com/changelog/introducing-the-montreal-canada-vercel-region-yul1?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=related)
- [How can I use geolocation IP headers?](https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=related) — Learn how to read geolocation headers on Vercel with Next.js or any frontend framework.
- [How can I use AWS SDK Environment Variables on Vercel?](https://vercel.com/kb/guide/how-can-i-use-aws-sdk-environment-variables-on-vercel?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=related) — How to use AWS SDK Environment Variables on Vercel
- [Managing Redirects from your CMS using Vercel Bulk Redirects](https://vercel.com/kb/guide/managing-redirects-from-your-cms-using-vercel-bulk-redirects?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=related) — Learn how to sync redirect rules from your CMS to Vercel at build time with vercel.ts, allowing non-technical teams to m
- [Update regarding Vercel service disruption on October 20, 2025](https://vercel.com/blog/update-regarding-vercel-service-disruption-on-october-20-2025?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=related)
- [Behind the scenes of Vercel's infrastructure: Achieving optimal scalability and performance](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=related)
- [Effortless high availability for dynamic frontends](https://vercel.com/blog/effortless-high-availability-for-dynamic-frontends?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=related)
- [Improved resiliency for Vercel Functions with inter-region failover support](https://vercel.com/changelog/improved-resiliency-for-vercel-functions-with-failover-support?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=related)
- [Regional execution for ultra-low latency rendering at the edge](https://vercel.com/blog/regional-execution-for-ultra-low-latency-rendering-at-the-edge?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=related)
- [Understanding Vercel Functions](https://vercel.com/blog/understanding-vercel-functions?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/regions.graph.md](/docs/regions.graph.md?from=related&source_path=%2Fdocs%2Fregions&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

![Image](https://vercel.com/front/docs/edge-network/cdn-pops-light.png)

## Global infrastructure

Vercel's CDN is built on a sophisticated global infrastructure designed to optimize performance and reliability:

- **Points of Presence (PoPs)**: We operate over 126 PoPs distributed across the globe. These PoPs serve as the first point of contact for incoming requests, ensuring low-latency access for users worldwide.
- **Vercel Regions**: Behind these PoPs, we maintain 20 compute-capable regions where your code can run close to your data.
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
| dxb1 | me-central-1 | Dubai, United Arab Emirates |
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

In addition to our 20 compute-capable regions, Vercel's CDN includes 126 PoPs distributed across the globe. These PoPs serve several crucial functions:

1. TCP termination and routing: PoPs terminate TCP and route requests over a private network to the nearest Vercel region with single-digit millisecond latency.
2. DDoS protection: They provide a first line of defense against distributed denial-of-service attacks.
3. TLS termination: The Vercel region the request is routed to handles TLS encryption and decryption.

The extensive PoP network ensures that users worldwide can access your content with minimal latency, even if compute resources are concentrated in fewer regions.

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
| P9 | bru1 |
| P10 | arn1 |
| P11 | gru1 |
| P12 | hnd1 |
| P13 | kix1 |
| P14 | icn1 |
| P15 | bom1 |
| P16 | syd1 |
| P17 | hkg1 |
| P18 | sin1 |
| P19 | cpt1 |


- For Enterprise customers, Vercel functions can automatically failover to a different region if the region they are running in becomes unavailable. Learn more about [Vercel Function failover](/docs/functions/configuring-functions/region#automatic-failover).

This multi-layered approach to resiliency, combining our extensive PoP network with intelligent routing and regional failover capabilities, ensures high availability and consistent performance for your applications.


---

[View full sitemap](/docs/sitemap)
