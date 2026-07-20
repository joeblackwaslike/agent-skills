---
title: RESOURCE_NOT_FOUND
product: vercel
url: /docs/errors/RESOURCE_NOT_FOUND
canonical_url: "https://vercel.com/docs/errors/RESOURCE_NOT_FOUND"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/runtime-logs
  - /docs/rest-api
  - /docs/rest-api/reference/errors
summary: This error signifies that a specified resource could not be located.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/resource_not_found.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "b1b23d1407ef7104628188081f78411657b6f3aa9327e48ec054a02bcfec39ee"
---

# RESOURCE_NOT_FOUND

The `RESOURCE_NOT_FOUND` error indicates that a requested resource is not available or cannot be found. This error typically arises when a request is made for a resource that either does not exist or is currently inaccessible.

**Error Code:** `404`

**Name:** Not Found

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Verify resource existence:** Confirm that the resource you're attempting to access exists. Check for any typos or errors in the resource name or path
2. **Review access permissions:** Ensure that your application or function has the necessary permissions to access the resource
3. **Inspect resource path:** Double-check the path or URL to the resource. Ensure it is correctly formatted and corresponds to the intended resource
4. **Check application configuration:** Review your application's configuration settings to ensure they are correctly set up to locate and access the resource
5. **Review logs:** Consult your [application logs](/docs/runtime-logs) for more details or clues as to why the resource could not be found. This can provide insights into whether the issue is due to an incorrect path, permissions, or other reasons

Additionally, the error can also occur in the context of the [Vercel REST API](/docs/rest-api), where it is similar to the [HTTP 500 Internal Server Error](/docs/rest-api/reference/errors#resource-not-found). In this case, the error message will contain the details of the resource that could not be found.


---

[View full sitemap](/docs/sitemap)
