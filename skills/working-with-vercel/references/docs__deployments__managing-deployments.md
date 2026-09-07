---
title: Managing Deployments
product: vercel
url: /docs/deployments/managing-deployments
canonical_url: "https://vercel.com/docs/deployments/managing-deployments"
last_updated: 2026-08-21
type: how-to
prerequisites:
  - /docs/deployments
related:
  - /docs/rest-api
  - /docs/cli/deploying-from-cli
  - /docs/rest-api/deployments/get-deployment-events
  - /docs/deployment-retention
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
summary: Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at any time and even delete a...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/managing-deployments.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "2b3cfa0259dbcea8e7956013b1cccfb46b58c950f7b6222aadb2f4e3fd497568"
---

# Managing Deployments

You can manage all current and previous deployments regardless of environment, status, or branch from the [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard). To manage a deployment from the dashboard:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to optimize memory usage](https://nextjs.org/docs/app/guides/memory-usage?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=related) — Optimize memory used by your application in development and production.
- [New deployment promotion event](https://vercel.com/changelog/new-webhook-for-promotion-events?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=related)
- [Revert and pin deployments with Instant Rollback](https://vercel.com/changelog/revert-and-pin-deployments-with-instant-rollback?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=related)
- [Stage and manually promote deployments to production](https://vercel.com/changelog/stage-and-manually-promote-deployments-to-production?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=related)
- [Implementing Blue-Green Deployments on Vercel](https://vercel.com/kb/guide/blue_green_deployments_on_vercel?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=related) — This guide outlines how to implement blue-green deployments on Vercel, leveraging GitHub Actions for seamless and contro
- [Deploy a Bolt.new app with Vercel Drop](https://vercel.com/kb/guide/bolt-vercel-drop?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=related) — Export your Bolt.new project as a .zip and deploy it to Vercel with Vercel Drop. Vercel detects the framework and builds
- [Deploy a Claude Design project to Vercel](https://vercel.com/kb/guide/claude-design?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=related) — Publish a Claude Design project to Vercel for a live production URL with the Vercel connector, or by exporting a .zip to
- [How do I delete an individual deployment?](https://vercel.com/kb/guide/how-do-i-delete-an-individual-deployment?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=related) — Information on deleting an individual deployment.
- [Implementing Canary Deployments on Vercel](https://vercel.com/kb/guide/implementing_canary_deployments_on_vercel?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=related) — This guide explains how to set up canary deployments on Vercel, enabling developers to gradually roll out new versions t
- [Deploying safely on Vercel without merge queues](https://vercel.com/blog/deploy-safely-on-vercel-without-merge-queues?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=related)
- [vercel redeploy](https://vercel.com/docs/cli/redeploy?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=related) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=related) — Set up and deploy a Vercel project using the CLI, from linking to production.

Full cross-link map for this page: [/docs/deployments/managing-deployments.graph.md](/docs/deployments/managing-deployments.graph.md?from=related&source_path=%2Fdocs%2Fdeployments%2Fmanaging-deployments&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

1. Ensure your team is selected from the team switcher
2. Select your project
3. Open [**Deployments**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fdeployments\&title=Go+to+Deployments) in the sidebar
4. You can then filter, redeploy, or manually promote your deployment to production

[Vercel CLI](https://vercel.com/cli) and [Vercel REST API](/docs/rest-api) also provide alternative ways to manage your deployments. You can find a full list of the commands available in the [Vercel CLI Reference](/docs/cli/deploying-from-cli), along with the deployments section of the [Vercel REST API Reference](/docs/rest-api/deployments/get-deployment-events).

## Filter deployment

You can filter your deployments based on branch, status, and deployment environment:

1. Select your project from the [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard)
2. Open [**Deployments**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fdeployments\&title=Go+to+Deployments) in the sidebar
3. Use the dropdowns to search by **Branch**, **Date Range**, **All Environments**, or **Status**

![Image](`/docs-assets/static/docs/concepts/deployments/filtering-deployments/filter-status-light.png`)

## Delete a deployment

#### Dashboard

If you no longer need a specific deployment of your app, you can delete it from your project with the following steps:

1. From your [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), select the project where the specific deployment is located.
2. Click on the **Deployments** section in the sidebar.
3. From the list of deployments, click on the deployment that you want to delete
4. Click the ... button.
5. From the context menu, select **Delete**.

#### cURL

To create an Authorization Bearer token, see the [access token](/docs/rest-api#creating-an-access-token) section of the API documentation.

```bash filename="cURL"
curl --request DELETE \
  --url https://api.vercel.com/v13/deployments/<deployment-id> \
  --header "Authorization: Bearer $VERCEL_TOKEN"
```

#### SDK

To create an Authorization Bearer token, see the [access token](/docs/rest-api#creating-an-access-token) section of the API documentation.

```ts filename="deleteDeployment"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.deployments.deleteDeployment({
    id: 'deployment-id',
  });

  // Handle the result
  console.log(result);
}

run();
```

Deleting a deployment prevents you from using instant rollback on it and might break the links used in integrations, such as the ones in the pull requests of your Git provider.

You can also set a [deployment retention policy](#set-the-deployment-retention-policy) to automatically delete deployments after a certain period.

### Set the deployment retention policy

You can set the retention policy for your deployments to automatically delete them after a certain period. To learn more, see [Deployment Retention](/docs/deployment-retention).

## Deployment protection

Vercel provides a way to protect your deployments from being accessed by unauthorized users. You can use [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) to restrict access to your deployments to only Vercel users with [suitable access rights](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication#who-can-access-protected-deployments). You can also configure which [environments](/docs/deployment-protection#choose-which-urls-to-protect) are protected.

In addition, Enterprise teams can use [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips) and [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) to further secure their deployments. Password protection is also available as a paid add-on for Pro teams.

To learn more, see [Deployment Protection](/docs/deployment-protection).

## Redeploy a project

Vercel automatically redeploys your application when you make any commits. However, there can be situations such as bad cached data where you need to **Redeploy** your application to fix issues manually. To do so:

1. Ensure your team is selected from the team switcher
2. Select your project
3. Open [**Deployments**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fdeployments\&title=Go+to+Deployments) in the sidebar
4. Locate the deployment you wish to deploy. You may need to use the [filter](/docs/deployments/managing-deployments#filter-deployment) options
5. Click the ellipsis icon () and select **Redeploy**
6. In the **Redeploy to Production** window, decide if you want to use the existing [Build Cache](/docs/deployments/troubleshoot-a-build#understanding-build-cache), and then select **Redeploy**

![Image](`/docs-assets/static/docs/concepts/deployments/redeploy-model-light.png`)

### When to Redeploy

Other than your custom needs to redeploy, it's always recommended to redeploy your application to Vercel for the following use cases:

- Enabling the [Analytics](/docs/analytics/quickstart)
- Changing the [Environment Variables](/docs/environment-variables)
- [Outage Resiliency](/docs/regions#outage-resiliency)
- Making changes to **Build & Development Settings**
- **Redirect** or **Rewrites** from a subdomain to a subpath


---

[View full sitemap](/docs/sitemap)
