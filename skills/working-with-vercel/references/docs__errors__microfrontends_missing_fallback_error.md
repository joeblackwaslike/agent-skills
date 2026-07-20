---
title: MICROFRONTENDS_MISSING_FALLBACK_ERROR
product: vercel
url: /docs/errors/MICROFRONTENDS_MISSING_FALLBACK_ERROR
canonical_url: "https://vercel.com/docs/errors/MICROFRONTENDS_MISSING_FALLBACK_ERROR"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/deployments/environments
  - /docs/microfrontends/managing-microfrontends
summary: The microfrontend request did not have a fallback for the environment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/microfrontends_missing_fallback_error.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "05709a44745cd25b0015dc93d2c6255f212081a3b053d88e294f296e76a02517"
---

# MICROFRONTENDS_MISSING_FALLBACK_ERROR

The `MICROFRONTENDS_MISSING_FALLBACK_ERROR` error occurs when a microfrontends request did not match any other deployments in the same environment, and no deployment could be found for the specified fallback.

## Troubleshoot

To troubleshoot this error, follow these steps:

In the [Production](/docs/deployments/environments#production-environment) environment, this error should not occur since every request is routed to the Production environment of mcirofrontends projects. Make sure that every project in the microfrontends group has a production deployment.

In non-Production environments, the fallback is configured in the [Fallback Environment](/docs/microfrontends/managing-microfrontends#fallback-environment) setting. Based on the configured option, check that every project has a deployment for that environment.

If the issue persists after checking that every project has a deployment in the configured Fallback Environment setting, please contact Vercel support to reach out to the team.


---

[View full sitemap](/docs/sitemap)
