---
title: Vercel Functions Limits
product: vercel
url: /docs/functions/limitations
canonical_url: "https://vercel.com/docs/functions/limitations"
last_updated: 2026-07-01
type: reference
prerequisites:
  - /docs/functions
related:
  - /docs/functions/runtimes/python
  - /docs/functions/concurrency-scaling
  - /docs/functions/runtimes
  - /docs/functions/configuring-functions/region
  - /docs/functions/runtimes/node-js
summary: Learn about the limits and restrictions of using Vercel Functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/limitations.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "649b9198109f6f060a1ab5092a400e1f635d706ba32e7fcaaa21ea73c736fa07"
---

# Vercel Functions Limits

The table below outlines the limits and restrictions of using Vercel Functions with Fluid compute:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I deploy Discord bots to Vercel?](https://vercel.com/kb/guide/can-i-deploy-discord-bots-to-vercel?from=related) — Learn about whether it's possible to deploy Discord Bots to Vercel.
- [Do Vercel Serverless Functions support WebSocket connections?](https://vercel.com/kb/guide/do-vercel-serverless-functions-support-websocket-connections?from=related) — Information on Vercel's support for WebSocket connections with Vercel Functions.
- [Running Docker on Vercel vs Render](https://vercel.com/kb/guide/docker-on-vercel-vs-render?from=related) — Compare how Vercel and Render run Docker workloads, including deployment model, scaling, image sources, state, and netwo
- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments?from=related) — Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with A
- [How can I reduce my Vercel Functions usage on Vercel?](https://vercel.com/kb/guide/how-can-i-reduce-my-serverless-execution-usage-on-vercel?from=related) — Reduce Vercel Functions usage and cost under Fluid compute pricing with caching, rendering strategies, and function conf
- [Legacy Usage & Pricing](https://vercel.com/docs/functions/usage-and-pricing/legacy-pricing?from=related) — Learn about legacy usage and pricing for Vercel Functions.
- [Vercel Primitives](https://vercel.com/docs/build-output-api/primitives?from=related) — Learn about the Vercel platform primitives and how they work together to create a Vercel Deployment.
- [Pricing and Limits](https://vercel.com/docs/eve/pricing?from=related) — Understand how eve usage maps to Vercel resources and inherited platform limits.
- [Core](https://vercel.com/docs/flags/vercel-flags/sdks/core?from=related) — Use the Vercel Flags core evaluation library directly for custom setups.
- [Backends](https://vercel.com/docs/frameworks/backend?from=related) — Vercel supports a wide range of the most popular backend frameworks, optimizing how your application builds and runs no

Full cross-link map for this page: [/docs/functions/limitations.graph.md](/docs/functions/limitations.graph.md)
<!-- /docsgraph:related -->

| Feature                                                                          | Limits                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Maximum memory](/docs/functions/limitations#memory-size-limits)                 | Hobby: 2 GB, Pro and Ent: 4 GB                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [Maximum duration](/docs/functions/limitations#max-duration)                     | Hobby: 300s default and maximum. Pro and Enterprise: 300s default, 800s maximum, and 1800s extended maximum . See [max duration](/docs/functions/limitations#max-duration) for requirements and configuration.                                                                                                                                                                                                        |
| [Size](/docs/functions/limitations#bundle-size-limits) (uncompressed)            | 250 MB, or 500 MB for [Python](/docs/functions/runtimes/python). [Large functions](/docs/functions/limitations#large-functions-beta) support up to 5 GB .                                                                                                                                                                                                                                                        |
| [Concurrency](/docs/functions/concurrency-scaling#automatic-concurrency-scaling) | Auto-scales up to 30,000 (Hobby and Pro) or 100,000+ (Enterprise) concurrency                                                                                                                                                                                                                                                                                                                                                                                                         |
| [Cost](/docs/functions/runtimes)                                                 | Pay for active CPU time and provisioned memory time                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [Regions](/docs/functions/runtimes#location)                                     | Runs in a single region by default (`iad1`), which you can [change](/docs/functions/configuring-functions/region#setting-your-default-region). Pro and Enterprise teams can set [multiple regions](/docs/functions/configuring-functions/region#limits)                                                                                                                                                                                                                                                               |
| [API Coverage](/docs/functions/limitations#api-support)                          | Full Node.js coverage                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [File descriptors](/docs/functions/limitations#file-descriptors)                 | 1,024 shared across concurrent executions (including runtime usage)                                                                                                                                                                                                                                                                                                                                                                                                                   |

## Functions name

The following limits apply to the function's name when using [Node.js runtime](/docs/functions/runtimes/node-js):

- Maximum length of 128 characters. This includes the extension of the file (e.g. `apps/admin/api/my-function.js` is 29 characters)
- No spaces are allowed. Replace them with a `-` or `_` (e.g. `api/my function.js` isn't allowed)

## Bundle size limits

Vercel places restrictions on the maximum size of the deployment bundle for functions to ensure that they execute in a timely manner.

For Vercel Functions, the maximum uncompressed size is **250 MB** including layers which are automatically used depending on [runtimes](/docs/functions/runtimes). These limits are [enforced by AWS](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html). For [Python functions](/docs/functions/runtimes/python), the maximum uncompressed size is **500 MB**.

You can use [`includeFiles` and `excludeFiles`](/docs/project-configuration/vercel-json#functions) to specify items which may affect the function size. These configurations are not supported in Next.js, instead use [`outputFileTracingIncludes`](https://nextjs.org/docs/app/api-reference/config/next-config-js/output).

## Large functions&#x20;

Large functions let you deploy uncompressed bundles up to **5 GB**. Use them for workloads that ship large dependencies, model files, or binaries. Large functions are supported on Node.js and Python runtimes.

Large functions require [fluid compute](/docs/fluid-compute) with [Active CPU](/docs/functions/usage-and-pricing#active-cpu) enabled. Fluid compute is enabled by default for new projects.

### Enable large functions

New projects are eligible for large functions by default. For existing projects, opt in by setting the `VERCEL_SUPPORT_LARGE_FUNCTIONS` [environment variable](/docs/environment-variables).

The environment variable always takes precedence over the project default. Set it to `1` to enable support for large functions, or `0` to disable, for both new and existing projects.

You can set `VERCEL_SUPPORT_LARGE_FUNCTIONS` as a project [environment variable](/docs/environment-variables) in your project settings or with the [Vercel CLI](/docs/cli/env).

In eligible projects, Vercel only uses the large functions beta for Functions that exceed the standard bundle size limit. Functions that fit within the standard limit continue to use the standard path.

### Supported runtimes

Large functions are supported on the following runtimes:

- [`nodejs`](/docs/functions/runtimes/node-js)
- [`python`](/docs/functions/runtimes/python)

> **💡 Note:** Large functions are not yet supported for projects using
> [Secure Compute](/docs/networking/secure-compute) or
> [Static IPs](/docs/networking/static-ips).

## Max duration

This refers to the longest time a function invocation can run before Vercel terminates it. For request handlers, this includes time spent processing the request and sending the response, including streamed responses.

While Vercel Functions have a default duration, this duration can be extended using the [maxDuration config](/docs/functions/configuring-functions/duration). If a Vercel Function doesn't complete within the duration, a 504 error code ([`FUNCTION_INVOCATION_TIMEOUT`](/docs/errors/function_invocation_timeout)) is returned.

With [fluid compute](/docs/fluid-compute) enabled, Vercel Functions have the following defaults and maximum limits:

### Node.js and Python runtimes

|            | Default          | Maximum | Extended maximum |
| ---------- | ---------------- | ------- | ---------------- |
| Hobby      | 300s (5 minutes) | 300s (5 minutes) | - |
| Pro        | 300s (5 minutes) | 800s | 1800s (30 minutes)  |
| Enterprise | 300s (5 minutes) | 800s | 1800s (30 minutes)  |

> **💡 Note:** The 800 second maximum is generally available for Pro and Enterprise teams.
> The 1800 second extended maximum is in beta. Values above 800 seconds require
> function-level configuration and are only supported for specific Node.js and
> Python runtime versions. [Secure Compute](/docs/networking/secure-compute)
> and [Static IPs](/docs/networking/static-ips) do not support durations above
> 800 seconds during the beta. See [configuring maximum
> duration](/docs/functions/configuring-functions/duration#extended-max-duration-beta)
> for the supported runtimes and examples.

> **💡 Note:** For workloads that require unlimited execution time, use [Vercel
> Workflows](/docs/workflows), which allow your code to pause, resume, and
> maintain state for minutes to months without duration limits.

### Edge runtime

Vercel Functions using the [Edge runtime](/docs/functions/runtimes/edge) must begin sending a response within 25 seconds to maintain streaming capabilities beyond this period, and can continue [streaming](/docs/functions/streaming-functions) data for up to 300 seconds.

## Memory size limits

Vercel Functions have the following defaults and maximum limits:

|                  | Default       | Maximum       |
| ---------------- | ------------- | ------------- |
| Hobby            | 2 GB / 1 vCPU | 2 GB / 1 vCPU |
| Pro / Enterprise | 2 GB / 1 vCPU | 4 GB / 2 vCPU |

Users on Pro and Enterprise plans can [configure the default memory size](/docs/functions/configuring-functions/memory#setting-your-default-function-memory-/-cpu-size) for all functions in the dashboard.

The maximum size for a Function includes your JavaScript code, imported libraries and files (such as fonts), and all files bundled in the function.

If you reach the limit, make sure the code you are importing in your function is used
and is not too heavy. You can use a package size checker tool like [bundle](https://bundle.js.org/) to
check the size of a package and search for a smaller alternative.

## Request body size

In Vercel, the request body size is the maximum amount of data that can be included in the body of a request to a function.

The maximum payload size for the request body or the response body of a Vercel Function is **4.5 MB**. If a Vercel Function receives a payload in excess of the limit it will return an error [413: `FUNCTION_PAYLOAD_TOO_LARGE`](/docs/errors/function_payload_too_large). See [How do I bypass the 4.5MB body size limit of Vercel Functions](/kb/guide/how-to-bypass-vercel-body-size-limit-serverless-functions) for more information.

## File descriptors

File descriptors are unique identifiers that the operating system uses to track and manage open resources like files, network connections, and I/O streams. Think of them as handles or references that your application uses to interact with these resources. Each time your code opens a file, establishes a network connection, or creates a socket, the system assigns a file descriptor to track that resource.

Vercel Functions have a limit of **1,024 file descriptors** shared across all concurrent executions. This limit includes file descriptors used by the runtime itself, so the actual number available to your application code will be strictly less than 1,024.

File descriptors are used for:

- Open files
- Network connections (TCP sockets, HTTP requests)
- Database connections
- File system operations

If your function exceeds this limit, you might encounter errors related to "too many open files" or similar resource exhaustion issues.

To manage file descriptors effectively, consider the following:

- Close files, database connections, and HTTP connections when they're no longer needed
- Use connection pooling for database connections
- Implement proper resource cleanup in your function code

## API support

|                        | Support                                                  |
| ---------------------- | -------------------------------------------------------- |
| Geolocation data       | [Yes](/docs/headers/request-headers#x-vercel-ip-country) |
| Access request headers | Yes                                                      |
| Cache responses        | [Yes](/docs/caching/cdn-cache#using-vercel-functions)            |

## Cost and usage

The Hobby plan offers functions for free, within [limits](/docs/limits). The Pro plan extends these limits, and charges usage based on active CPU time and provisioned memory time for Vercel Functions.

Active CPU time is based on the amount of CPU time your code actively consumes, measured in milliseconds. Waiting for I/O (e.g. calling AI models, database queries) does not count towards active CPU time. Provisioned memory time is based on the memory allocated to your function instances multiplied by the time they are running.

It is important to make sure you've set a reasonable [maximum duration](/docs/functions/configuring-functions/duration) for your function. See "Managing usage and pricing for [Vercel Functions](/docs/functions/usage-and-pricing)" for more information.

## Environment variables

If you have [fluid compute](/docs/fluid-compute) enabled, the following environment variables are not accessible and you cannot log them:

- `AWS_EXECUTION_ENV`
- `AWS_LAMBDA_EXEC_WRAPPER`
- `AWS_LAMBDA_FUNCTION_MEMORY_SIZE`
- `AWS_LAMBDA_FUNCTION_NAME`
- `AWS_LAMBDA_FUNCTION_VERSION`
- `AWS_LAMBDA_INITIALIZATION_TYPE`
- `AWS_LAMBDA_LOG_GROUP_NAME`
- `AWS_LAMBDA_LOG_STREAM_NAME`
- `AWS_LAMBDA_RUNTIME_API`
- `AWS_XRAY_CONTEXT_MISSING`
- `AWS_XRAY_DAEMON_ADDRESS`
- `LAMBDA_RUNTIME_DIR`
- `LAMBDA_TASK_ROOT`
- `_AWS_XRAY_DAEMON_ADDRESS`
- `_AWS_XRAY_DAEMON_PORT`
- `_HANDLER`
- `_LAMBDA_TELEMETRY_LOG_FD`


---

[View full sitemap](/docs/sitemap)
