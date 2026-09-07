---
title: Multi-Project Platforms Reference
product: vercel
url: /docs/platforms/multi-project-platforms/reference
canonical_url: "https://vercel.com/docs/platforms/multi-project-platforms/reference"
last_updated: 2026-09-03
type: reference
prerequisites:
  - /docs/platforms/multi-project-platforms
  - /docs/platforms
related:
  - /docs/platforms/platform-elements/blocks/deploy-popover
  - /docs/platforms/platform-elements/actions/deploy-files
  - /docs/rest-api/projects/create-a-new-project
  - /docs/rest-api/deployments/create-a-new-deployment
  - /docs/rest-api/deployments/list-deployments
summary: API reference, error codes, troubleshooting, and FAQ for multi-project platforms on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-project-platforms/reference.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "5d961d914e962481d69fc1d627db0e347f99df950e7b306287813ecfb8174c88"
---

# Multi-Project Platforms Reference

## Custom blocks

Start with our Custom [Blocks](/docs/platforms/platform-elements/blocks/deploy-popover) and [Actions](/docs/platforms/platform-elements/actions/deploy-files) that speed up your usage of the Vercel API.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build a multi-tenant app with Next.js and Vercel](https://vercel.com/kb/guide/nextjs-multi-tenant-application?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-project-platforms%2Freference&source_site=vercel-docs&relationship=related) — Create a Next.js application with multi-tenancy and custom domain support on Vercel.
- [Introducing Vercel for Platforms](https://vercel.com/changelog/introducing-vercel-for-platforms?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-project-platforms%2Freference&source_site=vercel-docs&relationship=related)
- [Multi-tenant Reference](https://vercel.com/docs/platforms/multi-tenant-platforms/reference?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-project-platforms%2Freference&source_site=vercel-docs&relationship=related) — Reference for the Vercel domain API, error codes, troubleshooting, and FAQ for multi-tenant platforms.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-project-platforms%2Freference&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.
- [Multi-Tenant Platforms](https://vercel.com/docs/platforms/multi-tenant-platforms?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-project-platforms%2Freference&source_site=vercel-docs&relationship=related) — Serve multiple customers from a single codebase and deployment, routing each tenant by subdomain or custom domain.
- [Multi-Tenant Platform Concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-project-platforms%2Freference&source_site=vercel-docs&relationship=related) — Understand tenants, domains, routing, and architecture for building multi-tenant applications on Vercel for Platforms.
- [Multi-Tenant Platform Quickstart](https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-project-platforms%2Freference&source_site=vercel-docs&relationship=related) — Set up wildcard domains, custom domains, domain verification, and redirects for a multi-tenant application on Vercel.

Full cross-link map for this page: [/docs/platforms/multi-project-platforms/reference.graph.md](/docs/platforms/multi-project-platforms/reference.graph.md?from=related&source_path=%2Fdocs%2Fplatforms%2Fmulti-project-platforms%2Freference&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Projects & Deployments API reference

### Create project

Create a new Vercel project using the [create project API](/docs/rest-api/projects/create-a-new-project).

**SDK**:

```ts filename="create-project.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.projects.createProject({
    teamId: 'your_team_id_here',
    slug: 'your_team_slug_here',
    requestBody: {
      name: 'your_project_name_here',
    },
  });

  console.log(result);
}

run();
```

### Deploy to project

Create a deployment for a project using the [create deployment API](/docs/rest-api/deployments/create-a-new-deployment).

**SDK**:

```ts filename="deploy-files.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.deployments.createDeployment({
    teamId: 'your_team_id_here',
    slug: 'your_team_slug_here',
    requestBody: {
      files: [
        {
          data: '<h1>Hello from Vercel</h1>',
          file: 'index.html',
        },
      ],
      name: 'your_project_name_here',
      project: 'your_project_name_here',
      projectSettings: {
        framework: null,
      },
      target: 'production',
    },
  });

  console.log(result);
}

run();
```

### List deployments

Get deployments for a project using the [list deployments API](/docs/rest-api/deployments/list-deployments).

**SDK**:

```ts filename="list-deployments.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.deployments.getDeployments({
    limit: 10,
    projectId: 'your_project_id_here',
    state: 'BUILDING,READY',
    teamId: 'your_team_id_here',
    slug: 'your_team_slug_here',
  });

  console.log(result);
}

run();
```

### Delete project

Remove a project using the [delete project API](/docs/rest-api/projects/delete-a-project).

> **⚠️ Warning:** Deleting a project also deletes its deployments and cannot be undone.

**SDK**:

```ts filename="delete-project.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  await vercel.projects.deleteProject({
    idOrName: 'your_project_id_or_name_here',
    teamId: 'your_team_id_here',
    slug: 'your_team_slug_here',
  });
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
- [Vercel SDK](/docs/rest-api/sdk): Complete SDK documentation


---

[View full sitemap](/docs/sitemap)
