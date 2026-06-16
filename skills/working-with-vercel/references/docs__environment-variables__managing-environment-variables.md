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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "36127ef3f4aee0ff8d6efe0f31ff45612870a5e9243dba66e065048c3d09b7b3"
---

# Managing environment variables

Environment variables are key-value pairs configured outside your source code so that each value can change depending on the [Environment](/docs/deployments/environments).

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
