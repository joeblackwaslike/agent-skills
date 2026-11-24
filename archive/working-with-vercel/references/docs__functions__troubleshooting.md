---
title: Troubleshooting Vercel Functions
product: vercel
url: /docs/functions/troubleshooting
canonical_url: "https://vercel.com/docs/functions/troubleshooting"
last_updated: 2026-11-17
type: how-to
prerequisites:
  - /docs/functions
related:
  - /docs/functions/debug-slow-functions
  - /docs/functions/limitations
  - /docs/errors
  - /docs/observability/debug-production-errors
  - /docs/logs/runtime
summary: Diagnose errors in Vercel Functions, including ECONNRESET errors when a function calls an external API or database.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/functions/troubleshooting.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "a24c63625b49cdff3adc6d685dce7aa724cd4a5f3ae1d8ac7ab5e01ecd1a2b5d"
---

# Troubleshooting Vercel Functions

Use this page to diagnose errors that your Vercel Functions log at runtime. For other problems, start with the page that matches the symptom:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Troubleshooting Inconsistent Logs in Vercel Functions](https://vercel.com/kb/guide/troubleshooting-inconsistent-logs-in-vercel-functions) — Learn how to troubleshoot and resolve logs that appear mixed in Vercel Functions. This guide explains why logs from diff
- [How to stop Vercel Functions from timing out](https://vercel.com/kb/guide/what-can-i-do-about-vercel-serverless-functions-timing-out) — Vercel Functions that time out usually trace back to a few causes. Learn how Fluid Compute fixes most of them and how to
- [How do I bypass the 4.5MB body size limit of Vercel Serverless Functions?](https://vercel.com/kb/guide/how-to-bypass-vercel-body-size-limit-serverless-functions) — Learn how to deal with the body size limit of Serverless Functions on Vercel.
- [Using the Node.js Runtime with Vercel Functions](https://vercel.com/docs/functions/runtimes/node-js) — Learn how to use the Node.js runtime to create Vercel Functions in JavaScript or TypeScript.
- [Getting started with Vercel Functions](https://vercel.com/docs/functions/quickstart) — Build your first Vercel Function in a few steps.
- [Advanced Node.js Usage](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration) — Learn about advanced configurations for Vercel functions on Vercel.
- [Deploying with BYOC Using the Vercel CLI](https://vercel.com/docs/networking/bring-your-own-cloud/deploy-with-cli) — Build a project, provision its functions in your AWS account, and complete a Bring Your Own Cloud \\(BYOC\\) deployment wi

Full cross-link map for this page: [/docs/functions/troubleshooting.graph.md](/docs/functions/troubleshooting.graph.md)
<!-- /docsgraph:related -->

| Symptom                                                                    | Where to look                                                              |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| The function responds slowly or times out                                  | [Debugging slow Vercel Functions](/docs/functions/debug-slow-functions)    |
| The function exceeds a size, memory, or duration limit                     | [Vercel Functions limits](/docs/functions/limitations)                     |
| The response is a Vercel error code, such as `FUNCTION_INVOCATION_FAILED`  | [Error codes](/docs/errors)                                                |
| Production returns errors and you don't know which function is responsible | [Debugging production errors](/docs/observability/debug-production-errors) |

## ECONNRESET errors

`ECONNRESET` means "connection reset by peer". Your function opened a connection to another server, such as an API or a database, and that server or a device on the network path closed the connection before the request finished. The cause is usually the external service or how the function connects to it.

With `fetch` in the Node.js runtime, the error appears in your [runtime logs](/docs/logs/runtime) as `TypeError: fetch failed`, and the `cause` property of the error has the code `ECONNRESET`.

### Common causes

How often the error occurs narrows down the cause:

- **Every request fails:** The connection is misconfigured. Check the protocol, hostname, and port, and whether the service only accepts traffic from IP addresses on an allowlist.
- **Some requests fail:** The service closed connections under load, during maintenance, or during a deployment on its side. Compare the timestamps of the errors with the service's logs and status page.

Other causes include:

- **Timeouts and rate limits on the service:** The service closes connections that stay open too long or that exceed its request limits.
- **TLS or protocol mismatches:** The service expects a different TLS version or protocol than the client uses.
- **IP allowlists:** Vercel Functions send requests from dynamic IP addresses by default, so a service that only allows specific addresses resets the connection. To send requests from fixed IP addresses that the service can allow, use [Static IPs](/docs/networking/static-ips), which come from a pool shared with other customers, or [Secure Compute](/docs/networking/secure-compute), which gives you dedicated IP addresses.
- **Distance from the service:** A function that runs far from the service has longer network paths and more chances for a connection to drop. Set the [function region](/docs/functions/configuring-functions/region) close to your data source.

### Diagnose the error

1. Ask the service's provider, or check its logs, to find out whether the request arrived. If it did, the service or a proxy in front of it closed the connection.

2. Find the failing requests in your [runtime logs](/docs/logs/runtime) and note the time, route, and function region of each one. With [Vercel CLI](/docs/cli/logs), you can search for the error:

   ```bash filename="terminal"
   vercel logs --environment production --query "ECONNRESET" --since 1h
   ```

3. If the logs don't show the cause, log network activity for each request. Add the `NODE_DEBUG` [environment variable](/docs/environment-variables) to the **Preview** environment, redeploy, and reproduce the error on the preview deployment. Use the value `fetch,net` for requests made with `fetch`, or `http,https,net` for requests made with the `node:http` and `node:https` modules. Remove the variable when you finish.

4. Check whether the errors start at a certain number of parallel requests. If they do, lower the number of requests the function sends at once.

> **💡 Note:** `NODE_DEBUG` output can include request headers, such as authorization
> tokens and cookies. Avoid setting it in production, and redact credentials
> before you share these logs.

### Handle connection resets in your code

A reset can still happen when everything is configured correctly, so set a timeout on outgoing requests and retry the ones that fail. This helper retries a request up to three times and waits longer before each attempt. If you pass your own `signal`, the helper cancels the request and stops retrying when that signal aborts:

```ts filename="lib/fetch-with-retry.ts"
export async function fetchWithRetry(
  url: string,
  init?: RequestInit,
  { retries = 3, timeoutMs = 5000 } = {},
): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    const timeout = AbortSignal.timeout(timeoutMs);
    const signal = init?.signal
      ? AbortSignal.any([init.signal, timeout])
      : timeout;

    try {
      return await fetch(url, { ...init, signal });
    } catch (error) {
      const code = (error as { cause?: { code?: string } }).cause?.code;
      const retryable = code === 'ECONNRESET' || timeout.aborted;

      if (init?.signal?.aborted || !retryable || attempt >= retries) {
        throw error;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, Math.min(100 * 2 ** attempt, 2000)),
      );
    }
  }
}
```

> **💡 Note:** Only retry requests that are safe to repeat. A reset can arrive after the
> service has processed the request, so retrying a request that creates or
> charges for something can run it twice.

### Contact Vercel Support

If the provider confirms that it received the request and responded, but your function still logs `ECONNRESET`, [open a support case](/docs/support-center). Include the following:

- The deployment URL and the route of the function
- The time of the error in UTC and the function region
- The function's runtime and version
- The runtime logs for the failed request, with credentials redacted
- Any details the provider has about the request, such as its own request ID or logs

## Function works locally but fails when deployed

A function that runs on your machine can fail on Vercel because the deployed environment is different. A deployed function runs on Linux, has a read-only filesystem, contains only the files that Vercel bundled with it, and reads its environment variables from your project settings. Find the difference that matches your symptom:

| Symptom | Likely cause | Where to look |
| --- | --- | --- |
| The build fails while installing a package, or the function can't load it | The package compiles native code | [Native dependencies](#native-dependencies) |
| `ENOENT: no such file or directory` or `EROFS: read-only file system` | The file isn't in the function's bundle, or the code writes to disk | [Files and the filesystem](#files-and-the-filesystem) |
| A value from `process.env` is `undefined` | The variable isn't set for the deployment's environment | [Environment variables](#environment-variables) |
| The behavior differs and there is no clear error | The cause needs more information | [Compare runtime logs](#compare-runtime-logs) |

### Native dependencies

Some npm packages compile native code when you install them, usually through [node-gyp](https://github.com/nodejs/node-gyp). The compiled binary only works on the operating system and CPU architecture that built it, and the build needs a compiler and system libraries. A package such as [`bcrypt`](https://www.npmjs.com/package/bcrypt) can install on your machine and then fail on Vercel, where the build and the function run on Linux.

To fix a native dependency:

- **Replace the package**: Use an alternative written in JavaScript. For example, [`bcryptjs`](https://www.npmjs.com/package/bcryptjs) implements bcrypt without native code.
- **Install the missing system packages**: If the package fails to compile during the build, [install the packages it needs](/docs/builds/build-image#installing-additional-packages) in the build image before your dependencies install.
- **Build on Linux**: If you deploy with [`vercel deploy --prebuilt`](/docs/cli/deploying-from-cli#deploying-from-local-build-prebuilt), run `vercel build` on a Linux machine with an x64 CPU. A binary compiled on macOS or Windows doesn't run in the deployed function.

### Files and the filesystem

Your machine has a persistent filesystem that your code can write to. A Vercel Function has a read-only filesystem, apart from temporary space in `/tmp` that isn't shared between function instances and doesn't persist. See [file system support](/docs/functions/runtimes#file-system-support).

- **Writing files**: Write temporary files to `/tmp`. To keep data between requests, use a [storage product](/docs/storage).
- **Reading files**: A function can only read files that are in its bundle. If the function reads a file with a path that it computes at runtime, [add the file to the bundle explicitly](/docs/functions/runtimes#reading-files-in-a-function).

### Environment variables

Variables that you define in a local `.env` file or in your shell don't exist in a deployment. Add each variable that your function reads to the project's [environment variables](/docs/environment-variables), and select every environment that needs it, such as **Production** and **Preview**. Changes apply to new deployments, so redeploy after you add or change a variable.

To check a deployment against your local setup, run [`vercel env pull`](/docs/cli/env) to download the project's Development variables into a local file, then compare the names with the ones your code reads. For other causes, see [Troubleshooting environment variables](/docs/environment-variables#troubleshooting-environment-variables).

### Compare runtime logs

When the cause isn't clear, log the inputs and results at the steps where the function could fail, deploy, and reproduce the problem. Then compare the deployed function's [runtime logs](/docs/logs/runtime) with your local output. With [Vercel CLI](/docs/cli/logs), you can filter to errors:

```bash filename="terminal"
vercel logs runtime --environment production --query 'level:error' --since 1h
```

To keep logs for longer than your plan's [retention period](/docs/logs/runtime#limits), send them to an external service with [Drains](/docs/drains).

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
