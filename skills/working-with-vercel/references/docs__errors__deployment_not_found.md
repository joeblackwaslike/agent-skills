---
title: DEPLOYMENT_NOT_FOUND
product: vercel
url: /docs/errors/DEPLOYMENT_NOT_FOUND
canonical_url: "https://vercel.com/docs/errors/DEPLOYMENT_NOT_FOUND"
last_updated: 2026-02-26
type: reference
prerequisites:
  []
related:
  - /docs/deployments/managing-deployments
  - /docs/deployments/logs
  - /docs/accounts/team-members-and-roles
summary: The deployment was not found. This is a deployment error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/deployment_not_found.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "c6ee26493f647edc442de88d694e6a034e85d678d3986ebe3f7029a0e81e5b66"
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
6. **Contact support:** If you've checked the above and are still unable to resolve the issue, [contact support](/help#issues) for further assistance


---

[View full sitemap](/docs/sitemap)
