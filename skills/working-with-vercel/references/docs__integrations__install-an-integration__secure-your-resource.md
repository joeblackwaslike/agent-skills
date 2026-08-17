---
title: Secure Your Resource
product: vercel
url: /docs/integrations/install-an-integration/secure-your-resource
canonical_url: "https://vercel.com/docs/integrations/install-an-integration/secure-your-resource"
last_updated: 2026-05-05
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "dfd709c84f413a22d7d37e2ca0dc7ef8b9b73d56ad34772031cf4c9c1c9ab355"
---

# Secure Your Resource

Secure a native integration resource by controlling where projects can connect to it. When you set a resource to **Production only**, Vercel removes non-production access and protects credentials as [Sensitive environment variables](/docs/environment-variables/sensitive-environment-variables), so secret values are not readable from the dashboard or CLI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related) — Protect who can see your deployments.
- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables?from=related) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Access Control](https://vercel.com/docs/security/access-control?from=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Restrict access to deployments with Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication?from=related) — Vercel Authentication restricts access to your deployments so only authorized users can view and comment on your site.
- [Deployment Protection](https://vercel.com/docs/deployment-protection?from=related) — Learn how to control access to your Vercel project's preview and production URLs with Deployment Protection. Configure p
- [Permissions and Access](https://vercel.com/docs/integrations/install-an-integration/manage-integrations-reference?from=related) — Learn how to manage project access and added products for your integrations.

Full cross-link map for this page: [/docs/integrations/install-an-integration/secure-your-resource.graph.md](/docs/integrations/install-an-integration/secure-your-resource.graph.md)
<!-- /docsgraph:related -->

## Before you secure a resource

Confirm these requirements:

- The resource has an **Allowed Environments** section in **Settings**
- You have a **Member** or **Owner** role to set a resource to **Production only**
- You have an **Owner** role to allow Development and Preview again
- You have reviewed existing Development and Preview project connections

> **💡 Note:** Securing a resource is a dashboard action. The CLI currently supports
> `remove`, `disconnect`, and `create-threshold` for integration resources. See
> [`vercel integration-resource`](/docs/cli/integration#vercel-integration-resource).

## Secure your resource with Production-only access

To secure a resource:

1. From your Vercel [dashboard](/dashboard), open [**Integrations**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fintegrations\&title=Go+to+Integrations).
2. Select **Manage** for the integration, and then open the installed product resource.
3. Open **Settings** and find **Allowed Environments**.
4. Select **Production only**.
5. Review the affected Development and Preview connections.
6. Check the acknowledgment that non-production connections will be removed.
7. Select **Save**.

After save completes, Vercel removes Development and Preview targets from existing connections. Connections that include Production remain connected in Production only, and connections that do not include Production are disconnected.

## What Production-only mode changes

When a resource is secured with **Production only**:

- New connections to Development or Preview are blocked
- Existing Development or Preview targets are removed when you save
- Connection rows without a Production target are disconnected
- Resource credentials are protected as sensitive values and are not readable in the dashboard or CLI

## Allow Development or Preview again

If you need broader access later:

This operation requires the **Owner** role.

1. Open the resource **Settings** page.
2. In **Allowed Environments**, select an option that includes Development and Preview.
3. Select **Save** and complete the required multi-factor authentication (MFA) challenge.
4. Reconnect any projects that were fully disconnected from the **Projects** tab.

## Troubleshooting

If save is blocked:

- Confirm you selected the acknowledgment checkbox
- Review the listed Development and Preview connections before retrying
- Reopen the resource page and verify your latest Allowed Environments setting


---

[View full sitemap](/docs/sitemap)
