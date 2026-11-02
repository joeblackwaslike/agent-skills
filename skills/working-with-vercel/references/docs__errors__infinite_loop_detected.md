---
title: INFINITE_LOOP_DETECTED
product: vercel
url: /docs/errors/INFINITE_LOOP_DETECTED
canonical_url: "https://vercel.com/docs/errors/INFINITE_LOOP_DETECTED"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/redirects
summary: An infinite loop was detected within the application.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/infinite_loop_detected.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "41b67b1959f8f6e1add62bfc6c220eb246d00f1708185c68085ecd4d7d6796f7"
---

# INFINITE_LOOP_DETECTED

The `INFINITE_LOOP_DETECTED` error occurs when an infinite loop is detected within the application. This error can occur when the application is making an infinite number of requests to itself, or when the application is making an infinite number of requests to an external API or database.

**Error Code:** `508`

**Name:** Loop Detected

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check the application's source code:** Look for any code that might cause an infinite loop, such as a looping fetch or an unconditional redirect
2. **Check the application's configuration:** Review any [configuration](/docs/redirects#configuration-redirects) files, such as `next.config.js` or `vercel.json`, to ensure they are not causing the infinite loop
3. **Review external API or database calls:** Ensure that any external API or database calls your application is making do not have errors or infinite loops
4. **Handle unhandled exceptions:** Check the application logs for any unhandled exceptions that might be causing the infinite loop
5. **Use Vercel's status page:** If you have tried the steps above and are still experiencing the error, check Vercel's [status page](https://www.vercel-status.com/) for any reported outages in the CDN, which can sometimes cause this error


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
