---
title: Getting started with Global Config
product: vercel
url: /docs/global-config/get-started
canonical_url: "https://vercel.com/docs/global-config/get-started"
last_updated: 2026-07-29
type: tutorial
prerequisites:
  - /docs/global-config
related:
  - /docs/cli
  - /docs/projects
  - /docs/global-config/using-global-config
  - /docs/global-config/global-config-limits
  - /docs/routing-middleware
summary: Learn how to create a Global Config store and read from it in your project.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config/get-started.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "039a015f63c6c040539f9db4d8e06a005bc108754b4e814f44e7138f7caefd4f"
---

# Getting started with Global Config

Global Config is a distributed key-value store that allows you to store and retrieve data on Vercel's global network, close to your users. It is designed for high performance and low latency, making it ideal for use cases such as feature flags, A/B testing, and dynamic configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Redirecting](https://nextjs.org/docs/app/guides/redirecting?from=related) — Learn the different ways to handle redirects in Next.js.
- [Redirecting](https://nextjs.org/docs/pages/guides/redirecting?from=related) — Learn the different ways to handle redirects in Next.js.
- [LaunchDarkly](https://vercel.com/docs/global-config/global-config-integrations/launchdarkly-global-config?from=related) — Learn how to use Global Config with Vercel's LaunchDarkly integration.
- [DevCycle](https://vercel.com/docs/global-config/global-config-integrations/devcycle-global-config?from=related) — Learn how to use Global Config with Vercel's DevCycle integration.
- [Statsig](https://vercel.com/docs/global-config/global-config-integrations/statsig-global-config?from=related) — Learn how to use Global Config with Vercel's Statsig integration.
- [vercel global-config](https://vercel.com/docs/cli/global-config?from=related) — Manage Global Config stores from the Vercel CLI: list, create, inspect, update, remove, and manage items, read tokens, a
- [Overview](https://vercel.com/docs/storage?from=related) — Store large files and global configuration with Vercel's storage products.

Full cross-link map for this page: [/docs/global-config/get-started.graph.md](/docs/global-config/get-started.graph.md)
<!-- /docsgraph:related -->

This guide will help you create a Global Config called `hello_world_store` at the project-level, through the Vercel [dashboard](/dashboard). A token and environment variable `GLOBAL_CONFIG`, that stores the connection string, will be automatically created for you. You'll update the store with a key-value data pair and read the value of `"greeting"` from a local Next.js project.

## Prerequisites

- Install the Global Config SDK:
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
- An existing project. This quickstart uses Next.js, but you can use any supported framework with Global Config storage
- [Install](/docs/cli#installing-vercel-cli) or [update](/docs/cli#updating-vercel-cli) to the latest version of Vercel CLI

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i vercel
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i vercel
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i vercel
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i vercel
    ```
  </Code>
</CodeBlock>

- ### Create a Global Config store
  Navigate to the [Project](/docs/projects) you'd like to add a Global Config store to. Click on [**Storage**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fstores\&title=Go+to+Storage), then click the **Create Database** button. Select **Global Config** and click **Continue**.

  Create a new store by typing `hello_world_store` under **Global Config** in the dialog that opens, and click **Create**.
  > **💡 Note:** The name can only contain alphanumeric letters, "\_" and "-". It cannot exceed
  > 32 characters.

- ### Review what was created
  Once created, select `hello_world_store` to see a summary of what was created for you. Notice the following:
  - If you select **Project**, you'll see that your project was connected to the Global Config by using an environment variable. If you go to your project's **Settings > Environment Variables**, you'll see the newly created environment variable.
  - If you select **Tokens**, you'll see a [read access token](/docs/global-config/using-global-config#creating-a-read-access-token). This token, along with your **GLOBAL CONFIG ID**, is used to create a [connection string](/docs/global-config/using-global-config#using-a-connection-string). This connection string is saved as the value of your `GLOBAL_CONFIG` environment variable. This enables you to use the SDK in your project to read the store's contents.
  > **💡 Note:** If you're creating a project at the account-level, we won't automatically
  > create a token, connection string, and environment variable until a project
  > has been connected.

- ### Add a key-value pair
  Under **Items**, add the following key-value pair and click **Save Items**:
  ```json
  {
    "greeting": "hello world"
  }
  ```
  You can see more information about what can be stored in a Global Config in the [limits](/docs/global-config/global-config-limits) documentation.

- ### Connect your Vercel project
  Once you've created the store, you need to set up your project to read the contents of the store. This is detailed under **Learn how to use this in code** in the dashboard, but is described in the following steps in more detail.

  On your local machine, connect your Vercel Project. If you haven't already, install the Global Config SDK, as mentioned in [prerequisites](#prerequisites).

- ### Pull the latest environment variables
  Using Vercel CLI, pull the latest environment variables, specifically `GLOBAL_CONFIG`, so that it's available to your project locally:
  ```bash filename="terminal"
  vercel env pull
  ```

- ### Create a Middleware
  Create a [Middleware](/docs/routing-middleware) for your project by creating a new file called `middleware.js` at the root of the project and if using Next.js, add the following code:
  ```ts filename="middleware.ts" framework=all
  import { NextResponse } from 'next/server';
  import { get } from '@vercel/global-config';

  export const config = { matcher: '/welcome' };

  export async function middleware() {
    const greeting = await get('greeting');
    return NextResponse.json(greeting);
  }
  ```
  ```js filename="middleware.js" framework=all
  import { NextResponse } from 'next/server';
  import { get } from '@vercel/global-config';

  export const config = { matcher: '/welcome' };

  export async function middleware() {
    const greeting = await get('greeting');
    return NextResponse.json(greeting);
  }
  ```
  > **💡 Note:** `NextResponse.json` requires at least Next v13.1 or enabling
  > `experimental.allowMiddlewareResponseBody` in `next.config.js`.

- ### Run your application locally
  Run your application locally and visit `localhost:3000/welcome` to see your greeting. The middleware intercepts requests to `localhost:3000/welcome` and responds with a greeting, read from your Global Config store.

Your project is now ready to read more key-value data pairs from the `hello_world_store` Global Config using the [SDK](/docs/global-config/global-config-sdk) or [Vercel REST API](/docs/global-config/vercel-api).

> **💡 Note:** Your Global Config uses the public internet for reads when you develop locally.
> Therefore, you will see higher response times. However, when you deploy your
> application to Vercel, the reads are optimized to happen at ultra low latency
> without any network requests.

## Next steps

Now that you've created a Global Config store and read from it, you can explore the following:

- [Creating the Global Config at the account level](/docs/global-config/global-config-dashboard#at-the-account-level)
- [Creating a read access token](/docs/global-config/using-global-config#creating-a-read-access-token)
- [Setting up a connection string](/docs/global-config/using-global-config#using-a-connection-string)
- [Learn about the `@vercel/global-config` package](https://github.com/vercel/storage/tree/main/packages/global-config#readme)
- [Explore the SDK](/docs/global-config/global-config-sdk)


---

[View full sitemap](/docs/sitemap)
