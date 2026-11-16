---
title: Fluid compute
product: vercel
url: /docs/fluid-compute
canonical_url: "https://vercel.com/docs/fluid-compute"
last_updated: 2026-08-24
type: reference
prerequisites:
  []
related:
  - /docs/fundamentals/what-is-compute
  - /docs/functions/functions-api-reference/vercel-functions-package
  - /docs/functions/configuring-functions/region
  - /docs/project-configuration/vercel-json
  - /docs/functions/runtimes/node-js
summary: Learn about fluid compute, an execution model for Vercel Functions that provides a more flexible and efficient way to run your functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/fluid-compute.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "601d66933ea289901b0066204dc28e24f83d1297b1df7e21f4291e17ef5893b4"
---

# Fluid compute

Fluid compute offers a blend of serverless flexibility and server-like capabilities. Unlike traditional [serverless architectures](/docs/fundamentals/what-is-compute#serverless), which can face issues such as cold starts and [limited functionalities](/docs/fundamentals/what-is-compute#serverless-disadvantages), fluid compute provides a hybrid solution. It overcomes the limitations of both serverless and server-based approaches, delivering the advantages of both worlds, including:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Fluid compute](https://vercel.com/blog/introducing-fluid-compute)
- [How to stop Vercel Functions from timing out](https://vercel.com/kb/guide/what-can-i-do-about-vercel-serverless-functions-timing-out) — Vercel Functions that time out usually trace back to a few causes. Learn how Fluid Compute fixes most of them and how to
- [How Fluid compute works on Vercel](https://vercel.com/blog/how-fluid-compute-works-on-vercel)
- [How Vercel Services run on Fluid compute](https://vercel.com/kb/guide/vercel-services-fluid-compute) — The backends in a Vercel Services project run as Vercel Functions on Fluid compute by default. Learn how optimized concu
- [Hosting your API on Vercel](https://vercel.com/kb/guide/hosting-backend-apis) — Learn how to build and scale performant APIs on Vercel.
- [How can I improve function cold start performance on Vercel?](https://vercel.com/kb/guide/improve-function-cold-start-performance-on-vercel) — Learn how to confirm whether cold starts cause function latency on Vercel, and how Fluid compute reduces how often they
- [Vercel Functions can now run on Fluid compute](https://vercel.com/changelog/vercel-functions-can-now-run-on-fluid-compute)
- [Fluid: How we built serverless servers](https://vercel.com/blog/fluid-how-we-built-serverless-servers)
- [Getting Timeouts When Deploying on Vercel](https://ai-sdk.dev/docs/troubleshooting/timeout-on-vercel) — Learn how to fix timeouts and cut off responses when deploying to Vercel.
- [Advanced Remix integration with streaming SSR and multi-runtime support](https://vercel.com/changelog/advanced-remix-integration-with-streaming-ssr-and-multi-runtime-support)
- [Bun runtime now supports large functions and extended max duration](https://vercel.com/changelog/bun-runtime-now-supports-large-functions-and-extended-max-duration)
- [Bun runtime for Vercel Functions now accepts Bun.serve as an entrypoint](https://vercel.com/changelog/bun-serve-entrypoint-for-vercel-functions)

Full cross-link map for this page: [/docs/fluid-compute.graph.md](/docs/fluid-compute.graph.md)
<!-- /docsgraph:related -->

- [**Zero configuration out of the box**](/docs/fluid-compute#default-settings-by-plan): Fluid compute comes with preset defaults that automatically optimize your functions for both performance and cost efficiency.
- [**Optimized concurrency**](/docs/fluid-compute#optimized-concurrency): Optimize resource usage by handling multiple invocations within a single function instance. Can be used with the **Node.js** and **Python** runtimes.
- **Dynamic scaling**: Fluid compute automatically optimizes existing resources before scaling up to meet traffic demands. This ensures low latency during high-traffic events and cost efficiency during quieter periods.
- **Background processing**: After fulfilling user requests, you can continue executing background tasks using [`waitUntil`](/docs/functions/functions-api-reference/vercel-functions-package#waituntil). This allows for a responsive user experience while performing time-consuming operations like logging and analytics in the background.
- **Automatic cold start optimizations**: Reduces the effects of cold starts through [automatic bytecode optimization](/docs/fluid-compute#bytecode-caching), and function pre-warming on production deployments.
- **Cross-region and availability zone failover**: Ensure high availability by first failing over to [another availability zone (AZ)](/docs/functions/configuring-functions/region#automatic-failover) within the same region if one goes down. If all zones in that region are unavailable, Vercel automatically redirects traffic to the next closest region. Zone-level failover also applies to non-fluid deployments.
- **Error isolation**: Unhandled errors won't crash other concurrent requests running on the same instance, maintaining reliability without sacrificing performance.

See [What is compute?](/docs/fundamentals/what-is-compute) to learn more about fluid compute and how it compares to traditional serverless models.

## Enabling fluid compute

> **💡 Note:** As of April 23, 2025, fluid compute is enabled by default for new projects.

You can enable fluid compute through the Vercel dashboard or by configuring your `vercel.json` file for specific environments or deployments.

### Enable for entire project

To enable fluid compute through the dashboard:

1. Navigate to your project's [Functions Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions\&title=Go+to+Functions+Settings) in the dashboard
2. Locate the **Fluid Compute** section
3. Toggle the switch to enable fluid compute for your project
4. Click **Save** to apply the changes
5. Deploy your project for the changes to take effect

When you enable it through the dashboard, fluid compute applies to all deployments for that project by default.

### Enable for specific environments and deployments

You can programmatically enable fluid compute using the [`fluid` property](/docs/project-configuration/vercel-json#fluid) in your `vercel.json` file. This approach is particularly useful for:

- **Testing on specific environments**: Enable fluid compute only for custom environments environments when using branch tracking
- **Per-deployment configuration**: Test fluid compute on individual deployments before enabling it project-wide

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "fluid": true
}
```

## Available runtime support

Fluid compute is available for the following runtimes:

- [Node.js](/docs/functions/runtimes/node-js)
- [Python](/docs/functions/runtimes/python)
- [Edge](/docs/functions/runtimes/edge)
- [Bun](/docs/functions/runtimes/bun)
- [Rust](/docs/functions/runtimes/rust)

## Optimized concurrency

Fluid compute allows multiple invocations to share a single function instance, this is especially valuable for AI applications, where tasks like fetching embeddings, querying vector databases, or calling external APIs can be [I/O-bound](# "What does I/O bound mean?"). By allowing concurrent execution within the same instance, you can reduce cold starts, minimize latency, and lower compute costs.

![How multiple requests are processed in the fluid compute model with optimized concurrency.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/fluid/serverless-active-light.avif)

Vercel Functions prioritize existing idle resources before allocating new ones, reducing unnecessary compute usage. This in-function-concurrency is especially effective when multiple requests target the same function, leading to fewer total resources needed for the same workload.

Optimized concurrency in fluid compute is available when using Node.js or Python runtimes. See the [efficient serverless Node.js with in-function concurrency](/blog/serverless-servers-node-js-with-in-function-concurrency) blog post to learn more.

## Bytecode caching

When using [Node.js version 20+](/docs/functions/runtimes/node-js/node-js-versions), Vercel Functions use bytecode caching to reduce cold start times. This stores the compiled bytecode of JavaScript files after their first execution, eliminating the need for recompilation during subsequent cold starts.

As a result, the first request isn't cached yet. However, subsequent requests benefit from the cached bytecode, enabling faster initialization. This optimization is especially beneficial for functions that are not invoked that often, as they will see faster cold starts and reduced latency for end users.

Bytecode caching is only applied to production environments, and is not available in development or preview deployments.

> **💡 Note:** For [frameworks](/docs/frameworks) that output ESM, all CommonJS dependencies
> (for example, `react`, `node-fetch`) will be opted into bytecode caching.

## Isolation boundaries and global state

On traditional serverless compute, the isolation boundary refers to the separation of individual instances of a function to ensure they don't interfere with each other. This provides a secure execution environment for each function.

However, because each function uses a microVM for isolation, which can lead to slower start-up times, you can see an increase in resource usage due to idle periods when the microVM remains inactive.

Fluid compute uses a different approach to isolation. Instead of using a microVM for each function invocation, multiple invocations can share the same physical instance (a global state/process) concurrently. This allows functions to share resources and execute in the same environment, which can improve performance and reduce costs.

When [uncaught exceptions](https://nodejs.org/api/process.html#event-uncaughtexception) or [unhandled rejections](https://nodejs.org/api/process.html#event-unhandledrejection) happen in Node.js, Fluid compute logs the error and lets current requests finish before stopping the process. This means one broken request won't crash other requests running on the same instance and you get the reliability of traditional serverless with the performance benefits of shared resources.

## Default settings by plan

Fluid Compute includes default settings that vary by plan:

| **Settings**                                                                                 | **Hobby**                           | **Pro**                              | **Enterprise**                       |
| -------------------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------ | ------------------------------------ |
| [**CPU configuration**](/docs/functions/configuring-functions/memory#memory-/-cpu-type)      | Standard                            | Standard / Performance               | Standard / Performance               |
| [**Default / Max duration**](/docs/functions/limitations#max-duration)                       | 300s (5 minutes) / 300s (5 minutes) | 300s (5 minutes) / 800s | 300s (5 minutes) / 800s |
| [**Extended max duration**](/docs/functions/configuring-functions/duration#extended-max-duration-beta) | -                                   | 1800s (30 minutes) Beta | 1800s (30 minutes) Beta |
| [**Multi-region failover**](/docs/functions/configuring-functions/region#automatic-failover) | No                      | No                       | Yes                   |
| [**Multi-region functions**](/docs/functions/runtimes#location)                              | No                      | Up to 3                              | All                                  |

> **💡 Note:** The 800 second maximum is generally available for Pro and Enterprise teams.
> The 30 minute extended maximum is in beta for supported Node.js, Bun, and
> Python runtime versions. To set values above 800 seconds, configure
> `maxDuration` on each Function rather than as a project default. Secure Compute does not
> support durations above 800 seconds during the beta. See [configuring maximum
> duration](/docs/functions/configuring-functions/duration#extended-max-duration-beta)
> for the supported runtimes and examples.

> **💡 Note:** For workloads that require unlimited execution time, use [Vercel
> Workflows](/docs/workflows), which allow your code to pause, resume, and
> maintain state for minutes to months without duration limits.

## Order of settings precedence

The settings you configure in your [function code](/docs/functions/configuring-functions), [dashboard](/dashboard), or [`vercel.json`](/docs/project-configuration) file will override the default fluid compute settings.

The following order of precedence determines which settings take effect. Settings with a higher precedence (a lower number in the table) always override those with a lower precedence:

| **Precedence** | **Stage**          | **Explanation**                                                                                                                                    | **Can Override**                                                                                                                                                                    |
| -------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1              | **Function code**  | Settings in your function code always take top priority. These include max duration defined directly in your code.                                 | [`maxDuration`](/docs/functions/configuring-functions/duration)                                                                                                                     |
| 2              | **`vercel.json`**  | Any settings in your [`vercel.json`](/docs/project-configuration) file, like max duration, and region, will override dashboard and Fluid defaults. | [`maxDuration`](/docs/functions/configuring-functions/duration), [`region`](/docs/functions/configuring-functions/region)                                                           |
| 3              | **Dashboard**      | Changes made in the dashboard, such as max duration, region, or CPU, override Fluid defaults.                                                      | [`maxDuration`](/docs/functions/configuring-functions/duration), [`region`](/docs/functions/configuring-functions/region), [`memory`](/docs/functions/configuring-functions/memory) |
| 4              | **Fluid defaults** | These are the default settings applied automatically when fluid compute is enabled, and do not configure any other settings.                       | N/A                                                                                                                                                                            |

## Pricing and usage

See the [fluid compute pricing](/docs/functions/usage-and-pricing) documentation for details on how fluid compute is priced, including active CPU, provisioned memory, and invocations.

## Related guides

- [The Complete Guide to Vercel Daemons](https://vercel.com/kb/guide/vercel-daemons): Run background workers with Vercel Daemons. Learn how to deploy container images, configure resources, handle shutdowns, and manage instances.
- [How to choose between Functions, containers, and Daemons on Vercel](https://vercel.com/kb/guide/vercel-functions-containers-daemons): Choose Vercel Functions for HTTP requests, container images for custom runtimes, and Daemons for continuous background workers.
- [How to optimize Next.js and Sitecore Content SDK apps](https://vercel.com/kb/guide/how-to-optimize-next.js-sitecore-content-sdk): Learn how to choose a rendering strategy, configure proxy middleware, and optimize costs for Next.js and Sitecore Content SDK apps on Vercel.
- [Deploy Symfony on Vercel with Docker](https://vercel.com/kb/guide/symfony-php-with-docker): Build a Symfony application with FrankenPHP and Docker, then deploy it to Vercel with production configuration, external storage, and preview deployments.

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
