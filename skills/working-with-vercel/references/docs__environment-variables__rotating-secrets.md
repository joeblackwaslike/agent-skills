---
title: Rotating environment variables
product: vercel
url: /docs/environment-variables/rotating-secrets
canonical_url: "https://vercel.com/docs/environment-variables/rotating-secrets"
last_updated: 2026-07-15
type: how-to
prerequisites:
  - /docs/environment-variables
related:
  - /docs/environment-variables
  - /docs/deployments/environments
  - /docs/deployments/managing-deployments
  - /docs/environment-variables/shared-environment-variables
  - /docs/integrations
summary: Safely rotate API keys, tokens, and other secrets in your Vercel environment variables.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/environment-variables/rotating-secrets.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "fda0ee96d631a5941d8bd793dd75bcc7224369c589485e709fa98b5f89e7538c"
---

# Rotating environment variables

> **💡 Note:** Find guides for rotating secrets for our Marketplace providers in [Vercel's Knowledge Base](https://vercel.com/kb/integrations).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to rotate the secrets of your Supabase integration](https://vercel.com/kb/guide/how-to-reset-the-secrets-of-your-supabase-integration?from=related) — Rotate Supabase API keys, JWT secrets, and database passwords.
- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables?from=related) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [How to rotate the secrets of your Hypertune integration](https://vercel.com/kb/guide/how-to-reset-the-secrets-of-your-hypertune-integration?from=related) — Rotate Hypertune API keys with zero-downtime.
- [How to rotate the secrets of your Redis integration](https://vercel.com/kb/guide/how-to-reset-the-secret-for-your-redis-integration?from=related) — This will guide you how to update the password for a Redis databse.
- [How to rotate the secrets of your Neon integration](https://vercel.com/kb/guide/how-to-reset-a-secret-for-a-neon-integration?from=related) — This will guide you how to update the password for a Neon project.
- [Secrets Rotation](https://vercel.com/docs/integrations/create-integration/secrets-rotation?from=related) — Learn how to implement secrets rotation in your integration to allow users to rotate credentials securely.
- [Managing Environment Variables](https://vercel.com/docs/environment-variables/managing-environment-variables?from=related) — Learn how to create and manage environment variables for Vercel.
- [Manage Across Environments](https://vercel.com/docs/environment-variables/manage-across-environments?from=related) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [Sensitive Environment Variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables?from=related) — Environment variables that cannot be decrypted once created.
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.

Full cross-link map for this page: [/docs/environment-variables/rotating-secrets.graph.md](/docs/environment-variables/rotating-secrets.graph.md)
<!-- /docsgraph:related -->

When you need to rotate API keys, tokens, or other credentials stored in your [environment variables](/docs/environment-variables), you'll need to update both your third-party service and your Vercel projects. This ensures your applications continue to work without downtime.

Secret rotation is a security best practice that limits the exposure window if a credential is compromised. You might rotate secrets when:

- A team member with access to credentials leaves
- You suspect a credential has been exposed
- Your security policy requires periodic rotation
- A third-party service forces a credential update

## Rotating secrets safely

The key to safe rotation is updating Vercel *before* you invalidate the old credential. This prevents your deployments from breaking when the old key stops working.

### For project-level environment variables

If your secret is configured at the [project level](/docs/environment-variables), only that project uses it. You'll only need to redeploy that one project.

1. Go to your third-party service (like a database provider, API service, or integration) and generate a new credential. Don't delete or invalidate the old one yet.
2. From your Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), select the project that uses this credential.
3. Select [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in the sidebar.
4. Find the environment variable that stores the credential. Click the three dots to the right and select **Edit**.
5. Replace the old value with your new credential.
6. Make sure the correct [environments](/docs/deployments/environments) are selected (Production, Preview, and/or Development).
7. Click **Save**.
8. [Redeploy your project](/docs/deployments/managing-deployments#redeploy-a-project) to apply the new credential:
   - Open [**Deployments**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fdeployments\&title=Go+to+Deployments) in the sidebar.
   - Find your latest production deployment.
   - Click the three dots and select **Redeploy**.
   - Once the new deployment succeeds and you've verified it works, go back to your third-party service and invalidate the old credential.

> **💡 Note:** If you're using the [Preview environment](/docs/deployments/environments#preview-environment-pre-production), redeploy your preview deployments as well to avoid errors when you invalidate the old credential.

### For team-level environment variables

If your secret is configured at the [team level](/docs/environment-variables/shared-environment-variables), multiple projects might use it. You'll need to redeploy all projects that depend on this credential.

1. Go to your third-party service and generate a new credential. Keep the old one active for now.
2. From your Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), select your team from the team switcher.
3. Select [**Environment Variables**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fenvironment-variables\&title=Go+to+Environment+Variables) in the sidebar.
4. Find the environment variable that stores the credential. Click the three dots to the right and select **Edit**.
5. Replace the old value with your new credential.
6. Make sure the correct [environments](/docs/deployments/environments) are selected (Production, Preview, and/or Development).
7. Click **Save**.
8. Identify which projects use this credential. You can check the **Link to Projects** field in the environment variable form to see which projects have access.
9. Redeploy each project that uses this credential:
   - Go to each project's **Deployments** section in the sidebar.
   - Find the latest production deployment.
   - Click the three dots and select **Redeploy**.
10. Once all deployments succeed and you've verified they work, go back to your third-party service and invalidate the old credential.

> **💡 Note:** If you invalidate the old credential before all projects are redeployed, any project still using the old value will fail until you redeploy it.

## Rotating credentials for integrations

> **💡 Note:** Find guides for rotating secrets for our Marketplace providers in [Vercel's Knowledge Base](https://vercel.com/kb/integrations).

When rotating credentials for [integrations](/docs/integrations) (like database providers or third-party services installed from the Vercel Marketplace):

1. From the Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), select **Integrations** in the sidebar, then open the provider whose credentials you want to rotate.
2. Under **Installed Products**, select the product for the resource whose credentials you want to rotate.
3. In the sidebar, select **Settings**, then scroll to **Secure This Resource**.
4. Click **Rotate Secrets**, enter the Rotation reason and confirm by typing the project name.
5. [Redeploy](/docs/deployments/managing-deployments#redeploy-a-project) the linked project to use the new secrets.

Alternatively, rotate secrets from the provider's dashboard:

1. Navigate to the integration from the Integrations section in the sidebar and then by selecting the provider you want to rotate credentials for
2. Click **Log into provider** (if the integration has multiple resources, repeat this for each resource).
3. Manually reset the credentials in the provider's dashboard (this will synchronize the new secrets to your Vercel team and stage them to be applied to linked projects when the projects are redeployed)
4. Redeploy the projects that use this integration or resource.
5. Test your application to confirm the new credential works.
6. Return to your integration's dashboard and revoke or delete the old credential (if the provider supports this).

> **💡 Note:** If the integration allows for provisioning resources, you will have to repeat this process for each resource that you've provisioned. These resources are listed on the integration page.

## Troubleshooting

### Deployment fails after rotating a secret

If your deployment fails after updating a credential:

- Check that you copied the new credential correctly (no extra spaces or line breaks).
- Verify that the new credential is active in your third-party service.
- Make sure you selected the correct environment (Production, Preview, or Development) when updating the variable.
- Check your application logs in the Vercel dashboard for specific error messages.

### Old deployments still use the old credential

Environment variable changes only apply to new deployments. If you visit an old deployment URL, it will still use the old credential. This is expected behavior.

Once you invalidate the old credential, old deployments that relied on it will fail if they make API calls using that credential. Redeploy the old deployment to fix this, as each new deployment picks up the latest version of the environment variables.

### Multiple projects broke after rotation

If you rotated a team-level environment variable and multiple projects broke, you may have missed redeploying some projects:

1. Go to your team's **Environment Variables** settings.
2. Find the variable you rotated and check which projects have access to it.
3. Redeploy any projects you missed.


---

[View full sitemap](/docs/sitemap)
