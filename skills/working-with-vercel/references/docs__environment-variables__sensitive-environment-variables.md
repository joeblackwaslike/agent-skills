---
title: Config and Secret environment variables
product: vercel
url: /docs/environment-variables/sensitive-environment-variables
canonical_url: "https://vercel.com/docs/environment-variables/sensitive-environment-variables"
last_updated: 2026-08-28
type: how-to
prerequisites:
  - /docs/environment-variables
related:
  - /docs/environment-variables
  - /docs/environment-variables/shared-environment-variables
  - /docs/activity-log
  - /docs/rest-api
  - /docs/cli/env
summary: Choose Config or Secret environment variables based on whether their values should remain readable after saving.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/environment-variables/sensitive-environment-variables.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "42d51de00938a6f29d28d6de6200ffe22527bd601d46c14f5138b94b67fa81c1"
---

# Config and Secret environment variables

When you add or edit [environment variables](/docs/environment-variables "Environment variables"), choose **Config** or **Secret**:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [Vercel Integration](https://v0.app/docs/vercel-integration) — How v0 and Vercel work in tandem.
- [Build logs now redact Sensitive Environment Variable values](https://vercel.com/changelog/build-logs-now-redact-sensitive-environment-variable-values)
- [Secure Marketplace credentials with Production-only access](https://vercel.com/changelog/secure-marketplace-credentials-with-production-only-access)
- [How to Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel) — Deploy a TanStack Start app to Vercel with the Nitro Vite plugin. Covers Git and CLI deployment, Fluid compute defaults,
- [How to deploy a Saleor storefront on Vercel](https://vercel.com/kb/guide/how-to-deploy-a-saleor-storefront-on-vercel) — Deploy Saleor's Paper storefront template on Vercel, including environment variables, GraphQL caching, checkout, and pro
- [Rotating Secrets for Vercel Marketplace Integrations](https://vercel.com/kb/guide/how-to-reset-the-secrets-of-your-supabase-integration) — Rotate the Supabase service role key, JWT secret, and database password from your Vercel integration, then apply the new
- [Migrate from Google Cloud Run to Vercel](https://vercel.com/kb/guide/migrate-cloud-run-to-vercel) — Move a Cloud Run service or worker to Vercel. Compare runtimes, preserve Google Cloud access, and plan jobs, validation,
- [Environment variables now use Config and Secret types](https://vercel.com/changelog/environment-variables-now-use-config-and-secret-types)
- [Legacy environment variable secrets are being sunset](https://vercel.com/changelog/legacy-environment-variable-secrets-are-being-sunset)
- [Sensitive environment variables are now available](https://vercel.com/changelog/sensitive-environment-variables-are-now-available)
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables) — Learn how to create and manage environment variables for Vercel.

Full cross-link map for this page: [/docs/environment-variables/sensitive-environment-variables.graph.md](/docs/environment-variables/sensitive-environment-variables.graph.md)
<!-- /docsgraph:related -->

- **Config** values remain readable after saving for members with access. Use them for non-sensitive configuration such as public prefixes and other values you may need to review later.
- **Secret** values are write-only after saving. Use them for passwords, API keys, and tokens. Existing [Sensitive environment variables](#legacy-sensitive-environment-variables) continue to work as Secrets.

Both [project environment variables](/docs/environment-variables) and [shared environment variables](/docs/environment-variables/shared-environment-variables) support Config and Secret types.

> **💡 Note:** Secrets are allowed in Development. This reverses the earlier rule that limited Sensitive environment variables to Production and Preview.

## Build log redaction

During builds, if a Secret environment variable value is 32 characters or longer and appears in build logs, Vercel replaces the value with `[REDACTED]`. Vercel always redacts the `VERCEL_AUTOMATION_BYPASS_SECRET` and `VERCEL_OIDC_TOKEN` system environment variables from build logs, regardless of value length.

When Vercel redacts a Secret value, Vercel records an [Activity Log](/docs/activity-log) event for each masked environment variable key. The event includes the key name, project, and deployment, but not the value.

## Creating environment variables

#### Dashboard

Environment variables can be created at the project or team level:

1. Go to the Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and select your team from the team switcher. Open [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) from the sidebar. For project-level variables, select the project first.
2. Choose **Config** or **Secret** under **Type**.
3. Fill in the key, value, and target environments. For Secrets, you can assign different values per environment or Preview branch.
4. In the environment variable table, each variable shows a **Config** or **Secret** label.

#### cURL

To create an Authorization Bearer token, see the [access token](/docs/rest-api#creating-an-access-token) section of the API documentation.

The API accepts a single environment variable object or an array of objects. Both examples below send an array.

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
      "visibility": "secret",
      "target": ["<target-environment>"],
      "gitBranch": "<git-branch>",
      "comment": "<comment>",
      "customEnvironmentIds": ["<custom-env-id>"]
    }
  ]'
```

For readable Config values, set `"type": "encrypted"` (or `"plain"`) and `"visibility": "config"`.

#### SDK

To create an Authorization Bearer token, see the [access token](/docs/rest-api#creating-an-access-token) section of the API documentation.

```ts filename="createProjectEnv"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

async function run() {
  const result = await vercel.projects.createProjectEnv({
    idOrName: '<project-id-or-name>',
    requestBody: [
      {
        key: '<env-key-1>',
        value: '<env-value-1>',
        type: 'sensitive',
        visibility: 'secret',
        target: ['<target-environment>'],
        gitBranch: '<git-branch>',
        comment: '<comment>',
        customEnvironmentIds: ['<custom-env-id>'],
      },
    ],
  });

  // Handle the result
  console.log(result);
}

run();
```

With the [Vercel CLI](/docs/cli/env), use `--type config` or `--type secret` to set the type explicitly. You can also pass `--sensitive` or `--no-sensitive` to infer Secret or Config. The `--visibility` flag is a deprecated alias for `--type`.

## Edit environment variables

You can edit the value and [environment](/docs/environment-variables#environments) for any environment variable. You cannot edit the key of a Secret after it is saved.

For **Config** variables, authorized members can view the current value when editing.

For **Secret** variables, the current value is hidden. Provide a new value to rotate the secret. You cannot convert a saved Secret to Config in place.

1. From your [dashboard](/dashboard), go to the team or project and select [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in the sidebar.
2. Click **Edit** from the three-dot menu.
3. Update the value and target environments, then click **Save**.

## Environment variables policy

The legacy **Enforce Sensitive Environment Variables** team policy is deprecated. That policy required every environment variable a team member created in Production and Preview to be stored as Sensitive, decryptable only during deployments. With Config and Secret types, you choose the right classification per variable instead of forcing everything to be a Secret.

It is replaced by [**Separate Production Secret Values**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity%23disjunctive-production-secret-policy\&title=Separate+Production+Secret+Values), an optional team policy in [Security settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity\&title=Go+to+Security+settings). Users with the [owner](/docs/rbac/access-roles#owner-role) role can enable **Require Separate Values**.

When enabled, each Secret must use a **different value in Production** than in Preview, Development, and custom environments. You cannot assign Production the same secret value as another environment for the same key. The dashboard shows **Production must use a separate value.** when you try to group Production with another target.

Teams that had the legacy policy enabled should review the new setting after upgrading.

## Legacy Sensitive environment variables

Existing Sensitive environment variables are treated as **Secret** in the dashboard and API. You do not need to migrate them manually. To store the same key as Config instead, delete the Secret and create a new Config variable. You cannot convert Secret to Config in place.

## Sensitive environment variables for integrations

Environment variables created by [integrations](/docs/integrations) can't be changed to Secret from the environment variables list. To store them as Secrets:

1. Disconnect the integration resource from all of its projects.
2. [Rotate the resource's secrets](/docs/environment-variables/rotating-secrets) so the previous values are no longer valid.
3. Reconnect the resource to each project. Deselect **Development** in the connection environments, then enable **Sensitive** in the advanced options. Integration connections that include Development cannot enable Sensitive.
4. Redeploy your projects to use the new values.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
