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
  - /docs/environment-variables/shared-environment-variables
  - /docs/deployments/managing-deployments
  - /docs/environment-variables/sensitive-environment-variables
  - /docs/rest-api
summary: Learn how to create and manage environment variables for Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/environment-variables/managing-environment-variables.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "be72bf6fbf69f5d58e6707cff1c325e081615680f19537c136def5bfe69ce969"
---

# Managing environment variables

Environment variables are key-value pairs configured outside your source code so that each value can change depending on the [Environment](/docs/deployments/environments).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Bun runtime now supports large functions and extended max duration](https://vercel.com/changelog/bun-runtime-now-supports-large-functions-and-extended-max-duration)
- [Vercel Functions can now be up to 5GB in package size](https://vercel.com/changelog/vercel-functions-can-now-be-up-to-5-gb-in-package-size)
- [Migrate from Google Cloud Run to Vercel](https://vercel.com/kb/guide/migrate-cloud-run-to-vercel) — Move a Cloud Run service or worker to Vercel. Compare runtimes, preserve Google Cloud access, and plan jobs, validation,
- [How to set up a staging environment on Vercel](https://vercel.com/kb/guide/set-up-a-staging-environment-on-vercel) — Set up a staging environment on Vercel with custom environments, staged production deployments, or a branch-based previe
- [Managing environment variables across environments](https://vercel.com/docs/environment-variables/manage-across-environments) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [Environment Variables](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables) — Vercel MCP tools for environment variables.
- [Edit an environment variable](https://vercel.com/docs/rest-api/projects/edit-an-environment-variable) — PATCH /v9/projects/{idOrName}/env/{id} — Edit a specific environment variable for a given project by passing the environ
- [Vercel CI Environment Variables](https://vercel.com/docs/ci/environment-variables) — Manage environment variables and secrets for Vercel CI runs.
- [vercel env](https://vercel.com/docs/cli/env) — Learn how to manage your environment variables in your Vercel Projects using the vercel env CLI command.

Full cross-link map for this page: [/docs/environment-variables/managing-environment-variables.graph.md](/docs/environment-variables/managing-environment-variables.graph.md)
<!-- /docsgraph:related -->

Changes to environment variables are not applied to previous deployments, they only apply to new deployments. You must redeploy your project to update the value of any variables you change in the deployment.

## Declare an environment variable

To declare an Environment Variable for your deployment:

1. From your [dashboard](/dashboard), select your project. If necessary, you can also set [environment variables at the team level](/docs/environment-variables/shared-environment-variables) and link them to the projects that need them.
2. Select [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in the sidebar.

![The 'Add New' section of the Environment Variables page in the Project Settings.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/environment-variables/env-var-section-light.png)

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

## Manage environment variables with Terraform

To define environment variables in code, use the [Vercel Terraform provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs). The [`vercel_project_environment_variable`](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/project_environment_variable) resource creates one environment variable on a project:

```hcl filename="main.tf"
terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = ">= 5.9"
    }
  }
}

provider "vercel" {
  # The provider reads your access token from the
  # VERCEL_API_TOKEN environment variable
  team = "your_team_slug_or_id"
}

resource "vercel_project_environment_variable" "api_url" {
  project_id = "your_project_id"
  key        = "API_URL"
  value      = "https://api.example.com"
  target     = ["production", "preview"]
  sensitive  = false
}
```

Each variable must set `sensitive`. With `sensitive = true`, Vercel stores the value as a [sensitive environment variable](/docs/environment-variables/sensitive-environment-variables), which can't be read back from the dashboard or the API.

To apply the configuration:

1. Create a [Vercel access token](/docs/rest-api#creating-an-access-token) and set it as the `VERCEL_API_TOKEN` environment variable in your terminal.
2. Run `terraform init` in the directory that contains `main.tf` to download the provider.
3. Run `terraform apply`, review the plan, and confirm it.
4. [Redeploy](/docs/deployments/managing-deployments#redeploy-a-project) your project so that a new deployment uses the variable.

Don't combine `vercel_project_environment_variable` resources with the `environment` field of a `vercel_project` resource for the same project. The two conflict, and the provider overwrites environment variables.

### Sync a secret from AWS Secrets Manager

If you keep a secret in [AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html), Terraform can copy its value into a Vercel environment variable. This configuration reads the secret with an [ephemeral resource](https://developer.hashicorp.com/terraform/language/resources/ephemeral) and passes it to the write-only `value_wo` argument, so Terraform doesn't save the secret value in its state or plan files:

```hcl filename="main.tf"
terraform {
  required_version = ">= 1.11"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = ">= 5.9"
    }
    aws = {
      source  = "hashicorp/aws"
      version = ">= 6.0"
    }
  }
}

provider "vercel" {
  team = "your_team_slug_or_id"
}

provider "aws" {
  region = "us-east-1"
}

data "aws_secretsmanager_secret" "database_url" {
  name = "your_secret_name"
}

ephemeral "aws_secretsmanager_secret_version" "database_url" {
  secret_id = data.aws_secretsmanager_secret.database_url.id
}

resource "vercel_project_environment_variable" "database_url" {
  project_id       = "your_project_id"
  key              = "DATABASE_URL"
  value_wo         = ephemeral.aws_secretsmanager_secret_version.database_url.secret_string
  value_wo_version = 1
  target           = ["production"]
  sensitive        = true
}
```

This configuration needs Terraform 1.11 or later, AWS credentials that can read the secret, and a secret that already has a value in AWS Secrets Manager. Replace `us-east-1` with the AWS region that stores the secret.

Terraform can't compare a write-only value with the value on Vercel, so it doesn't detect when the secret changes in AWS. After you rotate the secret, increase `value_wo_version`, run `terraform apply` again, and redeploy. See [Rotating environment variables](/docs/environment-variables/rotating-secrets) for a rotation that avoids downtime.

On Terraform versions earlier than 1.11, you can read the secret with the `aws_secretsmanager_secret_version` data source and pass `secret_string` to the `value` argument instead. Terraform then stores the secret value in its state file, so restrict access to the state.

Copying a secret into Vercel means that the secret exists in two places. To read the secret from AWS at runtime instead, without long-lived AWS credentials, connect your project to AWS with [OpenID Connect (OIDC) federation](/docs/oidc/aws).

## Viewing, editing, or deleting an environment variable

To find and view all environment variables.

1. From your [dashboard](/dashboard), select your project. You can also view all team-wide environment variables through the Team Settings.
2. Select [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in the sidebar.
3. Below the *Add New* form is a list of all the environment variables for the Project.
4. You can search for an existing Environment Variable by name using the search input and/or filter by [Environment](/docs/deployments/environments).
5. To edit or delete the Environment Variable, click the three dots to the right of the Environment Variable name.

![An example of an Environment Variable with the search and filter inputs above.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/environment-variables/variable-example-light.png)

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
