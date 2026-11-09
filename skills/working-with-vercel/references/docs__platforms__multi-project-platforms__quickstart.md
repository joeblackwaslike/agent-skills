---
title: Multi-Project Platforms Quickstart
product: vercel
url: /docs/platforms/multi-project-platforms/quickstart
canonical_url: "https://vercel.com/docs/platforms/multi-project-platforms/quickstart"
last_updated: 2026-09-03
type: tutorial
prerequisites:
  - /docs/platforms/multi-project-platforms
  - /docs/platforms
related:
  - /docs/rest-api/sdk
  - /docs/platforms/multi-tenant-platforms/configuring-domains
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
  - /docs/platforms/platform-elements/blocks/claim-deployment
  - /docs/platforms/platform-elements/actions/deploy-files
summary: Programmatically host code for user-generated or AI-generated applications on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-project-platforms/quickstart.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "22c613876f81773690b1902102256abd32eea5db8772e8c982a49c7a81fdc7b5"
---

# Multi-Project Platforms Quickstart

In this quickstart, you'll create a Vercel project for one customer, deploy a folder of files to it, and get a public link that you can share with that customer. The guide uses the [Vercel SDK](/docs/rest-api/sdk) from a short TypeScript script and takes about 10 minutes.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing the Vercel Platforms Starter Kit](https://vercel.com/blog/platforms-starter-kit)
- [Introducing Vercel for Platforms](https://vercel.com/changelog/introducing-vercel-for-platforms)
- [Multi-Tenant Platform Quickstart](https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart) — Build a multi-tenant Next.js app on your computer, then add wildcard and custom domains on Vercel.
- [Multi-Project Platforms Concepts](https://vercel.com/docs/platforms/multi-project-platforms/concepts) — Understand projects, deployments, domains, and architecture for multi-project platforms on Vercel.
- [Multi-Project Platforms Reference](https://vercel.com/docs/platforms/multi-project-platforms/reference) — API reference, error codes, troubleshooting, and FAQ for multi-project platforms on Vercel.
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.

Full cross-link map for this page: [/docs/platforms/multi-project-platforms/quickstart.graph.md](/docs/platforms/multi-project-platforms/quickstart.graph.md)
<!-- /docsgraph:related -->

## Before you start

Before you write any code, make sure you have these three things:

- A Vercel account and a **team**. A team owns projects. Find the team ID in your team's **Settings** page, under **General**
- An **access token** for that team. Create one in [Account Settings > Tokens](https://vercel.com/account/settings/tokens) and choose your team as the scope
- Node.js 22 or later

Next, create a folder for the script, install the SDK and `tsx` (a tool that runs TypeScript files directly), and export your token and team ID. Note that we set `"type": "module"` in `package.json`, because the script uses top-level `await`:

```bash
npm init -y
npm pkg set type=module
npm install @vercel/sdk tsx
export VERCEL_TOKEN=<your token>
export VERCEL_TEAM_ID=<your team ID>
```

## Terms

This guide uses these terms:

- **Project**: one site or app on Vercel. In a multi-project platform, each customer or each generated app gets its own project
- **Deployment**: one immutable version of a project's files. Each deployment has its own URL
- **Production URL**: a stable `*.vercel.app` URL of a project, such as `<project-name>.vercel.app` or `<project-name>-<team>.vercel.app`. It always points at the latest production deployment
- **Deployment protection**: depending on your team's default setting, a new project can show a Vercel login page on its `*.vercel.app` URLs. A platform that shares links usually turns protection off for tenant projects

## Step 1: Create a project and deploy files

Next, write the script. It looks up the project for the customer `acme` and creates the project if it doesn't exist yet. Then it deploys every file in the `site` folder to production and waits until the production URL is ready. You can run the same script again each time the customer has a new version.

```ts filename="deploy-tenant.ts"
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { Vercel } from '@vercel/sdk';
import { SDKError } from '@vercel/sdk/models/sdkerror.js';

const vercel = new Vercel({ bearerToken: process.env.VERCEL_TOKEN });
const teamId = process.env.VERCEL_TEAM_ID;
const name = 'tenant-acme';
const folder = 'site';

// 1. First, we look up the tenant's project, and create it if it doesn't exist.
//    We set ssoProtection to null so that visitors don't see a Vercel login page
//    on the project's *.vercel.app URLs.
async function getOrCreateProject() {
  try {
    return await vercel.projects.getProject({ idOrName: name, teamId });
  } catch (error) {
    if (!(error instanceof SDKError && error.statusCode === 404)) {
      throw error;
    }

    return vercel.projects.createProject({
      teamId,
      requestBody: { name, ssoProtection: null },
    });
  }
}

// 2. Next, we read every file in the folder. We use base64 encoding here,
//    since it works for both text files and binary files such as images.
function readFolder(dir: string) {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const path = join(entry.parentPath, entry.name);

      return {
        file: relative(dir, path),
        data: readFileSync(path).toString('base64'),
        encoding: 'base64' as const,
      };
    });
}

const project = await getOrCreateProject();

// 3. Then we deploy the files to production.
const deployment = await vercel.deployments.createDeployment({
  teamId,
  requestBody: {
    name: project.name,
    project: project.id,
    target: 'production',
    files: readFolder(folder),
    // We set framework to null, since these are static files that need no build step
    projectSettings: { framework: null },
  },
});

// 4. Now we wait until the deployment is ready. Note that we also wait for
//    aliasAssigned, since Vercel assigns the production URL a moment after the
//    build finishes. We give up after 5 minutes.
let ready = await vercel.deployments.getDeployment({
  idOrUrl: deployment.id,
  teamId,
});
const deadline = Date.now() + 5 * 60 * 1000;

while (!(ready.readyState === 'READY' && ready.aliasAssigned)) {
  if (
    ready.readyState === 'ERROR' ||
    ready.readyState === 'CANCELED' ||
    Date.now() > deadline
  ) {
    throw new Error(
      `Deployment ${deployment.id} did not finish: ${ready.readyState}`,
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
  ready = await vercel.deployments.getDeployment({
    idOrUrl: deployment.id,
    teamId,
  });
}

// 5. Finally, we print the production URL. This URL always points at the
//    latest production deployment, so it stays the same for every new version.
const url = ready.alias?.find((alias) => alias.endsWith('.vercel.app'));

if (!url) {
  throw new Error(`Deployment ${deployment.id} has no vercel.app URL`);
}

console.log(ready.readyState, `https://${url}`);
```

To try it, create a `site` folder with one HTML file, then run the script. When the deployment is ready, the script prints the production URL:

```bash
mkdir -p site && echo '<h1>Hello from Acme</h1>' > site/index.html
npx tsx deploy-tenant.ts
# READY https://tenant-acme.vercel.app (or tenant-acme-<team>.vercel.app)
```

## Step 2: Give the customer a public link

The URL that the script prints is the project's production URL, and this is the link that you give to the customer. The link stays the same when you deploy new versions. Note that we don't use `deployment.url` here, since that URL points at one version only.

To make sure that the link is public, run `curl -I <link>`. You should see `HTTP/2 200`. If you see `HTTP/2 302` or `401` instead, the project still shows a login page.

Anyone can open the link because the script creates the project with `ssoProtection: null`. Note that this setting also makes every preview and older deployment URL of the project public. Without it, the project follows your team's default protection, which can show a Vercel login page on `*.vercel.app` URLs. If you already have a project that shows a login page, you can turn protection off with `vercel.projects.updateProject({ idOrName, teamId, requestBody: { ssoProtection: null } })`.

Note that we pass `framework: null` in the `projectSettings` of `createDeployment`, as the script does, since `createProject` doesn't accept `framework: null`.

When `getProject` can't find the project, the SDK throws an `SDKError` with `statusCode` set to `404`. That's how the script knows when to create the project.

## Step 3: Add a custom domain (optional)

If the customer has their own domain, you can add it to their project. As with the other calls, remember to pass `teamId`:

```ts
await vercel.projects.addProjectDomain({
  idOrName: project.id,
  teamId,
  requestBody: { name: 'acme-store.com' },
});
```

If you'd rather give every tenant a subdomain of your own domain, such as `acme.yourplatform.app`, add the wildcard domain `*.yourplatform.app` to your team once, then call `addProjectDomain` with `acme.yourplatform.app` for each tenant project. See [using wildcard domains](/docs/platforms/multi-tenant-platforms/configuring-domains#using-wildcard-domains).

For a custom domain, the customer then needs to add DNS records with their domain provider, so show them which records to add. See [Configuring domains](/docs/platforms/multi-tenant-platforms/configuring-domains).

## Secure tenant sites that run their own code

If your tenants run their own code, there are two more things to set up:

- **Isolate cookies between tenants**: if tenants run their own code on subdomains of your domain, such as `*.yourplatform.app`, submit that domain to the Public Suffix List so browsers isolate cookies between tenants. See [protecting tenant subdomains with the Public Suffix List](/docs/platforms/multi-tenant-platforms/configuring-domains#protecting-tenant-subdomains-with-the-public-suffix-list)
- **Use one sign-in for every tenant site**: keep `ssoProtection` on for tenant projects, and send traffic through one proxy project that checks your own sign-in and adds a [protection bypass header](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) when it forwards a request. Each tenant project has its own bypass secret, so the proxy stores one secret for each tenant project

## Next steps

- Deploy each new version of the customer's app with Step 1. Each call creates a new production deployment, and the production URL moves to it
- Let the customer take ownership of the project with the [Claim Deployment](/docs/platforms/platform-elements/blocks/claim-deployment) flow
- Serve every project behind one domain, such as `platform.com/acme`, with a routing project in front. See [How can I serve multiple projects under a single domain?](https://vercel.com/kb/guide/how-can-i-serve-multiple-projects-under-a-single-domain)
- Use the prebuilt [deploy-files action](/docs/platforms/platform-elements/actions/deploy-files) if your platform is a Next.js app


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
