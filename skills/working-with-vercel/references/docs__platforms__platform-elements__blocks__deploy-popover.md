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
fetched_at: "2026-07-13T07:00:47.058Z"
sha256: "73f5d177eefdeef73cecbcfb7c12e0df3791b172664e32101c3ec75c4b8ba2ce"
---

# Deploy Popover

## Overview

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
