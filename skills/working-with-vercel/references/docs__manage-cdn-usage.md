---
title: CDN pricing and usage
product: vercel
url: /docs/manage-cdn-usage
canonical_url: "https://vercel.com/docs/manage-cdn-usage"
last_updated: 2026-08-11
type: reference
prerequisites:
  []
related:
  - /docs/pricing
  - /docs/pricing/regional-pricing
  - /docs/image-optimization
  - /docs/cdn
  - /docs/caching/cdn-cache
summary: Understand CDN pricing resources, monitor usage from your dashboard, and optimize Fast Data Transfer, Fast Origin Transfer, and CDN Requests.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/manage-cdn-usage.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "3d444a946f34c974ad09f73c8f7120f7b71537fbe34fee34ba66fb64ba69223c"
---

# CDN pricing and usage

CDN pricing covers three resources:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Blob now supports consistent reads on private storage](https://vercel.com/changelog/vercel-blob-now-supports-consistent-reads-on-private-storage?from=related&source_path=%2Fdocs%2Fmanage-cdn-usage&source_site=vercel-docs&relationship=related)
- [Penetration testing on Vercel](https://vercel.com/kb/guide/penetration-testing-on-vercel?from=related&source_path=%2Fdocs%2Fmanage-cdn-usage&source_site=vercel-docs&relationship=related) — Learn how to perform pentesting on Vercel.
- [Life of a Vercel request: Navigating the Edge Network](https://vercel.com/blog/life-of-a-vercel-request-navigating-the-edge-network?from=related&source_path=%2Fdocs%2Fmanage-cdn-usage&source_site=vercel-docs&relationship=related)
- [Using Vercel as a Standalone CDN](https://vercel.com/kb/guide/using_vercel_as_a_cdn?from=related&source_path=%2Fdocs%2Fmanage-cdn-usage&source_site=vercel-docs&relationship=related) — Use Vercel's external rewrites to proxy and cache content from external websites or APIs through Vercel's global edge ne
- [How can I reduce my Vercel Functions usage on Vercel?](https://vercel.com/kb/guide/how-can-i-reduce-my-serverless-execution-usage-on-vercel?from=related&source_path=%2Fdocs%2Fmanage-cdn-usage&source_site=vercel-docs&relationship=related) — Reduce Vercel Functions usage and cost under Fluid compute pricing with caching, rendering strategies, and function conf
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related&source_path=%2Fdocs%2Fmanage-cdn-usage&source_site=vercel-docs&relationship=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related&source_path=%2Fdocs%2Fmanage-cdn-usage&source_site=vercel-docs&relationship=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [How Vercel CDN works](https://vercel.com/docs/how-vercel-cdn-works?from=related&source_path=%2Fdocs%2Fmanage-cdn-usage&source_site=vercel-docs&relationship=related) — Learn how Vercel's CDN processes requests through routing, caching, and compute layers to deliver your content with low
- [Calculating usage of resources](https://vercel.com/docs/pricing/how-does-vercel-calculate-usage-of-resources?from=related&source_path=%2Fdocs%2Fmanage-cdn-usage&source_site=vercel-docs&relationship=related) — Understand how Vercel measures and calculates your resource usage based on a typical user journey.
- [Limits and Pricing for Image Optimization](https://vercel.com/docs/image-optimization/limits-and-pricing?from=related&source_path=%2Fdocs%2Fmanage-cdn-usage&source_site=vercel-docs&relationship=related) — This page outlines information on the limits that are applicable when using Image Optimization, and the costs they can i
- [Managing Usage & Costs](https://vercel.com/docs/speed-insights/managing-usage?from=related&source_path=%2Fdocs%2Fmanage-cdn-usage&source_site=vercel-docs&relationship=related) — Learn how to measure and manage Speed Insights usage with this guide to reduce events and avoid unexpected costs.

Full cross-link map for this page: [/docs/manage-cdn-usage.graph.md](/docs/manage-cdn-usage.graph.md?from=related&source_path=%2Fdocs%2Fmanage-cdn-usage&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- **Fast Data Transfer**: Data sent between the CDN and the visitor's device.
- **Fast Origin Transfer**: Data sent between the CDN and Vercel Functions.
- **CDN Requests**: Requests the CDN processes.

![Image](https://vercel.com/front/docs/cdn/site-cdn-data-light.png)

Each plan includes a [usage allotment](/docs/pricing). Pro plans charge for usage beyond the included amount. Pricing varies by the region where requests originate.

## Fast Data Transfer

When a user visits your site, the data transfer between Vercel's CDN and the user's device gets measured as Fast Data Transfer. The data transferred gets measured based on data volume transferred, and can include assets such as your homepage, images, and other static files.

Fast Data Transfer usage incurs alongside [CDN Requests](#cdn-requests) every time a user visits your site, and is [priced regionally](/docs/pricing/regional-pricing).

### Optimizing Fast Data Transfer

The **Fast Data Transfer** chart on **Usage** in your dashboard sidebar shows the incoming and outgoing data transfer of your projects.

- The **Direction** filter allows you to see the data transfer direction (incoming or outgoing)
- The **Projects** filter allows you to see the data transfer of a specific project
- The **Regions** filter allows you to see the data transfer of a specific region. This is can be helpful due to the nature of [regional pricing and Fast Data Transfer](/docs/pricing/regional-pricing)

As with all charts on the **Usage** section in the sidebar, you can select the caret icon to view the chart as a full page.

To optimize Fast Data Transfer, you must optimize the assets that are being transferred. You can do this by:

- **Using Vercel's Image Optimization**: [Image Optimization](/docs/image-optimization) on Vercel uses advanced compression and modern file formats to reduce image and video file sizes. This decreases page load times and reduces Fast Data Transfer costs by serving optimized media tailored to the requesting device
- **Analyzing your bundles**: See your preferred frameworks documentation for guidance on how to analyze and reduce the size of your bundles. For Next.js, see the [Bundle Analyzer](https://nextjs.org/docs/app/guides/package-bundling) guide

To further analyze the data transfer of your projects, you can use [**Observability**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability\&title=Go+to+Observability) in the sidebar.

### Calculating Fast Data Transfer

Fast Data Transfer is calculated based on the full size of each HTTP request and response transmitted to or from Vercel's [CDN](/docs/cdn). This includes the body, all headers, the full URL and any compression. Incoming data transfer corresponds to the request, and outgoing corresponds to the response.

## Fast Origin Transfer

Fast Origin Transfer is incurred when using several Vercel products including Vercel Functions, Middleware, Blob and Data Cache (used through ISR).

### Calculating Fast Origin Transfer

Usage is incurred on both the input and output data transfer when using compute or blob on Vercel. For example:

- **Incoming:** The number of bytes sent as part of the [HTTP Request (Headers & Body)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http_requests).
  - For common `GET` requests, the incoming bytes are normally inconsequential (less than 1KB for a normal request).
  - For `POST` requests, like a file upload API, the incoming bytes would include the entire uploaded file.
- **Outgoing:** The number of bytes sent as the [HTTP Response (Headers & Body)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages#http_responses).

### Optimizing Fast Origin Transfer

#### Functions

> **💡 Note:** When using Incremental Static Regeneration (ISR) on Vercel, a Vercel Function
> is used to generate the static page. This optimization section applies for
> both server-rendered function usage, as well as usage for ISR. ISR usage on
> Vercel is billed under the Vercel Data Cache.

If using Vercel Functions, you can optimize Fast Origin Transfer by reducing the size of the response. Ensure your Function is only responding with relevant data (no extraneous API fields).

You can also add [caching headers](/docs/caching/cdn-cache) to the function response. By caching the response, future requests serve from the CDN cache, rather than invoking the function again. This reduces Fast Origin Transfer usage and improves performance.

Ensure your Function supports `If-Modified-Since` or `Etag` to prevent duplicate data transmission ([on by default for Next.js applications](https://nextjs.org/docs/app/api-reference/config/next-config-js/generateEtags)).

#### Middleware

If using Middleware, it is possible to accrue Fast Origin Transfer twice for a single Function request. To prevent this, you want to only run Middleware when necessary. For example, Next.js allows you to set a [matcher](https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher) to restrict what requests run Middleware.

#### Investigating usage

- Look at the Fast Origin Transfer section of the Usage page:
  - Observe incoming vs outgoing usage. Reference the list above for optimization tips.
  - Observe the breakdown by project.
  - Observe the breakdown by region (Fast Origin Transfer is [priced regionally](#fast-origin-transfer))
- If optimizing Outgoing Fast Origin Transfer:
  - Observe the breakdown by project to identify which projects contribute most
  - Filter by invocations to see which specific compute is being accessed most

## CDN Requests

When visiting your site, requests are made to a Vercel CDN [region](/docs/pricing/regional-pricing). Traffic is routed to the nearest region to the visitor. Static assets and functions all incur CDN Requests.

> **💡 Note:** CDN Requests appear as **Edge Requests** in your billing dashboard and usage
> charts.

### Managing CDN Requests

You can view the **Edge Requests** chart on **Usage** in your dashboard sidebar. This chart shows:

- **Count**: The total count of requests made to your deployments
- **Projects**: The projects that received the requests
- **Region**: The region where the requests are made

As with all charts on the **Usage** section in the sidebar, you can select the caret icon to view the chart in full screen mode.

### Optimizing CDN Requests

Frameworks such as [Next.js](/docs/frameworks/full-stack/nextjs), [SvelteKit](/docs/frameworks/full-stack/sveltekit), [Nuxt](/docs/frameworks/full-stack/nuxt), and others help build applications that automatically reduce unnecessary requests.

The most significant opportunities for optimizing CDN Requests include:

- **Identifying frequent re-mounting**: If your application involves rendering a large number of images and re-mounts them, it can inadvertently increase requests
  - **To identify**: Use your browsers devtools and browse your site. Pay attention to responses with a [304 status code](# "What is 304 status code?") on repeated requests paths. This indicates content that has been fetched multiple times
- **Excessive polling or data fetching**: Applications that poll APIs for live updates, or use tools like SWR or React Query to reload data on user focus can contribute to increased requests

## Edge Request CPU duration

Edge Request CPU duration is the measurement of CPU processing time per CDN Request. CDN Requests of 10ms or less in duration don't incur any additional charges. CPU duration is metered in increments of 10ms.

### Managing Edge Request CPU duration

View the **Edge Request CPU Duration** chart on **Usage** in your dashboard sidebar. If you notice an increase in CPU duration, investigate the following aspects of your application:

- Number of routes.
- Number of redirects.
- Complex regular expressions in routing.

To investigate further:

- Identify the deployment where the metric increased.
- Compare rewrites, redirects, and pages to the previous deployment.


---

[View full sitemap](/docs/sitemap)
