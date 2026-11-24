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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/trusted_sources_oidc_discovery_failed.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "6f2f29d8c220116ab8d451162d7674cc38a271d6c27fc393989ebdb51306d0fd"
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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
