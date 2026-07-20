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
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "6d52e4e0e3a916b93289bd33e2f56fee2a8f7b5fc052ebb5b092766c85529819"
---

# NEXTJS_MISSING_SECURITY_HEADERS

> **🔒 Permissions Required**: Conformance

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
