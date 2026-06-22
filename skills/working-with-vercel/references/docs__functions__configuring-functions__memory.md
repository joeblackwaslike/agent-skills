---
title: Configuring Memory and CPU for Vercel Functions
product: vercel
url: /docs/functions/configuring-functions/memory
canonical_url: "https://vercel.com/docs/functions/configuring-functions/memory"
last_updated: 2026-02-27
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
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "303d4fbce40a512a268ca3e4c276b1191d0001d7acbf72ae4910d68b11145330"
---

# Configuring Memory and CPU for Vercel Functions

The memory configuration of a function determines how much memory and CPU a function can use while executing. By default, on **Pro** and **Enterprise**, functions execute with 2 GB (1 vCPU) of memory. On **Hobby**, they will always execute with 2 GB (1 vCPU). You can change the [default memory size for all functions](#setting-your-default-function-memory-/-cpu-size) in a project.

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

> **⚠️ Warning:** You cannot set your memory size using `vercel.json`. If you try to do so, you
> will receive a warning at build time. Only Pro and Enterprise users can set
> the default memory size in the dashboard. Hobby users will always use the
> default memory size of 2 GB (1 vCPU).

### Memory / CPU type

The memory size you select will also determine the CPU allocated to your Vercel Functions. The following table shows the memory and CPU allocation for each type.

With [fluid compute enabled](/docs/fluid-compute) on Pro and Enterprise plans, the default memory size is 2 GB (1 vCPU) and can be upgraded to 4 GB / 2 vCPUs, for Hobby users, Vercel manages the CPU with a minimum of 1 vCPU.

| Type                                                                              | Memory / CPU   | Use                                                                                                 |
| --------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------- |
| Standard  | 2 GB / 1 vCPU  | Predictable performance for production workloads. Default for [fluid compute](/docs/fluid-compute). |
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
