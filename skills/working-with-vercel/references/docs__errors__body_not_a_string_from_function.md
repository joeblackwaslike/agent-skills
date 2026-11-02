---
title: BODY_NOT_A_STRING_FROM_FUNCTION
product: vercel
url: /docs/errors/BODY_NOT_A_STRING_FROM_FUNCTION
canonical_url: "https://vercel.com/docs/errors/BODY_NOT_A_STRING_FROM_FUNCTION"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/runtime-logs
summary: The function returned a non-string body. This is a function error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/body_not_a_string_from_function.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "8351a05fe2e432bf24902187bad242babd43fd015be1aaa2ddca21f7cf572aa8"
---

# BODY_NOT_A_STRING_FROM_FUNCTION

The `BODY_NOT_A_STRING_FROM_FUNCTION` error occurs when a function returns a body that is not a string. It's essential that functions return a string body to ensure that they can be correctly processed and executed.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check function return type:** Ensure that the function is structured to return a string. If the function is returning a different data type, modify the function to return a string, using `JSON.stringify()` if necessary
2. **Review function code:** Inspect the function code for any logic that might cause a non-string value to be returned
3. **Check data types:** If the function is processing input data or retrieving data from external sources, ensure that the data is being correctly converted to a string before being returned
4. **Review function logs:** Check the [function logs](/docs/runtime-logs#type) for any errors or warnings that might indicate why a non-string value is being returned


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
