---
title: Using Global Config with LaunchDarkly
product: vercel
url: /docs/global-config/global-config-integrations/launchdarkly-global-config
canonical_url: "https://vercel.com/docs/global-config/global-config-integrations/launchdarkly-global-config"
last_updated: 2026-07-29
type: tutorial
prerequisites:
  - /docs/global-config/global-config-integrations
  - /docs/global-config
related:
  - /docs/plans/enterprise
  - /docs/cli
  - /docs/projects
  - /docs/global-config/get-started
  - /docs/environment-variables
summary: "Learn how to use Global Config with Vercel's LaunchDarkly integration."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config/global-config-integrations/launchdarkly-global-config.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "0ce477c1cda66d179a04ca445cf7b92db1f45bb4e0480dd95d615a54242e6c63"
---

# Using Global Config with LaunchDarkly

This guide will help you get started with using Vercel's LaunchDarkly integration with Global Config. This integration allows you to use Global Config as a configuration source for your LaunchDarkly feature flags.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [DevCycle](https://vercel.com/docs/global-config/global-config-integrations/devcycle-global-config?from=related) — Learn how to use Global Config with Vercel's DevCycle integration.
- [Statsig](https://vercel.com/docs/global-config/global-config-integrations/statsig-global-config?from=related) — Learn how to use Global Config with Vercel's Statsig integration.
- [Using Global Config](https://vercel.com/docs/global-config/using-global-config?from=related) — Learn how to use Global Configs in your projects.
- [Global Configuration](https://vercel.com/docs/project-configuration/global-configuration?from=related) — Learn how to configure Vercel CLI under your system user.
- [Global Configs & REST API](https://vercel.com/docs/global-config/vercel-api?from=related) — Learn how to use the Vercel REST API to create and update Global Configs. You can also read data stored in Global Config

Full cross-link map for this page: [/docs/global-config/global-config-integrations/launchdarkly-global-config.graph.md](/docs/global-config/global-config-integrations/launchdarkly-global-config.graph.md)
<!-- /docsgraph:related -->

[LaunchDarkly](https://docs.launchdarkly.com/home) allows you to enable and disable feature flags dynamically, decoupling feature rollouts from deployments. The LaunchDarkly Global Config integration enables you to evaluate flags in the region closest to the user without making network calls to LaunchDarkly.

> **💡 Note:** The LaunchDarkly Global Config integration is only available to **Enterprise**
> LaunchDarkly customers. However, you **do not** need to have a Vercel
> [Enterprise](/docs/plans/enterprise) account.

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

- ### Set up the LaunchDarkly integration
  Visit [the LaunchDarkly page in the Integration Marketplace](/marketplace/launchdarkly) and select the **Add Integration** button. From the Integration dialog:
  1. Select a Vercel team and project to connect the integration to
  2. Log into LaunchDarkly
  3. Select the **Authorize** button to allow the integration to access your LaunchDarkly account data
  4. Name the integration, and select an existing Global Config or create a new one

- ### Get your client-side ID
  To use the integration, you'll need your client-side ID from LaunchDarkly. Here's how to add it to your project:
  1. [Go to the settings page of your LaunchDarkly dashboard](https://app.launchdarkly.com/settings/projects).
  2. Select the LaunchDarkly project your integration is connected to
  3. On the next page, copy the Client-side ID under the environment your integration is connected to (for example, Test or Production)
  Now, you must add the value to your project as an Environment Variable:
  1. Navigate to [your Vercel dashboard](/dashboard) and select the project you want to use LaunchDarkly with
  2. Under the **Settings** tab, navigate to **Environment Variables**, and create an `LD_CLIENT_SIDE_ID` variable with the value of your client-side ID
  [See our Environment Variables docs to learn more](/docs/environment-variables#creating-environment-variables).

- ### Use the LaunchDarkly integration in your code
  Open your project's code on your local machine and do the following:
  1. Install LaunchDarkly's Vercel Server SDK:
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i @launchdarkly/vercel-server-sdk
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i @launchdarkly/vercel-server-sdk
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i @launchdarkly/vercel-server-sdk
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i @launchdarkly/vercel-server-sdk
      ```
    </Code>
  </CodeBlock>
  2. Use [Vercel CLI](/docs/cli#installing-vercel-cli) to pull your Vercel project's environment variables:

     ```bash
     vercel env pull
     ```

  3. Finally, create a  file at the root of your project. This file will configure a Middleware that redirects your site visitors from `/homepage` to `/new-homepage` based on a feature flag fetched from LaunchDarkly:

     ```ts filename="middleware.ts" framework=all
     import { init } from '@launchdarkly/vercel-server-sdk';
     import { createClient } from '@vercel/global-config';

     const globalConfigClient = createClient(process.env.GLOBAL_CONFIG!);
     const launchDarklyClient = init('YOUR CLIENT-SIDE ID', globalConfigClient);

     export const config = {
       // Only run the middleware on the dashboard route
       matcher: '/homepage',
     };

     export default function middleware(request: Request): Response {
       await launchDarklyClient.initFromServerIfNeeded();
       const launchDarklyContext = { kind: 'org', key: 'my-org-key' };
       const showExperimentalHomepage = await launchDarklyClient.variation(
         'experimental-homepage',
         launchDarklyContext,
         true,
       );

       if (showExperimentalHomepage) {
         const url = new URL(request.url);
         url.pathname = '/new-homepage';
         return Response.redirect(url);
       }
     }
     ```

     ```js filename="middleware.js" framework=all
     import { init } from '@launchdarkly/vercel-server-sdk'
     import { createClient } from '@vercel/global-config'

     const globalConfigClient = createClient(process.env.GLOBAL_CONFIG);
     const launchDarklyClient = init("YOUR CLIENT-SIDE ID", globalConfigClient);

     export const config = {
       // Only run the middleware on the dashboard route
       matcher: '/homepage',
     };

     export default function middleware(request) {
       await launchDarklyClient.initFromServerIfNeeded();
       const launchDarklyContext = { kind: 'org', key: 'my-org-key' };
       const showExperimentalHomepage = await launchDarklyClient.variation(
         'experimental-homepage',
         launchDarklyContext,
         true
       );

       if(showExperimentalHomepage) {
         const url = new URL(request.url);
         url.pathname = '/new-homepage';
         return Response.redirect(url);
       }
     }
     ```

## Next steps

Now that you have set up the LaunchDarkly Global Config integration, you can explore the following topics to learn more:

- [Get started with Global Config](/docs/global-config/get-started)
- [Read with the SDK](/docs/global-config/global-config-sdk)
- [Use the dashboard](/docs/global-config/global-config-dashboard)
- [Global Config limits](/docs/global-config/global-config-limits)


---

[View full sitemap](/docs/sitemap)
