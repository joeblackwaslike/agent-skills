---
title: DEPLOYMENT_NOT_READY_REDIRECTING
product: vercel
url: /docs/errors/DEPLOYMENT_NOT_READY_REDIRECTING
canonical_url: "https://vercel.com/docs/errors/DEPLOYMENT_NOT_READY_REDIRECTING"
last_updated: 2026-02-26
type: reference
prerequisites:
  []
related:
  - /docs/deployments/managing-deployments
  - /docs/deployments/logs
summary: The deployment is not ready and is redirecting to another location. This is a deployment error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/deployment_not_ready_redirecting.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "e90cc7ec2060609ec70687aa1d9a386a1c921349de8d220d83a655e08fd233ef"
---

# DEPLOYMENT_NOT_READY_REDIRECTING

The `DEPLOYMENT_NOT_READY_REDIRECTING` error occurs when the requested deployment is not yet ready, and the request is redirected to the deployment status page.

**Error Code:** `303`

**Name:** See Other

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check deployment status:** Ensure that the [deployment process](/docs/deployments/managing-deployments) has completed successfully and the deployment is ready to serve requests
2. **Inspect deployment logs:** Review the [deployment logs](/docs/deployments/logs) for any indications as to why the deployment is not ready
3. **Verify Configuration:** Check the configuration settings to ensure they are correct and that there are no misconfigurations
4. **Wait and refresh**: If you encounter this error, wait for a few seconds and then refresh the page. In some cases, the deployment may still be in progress, and refreshing the page after a short interval can resolve the issue


---

[View full sitemap](/docs/sitemap)
