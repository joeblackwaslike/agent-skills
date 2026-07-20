---
title: ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR
product: vercel
url: /docs/errors/ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR
canonical_url: "https://vercel.com/docs/errors/ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/domains/custom-SSL-certificate
  - /docs/security/encryption
summary: Error in establishing a connection with an external target.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/router_external_target_handshake_error.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "6cbdda5ba58677d4b08ba996b238a52d4e107cc686059354b5519c981adac796"
---

# ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR

The `ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR` error occurs when a connection cannot be successfully established with an external target. This error may result from issues during the SSL handshake process or due to a timeout, and is often attributed to one of the following causes:

- **SSL handshake failure:** The SSL handshake may fail if the target has an invalid certificate or uses an unsupported Cipher Suite
- **Timeout:** The error could also be due to a timeout, which might be caused by issues connecting to the target. Note that proxied requests to external targets have a maximum timeout of **120 seconds** (2 minutes).

**Error Code:** `502`

**Name:** Unable to establish connection with external target

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check SSL configuration:** Ensure that the target's [SSL certificate](/docs/domains/custom-SSL-certificate) is valid and that it is not using an [unsupported Cipher Suite](/docs/security/encryption#supported-ciphers)
2. **Investigate connectivity issues:** Look into potential connectivity problems between your application and the external target
3. **Monitor response times:** Check if your application or the external target is experiencing unusual delays that might be contributing to the timeout


---

[View full sitemap](/docs/sitemap)
