---
title: Configuring Maximum Duration for Vercel Functions
product: vercel
url: /docs/functions/configuring-functions/duration
canonical_url: "https://vercel.com/docs/functions/configuring-functions/duration"
last_updated: 2026-07-01
type: how-to
prerequisites:
  - /docs/functions/configuring-functions
  - /docs/functions
related:
  - /docs/fluid-compute
  - /docs/functions/usage-and-pricing
  - /docs/functions/limitations
  - /docs/project-configuration/vercel-json
  - /docs/networking/secure-compute
summary: Learn how to set the maximum duration of a Vercel Function.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/configuring-functions/duration.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "9ea1200886d58bd0c47ea99c51765820a80000fbb7fb007b7c9d84a9ea4268b4"
---

# Configuring Maximum Duration for Vercel Functions

The maximum duration configuration determines the longest time that a function can run. You can configure the maximum duration for Vercel Functions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Getting Timeouts When Deploying on Vercel](https://ai-sdk.dev/docs/troubleshooting/timeout-on-vercel?from=related)
- [Building an AI chat app with RAG and source citations on Vercel](https://vercel.com/kb/guide/building-ai-chat-app-with-rag-and-citations-on-vercel?from=related) — A production stack for AI chat with retrieval, reranking, source citations, and background ingestion on Vercel using Nex
- [How can I reduce my Vercel Functions usage on Vercel?](https://vercel.com/kb/guide/how-can-i-reduce-my-serverless-execution-usage-on-vercel?from=related) — Reduce Vercel Functions usage and cost under Fluid compute pricing with caching, rendering strategies, and function conf
- [How to build AI Agents with Vercel and the AI SDK](https://vercel.com/kb/guide/how-to-build-ai-agents-with-vercel-and-the-ai-sdk?from=related) — Learn how to build, deploy, and scale AI agents on Vercel using the AI SDK. This guide covers calling LLMs, defining too
- [Production architecture for a RAG chatbot on Vercel](https://vercel.com/kb/guide/rag-chatbot-production-architecture-on-vercel?from=related) — Architect a production RAG chatbot on Vercel Functions with Fluid compute, AI Gateway, and a region-pinned vector store.
- [Build a real-time chat app with WebSockets on Vercel](https://vercel.com/kb/guide/real-time-chat-websockets?from=related) — Build and deploy a single-room messaging app in Next.js with real-time chat, typing indicators, and live online user cou
- [Limits](https://vercel.com/docs/limits?from=related) — Look up account limits, usage summaries, rate limits, and resource constraints for every Vercel plan.
- [Advanced Configuration](https://vercel.com/docs/functions/configuring-functions/advanced-configuration?from=related) — Learn how to add utility files to the /api directory, and bundle Vercel Functions.
- [Node.js](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package?from=related) — Learn about available APIs when working with Vercel Functions.
- [Hobby Plan](https://vercel.com/docs/plans/hobby?from=related) — Learn about the Hobby plan and how it compares to the Pro plan.
- [Production Checklist](https://vercel.com/docs/production-checklist?from=related) — Ensure your application is ready for launch with this comprehensive production checklist by the Vercel engineering team.

Full cross-link map for this page: [/docs/functions/configuring-functions/duration.graph.md](/docs/functions/configuring-functions/duration.graph.md)
<!-- /docsgraph:related -->

## Consequences of changing the maximum duration

Changing the maximum duration gives an invocation more time before Vercel terminates it. With [fluid compute](/docs/fluid-compute), Vercel can reuse function instances and process multiple invocations in the same instance with [optimized concurrency](/docs/fluid-compute#optimized-concurrency). Provisioned memory is billed for running instances, not as a separate memory allocation for every request. Active CPU billing applies while your code is executing, and pauses while your function is waiting on I/O. To learn more, see [how pricing works](/docs/functions/usage-and-pricing#how-pricing-works).

For this reason, Vercel has set a [default maximum duration](/docs/functions/limitations#max-duration) for functions, which can be useful for preventing runaway functions from consuming resources indefinitely.

If a function runs for longer than its set maximum duration, Vercel will terminate it. Therefore, when setting this duration, it's crucial to strike a balance:

1. Allow sufficient time for your function to complete its normal operations, including any necessary waiting periods (for example, streamed responses).
2. Set a reasonable limit to prevent abnormally long executions.

## Maximum duration for different runtimes

The method of configuring the maximum duration depends on your framework and runtime:

#### Node.js, Next.js (>= 13.5 or higher), SvelteKit, Astro, Nuxt, and Remix

Configure the duration in your function definition.
For example, Next.js pages router and Node.js /api routes use an exported config object, while the Next.js app router uses a named maxDuration export.

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

```ts {3-5} filename="api/my-function.ts" framework=other
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  maxDuration: 500, // This function can run for a maximum of 500 seconds
};

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  response.status(200).json({ message: 'Hello from Vercel!' });
}
```

```js {1-3} filename="api/my-function.js" framework=other
export const config = {
  maxDuration: 500, // This function can run for a maximum of 500 seconds
};

export default function handler(request, response) {
  response.status(200).json({ message: 'Hello from Vercel!' });
}
```

#### Other Frameworks and runtimes, Next.js versions older than 13.5, Rust, Go, Python, or Ruby

For these runtimes and frameworks, configure the `maxDuration` property of the [`functions` object](/docs/project-configuration/vercel-json#functions) in your `vercel.json` file:

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

If your Next.js project is configured to use [src directory](https://nextjs.org/docs/app/api-reference/file-conventions/src-folder), you will need to prefix your function routes with `/src/` for them to be detected.

For Python framework apps (FastAPI, Flask, or Django), the whole app builds into a single Vercel Function from its resolved entrypoint. Key the `functions` entry on that entrypoint file (for example `app/main.py` or `myproject/wsgi.py`):

```json {5} filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "functions": {
    "app/main.py": {
      "maxDuration": 60
    }
  }
}
```

> **💡 Note:** The order in which you specify file patterns is important. For more
> information, see [Glob
> pattern](/docs/project-configuration/vercel-json#functions).

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

For Python framework apps, key the entry on the resolved entrypoint file (for example `app/main.py`) instead of an `/api` route.

## Setting a default maximum duration

While Vercel specifies [defaults](/docs/functions/limitations#max-duration) for the maximum duration of a function, you can also override it in the following ways:

### Dashboard

1. From your [dashboard](/dashboard), select your project and open **Settings** in the sidebar.
2. From the left side, open [**Functions**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ffunctions\&title=Go+to+Functions+Settings) in the sidebar and scroll to the **Function Max Duration** section.
3. Update the **Default Max Duration** field value and select **Save**.

The dashboard sets the project default. During the extended max duration beta, use [per-function configuration](#extended-max-duration-beta) for durations above 800 seconds.

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

The 800 second maximum is generally available for Pro and Enterprise teams. For beta requirements and examples, see [extended max duration](#extended-max-duration-beta).

> **💡 Note:** For workloads that require unlimited execution time, use [Vercel
> Workflows](/docs/workflows), which allow your code to pause, resume, and
> maintain state for minutes to months without duration limits.


---

[View full sitemap](/docs/sitemap)
