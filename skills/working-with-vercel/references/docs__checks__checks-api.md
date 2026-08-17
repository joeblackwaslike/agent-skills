---
title: Checks API Reference
product: vercel
url: /docs/checks/checks-api
canonical_url: "https://vercel.com/docs/checks/checks-api"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/checks
related:
  []
summary: The Vercel Checks API let you create tests and assertions that run after each deployment has been built, and are powered by Vercel Integrations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/checks/checks-api.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "495905e475946558700df1593c4f2889771c7edc6c337f234c009b739e4dabbc"
---

# Checks API Reference

API endpoints allow integrations to interact with the Vercel platform. Integrations can run checks every time you create a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Create a check](https://vercel.com/docs/rest-api/checks-v2/create-a-check?from=related)
- [Get a check](https://vercel.com/docs/rest-api/checks-v2/get-a-check?from=related)
- [Update a check](https://vercel.com/docs/rest-api/checks-v2/update-a-check?from=related)
- [Get a check run](https://vercel.com/docs/rest-api/checks-v2/get-a-check-run?from=related)
- [List all checks for a project](https://vercel.com/docs/rest-api/checks-v2/list-all-checks-for-a-project?from=related)

Full cross-link map for this page: [/docs/checks/checks-api.graph.md](/docs/checks/checks-api.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** The `post` and `patch` endpoints
> must be called with an OAuth2, or it will produce a
> `400` error.


---

[View full sitemap](/docs/sitemap)
