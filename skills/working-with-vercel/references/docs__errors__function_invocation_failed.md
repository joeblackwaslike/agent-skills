---
title: FUNCTION_INVOCATION_FAILED
product: vercel
url: /docs/errors/FUNCTION_INVOCATION_FAILED
canonical_url: "https://vercel.com/docs/errors/FUNCTION_INVOCATION_FAILED"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The invocation of a function failed. This is a function error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/function_invocation_failed.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "df821b4d8ee54ab504e881d5d83d8274ccbf3ea7c4a503810dd6b69b5a5d83a0"
---

# FUNCTION_INVOCATION_FAILED

The `FUNCTION_INVOCATION_FAILED` error occurs when a function invocation fails. This could be due to an error within the function itself, or an issue with the environment in which the function is running.

**Error Code:** `500`

**Name:** Internal Server Error

## Possible causes

- The runtime process (Node.js, Bun, Python, etc.) has crashed.
- Node.js or Bun threw an unhandled rejection/uncaught exception.

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check application logs:** Review the application logs to identify any specific errors related to the function invocation. They can be found under the [Logs tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Flogs\&title=Application+Logs)
2. **Review function code:** Ensure that the code for the function is correct and does not contain any errors or infinite loops. Use a `try/catch` block to catch any errors that might be occurring within the function code
3. **Check for unhandled exceptions:** Look for any unhandled exceptions within the function code that might be causing the invocation to fail
4. **Verify function configuration:** Double-check the function configuration to ensure that it's set up correctly, including any environment variables or other settings


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
