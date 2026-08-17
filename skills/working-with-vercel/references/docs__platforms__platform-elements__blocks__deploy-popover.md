---
title: Deploy Popover
product: vercel
url: /docs/platforms/platform-elements/blocks/deploy-popover
canonical_url: "https://vercel.com/docs/platforms/platform-elements/blocks/deploy-popover"
last_updated: 2026-06-26
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "304880b9f86c750b3494ec22ad2fdbe6a9b4d74c3dac69ff92523bc0c76bf267"
---

# Deploy Popover

## Overview


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Run and track deploys from Slack](https://vercel.com/kb/guide/run-and-track-deploys-from-slack?from=related) — Build a Slack deploy bot with Chat SDK and Vercel Workflows. Dispatch GitHub Actions from a slash command, gate producti
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [Vercel Drop](https://vercel.com/docs/drop?from=related) — Vercel Drop lets you deploy a file or folder by dragging it into your browser, with no Git or CLI required.
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments?from=related) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a
- [Deploying from CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Upload Deployment Files](https://vercel.com/docs/rest-api/deployments/upload-deployment-files?from=related)

Full cross-link map for this page: [/docs/platforms/platform-elements/blocks/deploy-popover.graph.md](/docs/platforms/platform-elements/blocks/deploy-popover.graph.md)
<!-- /docsgraph:related -->

The Deploy Popover component provides a user-friendly popover interface for deploying files to Vercel. It includes real-time deployment status tracking, error handling, and the ability to inspect or visit deployments once they're ready.

## Installation

Install the `deploy-popover` block into your project using the Platform Elements installer.

## Features

- **One-click deployment**: Simple button interface to trigger deployments
- **Real-time status tracking**: Monitor deployment progress with live updates
- **Deployment states**: Clear visual feedback for deploying, building, ready, and error states
- **Direct deployment access**: Links to inspect deployments during build or visit when ready
- **Error handling**: Graceful error state management with user feedback
- **Automatic polling**: Built-in SWR polling for deployment status updates

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

The component manages several deployment states:

### Idle

Initial state before any deployment action. Shows "Deploy to Vercel" button.

### Deploying

Active deployment in progress. Shows "Inspect Deployment" link.

### Polling

Checking deployment status after initial deployment. Shows progress messages like "Building application..." or "Initializing deployment..."

### Ready

Deployment successfully completed. Shows "Visit Deployment" link.

### Error

Deployment failed. Shows error message with option to inspect the failed deployment.

## Customization

### Custom files

You can customize the files being deployed by modifying the `files` array:

```tsx filename="deploy-popover.tsx"
const files = [
  {
    file: 'index.html',
    data: '<h1>Your custom content</h1>',
  },
  {
    file: 'style.css',
    data: 'body { font-family: system-ui; }',
  },
] satisfies InlinedFile[];
```

### Project configuration

Set a specific Vercel project ID for deployments:

```tsx filename="deploy-popover.tsx"
const [projectId, setProjectId] = useState<string | null>(
  'your-project-id-here',
);
```

### Deployment name

Customize the deployment name in the `deployFiles` call:

```tsx filename="deploy-popover.tsx"
deployFiles(arg.paths, {
  projectId: arg.projectId ?? undefined,
  deploymentName: 'your-custom-deployment-name',
});
```

## Integration with Deploy Files action

This component works seamlessly with the Deploy Files server action:

```tsx filename="deploy-popover.tsx"
import { deployFiles, getDeploymentStatus } from '@/actions/deploy-files';

// Deploy files to Vercel
const result = await deployFiles(files, {
  projectId: projectId ?? undefined,
  deploymentName: 'platforms-deploy-test',
});

// Check deployment status
const status = await getDeploymentStatus(deploymentId);
```

## Polling configuration

The component uses SWR for automatic status polling with these defaults:

- **Refresh interval**: 10 seconds
- **Error retry count**: 3 attempts
- **Error retry interval**: 2 seconds

You can adjust these in the `useSWR` configuration:

```tsx filename="deploy-popover.tsx"
const REFRESH_INTERVAL = 10_000; // 10 seconds

useSWR(deploymentId, getDeploymentStatus, {
  refreshInterval: REFRESH_INTERVAL,
  errorRetryCount: 3,
  errorRetryInterval: 2000,
});
```

## Related

- [Deploy Files action](/docs/platforms/platform-elements/actions/deploy-files)
- [Claim Deployment block](/docs/platforms/platform-elements/blocks/claim-deployment)


---

[View full sitemap](/docs/sitemap)
