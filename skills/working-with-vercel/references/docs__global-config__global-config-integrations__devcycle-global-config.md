---
title: Using Global Config with DevCycle
product: vercel
url: /docs/global-config/global-config-integrations/devcycle-global-config
canonical_url: "https://vercel.com/docs/global-config/global-config-integrations/devcycle-global-config"
last_updated: 2026-08-11
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
summary: "Learn how to use Global Config with Vercel's DevCycle integration."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config/global-config-integrations/devcycle-global-config.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "6d8d855ef956132a1e2a5dde13c8b3df6dd44dcdfa626827b9e3bb4257de2d27"
---

# Using Global Config with DevCycle

This guide will help you get started with using Vercel's DevCycle integration with Global Config. This integration allows you to use Global Config as a configuration source for your DevCycle feature flags.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Implementing Canary Deployments on Vercel](https://vercel.com/kb/guide/implementing_canary_deployments_on_vercel) — This guide explains how to set up canary deployments on Vercel, enabling developers to gradually roll out new versions t
- [Using Global Config with LaunchDarkly](https://vercel.com/docs/global-config/global-config-integrations/launchdarkly-global-config) — Learn how to use Global Config with Vercel's LaunchDarkly integration.
- [Using Global Config with Statsig](https://vercel.com/docs/global-config/global-config-integrations/statsig-global-config) — Learn how to use Global Config with Vercel's Statsig integration.
- [Global Config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config) — Vercel MCP tools for Global Config.
- [Integrations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations) — Vercel MCP tools for integrations.
- [Using Global Config](https://vercel.com/docs/global-config/using-global-config) — Learn how to use Global Configs in your projects.

Full cross-link map for this page: [/docs/global-config/global-config-integrations/devcycle-global-config.graph.md](/docs/global-config/global-config-integrations/devcycle-global-config.graph.md)
<!-- /docsgraph:related -->

> The DevCycle Global Config integration is available in Beta on all plans

DevCycle is a feature management platform designed for developers. DevCycle allows you to work with feature flags more naturally, where you write code, so you can deliver better features, faster.

With DevCycle and Vercel Global Config the decision logic for your features lives with your hosted site, so you can run your feature rollouts or experiments with ultra-low latency.

## Prerequisites

Before using this integration, you should have:

1. The latest version of Vercel CLI. To check your version, use `vercel --version`. To [install](/docs/cli#installing-vercel-cli) or update Vercel CLI, use:

   **pnpm**
   ```bash
   pnpm i -g vercel@latest
   ```
   **yarn**
   ```bash
   yarn global add vercel@latest
   ```
   **npm**
   ```bash
   npm i -g vercel@latest
   ```
   **bun**
   ```bash
   bun add -g vercel@latest
   ```
2. A project. If you don't have one, you can run the following terminal commands to create a Next.js project:

**pnpm**

```bash
pnpm create next-app@latest
```

**yarn**

```bash
yarn create next-app@latest
```

**npm**

```bash
npx create-next-app@latest
```

**bun**

```bash
bunx create-next-app@latest
```

1. A Vercel project. If you don't have one, see [Creating a Project](/docs/projects#creating-a-project)
2. A Global Config. If you don't have one, follow [the Global Config quickstart](/docs/global-config/get-started)
3. The Global Config SDK:

   **pnpm**
   ```bash
   pnpm i @vercel/global-config
   ```
   **yarn**
   ```bash
   yarn add @vercel/global-config
   ```
   **npm**
   ```bash
   npm i @vercel/global-config
   ```
   **bun**
   ```bash
   bun add @vercel/global-config
   ```

- ### Set up the DevCycle integration
  Visit [the DevCycle page in the Integration Marketplace](/marketplace/devcycle) and select the **Add Integration** button. From the modal that opens:
  1. Select your Vercel team and project.
  2. Continue and log into DevCycle.
  3. Select the DevCycle Organization and Project you want to use with Vercel Global Config.
  4. Connect your DevCycle project to an existing or new Global Config store.
  5. Click **Finish Setup**.

- ### Install the DevCycle Global Config package
  **pnpm**
  ```bash
  pnpm i @devcycle/vercel-edge-config @vercel/global-config
  ```
  **yarn**
  ```bash
  yarn add @devcycle/vercel-edge-config @vercel/global-config
  ```
  **npm**
  ```bash
  npm i @devcycle/vercel-edge-config @vercel/global-config
  ```
  **bun**
  ```bash
  bun add @devcycle/vercel-edge-config @vercel/global-config
  ```

- ### Use the DevCycle integration in your code
  > For \['node']:
  For more information on DevCycle Node SDK usage, see [DevCycle docs](https://docs.devcycle.com/sdk/server-side-sdks/node).
  > For \['nextjs', 'nextjs-app']:
  For more information on DevCycle Next.js SDK usage, see the [DevCycle docs](https://docs.devcycle.com/sdk/client-side-sdks/nextjs).
  ```ts filename="app/index.tsx" framework=nextjs-app
  import { createClient } from '@vercel/global-config';
  import { EdgeConfigSource } from '@devcycle/vercel-edge-config';
  import { setupDevCycle } from '@devcycle/nextjs-sdk/server';

  const edgeClient = createClient(process.env.GLOBAL_CONFIG ?? '');
  const edgeConfigSource = new EdgeConfigSource(edgeClient);

  export const { getVariableValue, getClientContext } = setupDevCycle({
    serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? '',
    clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
    userGetter: () => ({ user_id: 'test_user' }),
    options: {
      // pass the configSource option with the instance of EdgeConfigSource
      configSource: edgeConfigSource,
    },
  });
  ```
  ```js filename="app/index.jsx" framework=nextjs-app
  import { createClient } from '@vercel/global-config';
  import { EdgeConfigSource } from '@devcycle/vercel-edge-config';
  import { setupDevCycle } from '@devcycle/nextjs-sdk/server';

  const edgeClient = createClient(process.env.GLOBAL_CONFIG ?? '');
  const edgeConfigSource = new EdgeConfigSource(edgeClient);

  export const { getVariableValue, getClientContext } = setupDevCycle({
    serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? '',
    clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
    userGetter: () => ({ user_id: 'test_user' }),
    options: {
      // pass the configSource option with the instance of EdgeConfigSource
      configSource: edgeConfigSource,
    },
  });
  ```
  ```ts filename="pages/index.tsx" framework=nextjs
  import type { GetServerSideProps } from 'next';
  import { createClient } from '@vercel/global-config';
  import { EdgeConfigSource } from '@devcycle/vercel-edge-config';
  import { getServerSideDevCycle } from '@devcycle/nextjs-sdk/pages';

  const edgeClient = createClient(process.env.GLOBAL_CONFIG ?? '');
  const edgeConfigSource = new EdgeConfigSource(edgeClient);

  export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = {
      user_id: 'server-user',
    };

    return {
      props: {
        ...(await getServerSideDevCycle({
          serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? '',
          clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
          user,
          context,
          options: {
            // pass the configSource option with the instance of EdgeConfigSource
            configSource: edgeConfigSource,
          },
        })),
      },
    };
  };
  ```
  ```js filename="pages/index.jsx" framework=nextjs
  import { createClient } from '@vercel/global-config';
  import { EdgeConfigSource } from '@devcycle/vercel-edge-config';
  import { getServerSideDevCycle } from '@devcycle/nextjs-sdk/pages';

  const edgeClient = createClient(process.env.GLOBAL_CONFIG ?? '');
  const edgeConfigSource = new EdgeConfigSource(edgeClient);

  export const getServerSideProps = async (context) => {
    const user = {
      user_id: 'server-user',
    };

    return {
      props: {
        ...(await getServerSideDevCycle({
          serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? '',
          clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
          user,
          context,
          options: {
            // pass the configSource option with the instance of EdgeConfigSource
            configSource: edgeConfigSource,
          },
        })),
      },
    };
  };
  ```
  ```ts filename="index.tsx" framework=node
  import { createClient } from '@vercel/global-config';
  import { EdgeConfigSource } from '@devcycle/vercel-edge-config';
  import { initializeDevCycle } from '@devcycle/nodejs-server-sdk';

  // the GLOBAL_CONFIG environment variable contains a connection string for a particular global config. It is set automatically
  // when you connect a global config to a project in Vercel.
  const edgeClient = createClient(process.env.GLOBAL_CONFIG);
  const edgeConfigSource = new EdgeConfigSource(edgeClient);

  const devcycleClient = initializeDevCycle(
    process.env.DEVCYCLE_SERVER_SDK_KEY,
    // pass the edgeConfigSource as the "configSource" option during SDK intialization to tell the SDK to use Global Config
    // for retrieving its configuration
    { configSource: edgeConfigSource },
  );
  ```
  ```js filename="index.jsx" framework=node
  import { createClient } from '@vercel/global-config';
  import { EdgeConfigSource } from '@devcycle/vercel-edge-config';
  import { initializeDevCycle } from '@devcycle/nodejs-server-sdk';

  // the GLOBAL_CONFIG environment variable contains a connection string for a particular global config. It is set automatically
  // when you connect a global config to a project in Vercel.
  const edgeClient = createClient(process.env.GLOBAL_CONFIG);
  const edgeConfigSource = new EdgeConfigSource(edgeClient);

  const devcycleClient = initializeDevCycle(
    process.env.DEVCYCLE_SERVER_SDK_KEY,
    // pass the edgeConfigSource as the "configSource" option during SDK intialization to tell the SDK to use Global Config
    // for retrieving its configuration
    { configSource: edgeConfigSource },
  );
  ```

## Next steps

Now that you have the DevCycle Global Config integration set up, you can explore the following topics to learn more:

- [Get started with Global Config](/docs/global-config/get-started)
- [Read with the SDK](/docs/global-config/global-config-sdk)
- [Use the dashboard](/docs/global-config/global-config-dashboard)
- [Global Config limits](/docs/global-config/global-config-limits)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
