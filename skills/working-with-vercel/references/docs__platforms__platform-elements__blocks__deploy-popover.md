---
title: Deploy Popover
product: vercel
url: /docs/platforms/platform-elements/blocks/deploy-popover
canonical_url: "https://vercel.com/docs/platforms/platform-elements/blocks/deploy-popover"
last_updated: 2026-09-03
type: reference
prerequisites:
  - /docs/platforms/platform-elements/blocks
  - /docs/platforms/platform-elements
related:
  - /docs/platforms/platform-elements/actions/deploy-files
  - /docs/platforms/platform-elements/blocks/claim-deployment
summary: A popover interface for deploying files to Vercel with real-time status tracking.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/platform-elements/blocks/deploy-popover.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "e3480727a1330e5fd7c68be8108fd5b5cb1fc10700b629bd49c41ef32d740d7f"
---

# Deploy Popover

## Overview

The Deploy Popover component provides a popover interface for publishing a deployment to Vercel. It calls the [Deploy Files action](/docs/platforms/platform-elements/actions/deploy-files), tracks the deployment's status in real time, and links to the deployment once it's ready.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Platform Elements](https://vercel.com/changelog/introducing-platform-elements)
- [Deployments](https://v0.app/docs/deployments) — Preview and publish v0 projects on Vercel, then manage domains, visibility, and production updates.
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Deploying with Vercel Drop](https://vercel.com/docs/drop) — Vercel Drop lets you deploy a file or folder by dragging it into your browser, with no Git or CLI required.
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.

Full cross-link map for this page: [/docs/platforms/platform-elements/blocks/deploy-popover.graph.md](/docs/platforms/platform-elements/blocks/deploy-popover.graph.md)
<!-- /docsgraph:related -->

## Installation

Install the `deploy-popover` block with the Vercel Platforms CLI:

```bash
npx @vercel/platforms@latest add deploy-popover
```

You can also install it with the shadcn CLI:

```bash
npx shadcn@latest add https://registry.platforms.guide/deploy-popover.json
```

The block imports `deployFiles` and `getDeploymentStatus` from `../actions/deploy-files`. Install and configure the [Deploy Files action](/docs/platforms/platform-elements/actions/deploy-files) too, including its Vercel client and environment variables.

## Features

- **One-click deployment**: A **Publish to Production** button triggers a production deployment
- **Real-time status tracking**: Monitor deployment progress with live updates
- **Deployment states**: Visual feedback while the deployment starts, builds, and becomes ready
- **Direct deployment access**: A **View your deployment** button opens the deployment URL in a new tab when it's ready
- **Automatic polling**: Built-in SWR polling for deployment status updates
- **Domain and visibility views**: UI for choosing a `.vercel.app` subdomain and public or private visibility, which you connect to your own logic

## Usage

```tsx filename="deploy-popover.tsx"
import { DeployPopover } from '@/components/blocks/deploy-popover';

export default function MyComponent() {
  return (
    <div className="flex items-center justify-center p-8">
      <DeployPopover />
    </div>
  );
}
```

## Component states

The component renders a **Publish** button that opens the popover, and manages several deployment states:

### Idle

Initial state before any deployment action. Shows the **Publish to Production** button.

### Deploying

The `deployFiles` call is in progress. The button is disabled and shows "Starting deployment..."

### Polling

Checking deployment status after the deployment is created. The button is disabled and shows "Building application...", "Initializing deployment...", or "Checking deployment status..."

### Ready

Deployment successfully completed. Shows the **View your deployment** button.

### Error

The deployment's `readyState` is `ERROR`. The state carries the message "Your deployment failed.", but the installed block doesn't render it. The button returns to **Publish to Production** so the user can retry. Render `state.message` in the block if you want to show the error.

## Customization

The block is copied into your project as source code, so you customize it by editing the installed file.

### Custom files

The popover doesn't define the files it deploys. It calls `deployFiles`, and the installed action deploys a hardcoded sample `index.html` file. To deploy different files, edit the action as shown in [Deploy your own files](/docs/platforms/platform-elements/actions/deploy-files#deploy-your-own-files), then pass the files in the popover's `deployFiles` call.

### Project configuration

The popover doesn't choose a project. The Deploy Files action deploys to the project in the `DEPLOY_FILES_PROJECT_ID` environment variable, or to a project named after the deployment name when that variable isn't set.

### Deployment name

Customize the deployment name in the `deployFiles` call inside the block's `useDeployment` hook:

```tsx filename="deploy-popover.tsx"
const { trigger: deploy, isMutating: isDeploying } = useSWRMutation(
  '/api/deploy',
  () =>
    deployFiles({
      deploymentName: 'your-custom-deployment-name',
    }),
);
```

### Domain and visibility

The **Customize Domain** and **Visibility** views store their values in component state only. The installed block doesn't pass either value to `deployFiles`, and its `handleAddDomain` handler only returns to the main view. To apply the chosen subdomain, pass it to `deployFiles` as the `domain` option, for example by passing `customDomain` into `useDeployment`.

## Integration with Deploy Files action

The block calls the Deploy Files Server Actions like this:

```tsx filename="deploy-popover.tsx"
import { deployFiles, getDeploymentStatus } from '../actions/deploy-files';

// Deploy files to Vercel
const result = await deployFiles({
  deploymentName: `platforms-deploy-test-${Date.now()}`.toLowerCase(),
});

// Check deployment status
const status = await getDeploymentStatus(result.id);
```

## Polling configuration

The component uses SWR for automatic status polling with these defaults:

- **Refresh interval**: 10 seconds
- **Error retry count**: 3 attempts
- **Error retry interval**: 2 seconds

You can adjust these in the `useSWR` configuration:

```tsx filename="deploy-popover.tsx"
const REFRESH_INTERVAL = 10_000; // 10 seconds

useSWR(
  deploymentId ? deploymentId : null,
  (nonNullDeploymentId) => getDeploymentStatus(nonNullDeploymentId),
  {
    refreshInterval: deploymentId ? REFRESH_INTERVAL : 0,
    revalidateOnFocus: false,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    errorRetryInterval: 2000,
  },
);
```

## Related

- [Deploy Files action](/docs/platforms/platform-elements/actions/deploy-files)
- [Claim Deployment block](/docs/platforms/platform-elements/blocks/claim-deployment)


---

[View full sitemap](/docs/sitemap)
