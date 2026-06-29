---
title: Configuring Maximum Duration for Vercel Functions
product: vercel
url: /docs/functions/configuring-functions/duration
canonical_url: "https://vercel.com/docs/functions/configuring-functions/duration"
last_updated: 2026-06-19
type: how-to
prerequisites:
  - /docs/functions/configuring-functions
  - /docs/functions
related:
  - /docs/fluid-compute
  - /docs/functions/usage-and-pricing
  - /docs/functions/limitations
  - /docs/project-configuration
  - /docs/networking/secure-compute
summary: Learn how to set the maximum duration of a Vercel Function.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/configuring-functions/duration.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "49d4ac71f3e36dbc2aac3dcdf1a72c624da48cc0dad99ac3129f910d7edc20b5"
---

# Configuring Maximum Duration for Vercel Functions

The maximum duration configuration determines the longest time that a function can run. You can configure the maximum duration for Vercel Functions.

## Consequences of changing the maximum duration

Changing the maximum duration gives an invocation more time before Vercel terminates it. With [fluid compute](/docs/fluid-compute), Vercel can reuse function instances and process multiple invocations in the same instance with [optimized concurrency](/docs/fluid-compute#optimized-concurrency). Provisioned memory is billed for running instances, not as a separate memory allocation for every request. Active CPU billing applies while your code is executing, and pauses while your function is waiting on I/O. To learn more, see [Managing function duration](/docs/functions/usage-and-pricing#managing-function-duration).

For this reason, Vercel has set a [default maximum duration](/docs/functions/limitations#max-duration) for functions, which can be useful for preventing runaway functions from consuming resources indefinitely.

If a function runs for longer than its set maximum duration, Vercel will terminate it. Therefore, when setting this duration, it's crucial to strike a balance:

1. Allow sufficient time for your function to complete its normal operations, including any necessary waiting periods (for example, streamed responses).
2. Set a reasonable limit to prevent abnormally long executions.

## Maximum duration for different runtimes

The method of configuring the maximum duration depends on your framework and runtime:

#### Node.js, Next.js (>= 13.5 or higher), SvelteKit, Astro, Nuxt, and Remix

For these runtimes / frameworks, you can configure the number of seconds directly in your function:

```ts v0="build" {1} filename="app/api/my-function/route.ts" framework=nextjs-app
export const maxDuration = 5; // This function can run for a maximum of 5 seconds

export function GET(request: Request) {
  return new Response('Vercel', {
    status: 200,
  });
}
```

```js v0="build" {1} filename="app/api/my-function/route.js" framework=nextjs-app
export const maxDuration = 5; // This function can run for a maximum of 5 seconds

export function GET(request) {
  return new Response('Vercel', {
    status: 200,
  });
}
```

```ts v0="build" {4-6} filename="pages/api/handler.ts" framework=nextjs
import { NextApiRequest, NextApiResponse } from 'next';

// This function can run for a maximum of 5 seconds
export const config = {
  maxDuration: 5,
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}
```

```js v0="build" {2-4} filename="pages/api/handler.js" framework=nextjs
// This function can run for a maximum of 5 seconds
export const config = {
  maxDuration: 5,
};

export default function handler(request, response) {
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}
```

```ts {2-4} filename="app/routes/function/my-function.ts" framework=remix
// This function can run for a maximum of 5 seconds
export const config = {
  maxDuration: 5,
};

export default function Serverless() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Configuring maxDuration</h1>
    </div>
  );
}
```

```js {2-4} filename="app/routes/function/my-function.js" framework=remix
// This function can run for a maximum of 5 seconds
export const config = {
  maxDuration: 5,
};

export default function Serverless() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Configuring maxDuration</h1>
    </div>
  );
}
```

```js {7} filename="svelte.config.js" framework=sveltekit
import adapter from '@sveltejs/adapter-vercel';

// This function can run for a maximum of 5 seconds
export default {
  kit: {
    adapter: adapter({
      maxDuration: 5,
    }),
  },
};
```

```ts {7} filename="svelte.config.js" framework=sveltekit
import adapter from '@sveltejs/adapter-vercel';

// This function can run for a maximum of 5 seconds
export default {
  kit: {
    adapter: adapter({
      maxDuration: 5,
    }),
  },
};
```

```js {8} filename="astro.config.mjs" framework=astro
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// This function can run for a maximum of 5 seconds
export default defineConfig({
  output: 'server',
  adapter: vercel({
    maxDuration: 5,
  }),
});
```

```ts {8} filename="astro.config.mjs" framework=astro
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// This function can run for a maximum of 5 seconds
export default defineConfig({
  output: 'server',
  adapter: vercel({
    maxDuration: 5,
  }),
});
```

```js {7} filename="nitro.config.ts" framework=nuxt
import { defineNitroConfig } from 'nitropack';

// This function can run for a maximum of 5 seconds
export default defineNitroConfig({
  vercel: {
    functions: {
      maxDuration: 5,
    },
  },
});
```

```ts {7} filename="nitro.config.ts" framework=nuxt
import { defineNitroConfig } from 'nitropack';

// This function can run for a maximum of 5 seconds
export default defineNitroConfig({
  vercel: {
    functions: {
      maxDuration: 5,
    },
  },
});
```

```json {5,8} filename="vercel.json" framework=other
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "api/test.js": {
      "maxDuration": 30 // This function can run for a maximum of 30 seconds
    },
    "api/*.js": {
      "maxDuration": 15 // These functions can run for a maximum of 15 seconds
    }
  }
}
```

#### Other Frameworks and runtimes, Next.js versions older than 13.5, Go, Python, or Ruby

For these runtimes and frameworks, configure the `maxDuration` property of the [`functions` object](/docs/project-configuration#functions) in your `vercel.json` file:

```json {5,8,11} filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "api/test.js": {
      "maxDuration": 30 // This function can run for a maximum of 30 seconds
    },
    "api/*.js": {
      "maxDuration": 15 // This function can run for a maximum of 15 seconds
    },
    "src/api/*.js": {
      "maxDuration": 25 // You must prefix functions in the src directory with /src/
    }
  }
}
```

If your Next.js project is configured to use [src directory](https://nextjs.org/docs/app/building-your-application/configuring/src-directory), you will need to prefix your function routes with `/src/` for them to be detected.

> **💡 Note:** The order in which you specify file patterns is important. For more
> information, see [Glob
> pattern](/docs/project-configuration#glob-pattern-order).

## Extended max duration&#x20;

Pro and Enterprise teams can set individual Vercel Functions using supported Node.js and Python runtime versions to run for up to 30 minutes.

During the beta, durations above 800 seconds must be configured for each function in code or in `vercel.json`. Project-level defaults above 800 seconds are not supported yet.

Extended max duration is supported for the following runtimes during the beta:

- `nodejs20.x`
- `nodejs22.x`
- `nodejs24.x`
- `python3.12`
- `python3.13`
- `python3.14`

[Secure Compute](/docs/networking/secure-compute) and [Static IPs](/docs/networking/static-ips) do not support durations above 800 seconds during the beta.

> **💡 Note:** For long-running request handlers that keep a client connection open over
> HTTP/2, Vercel sends connection-level HTTP/2 `PING` frames while the response
> is idle. HTTP/1.1 does not have an equivalent protocol frame, so HTTP/1.1
> clients and intermediate network layers may still close idle connections. For
> those cases, stream progress or heartbeat data while work is running.

For Next.js App Router functions using a supported Node.js runtime, set `maxDuration` in the route file:

```ts {1} filename="app/api/long-task/route.ts" framework=nextjs-app
export const maxDuration = 1800; // This function can run for a maximum of 30 minutes

export async function POST(request: Request) {
  return Response.json({ ok: true });
}
```

For supported Node.js and Python functions outside Next.js App Router, set `maxDuration` for a specific function path in `vercel.json`:

```json {5} filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "api/long-task.py": {
      "maxDuration": 1800
    }
  }
}
```

## Setting a default maximum duration

While Vercel specifies [defaults](/docs/functions/limitations#max-duration) for the maximum duration of a function, you can also override it in the following ways:

### Dashboard

1. From your [dashboard](/dashboard), select your project and open **Settings** in the sidebar.
2. From the left side, open [**Functions**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions\&title=Go+to+Functions+Settings) in the sidebar and scroll to the **Function Max Duration** section.
3. Update the **Default Max Duration** field value and select **Save**.

The dashboard sets the project default. During the extended max duration beta, use [per-function configuration](#extended-max-duration) for durations above 800 seconds.

### `vercel.json` file

```json {4-5} filename="vercel.json" framework=nextjs-app
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "app/api/**/*": {
      "maxDuration": 5
    }
  }
}
```

```json {3-4} filename="pages/api/handler.js" framework=nextjs
{
  "functions": {
    "pages/api/**/*": {
      "maxDuration": 5
    }
  }
}
```

```json {4-5} filename="vercel.json" framework=remix
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "app/routes/**/*": {
      "maxDuration": 5 // All functions can run for a maximum of 5 seconds
    }
  }
}
```

```json {4-5} filename="vercel.json" framework=other
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "path/to/dir/**/*": {
      "maxDuration": 5 // All functions can run for a maximum of 5 seconds
    }
  }
}
```

This glob pattern will match *everything* in the specified path, so you may wish to be more specific by adding a file type, such as `app/api/**/*.ts` instead.

## Duration limits

Vercel Functions have the following defaults and maximum limits for the duration of a function with [fluid compute](/docs/fluid-compute) (enabled by default):

|            | Default          | Maximum | Extended maximum |
| ---------- | ---------------- | ------- | ---------------- |
| Hobby      | 300s (5 minutes) | 300s (5 minutes) | - |
| Pro        | 300s (5 minutes) | 800s | 1800s (30 minutes)  |
| Enterprise | 300s (5 minutes) | 800s | 1800s (30 minutes)  |

The 800 second maximum is generally available for Pro and Enterprise teams. For beta requirements and examples, see [extended max duration](#extended-max-duration).

Instead of a fixed number of seconds, you can set `maxDuration` to the string `"max"` to use your plan's maximum allowed duration. Vercel resolves `"max"` at deploy time, so your function uses the current plan limit without you tracking the exact value:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "api/long-task.js": {
      "maxDuration": "max"
    }
  }
}
```

Today, `"max"` resolves to your plan's generally available maximum: 800 seconds on Pro and Enterprise, and 300 seconds on Hobby. It does not opt your function into the [extended 1800-second maximum](#extended-max-duration), which is in beta and must be enabled separately.

> **💡 Note:** For workloads that require unlimited execution time, use [Vercel
> Workflows](/docs/workflows), which allow your code to pause, resume, and
> maintain state for minutes to months without duration limits.


---

[View full sitemap](/docs/sitemap)
