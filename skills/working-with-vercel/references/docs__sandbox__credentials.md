---
title: Sandbox Credentials
product: vercel
url: /docs/sandbox/credentials
canonical_url: "https://vercel.com/docs/sandbox/credentials"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/firewall
  - /docs/sandbox/credentials/npm
summary: "Give Vercel Sandbox access to your team's private services with credentials Vercel sets up for you."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/credentials.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c188616af075be58e9662d66832f9225c535e9862b17a8113e6daf6e7d21c789"
---

# Sandbox Credentials

Request a credential when you create a sandbox, and Vercel handles the rest using the credentials your team already has.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox now supports managed npm credentials](https://vercel.com/changelog/vercel-sandbox-now-supports-managed-npm-credentials)
- [A sandbox without a network boundary is only half a sandbox](https://vercel.com/blog/a-sandbox-without-a-network-boundary-is-only-half-a-sandbox)
- [Sandbox Authentication](https://vercel.com/docs/sandbox/concepts/authentication) — Learn how to authenticate with Vercel Sandbox using OIDC tokens or access tokens, and how an OIDC token sets the team an
- [Sandbox security model](https://vercel.com/docs/sandbox/concepts/security) — Understand the Vercel Sandbox security model: microVM isolation, hardware side channels, resource limits, network access
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [Using Secure Compute with Sandbox](https://vercel.com/docs/sandbox/concepts/secure-compute) — You can attach a Vercel Sandbox to a Secure Compute network to send its public-internet traffic through static IPs and r

Full cross-link map for this page: [/docs/sandbox/credentials.graph.md](/docs/sandbox/credentials.graph.md)
<!-- /docsgraph:related -->

The credential stays outside the sandbox. The [sandbox firewall](/docs/sandbox/concepts/firewall) adds it to matching requests as they leave, so code in the sandbox, including an agent and the packages it installs, can use the credential but can't read it.

## Which credentials a sandbox can request

| Credential | Request it with | What it covers |
| --- | --- | --- |
| [npm](/docs/sandbox/credentials/npm) | `credentials: { npm: true }`, `credentials=SandboxManagedCredentials(npm=True)`, or `--credentials=npm` | Install packages from your team's npm registries. |

## Where each credential applies

Each credential goes only to its own hosts. npm credentials, for example, go to the registries in your team's npm configuration. Requests to other hosts leave the sandbox without credentials.

## Next steps

- [npm credentials](/docs/sandbox/credentials/npm): Install your team's private npm packages in a sandbox.

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
