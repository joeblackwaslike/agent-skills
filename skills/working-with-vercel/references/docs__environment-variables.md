---
title: Environment variables
product: vercel
url: /docs/environment-variables
canonical_url: "https://vercel.com/docs/environment-variables"
last_updated: 2026-09-17
type: conceptual
prerequisites:
  []
related:
  - /docs/deployments/environments
  - /docs/rbac/access-roles
  - /docs/environment-variables/rotating-secrets
  - /docs/environment-variables/sensitive-environment-variables
  - /docs/builds/configure-a-build
summary: Learn more about environment variables on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/environment-variables.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "f6c031eaa32563c9f4dc82f8b42fb8b2f793f26e2e29b61e7c76ef11abcd94fc"
---

# Environment variables

Environment variables are key-value pairs configured outside your source code so that each value can change depending on the [Environment](/docs/deployments/environments). These values are encrypted at rest. Config values remain readable to team members whose [role](/docs/rbac/access-roles) gives access to the project's environment variables, while Secret values are write-only after saving. When you need to replace an API key, token, or other credential, follow the steps for [rotating environment variables](/docs/environment-variables/rotating-secrets) to update it without downtime.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using environment variables](https://turborepo.dev/docs/crafting-your-repository/using-environment-variables) — Account for environment variables in task hashing, configure environment modes, and handle .env files.
- [Deployments](https://v0.app/docs/deployments) — Preview and publish v0 projects on Vercel, then manage domains, visibility, and production updates.
- [External APIs](https://v0.app/docs/external-apis) — Build full-stack applications by calling external APIs with environment variables.
- [Environment variables now use Config and Secret types](https://vercel.com/changelog/environment-variables-now-use-config-and-secret-types)
- [Environments Variables per Git branch](https://vercel.com/changelog/environments-variables-per-git-branch)
- [Improved environment variables UI](https://vercel.com/changelog/improved-environment-variables-ui)
- [New deployments of vulnerable Next.js applications are now blocked by default](https://vercel.com/changelog/new-deployments-of-vulnerable-next-js-applications-are-now-blocked-by)
- [New deployments with vulnerable versions of the third-party package next-mdx-remote are now blocked by default](https://vercel.com/changelog/new-deployments-with-vulnerable-versions-of-next-mdx-remote-are-now-blocked-by-default)
- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Deploy a Bolt.new app with Vercel Drop](https://vercel.com/kb/guide/bolt-vercel-drop) — Export your Bolt.new project as a .zip and deploy it to Vercel with Vercel Drop. Vercel detects the framework and builds
- [Build a daily digest bot with Chat SDK and Workflow SDK](https://vercel.com/kb/guide/daily-digest-bot-with-chat-sdk-and-workflow-sdk) — Build a daily digest bot that posts a daily digest of GitHub stats to Slack. Learn how to use Vercel Connect to set up S

Full cross-link map for this page: [/docs/environment-variables.graph.md](/docs/environment-variables.graph.md)
<!-- /docsgraph:related -->

When adding variables in the dashboard or with the CLI, choose **Config** or **Secret** for each variable. Config values stay readable to authorized members while Secret values are write-only after saving. Learn more in [Config and Secret environment variables](/docs/environment-variables/sensitive-environment-variables).

Your source code can read these values to change behavior during the [Build Step](/docs/builds/configure-a-build) or during [Function](/docs/functions) execution.

Any change you make to environment variables are not applied to previous deployments, they only apply to new deployments.

## Creating environment variables

Environment variables can either be declared at the team or project level. When declared at the team level, they are available only to the projects that you [link them to](/docs/environment-variables/shared-environment-variables#linking-to-projects). When declared at the project level, they are only available to that project.

To learn how to create and manage environment variables, see [Managing environment variables](/docs/environment-variables/managing-environment-variables).

### Add variables in bulk

To add many variables at once, such as when you move a project from another platform, use an existing `.env` file. In the **Add Environment Variable** form, paste the file's contents into the **Key** field, or select **Import .env** and choose the file. Vercel creates one variable for each line. Review the type and environments for each variable before you save.

### Choose Config or Secret from the CLI

[`vercel env add`](/docs/cli/env#type) accepts these flags to set a variable's type. `vercel env update` accepts `--type` and `--sensitive`:

| Type | Flag | Equivalent flag |
| --- | --- | --- |
| Config | `--type config` | `--no-sensitive` |
| Secret | `--type secret` | `--sensitive` |

`--visibility` is a deprecated alias for `--type`, so `--visibility secret` still creates a Secret. Passing `--sensitive` or `--no-sensitive` with a conflicting `--type` returns an error. If you omit all of these flags, the CLI uses the [default type for the target environment](/docs/cli/env#type).

## Environment variable size

Developers on all plans using the runtimes stated below can use a total of **64 KB** in Environment Variables **per-Deployment** on Vercel. This [limit](/docs/limits#environment-variables) is for all variables combined, and so no **single** variable can be larger than 64 KB. The total size includes any variables configured through the dashboard or the [CLI](/docs/cli).

With support for 64 KB of environment variables, you can add large values for authentication tokens, JWTs, or certificates.

Deployments using the following runtimes can support environment variables up to 64 KB:

- Node.js
- Python
- Ruby
- Go

Vercel also provides support for custom runtimes, through the Build Output API. For information on creating custom runtime support, see the following guides:

- [Guides for runtime builders](https://github.com/vercel/vercel/blob/main/DEVELOPING_A_RUNTIME.md#supporting-large-environment)
- [Build Output API documentation](/docs/build-output-api/primitives#base-config)

> **💡 Note:** While Vercel allows environment variables up to a total of 64KB in size,
> functions and Middleware using the `edge` runtime are limited to 5KB per
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

![Adding an Environment Variable](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/environment-variables/env-var-section-light.png)

Any branch-specific variables will override other preview environment variables with the same name. This means you don't need to replicate all your existing preview environment variables for each branch – you only need to add the values you wish to override.

### Development environment variables

> **💡 Note:** You need Vercel CLI version 21.0.1 or higher to use the features described in
> this section.

Environment variables for local development are defined in the `.env.local` file. This is a plain text file that contains `key=value` pairs of environment variables, that you can manually create in your project's root directory to define specific variables.

You can use the `vercel env pull` command to automatically create and populate the `.env.local` file with the environment variables from your Vercel project:

```bash
vercel env pull
Downloading Development Environment Variables for Project my-lovely-project
✅ Created .env.local file [510ms]
```

This command creates a `.env.local` file in your project's current directory with the environment variables from your Vercel project's **Development** environment.

If you're using [`vercel dev`](/docs/cli/dev), there's no need to run `vercel env pull`, as `vercel dev` automatically downloads the Development Environment Variables into memory. For more information on the `vercel env` command, see the [CLI](/docs/cli/env) docs.

For more information, see [Environment variables for local development](/docs/deployments/environments#local-development-environment).

## Integration environment variables

[Integrations](/docs/integrations) can automatically add environment variables to your Project Settings.
In that case, the Integration that added the Variable will be displayed in your project settings:

![An Environment Variable added by the MongoDB Integration.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/environment-variables/integration-env-variable-light.png)

For Native Marketplace resources, the variable scope matches the environments on the project connection. The scope can include Production, Preview, Development, and individual Custom Environments. A Custom Environment uses the provider's Preview secret value when one exists. Otherwise, the Custom Environment uses the default secret value.

## Troubleshooting environment variables

If a variable doesn't have the value you expect, find your symptom in the following table:

| Symptom | Cause | Fix |
| --- | --- | --- |
| A change in the dashboard has no effect | Environment variable changes apply only to new deployments. The running deployment keeps the values it was built with. | [Redeploy](/docs/deployments/managing-deployments#redeploy-a-project) the project. |
| A `NEXT_PUBLIC_` variable is `undefined` in the browser | Next.js inlines `NEXT_PUBLIC_` variables into the client bundle at build time. Dynamic lookups such as `process.env[name]` aren't inlined. | Add the `NEXT_PUBLIC_` prefix, reference the variable by its full name, make sure it's set for the environment you build, and redeploy. |
| A preview deployment reads the wrong values | The variable isn't scoped to Preview, or code that branches on `VERCEL_ENV` runs in a [custom environment](/docs/deployments/environments#custom-environments), where `VERCEL_ENV` is `preview`. | Check the variable's environments. To identify a custom environment, read [`VERCEL_TARGET_ENV`](/docs/environment-variables/system-environment-variables), which returns the custom environment's name. |
| A Turborepo build uses values from another environment | Turborepo leaves environment variables out of its cache key unless `turbo.json` lists them, so it can reuse a build made with different values. | List the variables in `env` for each task or in `globalEnv` in `turbo.json`. |
| System environment variables are empty in local development | Deployment-specific [system environment variables](/docs/environment-variables/system-environment-variables), such as `VERCEL_GIT_REPO_OWNER`, are set only when Vercel builds a deployment. | Set the values you need in `.env.local` for local development. |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
