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
  - /docs/deployment-retention
summary: The deployment has been removed
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/deployment_deleted.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "fd9426634f3e71968ca5041fec62cc276b87340075b5bc8a8927024307d99b27"
---

# DEPLOYMENT_DELETED

The `DEPLOYMENT_DELETED` error occurs when a request is made for a deployment that has been removed based on the project's deployment retention policy.

**Error Code:** `410`

**Name:** Deployment Deleted

When this error occurs, the error page shows the code `GONE`, the standard name of the `410` status, instead of `DEPLOYMENT_DELETED`.

## Troubleshoot

You can restore a deleted deployment during its recovery period, which lasts up to 30 days from deletion. For the exact length, see [Restoring a deleted deployment](/docs/deployment-retention#restoring-a-deleted-deployment).

To restore a deleted deployment, open **Settings** in the sidebar of your project:

1. Select **Security** on the side panel of the project settings page
2. Scroll down to the **Recently Deleted Deployments** section
3. Find the deployment that needs to be restored, and click on the dropdown menu item **Restore**
4. Complete the modal

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
