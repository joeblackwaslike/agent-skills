---
title: Configuring Memory and CPU for Vercel Functions
product: vercel
url: /docs/functions/configuring-functions/memory
canonical_url: "https://vercel.com/docs/functions/configuring-functions/memory"
last_updated: 2026-07-15
type: how-to
prerequisites:
  - /docs/functions/configuring-functions
  - /docs/functions
related:
  - /docs/fluid-compute
  - /docs/functions/limitations
  - /docs/functions/usage-and-pricing
summary: Learn how to set the memory / CPU of a Vercel Function.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/configuring-functions/memory.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "8fa865c4f25be15f3c9fdfc7fd40d6a6cce8a40248f0570f14a9d68cc964c60b"
---

# Configuring Memory and CPU for Vercel Functions

The memory configuration of a function determines how much memory and CPU a function can use while executing. By default, on **Pro** and **Enterprise**, functions execute with 2 GB (1 vCPU) of memory. On **Hobby**, they will always execute with 2 GB (1 vCPU). You can change the [default memory size for all functions](#setting-your-default-function-memory-/-cpu-size) in a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deployment pages now display key configuration settings](https://vercel.com/changelog/deployment-pages-now-display-key-configuration-settings?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=related)
- [Faster defaults for Vercel Function CPU and memory](https://vercel.com/changelog/faster-defaults-for-vercel-function-cpu-and-memory?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=related)
- [In-function concurrency now in public beta](https://vercel.com/changelog/in-function-concurrency-now-in-public-beta?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=related)
- [Manage your Vercel Functions CPU and memory in the dashboard](https://vercel.com/changelog/manage-your-vercel-functions-cpu-and-memory-in-the-dashboard?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=related)
- [Detect memory and OOM failures in Vercel Functions](https://vercel.com/kb/guide/detect-memory-and-oom-failures-in-serverless-functions?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=related) — Fix out-of-memory \\(OOM\\) errors and memory limit exceeded crashes in Vercel serverless functions. Debug 5xx errors, mon
- [How can I reduce my Vercel Functions usage on Vercel?](https://vercel.com/kb/guide/how-can-i-reduce-my-serverless-execution-usage-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=related) — Reduce Vercel Functions usage and cost under Fluid compute pricing with caching, rendering strategies, and function conf
- [How Vercel Services run on Fluid compute](https://vercel.com/kb/guide/vercel-services-fluid-compute?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=related) — The backends in a Vercel Services project run as Vercel Functions on Fluid compute by default. Learn how optimized concu
- [Higher defaults and limits for Vercel Functions running Fluid compute](https://vercel.com/changelog/higher-defaults-and-limits-for-vercel-functions-running-fluid-compute?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=related)
- [Troubleshooting Build Error: "Serverless Function has exceeded the unzipped maximum size of 250 MB"](https://vercel.com/kb/guide/troubleshooting-function-250mb-limit?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=related) — Learn how to troubleshoot builds failing due to exceeding the maximum function size limit on Vercel.
- [Pricing on Vercel](https://vercel.com/docs/pricing?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Production checklist for launch](https://vercel.com/docs/production-checklist?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=related) — Ensure your application is ready for launch with this comprehensive production checklist by the Vercel engineering team.
- [Static Configuration with vercel.json](https://vercel.com/docs/project-configuration/vercel-json?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=related) — Learn how to use vercel.json to configure and override the default behavior of Vercel from within your project.

Full cross-link map for this page: [/docs/functions/configuring-functions/memory.graph.md](/docs/functions/configuring-functions/memory.graph.md?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions%2Fmemory&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Memory configuration considerations

You should consider the following points when changing the memory size of your functions:

- **Performance**: Increasing memory size can improve the performance of your functions, allowing them to run faster
- **Cost**: Vercel bills Functions on fluid compute based on Active CPU, Provisioned Memory, and Invocations. Increasing memory also increases available CPU, which can help CPU-intensive functions finish faster and reduce Active CPU time. Larger memory settings can increase Provisioned Memory usage while requests are in progress. See [Pricing](#pricing) for more information

## Setting your default function memory / CPU size

Those on the Pro or Enterprise plans can configure the default memory size for all functions in a project.

To change the default function memory size:

1. Choose the appropriate project from your [dashboard](/dashboard)
2. Open **Settings** in the sidebar
3. Scroll to [**Functions**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions\&title=Go+to+Functions+Settings)
4. Select **Advanced Settings**
5. In the **Function CPU** section, select your preferred memory size option:

![Image](https://vercel.com/front/docs/functions/configure-mem-light.png)

6. The change will be applied to all future deployments made by your team. You must create a new deployment for your changes to take effect

> **💡 Note:** You cannot set your memory size using `vercel.json`. If you try to do so, you
> will receive a warning at build time. Only Pro and Enterprise users can set
> the default memory size in the dashboard. Hobby users will always use the
> default memory size of 2 GB (1 vCPU).

### Memory / CPU type

The memory size you select will also determine the CPU allocated to your Vercel Functions. The following table shows the memory and CPU allocation for each type.

With [fluid compute enabled](/docs/fluid-compute) on Pro and Enterprise plans, the default memory size is 2 GB (1 vCPU) and can be upgraded to 4 GB / 2 vCPUs, for Hobby users, Vercel manages the CPU with a minimum of 1 vCPU.

| Type                                                                              | Memory / CPU   | Use                                                                                                 |
| --------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------- |
| Standard Default | 2 GB / 1 vCPU  | Predictable performance for production workloads. Default for [fluid compute](/docs/fluid-compute). |
| Performance                                                                       | 4 GB / 2 vCPUs | Increased performance for latency-sensitive applications and SSR workloads.                         |

Users on the Hobby plan can only use the default memory size of 2 GB (1 vCPU). **Hobby users cannot configure this size**. If you are on the Hobby plan, and have enabled fluid compute, the memory size will be managed by Vercel with a minimum of 1 vCPU.

> **💡 Note:** Projects created before **2019-11-08** have the default function memory size
> set to **1024 MB/0.6 vCPU** for **Hobby** plan, and **3008 MB/1.67 vCPU** for
> **Pro** and **Enterprise** plan. Although the dashboard may not have any
> memory size option selected by default for those projects, you can start using
> the new memory size options by selecting your preferred memory size in the
> dashboard.

## Viewing your function memory size

To check the memory size of your functions in the [dashboard](/dashboard), follow these steps:

1. Find the project you want to review and open [**Deployments**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fdeployments\&title=Go+to+Deployments) in the sidebar
2. Go to the deployment you want to review
3. Open **Resources** in the sidebar
4. Search for the function by name or find it in the **Functions** section
5. Click on the name of the function to open it in **Observability**
6. Hover over the information icon next to the function name to view its memory size

## Memory limits

To learn more about the maximum size of your function's memory, see [Max memory size](/docs/functions/limitations#memory-size-limits).

## Pricing

Memory / CPU size affects two current fluid compute pricing dimensions:

- **Active CPU**: CPU time your code actively consumes. More CPU can reduce Active CPU time for CPU-bound work if the function finishes faster.
- **Provisioned Memory**: Memory allocated to the function instance while requests are in progress. Larger memory settings increase the GB-hour rate for this dimension.

Vercel bills Invocations separately per incoming request. To learn more, see [Vercel Functions pricing](/docs/functions/usage-and-pricing).


---

[View full sitemap](/docs/sitemap)
