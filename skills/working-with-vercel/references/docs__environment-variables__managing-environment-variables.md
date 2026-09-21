---
title: Managing environment variables
product: vercel
url: /docs/environment-variables/managing-environment-variables
canonical_url: "https://vercel.com/docs/environment-variables/managing-environment-variables"
last_updated: 2026-09-11
type: how-to
prerequisites:
  - /docs/environment-variables
related:
  - /docs/deployments/environments
  - /docs/deployments/managing-deployments
summary: Learn how to create and manage environment variables for Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/environment-variables/managing-environment-variables.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "5c9955c8f6089b3ff8fc63d24ea6bdb4c5adbd369f3e7d36ba51ad40cb1c2523"
---

# Managing environment variables

Environment variables are key-value pairs configured outside your source code so that each value can change depending on the [Environment](/docs/deployments/environments).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Bun runtime now supports large functions and extended max duration](https://vercel.com/changelog/bun-runtime-now-supports-large-functions-and-extended-max-duration?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fmanaging-environment-variables&source_site=vercel-docs&relationship=related)
- [Vercel Functions can now be up to 5GB in package size](https://vercel.com/changelog/vercel-functions-can-now-be-up-to-5-gb-in-package-size?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fmanaging-environment-variables&source_site=vercel-docs&relationship=related)
- [How to set up a staging environment on Vercel](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fmanaging-environment-variables&source_site=vercel-docs&relationship=related) — Set up a staging environment on Vercel with custom environments, staged production deployments, or a branch-based previe
- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fmanaging-environment-variables&source_site=vercel-docs&relationship=related) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [Environment Variables UI](https://vercel.com/blog/environment-variables-ui?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fmanaging-environment-variables&source_site=vercel-docs&relationship=related)
- [Managing environment variables across environments](https://vercel.com/docs/environment-variables/manage-across-environments?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fmanaging-environment-variables&source_site=vercel-docs&relationship=related) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [Shared environment variables](https://vercel.com/docs/environment-variables/shared-environment-variables?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fmanaging-environment-variables&source_site=vercel-docs&relationship=related) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can
- [Sensitive environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fmanaging-environment-variables&source_site=vercel-docs&relationship=related) — Environment variables that cannot be decrypted once created.
- [Edit an environment variable](https://vercel.com/docs/rest-api/projects/edit-an-environment-variable?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fmanaging-environment-variables&source_site=vercel-docs&relationship=related) — PATCH /v9/projects/{idOrName}/env/{id} — Edit a specific environment variable for a given project by passing the environ
- [Rotating environment variables](https://vercel.com/docs/environment-variables/rotating-secrets?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fmanaging-environment-variables&source_site=vercel-docs&relationship=related) — Safely rotate API keys, tokens, and other secrets in your Vercel environment variables.

Full cross-link map for this page: [/docs/environment-variables/managing-environment-variables.graph.md](/docs/environment-variables/managing-environment-variables.graph.md?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fmanaging-environment-variables&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Changes to environment variables are not applied to previous deployments, they only apply to new deployments. You must redeploy your project to update the value of any variables you change in the deployment.

## Declare an environment variable

To declare an Environment Variable for your deployment:

1. From your [dashboard](/dashboard), select your project. If necessary, you can also set environment variables team-wide so that they will be available for all projects.
2. Select [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in the sidebar.

![Image](`/docs-assets/static/docs/concepts/projects/environment-variables/env-var-section-light.png`)

3. Enter the desired **Name** for your Environment Variable. For example, if you are using Node.js and you create an Environment Variable named `API_URL`, it will be available under `process.env.API_URL` in your code.

   #### Node.js

   ```js
   process.env.API_URL;
   ```

   #### Go

   ```go
   os.Getenv("API_URL")
   ```

   #### Python

   ```py
   os.environ.get('API_URL')
   ```

   #### Ruby

   ```ruby
   ENV['API_URL']
   ```

4. Then, enter the **Value** for your Environment Variable. The value is encrypted at rest so it is safe to add sensitive data like authentication tokens or private keys.

5. Configure which [deployment environment(s)](/docs/deployments/environments) this variable should apply to.

6. Click **Save**.

7. To ensure that the new Environment Variable is applied to your deployment, you must [redeploy](/docs/deployments/managing-deployments#redeploy-a-project) your project.

> Install the [Vercel plugin](/docs/agent-resources/vercel-plugin?from=docs-callout\&source_path=%2Fdocs%2Fenvironment-variables%2Fmanaging-environment-variables) to manage environment variables with your coding agent.
>
> ```bash
> npx plugins add vercel/vercel-plugin
> ```

## Migrating from vercel.json env and build.env

Move variables from the legacy `env` and `build.env` properties in `vercel.json` to your project's **Environment Variables** settings. Project environment variables are available during both builds and Vercel Function execution.

For example, this legacy configuration defines the same variables for both stages:

```json filename="vercel.json"
{
  "env": {
    "MY_KEY": "this is the value",
    "SECRET": "@my-secret-name"
  },
  "build": {
    "env": {
      "MY_KEY": "this is the value",
      "SECRET": "@my-secret-name"
    }
  }
}
```

To migrate these variables:

1. Open your project's [**Environment Variables** settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables).
2. Add each variable using the same name as in `vercel.json`. In this example, add `MY_KEY` with the value `this is the value`.
3. For a legacy secret reference such as `@my-secret-name`, enter the actual secret value as the value of `SECRET`. Obtain the value from your team's credential store or the service that issued it. The `@my-secret-name` reference itself isn't the value to migrate.
4. Select the [environments](/docs/deployments/environments) where each variable is needed, such as Production, Preview, or Development, and click **Save**. Use the appropriate value for each environment.
5. Remove the migrated entries from both `env` and `build.env` in `vercel.json`. Remove any objects left empty, while preserving other configuration.
6. Deploy the updated source and configuration. If you deploy through Git, commit and push the configuration change.
7. Verify that the new deployment builds successfully and that the features using these variables work as expected.

When a variable has the same name and value in both legacy properties, add it once per environment. If the values differ between build and runtime, use distinct variable names and update your code before migrating.

Existing deployments keep their previous environment variables. The migrated values apply to new deployments.

## Viewing, editing, or deleting an environment variable

To find and view all environment variables.

1. From your [dashboard](/dashboard), select your project. You can also view all team-wide environment variables through the Team Settings.
2. Select [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in the sidebar.
3. Below the *Add New* form is a list of all the environment variables for the Project.
4. You can search for an existing Environment Variable by name using the search input and/or filter by [Environment](/docs/deployments/environments).
5. To edit or delete the Environment Variable, click the three dots to the right of the Environment Variable name.

![Image](`/docs-assets/static/docs/concepts/projects/environment-variables/variable-example-light.png`)


---

[View full sitemap](/docs/sitemap)
