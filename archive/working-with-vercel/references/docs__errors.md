---
title: Error Codes
product: vercel
url: /docs/errors
canonical_url: "https://vercel.com/docs/errors"
last_updated: 2025-12-18
type: conceptual
prerequisites:
  []
related:
  - /docs/errors/error-list
summary: Use this guide to find specific solutions and insights for common Vercel errors.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "d1c3d5ab9379a552510d56c092cf4e1e5c5d03f77f48df86fbd86b0faed39fe7"
---

# Error Codes

When developing your application with Vercel, you may encounter a variety of errors. They can reflect issues that happen with external providers such as domain services or internal problems at the level of your application's deployment or your usage of platform features.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel now supports customizing platform error pages](https://vercel.com/changelog/vercel-now-supports-customizing-platform-error-pages)
- [View specific error codes in runtime logs](https://vercel.com/changelog/view-specific-error-codes-in-runtime-logs)
- [REST API Errors](https://vercel.com/docs/rest-api/errors) — General and specific errors you may encounter when using the Vercel REST API.
- [Custom error pages](https://vercel.com/docs/custom-error-pages) — Learn how to configure custom error pages for 5xx server errors on Vercel.
- [Troubleshooting Vercel Functions](https://vercel.com/docs/functions/troubleshooting) — Diagnose errors in Vercel Functions, including ECONNRESET errors when a function calls an external API or database.
- [Troubleshooting Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel/troubleshooting) — Learn how to troubleshoot common errors with Sign in with Vercel
- [get_runtime_errors](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_errors) — Use get_runtime_errors with Vercel MCP.

Full cross-link map for this page: [/docs/errors.graph.md](/docs/errors.graph.md)
<!-- /docsgraph:related -->

For general error handling guidance, that covers dashboard related errors, see [General Errors](/docs/errors/error-list).

## Application errors

## Platform errors

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
