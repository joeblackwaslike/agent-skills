---
title: Environment variables
product: vercel
url: /docs/environment-variables
canonical_url: "https://vercel.com/docs/environment-variables"
last_updated: 2026-08-20
type: conceptual
prerequisites:
  []
related:
  - /docs/deployments/environments
  - /docs/projects
  - /docs/environment-variables/rotating-secrets
  - /docs/builds/configure-a-build
  - /docs/functions
summary: Learn more about environment variables on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/environment-variables.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "6582a5d8ba333f407b0de6a8fac42c3068ed8b1d9bfced738ae9b85e21320853"
---

# Environment variables

Environment variables are key-value pairs configured outside your source code so that each value can change depending on the [Environment](/docs/deployments/environments). These values are encrypted at rest and visible to any user that has access to the [project](/docs/projects). It is safe to use both non-sensitive and sensitive data, such as tokens. When you need to replace an API key, token, or other credential, follow the steps for [rotating environment variables](/docs/environment-variables/rotating-secrets) to update it without downtime.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=related) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [Using environment variables](https://turborepo.dev/docs/crafting-your-repository/using-environment-variables?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=related) — Account for environment variables in task hashing, configure environment modes, and handle .env files.
- [Deployments](https://v0.app/docs/deployments?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=related) — Preview and publish v0 projects on Vercel, then manage domains, visibility, and production updates.
- [Environment variables now use Config and Secret types](https://vercel.com/changelog/environment-variables-now-use-config-and-secret-types?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=related)
- [Environments Variables per Git branch](https://vercel.com/changelog/environments-variables-per-git-branch?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=related)
- [Improved environment variables UI](https://vercel.com/changelog/improved-environment-variables-ui?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=related)
- [New deployments of vulnerable Next.js applications are now blocked by default](https://vercel.com/changelog/new-deployments-of-vulnerable-next-js-applications-are-now-blocked-by?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=related)
- [New deployments with vulnerable versions of the third-party package next-mdx-remote are now blocked by default](https://vercel.com/changelog/new-deployments-with-vulnerable-versions-of-next-mdx-remote-are-now-blocked-by-default?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=related)
- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=related) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [Deploy a Bolt.new app with Vercel Drop](https://vercel.com/kb/guide/bolt-vercel-drop?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=related) — Export your Bolt.new project as a .zip and deploy it to Vercel with Vercel Drop. Vercel detects the framework and builds
- [Cost-aware model routing through AI Gateway](https://vercel.com/kb/guide/cost-aware-model-routing-with-ai-gateway?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=related) — Route easy requests to a cheap model and escalate only hard ones to a frontier model through one AI Gateway endpoint, wi
- [Build a daily digest bot with Chat SDK and Workflow SDK](https://vercel.com/kb/guide/daily-digest-bot-with-chat-sdk-and-workflow-sdk?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=related) — Build a daily digest bot that posts a daily digest of GitHub stats to Slack. Learn how to use Vercel Connect to set up S

Full cross-link map for this page: [/docs/environment-variables.graph.md](/docs/environment-variables.graph.md?from=related&source_path=%2Fdocs%2Fenvironment-variables&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Your source code can read these values to change behavior during the [Build Step](/docs/builds/configure-a-build) or during [Function](/docs/functions) execution.

Any change you make to environment variables are not applied to previous deployments, they only apply to new deployments.

## Creating environment variables

Environment variables can either be declared at the team or project level. When declared at the team level, they are available to all projects within the team. When declared at the project level, they are only available to that project.

To learn how to create and manage environment variables, see [Managing environment variables](/docs/environment-variables/managing-environment-variables).

## Environment variable size

Developers on all plans using the runtimes stated below can use a total of **64 KB** in Environments Variables **per-Deployment** on Vercel. This [limit](/docs/limits#environment-variables) is for all variables combined, and so no **single** variable can be larger than 64 KB. The total size includes any variables configured through the dashboard or the [CLI](/docs/cli).

With support for 64 KB of environment variables, you can add large values for authentication tokens, JWTs, or certificates.

Deployments using the following runtimes can support environment variables up to 64 KB:

- Node.js
- Python
- Ruby
- Go
- [PHP Community Runtime](https://github.com/vercel-community/php)

Vercel also provides support for custom runtimes, through the Build Output API. For information on creating custom runtime support, see the following guides:

- [Guides for runtime builders](https://github.com/vercel/vercel/blob/main/DEVELOPING_A_RUNTIME.md#supporting-large-environment)
- [Build Output API documentation](/docs/build-output-api/primitives#base-config)

> **💡 Note:** While Vercel allows environment variables up to a total of 64KB in size, Edge
> Functions and Middleware using the `edge` runtime are limited to 5KB per
> Environment Variable.

## Environments

For each Environment Variable, you can select one or more Environments to apply the Variable to:

| Environment                                                                   | Description                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**Production**](/docs/deployments/environments#production-environment)       | When selected, the Environment Variable will be applied to your next Production Deployment. To create a Production Deployment, push a commit to the [Production Branch](/docs/git#production-branch) (usually `main`) or run `vercel --prod`.                                                                                  |
| [**Preview**](#preview-environment-variables)                                 | The Environment Variable is applied to your next Preview Deployment. Preview Deployments are created when you push to a branch that is not the [Production Branch](/docs/git#production-branch) or run `vercel`.                                                                                                               |
| [**Custom environments**](/docs/deployments/environments#custom-environments) | With custom environments you can choose to [import environment variables](/docs/deployments/environments#custom-environments) from another environment and [detach](/docs/deployments/environments#custom-environments) when you need to update the environment variable for your custom environment |
| **[Development](#development-environment-variables)**                         | The Environment Variable is used when running your project locally with `vercel dev` or your preferred development command. To download Development Environment Variables, run [`vercel env pull`](/docs/cli/env).                                                                                                             |

### Preview environment variables

> **💡 Note:** You need Vercel CLI version 22.0.0 or higher to use the features described in
> this section.

Preview environment variables are applied to deployments from any Git branch that does not match the [Production Branch](/docs/git#production-branch). When you add a preview environment variable, you can choose to apply to all non-production branches or you can select a specific branch.

![Image](`/docs-assets/static/docs/concepts/projects/environment-variables/env-var-section-light.png`)

Any branch-specific variables will override other preview environment variables with the same name. This means you don't need to replicate all your existing preview environment variables for each branch – you only need to add the values you wish to override.

### Development environment variables

> **💡 Note:** You need Vercel CLI version 21.0.1 or higher to use the features described in
> this section.

Environment variables for local development are defined in the `.env.local` file. This is a plain text file that contains `key=value` pairs of environment variables, that you can manually create in your project's root directory to define specific variables.

You can use the `vercel env pull` command to automatically create and populate the `.env` file (which serves the same purpose as `.env.local`) with the environment variables from your Vercel project:

```bash
vercel env pull
Downloading Development Environment Variables for Project my-lovely-project
✅ Created .env file [510ms]
```

This command creates a `.env` file in your project's current directory with the environment variables from your Vercel project's **Development** environment.

If you're using [`vercel dev`](/docs/cli/dev), there's no need to run `vercel env pull`, as `vercel dev` automatically downloads the Development Environment Variables into memory. For more information on the `vercel env` command, see the [CLI](/docs/cli/env) docs.

For more information, see [Environment variables for local development](/docs/deployments/environments#local-development-environment).

## Integration environment variables

[Integrations](/docs/integrations) can automatically add environment variables to your Project Settings.
In that case, the Integration that added the Variable will be displayed in your project settings:

![Image](`/docs-assets/static/docs/concepts/projects/environment-variables/integration-env-variable-light.png`)


---

[View full sitemap](/docs/sitemap)
