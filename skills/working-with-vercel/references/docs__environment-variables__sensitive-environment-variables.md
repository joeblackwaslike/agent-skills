---
title: Sensitive environment variables
product: vercel
url: /docs/environment-variables/sensitive-environment-variables
canonical_url: "https://vercel.com/docs/environment-variables/sensitive-environment-variables"
last_updated: 2026-06-03
type: how-to
prerequisites:
  - /docs/environment-variables
related:
  - /docs/environment-variables
  - /docs/deployments/environments
  - /docs/environment-variables/shared-environment-variables
  - /docs/activity-log
  - /docs/rest-api
summary: Environment variables that cannot be decrypted once created.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/environment-variables/sensitive-environment-variables.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "790f6df4558870208ce3a2c2c9883a774c94f30a62c62cbebe2753068f1679e4"
---

# Sensitive environment variables

Sensitive environment variables are [environment variables](/docs/environment-variables "Environment variables") whose values are non-readable once created. They help protect sensitive information stored in environment variables, such as API keys.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables?from=related) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [Managing Environment Variables](https://vercel.com/docs/environment-variables/managing-environment-variables?from=related) — Learn how to create and manage environment variables for Vercel.
- [vercel env](https://vercel.com/docs/cli/env?from=related) — Learn how to manage your environment variables in your Vercel Projects using the vercel env CLI command.
- [Manage Across Environments](https://vercel.com/docs/environment-variables/manage-across-environments?from=related) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [Edit an environment variable](https://vercel.com/docs/rest-api/projects/edit-an-environment-variable?from=related)
- [Create one or more environment variables](https://vercel.com/docs/rest-api/projects/create-one-or-more-environment-variables?from=related)

Full cross-link map for this page: [/docs/environment-variables/sensitive-environment-variables.graph.md](/docs/environment-variables/sensitive-environment-variables.graph.md)
<!-- /docsgraph:related -->

To mark an existing environment variable as sensitive, remove and re-add it with the **Sensitive** option enabled. Once you mark it as sensitive, Vercel stores the variable in an unreadable format. This is only possible for environment variables in the [production](/docs/deployments/environments#production-environment) and [preview](/docs/deployments/environments#preview-environment-pre-production) environments.

Both [project environment variables](/docs/environment-variables) and [shared environment variables](/docs/environment-variables/shared-environment-variables) can be marked as sensitive.

## Build log redaction

During builds, if a sensitive environment variable value is 32 characters or longer and appears in build logs, Vercel replaces the value with `[REDACTED]`. Vercel always redacts the `VERCEL_AUTOMATION_BYPASS_SECRET` and `VERCEL_OIDC_TOKEN` system environment variables from build logs, regardless of value length.

When Vercel redacts a sensitive environment variable value, Vercel records an [Activity Log](/docs/activity-log) event for each masked environment variable key. The event includes the key name, project, and deployment, but not the value.

## Creating sensitive environment variables

> **💡 Note:** You can only create sensitive environment variables in the preview and
> production environments.

#### \['Dashboard'

Sensitive environment variables can be created at the project or team level:

1. Go to the Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and select your team from the team switcher. Click on the **Settings** section in the sidebar and then select **Environment Variables** from the left navigation. To create sensitive environment variables at the project-level, select the project from your [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and then and click the **Settings** section in the sidebar.
2. At the top of the form, toggle the **Sensitive** switch to **Enabled**. If the **Development** environment is selected, you will be unable to enable the switch.
3. Fill in the details to create a new environment variable.
4. In the environment variable table, sensitive environment variables are marked with a "Sensitive" tag:

![Image](`/docs-assets/static/docs/concepts/projects/environment-variables/listed-sev.png`)

#### 'cURL'

To create an Authorization Bearer token, see the [access token](/docs/rest-api#creating-an-access-token) section of the API documentation.

```bash filename="cURL"
curl --request POST \
  --url https://api.vercel.com/v10/projects/<project-id-or-name>/env \
  --header "Authorization: Bearer $VERCEL_TOKEN" \
  --header "Content-Type: application/json" \
  --data '[
    {
      "key": "<env-key-1>",
      "value": "<env-value-1>",
      "type": "sensitive",
      "target": ["<target-environment>"],
      "gitBranch": "<git-branch>",
      "comment": "<comment>",
      "customEnvironmentIds": ["<custom-env-id>"]
    }
  ]'
```

#### 'SDK']

To create an Authorization Bearer token, see the [access token](/docs/rest-api#creating-an-access-token) section of the API documentation.

```ts filename="createProjectEnv"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.projects.createProjectEnv({
    idOrName: '<project-id-or-name>',
    requestBody: {
      key: '<env-key-1>',
      value: '<env-value-1>',
      type: 'sensitive',
      target: ['<target-environment>'],
      gitBranch: '<git-branch>',
      comment: '<comment>',
      customEnvironmentIds: ['<custom-env-id>'],
    },
  });

  // Handle the result
  console.log(result);
}

run();
```

## Edit sensitive environment variables

You can edit the value and [environment](/docs/environment-variables#environments) for a sensitive environment variable. You cannot edit the key of a sensitive environment variable.

1. From your [dashboard](/dashboard), go to the team or project's page and select [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in the sidebar. Find your environment variable in the list.
2. Click **Edit** from the three-dot menu in the environment variables list
3. Provide a new value for the sensitive environment variable. The current value is hidden.
4. Select the environment(s) for the sensitive environment variable.
5. After making the change, click the **Save** button.

## Environment variables policy

Users with the [owner](/docs/rbac/access-roles#owner-role) role can set a team-wide environment variable policy for creating environment variables. Once enabled, all newly created environment variables in the [Production](/docs/deployments/environments#production-environment) and/or [Preview](/docs/deployments/environments#preview-environment-pre-production) environments will be sensitive environment variables.

1. From the [dashboard](/dashboard), ensure your team is selected in the team switcher and open **Settings** in the sidebar.
2. From the left navigation, click **Security & Privacy**.
3. From the **Environment Variable Policies** section, toggle the **Enforce Sensitive Environment Variables** switch to **Enabled**:

![Image](`/docs-assets/static/docs/concepts/projects/environment-variables/env-var-policies-2.png`)


---

[View full sitemap](/docs/sitemap)
