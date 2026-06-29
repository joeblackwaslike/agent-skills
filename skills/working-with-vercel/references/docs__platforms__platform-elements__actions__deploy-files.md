---
title: Deploy Files
product: vercel
url: /docs/platforms/platform-elements/actions/deploy-files
canonical_url: "https://vercel.com/docs/platforms/platform-elements/actions/deploy-files"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/platform-elements/actions
  - /docs/platforms/platform-elements
related:
  - /docs/platforms/platform-elements/blocks/claim-deployment
  - /docs/platforms/platform-elements/blocks/deploy-popover
  - /docs/platforms/multi-project-platforms/quickstart
summary: Learn about deploy files on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/platform-elements/actions/deploy-files.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "4b2d74365b0824b75f1068bbf47d1198ca9d1150fe7ebcacaf6f57792456565f"
---

# Deploy Files

## Overview

The Deploy Files action is a server-side utility that allows platforms to programmatically deploy files to Vercel. This is the core functionality behind platforms like Mintlify and Hashnode that create Vercel deployments for their users without requiring direct Vercel account access.

## Installation

Install the `deploy-files` action into your project using the Platform Elements installer.

## Features

- **Programmatic deployment**: Deploy files directly to Vercel using the SDK
- **Custom domain support**: Automatically configure custom domains for deployments
- **Project configuration**: Pass custom build settings and environment variables
- **SSO protection handling**: Optionally make preview deployments public
- **Unique deployment naming**: Automatic UUID generation for deployment identification

## Usage

```ts filename="deploy-files.ts"
import { deployFiles } from '@/actions/deploy-files';
import type { InlinedFile } from '@vercel/sdk/models/createdeploymentop';

// Example: Deploy a simple HTML site
const files: InlinedFile[] = [
  {
    file: 'index.html',
    data: '<html><body><h1>Hello from my platform!</h1></body></html>',
  },
  {
    file: 'package.json',
    data: JSON.stringify({
      name: 'my-deployment',
      version: '1.0.0',
    }),
  },
];

await deployFiles(files, {
  domain: 'customer-site.com',
  deploymentName: 'customer-deployment-1',
  projectId: 'existing-project-id', // Optional: use existing project
  config: {
    framework: 'nextjs',
    buildCommand: 'npm run build',
    outputDirectory: '.next',
  },
});
```

## Parameters

### `files`

Array of files to deploy. Can be either:

- `InlinedFile`: File content provided directly as a string
- `UploadedFile`: File content uploaded separately and referenced by SHA

### `args`

Configuration object with the following options:

| Option           | Type              | Required | Description                                                                 |
| ---------------- | ----------------- | -------- | --------------------------------------------------------------------------- |
| `projectId`      | `string`          | No       | Optional existing Vercel project ID. If not provided, creates a new project |
| `deploymentName` | `string`          | No       | Custom deployment name. Defaults to a UUID                                  |
| `config`         | `ProjectSettings` | No       | Build configuration including framework, commands, and environment          |
| `domain`         | `string`          | No       | Custom domain to add to the project after deployment                        |

## Advanced example

```ts filename="deploy-files.ts"
import { deployFiles } from '@/actions/deploy-files';
import type {
  InlinedFile,
  ProjectSettings,
} from '@vercel/sdk/models/createdeploymentop';

// Deploy a Next.js application with custom configuration
const files: InlinedFile[] = [
  // Your application files here
];

const config: ProjectSettings = {
  framework: 'nextjs',
  buildCommand: 'npm run build',
  outputDirectory: '.next',
  installCommand: 'npm install',
  devCommand: 'npm run dev',
  env: {
    API_KEY: 'your-api-key',
    DATABASE_URL: 'your-database-url',
  },
  buildEnv: {
    NODE_ENV: 'production',
  },
};

const deployment = await deployFiles(files, {
  deploymentName: `deployment-${Date.now()}`,
  config,
  domain: 'app.customer-domain.com',
});
```

## Integration with Claim Deployment

After creating a deployment with this action, you typically show the Claim Deployment component to allow users to take ownership:

```tsx filename="deploy-files.tsx"
// 1. Deploy files server-side
const deployment = await deployFiles(files, { domain })

// 2. Show claim interface client-side
<ClaimDeployment
  url={deployment.url}
  onClaimClick={handleTransferOwnership}
/>
```

## Security considerations

- This action requires Vercel API credentials with deployment permissions
- Always validate and sanitize file contents before deployment
- Consider implementing rate limiting to prevent abuse
- Store API credentials securely using environment variables

## Related

- [Claim Deployment block](/docs/platforms/platform-elements/blocks/claim-deployment)
- [Deploy Popover block](/docs/platforms/platform-elements/blocks/deploy-popover)
- [Multi-project platforms quickstart](/docs/platforms/multi-project-platforms/quickstart)


---

[View full sitemap](/docs/sitemap)
