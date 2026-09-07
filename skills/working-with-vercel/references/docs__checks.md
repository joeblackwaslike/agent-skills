---
title: Working with Checks
product: vercel
url: /docs/checks
canonical_url: "https://vercel.com/docs/checks"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  []
related:
  - /docs/speed-insights
  - /docs/deployments
  - /docs/checks/creating-checks
  - /docs/integrations
  - /docs/checks/checks-api
summary: Vercel automatically keeps an eye on various aspects of your web application using the Checks API. Learn how to use Checks in your Vercel workflow...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/checks.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "98c260c12860cacbe6d382949c9f4230325bf25a50359581edec257d7565fd89"
---

# Working with Checks

Checks are tests and assertions created and run after every successful deployment. **Checks API** defines your application's quality metrics, runs end-to-end tests, investigates APIs' reliability, and checks your deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Checks API support added for Marketplace integration providers](https://vercel.com/changelog/checks-api-support-added-for-marketplace-integration-providers?from=related&source_path=%2Fdocs%2Fchecks&source_site=vercel-docs&relationship=related)
- [Checkly Integration and Checks API now generally available](https://vercel.com/changelog/checkly-integration-and-checks-api-now-generally-available?from=related&source_path=%2Fdocs%2Fchecks&source_site=vercel-docs&relationship=related)
- [Native Deployment Checks are now available](https://vercel.com/changelog/native-deployment-checks?from=related&source_path=%2Fdocs%2Fchecks&source_site=vercel-docs&relationship=related)
- [Deployment Checks](https://vercel.com/docs/deployment-checks?from=related&source_path=%2Fdocs%2Fchecks&source_site=vercel-docs&relationship=related) — Set conditions that must be met before proceeding to the next phase of the deployment lifecycle.
- [Create a check](https://vercel.com/docs/rest-api/checks-v2/create-a-check?from=related&source_path=%2Fdocs%2Fchecks&source_site=vercel-docs&relationship=related) — POST /v2/projects/{projectIdOrName}/checks — Creates a new check for a project.
- [Get a check](https://vercel.com/docs/rest-api/checks-v2/get-a-check?from=related&source_path=%2Fdocs%2Fchecks&source_site=vercel-docs&relationship=related) — GET /v2/projects/{projectIdOrName}/checks/{checkId} — Return a detailed response for a single check.
- [List all checks for a project](https://vercel.com/docs/rest-api/checks-v2/list-all-checks-for-a-project?from=related&source_path=%2Fdocs%2Fchecks&source_site=vercel-docs&relationship=related) — GET /v2/projects/{projectIdOrName}/checks — List all checks for a project, optionally filtered by target.
- [Integration Approval Checklist](https://vercel.com/docs/integrations/create-integration/approval-checklist?from=related&source_path=%2Fdocs%2Fchecks&source_site=vercel-docs&relationship=related) — Review this checklist before submitting your native or connectable account integration for approval on the Vercel Market

Full cross-link map for this page: [/docs/checks.graph.md](/docs/checks.graph.md?from=related&source_path=%2Fdocs%2Fchecks&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Most testing and CI/CD flows occur in synthetic environments. This leads to false results, overlooked performance degradation, and missed broken connections.

## Types of flows enabled by Checks API

| Flow Type        | Description                                                                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core**         | Checks `200` responses on specific pages or APIs. Determine the deployment's health and identify issues with code, errors, or broken connections                                                                  |
| **Performance**  | Collects [core web vital](/docs/speed-insights) information for specific pages and compares it with the new deployment. It helps you decide whether to build the deployment or block it for further investigation |
| **End-to-end**   | Validates that your deployment has all the required components to build successfully. And identifies any broken pages, missing images, or other assets                                                            |
| **Optimization** | Optimizes information about the bundle size. Ensures that your website manages large assets like package and image size                                                                                           |

## Checks lifecycle

![Image](https://vercel.com/docs-assets/static/docs/integrations/checks/checks-overview-light.png)

The diagram shows the complete lifecycle of how a check works:

1. When a [deployment](/docs/deployments) is created, Vercel triggers the `deployment.created` webhook. This tells integrators that checks can now be registered
2. Next, an integrator uses the Checks API to create checks defined in the integration configuration
3. When the deployment is built, Vercel triggers the `deployment.ready` webhook. This notifies integrators to begin checks on the deployment
4. Vercel waits until all the created checks receive an update
5. Once all checks receive a `conclusion`, aliases will apply, and the deployment will go live

Learn more about this process in the [Anatomy of Checks API](/docs/checks/creating-checks)

## Checks integrations

You can create a [native](/docs/integrations#native-integrations) or [connectable account](/docs/integrations#connectable-accounts) integration that works with the checks API to facilitate testing of deployments for Vercel users. The [Checks API reference](/docs/checks/checks-api) lists the endpoints your integration calls to create and update checks.

### Install integrations

Vercel users can find and install your integration from the [Marketplace](/marketplace) under [testing](/marketplace/category/testing), [monitoring](/marketplace/category/monitoring) or [observability](/marketplace/category/observability).

### Build your Checks integration

Once you have [created your integration](/docs/integrations/create-integration/marketplace-product), [publish](/docs/integrations/create-integration/submit-integration) it to the marketplace by following these guidelines:

- Provide low or no configuration solutions for developers to run checks
- A guided onboarding process for developers from the installation to the end result
- Provide relevant information about the outcome of the test on the Vercel dashboard
- Document how to go beyond the default behavior to build custom tests for advanced users


---

[View full sitemap](/docs/sitemap)
