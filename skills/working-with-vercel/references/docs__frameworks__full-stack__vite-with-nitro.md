---
title: Vite + Nitro on Vercel
product: vercel
url: /docs/frameworks/full-stack/vite-with-nitro
canonical_url: "https://vercel.com/docs/frameworks/full-stack/vite-with-nitro"
last_updated: 2026-03-09
type: conceptual
prerequisites:
  - /docs/frameworks/full-stack
  - /docs/frameworks
related:
  - /docs/frameworks/nuxt
  - /docs/functions
  - /docs/fluid-compute
  - /docs/incremental-static-regeneration
  - /docs/cdn
summary: Add a backend to any Vite app with Nitro and deploy to Vercel with zero configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/full-stack/vite-with-nitro.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "840b8a2bd599ad9d5a142e78ce1dfa3801d675d4d1ddf55e12da85a0fd1e2b0b"
---

# Vite + Nitro on Vercel

[Nitro](https://nitro.build) is a universal server toolkit that adds server-side rendering (SSR), API routes, server middleware and other backend capabiltiies to any Vite application. It powers frameworks like [Nuxt](/docs/frameworks/nuxt) and deploys to Vercel with zero configuration.

By adding Nitro to your existing Vite project, you get:

- **Server-Side Rendering (SSR):** Render pages dynamically on the server for improved SEO and faster initial page loads
- **API Routes:** Create backend endpoints using file-based routing in the `api/` or `routes/` directory
- **Vercel Functions:** Your server routes automatically become [Vercel Functions](/docs/functions) with [Fluid compute](/docs/fluid-compute)

## Getting started

To add server capabilities to an existing Vite project, install the `nitro` package:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i nitro
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i nitro
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i nitro
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i nitro
    ```
  </Code>
</CodeBlock>

Then add the Nitro Vite plugin to your configuration:

```ts filename="vite.config.ts"
import { defineConfig } from 'vite';
import { nitro } from 'nitro/vite';

export default defineConfig({
  plugins: [nitro()],
});
```

## Adding API routes

Nitro supports file-based routing in the `api/` or `routes/` directory. Each file becomes an API endpoint based on its path.

Create a file in the `api/` directory to define a route:

```ts filename="api/hello.ts"
import { defineHandler } from 'nitro/h3';

export default defineHandler(() => 'Hello from the server!');
```

This creates a `GET /api/hello` endpoint.

### Dynamic routes

Use square brackets `[param]` for dynamic URL segments. Access params via `event.context.params`:

```ts filename="api/users/[id].ts"
import { defineHandler } from 'nitro/h3';

export default defineHandler((event) => {
  const { id } = event.context.params!;
  return { userId: id };
});
```

This creates a `GET /api/users/:id` endpoint (e.g., `/api/users/123`).

### HTTP methods

Suffix your file with the HTTP method (`.get.ts`, `.post.ts`, `.put.ts`, `.delete.ts`):

```ts filename="api/users.post.ts"
import { defineHandler } from 'nitro/h3';

export default defineHandler(async (event) => {
  const body = await event.req.json();
  return { message: 'User created', data: body };
});
```

### Vercel Functions

When you deploy a Vite + Nitro app to Vercel, your server routes automatically become [Vercel Functions](/docs/functions) with [Fluid compute](/docs/fluid-compute) enabled by default.

Vercel Functions scale based on traffic demands, preventing failures during peak hours while minimizing costs during periods of low activity.

With Nitro on Vercel, you get:

- Scaling to zero when not in use
- Automatic scaling with traffic increases
- Support for standard [Web APIs](https://developer.mozilla.org/docs/Web/API), such as `URLPattern`, `Response`, and more

[Learn more about Vercel Functions](/docs/functions)

## Server-Side Rendering (SSR)

Nitro enables SSR for any Vite app with minimal configuration. The setup varies by UI framework.

#### \['React'

1. Install the required dependencies:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i nitro react react-dom @vitejs/plugin-react
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i nitro react react-dom @vitejs/plugin-react
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i nitro react react-dom @vitejs/plugin-react
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i nitro react react-dom @vitejs/plugin-react
    ```
  </Code>
</CodeBlock>

2. Update your Vite config to add the Nitro and React plugins:

```ts filename="vite.config.ts"
import { defineConfig } from 'vite';
import { nitro } from 'nitro/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [nitro(), react()],
});
```

3. Create the shared app component:

```tsx filename="src/app.tsx"
import { useState } from 'react';

export function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Vite + Nitro + React</h1>
      <button onClick={() => setCount((c) => c + 1)}>Count is {count}</button>
    </>
  );
}
```

4. Create the client entry file that handles hydration:

```tsx filename="src/entry-client.tsx"
import '@vitejs/plugin-react/preamble';
import { hydrateRoot } from 'react-dom/client';
import { App } from './app.tsx';

hydrateRoot(document.querySelector('#app')!, <App />);
```

5. Create the server entry file that renders your app to HTML:

```tsx filename="src/entry-server.tsx"
import './styles.css';
import { renderToReadableStream } from 'react-dom/server.edge';
import { App } from './app.tsx';

import clientAssets from './entry-client?assets=client';
import serverAssets from './entry-server?assets=ssr';

export default {
  async fetch(_req: Request) {
    const assets = clientAssets.merge(serverAssets);
    return new Response(
      await renderToReadableStream(
        <html lang="en">
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            {assets.css.map((attr: any) => (
              <link key={attr.href} rel="stylesheet" {...attr} />
            ))}
            {assets.js.map((attr: any) => (
              <link key={attr.href} rel="modulepreload" {...attr} />
            ))}
            <script type="module" src={assets.entry} />
          </head>
          <body id="app">
            <App />
          </body>
        </html>,
      ),
      { headers: { 'Content-Type': 'text/html;charset=utf-8' } },
    );
  },
};
```

6. Update your TypeScript config:

```json filename="tsconfig.json"
{
  "extends": "nitro/tsconfig",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

#### 'Vue'

1. Install the required dependencies:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i nitro vue vue-router @vitejs/plugin-vue
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i nitro vue vue-router @vitejs/plugin-vue
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i nitro vue vue-router @vitejs/plugin-vue
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i nitro vue vue-router @vitejs/plugin-vue
    ```
  </Code>
</CodeBlock>

2. Update your Vite config to add the Nitro and Vue plugins:

```ts filename="vite.config.ts"
import { defineConfig } from 'vite';
import { nitro } from 'nitro/vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue(), nitro()],
});
```

3. Define your routes with lazy-loaded components:

```ts filename="app/routes.ts"
import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./pages/about.vue'),
  },
];
```

4. Create the client entry file:

```ts filename="app/entry-client.ts"
import { createSSRApp } from 'vue';
import { RouterView, createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes.ts';

async function main() {
  const app = createSSRApp(RouterView);
  const router = createRouter({ history: createWebHistory(), routes });
  app.use(router);

  await router.isReady();
  app.mount('#root');
}

main();
```

5. Create the server entry file:

```ts filename="app/entry-server.ts"
import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { RouterView, createMemoryHistory, createRouter } from 'vue-router';
import { routes } from './routes.ts';

import clientAssets from './entry-client.ts?assets=client';

export default {
  async fetch(request: Request): Promise<Response> {
    const app = createSSRApp(RouterView);
    const router = createRouter({ history: createMemoryHistory(), routes });
    app.use(router);

    const url = new URL(request.url);
    await router.push(url.href.slice(url.origin.length));
    await router.isReady();

    const renderedApp = await renderToString(app);
    const html = `<!DOCTYPE html>
<html lang="en"><head>
  ${clientAssets.css.map((a: any) => `<link rel="stylesheet" href="${a.href}" />`).join('\n')}
  <script type="module" src="${clientAssets.entry}"></script>
</head><body><div id="root">${renderedApp}</div></body></html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html;charset=utf-8' },
    });
  },
};
```

6. Update your TypeScript config:

```json filename="tsconfig.json"
{
  "extends": "nitro/tsconfig"
}
```

#### 'Preact'

1. Install the required dependencies:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i nitro preact preact-render-to-string @preact/preset-vite
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i nitro preact preact-render-to-string @preact/preset-vite
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i nitro preact preact-render-to-string @preact/preset-vite
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i nitro preact preact-render-to-string @preact/preset-vite
    ```
  </Code>
