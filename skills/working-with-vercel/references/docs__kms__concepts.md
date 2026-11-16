---
title: Vercel KMS Concepts
product: vercel
url: /docs/kms/concepts
canonical_url: "https://vercel.com/docs/kms/concepts"
last_updated: 2026-08-18
type: conceptual
prerequisites:
  - /docs/kms
related:
  - /docs/kms/quickstart
  - /docs/kms/concepts/key-rotation
  - /docs/kms/concepts/authentication
  - /docs/kms/concepts/project-grants
  - /docs/kms/concepts/connect-grants
summary: Understand how Vercel KMS rotates signing keys and how it authorizes signing, management, and verification.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/kms/concepts.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c34e77c273c43dcafb12d9982c91d965eadd7e79facd0d5f45af3d5307896ee9"
---

# Vercel KMS Concepts

These pages explain the parts of Vercel KMS you configure once and rely on over time. Read them after the [Quickstart](/docs/kms/quickstart), when you need to reason about how keys change and how requests are authorized.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sign JWTs from your Functions without managing private keys](https://vercel.com/changelog/sign-jwts-from-your-functions-without-managing-private-keys)
- [Create a signing key](https://vercel.com/docs/rest-api/kms/create-a-signing-key) — POST /v1/kms/issuers/{issuerId}/keys — Create a new signing key for a KMS issuer. Depending on the activation mode, the
- [vercel kms](https://vercel.com/docs/cli/kms) — Manage Vercel KMS issuers, rotate signing keys, and control which projects can sign tokens from the command line.
- [Vercel Connect Concepts](https://vercel.com/docs/connect/concepts) — Understand the core building blocks of Vercel Connect: connectors, installations, tokens, project links, triggers, and a
- [Key Management](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management) — Vercel MCP tools for key management.
- [Vercel fundamental concepts](https://vercel.com/docs/fundamentals) — Learn about the core concepts of Vercel

Full cross-link map for this page: [/docs/kms/concepts.graph.md](/docs/kms/concepts.graph.md)
<!-- /docsgraph:related -->

- **[Key rotation](/docs/kms/concepts/key-rotation)**: How KMS stages a new key, schedules its activation, and retires the previous key while already-issued tokens keep verifying.
- **[Authentication](/docs/kms/concepts/authentication)**: How KMS authorizes signing requests with a deployment OIDC token, authorizes management requests with a Vercel access token, and how relying parties verify signatures against the published JWKS.
- **[Project grants](/docs/kms/concepts/project-grants)**: How a project grant authorizes a Vercel deployment to sign with an issuer, scoped to a project and its environments.
- **[Connect grants](/docs/kms/concepts/connect-grants)**: How a Connect grant lets Vercel Connect provision and sign with an issuer on behalf of your team.
- **[Claims](/docs/kms/concepts/claims)**: How a grant sets KMS-owned token claims the caller cannot override, and how an issuer claims schema validates every token it signs.

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
