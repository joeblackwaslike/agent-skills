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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "5bd359bfc56933c05bec4dfa73a46c77a824edaa0c5af8de4761f99100a783ad"
---

# Deploy Files

## Overview

The Deploy Files action is a server-side utility that allows platforms to programmatically deploy files to Vercel. This is the core functionality behind platforms like Mintlify and Hashnode that create Vercel deployments for their users without requiring direct Vercel account access.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel) — Learn how to deploy based on tags/releases on Vercel.
- [Upload Deployment Files](https://vercel.com/docs/rest-api/deployments/upload-deployment-files) — POST /v2/files — Before you create a deployment you need to upload the required files for that deployment. To do it, you
- [List Deployment Files](https://vercel.com/docs/rest-api/deployments/list-deployment-files) — GET /v6/deployments/{id}/files — Allows to retrieve the file structure of the source code of a deployment by supplying t
- [deploy_to_vercel](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel) — Use deploy_to_vercel with Vercel MCP.
- [Deployment integration actions](https://vercel.com/docs/integrations/create-integration/deployment-integration-action) — These actions allow integration providers to set up automated tasks with Vercel deployments.
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.

Full cross-link map for this page: [/docs/platforms/platform-elements/actions/deploy-files.graph.md](/docs/platforms/platform-elements/actions/deploy-files.graph.md)
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

Both commands copy the action's TypeScript source into your project, so you own the code and edit it to fit your platform. The installed file exports two Server Actions, `deployFiles` and `getDeploymentStatus`.

The registry item doesn't install `@vercel/sdk`, which the action depends on. Add it to your project:

```bash package-manager
npm i @vercel/sdk
```

## Features

- **Programmatic deployment**: Create production deployments with the Vercel SDK
- **Custom domain support**: Add a domain to the deployment's project
- **Project configuration**: Pass build settings such as the framework, build command, and output directory
- **Public deployments**: Remove SSO protection from new projects so their deployments are publicly reachable
- **Unique deployment naming**: Generate a UUID when you don't pass a deployment name
- **Status checks**: Poll a deployment's state with `getDeploymentStatus`

## What the installed action deploys

The installed `deployFiles` action deploys a hardcoded sample: one `index.html` file with a randomly styled "Hello, world!" heading. The action doesn't accept files as an argument. To deploy your users' files, edit the action as shown in [Deploy your own files](#deploy-your-own-files).

Each call to `deployFiles` runs these steps:

1. Reads the target project ID from the `DEPLOY_FILES_PROJECT_ID` environment variable.
2. Creates a production deployment (`target: "production"`) from the `files` array defined inside the action.
3. If `DEPLOY_FILES_PROJECT_ID` isn't set, deploys to a project named after the sanitized `deploymentName`, then sets that project's `ssoProtection` to `null` so its deployments are public.
4. If you pass `domain`, adds that domain to the deployment's project.
5. Returns the deployment object from the Vercel SDK, including its `id` and `url`.

## Set up the Vercel client

The action imports `vercel` and `VERCEL_TEAM_ID` from `../lib/vercel`, and the registry doesn't install that file. Create `lib/vercel.ts` in a `lib` directory next to the directory that contains `deploy-files.ts`, so the relative import resolves:

```ts filename="lib/vercel.ts"
import { Vercel } from '@vercel/sdk';

export const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

if (!(process.env.VERCEL_TOKEN && VERCEL_TEAM_ID)) {
  throw new Error('VERCEL_TOKEN and VERCEL_TEAM_ID must be set');
}

export const vercel = new Vercel({
  bearerToken: process.env.VERCEL_TOKEN,
});
```

Set these environment variables:

| Variable                  | Required | Description                                                                                                    |
| ------------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `VERCEL_TOKEN`            | Yes      | Vercel access token that the SDK client uses to create deployments and update projects                         |
| `VERCEL_TEAM_ID`          | Yes      | ID of the Vercel team that owns the deployments                                                                |
| `DEPLOY_FILES_PROJECT_ID` | No       | Existing project to deploy to. If unset, the action deploys to a project named after the sanitized `deploymentName` |

## Usage

Call the installed action from server-side code:

```ts filename="deploy.ts"
import { deployFiles } from '@/actions/deploy-files';

const deployment = await deployFiles({
  deploymentName: 'customer-deployment-1',
  domain: 'customer-site.com',
});

console.log(deployment.url);
```

## Parameters

`deployFiles` takes one optional object argument. The installed action has no `files` or `projectId` parameter; it reads files from the `files` array inside the action and the project from `DEPLOY_FILES_PROJECT_ID`.

| Option           | Type              | Required | Description                                                                                                                                                                                                        |
| ---------------- | ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `deploymentName` | `string`          | No       | Deployment name. Defaults to a UUID. The action lowercases it, replaces unsupported characters with `-`, and truncates it to 100 characters. It's also the project name when `DEPLOY_FILES_PROJECT_ID` isn't set |
| `config`         | `ProjectSettings` | No       | Project settings for the deployment, such as `framework`, `buildCommand`, `installCommand`, and `outputDirectory`. When you omit it, Vercel detects the settings automatically                                     |
| `domain`         | `string`          | No       | Domain to add to the deployment's project after the deployment is created                                                                                                                                          |

`getDeploymentStatus(id)` takes a deployment ID and returns an object with the deployment's `readyState`, `url`, and `id`.

## Deploy your own files

To deploy files your platform generates, change the action to accept a `files` argument. In your installed `deploy-files.ts`, add `files` to the argument type, remove the hardcoded `files` constant, and read `files` from the arguments instead:

```ts filename="actions/deploy-files.ts"
export async function deployFiles(args: {
  files: InlinedFile[];
  deploymentName?: string;
  config?: ProjectSettings;
  domain?: string;
}) {
  // you can update this to load the project id from your database instead
  const projectId = process.env.DEPLOY_FILES_PROJECT_ID;

  const { files, deploymentName = crypto.randomUUID(), config, domain } = args;

  const sanitizedName = sanitizeProjectName(deploymentName);

  // The rest of the function body stays the same
}
```

The action already imports the `InlinedFile` and `ProjectSettings` types from `@vercel/sdk/models/createdeploymentop.js`. To deploy each user's files to that user's own project, replace the `DEPLOY_FILES_PROJECT_ID` lookup, for example by loading the project ID from your database.

After the change, pass files when you call the action:

```ts filename="deploy.ts"
import { deployFiles } from '@/actions/deploy-files';

const deployment = await deployFiles({
  files: [
    {
      file: 'index.html',
      data: '<html><body><h1>Hello from my platform!</h1></body></html>',
    },
  ],
  deploymentName: 'customer-deployment-1',
  config: {
    framework: null, // Static HTML, no build step
  },
  domain: 'customer-site.com',
});
```

For a framework app, pass its source files and set `config` to match, for example `framework: 'nextjs'` with `buildCommand` and `outputDirectory`.

## Integration with Claim Deployment

After creating a deployment with this action, you typically show the Claim Deployment component to allow users to take ownership:

```tsx filename="deploy-files.tsx"
// 1. Deploy files server-side
const deployment = await deployFiles({ domain })

// 2. Show claim interface client-side
<ClaimDeployment
  url={deployment.url}
  onClaimClick={handleTransferOwnership}
/>
```

## Security considerations

- `deployFiles` is a Server Action, so any client that can reach your app can call it with arguments it chooses. Check authentication and authorization inside the action before deploying
- This action requires Vercel API credentials with deployment permissions
- Always validate and sanitize file contents and domains before deployment
- Consider implementing rate limiting to prevent abuse
- Store API credentials securely using environment variables

## Related

- [Claim Deployment block](/docs/platforms/platform-elements/blocks/claim-deployment)
- [Deploy Popover block](/docs/platforms/platform-elements/blocks/deploy-popover)
- [Multi-project platforms quickstart](/docs/platforms/multi-project-platforms/quickstart)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
