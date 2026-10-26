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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "113b8d7fc6fa8d4dda27271d2fd0bd98b27e8f4e1c3bb8c4b2ab6e03576d314f"
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
