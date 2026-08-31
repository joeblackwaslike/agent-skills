---
title: NOT_FOUND
product: vercel
url: /docs/errors/NOT_FOUND
canonical_url: "https://vercel.com/docs/errors/NOT_FOUND"
last_updated: 2026-08-10
type: reference
prerequisites:
  []
related:
  - /docs/deployments/managing-deployments
  - /docs/deployments/logs
  - /docs/accounts/team-members-and-roles
summary: The requested resource was not found. This is a deployment error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/not_found.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "26f2ff76223df50a19e29d04d67f5b99ae03a1e1505d51bf64afef289d85c92f"
---

# NOT_FOUND

The `NOT_FOUND` error occurs when a requested resource could not be found. This might happen if the resource has been moved, deleted, or if there is a typo in the URL.

**Error Code:** `404`

**Name:** Not Found

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check the deployment URL**: Ensure that the deployment URL you are using is correct and does not contain any typos or incorrect paths
2. **Check deployment existence:** Verify that the [deployment exists](/docs/deployments/managing-deployments) and has not been deleted
3. **Review deployment logs:** If the deployment exists, review the [deployment logs](/docs/deployments/logs) to identify any issues that might have caused the deployment to be unavailable
4. **Verify permissions:** Ensure you have the necessary [permissions](/docs/accounts/team-members-and-roles) to access the deployment


---

[View full sitemap](/docs/sitemap)
