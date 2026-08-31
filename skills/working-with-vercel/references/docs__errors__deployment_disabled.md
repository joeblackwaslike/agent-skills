---
title: DEPLOYMENT_DISABLED
product: vercel
url: /docs/errors/DEPLOYMENT_DISABLED
canonical_url: "https://vercel.com/docs/errors/DEPLOYMENT_DISABLED"
last_updated: 2026-08-10
type: reference
prerequisites:
  []
related:
  - /docs/plans/hobby
summary: The deployment is disabled. This is a deployment error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/deployment_disabled.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "e06f2682a179565ffad4ed6e128b13b496692eb632fea44dc8bb172b610f189c"
---

# DEPLOYMENT_DISABLED

The `DEPLOYMENT_DISABLED` error occurs when a deployment is disabled due to certain conditions or configurations. This might happen if there's a manual intervention required, or a specific condition is met that triggers the disabling of the deployment.

**Error Code:** `402`

**Name:** Payment required

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check your usage**: Check the specific [usage limits](/dashboard/usage) you've exceeded in the [Vercel dashboard](/dashboard/usage)
2. **Check your account plan**: If you have recently downgraded to the [Hobby plan](/docs/plans/hobby), you may need to redeploy your projects to make them available once again
3. **Review email notifications**: If you receive an email from Vercel about the pause, it may contain more details about the issue and next steps
4. **Restore your site**: The fastest solution is to [upgrade to the Pro plan](/docs/plans/hobby#upgrading-to-pro). This plan offers more generous usage limits and pay-as-you-go options


---

[View full sitemap](/docs/sitemap)
