---
title: NO_RESPONSE_FROM_FUNCTION
product: vercel
url: /docs/errors/NO_RESPONSE_FROM_FUNCTION
canonical_url: "https://vercel.com/docs/errors/NO_RESPONSE_FROM_FUNCTION"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/logs
  - /docs/drains
summary: The application did not respond correctly, this is likely due to an exception being thrown from the function handler.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/no_response_from_function.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "ff1834bf7bc62366c5fcfbcf74a91c0a9d2ca725a580a37e2254c38c135b48c6"
---

# NO_RESPONSE_FROM_FUNCTION

The `NO_RESPONSE_FROM_FUNCTION` error occurs when a function invocation completes without returning a response. This might happen if the function encounters an error that prevents it from responding, or if it fails to generate a response within the allowed execution time.

Potential causes include:

- A global uncaught exception
- A global unhandled rejection
- A deployment that introduced incorrect syntax

**Error Code:** `502`

**Name:** Bad Gateway

#### Troubleshoot

To troubleshoot this error, follow these steps:

1. **Verify return statements:** Ensure that the function has the necessary return statements to generate a response
2. **Check the function logs**: Open the [realtime request logs](/docs/logs#function-logs) for the application in a separate tab - this tab **must be kept open** while reproducing the error
3. **Review realtime logs**: Repeat the application behavior that led to the error being thrown and review the realtime request logs where it will now show
   - Use the information contained within the error logs to understand where the function is failing
4. **Use Log Drains**: Create a [Log Drain](/docs/drains) if you do not have one yet, to persist errors from Vercel functions
5. **Check external dependencies:** If the function relies on external services or APIs, ensure they are responding in a timely manner


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
