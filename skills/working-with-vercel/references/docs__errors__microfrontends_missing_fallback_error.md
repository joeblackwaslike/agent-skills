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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "0eeed400257986390f84c677c2a696cb6064183293d0e679fcf687bf65db4e90"
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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
