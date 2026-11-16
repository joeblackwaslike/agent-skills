---
title: npm Credentials
product: vercel
url: /docs/sandbox/credentials/npm
canonical_url: "https://vercel.com/docs/sandbox/credentials/npm"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/credentials
  - /docs/sandbox
related:
  - /docs/environment-variables/shared-environment-variables
  - /docs/agent/private-dependencies
  - /docs/sandbox/concepts/firewall
summary: "Install your team's private npm packages in Vercel Sandbox with no setup."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/credentials/npm.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "53ecae749227595a265fa315f31ffa5b4a4dccf2ef401ea4c3e74879fe5b5146"
---

# npm Credentials

Vercel configures the sandbox from your team's registry credentials, including custom registries such as GitHub Packages or JFrog Artifactory, so a coding agent or build can run `npm install` on a repository with private dependencies.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox now supports managed npm credentials](https://vercel.com/changelog/vercel-sandbox-now-supports-managed-npm-credentials)
- [Private Dependencies](https://v0.app/docs/private-dependencies) — Install private npm packages in v0 by configuring NPM_TOKEN or NPM_RC as environment variables.
- [How do I use private dependencies with Vercel?](https://vercel.com/kb/guide/using-private-dependencies-with-vercel) — Information on how to use private dependencies with a Vercel deployment.
- [Sandbox Authentication](https://vercel.com/docs/sandbox/concepts/authentication) — Learn how to authenticate with Vercel Sandbox using OIDC tokens or access tokens, and how an OIDC token sets the team an
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [Runtimes](https://vercel.com/docs/sandbox/concepts/runtimes) — Detailed specifications for the Vercel Sandbox environment.
- [Images](https://vercel.com/docs/sandbox/concepts/images) — Start sandboxes from Vercel's Managed Images, or custom OCI images stored in Vercel Container Registry to ship your own
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat

Full cross-link map for this page: [/docs/sandbox/credentials/npm.graph.md](/docs/sandbox/credentials/npm.graph.md)
<!-- /docsgraph:related -->

If your team already has `NPM_TOKEN` or `NPM_RC` as a [Shared Environment Variable](/docs/environment-variables/shared-environment-variables) in Development or Preview, you don't need to set up anything else. [Vercel Agent](/docs/agent/private-dependencies) uses the same configuration.

The token stays outside the sandbox. Vercel adds it to package downloads as they leave, so code in the sandbox can install your private packages without seeing the token.

## Configure your team's registry credentials

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

## Create a sandbox with npm credentials

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

## How npm credentials reach the registry

The sandbox gets an `.npmrc` with your team's registry URLs and scopes, and no tokens. The sandbox firewall adds the `Authorization` header to `GET` and `HEAD` requests to those registries.

Vercel reads your team's registry configuration when a sandbox is created, when it resumes, and when its network policy changes. A rotated token reaches a running sandbox the next time it resumes.

## Limits

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
