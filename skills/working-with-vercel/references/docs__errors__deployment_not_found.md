---
title: DEPLOYMENT_NOT_FOUND
product: vercel
url: /docs/errors/DEPLOYMENT_NOT_FOUND
canonical_url: "https://vercel.com/docs/errors/DEPLOYMENT_NOT_FOUND"
last_updated: 2026-08-10
type: reference
prerequisites:
  []
related:
  - /docs/deployments/managing-deployments
  - /docs/deployments/logs
  - /docs/accounts/team-members-and-roles
summary: The deployment was not found. This is a deployment error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/deployment_not_found.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "1aa1c3e25fb82f4a5be1f588800611eaf8cafe7761971952a937f619373e7d1f"
---

# DEPLOYMENT_NOT_FOUND

The `DEPLOYMENT_NOT_FOUND` error occurs when a request is made for a deployment that doesn't exist. This could happen if the deployment ID or URL is incorrect, or if the deployment has been deleted.

**Error Code:** `404`

**Name:** Not Found

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check the deployment URL**: Ensure that the deployment URL you are using is correct and does not contain any typos or incorrect paths
2. **Check deployment existence:** Verify that the [deployment exists](/docs/deployments/managing-deployments) and has not been deleted
3. **Review deployment logs:** If the deployment exists, review the [deployment logs](/docs/deployments/logs) to identify any issues that might have caused the deployment to be unavailable
4. **Verify permissions:** Ensure you have the necessary [permissions](/docs/accounts/team-members-and-roles) to access the deployment
5. **Consult community resources:** Visit our [community post on debugging 404 errors](https://community.vercel.com/t/debugging-404-errors/437) for additional tips and solutions shared by other developers.

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
