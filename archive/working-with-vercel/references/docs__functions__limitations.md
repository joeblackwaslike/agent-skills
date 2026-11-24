---
title: Vercel Functions Limits
product: vercel
url: /docs/functions/limitations
canonical_url: "https://vercel.com/docs/functions/limitations"
last_updated: 2026-08-24
type: reference
prerequisites:
  - /docs/functions
related:
  - /docs/functions/runtimes/python
  - /docs/functions/runtimes
  - /docs/functions/configuring-functions/region
  - /docs/functions/runtimes/node-js
  - /docs/project-configuration/vercel-json
summary: Learn about the limits and restrictions of using Vercel Functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/functions/limitations.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "f0c33976480c5396ba0870589d6f805add2909223c9be1c62bf9375ae2967542"
---

# Vercel Functions Limits

The table below outlines the limits and restrictions of using Vercel Functions with Fluid compute:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Bun runtime now supports large functions and extended max duration](https://vercel.com/changelog/bun-runtime-now-supports-large-functions-and-extended-max-duration)
- [Higher defaults and limits for Vercel Functions running Fluid compute](https://vercel.com/changelog/higher-defaults-and-limits-for-vercel-functions-running-fluid-compute)
- [Python Vercel Functions bundle size limit increased to 500MB](https://vercel.com/changelog/python-vercel-functions-bundle-size-limit-increased-to-500mb)
- [Vercel Functions can now be up to 5GB in package size](https://vercel.com/changelog/vercel-functions-can-now-be-up-to-5-gb-in-package-size)
- [Vercel Functions now support request bodies up to 20MiB](https://vercel.com/changelog/vercel-functions-now-support-request-bodies-up-to-20mib)
- [Deploy Go apps on Vercel using Docker](https://vercel.com/kb/guide/deploy-go-using-docker-vercel) — Deploy an existing Dockerized Go app to Vercel using Memos as a real-world example, with Neon Postgres for durable data.
- [How to deploy Medusa on Vercel](https://vercel.com/kb/guide/deploy-medusa-on-vercel) — Deploy a Medusa storefront on Vercel, including where the backend runs, which environment variables the current starter
- [Do Vercel Functions support WebSocket connections?](https://vercel.com/kb/guide/do-vercel-serverless-functions-support-websocket-connections) — Vercel Functions serve WebSocket connections natively, in public beta on all plans. Learn how connections pin to instanc
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker) — Run Docker on Vercel for HTTP apps and background workers, store images in Vercel Container Registry, and test container
- [Running Docker on Vercel vs Render](https://vercel.com/kb/guide/docker-on-vercel-vs-render) — Compare how Vercel and Render run Docker workloads, including deployment model, scaling, image sources, state, and netwo
- [Vercel Pricing](https://vercel.com/pricing) — Choose a Vercel plan and compare features and usage pricing.
- [Running Agent Harnesses Durably on Vercel](https://vercel.com/docs/agent-harnesses) — Run Pi, fx, OpenCode, eve, Claude Code, and Codex on Vercel so a crash, a function timeout, or a redeploy resumes the ag

Full cross-link map for this page: [/docs/functions/limitations.graph.md](/docs/functions/limitations.graph.md)
<!-- /docsgraph:related -->

| Feature                                                                          | Limits                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Maximum memory](/docs/functions/limitations#memory-size-limits)                 | Hobby: 2 GB, Pro and Ent: 4 GB                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [Maximum duration](/docs/functions/limitations#max-duration)                     | Hobby: 300s default and maximum. Pro and Enterprise: 300s default, 800s maximum, and 1800s extended maximum Beta. See [max duration](/docs/functions/limitations#max-duration) for requirements and configuration.                                                                                                                                                                                                        |
| [Size](/docs/functions/limitations#bundle-size-limits) (uncompressed)            | 250 MB, or 500 MB for [Python](/docs/functions/runtimes/python). [Large functions](/docs/functions/limitations#large-functions-beta) support up to 5 GB Beta.                                                                                                                                                                                                                                                        |
| Concurrency                                                                      | Scales automatically based on demand                                                                                                                                                                                                                                                                                                                                                                                                         |
| [Cost](/docs/functions/runtimes)                                                 | Pay for active CPU time and provisioned memory time                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [Regions](/docs/functions/runtimes#location)                                     | Runs in a single region by default (`iad1`), which you can [change](/docs/functions/configuring-functions/region#setting-your-default-region).<br /> Pro and Enterprise teams can set [multiple regions](/docs/functions/configuring-functions/region#limits)                                                                                                                                                                                                                                                               |
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

### Troubleshooting the 250 MB limit

When a function exceeds the limit, the build fails with this error:

```txt
The Vercel Function "api/hello" is 300mb uncompressed which exceeds the maximum uncompressed size limit of 250mb.
```

If your project is eligible for [large functions](#large-functions-beta), the function can deploy without other changes once large functions are enabled. To find out what's making a function large, add the `VERCEL_ANALYZE_BUILD_OUTPUT` [environment variable](/docs/environment-variables) with the value `1` and redeploy. The build logs then list each function's uncompressed size and its largest files:

```txt
Function : /api
Size     : 1991.54 MB
  Large dependencies:
    • _vendor/tensorflow/libtensorflow_cc.so.2: 972.15 MB
    • _vendor/tensorflow/include: 307.87 MB
```

Common causes of large functions include:

- **Heavy dependencies:** Packages that ship binaries, such as [Puppeteer with its bundled Chromium](#running-puppeteer-and-headless-chromium), or machine learning libraries. Duplicate copies of the same package also add size. Run `npm ls <package>` to see why a package is installed, and `npm dedupe` to remove duplicates.
- **Static assets traced into the function:** Images, videos, or large JSON files that server code imports or reads are packaged with the function. Serve them from the `public` directory or external storage instead.
- **Dynamic imports with variable paths:** An import or `require` with a path built at runtime can make the bundler include every file in a directory. Use static import paths where you can.

To exclude files a function doesn't need, use `excludeFiles` in `vercel.json`. This example keeps the `public` and `test` directories out of every function under `api`:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "api/**": {
      "excludeFiles": "{public,test}/**"
    }
  }
}
```

In Next.js, use [`outputFileTracingExcludes`](https://nextjs.org/docs/app/api-reference/config/next-config-js/output) in `next.config.js` instead.

### Running Puppeteer and headless Chromium

The `puppeteer` package downloads a Chrome build of about 280 MB for Linux when you install it, which is larger than the standard bundle size limit. To take screenshots, generate PDFs, or automate a browser in a function, install [`puppeteer-core`](https://pptr.dev/guides/installation), which doesn't download a browser, and pair it with [`@sparticuz/chromium`](https://github.com/Sparticuz/chromium), a Chromium build for serverless environments.

`@sparticuz/chromium` ships a compressed Chromium binary inside the package, so the binary counts toward the function's bundle size. If the function exceeds the 250 MB limit, enable [large functions](#large-functions-beta).

```ts filename="app/api/title/route.ts"
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export async function GET() {
  const browser = await puppeteer.launch({
    args: await puppeteer.defaultArgs({
      args: chromium.args,
      headless: 'shell',
    }),
    executablePath: await chromium.executablePath(),
    headless: 'shell',
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://example.com', { waitUntil: 'networkidle2' });
    return Response.json({ title: await page.title() });
  } finally {
    await browser.close();
  }
}
```

Next.js keeps `puppeteer-core` and `@sparticuz/chromium` out of the server bundle by default. If your Next.js version bundles them, add both packages to [`serverExternalPackages`](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages) in `next.config.js`.

If you can't use large functions, install `@sparticuz/chromium-min` instead. It leaves the binary out of the package, and you pass `chromium.executablePath()` the URL of a Chromium archive that you host. The function downloads the archive when it starts, which makes the first request to a new function instance slower. The [Puppeteer on Vercel template](https://vercel.com/templates/next.js/puppeteer-on-vercel) shows this setup.

Chromium uses more memory than most functions need. The `@sparticuz/chromium` documentation recommends 1,600 MB or more. If the function runs out of memory or times out, raise its [memory](/docs/functions/configuring-functions/memory) or [maximum duration](/docs/functions/configuring-functions/duration).

## Large functions Beta

Large functions let you deploy uncompressed bundles up to **5 GB**. Use them for workloads that ship large dependencies, model files, or binaries. Large functions are supported on Node.js, Bun, and Python runtimes.

Large functions require [fluid compute](/docs/fluid-compute) with [Active CPU](/docs/functions/usage-and-pricing#active-cpu) enabled. Fluid compute is enabled by default for new projects.

### Enable large functions

New projects are eligible for large functions by default. For existing projects, opt in by setting the `VERCEL_SUPPORT_LARGE_FUNCTIONS` [environment variable](/docs/environment-variables).

The environment variable always takes precedence over the project default. Set it to `1` to enable support for large functions, or `0` to disable, for both new and existing projects.

You can set `VERCEL_SUPPORT_LARGE_FUNCTIONS` as a project [environment variable](/docs/environment-variables) in your project settings or with the [Vercel CLI](/docs/cli/env).

In eligible projects, Vercel only uses the large functions beta for Functions that exceed the standard bundle size limit. Functions that fit within the standard limit continue to use the standard path.

### Supported runtimes

Large functions are supported on the following runtimes:

- [`nodejs`](/docs/functions/runtimes/node-js)
- [`bun`](/docs/functions/runtimes/bun)
- [`python`](/docs/functions/runtimes/python)

> **💡 Note:** Large functions are supported for projects using
> [Secure Compute](/docs/networking/secure-compute) or
> [Static IPs](/docs/networking/static-ips). They are not yet supported with
> [BYOC](/docs/networking/bring-your-own-cloud).

## Max duration

This refers to the longest time a function invocation can run before Vercel terminates it. For request handlers, this includes time spent processing the request and sending the response, including streamed responses.

While Vercel Functions have a default duration, this duration can be extended using the [maxDuration config](/docs/functions/configuring-functions/duration). If a Vercel Function doesn't complete within the duration, a 504 error code ([`FUNCTION_INVOCATION_TIMEOUT`](/docs/errors/function_invocation_timeout)) is returned.

With [fluid compute](/docs/fluid-compute) enabled, Vercel Functions have the following defaults and maximum limits:

### Node.js, Bun, and Python runtimes

|            | Default          | Maximum | Extended maximum |
| ---------- | ---------------- | ------- | ---------------- |
| Hobby      | 300s (5 minutes) | 300s (5 minutes) | - |
| Pro        | 300s (5 minutes) | 800s | 1800s (30 minutes) Beta |
| Enterprise | 300s (5 minutes) | 800s | 1800s (30 minutes) Beta |

> **💡 Note:** The 800 second maximum is generally available for Pro and Enterprise teams.
> The 1800 second extended maximum is in beta. Values above 800 seconds require
> function-level configuration and are only supported for specific Node.js,
> Bun, and Python runtime versions. Durations above 800 seconds are supported
> with [Secure Compute](/docs/networking/secure-compute) and
> [Static IPs](/docs/networking/static-ips), but not with
> [BYOC](/docs/networking/bring-your-own-cloud). See [configuring maximum
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

Vercel Functions accept request bodies up to **4.5 MB** by default (see [How do I bypass the 4.5MB body size limit of Vercel Functions](/kb/guide/how-to-bypass-vercel-body-size-limit-serverless-functions)). Request bodies up to **20 MiB** are available in **Public Beta** for the Node.js, Python, and Bun runtimes.

To enable the 20 MiB limit:

1. Enable [fluid compute](/docs/fluid-compute#enabling-fluid-compute) for your project.
2. Set your project's [function memory](/docs/functions/configuring-functions/memory#setting-your-default-function-memory-/-cpu-size) to **Performance (4 GB)**, available on Pro and Enterprise plans.
3. Set `VERCEL_SUPPORT_LARGE_REQUEST_BODY=1` in your project's [environment variables](/docs/environment-variables) for the environments you want to enable, then redeploy.

The opt-in applies to the whole project in each selected environment, so you can test it in Preview before enabling it in Production.

When enabled, Routing Middleware receives headers and metadata but cannot access request bodies. Functions and Routing Middleware using the [Edge runtime](/docs/functions/runtimes/edge) keep the **4.5 MB** limit. Switch to the Node.js runtime to use larger bodies.

For larger requests, start reading the body as soon as it arrives. Where possible, process the data in smaller chunks to keep uploads moving and reduce memory use.

Requests exceeding the applicable limit return [413: `FUNCTION_PAYLOAD_TOO_LARGE`](/docs/errors/function_payload_too_large).

The response body size limit is **4.5 MB**, except for [streamed responses](/docs/functions/streaming-functions).

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
