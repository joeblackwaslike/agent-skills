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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/environment-variables/rotating-secrets.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "ebd85bf2a854052decc377432048f07225f59996d8b771f37621c562137750c1"
---

# Rotating environment variables

When you need to rotate API keys, tokens, or other credentials stored in your [environment variables](/docs/environment-variables), you'll need to update both your third-party service and your Vercel projects. This ensures your applications continue to work without downtime.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Rotating Secrets for Vercel Marketplace Integrations](https://vercel.com/kb/guide/how-to-reset-the-secrets-of-your-supabase-integration) — Rotate the Supabase service role key, JWT secret, and database password from your Vercel integration, then apply the new
- [How do I change the name of my Vercel Project?](https://vercel.com/kb/guide/how-do-i-change-the-name-of-my-vercel-project) — Change your Vercel project name in the dashboard, CLI, or REST API, then update the environment variables, callbacks, an
- [Implementing secrets rotation](https://vercel.com/docs/integrations/create-integration/secrets-rotation) — Learn how to implement secrets rotation in your integration to allow users to rotate credentials securely.
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables) — Learn how to create and manage environment variables for Vercel.
- [Config and Secret environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables) — Choose Config or Secret environment variables based on whether their values should remain readable after saving.
- [Rotate Installation Credential](https://vercel.com/docs/rest-api/marketplace/rotate-installation-credential) — POST /v1/installations/{integrationConfigurationId}/credentials/rotate — Issues a replacement access token for an instal
- [Environment Variables](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables) — Vercel MCP tools for environment variables.

Full cross-link map for this page: [/docs/environment-variables/rotating-secrets.graph.md](/docs/environment-variables/rotating-secrets.graph.md)
<!-- /docsgraph:related -->

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

> **💡 Note:** For providers that aren't listed under [Provider-specific steps](#provider-specific-steps), check the integration guides in [Vercel's Knowledge Base](/kb/integrations).

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

### Provider-specific steps

When a provider doesn't support **Rotate Secrets** from the Vercel dashboard, reset the credential in the provider's console. What happens to the old credential depends on the provider:

- **The old credential stops working immediately:** Resetting a database password for Neon, MongoDB Atlas, or Redis invalidates the current password as soon as you confirm. Projects that use it can't connect to the database until you redeploy them, so redeploy right after the reset.
- **The old and new credentials work at the same time:** Hypertune lets you create a new token before you delete the old one. You can redeploy first, then delete the old token, and avoid downtime.

Each set of steps starts in the provider's console. To open it from Vercel, select **Integrations** in the dashboard sidebar, select **Manage** next to the provider, open the installed product, and select the button that opens the provider, such as **Open in Neon**.

After you reset a credential, the provider syncs the new value to your Vercel team. [Redeploy](/docs/deployments/managing-deployments#redeploy-a-project) every project connected to the resource so that it uses the new value.

#### Neon

Resetting a role's password in Neon invalidates the current password immediately.

1. In the Neon console, select the project you want to update.
2. On the project dashboard, select **Connect**.
3. In the connection details, select **Reset password**, then select **Reset** to confirm.
4. In Vercel, confirm that the integration shows the new secret, then redeploy every connected project.

See [Reset a password](https://neon.com/docs/manage/roles#reset-a-password) in the Neon documentation.

#### MongoDB Atlas

Changing a database user's password in MongoDB Atlas invalidates the current password immediately.

1. In MongoDB Atlas, under **Security**, select **Database & Network**.
2. Select **Edit** next to the database user.
3. Select **Edit Password**, then **Autogenerate Secure Password**.
4. Select **Update User**.
5. In Vercel, confirm that the integration shows the new environment variables, then redeploy every connected project.

See [Configure database users](https://www.mongodb.com/docs/atlas/security-add-mongodb-users/) in the MongoDB Atlas documentation.

#### Redis

Changing a database password in Redis invalidates the current credentials immediately and restarts the database instance.

1. In the Redis console, select the database you want to update.
2. Select **Edit**.
3. In the **Security** section, enter a new password.
4. Select **Save Database**.
5. In Vercel, confirm that the integration shows the new secret, then redeploy every connected project.

See [Default user](https://redis.io/docs/latest/operate/rc/security/access-control/data-access-control/default-user/) in the Redis Cloud documentation.

#### Hypertune

Hypertune tokens can overlap, so create the new token, redeploy, and then delete the old token.

1. In Hypertune, select the project with the same name as your Vercel installed product.
2. Open the project's **Settings** page and select **New token**.
3. Enter a **Token name** and select **Create token**.
4. In Vercel, redeploy every connected project.
5. After the new deployments are live, return to the project's **Settings** page in Hypertune and delete the previous token.

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
