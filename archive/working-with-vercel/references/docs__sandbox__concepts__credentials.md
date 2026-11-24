---
title: Sandbox Credentials
product: vercel
url: /docs/sandbox/concepts/credentials
canonical_url: "https://vercel.com/docs/sandbox/concepts/credentials"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/firewall
  - /docs/environment-variables/shared-environment-variables
  - /docs/agent/private-dependencies
summary: "Give Vercel Sandbox access to your team's private services with credentials Vercel sets up for you."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/concepts/credentials.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "f8b169cfd1b88c2fed1c9699b6fb87eea2ca4049b92be3257b1812f893c81433"
---

# Sandbox Credentials

Request a credential when you create a sandbox, and Vercel handles the rest using the credentials your team already has.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox now supports managed npm credentials](https://vercel.com/changelog/vercel-sandbox-now-supports-managed-npm-credentials)
- [Vercel Sandbox vs Upstash Box](https://vercel.com/kb/guide/vercel-sandbox-vs-upstash-box) — Compare Vercel Sandbox and Upstash Box as AI agent sandboxes, including isolation, persistence, network controls, SDKs,
- [Sandbox Authentication](https://vercel.com/docs/sandbox/concepts/authentication) — Learn how to authenticate with Vercel Sandbox using OIDC tokens or access tokens, and how an OIDC token sets the team an
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [Sandbox security model](https://vercel.com/docs/sandbox/concepts/security) — Understand the Vercel Sandbox security model: microVM isolation, hardware side channels, resource limits, network access
- [Vercel Sandbox SDK](https://vercel.com/docs/sandbox/sdk) — Use the Vercel Sandbox SDK for JavaScript, TypeScript, and Python, or the Sandbox CLI, to create and manage isolated Lin
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/sandbox/concepts/credentials.graph.md](/docs/sandbox/concepts/credentials.graph.md)
<!-- /docsgraph:related -->

The credential stays outside the sandbox. The [sandbox firewall](/docs/sandbox/concepts/firewall) adds it to matching requests as they leave, so code in the sandbox, including an agent and the packages it installs, can use the credential but can't read it.

## Which credentials a sandbox can request

| Credential | Request it with | What it covers |
| --- | --- | --- |
| [npm](#npm-credentials) | `credentials: { npm: true }`, `credentials=SandboxManagedCredentials(npm=True)`, or `--credentials=npm` | Install packages from your team's npm registries. |

## Where each credential applies

Each credential goes only to its own hosts. npm credentials, for example, go to the registries in your team's npm configuration. Requests to other hosts leave the sandbox without credentials.

## npm credentials

Vercel configures the sandbox from your team's registry credentials, including custom registries such as GitHub Packages or JFrog Artifactory, so a coding agent or build can run `npm install` on a repository with private dependencies.

If your team already has `NPM_TOKEN` or `NPM_RC` as a [Shared Environment Variable](/docs/environment-variables/shared-environment-variables) in Development or Preview, you don't need to set up anything else. [Vercel Agent](/docs/agent/private-dependencies) uses the same configuration.

### Configure your team's registry credentials

If your team hasn't configured registry credentials yet, add them as a team [Shared Environment Variable](/docs/environment-variables/shared-environment-variables):

1. In your team's **Settings**, open **Environment Variables**.
2. Add `NPM_TOKEN` or `NPM_RC` in **Development** or **Preview**, then save it.

Use `NPM_TOKEN` for packages on `registry.npmjs.org`. Set it to an npm access token with read access to your private packages.

Use `NPM_RC` for a custom registry or several registries. Set it to the registry configuration from your `.npmrc`, and add each token it references as another Shared Environment Variable in the same environment:

```ini filename="NPM_RC"
@acme:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

When both are set, `NPM_RC` takes precedence, and Vercel checks Development before Preview. You don't need to link the variables to a project.

### Create a sandbox with npm credentials

**terminal.sh**

```bash filename="terminal.sh"
sandbox create --credentials=npm
```

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({ credentials: { npm: true } });
await sandbox.runCommand('npm', ['install']);
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    async with sandbox.create_sandbox(
        credentials=sandbox.SandboxManagedCredentials(npm=True),
    ) as box:
        await box.run_command("npm", ["install"], check=True)


asyncio.run(main())
```

The `--credentials` flag also works with `sandbox run` and `sandbox sh`. If your team has no registry credentials configured, sandbox creation fails with a `400` error.

### How npm credentials reach the registry

The sandbox gets an `.npmrc` with your team's registry URLs and scopes, and no tokens. The sandbox firewall adds the `Authorization` header to `GET` and `HEAD` requests to those registries.

Vercel reads your team's registry configuration when a sandbox is created, when it resumes, and when its network policy changes. A rotated token reaches a running sandbox the next time it resumes.

### Limits

npm credentials have the following limits:

- They cover installs only. `npm publish` and other write requests leave the sandbox without credentials.
- They work with package managers that read `.npmrc`, including npm, pnpm, and Bun.
- They don't add registry hosts to your [network policy](/docs/sandbox/concepts/firewall#network-policies). If the policy is `deny-all`, or a user-defined policy that doesn't allow one of your team's registry hosts, sandbox creation fails with a `400` error.
- They're team-wide, so anyone who can create a sandbox in the team can install its private packages.

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
