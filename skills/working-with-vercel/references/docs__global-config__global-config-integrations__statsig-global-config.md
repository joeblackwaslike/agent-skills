---
title: Using Global Config with Statsig
product: vercel
url: /docs/global-config/global-config-integrations/statsig-global-config
canonical_url: "https://vercel.com/docs/global-config/global-config-integrations/statsig-global-config"
last_updated: 2026-07-29
type: tutorial
prerequisites:
  - /docs/global-config/global-config-integrations
  - /docs/global-config
related:
  - /docs/cli
  - /docs/projects/overview
  - /docs/global-config/get-started
  - /docs/global-config/using-global-config
  - /docs/environment-variables
summary: "Learn how to use Global Config with Vercel's Statsig integration."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config/global-config-integrations/statsig-global-config.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "10e5624a2b71c84968c2c04232a7c3f07b9923f2232e64bbadcb18fd75644c7c"
---

# Using Global Config with Statsig

This guide will help you get started with using Vercel's Statsig integration with Global Config. This integration allows you to use Global Config as a configuration source for your Statsig feature flags.

Statsig is a statistics engine that enables you to automate A/B testing and make data-driven decisions at scale. The Statsig integration enables you to replace hard-coded values in your application with dynamic values on the server.

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

1. A Vercel project. If you don't have one, see [Creating a Project](/docs/projects/overview#creating-a-project)
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

