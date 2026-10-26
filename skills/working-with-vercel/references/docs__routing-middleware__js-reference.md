---
title: "Routing Middleware: JS Reference"
product: vercel
url: /docs/routing-middleware/js-reference
canonical_url: "https://vercel.com/docs/routing-middleware/js-reference"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/routing-middleware
related:
  - /docs/routing-middleware
  - /docs/project-configuration/vercel-json
  - /docs/functions/runtimes/node-js
  - /docs/functions/functions-api-reference
  - /docs/functions/functions-api-reference/vercel-functions-package
summary: Reference for writing Routing Middleware in TypeScript and JavaScript, including entrypoints, the config object, the middleware signature, and helper...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing-middleware/js-reference.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "1b4ba16d92708dd33b47332349a2d64ba2aebcf2adf02fb1c616274d33821b50"
---

# Routing Middleware: JS Reference

Use this reference to write [Routing Middleware](/docs/routing-middleware) in TypeScript or JavaScript. For path matching and limits, see the [Routing Middleware overview](/docs/routing-middleware).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use Next.js as a backend for your frontend](https://nextjs.org/docs/app/guides/backend-for-frontend) — Learn how to use Next.js as a backend framework
- [How to enable CORS on Vercel](https://vercel.com/kb/guide/how-to-enable-cors) — Learn how to enable CORS on Vercel with vercel.json, Routing Middleware, framework config, and route handlers, plus how
- [route.js](https://nextjs.org/docs/app/api-reference/file-conventions/route) — API reference for the route.js special file.
- [How can I use geolocation IP headers?](https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions) — Learn how to read geolocation headers on Vercel with Next.js or any frontend framework.
- [Proxy](https://nextjs.org/docs/pages/api-reference/file-conventions/proxy) — Learn how to use Proxy to run code before a request is completed.
- [Getting Started with Routing Middleware](https://vercel.com/docs/routing-middleware/getting-started) — Learn how you can use Routing Middleware, code that executes before a request is processed on a site, to provide speed a
- [React Router on Vercel](https://vercel.com/docs/frameworks/frontend/react-router) — Deploy React Router applications with SSR or SPA mode, then configure the Vercel preset, streaming, caching, and analyti
- [Programmatic Configuration with vercel.ts](https://vercel.com/docs/project-configuration/vercel-ts) — Define your Vercel configuration in vercel.ts with @vercel/config for type-safe routing and build settings.
- [Getting started with Vercel Functions](https://vercel.com/docs/functions/quickstart) — Build your first Vercel Function in a few steps.
- [Astro on Vercel](https://vercel.com/docs/frameworks/frontend/astro) — Deploy Astro sites to Vercel and configure server-side rendering, ISR, Web Analytics, Image Optimization, and Routing Mi

Full cross-link map for this page: [/docs/routing-middleware/js-reference.graph.md](/docs/routing-middleware/js-reference.graph.md)
<!-- /docsgraph:related -->

## Routing Middleware file location and name

You can tell Vercel where your Routing Middleware is in two ways.

### Using the `proxy` property

Set [`proxy.entrypoint`](/docs/project-configuration/vercel-json#proxy) in `vercel.json` to a `.ts` or `.js` file, such as `proxy.ts` or `src/proxy.ts`:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "proxy": {
    "entrypoint": "proxy.ts"
  }
}
```

### Using the file convention

Name the file `middleware.ts` and place it at the root of your project, at the same level as your `package.json` file. The default runtime is [Node.js](/docs/functions/runtimes/node-js). See [Specify runtime](#specify-runtime).

> For \['nextjs', 'nextjs-app']:

In Next.js, place the `proxy.ts` file at the same level as your `app` or `pages` directory, even if you use a `src` directory.

### Default export

The Routing Middleware must be a default export, with the function being named anything you like. For example, you can name it `router`, `middleware`, or any other name that makes sense for your application.

```ts filename="proxy.ts"
export default function proxy(request: Request) {
  return new Response('Hello from your Middleware!');
}
```

```js filename="proxy.js"
export default function proxy(request) {
  return new Response('Hello from your Middleware!');
}
```

## `config` object

Routing Middleware will be invoked for **every route in your project**. If you only want it to be run on specific paths, you can define those either with a [custom matcher config](#match-paths-based-on-custom-matcher-config) or with [conditional statements](#match-paths-based-on-conditional-statements).

You can also use the [`runtime` option](#config-properties) to [specify which runtime](#specify-runtime) you would like to use. The default is `nodejs`.

While the `config` option is the preferred method, **as it does not get invoked on every request**, you can also use conditional statements to only run the Routing Middleware when it matches specific paths.

### Match paths based on custom matcher config

Export a `config` object with a `matcher` property to choose which paths run your Routing Middleware. The matcher accepts a single path or an array of paths:

```ts filename="middleware.ts"
export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
};
```

If you configure your entrypoint with [`proxy`](/docs/project-configuration/vercel-json#proxy), set the matcher here or in `proxy.matcher`. See [path matching](/docs/routing-middleware#path-matching) for the matcher syntax, including regex support.

> For \['nextjs']:

> **💡 Note:** Routing Middleware run on **all** `/_next/data/` requests for
> `getServerSideProps` and `getStaticProps` pages for the sake of consistency.
> For more information see the [Next.js matcher
> docs](https://nextjs.org/docs/advanced-features/middleware#matcher).

### Match paths based on conditional statements

```ts filename="middleware.ts"
import { rewrite } from '@vercel/functions';

export default function middleware(request: Request) {
  const url = new URL(request.url);

  if (url.pathname.startsWith('/about')) {
    return rewrite(new URL('/about-2', request.url));
  }

  if (url.pathname.startsWith('/dashboard')) {
    return rewrite(new URL('/dashboard/user', request.url));
  }
}
```

See the [helper methods](#routing-middleware-helper-methods) below for more information on using the `@vercel/functions` package.

### Specify runtime

To set the runtime explicitly, update the `runtime` option as follows:

```ts filename="middleware.ts"
export const config = {
  runtime: 'nodejs',
};
```

To use the Bun runtime with Routing Middleware, set the [`bunVersion`](/docs/project-configuration/vercel-json#bunversion) property in your `vercel.json` file as well as using the `runtime` config shown above to `nodejs`:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "bunVersion": "1.4.x"
}
```

### `config` properties

| Property  | Type                          | Description                                                                        |
| --------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| `matcher` | `string / string[]`           | A string or array of strings that define the paths the Middleware should be run on |
| `runtime` | `string` (`nodejs`)           | A string that defines the Middleware runtime and defaults to `nodejs`              |

## Routing Middleware signature

The Routing Middleware signature is made up of two parameters: `request` and `context`. The `request` parameter is an instance of the [Request](/docs/functions/functions-api-reference#request) object, and the `context` parameter is an object containing the [`waitUntil`](/docs/functions/functions-api-reference#waituntil) method. **Both parameters are optional**.

| Parameter | Description                                                                                         | Next.js (/app) or (/pages)                                                                                                                        | Other Frameworks                                                                     |
| --------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `request` | An instance of the [Request](/docs/functions/functions-api-reference#request) object      | [`Request`](https://developer.mozilla.org/docs/Web/API/Request) or [`NextRequest`](https://nextjs.org/docs/app/api-reference/file-conventions/proxy#nextrequest) | [`Request`](https://developer.mozilla.org/docs/Web/API/Request)                      |
| `context` | An extension to the standard [`Request`](https://developer.mozilla.org/docs/Web/API/Request) object | [`NextFetchEvent`](https://nextjs.org/docs/app/api-reference/file-conventions/proxy#nextfetchevent)                                                              | [`RequestContext`](/docs/functions/functions-api-reference#requestcontext) |

Routing Middleware comes with built in helpers that are based on the native [`FetchEvent`](https://developer.mozilla.org/docs/Web/API/FetchEvent), [`Response`](https://developer.mozilla.org/docs/Web/API/Response), and [`Request`](https://developer.mozilla.org/docs/Web/API/Request) objects.

[See the section on Routing Middleware helpers for more information](#routing-middleware-helper-methods).

```ts filename="middleware.ts" framework=nextjs-app
// config with custom matcher
export const config = {
  matcher: '/about/:path*',
};

export default function middleware(request: Request) {
  return Response.redirect(new URL('/about-2', request.url));
}
```

```js filename="middleware.js" framework=nextjs-app
// config with custom matcher
export const config = {
  matcher: '/about/:path*',
};

export default function middleware(request) {
  return Response.redirect(new URL('/about-2', request.url));
}
```

```ts filename="middleware.ts" framework=nextjs
// config with custom matcher
export const config = {
  matcher: '/about/:path*',
};

export default function middleware(request: Request) {
  return Response.redirect(new URL('/about-2', request.url));
}
```

```js filename="middleware.js" framework=nextjs
// config with custom matcher
export const config = {
  matcher: '/about/:path*',
};

export default function middleware(request) {
  return Response.redirect(new URL('/about-2', request.url));
}
```

```ts filename="middleware.ts" framework=other
// config with custom matcher
export const config = {
  matcher: '/about/:path*',
};

export default function middleware(request: Request) {
  return Response.redirect(new URL('/about-2', request.url));
}
```

```js filename="middleware.js" framework=other
// config with custom matcher
export const config = {
  matcher: '/about/:path*',
};

export default function middleware(request) {
  return Response.redirect(new URL('/about-2', request.url));
}
```

> **💡 Note:** If you're not using a framework, you must either add
> `"type": "module"` to your
> `package.json` or change your JavaScript Functions'
> file extensions from `.js` to
> `.mjs`

### Request

The `Request` object represents an HTTP request. It is a wrapper around the [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API) `Request` object. **When using TypeScript, you do not need to import the `Request` object, as it is already available in the global scope**.

#### Request properties

| Property         | Type                                                                          | Description                                         |
| ---------------- | ----------------------------------------------------------------------------- | --------------------------------------------------- |
| `url`            | `string`                                                                      | The URL of the request                              |
| `method`         | `string`                                                                      | The HTTP method of the request                      |
| `headers`        | `Headers`                                                                     | The headers of the request                          |
| `body`           | [`ReadableStream`](https://developer.mozilla.org/docs/Web/API/ReadableStream) | The body of the request                             |
| `bodyUsed`       | `boolean`                                                                     | Whether the body has been read                      |
| `cache`          | `string`                                                                      | The cache mode of the request                       |
| `credentials`    | `string`                                                                      | The credentials mode of the request                 |
| `destination`    | `string`                                                                      | The destination of the request                      |
| `integrity`      | `string`                                                                      | The integrity of the request                        |
| `redirect`       | `string`                                                                      | The redirect mode of the request                    |
| `referrer`       | `string`                                                                      | The referrer of the request                         |
| `referrerPolicy` | `string`                                                                      | The referrer policy of the request                  |
| `mode`           | `string`                                                                      | The mode of the request                             |
| `signal`         | [`AbortSignal`](https://developer.mozilla.org/docs/Web/API/AbortSignal)       | The signal of the request                           |
| `arrayBuffer`    | `function`                                                                    | Returns a promise that resolves with an ArrayBuffer |
| `blob`           | `function`                                                                    | Returns a promise that resolves with a Blob         |
| `formData`       | `function`                                                                    | Returns a promise that resolves with a FormData     |
| `json`           | `function`                                                                    | Returns a promise that resolves with a JSON object  |
| `text`           | `function`                                                                    | Returns a promise that resolves with a string       |
| `clone`          | `function`                                                                    | Returns a clone of the request                      |

> For \["nextjs", "nextjs-app"]:

To learn more about the [`NextRequest`](https://nextjs.org/docs/app/api-reference/file-conventions/proxy#nextrequest) object and its properties, visit the [Next.js documentation](https://nextjs.org/docs/app/api-reference/file-conventions/proxy#nextrequest).

### `waitUntil()`

The `waitUntil()` method is from the [`ExtendableEvent`](https://developer.mozilla.org/docs/Web/API/ExtendableEvent/waitUntil) interface. It accepts a [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) as an argument, which will keep the function running until the `Promise` resolves.

It can be used to keep the function running after a response has been sent. This is useful when you have an async task that you want to keep running after returning a response.

The example below will:

- Send a response immediately
- Keep the function running for ten seconds
- Fetch a product and log it to the console

> For \["other"]:

> **💡 Note:** `Response.json()` is a new addition to the `Response` object and has not yet
> been added by the TypeScript team. This means that you will likely see a red
> error line under `Response.json()` in your editor. You can ignore this error,
> as it is a false positive.

```ts filename="middleware.ts" framework=nextjs
import type { NextFetchEvent } from 'next/server';

export const config = {
  matcher: '/',
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getProduct() {
  const res = await fetch('https://api.vercel.app/products/1');
  await wait(10000);
  return res.json();
}

export default function middleware(request: Request, context: NextFetchEvent) {
  context.waitUntil(getProduct().then((json) => console.log({ json })));

  return new Response(JSON.stringify({ hello: 'world' }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}
```

```js filename="middleware.js" framework=nextjs
export const config = {
  matcher: '/',
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getProduct() {
  const res = await fetch('https://api.vercel.app/products/1');
  await wait(10000);
  return res.json();
}

export default function middleware(request, context) {
  context.waitUntil(getProduct().then((json) => console.log({ json })));

  return new Response(JSON.stringify({ hello: 'world' }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}
```

```ts filename="middleware.ts" framework=nextjs-app
import type { NextFetchEvent } from 'next/server';

export const config = {
  matcher: '/',
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getProduct() {
  const res = await fetch('https://api.vercel.app/products/1');
  await wait(10000);
  return res.json();
}

export default function middleware(request: Request, context: NextFetchEvent) {
  context.waitUntil(getProduct().then((json) => console.log({ json })));

  return new Response(JSON.stringify({ hello: 'world' }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}
```

```js filename="middleware.js" framework=nextjs-app
import { NextResponse } from 'next/server';

export const config = {
  matcher: '/',
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getAlbum() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums/1');
  await wait(10000);
  return res.json();
}

export default function middleware(request, context) {
  context.waitUntil(getAlbum().then((json) => console.log({ json })));

  return new NextResponse(JSON.stringify({ hello: 'world' }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}
```

```ts filename="middleware.ts" framework=other
import type { RequestContext } from '@vercel/functions';

export const config = {
  matcher: '/',
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getProduct() {
  const res = await fetch('https://api.vercel.app/products/1');
  await wait(10000);
  return res.json();
}

export default function middleware(request: Request, context: RequestContext) {
  context.waitUntil(getProduct().then((json) => console.log({ json })));

  return Response.json(
    { hello: 'world' },
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    },
  );
}
```

```js filename="middleware.js" framework=other
export const config = {
  matcher: '/',
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getProduct() {
  const res = await fetch('https://api.vercel.app/products/1');
  await wait(10000);
  return res.json();
}

export default function middleware(request, context) {
  context.waitUntil(getProduct().then((json) => console.log({ json })));

  return Response.json(
    { hello: 'world' },
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    },
  );
}
```

> **💡 Note:** If you're not using a framework, you must either add
> `"type": "module"` to your
> `package.json` or change your JavaScript Functions'
> file extensions from `.js` to
> `.mjs`

#### Context properties

| Property                                                                            | Type                                | Description                                                                                |
| ----------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------ |
| [`waitUntil`](https://developer.mozilla.org/docs/Web/API/ExtendableEvent/waitUntil) | `(promise: Promise<unknown>): void` | Prolongs the execution of the function until the promise passed to `waitUntil` is resolved |

## Routing Middleware helper methods

You can use Vercel-specific helper methods to access a request's [geolocation](/docs/routing-middleware#geolocation-headers), [IP address](/docs/functions/functions-api-reference/vercel-functions-package#ipaddress), and more when deploying Middleware on Vercel.

> For \['nextjs', 'nextjs-app']:

You can access these helper methods with the `request` and `response` objects in your middleware handler method.

> **💡 Note:** These helpers are exclusive to Vercel, and will not work on other providers,
> even if your app is built with Next.js.

> For \['other']:

Add the `@vercel/functions` package to your project with:

**pnpm**

```bash
pnpm i @vercel/functions
```

**yarn**

```bash
yarn add @vercel/functions
```

**npm**

```bash
npm i @vercel/functions
```

**bun**

```bash
bun add @vercel/functions
```

To read a request's location, see [geolocation headers](/docs/routing-middleware#geolocation-headers).

### IP address

> For \['nextjs', 'nextjs-app']:

The `ip` object returns the IP address of the request from the headers, or `undefined`.

> For \['other']:

The `ipAddress()` helper returns the IP address of the request from the headers, or `undefined`.

```ts filename="middleware.ts" framework=all
import { ipAddress } from '@vercel/functions';
import { next } from '@vercel/functions';

export default function middleware(request: Request) {
  const ip = ipAddress(request);
  return next({
    headers: { 'x-your-ip-address': ip || 'unknown' },
  });
}
```

```js filename="middleware.js" framework=all
import { ipAddress } from '@vercel/functions';
import { next } from '@vercel/functions';

export default function middleware(request) {
  const ip = ipAddress(request);
  return next({
    headers: { 'x-your-ip-address': ip || 'unknown' },
  });
}
```

### `RequestContext`

The `RequestContext` is an extension of the standard `Request` object, which contains the [`waitUntil`](#waituntil) function. The following example works in middleware for all frameworks:

```ts filename="middleware.ts" framework=all
import type { RequestContext } from '@vercel/functions';

export default function handler(request: Request, context: RequestContext) {
  context.waitUntil(getAlbum().then((json) => console.log({ json })));

  return new Response(
    `Hello there, from ${request.url} I'm a Vercel Function!`,
  );
}

export const config = {
  matcher: '/',
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getAlbum() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums/1');
  await wait(10000);
  return res.json();
}
```

```js filename="middleware.js" framework=all
export default function handler(request, context) {
  context.waitUntil(getAlbum().then((json) => console.log({ json })));

  return new Response(
    `Hello there, from ${request.url} I'm a Vercel Function!`,
  );
}

export const config = {
  matcher: '/',
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getAlbum() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums/1');
  await wait(10000);
  return res.json();
}
```

### Rewrites

> For \['nextjs', 'nextjs-app']:

The `NextResponse.rewrite()` helper returns a response that rewrites the request to a different URL.

> For \['other']:

The `rewrite()` helper returns a response that rewrites the request to a different URL.

```ts filename="middleware.ts" framework=nextjs-app
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Trigger this middleware to run on the `/about` route
export const config = {
  matcher: '/about',
};

export default function middleware(request: NextRequest) {
  // Rewrite to URL
  return NextResponse.rewrite('/about-2');
}
```

```js filename="middleware.js" framework=nextjs-app
import { NextResponse } from 'next/server';
// Trigger this middleware to run on the `/about` route
export const config = {
  matcher: '/about',
};

export default function middleware(request) {
  // Rewrite to URL
  return NextResponse.rewrite('/about-2');
}
```

```ts filename="middleware.ts" framework=nextjs
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Trigger this middleware to run on the `/about` route
export const config = {
  matcher: '/about',
};

export default function middleware(request: NextRequest) {
  // Rewrite to URL
  return NextResponse.rewrite('/about-2');
}
```

```js filename="middleware.js" framework=nextjs
import { NextResponse } from 'next/server';
// Trigger this middleware to run on the `/about` route
export const config = {
  matcher: '/about',
};

export default function middleware(request) {
  // Rewrite to URL
  return NextResponse.rewrite('/about-2');
}
```

```ts filename="middleware.ts" framework=other
import { rewrite } from '@vercel/functions';
// Trigger this middleware to run on the `/about` route
export const config = {
  matcher: '/about',
};

export default function middleware(request: Request) {
  return rewrite(new URL('/about-2', request.url));
}
```

```js filename="middleware.js" framework=other
import { rewrite } from '@vercel/functions';
// Trigger this middleware to run on the `/about` route
export const config = {
  matcher: '/about',
};

export default function middleware(request) {
  return rewrite(new URL('/about-2', request.url));
}
```

### Continuing the Routing Middleware chain

> For \['nextjs', 'nextjs-app']:

The `NextResponse.next()` helper returns a Response that instructs the function to continue the middleware chain. It takes the following optional parameters:

> For \['other']:

The `next()` helper returns a Response that instructs the function to continue the middleware chain. It takes the following optional parameters:

| Parameter    | type                     | Description                 |
| ------------ | ------------------------ | --------------------------- |
| `headers`    | `Headers[]` or `Headers` | The headers you want to set |
| `status`     | `number`                 | The status code             |
| `statusText` | `string`                 | The status text             |

The following example adds a custom header, then continues the Routing Middleware chain:

```ts filename="middleware.ts" framework=nextjs
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hello-from-middleware1', 'hello');

  // You can also set request headers in NextResponse.next
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello');
  return response;
}
```

```js filename="middleware.js" framework=nextjs
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-middleware1', 'hello')

  // You can also set request headers in NextResponse.next
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello')
  return response
}
```

```ts filename="middleware.ts" framework=nextjs-app
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hello-from-middleware1', 'hello');

  // You can also set request headers in NextResponse.next
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello');
  return response;
}
```

```js filename="middleware.js" framework=nextjs-app
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-hello-from-middleware1', 'hello');

  // You can also set request headers in NextResponse.next
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello');
  return response;
}
```

> For \['other']:

**pnpm**

```bash
pnpm i @vercel/functions
```

**yarn**

```bash
yarn add @vercel/functions
```

**npm**

```bash
npm i @vercel/functions
```

**bun**

```bash
bun add @vercel/functions
```

```js filename="middleware.js" framework=other
import { next } from '@vercel/functions';

export default function middleware(request) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Set a new header `x-hello-from-middleware1`
  requestHeaders.set('x-hello-from-middleware1', 'hello');

  // Use the `next()` function to forward the request with modified headers
  return next({
    request: {
      headers: requestHeaders,
    },
    headers: {
      'x-hello-from-middleware2': 'hello',
    },
  });
}
```

```ts filename="middleware.ts" framework=other
import { next } from '@vercel/functions';

export default function middleware(request: Request) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Set a new header `x-hello-from-middleware1`
  requestHeaders.set('x-hello-from-middleware1', 'hello');

  // Use the `next()` function to forward the request with modified headers
  return next({
    request: {
      headers: requestHeaders,
    },
    headers: {
      'x-hello-from-middleware2': 'hello',
    },
  });
}
```

#### `next()` no-op example

This no-op example will return a `200 OK` response with no further action:

```ts filename="middleware.ts" framework=nextjs
import { NextResponse } from 'next/server';
export default function middleware() {
  return NextResponse.next();
}
```

```js filename="middleware.js" framework=nextjs
import { NextResponse } from 'next/server';
export default function middleware() {
  return NextResponse.next();
}
```

```ts filename="middleware.ts" framework=nextjs-app
import { NextResponse } from 'next/server';
export default function middleware() {
  return NextResponse.next();
}
```

```js filename="middleware.js" framework=nextjs-app
import { NextResponse } from 'next/server';
export default function middleware() {
  return NextResponse.next();
}
```

```ts filename="middleware.ts" framework=other
import { next } from '@vercel/functions';
export default function middleware() {
  return next();
}
```

```js filename="middleware.js" framework=other
import { next } from '@vercel/functions';
export default function middleware() {
  return next();
}
```

## More resources

- [Redirect with unique tokens](/kb/guide/use-crypto-web-api)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
