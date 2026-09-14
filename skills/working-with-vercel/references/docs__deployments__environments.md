---
title: Environments
product: vercel
url: /docs/deployments/environments
canonical_url: "https://vercel.com/docs/deployments/environments"
last_updated: 2026-08-14
type: conceptual
prerequisites:
  - /docs/deployments
related:
  - /docs/frameworks
  - /docs/cli
  - /docs/git
  - /docs/deployments/generated-urls
  - /docs/domains/working-with-domains/add-a-domain-to-environment
summary: Environments are for developing locally, testing changes in a pre-production environment, and serving end-users in production.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/environments.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "2fdd8d12d473a85fe3cf736a3b7278a9428c6c08154a4824d80972eaddedd14c"
---

# Environments

Vercel provides three default environments—**Local**, **Preview**, and **Production**:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to set up a staging environment on Vercel](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=related) — Set up a staging environment on Vercel with custom environments, staged production deployments, or a branch-based previe
- [Additional custom environments can now be purchased](https://vercel.com/changelog/additional-custom-environments-can-now-be-purchased?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=related)
- [Prioritize production builds available on all plans](https://vercel.com/changelog/prioritize-production-deployments-to-build-before-queued-preview?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=related)
- [Set team-wide defaults for Deployment Protection](https://vercel.com/changelog/set-team-wide-defaults-for-deployment-protection?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=related)
- [Vercel Connect now supports Custom Environments](https://vercel.com/changelog/vercel-connect-now-supports-custom-environments?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=related)
- [Vercel Secure Compute now supports multiple environments](https://vercel.com/changelog/vercel-secure-compute-now-supports-multiple-environments?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=related)
- [Are Vercel Preview Deployments indexed by search engines?](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=related) — Vercel Preview Deployments aren't indexed by default. Learn how the noindex header works, how to confirm it, and the cus
- [How to prepare your storefront for Black Friday traffic](https://vercel.com/kb/guide/black-friday-preparation?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=related) — A practical checklist for keeping your storefront fast and your checkout path healthy through Black Friday and Cyber Mon
- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=related) — Vercel deployments use dynamic IPs by default. Learn how Static IPs, Secure Compute, and AWS PrivateLink give you a fixe
- [How to use a non-default branch for production deployments on Vercel](https://vercel.com/kb/guide/can-i-use-a-non-default-branch-for-production?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=related) — Learn how to set a non-default branch for production on Vercel. Open the Production environment, change branch tracking,
- [Life of a Vercel request: Application-aware routing](https://vercel.com/blog/life-of-a-request-application-aware-routing?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=related)
- [The developer experience of the Frontend Cloud](https://vercel.com/blog/the-developer-experience-of-the-frontend-cloud?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/deployments/environments.graph.md](/docs/deployments/environments.graph.md?from=related&source_path=%2Fdocs%2Fdeployments%2Fenvironments&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

1. **Local Development**: developing and testing code changes on your local machine
2. **Preview**: deploying for further testing, QA, or collaboration without impacting your live site
3. **Production**: deploying the final changes to your user-facing site with the production domain

Pro and Enterprise teams can create **Custom Environments** for more specialized workflows (e.g., `staging`, `QA`). Every environment can define its own unique environment variables, like database connection information or API keys.

## Local Development Environment

This environment is where you develop new features and fix bugs on your local machine. When building with [frameworks](/docs/frameworks), use the [Vercel CLI](/docs/cli) to pull the environment variables for your project.

1. **Install the Vercel CLI**:

**Terminal**

```bash filename="Terminal" package-manager="npm"
npm i -g vercel
```

**Terminal**

```bash filename="Terminal" package-manager="bun"
bun i -g vercel
```

**Terminal**

```bash filename="Terminal" package-manager="yarn"
yarn global add vercel
```

**Terminal**

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

## Setting up a staging environment

Use a staging workflow to test changes before serving them on your production domains. Choose a workflow based on what you need to verify:

| Workflow | Use it when | Availability |
| --- | --- | --- |
| [Custom staging environment](#using-a-custom-environment-for-staging) | You need a named environment with its own branch tracking, domain, and variables. | Pro and Enterprise |
| [Preview branch for staging](#using-a-preview-branch-for-staging) | You want a persistent staging branch with a domain and branch-specific variables. | All plans, including Hobby |
| [Staged production deployment](#verifying-a-production-build-before-promotion) | You want to verify a build with production configuration before assigning production domains. | All plans |

### Using a custom environment for staging

1. [Create a custom environment](#creating-a-custom-environment) named `staging` in your project's **Environments** settings.
2. Configure **Branch Tracking** to match your staging branch.
3. Add the environment variables your staging deployment needs. If you import variables from another environment, review the values for your staging services.
4. [Assign a domain to the environment](/docs/domains/working-with-domains/add-a-domain-to-environment), such as `staging.example.com`.
5. Push to the matching branch to deploy your changes to staging.

The environment's domain points to its latest deployment. You can also deploy from the CLI with `vercel deploy --target=staging`.

### Using a preview branch for staging

1. Create a Git branch named `staging`, separate from your [production branch](/docs/git#production-branch).
2. Add a domain such as `staging.example.com` to your project and [assign it to the Git branch](/docs/domains/working-with-domains/assign-domain-to-a-git-branch). In the domain settings, select **Preview** and set **Git Branch** to `staging`.
3. Add [Preview environment variables for that branch](/docs/environment-variables#preview-environment-variables). Branch-specific values override Preview variables with the same name, so you only need to add the values that differ.
4. Push to `staging` to create a preview deployment. After changing environment variables, create a new deployment to apply them.
5. When testing is complete, merge your changes into the production branch. Keep the staging branch for future testing.

Confirm that the staging domain is assigned to **Preview** and the intended branch. New projects create a [production deployment first](#first-deployment), even when deployed from another branch.

### Verifying a production build before promotion

For a final check with production environment variables, [stage a production deployment](/docs/deployments/promoting-a-deployment#staging-and-promoting-a-production-deployment). In your project's **Environments** settings, select **Production**, open **Branch Tracking**, and disable **Auto-assign Custom Production Domains**.

Deployments from your production branch then wait for manual promotion before serving traffic on your production domains. Verify the deployment through its generated URL, then [promote it to production](/docs/deployments/promoting-a-deployment#staging-and-promoting-a-production-deployment). Promotion assigns the production domains without rebuilding.

Staged production deployments use production environment variables, so testing can access production services and data. Use a custom environment or preview branch with staging credentials when you need separate resources.

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

#### Dashboard

1. Go to your project's [**Environments**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironments\&title=Go+to+Environments+settings) settings in the Vercel Dashboard
2. Click **Create Environment**
3. Provide a name (e.g., `staging`), and optionally:
   - **Branch Tracking** to automatically deploy whenever a matching branch is pushed
   - **Attach a Domain** to give a persistent URL to your environment
   - **Import variables** from another environment to seed this environment with existing environment variables

#### cURL

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

#### SDK

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
