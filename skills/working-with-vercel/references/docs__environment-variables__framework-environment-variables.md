---
title: Framework environment variables
product: vercel
url: /docs/environment-variables/framework-environment-variables
canonical_url: "https://vercel.com/docs/environment-variables/framework-environment-variables"
last_updated: 2026-09-16
type: reference
prerequisites:
  - /docs/environment-variables
related:
  - /docs/builds/configure-a-build
  - /docs/environment-variables
summary: "Framework environment variables are automatically populated by the Vercel, based on your project's framework."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/environment-variables/framework-environment-variables.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "eb4d43b3daefe367b643da009a937d4d383565b29723716ace9846c6eab007e4"
---

# Framework environment variables

Frameworks typically use a prefix to expose environment variables to the browser.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Environment Variables](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables) — Vercel MCP tools for environment variables.
- [System environment variables](https://vercel.com/docs/environment-variables/system-environment-variables) — System environment variables are automatically populated by Vercel, such as the URL of the deployment or the name of the
- [Conditional Build Commands: Environment, Branch, and Custom Workflows](https://vercel.com/kb/guide/dynamic-build-commands) — Run a different Vercel build command for each environment or Git branch using a shell script, vercel.json, or vercel.ts,
- [Environment Variables UI](https://vercel.com/blog/environment-variables-ui)
- [Deploy to Vercel with Self-Hosted Git Pipelines \\(GitLab & Bitbucket\\)](https://vercel.com/kb/guide/how-can-i-use-gitlab-pipelines-with-vercel) — Learn how to use GitLab Pipelines to deploy to Vercel including support for self-managed GitLab.
- [Git Configuration](https://vercel.com/docs/project-configuration/git-configuration) — Learn how to configure Git for your project through vercel.json or vercel.ts.
- [vercel env](https://vercel.com/docs/cli/env) — Learn how to manage your environment variables in your Vercel Projects using the vercel env CLI command.
- [Get a deployment by ID or URL](https://vercel.com/docs/rest-api/deployments/get-a-deployment-by-id-or-url) — GET /v13/deployments/{idOrUrl} — Retrieves information for a deployment either by supplying its ID \\(\\`id\\` property\\) o

Full cross-link map for this page: [/docs/environment-variables/framework-environment-variables.graph.md](/docs/environment-variables/framework-environment-variables.graph.md)
<!-- /docsgraph:related -->

The following prefixed environment variables will be available during the **build step**, based on the project's selected [framework preset](/docs/builds/configure-a-build#framework-preset).

## Using prefixed framework environment variables locally

Many frontend frameworks require prefixes on environment variable names to make them available to the client, such as `NEXT_PUBLIC_` for Next.js or `PUBLIC_` for Astro. Vercel adds these prefixes automatically for your production and preview deployments, **but not for your local development environment**.

**Framework environment variables are not prefixed when pulled into your local development environment with `vercel env pull`**. For example, `VERCEL_ENV` will not be prefixed to `NEXT_PUBLIC_VERCEL_ENV`.

To use framework-prefixed environment variables locally:

1. [Define them in your project settings](/docs/environment-variables#creating-environment-variables) with the appropriate prefix
2. Scope them to `Development`
3. Pull them into your local environment with Vercel CLI using the `vercel env pull` command

## Framework environment variables

#### Next.js

### `NEXT_PUBLIC_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
NEXT_PUBLIC_VERCEL_ENV=production
```

### `NEXT_PUBLIC_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
NEXT_PUBLIC_VERCEL_TARGET_ENV=production
```

### `NEXT_PUBLIC_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
NEXT_PUBLIC_VERCEL_URL=my-site.vercel.app
```

### `NEXT_PUBLIC_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
NEXT_PUBLIC_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `NEXT_PUBLIC_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
NEXT_PUBLIC_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `NEXT_PUBLIC_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
NEXT_PUBLIC_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `NEXT_PUBLIC_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
NEXT_PUBLIC_VERCEL_GIT_PROVIDER=github
```

### `NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG=my-site
```

### `NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER=acme
```

### `NEXT_PUBLIC_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
NEXT_PUBLIC_VERCEL_GIT_REPO_ID=117716146
```

### `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `NEXT_PUBLIC_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
NEXT_PUBLIC_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### Nuxt

### `NUXT_ENV_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
NUXT_ENV_VERCEL_ENV=production
```

### `NUXT_ENV_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
NUXT_ENV_VERCEL_TARGET_ENV=production
```

### `NUXT_ENV_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
NUXT_ENV_VERCEL_URL=my-site.vercel.app
```

### `NUXT_ENV_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
NUXT_ENV_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `NUXT_ENV_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
NUXT_ENV_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `NUXT_ENV_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
NUXT_ENV_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `NUXT_ENV_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
NUXT_ENV_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `NUXT_ENV_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
NUXT_ENV_VERCEL_GIT_PROVIDER=github
```

### `NUXT_ENV_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
NUXT_ENV_VERCEL_GIT_REPO_SLUG=my-site
```

### `NUXT_ENV_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
NUXT_ENV_VERCEL_GIT_REPO_OWNER=acme
```

### `NUXT_ENV_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
NUXT_ENV_VERCEL_GIT_REPO_ID=117716146
```

### `NUXT_ENV_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
NUXT_ENV_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `NUXT_ENV_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
NUXT_ENV_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `NUXT_ENV_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
NUXT_ENV_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `NUXT_ENV_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
NUXT_ENV_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `NUXT_ENV_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
NUXT_ENV_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `NUXT_ENV_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
NUXT_ENV_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `NUXT_ENV_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
NUXT_ENV_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### Create React App

### `REACT_APP_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
REACT_APP_VERCEL_ENV=production
```

### `REACT_APP_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
REACT_APP_VERCEL_TARGET_ENV=production
```

### `REACT_APP_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
REACT_APP_VERCEL_URL=my-site.vercel.app
```

### `REACT_APP_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
REACT_APP_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `REACT_APP_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
REACT_APP_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `REACT_APP_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
REACT_APP_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `REACT_APP_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
REACT_APP_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `REACT_APP_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
REACT_APP_VERCEL_GIT_PROVIDER=github
```

### `REACT_APP_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
REACT_APP_VERCEL_GIT_REPO_SLUG=my-site
```

### `REACT_APP_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
REACT_APP_VERCEL_GIT_REPO_OWNER=acme
```

### `REACT_APP_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
REACT_APP_VERCEL_GIT_REPO_ID=117716146
```

### `REACT_APP_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
REACT_APP_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `REACT_APP_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
REACT_APP_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `REACT_APP_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
REACT_APP_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `REACT_APP_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
REACT_APP_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `REACT_APP_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
REACT_APP_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `REACT_APP_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
REACT_APP_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `REACT_APP_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
REACT_APP_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### Gatsby.js

### `GATSBY_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
GATSBY_VERCEL_ENV=production
```

### `GATSBY_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
GATSBY_VERCEL_TARGET_ENV=production
```

### `GATSBY_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
GATSBY_VERCEL_URL=my-site.vercel.app
```

### `GATSBY_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
GATSBY_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `GATSBY_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
GATSBY_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `GATSBY_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
GATSBY_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `GATSBY_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
GATSBY_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `GATSBY_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
GATSBY_VERCEL_GIT_PROVIDER=github
```

### `GATSBY_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
GATSBY_VERCEL_GIT_REPO_SLUG=my-site
```

### `GATSBY_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
GATSBY_VERCEL_GIT_REPO_OWNER=acme
```

### `GATSBY_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
GATSBY_VERCEL_GIT_REPO_ID=117716146
```

### `GATSBY_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
GATSBY_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `GATSBY_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
GATSBY_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `GATSBY_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
GATSBY_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `GATSBY_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
GATSBY_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `GATSBY_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
GATSBY_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `GATSBY_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
GATSBY_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `GATSBY_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
GATSBY_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### SolidStart (v0)

### `VITE_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
VITE_VERCEL_ENV=production
```

### `VITE_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
VITE_VERCEL_TARGET_ENV=production
```

### `VITE_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
VITE_VERCEL_URL=my-site.vercel.app
```

### `VITE_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
VITE_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `VITE_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
VITE_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `VITE_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
VITE_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `VITE_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
VITE_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `VITE_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
VITE_VERCEL_GIT_PROVIDER=github
```

### `VITE_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
VITE_VERCEL_GIT_REPO_SLUG=my-site
```

### `VITE_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
VITE_VERCEL_GIT_REPO_OWNER=acme
```

### `VITE_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
VITE_VERCEL_GIT_REPO_ID=117716146
```

### `VITE_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
VITE_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `VITE_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
VITE_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `VITE_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
VITE_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `VITE_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
VITE_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `VITE_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
VITE_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `VITE_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
VITE_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `VITE_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
VITE_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### SvelteKit (v0)

### `VITE_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
VITE_VERCEL_ENV=production
```

### `VITE_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
VITE_VERCEL_TARGET_ENV=production
```

### `VITE_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
VITE_VERCEL_URL=my-site.vercel.app
```

### `VITE_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
VITE_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `VITE_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
VITE_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `VITE_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
VITE_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `VITE_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
VITE_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `VITE_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
VITE_VERCEL_GIT_PROVIDER=github
```

### `VITE_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
VITE_VERCEL_GIT_REPO_SLUG=my-site
```

### `VITE_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
VITE_VERCEL_GIT_REPO_OWNER=acme
```

### `VITE_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
VITE_VERCEL_GIT_REPO_ID=117716146
```

### `VITE_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
VITE_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `VITE_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
VITE_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `VITE_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
VITE_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `VITE_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
VITE_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `VITE_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
VITE_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `VITE_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
VITE_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `VITE_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
VITE_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### Blitz.js (Legacy)

### `NEXT_PUBLIC_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
NEXT_PUBLIC_VERCEL_ENV=production
```

### `NEXT_PUBLIC_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
NEXT_PUBLIC_VERCEL_TARGET_ENV=production
```

### `NEXT_PUBLIC_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
NEXT_PUBLIC_VERCEL_URL=my-site.vercel.app
```

### `NEXT_PUBLIC_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
NEXT_PUBLIC_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `NEXT_PUBLIC_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
NEXT_PUBLIC_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `NEXT_PUBLIC_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
NEXT_PUBLIC_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `NEXT_PUBLIC_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
NEXT_PUBLIC_VERCEL_GIT_PROVIDER=github
```

### `NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG=my-site
```

### `NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER=acme
```

### `NEXT_PUBLIC_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
NEXT_PUBLIC_VERCEL_GIT_REPO_ID=117716146
```

### `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
NEXT_PUBLIC_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `NEXT_PUBLIC_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
NEXT_PUBLIC_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### Astro

### `PUBLIC_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
PUBLIC_VERCEL_ENV=production
```

### `PUBLIC_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
PUBLIC_VERCEL_TARGET_ENV=production
```

### `PUBLIC_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
PUBLIC_VERCEL_URL=my-site.vercel.app
```

### `PUBLIC_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
PUBLIC_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `PUBLIC_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
PUBLIC_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `PUBLIC_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
PUBLIC_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `PUBLIC_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
PUBLIC_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `PUBLIC_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
PUBLIC_VERCEL_GIT_PROVIDER=github
```

### `PUBLIC_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
PUBLIC_VERCEL_GIT_REPO_SLUG=my-site
```

### `PUBLIC_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
PUBLIC_VERCEL_GIT_REPO_OWNER=acme
```

### `PUBLIC_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
PUBLIC_VERCEL_GIT_REPO_ID=117716146
```

### `PUBLIC_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
PUBLIC_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `PUBLIC_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
PUBLIC_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `PUBLIC_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
PUBLIC_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `PUBLIC_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
PUBLIC_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `PUBLIC_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
PUBLIC_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### SolidStart (v1)

### `VITE_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
VITE_VERCEL_ENV=production
```

### `VITE_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
VITE_VERCEL_TARGET_ENV=production
```

### `VITE_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
VITE_VERCEL_URL=my-site.vercel.app
```

### `VITE_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
VITE_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `VITE_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
VITE_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `VITE_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
VITE_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `VITE_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
VITE_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `VITE_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
VITE_VERCEL_GIT_PROVIDER=github
```

### `VITE_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
VITE_VERCEL_GIT_REPO_SLUG=my-site
```

### `VITE_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
VITE_VERCEL_GIT_REPO_OWNER=acme
```

### `VITE_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
VITE_VERCEL_GIT_REPO_ID=117716146
```

### `VITE_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
VITE_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `VITE_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
VITE_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `VITE_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
VITE_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `VITE_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
VITE_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `VITE_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
VITE_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `VITE_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
VITE_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `VITE_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
VITE_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### Vue.js

### `VUE_APP_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
VUE_APP_VERCEL_ENV=production
```

### `VUE_APP_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
VUE_APP_VERCEL_TARGET_ENV=production
```

### `VUE_APP_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
VUE_APP_VERCEL_URL=my-site.vercel.app
```

### `VUE_APP_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
VUE_APP_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `VUE_APP_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
VUE_APP_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `VUE_APP_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
VUE_APP_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `VUE_APP_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
VUE_APP_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `VUE_APP_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
VUE_APP_VERCEL_GIT_PROVIDER=github
```

### `VUE_APP_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
VUE_APP_VERCEL_GIT_REPO_SLUG=my-site
```

### `VUE_APP_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
VUE_APP_VERCEL_GIT_REPO_OWNER=acme
```

### `VUE_APP_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
VUE_APP_VERCEL_GIT_REPO_ID=117716146
```

### `VUE_APP_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
VUE_APP_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `VUE_APP_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
VUE_APP_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `VUE_APP_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
VUE_APP_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `VUE_APP_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
VUE_APP_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `VUE_APP_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
VUE_APP_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `VUE_APP_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
VUE_APP_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `VUE_APP_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
VUE_APP_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### RedwoodJS

### `REDWOOD_ENV_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
REDWOOD_ENV_VERCEL_ENV=production
```

### `REDWOOD_ENV_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
REDWOOD_ENV_VERCEL_TARGET_ENV=production
```

### `REDWOOD_ENV_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
REDWOOD_ENV_VERCEL_URL=my-site.vercel.app
```

### `REDWOOD_ENV_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
REDWOOD_ENV_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `REDWOOD_ENV_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
REDWOOD_ENV_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `REDWOOD_ENV_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
REDWOOD_ENV_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `REDWOOD_ENV_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
REDWOOD_ENV_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `REDWOOD_ENV_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
REDWOOD_ENV_VERCEL_GIT_PROVIDER=github
```

### `REDWOOD_ENV_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
REDWOOD_ENV_VERCEL_GIT_REPO_SLUG=my-site
```

### `REDWOOD_ENV_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
REDWOOD_ENV_VERCEL_GIT_REPO_OWNER=acme
```

### `REDWOOD_ENV_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
REDWOOD_ENV_VERCEL_GIT_REPO_ID=117716146
```

### `REDWOOD_ENV_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
REDWOOD_ENV_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `REDWOOD_ENV_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
REDWOOD_ENV_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `REDWOOD_ENV_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
REDWOOD_ENV_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `REDWOOD_ENV_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
REDWOOD_ENV_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `REDWOOD_ENV_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
REDWOOD_ENV_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `REDWOOD_ENV_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
REDWOOD_ENV_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `REDWOOD_ENV_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
REDWOOD_ENV_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### Hydrogen (v1)

### `PUBLIC_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
PUBLIC_VERCEL_ENV=production
```

### `PUBLIC_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
PUBLIC_VERCEL_TARGET_ENV=production
```

### `PUBLIC_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
PUBLIC_VERCEL_URL=my-site.vercel.app
```

### `PUBLIC_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
PUBLIC_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `PUBLIC_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
PUBLIC_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `PUBLIC_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
PUBLIC_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `PUBLIC_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
PUBLIC_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `PUBLIC_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
PUBLIC_VERCEL_GIT_PROVIDER=github
```

### `PUBLIC_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
PUBLIC_VERCEL_GIT_REPO_SLUG=my-site
```

### `PUBLIC_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
PUBLIC_VERCEL_GIT_REPO_OWNER=acme
```

### `PUBLIC_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
PUBLIC_VERCEL_GIT_REPO_ID=117716146
```

### `PUBLIC_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
PUBLIC_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `PUBLIC_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
PUBLIC_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `PUBLIC_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
PUBLIC_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `PUBLIC_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
PUBLIC_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `PUBLIC_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
PUBLIC_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### Vite

### `VITE_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
VITE_VERCEL_ENV=production
```

### `VITE_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
VITE_VERCEL_TARGET_ENV=production
```

### `VITE_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
VITE_VERCEL_URL=my-site.vercel.app
```

### `VITE_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
VITE_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `VITE_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
VITE_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `VITE_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
VITE_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `VITE_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
VITE_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `VITE_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
VITE_VERCEL_GIT_PROVIDER=github
```

### `VITE_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
VITE_VERCEL_GIT_REPO_SLUG=my-site
```

### `VITE_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
VITE_VERCEL_GIT_REPO_OWNER=acme
```

### `VITE_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
VITE_VERCEL_GIT_REPO_ID=117716146
```

### `VITE_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
VITE_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `VITE_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
VITE_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `VITE_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
VITE_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `VITE_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
VITE_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `VITE_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
VITE_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `VITE_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
VITE_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `VITE_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
VITE_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### Sanity

### `SANITY_STUDIO_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
SANITY_STUDIO_VERCEL_ENV=production
```

### `SANITY_STUDIO_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
SANITY_STUDIO_VERCEL_TARGET_ENV=production
```

### `SANITY_STUDIO_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
SANITY_STUDIO_VERCEL_URL=my-site.vercel.app
```

### `SANITY_STUDIO_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
SANITY_STUDIO_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `SANITY_STUDIO_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
SANITY_STUDIO_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `SANITY_STUDIO_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
SANITY_STUDIO_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `SANITY_STUDIO_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
SANITY_STUDIO_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `SANITY_STUDIO_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
SANITY_STUDIO_VERCEL_GIT_PROVIDER=github
```

### `SANITY_STUDIO_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
SANITY_STUDIO_VERCEL_GIT_REPO_SLUG=my-site
```

### `SANITY_STUDIO_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
SANITY_STUDIO_VERCEL_GIT_REPO_OWNER=acme
```

### `SANITY_STUDIO_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
SANITY_STUDIO_VERCEL_GIT_REPO_ID=117716146
```

### `SANITY_STUDIO_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
SANITY_STUDIO_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `SANITY_STUDIO_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
SANITY_STUDIO_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `SANITY_STUDIO_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
SANITY_STUDIO_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `SANITY_STUDIO_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
SANITY_STUDIO_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `SANITY_STUDIO_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
SANITY_STUDIO_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `SANITY_STUDIO_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
SANITY_STUDIO_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `SANITY_STUDIO_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
SANITY_STUDIO_VERCEL_GIT_PULL_REQUEST_ID=23
```

#### Sanity (v2 - legacy)

### `SANITY_STUDIO_VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
SANITY_STUDIO_VERCEL_ENV=production
```

### `SANITY_STUDIO_VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
SANITY_STUDIO_VERCEL_TARGET_ENV=production
```

### `SANITY_STUDIO_VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
SANITY_STUDIO_VERCEL_URL=my-site.vercel.app
```

### `SANITY_STUDIO_VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
SANITY_STUDIO_VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `SANITY_STUDIO_VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
SANITY_STUDIO_VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `SANITY_STUDIO_VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
SANITY_STUDIO_VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `SANITY_STUDIO_VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
SANITY_STUDIO_VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `SANITY_STUDIO_VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
SANITY_STUDIO_VERCEL_GIT_PROVIDER=github
```

### `SANITY_STUDIO_VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
SANITY_STUDIO_VERCEL_GIT_REPO_SLUG=my-site
```

### `SANITY_STUDIO_VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
SANITY_STUDIO_VERCEL_GIT_REPO_OWNER=acme
```

### `SANITY_STUDIO_VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
SANITY_STUDIO_VERCEL_GIT_REPO_ID=117716146
```

### `SANITY_STUDIO_VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
SANITY_STUDIO_VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `SANITY_STUDIO_VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
SANITY_STUDIO_VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `SANITY_STUDIO_VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
SANITY_STUDIO_VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `SANITY_STUDIO_VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
SANITY_STUDIO_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `SANITY_STUDIO_VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
SANITY_STUDIO_VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `SANITY_STUDIO_VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch. It's empty on a branch's first deployment, since that branch has no previous successful deployment yet.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
SANITY_STUDIO_VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `SANITY_STUDIO_VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
SANITY_STUDIO_VERCEL_GIT_PULL_REQUEST_ID=23
```


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
