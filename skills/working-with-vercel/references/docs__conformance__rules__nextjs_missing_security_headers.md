---
title: NEXTJS_MISSING_SECURITY_HEADERS
product: vercel
url: /docs/conformance/rules/NEXTJS_MISSING_SECURITY_HEADERS
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_MISSING_SECURITY_HEADERS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Requires that security headers are set correctly for Next.js apps and contain valid directives.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/nextjs_missing_security_headers.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "a985c428ff5d9e3f18c04fd44a4e96d181458c6e50f7a5a9c4567cfdfe444d78"
---

# NEXTJS_MISSING_SECURITY_HEADERS

> Conformance is available on Enterprise plans

Security headers are important to set to improve the security of your application.
Security headers can be set for all routes in \[`next.config.js` files]
(https://nextjs.org/docs/advanced-features/security-headers). This
conformance check requires that the security headers are set and use a valid
value.

Required headers:

- Content-Security-Policy
- Strict-Transport-Security
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

## Example

```sh
Conformance errors found!

A Conformance error occurred in test "NEXTJS_MISSING_SECURITY_HEADERS".

The security header "Strict-Transport-Security" is not set correctly. The "includeSubDomains" directive should be used in conjunction with the "preload" directive.

To find out more information and how to fix this error, visit
/docs/conformance/rules/NEXTJS_MISSING_SECURITY_HEADERS.

If this violation should be ignored, add the following entry to
/apps/docs/.allowlists/NEXTJS_MISSING_SECURITY_HEADERS.allowlist.json
and get approval from the appropriate person.

{
  "testName": "NEXTJS_MISSING_SECURITY_HEADERS",
  "reason": "TODO: Add reason why this violation is allowed to be ignored.",
  "location": {
    "workspace": "docs"
  },
  "details": {
    "header": "Strict-Transport-Security"
  }
}
```

## How to fix

Follow the [Next.js security headers documentation](https://nextjs.org/docs/advanced-features/security-headers)
to fix this Conformance test. That document will walk through each of the
headers and also links to further documentation to understand what the headers
do and how to set the best values for your application.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
