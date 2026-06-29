---
title: Concepts
product: vercel
url: /docs/platforms/multi-project-platforms/concepts
canonical_url: "https://vercel.com/docs/platforms/multi-project-platforms/concepts"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/multi-project-platforms
  - /docs/platforms
related:
  - /docs/platforms/multi-project-platforms/quickstart
  - /docs/platforms/multi-project-platforms/reference
summary: Learn about concepts on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-project-platforms/concepts.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "2e92474add6164bc2a22946ef001a45ee8cdb3441f9aa963ee9a2ff15485ad2b"
---

# Multi-Project Platforms Concepts

## Projects

### What is a project

A Vercel project represents a single application with its own Git repository, environment variables, and deployment history. In multi-project architecture, each tenant gets their own dedicated Vercel project.

**Key characteristics**:

- Unique project ID
- Independent configuration
- Separate deployment history
- Isolated builds and functions

### Programmatic creation

Create projects using the Vercel SDK:

```ts filename="create-project.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

const { value: project } = await vercel.projects.createProject({
  teamId: 'team_1234',
  requestBody: {
    name: `tenant-${tenantId}`,
    framework: 'nextjs',
  },
});
```

### Project templates

Generate projects from templates to ensure consistency:

```ts filename="create-project-from-template.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

const { value: project } = await vercel.projects.createProject({
  teamId: 'team_1234',
  requestBody: {
    name: `tenant-${tenantId}`,
    gitRepository: {
      type: 'github',
      repo: 'your-org/tenant-template',
    },
  },
});
```

## Deployments

### Isolated deployments

Each project has independent deployments:

- Separate build processes
- Independent function execution
- Isolated environment variables
- Individual deployment URLs

### Deployment lifecycle

1. **Create**: Deploy code to project
2. **Build**: Vercel builds the application
3. **Preview**: Test deployment before promoting
4. **Production**: Promote deployment to production
5. **Rollback**: Revert to previous deployment if needed

### Preview vs production

**Preview deployments**:

- Generated for every Git push
- Unique URL per deployment
- Test changes before production

**Production deployments**:

- Live on project domains
- Promoted from preview or direct deploy
- Serves end users

## Domains

### Per-project domains

Each tenant project can have its own domains:

```ts filename="add-domain.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

await vercel.projects.addProjectDomain({
  idOrName: project.id,
  requestBody: {
    name: 'tenant1.com',
  },
});
```

### Automatic URLs

Every project gets automatic Vercel URLs:

- Production: `project-name.vercel.app`
- Preview: `project-name-git-branch.vercel.app`

### Custom domains per project

Configure custom domains independently for each tenant:

- Add domain via SDK
- Tenant configures DNS
- Verify ownership
- SSL certificate issues automatically

## Architecture

### Multiple projects vs single project

**Multi-Project**:

- Each tenant = separate Vercel project
- Complete isolation
- Independent scaling
- Higher management overhead

**Multi-Tenant** (single project):

- All tenants = one Vercel project
- Shared infrastructure
- Lower management overhead
- Application-level isolation

## Use cases

### When to use Multi-Project vs Multi-Tenant

**Use Multi-Project when**:

- Tenants deploy their own code
- Each tenant needs custom functionality
- Complete isolation is required (security, compliance)
- AI agents are generating and deploying code
- Users create applications from templates

**Use Multi-Tenant when**:

- All tenants use the same application
- Content differs but code is the same
- You want to deploy once, update all tenants
- Lower operational overhead preferred

### AI coding platforms

Perfect for platforms where:

- AI generates unique code per tenant
- Each tenant's app is different
- Users can deploy custom logic
- Examples: Spawn, Orchids, v0

### Template-based platforms

Ideal for:

- Creating projects from templates
- Customizing per tenant
- Maintaining consistency
- Rapid tenant onboarding

### User-generated applications

Well-suited for:

- Users creating their own apps
- Hosting user-generated content
- Platform controls infrastructure
- Users focus on their code

## Next steps

- [Quickstart](/docs/platforms/multi-project-platforms/quickstart): Get started with multi-project platforms
- [Reference](/docs/platforms/multi-project-platforms/reference): API reference and troubleshooting


---

[View full sitemap](/docs/sitemap)