- ### Set up the Statsig integration
  Visit [the Statsig page in the Integration Marketplace](/marketplace/statsig) and select the **Add Integration** button. Then:
  1. Select a Vercel team and Vercel project for your integration to be applied to
  2. Log into Statsig
  3. Select or create a new Global Config to connect to Statsig
  4. Statsig will provide you with a **[Connection String](/docs/global-config/using-global-config#using-a-connection-string "Connection String")** and **Global Config Item Key**. Save both, as you'll need them later in the setup

- ### Add your Environment Variables
  Navigate to [your Vercel dashboard](/dashboard), and select the project you want to use the Statsig integration with.

  Under the **Settings** tab, navigate to **Environment Variables**, and add the following variables:
  1. `GLOBAL_CONFIG`: Set this to the value of your Connection String
  2. `EDGE_CONFIG_ITEM_KEY`: Set this to the value of your Global Config Item Key
  See [our Environment Variables documentation](/docs/environment-variables#creating-environment-variables) to learn more.

- ### Use the Statsig integration in your code
  Statsig's [`statsig-node-vercel`](https://www.npmjs.com/package/statsig-node-vercel) package offers an `EdgeConfigDataAdapter` class, which you can use to initialize Statsig experiments with Global Config.

  The following example sets up a Statsig experiment with Global Config in an [Middleware](/docs/routing-middleware) file, using the `EDGE_CONFIG_ITEM_KEY` environment variable.
  ```ts filename="middleware.ts" framework=other
  import type { VercelRequest } from '@vercel/node';
  import Statsig from 'statsig-node';
  import { createClient } from '@vercel/global-config';
  import { EdgeConfigDataAdapter } from 'statsig-node-vercel';

  export const config = {
    matcher: '/',
  };

  const edgeConfigClient = createClient(process.env.GLOBAL_CONFIG!);
  const dataAdapter = new EdgeConfigDataAdapter({
    edgeConfigClient: edgeConfigClient,
    edgeConfigItemKey: process.env.EDGE_CONFIG_ITEM_KEY!,
  });

  export async function middleware(request: VercelRequest) {
    await Statsig.initialize('statsig-server-api-key-here', { dataAdapter });

    const experiment = await Statsig.getExperiment(
      { userID: 'exampleId' },
      'statsig_example_experiment',
    );
  }
  ```
  ```ts filename="middleware.ts" framework=nextjs
  import { NextResponse } from 'next/server';
  import type { NextRequest, NextFetchEvent } from 'next/server';
  import Statsig from 'statsig-node';
  import { createClient } from '@vercel/global-config';
  import { EdgeConfigDataAdapter } from 'statsig-node-vercel';

  export const config = {
    matcher: '/',
  };

  const edgeConfigClient = createClient(process.env.GLOBAL_CONFIG!);
  const dataAdapter = new EdgeConfigDataAdapter({
    edgeConfigClient: edgeConfigClient,
    edgeConfigItemKey: process.env.EDGE_CONFIG_ITEM_KEY!,
  });

  export async function middleware(request: NextRequest, event: NextFetchEvent) {
    await Statsig.initialize('statsig-server-api-key-here', { dataAdapter });

    const experiment = await Statsig.getExperiment(
      { userID: 'exampleId' },
      'statsig_example_experiment',
    );

    // Do any other experiment actions here

    // Ensure that all logged events are flushed to Statsig servers before the middleware exits
    event.waitUntil(Statsig.flush());

    return NextResponse.next();
  }
  ```
  ```ts filename="middleware.ts" framework=nextjs-app
  import { NextResponse } from 'next/server';
  import type { NextRequest, NextFetchEvent } from 'next/server';
  import Statsig from 'statsig-node';
  import { createClient } from '@vercel/global-config';
  import { EdgeConfigDataAdapter } from 'statsig-node-vercel';

  export const config = {
    matcher: '/',
  };

  const edgeConfigClient = createClient(process.env.GLOBAL_CONFIG!);
  const dataAdapter = new EdgeConfigDataAdapter({
    edgeConfigClient: edgeConfigClient,
    edgeConfigItemKey: process.env.EDGE_CONFIG_ITEM_KEY!,
  });

  export async function middleware(request: NextRequest, event: NextFetchEvent) {
    await Statsig.initialize('statsig-server-api-key-here', { dataAdapter });

    const experiment = await Statsig.getExperiment(
      { userID: 'exampleId' },
      'statsig_example_experiment',
    );

    // Do any other experiment actions here

    // Ensure that all logged events are flushed to Statsig servers before the middleware exits
    event.waitUntil(Statsig.flush());

    return NextResponse.next();
  }
  ```
  ```js filename="middleware.js" framework=other
  import Statsig from 'statsig-node';
  import { createClient } from '@vercel/global-config';
  import { EdgeConfigDataAdapter } from 'statsig-node-vercel';

  export const config = {
    matcher: '/',
  };

  const edgeConfigClient = createClient(process.env.GLOBAL_CONFIG);
  const dataAdapter = new EdgeConfigDataAdapter({
    edgeConfigClient: edgeConfigClient,
    edgeConfigItemKey: process.env.EDGE_CONFIG_ITEM_KEY,
  });

  export async function middleware() {
    await Statsig.initialize('statsig-server-api-key-here', { dataAdapter });

    const experiment = await Statsig.getExperiment(
      { userID: 'exampleId' },
      'statsig_example_experiment',
    );
  }
  ```
  ```js filename="middleware.js" framework=nextjs
  import Statsig from 'statsig-node';
  import { createClient } from '@vercel/global-config';
  import { EdgeConfigDataAdapter } from 'statsig-node-vercel';

  export const config = {
    matcher: '/',
  };

  const edgeConfigClient = createClient(process.env.GLOBAL_CONFIG);
  const dataAdapter = new EdgeConfigDataAdapter({
    edgeConfigClient: edgeConfigClient,
    edgeConfigItemKey: process.env.EDGE_CONFIG_ITEM_KEY,
  });

  export async function middleware() {
    await Statsig.initialize('statsig-server-api-key-here', { dataAdapter });

    const experiment = await Statsig.getExperiment(
      { userID: 'exampleId' },
      'statsig_example_experiment',
    );
  }
  ```
  ```js filename="middleware.js" framework=nextjs-app
  import Statsig from 'statsig-node';
  import { createClient } from '@vercel/global-config';
  import { EdgeConfigDataAdapter } from 'statsig-node-vercel';

  export const config = {
    matcher: '/',
  };

  const edgeConfigClient = createClient(process.env.GLOBAL_CONFIG);
  const dataAdapter = new EdgeConfigDataAdapter({
    edgeConfigClient: edgeConfigClient,
    edgeConfigItemKey: process.env.EDGE_CONFIG_ITEM_KEY,
  });

  export async function middleware() {
    await Statsig.initialize('statsig-server-api-key-here', { dataAdapter });

    const experiment = await Statsig.getExperiment(
      { userID: 'exampleId' },
      'statsig_example_experiment',
    );
  }
  ```

## Next steps

Now that you have set up the Statsig Global Config integration, you can explore the following topics to learn more:

- [Get started with Global Config](/docs/global-config/get-started)
- [Read with the SDK](/docs/global-config/global-config-sdk)
- [Use the dashboard](/docs/global-config/global-config-dashboard)
- [Global Config limits](/docs/global-config/global-config-limits)


---

[View full sitemap](/docs/sitemap)
