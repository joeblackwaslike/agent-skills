---
title: Get Started with BotID
product: vercel
url: /docs/botid/get-started
canonical_url: "https://vercel.com/docs/botid/get-started"
last_updated: 2026-06-08
type: tutorial
prerequisites:
  - /docs/botid
related:
  - /docs/projects/managing-projects
  - /docs/botid/local-development-behavior
  - /docs/botid/verify-on-page-load
summary: Step-by-step guide to setting up BotID protection in your Vercel project
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/botid/get-started.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "62554f0e2259f37fcf32a973c998366360282a590b79d78f986945e112ad2ea4"
---

# Get Started with BotID

This guide shows you how to add BotID protection to your Vercel project. BotID blocks automated bots while allowing real users through, protecting your APIs, forms, and sensitive endpoints from abuse.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Improved fake hardware detection with Vercel BotID](https://vercel.com/changelog/botid-deep-analysis-model-improved-for-fake-hardware-detection)
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [How to protect your AI endpoints with Vercel BotID](https://vercel.com/kb/guide/protect-ai-endpoints-with-vercel-botid) — Gate every request to your AI endpoints with Vercel BotID and checkBotId\\(\\) so inference runs only for verified callers
- [Vercel BotID vs Cloudflare Turnstile](https://vercel.com/kb/guide/vercel-botid-vs-cloudflare-turnstile) — Compare Vercel BotID and Cloudflare Turnstile for bot protection, including detection model, hosting requirements, check
- [The AI Cloud: A unified platform for AI workloads](https://vercel.com/blog/the-ai-cloud-a-unified-platform-for-ai-workloads)
- [Making your catalog discoverable to AI agents](https://vercel.com/kb/guide/agentic-commerce-readiness) — Agentic commerce readiness starts with the initial HTML response. Server-render your product catalog, ship JSON-LD, and
- [Vercel BotID now leverages Vercel's verified bot directory](https://vercel.com/changelog/vercel-botid-now-leverages-vercels-verified-bot-directory)
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Redacting Sensitive Data from Web Analytics Events](https://vercel.com/docs/analytics/redacting-sensitive-data) — Learn how to redact sensitive data from your Web Analytics events.

Full cross-link map for this page: [/docs/botid/get-started.graph.md](/docs/botid/get-started.graph.md)
<!-- /docsgraph:related -->

The setup involves client-side protection to attach BotID headers and server-side verification with `checkBotId()`.

## Step by step guide

Before setting up BotID, ensure you have **a JavaScript [project deployed](/docs/projects/managing-projects#creating-a-project) on Vercel**.

Vercel automatically routes BotID challenge and detection requests. You don't need the `withBotId` wrapper in your Next.js configuration, the `botid/nuxt` module, or manual BotID rewrites in `vercel.json`. Existing BotID rewrites can be removed. Keep the client-side and server-side setup below.

- ### Install the package
  Add BotID to your project:

  **pnpm**
  ```bash
  pnpm i botid
  ```
  **yarn**
  ```bash
  yarn add botid
  ```
  **npm**
  ```bash
  npm i botid
  ```
  **bun**
  ```bash
  bun add botid
  ```

- ### Add client-side protection
  Choose the appropriate method for your framework:
  - **Next.js 15.3+**: Use `initBotId()` in `instrumentation-client.ts` for optimal performance
  - **Other Next.js**: Mount the `<BotIdClient/>` component in your layout `head`
  - **Other frameworks**: Call `initBotId()` during application initialization
  > For \['nextjs-app']:
  **Next.js 15.3+ (Recommended)**
  > **💡 Note:** We recommend using `initBotId()` in
  > [`instrumentation-client.ts`](https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client)
  > for better performance in Next.js 15.3+. For earlier versions, use the React
  > component approach.
  ```ts filename="instrumentation-client.ts" framework=nextjs-app
  import { initBotId } from 'botid/client/core';

  // Define the paths that need bot protection.
  // These are paths that are routed to by your app.
  // These can be:
  // - API endpoints (e.g., '/api/checkout')
  // - Server actions invoked from a page (e.g., '/dashboard')
  // - Dynamic routes (e.g., '/api/create/*')

  initBotId({
    protect: [
      {
        path: '/api/checkout',
        method: 'POST',
      },
      {
        // Wildcards can be used to expand multiple segments
        // /team/*/activate will match
        // /team/a/activate
        // /team/a/b/activate
        // /team/a/b/c/activate
        // ...
        path: '/team/*/activate',
        method: 'POST',
      },
      {
        // Wildcards can also be used at the end for dynamic routes
        path: '/api/user/*',
        method: 'POST',
      },
    ],
  });
  ```
  ```js filename="instrumentation-client.js" framework=nextjs-app
  import { initBotId } from 'botid/client/core';

  // Define the paths that need bot protection.
  // These are paths that are routed to by your app.
  // These can be:
  // - API endpoints (e.g., '/api/checkout')
  // - Server actions invoked from a page (e.g., '/dashboard')
  // - Dynamic routes (e.g., '/api/create/*')

  initBotId({
    protect: [
      {
        path: '/api/checkout',
        method: 'POST',
      },
      {
        // Wildcards can be used to expand multiple segments
        // /team/*/activate will match
        // /team/a/activate
        // /team/a/b/activate
        // /team/a/b/c/activate
        // ...
        path: '/team/*/activate',
        method: 'POST',
      },
      {
        // Wildcards can also be used at the end for dynamic routes
        path: '/api/user/*',
        method: 'POST',
      },
    ],
  });
  ```
  **Next.js < 15.3**
  ```tsx filename="app/layout.tsx" framework=nextjs-app
  import { BotIdClient } from 'botid/client';
  import { ReactNode } from 'react';

  const protectedRoutes = [
    {
      path: '/api/checkout',
      method: 'POST',
    },
  ];

  type RootLayoutProps = {
    children: ReactNode;
  };

  export default function RootLayout({ children }: RootLayoutProps) {
    return (
      <html lang="en">
        <head>
          <BotIdClient protect={protectedRoutes} />
        </head>
        <body>{children}</body>
      </html>
    );
  }
  ```
  ```jsx filename="app/layout.js" framework=nextjs-app
  import { BotIdClient } from 'botid/client';

  const protectedRoutes = [
    {
      path: '/api/checkout',
      method: 'POST',
    },
  ];

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <BotIdClient protect={protectedRoutes} />
        </head>
        <body>{children}</body>
      </html>
    );
  }
  ```
  ```ts filename="plugins/botid.client.ts" framework=nuxt
  import { initBotId } from 'botid/client/core';

  export default defineNuxtPlugin({
    enforce: 'pre',
    setup() {
      initBotId({
        protect: [{ path: '/api/post-data', method: 'POST' }],
      });
    },
  });
  ```
  ```js filename="plugins/botid.client.js" framework=nuxt
  import { initBotId } from 'botid/client/core';

  export default defineNuxtPlugin({
    enforce: 'pre',
    setup() {
      initBotId({
        protect: [{ path: '/api/post-data', method: 'POST' }],
      });
    },
  });
  ```
  ```ts filename="src/hooks.client.ts" framework=sveltekit
  import { initBotId } from 'botid/client/core';

  export function init() {
    initBotId({
      protect: [
        {
          path: '/api/post-data',
          method: 'POST',
        },
      ],
    });
  }
  ```
  ```js filename="src/hooks.client.js" framework=sveltekit
  import { initBotId } from 'botid/client/core';

  export function init() {
    initBotId({
      protect: [
        {
          path: '/api/post-data',
          method: 'POST',
        },
      ],
    });
  }
  ```
  ```ts filename="client.ts" framework=other
  import { initBotId } from 'botid/client/core';

  export function init() {
    initBotId({
      protect: [
        {
          path: '/api/post-data',
          method: 'POST',
        },
      ],
    });
  }
  ```
  ```js filename="client.js" framework=other
  import { initBotId } from 'botid/client/core';

  export function init() {
    initBotId({
      protect: [
        {
          path: '/api/post-data',
          method: 'POST',
        },
      ],
    });
  }
  ```

- ### Perform BotID checks on the server
  Use `checkBotId()` on the routes configured in the `<BotIdClient/>` component.
  > **💡 Note:** **Important configuration requirements:** - Not adding the protected route to
  > `<BotIdClient />` will result in `checkBotId()` failing. The client side
  > component dictates which requests to attach special headers to for
  > classification purposes. - Local development always returns `isBot: false`
  > unless you configure the `developmentOptions` option on `checkBotId()`. [Learn
  > more about local development
  > behavior](/docs/botid/local-development-behavior).
  > For \['nextjs-app']:
  **Using API routes**
  ```ts filename="app/api/sensitive/route.ts" framework=nextjs-app
  import { checkBotId } from 'botid/server';
  import { NextRequest, NextResponse } from 'next/server';

  export async function POST(request: NextRequest) {
    const verification = await checkBotId();

    if (verification.isBot) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const data = await processUserRequest(request);

    return NextResponse.json({ data });
  }

  async function processUserRequest(request: NextRequest) {
    // Your business logic here
    const body = await request.json();
    // Process the request...
    return { success: true };
  }
  ```
  ```js filename="app/api/sensitive/route.js" framework=nextjs-app
  import { checkBotId } from 'botid/server';
  import { NextResponse } from 'next/server';

  export async function POST(request) {
    const verification = await checkBotId();

    if (verification.isBot) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const data = await processUserRequest(request);

    return NextResponse.json({ data });
  }

  async function processUserRequest(request) {
    // Your business logic here
    const body = await request.json();
    // Process the request...
    return { success: true };
  }
  ```
  **Using Server Actions**
  ```ts filename="app/actions/create-user.ts" framework=nextjs-app
  'use server';

  import { checkBotId } from 'botid/server';

  export async function createUser(formData: FormData) {
    const verification = await checkBotId();

    if (verification.isBot) {
      throw new Error('Access denied');
    }

    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    };

    const user = await saveUser(userData);
    return { success: true, user };
  }

  async function saveUser(userData: { name: string; email: string }) {
    // Your database logic here
    console.log('Saving user:', userData);
    return { id: '123', ...userData };
  }
  ```
  ```js filename="app/actions/create-user.js" framework=nextjs-app
  'use server';

  import { checkBotId } from 'botid/server';

  export async function createUser(formData) {
    const verification = await checkBotId();

    if (verification.isBot) {
      throw new Error('Access denied');
    }

    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
    };

    const user = await saveUser(userData);
    return { success: true, user };
  }

  async function saveUser(userData) {
    // Your database logic here
    console.log('Saving user:', userData);
    return { id: '123', ...userData };
  }
  ```
  ```ts filename="sensitive.posts.ts" framework=nuxt
  import { checkBotId } from 'botid/server';

  export default defineEventHandler(async (event) => {
    const verification = await checkBotId();

    if (verification.isBot) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied',
      });
    }

    const data = await processUserRequest(event);

    return { data };
  });

  async function processUserRequest(event: any) {
    // Your business logic here
    const body = await readBody(event);
    // Process the request...
    return { success: true };
  }
  ```
  ```js filename="sensitive.posts.js" framework=nuxt
  import { checkBotId } from 'botid/server';

  export default defineEventHandler(async (event) => {
    const verification = await checkBotId();

    if (verification.isBot) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied',
      });
    }

    const data = await processUserRequest(event);

    return { data };
  });

  async function processUserRequest(event) {
    // Your business logic here
    const body = await readBody(event);
    // Process the request...
    return { success: true };
  }
  ```
  ```ts filename="+server.ts" framework=sveltekit
  import { checkBotId } from 'botid/server';
  import { json, error } from '@sveltejs/kit';
  import type { RequestHandler } from './$types';

  export const POST: RequestHandler = async ({ request }) => {
    const verification = await checkBotId();

    if (verification.isBot) {
      throw error(403, 'Access denied');
    }

    const data = await processUserRequest(request);

    return json({ data });
  };

  async function processUserRequest(request: Request) {
    // Your business logic here
    const body = await request.json();
    // Process the request...
    return { success: true };
  }
  ```
  ```js filename="+server.js" framework=sveltekit
  import { checkBotId } from 'botid/server';
  import { json, error } from '@sveltejs/kit';

  /** @type {import('./$types').RequestHandler} */
  export const POST = async ({ request }) => {
    const verification = await checkBotId();

    if (verification.isBot) {
      throw error(403, 'Access denied');
    }

    const data = await processUserRequest(request);

    return json({ data });
  };

  async function processUserRequest(request) {
    // Your business logic here
    const body = await request.json();
    // Process the request...
    return { success: true };
  }
  ```
  ```ts filename="api/sensitive.ts" framework=other
  import { checkBotId } from 'botid/server';

  export async function POST(request: Request) {
    const verification = await checkBotId();

    if (verification.isBot) {
      return Response.json({ error: 'Access denied' }, { status: 403 });
    }

    const data = await processUserRequest(request);

    return Response.json({ data });
  }

  async function processUserRequest(request: Request) {
    // Your business logic here
    const body = await request.json();
    // Process the request...
    return { success: true };
  }
  ```
  ```js filename="api/sensitive.js" framework=other
  import { checkBotId } from 'botid/server';

  export async function POST(request) {
    const verification = await checkBotId();

    if (verification.isBot) {
      return Response.json({ error: 'Access denied' }, { status: 403 });
    }

    const data = await processUserRequest(request);

    return Response.json({ data });
  }

  async function processUserRequest(request) {
    // Your business logic here
    const body = await request.json();
    // Process the request...
    return { success: true };
  }
  ```
  > **💡 Note:** BotID actively runs JavaScript on page sessions and sends headers to the
  > server. If you test with `curl` or visit a protected route directly, BotID
  > will block you in production. To effectively test, make a `fetch` request from
  > a page in your application to the protected route.

- ### Enable BotID deep analysis in Vercel (Recommended)
  > BotID Deep Analysis are available on Enterprise and Pro plans
  From the [Vercel dashboard](/dashboard)
  - Select your Project
  - Click the **Firewall** tab
  - Click **Rules**
  - Enable **Vercel BotID Deep Analysis**
  [Go to Firewall Rules](/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall%2Frules\&title=Open+Firewall+Rules)

## Complete examples

### Next.js App Router example

Client-side code for the BotID Next.js implementation:

```tsx filename="app/checkout/page.tsx"
'use client';

import { useState } from 'react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({
          product: formData.get('product'),
          quantity: formData.get('quantity'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const data = await response.json();
      setMessage('Checkout successful!');
    } catch (error) {
      setMessage('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleCheckout}>
      <input name="product" placeholder="Product ID" required />
      <input name="quantity" type="number" placeholder="Quantity" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Checkout'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
```

Server-side code for the BotID Next.js implementation:

```ts filename="app/api/checkout/route.ts"
import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Check if the request is from a bot
  const verification = await checkBotId();

  if (verification.isBot) {
    return NextResponse.json(
      { error: 'Bot detected. Access denied.' },
      { status: 403 },
    );
  }

  // Process the legitimate checkout request
  const body = await request.json();

  // Your checkout logic here
  const order = await processCheckout(body);

  return NextResponse.json({
    success: true,
    orderId: order.id,
  });
}

async function processCheckout(data: any) {
  // Implement your checkout logic
  return { id: 'order-123' };
}
```

## Verify visitors on page load

To verify a browser before a later interaction, review [verify visitors on page load and issue a signed verification cookie](/docs/botid/verify-on-page-load). Your server can validate that cookie on subsequent requests until it expires.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
