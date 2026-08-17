---
title: Managing environment variables
product: vercel
url: /docs/environment-variables/managing-environment-variables
canonical_url: "https://vercel.com/docs/environment-variables/managing-environment-variables"
last_updated: 2026-04-27
type: how-to
prerequisites:
  - /docs/environment-variables
related:
  - /docs/deployments/environments
  - /docs/deployments/managing-deployments
summary: Learn how to create and manage environment variables for Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/environment-variables/managing-environment-variables.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "a5b1b4e6d12369ae0e8bba4316a3b9ce5d04ef0c382194aa3f52a99ff2f15a9e"
---

# Managing environment variables

Environment variables are key-value pairs configured outside your source code so that each value can change depending on the [Environment](/docs/deployments/environments).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables?from=related) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [How do I migrate away from \`vercel.json\` env and build.env?](https://vercel.com/kb/guide/how-do-i-migrate-away-from-vercel-json-env-and-build-env?from=related) — Information on how to migrate your \`vercel.json\` environment variables to the Environment Variables UI.
- [How do I set up a staging environment on Vercel?](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel?from=related) — Information on how to set up a staging environment on Vercel.
- [Manage Across Environments](https://vercel.com/docs/environment-variables/manage-across-environments?from=related) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [Shared Environment Variables](https://vercel.com/docs/environment-variables/shared-environment-variables?from=related) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can
- [Sensitive Environment Variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables?from=related) — Environment variables that cannot be decrypted once created.
- [Edit an environment variable](https://vercel.com/docs/rest-api/projects/edit-an-environment-variable?from=related)
- [Create one or more environment variables](https://vercel.com/docs/rest-api/projects/create-one-or-more-environment-variables?from=related)

Full cross-link map for this page: [/docs/environment-variables/managing-environment-variables.graph.md](/docs/environment-variables/managing-environment-variables.graph.md)
<!-- /docsgraph:related -->

Changes to environment variables are not applied to previous deployments, they only apply to new deployments. You must redeploy your project to update the value of any variables you change in the deployment.

## Declare an environment variable

To declare an Environment Variable for your deployment:

1. From your [dashboard](/dashboard), select your project. If necessary, you can also set environment variables team-wide so that they will be available for all projects.
2. Select [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in the sidebar.

![Image](`/docs-assets/static/docs/concepts/projects/environment-variables/env-var-section-light.png`)

3. Enter the desired **Name** for your Environment Variable. For example, if you are using Node.js and you create an Environment Variable named `API_URL`, it will be available under `process.env.API_URL` in your code.

   #### \['Node.js'

   ```js
   process.env.API_URL;
   ```

   #### 'Go'

   ```go
   os.Getenv("API_URL")
   ```

   #### 'Python'

   ```py
   os.environ.get('API_URL')
   ```

   #### 'Ruby']

   ```ruby
   ENV['API_URL']
   ```

4. Then, enter the **Value** for your Environment Variable. The value is encrypted at rest so it is safe to add sensitive data like authentication tokens or private keys.

5. Configure which [deployment environment(s)](/docs/deployments/environments) this variable should apply to.

6. Click **Save**.

7. To ensure that the new Environment Variable is applied to your deployment, you must [redeploy](/docs/deployments/managing-deployments#redeploy-a-project) your project.

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