</CodeBlock>

2. Update your Vite config to add the Nitro and Preact plugins:

```ts filename="vite.config.ts"
import { defineConfig } from 'vite';
import { nitro } from 'nitro/vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [nitro(), preact()],
});
```

3. Create the shared app component:

```tsx filename="src/app.tsx"
import { useState } from 'preact/hooks';

export function App() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((c) => c + 1)}>Count is {count}</button>
  );
}
```

4. Create the client entry file:

```tsx filename="src/entry-client.tsx"
import { hydrate } from 'preact';
import { App } from './app.tsx';

hydrate(<App />, document.querySelector('#app')!);
```

5. Create the server entry file:

```tsx filename="src/entry-server.tsx"
import './styles.css';
import { renderToReadableStream } from 'preact-render-to-string/stream';
import { App } from './app.tsx';

import clientAssets from './entry-client?assets=client';
import serverAssets from './entry-server?assets=ssr';

export default {
  async fetch(_req: Request) {
    const assets = clientAssets.merge(serverAssets);
    return new Response(
      renderToReadableStream(
        <html lang="en">
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            {assets.css.map((attr: any) => (
              <link key={attr.href} rel="stylesheet" {...attr} />
            ))}
            {assets.js.map((attr: any) => (
              <link key={attr.href} rel="modulepreload" {...attr} />
            ))}
            <script type="module" src={assets.entry} />
          </head>
          <body>
            <div id="app">
              <App />
            </div>
          </body>
        </html>,
      ),
      { headers: { 'Content-Type': 'text/html;charset=utf-8' } },
    );
  },
};
```

