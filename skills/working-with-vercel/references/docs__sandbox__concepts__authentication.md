---
title: Sandbox Authentication
product: vercel
url: /docs/sandbox/concepts/authentication
canonical_url: "https://vercel.com/docs/sandbox/concepts/authentication"
last_updated: 2026-08-25
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/accounts
  - /docs/project-configuration/general-settings
  - /docs/rest-api
summary: Learn how to authenticate with Vercel Sandbox using OIDC tokens or access tokens.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/authentication.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "e3d1dfa95e0482fef3a9d7afe1677af5913e61a846c4b95abab033f7cc051fce"
---

# Sandbox Authentication

The Sandbox SDK supports two authentication methods: Vercel OIDC tokens (recommended) and access tokens.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel AI Gateway and Vercel Sandbox now available on Hermes Agent](https://vercel.com/changelog/vercel-ai-gateway-and-vercel-sandbox-now-available-on-hermes-agent?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related)
- [Run Python code securely with AI SDK and Vercel Sandbox](https://vercel.com/kb/guide/python-ai-sdk-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Add an \\`executeCode\\` tool to your AI SDK agent with the \\`ai-sdk-tool-code-execution\\` package to run Python 3.13 insi
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \\(VCR
- [Using private GitHub repositories with Vercel Sandbox](https://vercel.com/kb/guide/sandbox-private-github-repositories?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Learn how to use Vercel Sandbox with private GitHub repositories using fine-grained tokens, classic tokens, or GitHub Ap
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Learn how to run your first code in a Vercel Sandbox.
- [OIDC](https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Authenticate AI Gateway requests with Vercel OIDC tokens, with no API key to manage.
- [OpenID Connect \\(OIDC\\) Federation](https://vercel.com/docs/oidc?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Secure the access to your backend using OIDC Federation to enable auto-generated, short-lived, and non-persistent creden
- [Authentication](https://vercel.com/docs/rest-api/authentication?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=related) — Endpoints in the authentication group of the Vercel REST API Reference.

Full cross-link map for this page: [/docs/sandbox/concepts/authentication.graph.md](/docs/sandbox/concepts/authentication.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fauthentication&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Vercel OIDC token (recommended)

The SDK uses Vercel OpenID Connect (OIDC) tokens when available.

**Local development**: Download a development token by connecting to a Vercel project:

```bash
vercel link
vercel env pull
```

This creates a `.env.local` file with a `VERCEL_OIDC_TOKEN`. The token expires after 12 hours, so run `vercel env pull` again if you see authentication errors.

**Production**: Vercel manages token expiration automatically when your code runs on Vercel.

## Access tokens

Use access tokens when `VERCEL_OIDC_TOKEN` is unavailable, such as in external CI/CD systems or non-Vercel environments.

You need:

- Your [Vercel team ID](/docs/accounts#find-your-team-id)
- Your [Vercel project ID](/docs/project-configuration/general-settings#project-id)
- A [Vercel access token](/docs/rest-api#creating-an-access-token) with access to the team

Set these as environment variables:

```bash
VERCEL_TEAM_ID=team_xxx
VERCEL_PROJECT_ID=prj_xxx
VERCEL_TOKEN=your_access_token
```

Then pass them to `Sandbox.create()`:

## Which method to use

| Scenario           | Recommended method               |
| ------------------ | -------------------------------- |
| Local development  | OIDC token via `vercel env pull` |
| Deployed on Vercel | OIDC token (automatic)           |
| External CI/CD     | Access token                     |
| Non-Vercel hosting | Access token                     |


---

[View full sitemap](/docs/sitemap)
