---
title: Functions API Reference
product: vercel
url: /docs/functions/functions-api-reference
canonical_url: "https://vercel.com/docs/functions/functions-api-reference"
last_updated: 2026-08-03
type: reference
prerequisites:
  - /docs/functions
related:
  - /docs/functions/functions-api-reference/vercel-functions-package
  - /docs/project-configuration/vercel-json
  - /docs/functions/configuring-functions
  - /docs/functions/configuring-functions/runtime
  - /docs/functions/configuring-functions/region
summary: Learn about available APIs when working with Vercel Functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/functions-api-reference.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1f251fa1b01a19bf9ccc084c5960045755e004dc396305d711ea77ef33a1bdad"
---

# Functions API Reference

> For \["nextjs-app"]:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Stopping Streams](https://ai-sdk.dev/docs/advanced/stopping-streams?from=related)
- [Vercel Deployment Guide](https://ai-sdk.dev/docs/advanced/vercel-deployment-guide?from=related)
- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions?from=related) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [How can I use geolocation IP headers?](https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions?from=related) — Learn how to read geolocation headers on Vercel with Next.js or any frontend framework.
- [Hosting your API on Vercel](https://vercel.com/kb/guide/hosting-backend-apis?from=related) — Learn how to build and scale performant APIs on Vercel.
- [Node.js](https://vercel.com/docs/functions/runtimes/node-js?from=related) — Learn how to use the Node.js runtime to create functions and deploy Node.js servers on Vercel.
- [AWS](https://vercel.com/docs/oidc/aws?from=related) — Learn how to configure your AWS account to trust Vercel's OpenID Connect \(OIDC\) Identity Provider \(IdP\).
- [Advanced Configuration](https://vercel.com/docs/functions/configuring-functions/advanced-configuration?from=related) — Learn how to add utility files to the /api directory, and bundle Vercel Functions.
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.
- [API](https://vercel.com/docs/routing-middleware/api?from=related) — Learn how you can use Routing Middleware, code that executes before a request is processed on a site, to provide speed a

Full cross-link map for this page: [/docs/functions/functions-api-reference.graph.md](/docs/functions/functions-api-reference.graph.md)
<!-- /docsgraph:related -->

Functions are defined similar to a [Route Handler](https://nextjs.org/docs/app/api-reference/file-conventions/route) in Next.js. When using Next.js App Router, you can define a function in a file under  in your project. Vercel will deploy any file under `app/api/` as a function.

> For \["nextjs"]:

While you can define a function with a traditional [Next.js API Route](https://nextjs.org/docs/pages/building-your-application/routing/api-routes), they do not support streaming responses. To stream responses in Next.js, you must use [Route Handlers in the App Router](https://nextjs.org/docs/app/api-reference/file-conventions/route "Route Handlers"), even if the rest of your app uses the Pages Router. This will not alter the behavior of your application.

You can create an `app` directory at the same level as your `pages` directory.
Then, define your function in .

> For \["other"]:

You can create a function in other frameworks or with no frameworks by defining your function in a file under `/api` in your project. Vercel will deploy any file in the `/api` directory as a function.

## Function signature

Vercel Functions use a Web Handler, which consists of the `request` parameter that is an instance of the web standard [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) API. Next.js [extends](https://nextjs.org/docs/app/api-reference/functions/next-request) the standard `Request` object with additional properties and methods.

| Parameter | Description                                                                                                                           | Next.js                                                                        | Other Frameworks                                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `request` | An instance of the `Request` object                                                                                                   | [`NextRequest`](https://nextjs.org/docs/app/api-reference/file-conventions/proxy#nextrequest) | [`Request`](https://developer.mozilla.org/docs/Web/API/Request)                               |
| `context` |  Deprecated, use [`@vercel/functions`](/docs/functions/functions-api-reference/vercel-functions-package#waituntil) instead | N/A                                                                            | [`{ waitUntil }`](/docs/functions/functions-api-reference/vercel-functions-package#waituntil) |

> For \['nextjs']:

```ts v0="build" filename="app/api/hello/route.ts" framework=nextjs
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

```js v0="build" filename="app/api/hello/route.js" framework=nextjs
export function GET(request) {
  return new Response('Hello from Vercel!');
}
```

```ts filename="api/hello.ts" framework=other
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

```js filename="api/hello.js" framework=other
export function GET(request) {
  return new Response('Hello from Vercel!');
}
```

```ts v0="build" filename="app/api/hello/route.ts" framework=nextjs-app
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

```js v0="build" filename="app/api/hello/route.js" framework=nextjs-app
export function GET(request) {
  return new Response('Hello from Vercel!');
}
```

> For \["nextjs"]:

The above shows how you can use a [Route Handlers in the App Router](https://nextjs.org/docs/app/api-reference/file-conventions/route "Route Handlers") in your Pages app and is advantageous because it allows you to use a common signature, web standards, and stream responses.

> For \["other"]:

### `fetch` Web Standard

Vercel Functions also support the `fetch` Web Standard export, used by many frameworks like [Hono](https://hono.dev), [ElysiaJS](https://elysiajs.com), [H3](https://h3.dev), and various JavaScript runtimes to enhance interoperability with zero-config. It uses the Web Handlers syntax and allows you to handle all HTTP methods inside a single function.

```ts filename="api/hello.ts" framework=all
export default {
  fetch(request: Request) {
    return new Response('Hello from Vercel!');
  },
};
```

```js filename="api/hello.js" framework=all
export default {
  fetch(request) {
    return new Response('Hello from Vercel!');
  },
};
```

### Cancel requests

> **💡 Note:** This feature is only available in the Node.js runtime.

Cancelling requests lets you clean up resources or stop long-running tasks when the client disconnects, such as when a user stops an AI chat response or closes a browser tab.

#### How it works

When cancellation is enabled, Vercel notifies your function through the standard [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) on `request.signal`. When the client disconnects, the signal fires and the function is terminated.

This differs from a standalone Node.js server, where your process continues running after a client disconnects. In a serverless environment, the execution context can be reclaimed at any time after cancellation. If you have work that **must** complete (such as flushing logs, writing to a database, or updating a cache), wrap it in [`waitUntil`](/docs/functions/functions-api-reference/vercel-functions-package#waituntil) or [`after`](https://nextjs.org/docs/app/api-reference/functions/after).

#### Enable cancellation

Cancellation is opt-in. In your `vercel.json`, add `"supportsCancellation": true` to the [specific paths](/docs/project-configuration/vercel-json#key-definition) you want to enable it for:

```json filename="vercel.json" {5}
{
  "regions": ["iad1"],
  "functions": {
    "api/*": {
      "supportsCancellation": true
    }
  }
}
```

Termination on disconnect applies to every function matching the glob, whether or not your code listens for the abort signal. Any work not wrapped in `waitUntil` or `after` will be lost on cancellation. This is why cancellation is opt-in. Enabling it means your functions can be terminated early, so you should only enable it for functions that are prepared to handle that.

#### Use the abort signal

The `request.signal` is a standard `AbortSignal`. You can pass it directly to any API that accepts one, such as `fetch`:

```ts filename="api/proxy/route.ts" {4}
export async function GET(request: Request) {
  const response = await fetch('https://my-backend-service.example.com', {
    headers: { Authorization: `Bearer ${process.env.AUTH_TOKEN}` },
    signal: request.signal,
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
```

If you need to perform custom cleanup on abort or coordinate cancellation across multiple operations, you can create your own `AbortController` and wire it to `request.signal`:

```ts filename="api/abort-controller/route.ts" {2, 4-7, 13}
export async function GET(request: Request) {
  const abortController = new AbortController();

  request.signal.addEventListener('abort', () => {
    console.log('request aborted');
    abortController.abort();
  });

  const response = await fetch('https://my-backend-service.example.com', {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
    },
    signal: abortController.signal,
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
```

To run cleanup work after the client disconnects, combine `waitUntil` with a deferred promise. This keeps the execution context alive until your cleanup finishes. In this example, `abortPendingTask` only runs when the client disconnects. On normal completion, the `pipeTo` promise resolves `cleanup` once all response bytes have been sent:

```ts filename="api/cancel-with-cleanup/route.ts" {1, 4-5, 7-10, 17-18}
import { waitUntil } from '@vercel/functions';

export async function GET(request: Request) {
  const cleanup = Promise.withResolvers<void>();
  waitUntil(cleanup.promise);

  request.signal.addEventListener('abort', () => {
    console.log('request aborted, cancelling pending task');
    abortPendingTask().finally(cleanup.resolve);
  });

  const response = await fetch('https://my-backend-service.example.com', {
    headers: { Authorization: `Bearer ${process.env.AUTH_TOKEN}` },
    signal: request.signal,
  });

  const { readable, writable } = new TransformStream();
  response.body.pipeTo(writable).finally(() => {
    if (!request.signal.aborted) cleanup.resolve();
  });

  return new Response(readable, {
    status: response.status,
    headers: response.headers,
  });
}

async function abortPendingTask() {
  await fetch('https://my-backend-service.example.com/cancel', {
    method: 'POST',
  });
}
```

> For \["nextjs", "other"]:

## `config` object

### `config` properties

The table below shows a highlight of the valid config options. For detailed information on all the config options, see the [Configuring Functions](/docs/functions/configuring-functions) docs.

| Property                                                        | Type     | Description                                                                                                                                                                                                                          |
| --------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`runtime`](/docs/functions/configuring-functions/runtime)      | `string` | This optional property defines the runtime to use, and if not set the runtime will default to `nodejs`. Starting in Next.js 16.3, setting `runtime` to `edge` is no longer supported.                                                |
| [`regions`](/docs/functions/configuring-functions/region)       | `string` | This optional property can be used to specify the [region](/docs/regions#region-list) in which your function should execute.                                                                                                         |
| [`maxDuration`](/docs/functions/configuring-functions/duration) | `int`    | This optional property can be used to specify the maximum duration in seconds that your function can run for.                                                                                                                        |

> For \["nextjs-app"]:

## Route segment config

To configure your function when using the App Router in Next.js, you use [segment options](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config), rather than a `config` object.

```ts filename="app/api/example/route.ts" framework=all
export const runtime = 'nodejs';
export const maxDuration = 15;
```

```js filename="app/api/example/route.ts" framework=all
export const maxDuration = 15;
```

The table below shows a highlight of the valid config options. For detailed information on all the config options, see the [Configuring Functions](/docs/functions/configuring-functions) docs.

| Property                                                          | Type     | Description                                                                                                                                                                                                                            |
| ----------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`runtime`](/docs/functions/configuring-functions/runtime)        | `string` | This optional property defines the runtime to use, and if not set the runtime will default to `nodejs`. Starting in Next.js 16.3, setting `runtime` to `edge` is no longer supported.                                                  |
| [`preferredRegion`](/docs/functions/configuring-functions/region) | `string` | This optional property can be used to specify the [regions](/docs/regions#region-list) in which your function should execute.                                                                                                          |
| [`maxDuration`](/docs/functions/configuring-functions/duration)   | `int`    | This optional property can be used to specify the maximum duration in seconds that your function can run for.                                                                                                                          |

## `SIGTERM` signal

> **💡 Note:** This feature is supported on the Node.js, Bun, Rust, and Python runtimes, and container images.

A `SIGTERM` signal is sent to a function when it is about to be terminated, such as during scale-down events. This allows you to perform any necessary cleanup operations before the function instance is terminated.

Your code can run for up to 500 milliseconds (30 seconds for container images) after receiving a `SIGTERM` signal. After this period, the function instance will be terminated immediately.

```ts filename="api/hello.ts" framework=all
process.on('SIGTERM', () => {
  // Perform cleanup operations here
});
```

```js filename="api/hello.js" framework=all
process.on('SIGTERM', () => {
  // Perform cleanup operations here
});
```

## The `@vercel/functions` package

The `@vercel/functions` package provides a set of helper methods and utilities for working with Vercel Functions.

### Helper methods

- [**`waitUntil()`**](/docs/functions/functions-api-reference/vercel-functions-package#waituntil): This method allows you to extend the lifetime of a request handler for the duration of a given Promise . It's useful for tasks that can be performed after the response is sent, such as logging or updating a cache.
- [**`getEnv`**](/docs/functions/functions-api-reference/vercel-functions-package#getenv): This function retrieves System Environment Variables exposed by Vercel.
- [**`getDeadline()`**](/docs/functions/functions-api-reference/vercel-functions-package#getdeadline): Returns the shared invocation deadline for the current function invocation as a `Date` object.
- [**`geolocation()`**](/docs/functions/functions-api-reference/vercel-functions-package#geolocation): Returns location information for the incoming request, including details like city, country, and coordinates.
- [**`ipAddress()`**](/docs/functions/functions-api-reference/vercel-functions-package#ipaddress): Extracts the IP address of the request from the headers.
- [**`invalidateByTag()`**](/docs/functions/functions-api-reference/vercel-functions-package#invalidatebytag): Marks a cache tag as stale, causing cache entries associated with that tag to be revalidated in the background on the next request.
- [**`dangerouslyDeleteByTag()`**](/docs/functions/functions-api-reference/vercel-functions-package#dangerouslydeletebytag): Marks a cache tag as deleted, causing cache entries associated with that tag to be revalidated in the foreground on the next request.
- [**`invalidateBySrcImage()`**](/docs/functions/functions-api-reference/vercel-functions-package#invalidatebysrcimage): Marks all cached content associated with a source image as stale, causing those cache entries to be revalidated in the background on the next request. This invalidates all cached transformations of the source image.
- [**`dangerouslyDeleteBySrcImage()`**](/docs/functions/functions-api-reference/vercel-functions-package#dangerouslydeletebysrcimage): Marks all cached content associated with a source image as deleted, causing those cache entries to be revalidated in the foreground on the next request. Use this method with caution because deleting the cache can cause many concurrent requests to the origin leading to [cache stampede problem](https://en.wikipedia.org/wiki/Cache_stampede).
- [**`getCache()`**](/docs/functions/functions-api-reference/vercel-functions-package#getcache): Obtain a [`RuntimeCache`](/docs/functions/functions-api-reference/vercel-functions-package#getcache) object to interact with the [Vercel Runtime Cache](/docs/caching/runtime-cache).

See the [`@vercel/functions`](/docs/functions/functions-api-reference/vercel-functions-package) documentation for more information.

## The `@vercel/oidc` package

> **💡 Note:** The `@vercel/oidc` package was previously provided by
> `@vercel/functions/oidc`.

The `@vercel/oidc` package provides helper methods and utilities for working with OpenID Connect (OIDC) tokens.

### OIDC Helper methods

- [**`getVercelOidcToken()`**](/docs/functions/functions-api-reference/vercel-functions-package#getverceloidctoken): Retrieves the OIDC token from the request context or environment variable.

See the [`@vercel/oidc`](/docs/functions/functions-api-reference/vercel-functions-package) documentation for more information.

## The `@vercel/oidc-aws-credentials-provider` package

> **💡 Note:** The `@vercel/oidc-aws-credentials-provider` package was previously provided by
> `@vercel/functions/oidc`.

The `@vercel/oidc-aws-credentials-provider` package provides helper methods and utilities for working with OpenID Connect (OIDC) tokens and AWS credentials.

### AWS Helper methods

- [**`awsCredentialsProvider()`**](/docs/functions/functions-api-reference/vercel-functions-package#awscredentialsprovider): This function helps in obtaining AWS credentials using Vercel's OIDC token.

See the [`@vercel/oidc-aws-credentials-provider`](/docs/functions/functions-api-reference/vercel-functions-package) documentation for more information.

## More resources

- [Streaming Data: Learn about streaming on Vercel](/kb/guide/what-is-streaming)
- [Python API Reference: Learn about available APIs when working with Vercel Functions in Python](/docs/functions/functions-api-reference/vercel-sdk-python)


---

[View full sitemap](/docs/sitemap)
