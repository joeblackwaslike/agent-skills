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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "89d77789e811dc8e35d8ad04741e3e3b4a05102fefe02e6dae9639e152341e6c"
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
