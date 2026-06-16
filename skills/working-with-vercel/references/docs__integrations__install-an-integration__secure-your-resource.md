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
  - /docs/cli/integration-resource
summary: Learn how to secure native integration resources by choosing where they can connect and using Production-only mode to protect credentials.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/install-an-integration/secure-your-resource.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "c73bd4d9fbd396473b19385795fd887b98ef4e486b3d5c99e60f55d126bfcd10"
---

# Secure Your Resource

Secure a native integration resource by controlling where projects can connect to it. When you set a resource to **Production only**, Vercel removes non-production access and protects credentials as [Sensitive environment variables](/docs/environment-variables/sensitive-environment-variables), so secret values are not readable from the dashboard or CLI.

## Before you secure a resource

Confirm these requirements:

- The resource has an **Allowed Environments** section in **Settings**
- You have a **Member** or **Owner** role to set a resource to **Production only**
- You have an **Owner** role to allow Development and Preview again
- You have reviewed existing Development and Preview project connections

> **💡 Note:** Securing a resource is a dashboard action. The CLI currently supports
> `remove`, `disconnect`, and `create-threshold` for integration resources. See
> [`vercel integration-resource`](/docs/cli/integration-resource).

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
