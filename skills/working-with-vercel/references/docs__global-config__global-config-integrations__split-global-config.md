---
title: Using Global Config with Split
product: vercel
url: /docs/global-config/global-config-integrations/split-global-config
canonical_url: "https://vercel.com/docs/global-config/global-config-integrations/split-global-config"
last_updated: 2026-07-29
type: tutorial
prerequisites:
  - /docs/global-config/global-config-integrations
  - /docs/global-config
related:
  - /docs/cli
  - /docs/projects
  - /docs/global-config/get-started
  - /docs/global-config/global-config-sdk
  - /docs/global-config/global-config-dashboard
summary: "Learn how to use Global Config with Vercel's Split integration."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config/global-config-integrations/split-global-config.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "b765cbd593dcb1c0c2d9d950fe325945f569abe656bcab5a969c4c8bc1c75bea"
---

# Using Global Config with Split

This guide will help you get started with using Vercel's Split integration with Global Config. This integration allows you to use Global Config as a configuration source for your Split feature flags.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Backend for Frontend](https://nextjs.org/docs/app/guides/backend-for-frontend?from=related) — Learn how to use Next.js as a backend framework
- [route.js](https://nextjs.org/docs/app/api-reference/file-conventions/route?from=related) — API reference for the route.js special file.
- [Build a Claude Managed Agent with Vercel Sandbox](https://vercel.com/kb/guide/run-claude-managed-agent-tools-with-vercel-sandbox?from=related) — Build a Claude Managed Agent with Vercel Sandbox: each session runs in a fresh microVM with credential brokering and a w
- [Version 15](https://nextjs.org/docs/app/guides/upgrading/version-15?from=related) — Upgrade your Next.js Application from Version 14 to 15.
- [@vercel/analytics](https://vercel.com/docs/analytics/package?from=related) — With the @vercel/analytics npm package, you are able to configure your application to send analytics data to Vercel.
- [API](https://vercel.com/docs/routing-middleware/api?from=related) — Learn how you can use Routing Middleware, code that executes before a request is processed on a site, to provide speed a
- [CDN Cache](https://vercel.com/docs/caching/cdn-cache?from=related) — Learn how Vercel's CDN cache stores your content across a global network to reduce latency and origin load.
- [DevCycle](https://vercel.com/docs/global-config/global-config-integrations/devcycle-global-config?from=related) — Learn how to use Global Config with Vercel's DevCycle integration.
- [Client Uploads](https://vercel.com/docs/vercel-blob/client-upload?from=related) — Learn how to upload files larger than 4.5 MB directly from the browser to Vercel Blob

Full cross-link map for this page: [/docs/global-config/global-config-integrations/split-global-config.graph.md](/docs/global-config/global-config-integrations/split-global-config.graph.md)
<!-- /docsgraph:related -->

> **🔒 Permissions Required**: The Split Global Config integration

Split is a feature flag provider that tracks event data, enabling you to release features, target them to audiences, and measure their impact on customer experience metrics securely.

The Split Global Config integration enables you to write your [Split rollout plan](https://help.split.io/hc/en-us/articles/9805284145549-Creating-a-rollout-plan "Rollout Plan") to a Global Config. Doing so will allow you to evaluate feature flags at ultra-low latency with Vercel's CDN while tracking events and impressions data with Split.

## Prerequisites

Before using this integration, you should have:

1. The latest version of Vercel CLI. To check your version, use `vercel --version`. To [install](/docs/cli#installing-vercel-cli) or update Vercel CLI, use:
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
2. A project. If you don't have one, you can run the following terminal commands to create a Next project:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i 
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i 
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i 
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i 
    ```
  </Code>
</CodeBlock>

1. A Vercel project. If you don't have one, see [Creating a Project](/docs/projects#creating-a-project)
2. A Global Config. If you don't have one, follow [the Global Config quickstart](/docs/global-config/get-started)
3. The Global Config SDK:
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

> **💡 Note:** To configure this integration, Split Admin access (Split Admin users can add
> feature flags and segments, and edit them at will) is required.

- ### Set up the Split integration
  Visit [the Split page in the Vercel Integration Marketplace](/marketplace/split) and select the **Add Integration** button. From the Integration dialog:
  1. Select a Vercel team and project to connect the integration to
  2. Log into Split
  3. Select the **[Split Environment](https://developer.harness.io/docs/feature-management-experimentation/integrations/vercel/)** you want to use
  4. Select an existing Global Config or create a new one
  5. Copy the Global Config item key provided on this page. You'll need it to add it to your Environment Variables
  > **💡 Note:** You can also find your Global Config Split item key in [your dashboard on
  > Vercel](/dashboard/integrations). In the  section in the sidebar,
  > select , then select  on the
  > integration page. You should see the item key on the page that opens.

- ### Create your feature flags
  If you already have existing feature flags, you can skip this step and use those. In this example, we'll create one called `New_Marketing_Page`. You can set the user targeting to Joe and Bobby.

  To create a feature flag in Split:
  1. Log into your [Split management console](https://app.split.io/login) and select the workspace icon near the top-left of the page
  2. In the sidebar, under **Target**, select **Feature flags**. Add the name `New_Marketing_Page`, and set the traffic type to `user`. Select **Create** to finish
  3. With your feature flag created, select the feature flag and open **Definition** in the sidebar. Select **Initiate Environment** to configure your flag
  4. Add valid users to the feature flag
  5. Scroll down to **Targeting** and select **Add new individual target**
  6. Under **To user**, add any username you want to test. This example uses `Joe`.
  7. Select **Add new individual target**, then set the **Description** option to `off`. Add another username under **To user**. This example uses `Bobby`
  8. Select **Review Changes**, then **Create** to finish
  Next, you need to add your credentials to your project's local environment to use the Split integration in your code.

- ### Get your credentials
  Next, you'll add the following credentials to your Vercel project:
  - `SPLIT_SDK_CLIENT_API_KEY`
  - `EDGE_CONFIG_SPLIT_ITEM_KEY`
  - `GLOBAL_CONFIG`
  To add environment variables to your project, visit [your Vercel dashboard](/dashboard) and select the project you want to use the Split integration with. Then select **Settings** > **Environment Variables**.

  To get your Split client-side API keys:
  1. Log into your [Split management console](https://app.split.io/login) and select the workspace icon near the top-left of the page
  2. In the list of options that appears, select **Admin Settings**, then navigate to **API Keys** -> **SDK API Keys**
  3. Copy the client-side keys associated with the workspace and environment you're using
  To add your Global Config Split item key, if you didn't copy it after setting up the integration on Vercel:
  1. Visit [your dashboard on
     Vercel](/dashboard/integrations)
  2. In the **Integrations** section in the sidebar, select **Manage**
  3. On the integration page, select **Configure**
  4. You should see the item key on the page that opens. Copy it
  To add your Global Config's connection string to your project:
  1. Visit your project's page in [the dashboard](/dashboard)
  2. Open **Storage** in the sidebar. Select **Connect Store** and select the Global Config associated with your Split integration. The `GLOBAL_CONFIG` environment variable will be set automatically.
  Now you're ready to use the Split Global Config integration in your code.

- ### Use the Split integration in your code
  Open your project's code on your local machine and do the following:
  1. Install Split's Browser SDK, Vercel integration utilities, and Vercel's Global Config SDK:
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/global-config
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/global-config
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/global-config
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/global-config
      ```
    </Code>
  </CodeBlock>
  2. Create an API route in your project. The following example fetches a treatement based on which user is visiting. You can specify the user by appending `?userKey=Joe` or `?userKey=Bobby` to the URL when visiting the route:
  ```ts filename="app/api/marketing-example/route.ts" framework=nextjs-app
  import {
    SplitFactory,
    PluggableStorage,
    ErrorLogger,
  } from '@splitsoftware/splitio-browserjs';
  import { EdgeConfigWrapper } from '@splitsoftware/vercel-integration-utils';
  import { createClient } from '@vercel/global-config';

  export async function GET(request: Request) {
    const { EDGE_CONFIG_SPLIT_ITEM_KEY, SPLIT_SDK_CLIENT_API_KEY } = process.env;

    if (!SPLIT_SDK_CLIENT_API_KEY || !EDGE_CONFIG_SPLIT_ITEM_KEY)
      return new Response(
        `Failed to find your SDK Key (${SPLIT_SDK_CLIENT_API_KEY})
        or item key ${EDGE_CONFIG_SPLIT_ITEM_KEY}`,
      );

    const edgeConfigClient = createClient(process.env.GLOBAL_CONFIG);
    const { searchParams } = new URL(request.url);
    const userKey = searchParams.get('userKey') || 'anonymous';
    const client = SplitFactory({
      core: {
        authorizationKey: SPLIT_SDK_CLIENT_API_KEY,
        key: userKey,
      },
      mode: 'consumer_partial',
      storage: PluggableStorage({
        wrapper: EdgeConfigWrapper({
          // The Global Config item key where Split stores
          // feature flag definitions
          edgeConfigItemKey: EDGE_CONFIG_SPLIT_ITEM_KEY,
          // The Global Config client
          edgeConfig: edgeConfigClient,
        }),
      }),
      // Disable or keep only ERROR log level in production,
      // to minimize performance impact
      debug: ErrorLogger(),
    }).client();

    await new Promise((resolve) => {
      client.on(client.Event.SDK_READY, () => resolve);
      client.on(client.Event.SDK_READY_TIMED_OUT, () => resolve);
    });

    // Replace this with the feature flag you want
    const FEATURE_FLAG = 'New_Marketing_Page';
    const treatment = await client.getTreatment(FEATURE_FLAG);

    // Must await in app-router; waitUntil() is not
    // yet supported
    await client.destroy();

    // treatment will be 'control' if the SDK timed out
    if (treatment == 'control') return new Response('Control marketing page');

    return treatment === 'on'
      ? new Response('New marketing page')
      : new Response('Old marketing page');
  }
  ```
  ```js filename="app/api/marketing-example/route.js" framework=nextjs-app
  import {
    SplitFactory,
    PluggableStorage,
    ErrorLogger,
  } from '@splitsoftware/splitio-browserjs';
  import { EdgeConfigWrapper } from '@splitsoftware/vercel-integration-utils';
  import { createClient } from '@vercel/global-config';

  export async function GET(request) {
    const { EDGE_CONFIG_SPLIT_ITEM_KEY, SPLIT_SDK_CLIENT_API_KEY } = process.env;

    if (!SPLIT_SDK_CLIENT_API_KEY || !EDGE_CONFIG_SPLIT_ITEM_KEY)
      return new Response(
        `Failed to find your SDK Key (${SPLIT_SDK_CLIENT_API_KEY})
        or item key ${EDGE_CONFIG_SPLIT_ITEM_KEY}`,
      );

    const edgeConfigClient = createClient(process.env.GLOBAL_CONFIG);
    const { searchParams } = new URL(request.url);
    const userKey = searchParams.get('userKey') || 'anonymous';
    const client = SplitFactory({
      core: {
        authorizationKey: SPLIT_SDK_CLIENT_API_KEY,
        key: userKey,
      },
      mode: 'consumer_partial',
      storage: PluggableStorage({
        wrapper: EdgeConfigWrapper({
          // The Global Config item key where Split stores
          // feature flag definitions
          edgeConfigItemKey: EDGE_CONFIG_SPLIT_ITEM_KEY,
          // The Global Config client
          edgeConfig: edgeConfigClient,
        }),
      }),
      // Disable or keep only ERROR log level in production,
      // to minimize performance impact
      debug: ErrorLogger(),
    }).client();

    await new Promise((resolve) => {
      client.on(client.Event.SDK_READY, () => resolve);
      client.on(client.Event.SDK_READY_TIMED_OUT, () => resolve);
    });

    // Replace this with the feature flag you want
    const FEATURE_FLAG = 'New_Marketing_Page';
    const treatment = await client.getTreatment(FEATURE_FLAG);

    // Must await in app-router; waitUntil() is not
    // yet supported
    await client.destroy();

    // treatment will be 'control' if the SDK timed out
    if (treatment == 'control') return new Response('Control marketing page');

    return treatment === 'on'
      ? new Response('New marketing page')
      : new Response('Old marketing page');
  }
  ```
  ```ts filename="pages/api/marketing-example.ts" framework=nextjs
  import {
    SplitFactory,
    PluggableStorage,
    ErrorLogger,
  } from '@splitsoftware/splitio-browserjs';
  import { EdgeConfigWrapper } from '@splitsoftware/vercel-integration-utils';
  import { createClient } from '@vercel/global-config';
  import { NextFetchEvent } from 'next/server';

  export default async function handler(
    request: Request,
    context: NextFetchEvent,
  ) {
    const { EDGE_CONFIG_SPLIT_ITEM_KEY, SPLIT_SDK_CLIENT_API_KEY } = process.env;

    if (!SPLIT_SDK_CLIENT_API_KEY || !EDGE_CONFIG_SPLIT_ITEM_KEY)
      return new Response(
        `Failed to find your SDK Key (${SPLIT_SDK_CLIENT_API_KEY})
        or item key ${EDGE_CONFIG_SPLIT_ITEM_KEY}`,
      );

    const edgeConfigClient = createClient(process.env.GLOBAL_CONFIG);
    const { searchParams } = new URL(request.url);
    const userKey = searchParams.get('userKey') || 'anonymous';
    const client = SplitFactory({
      core: {
        authorizationKey: SPLIT_SDK_CLIENT_API_KEY,
        key: userKey,
      },
      mode: 'consumer_partial',
      storage: PluggableStorage({
        wrapper: EdgeConfigWrapper({
          // The Global Config item key where Split stores
          // feature flag definitions
          edgeConfigItemKey: EDGE_CONFIG_SPLIT_ITEM_KEY,
          // The Global Config client
          edgeConfig: edgeConfigClient,
        }),
      }),
      // Disable or keep only ERROR log level in production,
      // to minimize performance impact
      debug: ErrorLogger(),
    }).client();

    // Wait until
    await new Promise((resolve) => {
      client.on(client.Event.SDK_READY, () => resolve);
      client.on(client.Event.SDK_READY_TIMED_OUT, () => resolve);
    });

    // Replace this with the feature flag you want
    const FEATURE_FLAG = 'New_Marketing_Page';
    const treatment = await client.getTreatment(FEATURE_FLAG);

    // Must await in app-router; waitUntil() is not
    // yet supported

    context.waitUntil(client.destroy());
    // treatment will be 'control' if the SDK timed out
    if (treatment == 'control') return new Response('Control marketing page');

    return treatment === 'on'
      ? new Response('New marketing page')
      : new Response('Old marketing page');
  }
  ```
  ```js filename="pages/api/marketing-example.js" framework=nextjs
  import {
    SplitFactory,
    PluggableStorage,
    ErrorLogger,
  } from '@splitsoftware/splitio-browserjs';
  import { EdgeConfigWrapper } from '@splitsoftware/vercel-integration-utils';
  import { createClient } from '@vercel/global-config';

  export default async function handler(request, context) {
    const { EDGE_CONFIG_SPLIT_ITEM_KEY, SPLIT_SDK_CLIENT_API_KEY } = process.env;

    if (!SPLIT_SDK_CLIENT_API_KEY || !EDGE_CONFIG_SPLIT_ITEM_KEY)
      return new Response(
        `Failed to find your SDK Key (${SPLIT_SDK_CLIENT_API_KEY})
        or item key ${EDGE_CONFIG_SPLIT_ITEM_KEY}`,
      );

    const edgeConfigClient = createClient(process.env.GLOBAL_CONFIG);
    const { searchParams } = new URL(request.url);
    const userKey = searchParams.get('userKey') || 'anonymous';
    const client = SplitFactory({
      core: {
        authorizationKey: SPLIT_SDK_CLIENT_API_KEY,
        key: userKey,
      },
      mode: 'consumer_partial',
      storage: PluggableStorage({
        wrapper: EdgeConfigWrapper({
          // The Global Config item key where Split stores
          // feature flag definitions
          edgeConfigItemKey: EDGE_CONFIG_SPLIT_ITEM_KEY,
          // The Global Config client
          edgeConfig: edgeConfigClient,
        }),
      }),
      // Disable or keep only ERROR log level in production,
      // to minimize performance impact
      debug: ErrorLogger(),
    }).client();

    // Wait until
    await new Promise((resolve) => {
      client.on(client.Event.SDK_READY, () => resolve);
      client.on(client.Event.SDK_READY_TIMED_OUT, () => resolve);
    });

    // Replace this with the feature flag you want
    const FEATURE_FLAG = 'New_Marketing_Page';
    const treatment = await client.getTreatment(FEATURE_FLAG);

    // Must await in app-router; waitUntil() is not
    // yet supported

    context.waitUntil(client.destroy());
    // treatment will be 'control' if the SDK timed out
    if (treatment == 'control') return new Response('Control marketing page');

    return treatment === 'on'
      ? new Response('New marketing page')
      : new Response('Old marketing page');
  }
  ```
  ```ts filename="/api/marketing-example.ts" framework=other
  import {
    SplitFactory,
    PluggableStorage,
    ErrorLogger,
  } from '@splitsoftware/splitio-browserjs';
  import { EdgeConfigWrapper } from '@splitsoftware/vercel-integration-utils';
  import { RequestContext } from '@vercel/edge';
  import { createClient } from '@vercel/global-config';

  export default async function handler(
    request: Request,
    context: RequestContext,
  ) {
    const { EDGE_CONFIG_SPLIT_ITEM_KEY, SPLIT_SDK_CLIENT_API_KEY } = process.env;

    if (!SPLIT_SDK_CLIENT_API_KEY || !EDGE_CONFIG_SPLIT_ITEM_KEY)
      return new Response(
        `Failed to find your SDK Key (${SPLIT_SDK_CLIENT_API_KEY})
        or item key ${EDGE_CONFIG_SPLIT_ITEM_KEY}`,
      );

    const edgeConfigClient = createClient(process.env.GLOBAL_CONFIG);
    const { searchParams } = new URL(request.url);
    const userKey = searchParams.get('userKey') || 'anonymous';
    const client = SplitFactory({
      core: {
        authorizationKey: SPLIT_SDK_CLIENT_API_KEY,
        key: userKey,
      },
      mode: 'consumer_partial',
      storage: PluggableStorage({
        wrapper: EdgeConfigWrapper({
          // The Global Config item key where Split stores
          // feature flag definitions
          edgeConfigItemKey: EDGE_CONFIG_SPLIT_ITEM_KEY,
          // The Global Config client
          edgeConfig: edgeConfigClient,
        }),
      }),
      // Disable or keep only ERROR log level in production,
      // to minimize performance impact
      debug: ErrorLogger(),
    }).client();

    // Wait until
    await new Promise((resolve) => {
      client.on(client.Event.SDK_READY, () => resolve);
      client.on(client.Event.SDK_READY_TIMED_OUT, () => resolve);
    });

    // Replace this with the feature flag you want
    const FEATURE_FLAG = 'New_Marketing_Page';
    const treatment = await client.getTreatment(FEATURE_FLAG);

    // Must await in app-router; waitUntil() is not
    // yet supported

    context.waitUntil(client.destroy());
    // treatment will be 'control' if the SDK timed out
    if (treatment == 'control') return new Response('Control marketing page');

    return treatment === 'on'
      ? new Response('New marketing page')
      : new Response('Old marketing page');
  }
  ```
  ```js filename="pages/api/marketing-example.js" framework=other
    SplitFactory,
  import {
    PluggableStorage,
    ErrorLogger,
  } from '@splitsoftware/splitio-browserjs';
  import { EdgeConfigWrapper } from '@splitsoftware/vercel-integration-utils';
  import { createClient } from '@vercel/global-config';

  export default async function handler(request, context) {
    const { EDGE_CONFIG_SPLIT_ITEM_KEY, SPLIT_SDK_CLIENT_API_KEY } = process.env;

    if (!SPLIT_SDK_CLIENT_API_KEY || !EDGE_CONFIG_SPLIT_ITEM_KEY)
      return new Response(
        `Failed to find your SDK Key (${SPLIT_SDK_CLIENT_API_KEY})
        or item key ${EDGE_CONFIG_SPLIT_ITEM_KEY}`,
      );

    const edgeConfigClient = createClient(process.env.GLOBAL_CONFIG);
    const { searchParams } = new URL(request.url);
    const userKey = searchParams.get('userKey') || 'anonymous';
    const client = SplitFactory({
      core: {
        authorizationKey: SPLIT_SDK_CLIENT_API_KEY,
        key: userKey,
      },
      mode: 'consumer_partial',
      storage: PluggableStorage({
        wrapper: EdgeConfigWrapper({
          // The Global Config item key where Split stores
          // feature flag definitions
          edgeConfigItemKey: EDGE_CONFIG_SPLIT_ITEM_KEY,
          // The Global Config client
          edgeConfig: edgeConfigClient,
        }),
      }),
      // Disable or keep only ERROR log level in production,
      // to minimize performance impact
      debug: ErrorLogger(),
    }).client();

    // Wait until
    await new Promise((resolve) => {
      client.on(client.Event.SDK_READY, () => resolve);
      client.on(client.Event.SDK_READY_TIMED_OUT, () => resolve);
    });

    // Replace this with the feature flag you want
    const FEATURE_FLAG = 'New_Marketing_Page';
    const treatment = await client.getTreatment(FEATURE_FLAG);

    // Must await in app-router; waitUntil() is not
    // yet supported

    context.waitUntil(client.destroy());
    // treatment will be 'control' if the SDK timed out
    if (treatment == 'control') return new Response('Control marketing page');

    return treatment === 'on'
      ? new Response('New marketing page')
      : new Response('Old marketing page');
  }
  ```

- ### Test your code
  1. Start a local development server. If you're using Vercel CLI, enter the following command in the terminal:
  ```bash filename="terminal"
  vercel dev
  ```
  1. Navigate to <http://localhost:3000/api/split-example?userKey=Joe>. You should see either `New marketing page` or `Old marketing page` based on how your feature flags are configured in Split
     - Try changing the `userKey` search param's value to `Bobby`, or deleting it altogether, to see different responses when you visit the route

## Next steps

Now that you have set up the Split Global Config integration, you can explore the following topics to learn more:

- [Get started with Global Config](/docs/global-config/get-started)
- [Read with the SDK](/docs/global-config/global-config-sdk)
- [Use the dashboard](/docs/global-config/global-config-dashboard)
- [Global Config limits](/docs/global-config/global-config-limits)


---

[View full sitemap](/docs/sitemap)
