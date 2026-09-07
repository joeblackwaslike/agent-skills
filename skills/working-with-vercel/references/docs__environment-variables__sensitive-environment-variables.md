---
title: Sensitive environment variables
product: vercel
url: /docs/environment-variables/sensitive-environment-variables
canonical_url: "https://vercel.com/docs/environment-variables/sensitive-environment-variables"
last_updated: 2026-08-28
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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "35bde66163d4c7cce9bef702b6e4e12c79dcb87eab291e7f8a7edf3518ab5d60"
---

# Sensitive environment variables

Sensitive environment variables are [environment variables](/docs/environment-variables "Environment variables") whose values are non-readable once created. They help protect sensitive information stored in environment variables, such as API keys.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Integration](https://v0.app/docs/vercel-integration?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=related) — How v0 and Vercel work in tandem.
- [Build logs now redact Sensitive Environment Variable values](https://vercel.com/changelog/build-logs-now-redact-sensitive-environment-variable-values?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=related)
- [Secure Marketplace credentials with Production-only access](https://vercel.com/changelog/secure-marketplace-credentials-with-production-only-access?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=related)
- [How to Deploy a TanStack Start app to Vercel](https://vercel.com/kb/guide/deploy-a-tanstack-start-app-to-vercel?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=related) — Deploy a TanStack Start app to Vercel with the Nitro Vite plugin. Covers Git and CLI deployment, Fluid compute defaults,
- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=related) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [Rotating Secrets for Vercel Marketplace Integrations](https://vercel.com/kb/guide/how-to-reset-the-secrets-of-your-supabase-integration?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=related) — Rotate the Supabase service role key, JWT secret, and database password from your Vercel integration, then apply the new
- [Sending Emails from an application on Vercel](https://vercel.com/kb/guide/sending-emails-from-an-application-on-vercel?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=related) — SMTP is the harder path inside Vercel Functions. Learn how to send emails over an HTTP API, which Next.js pattern fits y
- [Can I use SMTP with Vercel?](https://vercel.com/kb/guide/serverless-functions-and-smtp?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=related) — Vercel Functions can open SMTP connections on the Node.js runtime. Learn which ports are open, why you must await the se
- [Sensitive environment variables are now available](https://vercel.com/changelog/sensitive-environment-variables-are-now-available?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=related)
- [Environment variables now use Config and Secret types](https://vercel.com/changelog/environment-variables-now-use-config-and-secret-types?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=related)
- [Legacy environment variable secrets are being sunset](https://vercel.com/changelog/legacy-environment-variable-secrets-are-being-sunset?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=related)
- [Environment Variables UI](https://vercel.com/blog/environment-variables-ui?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/environment-variables/sensitive-environment-variables.graph.md](/docs/environment-variables/sensitive-environment-variables.graph.md?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Fsensitive-environment-variables&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

To mark an existing environment variable as sensitive, remove and re-add it with the **Sensitive** option enabled. Once you mark it as sensitive, Vercel stores the variable in an unreadable format. This is only possible for environment variables in the [production](/docs/deployments/environments#production-environment) and [preview](/docs/deployments/environments#preview-environment-pre-production) environments.

Both [project environment variables](/docs/environment-variables) and [shared environment variables](/docs/environment-variables/shared-environment-variables) can be marked as sensitive.

## Build log redaction

During builds, if a sensitive environment variable value is 32 characters or longer and appears in build logs, Vercel replaces the value with `[REDACTED]`. Vercel always redacts the `VERCEL_AUTOMATION_BYPASS_SECRET` and `VERCEL_OIDC_TOKEN` system environment variables from build logs, regardless of value length.

When Vercel redacts a sensitive environment variable value, Vercel records an [Activity Log](/docs/activity-log) event for each masked environment variable key. The event includes the key name, project, and deployment, but not the value.

## Creating sensitive environment variables

> **💡 Note:** You can only create sensitive environment variables in the preview and
> production environments.

#### Dashboard

Sensitive environment variables can be created at the project or team level:

1. Go to the Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and select your team from the team switcher. Click on the **Settings** section in the sidebar and then select **Environment Variables** from the left navigation. To create sensitive environment variables at the project-level, select the project from your [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and then and click the **Settings** section in the sidebar.
2. At the top of the form, toggle the **Sensitive** switch to **Enabled**. If the **Development** environment is selected, you will be unable to enable the switch.
3. Fill in the details to create a new environment variable.
4. In the environment variable table, sensitive environment variables are marked with a "Sensitive" tag:

![Image](`/docs-assets/static/docs/concepts/projects/environment-variables/listed-sev.png`)

#### cURL

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
