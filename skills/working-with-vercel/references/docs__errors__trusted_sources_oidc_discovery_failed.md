---
title: TRUSTED_SOURCES_OIDC_DISCOVERY_FAILED
product: vercel
url: /docs/errors/TRUSTED_SOURCES_OIDC_DISCOVERY_FAILED
canonical_url: "https://vercel.com/docs/errors/TRUSTED_SOURCES_OIDC_DISCOVERY_FAILED"
last_updated: 2026-05-05
type: reference
prerequisites:
  []
related:
  - /docs/security/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources
  - /docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
summary: "Vercel couldn't complete OpenID Connect discovery for the token issuer configured as a Trusted Source."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/trusted_sources_oidc_discovery_failed.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "9bb63e3e52d0c389f595c6c709bddf846b73b92d1122ea5d083c684a1fe936cc"
---

# TRUSTED_SOURCES_OIDC_DISCOVERY_FAILED

The `TRUSTED_SOURCES_OIDC_DISCOVERY_FAILED` error occurs when a request reaches a deployment protected by [Trusted Sources](/docs/security/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources) with an OIDC token whose issuer is configured as a custom trusted source, but Vercel can't fetch a valid OpenID Connect discovery document from that issuer.

This usually means the issuer URL is unreachable, doesn't serve a valid `/.well-known/openid-configuration` document, or resolves to a host that can't be reached from the public internet.

**Error Code:** `403`

**Name:** Forbidden

## Troubleshoot

To resolve this error:

1. Confirm the issuer URL configured under the project's Trusted Sources matches the `iss` claim on the token exactly, including scheme and trailing path.
2. From a public network, fetch `<issuer>/.well-known/openid-configuration` and verify it returns a valid JSON discovery document with `jwks_uri`, `issuer`, and supported algorithms.
3. Check that the issuer's host resolves publicly and isn't behind a private network, VPN, or firewall that blocks inbound connections from Vercel.
4. If the issuer was recently rotated or migrated, retry the request after DNS and any caches have settled.

If the issuer is intentionally private or unreachable from the public internet, it can't be used as a Trusted Source. Use a different bypass method, such as [Protection Bypass for Automation](/docs/security/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation), instead.

For more details on configuring custom issuers, see the [Trusted Sources documentation](/docs/security/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources).


---

[View full sitemap](/docs/sitemap)
