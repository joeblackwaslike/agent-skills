---
title: Reference
product: vercel
url: /docs/platforms/multi-project-platforms/reference
canonical_url: "https://vercel.com/docs/platforms/multi-project-platforms/reference"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/multi-project-platforms
  - /docs/platforms
related:
  - /docs/platforms/platform-elements/blocks/deploy-popover
  - /docs/platforms/platform-elements/actions/deploy-files
  - /docs/rest-api/reference/endpoints/projects/create-a-new-project
  - /docs/rest-api/reference/endpoints/deployments/create-a-new-deployment
  - /docs/rest-api/reference/endpoints/deployments/list-deployments
summary: Learn about reference on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-project-platforms/reference.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "5ed56a58f6cb0441f8e84e9b03473fd545cdbe70f8ac03c9ae31a7eac2011bdf"
---

# Multi-Project Platforms Reference

## Custom blocks

Start with our Custom [Blocks](/docs/platforms/platform-elements/blocks/deploy-popover) and [Actions](/docs/platforms/platform-elements/actions/deploy-files) that speed up your usage of the Vercel API.

## Projects & Deployments API reference

### Create project

Create a new Vercel project using the [create project API](/docs/rest-api/reference/endpoints/projects/create-a-new-project).

**SDK**:

```ts filename="create-project.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.projects.createProject({
    teamId: 'team_1a2b3c4d5e6f7g8h9i0j1k2l',
    slug: 'my-team-url-slug',
    requestBody: {
      name: 'a-project-name',
    },
  });

  console.log(result);
}

run();
```

### Deploy to project

Create a deployment for a project using the [create deployment API](/docs/rest-api/reference/endpoints/deployments/create-a-new-deployment).

**SDK**:

```ts filename="deploy-files.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.deployments.createDeployment({
    teamId: 'team_1a2b3c4d5e6f7g8h9i0j1k2l',
    slug: 'my-team-url-slug',
    requestBody: {
      deploymentId: 'dpl_2qn7PZrx89yxY34vEZPD31Y9XVj6',
      files: [
        {
          data: '<value>',
          file: 'folder/file.js',
        },
      ],
      gitMetadata: {
        remoteUrl: 'https://github.com/vercel/next.js',
        commitAuthorName: 'kyliau',
        commitAuthorEmail: 'kyliau@example.com',
        commitMessage:
          'add method to measure Interaction to Next Paint (INP) (#36490)',
        commitRef: 'main',
        commitSha: 'dc36199b2234c6586ebe05ec94078a895c707e29',
        dirty: true,
        ci: true,
        ciType: 'github-actions',
        ciGitProviderUsername: 'rauchg',
        ciGitRepoVisibility: 'private',
      },
      gitSource: {
        projectId: 987654321,
        ref: 'main',
        sha: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
        type: 'gitlab',
      },
      meta: {
        foo: 'bar',
      },
      name: 'my-instant-deployment',
      project: 'my-deployment-project',
      projectSettings: {
        buildCommand: 'next build',
        installCommand: 'pnpm install',
      },
      target: 'production',
    },
  });

  console.log(result);
}

run();
```

### List deployments

Get deployments for a project using the [list deployments API](/docs/rest-api/reference/endpoints/deployments/list-deployments).

**SDK**:

```ts filename="list-deployments.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.deployments.getDeployments({
    app: 'docs',
    from: 1612948664566,
    limit: 10,
    projectId: 'QmXGTs7mvAMMC7WW5ebrM33qKG32QK3h4vmQMjmY',
    projectIds: ['prj_123', 'prj_456'],
    target: 'production',
    to: 1612948664566,
    users: 'kr1PsOIzqEL5Xg6M4VZcZosf,K4amb7K9dAt5R2vBJWF32bmY',
    since: 1540095775941,
    until: 1540095775951,
    state: 'BUILDING,READY',
    teamId: 'team_1a2b3c4d5e6f7g8h9i0j1k2l',
    slug: 'my-team-url-slug',
  });

  console.log(result);
}

run();
```

### Delete project

Remove a project and all its deployments using the delete project API.

**SDK**:

```ts filename="delete-project.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.deployments.deleteDeployment({
    id: 'dpl_5WJWYSyB7BpgTj3EuwF37WMRBXBtPQ2iTMJHJBJyRfd',
    url: 'https://files-orcin-xi.vercel.app/',
    teamId: 'team_1a2b3c4d5e6f7g8h9i0j1k2l',
    slug: 'my-team-url-slug',
  });

  console.log(result);
}

run();
```

### Error codes

