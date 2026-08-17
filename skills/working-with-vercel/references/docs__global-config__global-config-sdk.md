---
title: @vercel/global-config
product: vercel
url: /docs/global-config/global-config-sdk
canonical_url: "https://vercel.com/docs/global-config/global-config-sdk"
last_updated: 2026-07-29
type: reference
prerequisites:
  - /docs/global-config
related:
  - /docs/global-config
  - /docs/functions/runtimes/edge
  - /docs/global-config/vercel-api
  - /docs/global-config/global-config-dashboard
  - /docs/global-config/using-global-config
summary: The Global Config client SDK is the most ergonomic way to read data from Global Configs. Learn how to set up the SDK so you can start reading Global...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config/global-config-sdk.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "5c2455a0746e1b1d7cce3fe0a86f48f7be5ca110d035e59d4b60af88ded512c8"
---

# @vercel/global-config

The [Global Config](/docs/global-config) client SDK is the most ergonomic way to read data from Global Configs. It provides several helper methods for reading values from one or multiple Global Configs, and is compatible with Node.js, [the Edge Runtime](/docs/functions/runtimes/edge), and the browser.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Dynamic redirects with Global Config and Next.js proxy](https://vercel.com/kb/guide/dynamic-redirects-with-global-config-and-next-js-proxy?from=related) — Learn how to create redirects that update instantly without redeploying by storing rules in Global Config and reading th
- [Limits & Pricing](https://vercel.com/docs/global-config/global-config-limits?from=related) — Learn about the Global Configs limits and pricing based on account plans.
- [Getting Started](https://vercel.com/docs/global-config/get-started?from=related) — Learn how to create a Global Config store and read from it in your project.
- [vercel global-config](https://vercel.com/docs/cli/global-config?from=related) — Manage Global Config stores from the Vercel CLI: list, create, inspect, update, remove, and manage items, read tokens, a
- [DevCycle](https://vercel.com/docs/global-config/global-config-integrations/devcycle-global-config?from=related) — Learn how to use Global Config with Vercel's DevCycle integration.
- [Statsig](https://vercel.com/docs/global-config/global-config-integrations/statsig-global-config?from=related) — Learn how to use Global Config with Vercel's Statsig integration.

Full cross-link map for this page: [/docs/global-config/global-config-sdk.graph.md](/docs/global-config/global-config-sdk.graph.md)
<!-- /docsgraph:related -->

It does not have functionality for *creating* new Global Configs and *writing* to existing Global Configs, which can be done [using the Vercel REST API](/docs/global-config/vercel-api) or the [Dashboard](/docs/global-config/global-config-dashboard).

You can also [read Global Config data with the Vercel REST API](/docs/global-config/vercel-api#read-all-items). Review [Reading from a Global Config](/docs/global-config/using-global-config#reading-data-from-global-configs) to understand when to use the SDK versus the Vercel REST API.

## Requirements

Before you can start using the SDK, you need to have done the following:

- Created a Global Config, which can be done using the [API](/docs/global-config/vercel-api#create-a-global-config) or the [Dashboard](/docs/global-config/global-config-dashboard#creating-a-global-config)
- Added [a Global Config read access token](/docs/global-config/using-global-config#creating-a-read-access-token) to access your Global Config
- Defined [a connection string](/docs/global-config/using-global-config#using-a-connection-string) with the Global Config read access token and Global Config id and stored it as an environment variable

## Setting up the SDK

To get started, install the SDK:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @vercel/global-config
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @vercel/global-config
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @vercel/global-config
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @vercel/global-config
    ```
  </Code>
</CodeBlock>

## Use connection strings

Use connection strings to connect your Global Config to one or more projects. This allows Vercel to optimize your reads when you read the Global Config through the SDK. You can learn how to create a connection string [here](/docs/global-config/using-global-config#using-a-connection-string).

By default, the SDK will run all helper methods using the connection string stored in the `GLOBAL_CONFIG` environment variable. That means, if you have the `GLOBAL_CONFIG` environment variable set in your project, you can import any of the helper methods and use them like so:

```typescript filename="example.ts"
import { NextResponse } from 'next/server';
import { getAll } from '@vercel/global-config';

const configItems = await getAll();
```

However, you can store your connection string as **any** environment variable, and even connect to multiple Global Configs by storing more than one connection string in your environment variables.

To do so, you must use the `createClient` helper.

The `createClient` helper method takes a connection string and returns an object that lets you use helper methods on the associated Global Config. Using `createClient`, you can store multiple Global Configs as environment variables and read data from all of them.

```typescript filename="example.ts
import { createClient } from '@vercel/global-config';

// Fetch a single value from one config
const firstConfig = createClient(process.env.FIRST_GLOBAL_CONFIG);
const firstExampleValue1 = await firstConfig.get('other_example_key_1');

// Fetch all values from another config
const secondConfig = createClient(process.env.SECOND_GLOBAL_CONFIG);
const allValues = await secondConfig.getAll();
```

The following sections will teach you how to use all of the SDK's helper methods.

## Read a single value

The `get` helper method allows you to fetch a value at a given key in your Global Config.

```ts filename="app/api/get-example/route.ts" framework=nextjs
import { NextResponse } from 'next/server';
import { get } from '@vercel/global-config';

export async function GET() {
  const val = await get('key');

  return NextResponse.json({
    label: `Value of "key" in my Global Config.`,
    value: val,
  });
}
```

```js filename="app/api/get-example/route.js" framework=nextjs
import { NextResponse } from 'next/server';
import { get } from '@vercel/global-config';

export async function GET() {
  const val = await get('key');

  return NextResponse.json({
    label: `Value of "key" in my Global Config.`,
    value: val,
  });
}
```

```ts filename="api/get-example.ts" framework=other
import { get } from '@vercel/global-config';

export async function GET() {
  const val = await get('key');

  return Response.json({
    label: `Value of "key" in my Global Config.`,
    value: val,
  });
}
```

```js filename="api/get-example.js" framework=other
import { get } from '@vercel/global-config';

export async function GET() {
  const val = await get('key');

  return Response.json({
    label: `Value of "key" in my Global Config.`,
    value: val,
  });
}
```

```ts filename="app/api/get-example/route.ts" framework=nextjs-app
import { NextResponse } from 'next/server';
import { get } from '@vercel/global-config';

export async function GET() {
  const val = await get('key');

  return NextResponse.json({
    label: `Value of "key" in my Global Config.`,
    value: val,
  });
}
```

```js filename="app/api/get-example/route.js" framework=nextjs-app
import { NextResponse } from 'next/server';
import { get } from '@vercel/global-config';

export async function GET() {
  const val = await get('key');

  return NextResponse.json({
    label: `Value of "key" in my Global Config.`,
    value: val,
  });
}
```

## Read multiple values

The `getAll` helper method returns all of your Global Config's items.

```ts filename="app/api/getall-example/route.ts" framework=nextjs
import { NextResponse } from 'next/server';
import { getAll } from '@vercel/global-config';

export async function GET() {
  const configItems = await getAll();

  return NextResponse.json({
    label: `These are all the values in my Global Config.`,
    value: configItems,
  });
}
```

```js filename="app/api/getall-example/route.ts" framework=nextjs
import { NextResponse } from 'next/server';
import { getAll } from '@vercel/global-config';

export async function GET() {
  const configItems = await getAll();

  return NextResponse.json({
    label: `These are all the values in my Global Config.`,
    value: configItems,
  });
}
```

```ts filename="app/api/getall-example/route.ts" framework=nextjs-app
import { NextResponse } from 'next/server';
import { getAll } from '@vercel/global-config';

export async function GET() {
  const configItems = await getAll();

  return NextResponse.json({
    label: `These are all the values in my Global Config.`,
    value: configItems,
  });
}
```

```js filename="app/api/getall-example/route.ts" framework=nextjs-app
import { NextResponse } from 'next/server';
import { getAll } from '@vercel/global-config';

export async function GET() {
  const configItems = await getAll();

  return NextResponse.json({
    label: `These are all the values in my Global Config.`,
    value: configItems,
  });
}
```

```ts filename="api/getall-example.ts" framework=other
import { getAll } from '@vercel/global-config';

export async function GET() {
  const configItems = await getAll();

  return Response.json({
    label: `These are all the values in my Global Config.`,
    value: configItems,
  });
}
```

```js filename="api/getall-example.js" framework=other
import { getAll } from '@vercel/global-config';

export async function GET() {
  const configItems = await getAll();

  return Response.json({
    label: `These are all the values in my Global Config.`,
    value: configItems,
  });
}
```

Passing an array of key names causes `getAll` to return only the specified keys.

```ts filename="app/api/getall-keys-example/route.ts" framework=nextjs
import { NextResponse } from 'next/server';
import { getAll } from '@vercel/global-config';

export async function GET() {
  const someItems = await getAll(['keyA', 'keyB']);

  return NextResponse.json({
    label: `These are a few values in my Global Config.`,
    value: someItems,
  });
}
```

```js filename="app/api/getall-keys-example/route.js" framework=nextjs
import { NextResponse } from 'next/server';
import { getAll } from '@vercel/global-config';

export async function GET() {
  const someItems = await getAll(['keyA', 'keyB']);

  return NextResponse.json({
    label: `These are a few values in my Global Config.`,
    value: someItems,
  });
}
```

```ts filename="app/api/getall-keys-example/route.ts" framework=nextjs-app
import { NextResponse } from 'next/server';
import { getAll } from '@vercel/global-config';

export async function GET() {
  const someItems = await getAll(['keyA', 'keyB']);

  return NextResponse.json({
    label: `These are a few values in my Global Config.`,
    value: someItems,
  });
}
```

```js filename="app/api/getall-keys-example/route.js" framework=nextjs-app
import { NextResponse } from 'next/server';
import { getAll } from '@vercel/global-config';

export async function GET() {
  const someItems = await getAll(['keyA', 'keyB']);

  return NextResponse.json({
    label: `These are a few values in my Global Config.`,
    value: someItems,
  });
}
```

```ts filename="api/getall-keys-example.ts" framework=other
import { getAll } from '@vercel/global-config';

export async function GET() {
  const someItems = await getAll(['keyA', 'keyB']);

  return Response.json({
    label: `These are a few values in my Global Config.`,
    value: someItems,
  });
}
```

```js filename="api/getall-keys-example.js" framework=other
import { getAll } from '@vercel/global-config';

export async function GET() {
  const someItems = await getAll(['keyA', 'keyB']);

  return Response.json({
    label: `These are a few values in my Global Config.`,
    value: someItems,
  });
}
```

## Check if a key exists

The `has` helper method lets you verify if a key exists in your Global Config. It returns `true` if the key does, and `false` if it doesn't.

```ts filename="app/api/has-example/route.ts" framework=nextjs
import { NextResponse } from 'next/server';
import { has } from '@vercel/global-config';

export async function GET() {
  const exists = await has('key');

  return NextResponse.json({
    keyExists: exists ? `The key exists!` : `The key doesn't exist!`,
  });
}
```

```js filename="app/api/has-example/route.js" framework=nextjs
import { NextResponse } from 'next/server';
import { has } from '@vercel/global-config';

export async function GET() {
  const exists = await has('key');

  return NextResponse.json({
    keyExists: exists ? `The key exists!` : `The key doesn't exist!`,
  });
}
```

```ts filename="app/api/has-example/route.ts" framework=nextjs-app
import { NextResponse } from 'next/server';
import { has } from '@vercel/global-config';

export async function GET() {
  const exists = await has('key');

  return NextResponse.json({
    keyExists: exists ? `The key exists!` : `The key doesn't exist!`,
  });
}
```

```js filename="app/api/has-example/route.js" framework=nextjs-app
import { NextResponse } from 'next/server';
import { has } from '@vercel/global-config';

export async function GET() {
  const exists = await has('key');

  return NextResponse.json({
    keyExists: exists ? `The key exists!` : `The key doesn't exist!`,
  });
}
```

```ts filename="api/has-example.ts" framework=other
import { has } from '@vercel/global-config';

export async function GET() {
  const exists = await has('key');

  return Response.json({
    keyExists: exists ? `The key exists!` : `The key doesn't exist!`,
  });
}
```

```js filename="api/has-example.js" framework=other
import { has } from '@vercel/global-config';

export async function GET() {
  const exists = await has('key');

  return Response.json({
    keyExists: exists ? `The key exists!` : `The key doesn't exist!`,
  });
}
```

## Check the Global Config version

Every Global Config has a hash string associated with it, which is updated whenever the Config is updated. Checking this digest can help you verify whether your Global Config has properly updated, and confirm which version of the Config you're working with.

The `digest` helper method lets you check the version of the Global Config you're reading.

```ts filename="app/api/digest-example/route.ts" framework=nextjs
import { NextResponse } from 'next/server';
import { digest } from '@vercel/global-config';

export async function GET() {
  const version = await digest();

  return NextResponse.json({
    digest: version,
  });
}
```

```js filename="app/api/digest-example/route.js" framework=nextjs
import { NextResponse } from 'next/server';
import { digest } from '@vercel/global-config';

export async function GET() {
  const version = await digest();

  return NextResponse.json({
    digest: version,
  });
}
```

```ts filename="app/api/digest-example/route.ts" framework=nextjs-app
import { NextResponse } from 'next/server';
import { digest } from '@vercel/global-config';

export async function GET() {
  const version = await digest();

  return NextResponse.json({
    digest: version,
  });
}
```

```js filename="app/api/digest-example/route.js" framework=nextjs-app
import { NextResponse } from 'next/server';
import { digest } from '@vercel/global-config';

export async function GET() {
  const version = await digest();

  return NextResponse.json({
    digest: version,
  });
}
```

```ts filename="api/digest-example.ts" framework=other
import { digest } from '@vercel/global-config';

export async function GET() {
  const version = await digest();

  return Response.json({
    digest: version,
  });
}
```

```js filename="api/digest-example.js" framework=other
import { digest } from '@vercel/global-config';

export async function GET() {
  const version = await digest();

  return Response.json({
    digest: version,
  });
}
```

The digest's creation may change, so it is not documented. A matching digest indicates that the Global Config content remains unchanged, while a different digest suggests changes but does not guarantee them.

## Writing Global Config Items

You cannot write to Global Config items using the Global Config SDK. Instead, you can programmatically write using the [Vercel REST API](/docs/global-config/vercel-api#update-your-global-config-items).

The Global Config SDK is designed to read from our `global-config.vercel.com` endpoint using read-only tokens to authenticate reads, while writing requires [Vercel Access Tokens to authenticate with the Vercel REST API](/docs/rest-api#authentication). This core distinction makes it impractical to use the SDK for writes.

If your project requires frequent writes, you should consider using a [Redis database from the Vercel Marketplace](/marketplace?category=storage\&search=redis), such as [Upstash Redis](https://vercel.com/marketplace/upstash).

## Errors

All helper methods throw errors when:

- Your Global Config read access token is invalid
- The Global Config you're reading from doesn't exists
- A network error occurs

## Up Next


---

[View full sitemap](/docs/sitemap)
