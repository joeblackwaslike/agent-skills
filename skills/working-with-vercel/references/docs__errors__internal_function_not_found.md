---
title: INTERNAL_FUNCTION_NOT_FOUND
product: vercel
url: /docs/errors/INTERNAL_FUNCTION_NOT_FOUND
canonical_url: "https://vercel.com/docs/errors/INTERNAL_FUNCTION_NOT_FOUND"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: "The internal function could not be found. This is a Vercel's error."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/internal_function_not_found.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "d2059d44978da23c8e18e57ddad4b020e6bc6367fa75add81556f01701537e36"
---

# INTERNAL_FUNCTION_NOT_FOUND

The `INTERNAL_FUNCTION_NOT_FOUND` error occurs when an attempt to invoke a function fails because the function could not be found. This could happen if the function was not properly deployed, or if there is a misconfiguration in the function's settings or environment.

**Error Code:** `500`

**Name:** Internal Server Error

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Verify function deployment:** Ensure that the function has been successfully deployed and is available in the environment where it is being invoked
2. **Check function name:** Verify that the function name being used in the invocation matches the deployed function name
3. **Review configuration:** Check the function configuration in your project, including the function file name and the path where it is located
4. **Check for typos:** Ensure that there are no typos or incorrect references in the function name or in the invocation command


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
