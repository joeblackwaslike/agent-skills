---
title: Deploy Files
product: vercel
url: /docs/platforms/platform-elements/actions/deploy-files
canonical_url: "https://vercel.com/docs/platforms/platform-elements/actions/deploy-files"
last_updated: 2026-06-26
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "325cc9c383477f465149dd17794e94f36f7710cec4f98014c365936a555ee296"
---

# Deploy Files

## Overview


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Upload Deployment Files](https://vercel.com/docs/rest-api/deployments/upload-deployment-files?from=related)
- [List Deployment Files](https://vercel.com/docs/rest-api/deployments/list-deployment-files?from=related)
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [Deploying from CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.

Full cross-link map for this page: [/docs/platforms/platform-elements/actions/deploy-files.graph.md](/docs/platforms/platform-elements/actions/deploy-files.graph.md)
<!-- /docsgraph:related -->

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
