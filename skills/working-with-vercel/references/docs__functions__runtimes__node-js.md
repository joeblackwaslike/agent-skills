---
title: Using the Node.js Runtime with Vercel Functions
product: vercel
url: /docs/functions/runtimes/node-js
canonical_url: "https://vercel.com/docs/functions/runtimes/node-js"
last_updated: 2026-05-19
type: reference
prerequisites:
  - /docs/functions/runtimes
  - /docs/functions
related:
  - /docs/functions/limitations
  - /docs/functions/functions-api-reference
  - /docs/functions/functions-api-reference?framework=other\&language=ts
  - /docs/services
  - /docs/functions/runtimes/node-js/advanced-node-configuration
summary: Learn how to use the Node.js runtime to create functions and deploy Node.js servers on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/node-js.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "ead7f9884254a4aacf9ec3e26227ff057955c6ef3ea0bcd2dc2727fcfcbce47e"
---

# Using the Node.js Runtime with Vercel Functions

Use the Node.js runtime to deploy Node.js HTTP servers or Vercel Functions written in JavaScript or TypeScript.

[Node.js](/docs/functions/runtimes/node-js)-powered functions are suited to computationally intense or large functions and provide benefits like:

- **More RAM and CPU power**: For computationally intense workloads, or functions that need the [Node.js bundle size limits](/docs/functions/limitations#bundle-size-limits), this runtime is ideal
- **Complete Node.js compatibility**: The Node.js runtime offers access to all Node.js APIs, making it a powerful tool for many applications

## Deploy a Node.js server

Use a Node.js server when you want one HTTP server to route requests for your application. Vercel detects a `server` entrypoint and turns it into a Vercel Function.

Vercel looks for a `server` entrypoint in the project root or the `src/` directory:

- `server.{js,cjs,mjs,ts,cts,mts}`
- `src/server.{js,cjs,mjs,ts,cts,mts}`

Call `server.listen()` during module startup. Vercel uses that call to detect the HTTP server, then routes incoming requests to the server through an internal port. The port you pass to `listen()` is only used when you run the file locally and does not expose a public port on Vercel.

```ts filename="server.ts" framework=all
import { createServer } from 'node:http';

const server = createServer((request, response) => {
  const url = new URL(
    request.url ?? '/',
    `http://${request.headers.host ?? 'localhost'}`
  );

  if (request.method === 'GET' && url.pathname === '/health') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello from Node.js on Vercel');
});

server.listen(Number(process.env.PORT ?? 3000));
```

```js filename="server.js" framework=all
const { createServer } = require('node:http');

const server = createServer((request, response) => {
  const url = new URL(
    request.url ?? '/',
    `http://${request.headers.host ?? 'localhost'}`
  );

  if (request.method === 'GET' && url.pathname === '/health') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello from Node.js on Vercel');
});

server.listen(Number(process.env.PORT ?? 3000));
```

*A minimal Node.js HTTP server that Vercel can capture from \`server.ts\` or
\`server.js\`.*

> **💡 Note:** To use ES modules in JavaScript, name the file `server.mjs` or set `"type":
>   "module"` in `package.json`.

Other Vercel Function formats, such as a [Web Handler](/docs/functions/functions-api-reference#function-signature) (`GET`, `POST`, and other method exports), the `fetch` [Web Standard export](/docs/functions/functions-api-reference?framework=other\&language=ts#fetch-web-standard), or a Node.js `(request, response)` handler, do not need `server.listen()`.

Captured Node.js servers receive standard Node.js `IncomingMessage` and `ServerResponse` objects. They do not include the helper properties added to `/api` function handlers, such as `request.query`, `request.cookies`, and `request.body`.

To deploy a Node.js server alongside a frontend such as a Next.js app within the same project, use [Services](/docs/services).

## Create a Node.js function in /api

To use the Node.js runtime for an individual Vercel Function, create a file inside the `/api` directory with a function using the [`fetch` Web Standard export](/docs/functions/functions-api-reference?framework=other\&language=ts#fetch-web-standard). No additional configuration is needed:

```ts filename="api/hello.ts"
export default {
  fetch(request: Request) {
    return new Response('Hello from Vercel!');
  },
};
```

Alternatively, you can export each HTTP method as a separate export instead of using the `fetch` Web Standard export:

```ts filename="api/hello.ts"
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