6. Update your TypeScript config:

```json filename="tsconfig.json"
{
  "extends": "nitro/tsconfig",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}
```

#### 'Solid'

1. Install the required dependencies:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i nitro solid-js vite-plugin-solid
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i nitro solid-js vite-plugin-solid
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i nitro solid-js vite-plugin-solid
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i nitro solid-js vite-plugin-solid
    ```
  </Code>
</CodeBlock>

2. Update your Vite config to add the Nitro and Solid plugins, and configure JSX for Solid:

```ts filename="vite.config.ts"
import { defineConfig } from 'vite';
import { nitro } from 'nitro/vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid({ ssr: true }), nitro()],
  esbuild: { jsx: 'preserve', jsxImportSource: 'solid-js' },
});
```

3. Create the shared app component:

```tsx filename="src/app.tsx"
import { createSignal } from 'solid-js';

export function App() {
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <h1>Hello, Solid!</h1>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count()}</button>
    </div>
  );
}
```

4. Create the client entry file:

```tsx filename="src/entry-client.tsx"
import { hydrate } from 'solid-js/web';
import './styles.css';
import { App } from './app.tsx';

hydrate(() => <App />, document.querySelector('#app')!);
```

5. Create the server entry file. Solid requires two-phase rendering with `HydrationScript`:

```tsx filename="src/entry-server.tsx"
import { renderToStringAsync, HydrationScript } from 'solid-js/web';
import { App } from './app.tsx';

import clientAssets from './entry-client?assets=client';
import serverAssets from './entry-server?assets=ssr';

export default {
  async fetch(_req: Request): Promise<Response> {
    const appHTML = await renderToStringAsync(() => <App />);
    const rootHTML = await renderToStringAsync(() => (
      <Root appHTML={appHTML} />
    ));
    return new Response(rootHTML, {
      headers: { 'Content-Type': 'text/html' },
    });
  },
};

function Root(props: { appHTML?: string }) {
  const assets = clientAssets.merge(serverAssets);
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {assets.css.map((attr: any) => (
          <link rel="stylesheet" {...attr} />
        ))}
        {assets.js.map((attr: any) => (
          <link rel="modulepreload" {...attr} />
        ))}
      </head>
      <body>
        <div id="app" innerHTML={props.appHTML || ''} />
        <HydrationScript />
        <script type="module" src={assets.entry} />
      </body>
    </html>
  );
}
```

6. Update your TypeScript config:

```json filename="tsconfig.json"
{
  "extends": "nitro/tsconfig",
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "solid-js"
  }
}
```

#### 'HTML']

### HTML SSR setup

For SSR without a UI framework, use an `index.html` file with an SSR outlet placeholder.

1. Install Nitro:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i nitro
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i nitro
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i nitro
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i nitro
    ```
  </Code>
</CodeBlock>

2. Update your Vite config:

```ts filename="vite.config.ts"
import { defineConfig } from 'vite';
import { nitro } from 'nitro/vite';

export default defineConfig({
  plugins: [nitro()],
});
```

3. Create an `index.html` file with an `<!--ssr-outlet-->` placeholder:

```html filename="index.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>
  <body>
    <div id="app"><!--ssr-outlet--></div>
  </body>
</html>
```

4. Create the server entry file that returns content to inject into the SSR outlet:

```ts filename="app/entry-server.ts"
export default {
  async fetch(_req: Request) {
    const content = '<p>Hello from the server!</p>';
    return new Response(content, {
      headers: { 'Content-Type': 'text/html;charset=utf-8' },
    });
  },
};
```

