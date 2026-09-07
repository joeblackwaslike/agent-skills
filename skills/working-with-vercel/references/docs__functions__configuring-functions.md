---
title: Configuring Functions
product: vercel
url: /docs/functions/configuring-functions
canonical_url: "https://vercel.com/docs/functions/configuring-functions"
last_updated: 2026-07-01
type: how-to
prerequisites:
  - /docs/functions
related:
  - /docs/functions/runtimes
  - /docs/project-configuration/vercel-json
  - /docs/functions/configuring-functions/region
  - /docs/functions/limitations
  - /docs/functions/configuring-functions/duration
summary: Learn how to configure the runtime, region, maximum duration, and memory for Vercel Functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/configuring-functions.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "fde1786f6d1976635e2e26da8202e15cb33786aa5d79869323aa382678445490"
---

# Configuring Functions

You can configure Vercel functions in many ways, including the runtime, region, maximum duration, and memory.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I reduce my Vercel Functions usage on Vercel?](https://vercel.com/kb/guide/how-can-i-reduce-my-serverless-execution-usage-on-vercel?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions&source_site=vercel-docs&relationship=related) — Reduce Vercel Functions usage and cost under Fluid compute pricing with caching, rendering strategies, and function conf
- [Customizing Serverless Functions](https://vercel.com/blog/customizing-serverless-functions?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions&source_site=vercel-docs&relationship=related)
- [Getting started with Vercel Functions](https://vercel.com/docs/functions/quickstart?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions&source_site=vercel-docs&relationship=related) — Build your first Vercel Function in a few steps.
- [vercel.functions API Reference \\(Python\\)](https://vercel.com/docs/functions/functions-api-reference/vercel-sdk-python?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions&source_site=vercel-docs&relationship=related) — Learn about available APIs when working with Vercel Functions in Python.
- [Legacy Usage & Pricing for Functions](https://vercel.com/docs/functions/usage-and-pricing/legacy-pricing?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions&source_site=vercel-docs&relationship=related) — Learn about legacy usage and pricing for Vercel Functions.
- [Using the Rust Runtime with Vercel functions](https://vercel.com/docs/functions/runtimes/rust?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions&source_site=vercel-docs&relationship=related) — Build fast, memory-safe serverless functions with Rust on Vercel.
- [Project settings](https://vercel.com/docs/project-configuration/project-settings?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions&source_site=vercel-docs&relationship=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,

Full cross-link map for this page: [/docs/functions/configuring-functions.graph.md](/docs/functions/configuring-functions.graph.md?from=related&source_path=%2Fdocs%2Ffunctions%2Fconfiguring-functions&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

With different configurations, particularly the runtime configuration, there are a number of trade-offs and limits that you should be aware of. For more information, see the [runtimes](/docs/functions/runtimes) comparison.

## Runtime

The runtime you select for your function determines the infrastructure, APIs, and other abilities of your function.

With Vercel, you can configure the runtime of a function in any of the following ways:

- **Node.js**: When working with a TypeScript or JavaScript function, you can use the Node.js runtime by setting a config option within the function. For more information, see the [runtimes](/docs/functions/runtimes).
- **Ruby**, **Python**, **Go**: These have similar functionality and limitations as Node.js functions. The configuration for these runtimes gets based on the file extension.
- **Community runtimes**: You can specify any other [runtime](/docs/functions/runtimes#community-runtimes), by using the [`functions`](/docs/project-configuration/vercel-json#functions) property in your `vercel.json` file.

See [choosing a runtime](/docs/functions/runtimes) for more information.

## Region

Your function should execute in a location close to your data source. This minimizes latency, or delay, thereby enhancing your app's performance. How you configure your function's region, depends on the runtime used.

See [configuring a function's region](/docs/functions/configuring-functions/region) for more information.

## Maximum duration

The maximum duration for your function defines how long a function can run for, allowing for more predictable billing.

Vercel Functions have a default duration that's dependent on your plan, but you can configure this as needed, [up to your plan's limit](/docs/functions/limitations#max-duration).

See [configuring a function's duration](/docs/functions/configuring-functions/duration) for more information.

## Memory

Vercel Functions use an infrastructure that allows you to adjust the memory size.

See [configuring a function's memory](/docs/functions/configuring-functions/memory) for more information.


---

[View full sitemap](/docs/sitemap)
