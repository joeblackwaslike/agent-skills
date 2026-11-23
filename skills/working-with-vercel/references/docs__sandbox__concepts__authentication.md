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
  - /docs/sandbox/cli-reference
summary: Learn how to authenticate with Vercel Sandbox using OIDC tokens or access tokens, and how an OIDC token sets the team and project for Sandbox CLI...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/concepts/authentication.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "e076cf7506b5b0ab4adce24820beb664bc7c52e78fa07cc05efd59c9782292b9"
---

# Sandbox Authentication

The Sandbox SDK supports two authentication methods: Vercel OIDC tokens (recommended) and access tokens.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel AI Gateway and Vercel Sandbox now available on Hermes Agent](https://vercel.com/changelog/vercel-ai-gateway-and-vercel-sandbox-now-available-on-hermes-agent)
- [Build an agentic app in FastAPI with OpenAI Agents API and Vercel Sandbox](https://vercel.com/kb/guide/fastapi-openai-agents-api-vercel-sandbox) — Learn how to build a repository Q&A app using FastAPI, OpenAI Agents API, and Vercel Sandbox, with isolated code inspect
- [How to give agents persistent storage with Vercel Drives](https://vercel.com/kb/guide/persistent-storage-with-vercel-drives) — Give AI SDK and TanStack AI agents persistent storage with Vercel Drives so they can save and reuse research notes acros
- [Add Python code execution to a TypeScript AI agent with Vercel Sandbox](https://vercel.com/kb/guide/python-ai-sdk-vercel-sandbox) — Add an \\`executeCode\\` tool to your TypeScript AI SDK agent with the \\`ai-sdk-tool-code-execution\\` package to run Pytho
- [Run Terminal-Bench and any Harbor benchmark on Vercel Sandbox](https://vercel.com/kb/guide/run-terminal-bench-harbor-benchmarks-vercel-sandbox) — Run Terminal-Bench, SWE-bench, and any Harbor benchmark on Vercel Sandbox. Each trial executes in an isolated Firecracke
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \\(VCR
- [Death to long-lived static credentials](https://vercel.com/blog/death-to-long-lived-static-credentials)
- [Vercel Sandbox SDK](https://vercel.com/docs/sandbox/sdk) — Use the Vercel Sandbox SDK for JavaScript, TypeScript, and Python, or the Sandbox CLI, to create and manage isolated Lin
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Delete a sandbox](https://vercel.com/docs/rest-api/sandboxes/delete-a-sandbox) — DELETE /v2/sandboxes/{name} — Deletes a sandbox by name. If sandboxes are currently running, they will be stopped first.
- [Chat SDK with Vercel Sandbox](https://vercel.com/docs/chat-sdk/integrations/sandbox) — Build a Chat SDK agent that analyzes CSV attachments with the AI SDK Bash tool in Vercel Sandbox.
- [Persistence](https://vercel.com/docs/sandbox/concepts/persistent-sandboxes) — Sandboxes automatically save their filesystem state when stopped and restore it when resumed. No manual snapshot managem

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

Then pass them to the SDK:

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

from vercel.sandbox import SandboxClient, SandboxCredentials, SandboxServiceOptions


async def resolve_credentials() -> SandboxCredentials:
    return SandboxCredentials(
        token=os.environ["VERCEL_TOKEN"],
        project_id=os.environ["VERCEL_PROJECT_ID"],
        team_id=os.environ["VERCEL_TEAM_ID"],
    )


async def main() -> None:
    client = SandboxClient.create(
        options=SandboxServiceOptions(credentials_factory=resolve_credentials),
    )
    try:
        async with client.create_sandbox() as box:
            print(box.name)
    finally:
        await client.aclose()


asyncio.run(main())
```

## Which method to use

| Scenario           | Recommended method               |
| ------------------ | -------------------------------- |
| Local development  | OIDC token via `vercel env pull` |
| Deployed on Vercel | OIDC token (automatic)           |
| External CI/CD     | Access token                     |
| Non-Vercel hosting | Access token                     |

## How a Vercel OIDC token sets the team and project

Each Vercel OIDC token belongs to one Vercel project. The development token that `vercel env pull` downloads belongs to the project you connected with `vercel link`. The Sandbox CLI authenticates with `VERCEL_OIDC_TOKEN` when you don't pass `--token` and `VERCEL_AUTH_TOKEN` isn't set. It reads the variable from your environment or from a `.env.local` file in the current directory. If you also don't pass `--scope` or `--project`, the CLI can infer the team and project for a command from the token. A sandbox you create then belongs to the token's project, which can differ from the project you meant to use.

To work in a different team and project, pass both `--scope` and `--project`:

```bash filename="Terminal"
sandbox create --name my-sandbox --scope my-team --project my-project
```

The `sandbox create` command prints the team and project it created the sandbox in, so you can confirm where the sandbox lives:

```text
✅ Sandbox my-sandbox created.
   │ team: my-team
   │ region: iad1
   │ project: my-project
   ╰ connect with: sandbox ssh my-sandbox
```

Pass the same `--scope` and `--project` to later commands that reference the sandbox by name, such as `sandbox connect`. For the options each command accepts, see the [Sandbox CLI reference](/docs/sandbox/cli-reference).

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
