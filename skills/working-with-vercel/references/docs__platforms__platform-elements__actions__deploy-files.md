---
title: Deploy Files
product: vercel
url: /docs/platforms/platform-elements/actions/deploy-files
canonical_url: "https://vercel.com/docs/platforms/platform-elements/actions/deploy-files"
last_updated: 2026-09-03
type: reference
prerequisites:
  - /docs/platforms/platform-elements/actions
  - /docs/platforms/platform-elements
related:
  - /docs/platforms/platform-elements/blocks/claim-deployment
  - /docs/platforms/platform-elements/blocks/deploy-popover
  - /docs/platforms/multi-project-platforms/quickstart
summary: Server action for programmatically deploying files to Vercel on behalf of platform users.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/platform-elements/actions/deploy-files.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "09e45f4e5e0c181a931bd2cbcde0bc68bd96131ce624f31835ef51b5c4d3ae89"
---

# Deploy Files

## Overview

The Deploy Files action is a server-side utility that allows platforms to programmatically deploy files to Vercel. This is the core functionality behind platforms like Mintlify and Hashnode that create Vercel deployments for their users without requiring direct Vercel account access.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Upload Deployment Files](https://vercel.com/docs/rest-api/deployments/upload-deployment-files?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fdeploy-files&source_site=vercel-docs&relationship=related) — POST /v2/files — Before you create a deployment you need to upload the required files for that deployment. To do it, you
- [List Deployment Files](https://vercel.com/docs/rest-api/deployments/list-deployment-files?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fdeploy-files&source_site=vercel-docs&relationship=related) — GET /v6/deployments/{id}/files — Allows to retrieve the file structure of the source code of a deployment by supplying t
- [Get Deployment File Contents](https://vercel.com/docs/rest-api/deployments/get-deployment-file-contents?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fdeploy-files&source_site=vercel-docs&relationship=related) — GET /v8/deployments/{id}/files/{fileId} — Allows to retrieve the content of a file by supplying the file identifier and
- [Deploying to Vercel](https://vercel.com/docs/deployments?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fdeploy-files&source_site=vercel-docs&relationship=related) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fdeploy-files&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.

Full cross-link map for this page: [/docs/platforms/platform-elements/actions/deploy-files.graph.md](/docs/platforms/platform-elements/actions/deploy-files.graph.md?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fdeploy-files&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Installation

Install the `deploy-files` action with the Vercel Platforms CLI:

```bash
npx @vercel/platforms@latest add deploy-files
```

You can also install it with the shadcn CLI:

```bash
npx shadcn@latest add https://registry.platforms.guide/deploy-files.json
```

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