The content returned by the server entry replaces the `<!--ssr-outlet-->` placeholder in your HTML.

## Incremental Static Regeneration (ISR)

[Incremental Static Regeneration (ISR)](/docs/incremental-static-regeneration) allows you to create or update content *without* redeploying your site. ISR has two main benefits for developers: better performance and faster build times.

To enable ISR for a Nitro route, add a `routeRules` option to your Nitro configuration:

```ts filename="nitro.config.ts"
import { defineNitroConfig } from 'nitro/config';

export default defineNitroConfig({
  routeRules: {
    // All routes revalidate every 60 seconds in the background
    '/**': { isr: 60 },
    // This route is generated on demand and cached permanently
    '/static': { isr: true },
    // This route is prerendered at build time and cached permanently
    '/prerendered': { prerender: true },
    // This route is always fresh
    '/dynamic': { isr: false },
  },
});
```

### Fine-grained ISR configuration

Pass an options object to the `isr` route rule to configure caching behavior:

- **`expiration`:** Time in seconds before the cached page regenerates by invoking the function. Set to `false` (or use `isr: true`) to cache permanently.
- **`allowQuery`:** List of query string parameter names cached independently. An empty array ignores query values. When `undefined`, each unique query value is cached independently.
- **`passQuery`:** When `true`, the query string is passed to the invoked function. The `allowQuery` filter still applies.

```ts filename="nitro.config.ts"
import { defineNitroConfig } from 'nitro/config';

export default defineNitroConfig({
  routeRules: {
    '/products/**': {
      isr: {
        expiration: 60,
        allowQuery: ['q'],
        passQuery: true,
      },
    },
  },
});
```

### On-demand revalidation

On-demand revalidation lets you purge the cache for an ISR route at any time, instead of waiting for the expiration interval.

To enable on-demand revalidation:

1. Create an environment variable to store a revalidation secret. Use the command `openssl rand -base64 32` to generate a random value.
2. Add the `bypassToken` to your Nitro configuration:

```ts filename="nitro.config.ts"
import { defineNitroConfig } from 'nitro/config';

export default defineNitroConfig({
  vercel: {
    config: {
      bypassToken: process.env.VERCEL_BYPASS_TOKEN,
    },
  },
});
```

3. Send a `GET` or `HEAD` request to the route with an `x-prerender-revalidate` header set to your `bypassToken` value. The cache revalidates immediately, and the next request returns a fresh response.

**Using ISR with Vite + Nitro on Vercel offers:**

- Better performance with the global [CDN](/docs/cdn)
- Zero-downtime rollouts to previously statically generated pages
- Global content updates in 300ms
- Generated pages are both cached and persisted to durable storage

[Learn more about ISR](/docs/incremental-static-regeneration)

## Environment variables

Vercel provides a set of [System Environment Variables](/docs/environment-variables/system-environment-variables) that are automatically available to your project.

To make environment variables accessible in Nitro server code, prefix the variable name with `NITRO_` and define it in your Nitro configuration. For example, `NITRO_API_TOKEN` is accessible as `useRuntimeConfig().apiToken`.

```ts filename="nitro.config.ts"
import { defineNitroConfig } from 'nitro/config';

export default defineNitroConfig({
  runtimeConfig: {
    apiToken: 'dev_token', // `dev_token` is the default value
  },
});
```

In Nitro server code, access environment variables using `useRuntimeConfig()`.

```ts filename="api/config.ts"
import { defineHandler } from 'nitro/h3';
import { useRuntimeConfig } from 'nitro/runtime-config';

export default defineHandler((event) => {
  return useRuntimeConfig().apiToken; // Returns `dev_token`
});
```

[Learn more about Nitro runtime configuration](https://nitro.build/docs/configuration)

## Observability

Vercel provides built-in observability for your Nitro applications, giving you visibility into your application's performance and behavior in production. Monitor function invocations, track errors, analyze latency, and inspect logs directly from the Vercel dashboard.

[Learn more about Observability on Vercel](/docs/observability)

## More benefits

See [our Frameworks documentation page](/docs/frameworks) to learn about the benefits available to **all** frameworks when you deploy on Vercel.

## More resources

Learn more about deploying Vite + Nitro projects on Vercel:

- [Nitro documentation](https://nitro.build)
- [Vite documentation](https://vitejs.dev)
- [Nitro examples](https://nitro.build/examples)


---

[View full sitemap](/docs/sitemap)
