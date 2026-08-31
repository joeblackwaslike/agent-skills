---
title: DEPLOYMENT_BLOCKED
product: vercel
url: /docs/errors/DEPLOYMENT_BLOCKED
canonical_url: "https://vercel.com/docs/errors/DEPLOYMENT_BLOCKED"
last_updated: 2026-08-10
type: reference
prerequisites:
  []
related:
  - /docs/plans/hobby
  - /docs/limits
summary: The deployment was blocked due to certain conditions. This is a deployment error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/deployment_blocked.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "efd46e5c0563b87fef3924cfcac19647c3b1202aa6593fa252098fd3166f010d"
---

# DEPLOYMENT_BLOCKED

The `DEPLOYMENT_BLOCKED` error occurs when a deployment is blocked due to certain conditions that prevent it from proceeding. This could happen due to various reasons such as configuration errors, account limitations, or policy violations.

**Error Code:** `403`

**Name:** Forbidden

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check configuration:** Ensure that your deployment configuration is correct and complies with the platform's requirements
2. **Check your account plan**: If you have recently downgraded to the [Hobby plan](/docs/plans/hobby), you may need to redeploy your projects to make them available once again
3. **Review email notifications**: If you receive an email from Vercel about the pause, it may contain more details about the issue and next steps
4. **Verify account status:** Ensure your account is in good standing and hasn't exceeded any [limits or quotas](/docs/limits)
5. **Review policies:** Ensure that your deployment complies with all platform [policies](/legal/privacy-policy) and isn't in violation of any [terms](/legal/terms)
6. **Check for platform outages:** Sometimes, platform-wide outages or issues can cause deployments to be blocked. Check the [status page](https://www.vercel-status.com/) for any ongoing incidents


---

[View full sitemap](/docs/sitemap)
