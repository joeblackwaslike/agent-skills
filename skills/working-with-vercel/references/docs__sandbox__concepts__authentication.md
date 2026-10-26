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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "de6f7bc386164a51ef55eb1e87e80d5c80477509ba19ce4e40bef39d0191df62"
---

# Sandbox Authentication

The Sandbox SDK supports two authentication methods: Vercel OIDC tokens (recommended) and access tokens.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel AI Gateway and Vercel Sandbox now available on Hermes Agent](https://vercel.com/changelog/vercel-ai-gateway-and-vercel-sandbox-now-available-on-hermes-agent)
- [Build an agentic app in FastAPI with OpenAI Agents API and Vercel Sandbox](https://vercel.com/kb/guide/fastapi-openai-agents-api-vercel-sandbox) — Learn how to build a repository Q&A app using FastAPI, OpenAI Agents API, and Vercel Sandbox, with isolated code inspect
- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [How to give agents persistent storage with Vercel Drives](https://vercel.com/kb/guide/persistent-storage-with-vercel-drives) — Give AI SDK and TanStack AI agents persistent storage with Vercel Drives so they can save and reuse research notes acros
- [Run Python code securely with AI SDK and Vercel Sandbox](https://vercel.com/kb/guide/python-ai-sdk-vercel-sandbox) — Add an \\`executeCode\\` tool to your AI SDK agent with the \\`ai-sdk-tool-code-execution\\` package to run Python 3.13 insi
- [Run Terminal-Bench and any Harbor benchmark on Vercel Sandbox](https://vercel.com/kb/guide/run-terminal-bench-harbor-benchmarks-vercel-sandbox) — Run Terminal-Bench, SWE-bench, and any Harbor benchmark on Vercel Sandbox. Each trial executes in an isolated Firecracke
- [Death to long-lived static credentials](https://vercel.com/blog/death-to-long-lived-static-credentials)
- [Concepts](https://vercel.com/docs/eve/concepts) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Delete a sandbox](https://vercel.com/docs/rest-api/sandboxes/delete-a-sandbox) — DELETE /v2/sandboxes/{name} — Deletes a sandbox by name. If sandboxes are currently running, they will be stopped first.
- [OpenID Connect \\(OIDC\\) Federation](https://vercel.com/docs/oidc) — Secure the access to your backend using OIDC Federation to enable auto-generated, short-lived, and non-persistent creden
- [Authentication](https://vercel.com/docs/rest-api/authentication) — Endpoints in the authentication group of the Vercel REST API Reference.

Full cross-link map for this page: [/docs/sandbox/concepts/authentication.graph.md](/docs/sandbox/concepts/authentication.graph.md)
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

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  teamId: process.env.VERCEL_TEAM_ID!,
  projectId: process.env.VERCEL_PROJECT_ID!,
  token: process.env.VERCEL_TOKEN!,
});
```

**main.py**

```py filename="main.py"
import asyncio
import os

from vercel import sandbox
from vercel.api import session
from vercel.sandbox import SandboxCredentials, SandboxServiceOptions


async def resolve_credentials() -> SandboxCredentials:
    return SandboxCredentials(
        token=os.environ["VERCEL_TOKEN"],
        project_id=os.environ["VERCEL_PROJECT_ID"],
        team_id=os.environ["VERCEL_TEAM_ID"],
    )


async def main() -> None:
    sandbox_options = SandboxServiceOptions(
        credentials_factory=resolve_credentials,
    )

    async with session(service_options=[sandbox_options]):
        async with sandbox.create_sandbox() as box:
            print(box.name)


asyncio.run(main())
```

## Which method to use

| Scenario           | Recommended method               |
| ------------------ | -------------------------------- |
| Local development  | OIDC token via `vercel env pull` |
| Deployed on Vercel | OIDC token (automatic)           |
| External CI/CD     | Access token                     |
| Non-Vercel hosting | Access token                     |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
