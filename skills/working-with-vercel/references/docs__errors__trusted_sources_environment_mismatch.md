---
title: TRUSTED_SOURCES_ENVIRONMENT_MISMATCH
product: vercel
url: /docs/errors/TRUSTED_SOURCES_ENVIRONMENT_MISMATCH
canonical_url: "https://vercel.com/docs/errors/TRUSTED_SOURCES_ENVIRONMENT_MISMATCH"
last_updated: 2026-05-04
type: reference
prerequisites:
  []
related:
  - /docs/security/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources
summary: "The Trusted Sources OIDC token presented with the request comes from an environment that isn't permitted to reach the target deployment."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/trusted_sources_environment_mismatch.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "22c94c1e85a757decc43ce54af60c7d581bed547d6b9f79881e05b3e35323cd1"
---

# TRUSTED_SOURCES_ENVIRONMENT_MISMATCH

The `TRUSTED_SOURCES_ENVIRONMENT_MISMATCH` error occurs when a request from one Vercel project to another (or to itself) reaches a deployment protected by [Trusted Sources](/docs/security/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources) with a valid OIDC token, but the caller's environment is not allowed to reach the target deployment's environment under the project's current rules.

For example, a token issued for a `preview` deployment trying to reach a `production` deployment will be rejected unless a rule on the target project explicitly allows it.

**Error Code:** `403`

**Name:** Forbidden

## Troubleshoot

To resolve this error, add a custom access rule to the target project's Trusted Sources so the caller's environment is permitted to reach the target environment:

1. Open the target project's **Settings**, then go to **Deployment Protection**, and find the **Trusted Sources** section.
2. Locate the entry for the calling project under **Vercel Projects**. If the caller is the same project, use the entry pinned at the top of the list and labeled `(this project)`.
3. Edit the entry's rules so the caller's `from` environment is allowed to reach the target's `to` environment. For example, allow `from: preview` to `to: production` if a preview deployment needs to call production.
4. Save the rule and retry the request.

If you didn't expect this caller to reach the deployment, no change is required: the request was correctly blocked.

For more details on how rules are matched and which claims are checked, see the [Trusted Sources documentation](/docs/security/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources).

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
