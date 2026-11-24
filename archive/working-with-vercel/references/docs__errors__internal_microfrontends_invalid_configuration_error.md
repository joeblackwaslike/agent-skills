---
title: INTERNAL_MICROFRONTENDS_INVALID_CONFIGURATION_ERROR
product: vercel
url: /docs/errors/INTERNAL_MICROFRONTENDS_INVALID_CONFIGURATION_ERROR
canonical_url: "https://vercel.com/docs/errors/INTERNAL_MICROFRONTENDS_INVALID_CONFIGURATION_ERROR"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/microfrontends/quickstart
summary: The microfrontend configuration file is invalid.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/internal_microfrontends_invalid_configuration_error.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "a498e83d889613ffdfff6861d73dd4aa4fa4af241d33417190a4eb2c166ac982"
---

# INTERNAL_MICROFRONTENDS_INVALID_CONFIGURATION_ERROR

The `INTERNAL_MICROFRONTENDS_INVALID_CONFIGURATION_ERROR` error occurs when the configuration file for the deployment is invalid.

This error indicates that an invalid configuration file has been deployed.

## Troubleshoot

To troubleshoot this error, follow these steps:

1. Ensure the config in your `microfrontends.json` file is valid, see the [documentation](/docs/microfrontends/quickstart).
2. Ensure you are on the latest version of the [`@vercel/microfrontends`](https://www.npmjs.com/package/@vercel/microfrontends) package.
3. We have been notified of this error. For more information, check the [Vercel status page](https://www.vercel-status.com/) or [contact Vercel support](/help#issues)

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