| Code                     | Description                | Solution                                   |
| ------------------------ | -------------------------- | ------------------------------------------ |
| `project_limit_exceeded` | Team project limit reached | Upgrade plan or clean up unused projects   |
| `invalid_name`           | Project name is invalid    | Use alphanumeric characters and hyphens    |
| `forbidden`              | Insufficient permissions   | Check API token has project creation scope |
| `rate_limit_exceeded`    | Too many requests          | Implement exponential backoff              |
| `build_failed`           | Deployment build failed    | Check build logs for errors                |

## Troubleshooting

### Deployment Failures

**Problem**: Deployments failing with build errors.

**Solution**:

- Check build logs via SDK
- Verify `package.json` dependencies
- Ensure build command is correct
- Check for environment variable issues
- Verify Node.js version compatibility

### Project Creation Limits

**Problem**: Cannot create more projects.

**Solution**:

- Check current project count against plan limit
- Delete unused projects
- Upgrade to higher tier plan
- Contact sales for enterprise limits

### Domain Conflicts

**Problem**: Domain already in use error.

**Solution**:

- Domain must be unique across Vercel
- Remove domain from other project first
- Use subdomain instead (`tenant1.yourdomain.com`)
- Verify domain ownership if domain exists elsewhere

### Build Errors

**Problem**: Builds timing out or failing.

**Solution**:

- Optimize build process
- Check build time limits for your plan
- Reduce dependencies
- Use build caching
- Split large builds into stages

### Resource Quota Issues

**Problem**: Hitting function size or execution limits.

**Solution**:

- Review function sizes
- Optimize bundle size
- Check execution time limits
- Consider upgrading plan
- Split large functions

## FAQ

### What's the difference between Multi-Project and Multi-Tenant?

**Multi-Project**: Multiple Vercel projects, each with unique code and isolated deployments. Complete separation between tenants.

**Multi-Tenant**: Single project serving multiple tenants with different content. All tenants share the same codebase.

Use Multi-Project when tenants need custom code. Use Multi-Tenant when tenants share functionality but have different content.

### How many projects can I create?

Project limits depend on your plan:

- **Hobby**: Limited projects per account
- **Pro**: Higher limits
- **Enterprise**: Custom limits based on needs

Contact [sales](/contact/sales) for specific limits.

### How is pricing calculated per tenant?

Each project is billed based on:

- **Build minutes**: Time spent building deployments
- **Function invocations**: Number of function calls
- **Bandwidth**: Data transferred
- **Edge requests**: CDN requests

All usage follows standard Vercel pricing. See [pricing documentation](/pricing).

### Are there isolation guarantees?

Yes, Multi-Project provides complete isolation:

- **Build isolation**: Separate build environments
- **Runtime isolation**: Independent function execution
- **Data isolation**: No shared state between projects
- **Configuration isolation**: Separate environment variables

### How does data retention work?

When you delete a project:

- Deployments are deleted immediately
- Build logs are retained for 30 days
- Environment variables are deleted
- Domains are released

Export any data you need before deleting projects.

### How can I monitor multiple projects?

Monitor projects using:

- **Vercel Dashboard**: View all projects per team
- **SDK**: Query project and deployment status
- **Webhooks**: Get real-time deployment notifications
- **Analytics**: View usage and performance metrics

### Can I migrate from Multi-Tenant to Multi-Project?

Yes, but it requires architectural changes:

1. Export tenant data from shared database
2. Create separate projects per tenant
3. Deploy tenant code to each project
4. Configure domains for each project
5. Update tenant routing in your application

This is a significant migration. Consider carefully before switching.

### What are the rate limits?

API rate limits for project operations:

- **Create project**: 100 requests per hour
- **Create deployment**: 1000 requests per hour
- **Delete project**: 100 requests per hour
- **Other operations**: Standard API limits

See [API rate limits documentation](/docs/rest-api#rate-limits).

### How do I handle CI/CD per tenant?

Each project can have its own CI/CD:

- Connect to tenant's Git repository
- Configure build settings per project
- Set up deployment webhooks
- Use GitHub Actions or other CI tools
- Test and deploy independently

### Can tenants manage their own projects?

No, programmatically created projects are managed by your team. Tenants cannot access the Vercel dashboard for their projects unless you add them as team members (not recommended for platforms).

Instead, build your own interface for tenants to:

- Trigger deployments
- View deployment status
- Configure environment variables
- Monitor usage

## Next steps

- [Concepts](/docs/platforms/multi-project-platforms/concepts): Understand multi-project architecture
- [Quickstart](/docs/platforms/multi-project-platforms/quickstart): Get started with multi-project platforms
- [Vercel SDK](/docs/sdk): Complete SDK documentation


---

[View full sitemap](/docs/sitemap)
