---
title: Environments
product: vercel
url: /docs/deployments/environments
canonical_url: "https://vercel.com/docs/deployments/environments"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/deployments
related:
  - /docs/frameworks
  - /docs/cli
  - /docs/git
  - /docs/deployments/generated-urls
  - /docs/deployments/promoting-a-deployment
summary: Environments are for developing locally, testing changes in a pre-production environment, and serving end-users in production.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/environments.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ee199cde7ef81946b41c516f8cb21f575806aab241ff0a200fd5e20b8d538a05"
---

# Environments

Vercel provides three default environments—**Local**, **Preview**, and **Production**:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Are Vercel Preview Deployments indexed by search engines?](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines?from=related) — Vercel Preview Deployments aren't indexed by default. Learn how the noindex header works, how to confirm it, and the cus
- [How to prepare your storefront for Black Friday traffic](https://vercel.com/kb/guide/black-friday-preparation?from=related) — A practical checklist for keeping your storefront fast and your checkout path healthy through Black Friday and Cyber Mon
- [Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel?from=related) — Learn how to deploy a TanStack Start app to Vercel using the Nitro Vite plugin. Covers framework setup, Git and CLI depl
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker?from=related) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [Deploy PHP on Vercel with Docker](https://vercel.com/kb/guide/deploy-php-on-vercel-with-docker?from=related) — Build a PHP application with FrankenPHP and Docker, then deploy it to Vercel Functions with managed configuration, stora
- [Environment Variables](https://vercel.com/docs/environment-variables?from=related) — Learn more about environment variables on Vercel.
- [Manage Across Environments](https://vercel.com/docs/environment-variables/manage-across-environments?from=related) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [Create a custom environment for the current project.](https://vercel.com/docs/rest-api/environment/create-a-custom-environment-for-the-current-project?from=related)
- [Deploy from CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Retrieve a custom environment](https://vercel.com/docs/rest-api/environment/retrieve-a-custom-environment?from=related)

Full cross-link map for this page: [/docs/deployments/environments.graph.md](/docs/deployments/environments.graph.md)
<!-- /docsgraph:related -->

1. **Local Development**: developing and testing code changes on your local machine
2. **Preview**: deploying for further testing, QA, or collaboration without impacting your live site
3. **Production**: deploying the final changes to your user-facing site with the production domain

Pro and Enterprise teams can create **Custom Environments** for more specialized workflows (e.g., `staging`, `QA`). Every environment can define its own unique environment variables, like database connection information or API keys.

## Local Development Environment

This environment is where you develop new features and fix bugs on your local machine. When building with [frameworks](/docs/frameworks), use the [Vercel CLI](/docs/cli) to pull the environment variables for your project.

1. **Install the Vercel CLI**:

```bash filename="Terminal" package-manager="npm"
npm i -g vercel
```

```bash filename="Terminal" package-manager="bun"
bun i -g vercel
```

```bash filename="Terminal" package-manager="yarn"
yarn global add vercel
```

```bash filename="Terminal" package-manager="pnpm"
pnpm i -g vercel
```

2. **Link your Vercel project** with your local directory:

   ```bash
   vercel link
   ```

3. **Pull environment variables locally** for use with application development:

   ```bash
   vercel env pull
   ```

This will populate the `.env.local` file in your application directory.

## Preview Environment (Pre-production)

**Preview** environments allow you to deploy and test changes in a live setting, without affecting your production site. By default, Vercel creates a preview deployment when you:

- Push a commit to a branch that is **not** your production branch (commonly `main`)
- Create a pull request (PR) on [GitHub, GitLab](/docs/git), or Bitbucket
- Deploy using the CLI without the `--prod` flag, for example just `vercel`

> **💡 Note:** The [first deployment](#first-deployment) of a new project is always a
> production deployment. The preview rules above apply only after that first
> production deployment exists.

Each deployment gets an automatically generated URL, and you'll typically see links appear in your Git provider's PR comments or in the Vercel Dashboard.

There are two types of preview URLs:

- **Branch-specific URL** – Always points to the latest changes on that branch
- **Commit-specific URL** – Points to the exact deployment of that commit

Learn more about [generated URLs](/docs/deployments/generated-urls).

## Production Environment

The **Production** environment is the live, user-facing version of your site or application.

By default, pushing or merging changes into your production branch (commonly `main`) triggers a production deployment. You can also explicitly deploy to production via the CLI:

```bash
vercel --prod
```

When a production deployment succeeds, Vercel updates your production domains to point to the new deployment, ensuring your users see the latest changes immediately. For advanced workflows, you can disable the auto-promotion of deployments and [manually control promotion](/docs/deployments/promoting-a-deployment).

### First deployment

The first deployment of a new project is always a **production** deployment. This happens even when you:

- Import a Git repository in the dashboard
- Run `vercel` or `vercel deploy` from the CLI without `--prod`
- Deploy from a branch that is not your [production branch](/docs/git#production-branch)

Vercel does this so every new project has a production deployment and can receive [production domains](/docs/domains/working-with-domains/deploying-and-redirecting) right away.

After that first production deployment, later deployments follow the usual rules:

- Commits to the production branch, or `vercel --prod`, create production deployments
- Other branches, pull requests, and `vercel` without `--prod` create [preview deployments](#preview-environment-pre-production)

## Custom Environments

> **🔒 Permissions Required**: Custom environments

Custom environments are useful for longer-running pre-production environments like `staging`, `QA`, or any other specialized workflow you require.

Team owners and project admins can create, update, or remove custom environments.

### Creating a custom environment

#### \['Dashboard'

1. Go to your project's [**Environments**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironments\&title=Go+to+Environments+settings) settings in the Vercel Dashboard
2. Click **Create Environment**
3. Provide a name (e.g., `staging`), and optionally:
   - **Branch Tracking** to automatically deploy whenever a matching branch is pushed
   - **Attach a Domain** to give a persistent URL to your environment
   - **Import variables** from another environment to seed this environment with existing environment variables

#### 'cURL'

To create an Authorization Bearer token, see the [access token](/docs/rest-api#creating-an-access-token) section of the API documentation.

```bash filename="cURL"
curl --request POST \
  --url https://api.vercel.com/v9/projects/<project-id-or-name>/custom-environments \
  --header "Authorization: Bearer $VERCEL_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "slug": "<environment_name_slug>",
    "description": "<environment_description>",
  }'
```

#### 'SDK']

To create an Authorization Bearer token, see the [access token](/docs/rest-api#creating-an-access-token) section of the API documentation.

```ts filename="createCustomEnvironment"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.environment.createCustomEnvironment({
    idOrName: '<project-id-or-name>',
    requestBody: {
      slug: '<environment_name_slug>',
      description: '<environment_description>',
    },
  });
  // Handle the result
  console.log(result);
}

run();
```

### Using custom environments via the CLI

You can deploy, pull, and manage environment variables to your custom environment with the CLI:

```bash
# Deploy to a custom environment named "staging":
vercel deploy --target=staging

# Pull environment variables from "staging":
vercel pull --environment=staging

# Add environment variables to "staging":
vercel env add MY_KEY staging
```

### Using custom environments with Vercel Connect

You can scope [Vercel Connect](/docs/connect) token access and trigger forwarding to a Custom Environment. This lets a staging or QA deployment use a connector without enabling it in any built-in Connect environment: Production, Preview, or Development.

In the Vercel Dashboard, open a connector's **Projects** section and select the Custom Environment when adding or editing a project link. From the CLI, pass the environment's slug:

```bash
vercel connect attach slack/acme-slack --environment staging
```

You can also select the Custom Environment as a trigger destination in the dashboard or with the CLI:

```bash
vercel connect attach slack/acme-slack --environment staging --triggers \
  --trigger-environment staging --trigger-path /api/slack-events
```

The trigger target is added to the connector's project link automatically. For a project with no existing trigger destinations, passing `--environment staging`, as shown above, keeps token access limited to `staging`. Existing trigger destinations remain registered, and the CLI preserves any Custom Environments they require on the project link. Before sending events to a Custom Environment, deploy to it and [assign a domain](/docs/domains/working-with-domains/add-a-domain-to-environment) to the environment. The domain must be verified and serve the environment's latest deployment directly rather than redirect elsewhere.

See [Project links](/docs/connect/concepts/project-links) for token-access configuration and [Triggers](/docs/connect/concepts/triggers) for destination setup and lifecycle behavior.

### Pricing and limits

Custom environments are available at no additional cost on the Pro and Enterprise plans. The number of custom environments you can create is based on your plan:

- **Pro**: 1 custom environment per project
- **Enterprise**: 12 custom environments per project

## More resources

- [Learn about the different environments on Vercel](https://www.youtube.com/watch?v=nZrAgov_-D8)


---

[View full sitemap](/docs/sitemap)