To learn more about creating Vercel Functions, see the [Functions API Reference](/docs/functions/functions-api-reference). If you need more advanced behavior, such as a custom build step or private npm modules, see the [advanced Node.js usage page](/docs/functions/runtimes/node-js/advanced-node-configuration).

## Supported APIs

Vercel Functions using the Node.js runtime support [all Node.js APIs](https://nodejs.org/docs/latest/api/), including standard Web APIs such as the [Request and Response Objects](/docs/functions/runtimes/node-js#node.js-request-and-response-objects).

## Node.js version

To learn more about the supported Node.js versions on Vercel, see [Supported Node.js Versions](/docs/functions/runtimes/node-js/node-js-versions).

## Node.js dependencies

For dependencies listed in a `package.json` file at the root of a project, the following behavior is used:

- If `bun.lock` or `bun.lockb` is present, `bun install` is executed
- If `yarn.lock` is present `yarn install` is executed
- If `pnpm-lock.yaml` is present, `pnpm install` is executed
  - See [supported package managers](/docs/package-managers#supported-package-managers) for pnpm detection details
- If `package-lock.json` is present, `npm install` is executed
- If `vlt-lock.json` is present, `vlt install` is executed
- Otherwise, `npm install` is executed

If you need to select a specific version of a package manager, see [corepack](/docs/deployments/configure-a-build#corepack).

## Using TypeScript with the Node.js runtime

The Node.js runtime supports TypeScript files for server entrypoints and files
inside of the `/api` directory.

An example TypeScript file that exports a Web signature handler is as follows:

```typescript filename="api/hello.ts"
export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const name = url.searchParams.get('name') || 'World';

    return Response.json({ message: `Hello ${name}!` });
  },
};
```

You can use a `tsconfig.json` file at the root of your project to configure the TypeScript compiler. Most options are supported aside from ["Path Mappings"](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) and ["Project References"](https://www.typescriptlang.org/docs/handbook/project-references.html).

## Node.js request and response objects

Each request to a Node.js Vercel Function gives access to Request and Response objects. These objects are the [standard](https://nodejs.org/api/http.html#http_event_request) HTTP [Request](https://nodejs.org/api/http.html#http_class_http_incomingmessage) and [Response](https://nodejs.org/api/http.html#http_class_http_serverresponse) objects from Node.js.

### Node.js helpers

Vercel additionally provides helper methods inside of the Request and Response objects passed to Node.js Vercel Functions. These methods are:

| method                                                  | description                                                                                                                                                                                         | object   |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `request.query`                                         | An object containing the request's [query string](https://en.wikipedia.org/wiki/Query_string), or `{}` if the request does not have a query string.                                                 | Request  |
| `request.cookies`                                       | An object containing the cookies sent by the request, or `{}` if the request contains no cookies.                                                                                                   | Request  |
| [`request.body`](#request-body)                         | An object containing the body sent by the request, or `null` if no body is sent.                                                                                                                    | Request  |
| `response.status(code)`                                 | A function to set the status code sent with the response where `code` must be a valid [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). Returns `response` for chaining. | Response |
| `response.send(body)`                                   | A function to set the content of the response where `body` can be a `string`, an `object` or a `Buffer`.                                                                                            | Response |
| `response.json(obj)`                                    | A function to send a JSON response where `obj` is the JSON object to send.                                                                                                                          | Response |
| `response.redirect(url)`                                | A function to redirect to the URL derived from the specified path with status code "307 Temporary Redirect".                                                                                        | Response |
| `response.redirect(statusCode, url)`                    | A function to redirect to the URL derived from the specified path, with specified [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).                                      | Response |

The following Node.js Vercel Function example showcases the use of `request.query`, `request.cookies` and `request.body` helpers:

```javascript filename="api/hello.ts"
import { VercelRequest, VercelResponse } from "@vercel/node";

module.exports = (request: VercelRequest, response: VercelResponse) => {
  let who = 'anonymous';

  if (request.body && request.body.who) {
    who = request.body.who;
  } else if (request.query.who) {
    who = request.query.who;
  } else if (request.cookies.who) {
    who = request.cookies.who;
  }

  response.status(200).send(`Hello ${who}!`);
};
```

*Example Node.js Vercel Function using the \`request.query\`, \`request.cookies\`,
and \`request.body\` helpers. It returns greetings for the user specified using
\`response.send()\`.*

> **💡 Note:** If needed, you can opt-out of Vercel providing `helpers` using [advanced
> configuration](#disabling-helpers-for-node.js).

### Request body

We populate the `request.body` property with a parsed version of the content sent with the request when possible.

We follow a set of rules on the `Content-type` header sent by the request to do so:

| `Content-Type` header               | Value of `request.body`                                                                 |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| No header                           | `undefined`                                                                             |
| `application/json`                  | An object representing the parsed JSON sent by the request.                             |
| `application/x-www-form-urlencoded` | An object representing the parsed data sent with the request.                           |
| `text/plain`                        | A string containing the text sent by the request.                                       |
| `application/octet-stream`          | A [Buffer](https://nodejs.org/api/buffer.html) containing the data sent by the request. |

With the `request.body` helper, you can build applications without extra dependencies or having to parse the content of the request manually.

> **💡 Note:** The `request.body` helper is set using a [JavaScript
> getter](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/get).
> In turn, it is only computed when it is accessed.

When the request body contains malformed JSON, accessing `request.body` will throw an error. You can catch that error by wrapping `request.body` with [`try...catch`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/try...catch):

```javascript filename="api/hello.ts"
try {
  request.body;
} catch (error) {
  return response.status(400).json({ error: 'My custom 400 error' });
}
```

*Catching the error thrown by \`request.body\` with
\`try...catch\`.*

### Cancelled Requests

Request cancellation must be enabled on a per-route basis. See [Functions API Reference](/docs/functions/functions-api-reference#cancel-requests) for more information.

You can listen for the `error` event on the request object to detect request cancellation:

```typescript filename="api/cancel.ts" {5-8}
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (request: VercelRequest, response: VercelResponse) => {
  let cancelled = false;
  request.on('error', (error) => {
    if (error.message === 'aborted') {
      console.log('request aborted');
    }
    cancelled = true;
  });

  response.writeHead(200);

  for (let i = 1; i < 5; i++) {
    if (cancelled) {
      // the response must be explicitly ended
      response.end();
      return;
    }

    response.write(`Count: ${i}\n`);

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  response.end('All done!');
};
```

## Using Express with Vercel

Express.js is a popular framework used with Node.js. For information on how to use Express with Vercel, see the guide: [Using Express.js with Vercel](/kb/guide/using-express-with-vercel).

## Using Node.js with middleware

The Node.js runtime can be used as an experimental feature to run middleware. To enable, add the flag to your `next.config.ts` file:

```ts filename="next.config.ts" framework=all
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
```

```js filename="next.config.ts" framework=all
const nextConfig = {
  experimental: {
    nodeMiddleware: true,
  },
};

export default nextConfig;
```

Then in your middleware file, set the runtime to `nodejs` in the `config` object:

```js {3} filename="middleware.ts" framework=all
export const config = {
  matcher: '/about/:path*',
  runtime: 'nodejs',
};
```

```ts {3} filename="middleware.ts" framework=all
export const config = {
  matcher: '/about/:path*',
  runtime: 'nodejs',
};
```

> **💡 Note:** Running middleware on the Node.js runtime incurs charges under [Vercel
> Functions pricing](/docs/functions/usage-and-pricing#pricing). These functions
> only run using [Fluid compute](/docs/fluid-compute#fluid-compute).


---

[View full sitemap](/docs/sitemap)
