---
title: System environment variables
product: vercel
url: /docs/environment-variables/system-environment-variables
canonical_url: "https://vercel.com/docs/environment-variables/system-environment-variables"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/environment-variables
related:
  - /docs/skew-protection
summary: System environment variables are automatically populated by Vercel, such as the URL of the deployment or the name of the Git branch deployed.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/environment-variables/system-environment-variables.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "6e261655a3d22effff3a9e867ba26b13052b8b4d46b0f727ad52ec30cb44aeee"
---

# System environment variables

Vercel provides a set of environment variables that are automatically populated by the system, such as the URL of the deployment or the name of the Git branch deployed.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Are Vercel Preview Deployments indexed by search engines?](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines?from=related) — Vercel Preview Deployments aren't indexed by default. Learn how the noindex header works, how to confirm it, and the cus
- [How to deploy a Shopify App to Vercel](https://vercel.com/kb/guide/deploy-shopify-app-to-vercel?from=related) — Deploy the official Shopify CLI React Router app template to Vercel with the @vercel/react-router preset and Postgres se
- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables?from=related) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [Troubleshooting Cross-Origin Errors \(net::ERR_BLOCKED_BY_ORB\) with Deployment Protection](https://vercel.com/kb/guide/troubleshooting-cross-origin-errors-neterr-blocked-by-orb-with-deployment-protection?from=related) — Learn to resolve \`net::ERR_BLOCKED_BY_ORB\` errors on protected Vercel deployments. This guide explains how cross-origi
- [GitLab](https://vercel.com/docs/git/vercel-for-gitlab?from=related) — ​Vercel for GitLab automatically deploys your GitLab projects with Vercel, providing Preview Deployment URLs, and automa
- [Bitbucket](https://vercel.com/docs/git/vercel-for-bitbucket?from=related) — ​Vercel for Bitbucket automatically deploys your Bitbucket projects with Vercel, providing Preview Deployment URLs, and
- [Framework Environment Variables](https://vercel.com/docs/environment-variables/framework-environment-variables?from=related) — Framework environment variables are automatically populated by the Vercel, based on your project's framework.
- [Project Settings](https://vercel.com/docs/project-configuration/project-settings?from=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Git Configuration](https://vercel.com/docs/project-configuration/git-configuration?from=related) — Learn how to configure Git for your project through vercel.json or vercel.ts.

Full cross-link map for this page: [/docs/environment-variables/system-environment-variables.graph.md](/docs/environment-variables/system-environment-variables.graph.md)
<!-- /docsgraph:related -->

## Enable system environment variables

To enable these environment variables to your deployments:

1. Navigate to your project on your [dashboard](/dashboard).
2. Select [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in the sidebar.
3. Select the **Enable access to System Environment Variables** checkbox.

> **💡 Note:** If you disable this setting, no deployment ID will be made available for supported frameworks (like Next.js) to use, which means [Skew Protection](/docs/skew-protection) will also be disabled.

## System environment variables

If you are using a framework for your project, Vercel provides the following prefixed environment variables:

> **💡 Note:** When you choose to enable system environment variables, some
> React warnings, such as those in a `create-react-app` will display as build
> errors. For more information on this error, see [How do I resolve a
> `process.env.CI = true`
> error?](/kb/guide/how-do-i-resolve-a-process-env-ci-true-error)

### `VERCEL`

**Available at:&#x20;**&#x42;oth build and runtime

An indicator to show that system environment variables have been exposed to your project's Deployments.

```bash
VERCEL=1
```

### `CI`

**Available at:&#x20;**&#x42;uild time

An indicator that the code is running in a Continuous Integration environment.

```bash
CI=1
```

### `VERCEL_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The environment that the app is deployed and running on. The value can be either production, preview, or development.

```bash
VERCEL_ENV=production
```

### `VERCEL_TARGET_ENV`

**Available at:&#x20;**&#x42;oth build and runtime

The system or custom environment that the app is deployed and running on. The value can be either production, preview, development, or the name of a custom environment.

```bash
VERCEL_TARGET_ENV=production
```

### `VERCEL_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated deployment URL. Example: \*.vercel.app. The value does not include the protocol scheme https://.

**Note:&#x20;**&#x54;his variable cannot be used in conjunction with Standard Deployment Protection. See Migrating to Standard Protection.

```bash
VERCEL_URL=my-site.vercel.app
```

### `VERCEL_BRANCH_URL`

**Available at:&#x20;**&#x42;oth build and runtime

The domain name of the generated Git branch URL. Example: \*-git-\*.vercel.app. The value does not include the protocol scheme https://.

```bash
VERCEL_BRANCH_URL=my-site-git-improve-about-page.vercel.app
```

### `VERCEL_PROJECT_PRODUCTION_URL`

**Available at:&#x20;**&#x42;oth build and runtime

A production domain name of the project. We select the shortest production custom domain, or vercel.app domain if no custom domain is available. Note, that this is always set, even in preview deployments. This is useful to reliably generate links that point to production such as OG-image URLs. The value does not include the protocol scheme https://.

```bash
VERCEL_PROJECT_PRODUCTION_URL=my-site.com
```

### `VERCEL_REGION`

**Available at:&#x20;**&#x52;untime

The ID of the Region where the app is running.

```bash
VERCEL_REGION=cdg1
```

### `VERCEL_DEPLOYMENT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the deployment, which can be used to implement Skew Protection.

```bash
VERCEL_DEPLOYMENT_ID=dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3
```

### `VERCEL_PROJECT_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The unique identifier for the project.

```bash
VERCEL_PROJECT_ID=prj_Rej9WaMNRbffVm34MfDqa4daCEvZzzE
```

### `VERCEL_SKEW_PROTECTION_ENABLED`

**Available at:&#x20;**&#x42;oth build and runtime

When Skew Protection is enabled in Project Settings, this value is set to 1.

```bash
VERCEL_SKEW_PROTECTION_ENABLED=1
```

### `VERCEL_AUTOMATION_BYPASS_SECRET`

**Available at:&#x20;**&#x42;oth build and runtime

The Protection Bypass for Automation value, if the secret has been generated in the project's Deployment Protection settings.

```bash
VERCEL_AUTOMATION_BYPASS_SECRET=secret
```

### `VERCEL_OIDC_TOKEN`

**Available at:&#x20;**&#x42;uild time

When Secure Backend Access with OpenID Connect (OIDC) Federation is enabled in Project Settings, this value is set to a Vercel-issued OIDC token. At runtime, the token is set to thex-vercel-oidc-token header on your functions' Request object. In local development, you can download the token using the CLI commandvercel env pull.

```bash
VERCEL_OIDC_TOKEN=secret
```

### `VERCEL_HASH_SALT`

**Available at:&#x20;**&#x42;uild time

A salt to rotate the filenames of framework-generated content-addressed output. See also Immutable Static Files.

```bash
VERCEL_HASH_SALT=1783933175
```

### `VERCEL_GIT_PROVIDER`

**Available at:&#x20;**&#x42;oth build and runtime

The Git Provider the deployment is triggered from.

```bash
VERCEL_GIT_PROVIDER=github
```

### `VERCEL_GIT_REPO_SLUG`

**Available at:&#x20;**&#x42;oth build and runtime

The origin repository the deployment is triggered from.

```bash
VERCEL_GIT_REPO_SLUG=my-site
```

### `VERCEL_GIT_REPO_OWNER`

**Available at:&#x20;**&#x42;oth build and runtime

The account that owns the repository the deployment is triggered from.

```bash
VERCEL_GIT_REPO_OWNER=acme
```

### `VERCEL_GIT_REPO_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The ID of the repository the deployment is triggered from.

```bash
VERCEL_GIT_REPO_ID=117716146
```

### `VERCEL_GIT_COMMIT_REF`

**Available at:&#x20;**&#x42;oth build and runtime

The git branch of the commit the deployment was triggered by.

```bash
VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `VERCEL_GIT_COMMIT_SHA`

**Available at:&#x20;**&#x42;oth build and runtime

The git SHA of the commit the deployment was triggered by.

```bash
VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `VERCEL_GIT_COMMIT_MESSAGE`

**Available at:&#x20;**&#x42;oth build and runtime

The message attached to the commit the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
VERCEL_GIT_COMMIT_MESSAGE=Update about page
```

### `VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

**Available at:&#x20;**&#x42;oth build and runtime

The username attached to the author of the commit that the project was deployed by.

```bash
VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `VERCEL_GIT_COMMIT_AUTHOR_NAME`

**Available at:&#x20;**&#x42;oth build and runtime

The name attached to the author of the commit that the project was deployed by.

```bash
VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `VERCEL_GIT_PREVIOUS_SHA`

**Available at:&#x20;**&#x42;uild time

The git SHA of the last successful deployment for the project and branch.

**Note:&#x20;**&#x54;his variable is only exposed when an Ignored Build Step is provided.

```bash
VERCEL_GIT_PREVIOUS_SHA=fa1eade47b73733d6312d5abfad33ce9e4068080
```

### `VERCEL_GIT_PULL_REQUEST_ID`

**Available at:&#x20;**&#x42;oth build and runtime

The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
VERCEL_GIT_PULL_REQUEST_ID=23
```


---

[View full sitemap](/docs/sitemap)
