---
title: Quickstart
product: vercel
url: /docs/platforms/multi-project-platforms/quickstart
canonical_url: "https://vercel.com/docs/platforms/multi-project-platforms/quickstart"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/multi-project-platforms
  - /docs/platforms
related:
  - /docs/rest-api/reference/endpoints/projects/create-a-new-project
  - /docs/deployments/environments
  - /docs/rest-api/reference/endpoints/deployments/create-a-new-deployment
  - /docs/platforms/platform-elements/actions/deploy-files
  - /docs/platforms/multi-tenant-platforms/configuring-domains
summary: Learn about quickstart on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-project-platforms/quickstart.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "5f4b28dc04b95cb71b1abd89438f26ba5076ff8cd742613c14c70dd8f26b844c"
---

# Multi-Project Platforms Quickstart

Let's explore integrating user generated sites with Vercel, providing a system for creating preview environments for your customers. The integration involves project creation, deployment management, domain aliasing (with custom suffixes), and SSO protection to secure all deployments.

Vercel's API endpoints handle project creation, deployment configuration, domain assignment, and security settings, enabling a seamless experience for your users to access and share their generated sites.

The integration would involve the following integrations:

1. Creating a Project for each chat
2. Deploying each version of the Artifact to the Project on demand when the user wants to "Publish"
3. Auto-aliasing the `*.CUSTOM_SUFFIX.com` domain that you want, or a user provided domain.
4. **Optional** Protecting all the deployments through a central proxy
5. **Optional** Configuring the sites as subpaths on a single domain

## Project Creation

- We recommend one project per user chat, the user can subsequently deploy multiple versions of the artifact to the same project (while still allowing all versions to stay active). The project becomes the organizational primitive for a single chat however
- [Create a project for each chat](/docs/rest-api/reference/endpoints/projects/create-a-new-project)
  - Configure the name of the project to help yourself come back to it and keep your Vercel account organized.
- Most common options to customize the behaviour of each tenant project:
  - `framework`: The framework the application is using (ie. Next.js, React ect.)
  - `serverlessFunctionRegion`: The region any of your compute runs in. (It will default to iad1 if not)
  - `passwordProtection`: Configure a password customers can use to protect their generations

```jsx filename="create-project.ts"
async function createProject() {
  const result = await vercel.projects.createProject({
    teamId: 'team_1a2b3c4d5e6f7g8h9i0j1k2l',
    slug: 'my-team-url-slug',
    requestBody: {
      name: 'a-project-name',
    },
  });

  console.log(result);
}
```

## Deployment

- [Every project has one "Production" domain that points to the most recent version (while keeping previous versions) and infinite "Preview" deployments](/docs/deployments/environments), for most applications it makes most sense to always deploy the version as a new "Production" deployment under the same project
- [Create a new Deployment with this endpoint](/docs/rest-api/reference/endpoints/deployments/create-a-new-deployment)
- Most common options to customize the behaviour of each tenant project:
  - `files`: The set of AI Generated files you want to deploy
  - `target`: preview or production. Both are the same underlying infrastructure but this is a semantic identifier you can add

Leverage our pre-configured [file deploy action](/docs/platforms/platform-elements/actions/deploy-files):

```jsx filename="deploy-files.ts"
import { deployFiles } from "@/actions/deploy-files"
import type { InlinedFile } from "@vercel/sdk/models/createdeploymentop"

// Example: Deploy a simple HTML site
const files: InlinedFile[] = [
  {
    file: "index.html",
    data: "<html><body><h1>Hello from my platform!</h1></body></html>"
  },
  {
    file: "package.json",
    data: JSON.stringify({
      name: "my-deployment",
      version: "1.0.0"
    })
  }
]

await deployFiles(files, {
  domain: "customer-site.com",
  deploymentName: "customer-deployment-1",
  projectId: "existing-project-id", // Optional: use existing project
  config: {
    framework: "nextjs",
    buildCommand: "npm run build",
    outputDirectory: ".next"
  }
})
```

## Domain Aliasing

- If you want deployments to have a custom suffix: `*.CUSTOM_SUFFIX.com`, you can:
  - Setup a [wildcard domain for your domain](/docs/platforms/multi-tenant-platforms/configuring-domains#using-wildcard-domains)
  - Use either of these to auto-assign the `*.CUSTOM_SUFFIX.com` domain:
    - [Assign a single domain that maps to the most recent production domain of the Project](/docs/rest-api/reference/endpoints/projects/add-a-domain-to-a-project)
    - [Alias a specific URL to only that one deployment in a project](/docs/rest-api/reference/endpoints/aliases/assign-an-alias)
  - [Alternatively allow customers to bring in a domain they own elsewhere to assign to their sites](/docs/platforms/multi-tenant-platforms/configuring-domains)

## Protecting all deployments behind SSO or authentication, if you want central authentication (optional)

1. Create a Proxy site hosted in Vercel that all traffic will flow through that:
   1. Checks x.ai SSO and asks the user to log in if not
   2. Proxies back to the actual deployed application once authenticated
   3. Includes a [Deployment Bypass](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) header, that will lock down direct access to the Vercel applications
2. Alias all domains to the proxy site instead so all traffic goes to it first
3. Ensure `ssoProtection` is configured to `all` when creating the project to lock down access
   1. Configuring a bypass option on the deployment so the Proxy can still access it: [/docs/rest-api/reference/endpoints/projects/update-protection-bypass-for-automation](/docs/rest-api/reference/endpoints/projects/update-protection-bypass-for-automation)

## Configuring the sites to be subpaths instead of custom domains (optional)

- To ensure all these deployments can only be accessed as subpaths `domain.com/customer_a` you would first configure the same Proxy setup as in 4. (with or without authentication, depending on your product requirements.)
- This proxy would be [assigned the domain you want to share in it's Vercel project](/docs/domains/working-with-domains/add-a-domain)
- You can then create a [routing middleware](/docs/routing-middleware) in the Proxy, to be able to rewrite the paths to the domains they are hosted in Vercel.
  - It can dynamically pull the data from your backend or you can make it faster by caching it in [Edge Config](/docs/edge-config)


---

[View full sitemap](/docs/sitemap)
