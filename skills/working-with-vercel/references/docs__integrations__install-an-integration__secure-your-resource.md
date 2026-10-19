---
title: Secure Your Resource
product: vercel
url: /docs/integrations/install-an-integration/secure-your-resource
canonical_url: "https://vercel.com/docs/integrations/install-an-integration/secure-your-resource"
last_updated: 2026-09-17
type: how-to
prerequisites:
  - /docs/integrations/install-an-integration
  - /docs/integrations
related:
  - /docs/environment-variables/sensitive-environment-variables
  - /docs/cli/integration
summary: Learn how to secure native integration resources by choosing where they can connect and using Production-only mode to protect credentials.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/install-an-integration/secure-your-resource.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "21a0ba2916aee0d892bc5eb1a7ae713872df30c81844ea9d0b0b96998f3c45f6"
---

# Secure Your Resource

Secure a native integration resource by controlling where projects can connect to it. When you set a resource to **Production only**, Vercel removes non-production access and protects credentials as [Secret environment variables](/docs/environment-variables/sensitive-environment-variables), so secret values are not readable from the dashboard or CLI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Secure Marketplace credentials with Production-only access](https://vercel.com/changelog/secure-marketplace-credentials-with-production-only-access)
- [Rotating Secrets for Vercel Marketplace Integrations](https://vercel.com/kb/guide/how-to-reset-the-secrets-of-your-supabase-integration) — Rotate the Supabase service role key, JWT secret, and database password from your Vercel integration, then apply the new
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Permissions and Access](https://vercel.com/docs/integrations/install-an-integration/manage-integrations-reference) — Learn how to manage project access and added products for your integrations.
- [Restrict access to deployments with Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) — Vercel Authentication restricts access to your deployments so only authorized users can view and comment on your site.
- [Add a Native Integration](https://vercel.com/docs/integrations/install-an-integration/product-integration) — Learn how you can add a product to your Vercel project through a native integration.

Full cross-link map for this page: [/docs/integrations/install-an-integration/secure-your-resource.graph.md](/docs/integrations/install-an-integration/secure-your-resource.graph.md)
<!-- /docsgraph:related -->

## Before you secure a resource

Confirm these requirements:

- The resource has an **Allowed Environments** section in **Settings**
- You have a **Member** or **Owner** role to set a resource to **Production only**
- You have an **Owner** role to allow non-production environments again
- You have reviewed existing non-production project connections

> **💡 Note:** Securing a resource is a dashboard action. The CLI currently supports
> `remove`, `disconnect`, and `create-threshold` for integration resources. See
> [`vercel integration-resource`](/docs/cli/integration#vercel-integration-resource).

## Secure your resource with Production-only access

To secure a resource:

1. From your Vercel [dashboard](/dashboard), open [**Integrations**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fintegrations\&title=Go+to+Integrations).
2. Select **Manage** for the integration, and then open the installed product resource.
3. Open **Settings** and find **Allowed Environments**.
4. Select **Production only**.
5. Review the affected non-production connections.
6. Check the acknowledgment that non-production connections will be removed.
7. Select **Save**.

After save completes, Vercel removes Preview, Development, and Custom Environment targets from existing connections. Connections that include Production remain connected in Production only. Connections that do not include Production are disconnected.

## What Production-only mode changes

When a resource is secured with **Production only**:

- New connections to Preview, Development, or Custom Environments are blocked
- Existing Preview, Development, and Custom Environment targets are removed when you save
- Connection rows without a Production target are disconnected
- Resource credentials are protected as sensitive values and are not readable in the dashboard or CLI

## Allow non-production environments again

If you need broader access later:

This operation requires the **Owner** role.

1. Open the resource **Settings** page.
2. In **Allowed Environments**, select an option that includes non-production environments.
3. Select **Save** and complete the required multi-factor authentication (MFA) challenge.
4. Reconnect any projects that were fully disconnected from the **Projects** tab.

## Troubleshooting

If save is blocked:

- Confirm you selected the acknowledgment checkbox
- Review the listed non-production connections before retrying
- Reopen the resource page and verify your latest Allowed Environments setting


---

[View full sitemap](/docs/sitemap)
