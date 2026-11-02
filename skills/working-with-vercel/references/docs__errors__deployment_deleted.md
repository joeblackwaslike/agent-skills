---
title: DEPLOYMENT_DELETED
product: vercel
url: /docs/errors/DEPLOYMENT_DELETED
canonical_url: "https://vercel.com/docs/errors/DEPLOYMENT_DELETED"
last_updated: 2026-02-26
type: reference
prerequisites:
  []
related:
  []
summary: The deployment has been removed
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/deployment_deleted.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "39998c4a3cb8a621d18113a8c686a7d649d8ee79a4e71f465f2b87ff775d20ef"
---

# DEPLOYMENT_DELETED

The `DEPLOYMENT_DELETED` error occurs when a request is made for a deployment that has been removed based on the projects deployment retention policy.

**Error Code:** `410`

**Name:** Deployment Deleted

## Troubleshoot

Recently deleted deployments can be restored within 30 days of deletion.

To restore a deleted deployment, open **Settings** in the sidebar of your project:

1. Select **Security** on the side panel of the project settings page
2. Scroll down to the **Recently Deleted** section
3. Find the deployment that needs to be restored, and click on the dropdown menu item **Restore**
4. Complete the modal


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
