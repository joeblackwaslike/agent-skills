---
title: Clone a private Git repository
product: vercel
url: /docs/sandbox/examples/clone-a-private-git-repository
canonical_url: "https://vercel.com/docs/sandbox/examples/clone-a-private-git-repository"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/cli-reference
summary: Create a Vercel Sandbox from a private Git repository and choose the right GitHub token for your use case.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/clone-a-private-git-repository.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "2b96cd8b302174ba65230936ed316b4340a6038c86f9e1b95b92a1243b00a150"
---

# Clone a private Git repository

Pass a `git` source to create a sandbox from a repository. For a private repository, add credentials with `username` and `password`. GitHub accepts `x-access-token` as the username and a token as the password:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox now supports managed npm credentials](https://vercel.com/changelog/vercel-sandbox-now-supports-managed-npm-credentials)
- [Create a sandbox and run code](https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code) — Create a Vercel Sandbox, write a file into it, run the file, and inspect the command output in TypeScript, Python, or th
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Quickstart](https://vercel.com/docs/sandbox/quickstart) — Learn how to run your first code in a Vercel Sandbox.
- [Sandbox Authentication](https://vercel.com/docs/sandbox/concepts/authentication) — Learn how to authenticate with Vercel Sandbox using OIDC tokens or access tokens, and how an OIDC token sets the team an
- [Prepare files and download artifacts](https://vercel.com/docs/sandbox/examples/prepare-files-and-download-artifacts) — Send input files to a Vercel Sandbox, run a build, and download the output back to your machine.

Full cross-link map for this page: [/docs/sandbox/examples/clone-a-private-git-repository.graph.md](/docs/sandbox/examples/clone-a-private-git-repository.graph.md)
<!-- /docsgraph:related -->

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  source: {
    type: 'git',
    url: 'https://github.com/your-org/private-repo.git',
    username: 'x-access-token',
    password: process.env.GIT_ACCESS_TOKEN!,
    depth: 1,
  },
  ports: [3000],
});

const install = await sandbox.runCommand('npm', ['install']);

if (install.exitCode !== 0) {
  throw new Error(await install.stderr());
}

await sandbox.runCommand({ cmd: 'npm', args: ['run', 'dev'], detached: true });
console.log(sandbox.domain(3000));
```

**index.js**

```js filename="index.js"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  source: {
    type: 'git',
    url: 'https://github.com/your-org/private-repo.git',
    username: 'x-access-token',
    password: process.env.GIT_ACCESS_TOKEN,
    depth: 1,
  },
  ports: [3000],
});

const install = await sandbox.runCommand('npm', ['install']);

if (install.exitCode !== 0) {
  throw new Error(await install.stderr());
}

await sandbox.runCommand({ cmd: 'npm', args: ['run', 'dev'], detached: true });
console.log(sandbox.domain(3000));
```

**main.py**

```py filename="main.py"
import asyncio
import os

from vercel import sandbox
from vercel.sandbox import GitSource


async def main() -> None:
    box = await sandbox.create_sandbox(
        source=GitSource(
            url="https://github.com/your-org/private-repo.git",
            username="x-access-token",
            password=os.environ["GIT_ACCESS_TOKEN"],
            depth=1,
        ),
    )
    await box.run_command("npm", ["install"], check=True)


asyncio.run(main())
```

The Sandbox CLI doesn't accept a Git source. From the CLI, clone the repository inside the sandbox with [`sandbox exec`](/docs/sandbox/cli-reference#sandbox-exec) and your own credentials.

Choose the GitHub token that fits your use case:

| Token                                                                                                                                                                                                   | Best for                                         | Setup                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| [Fine-grained personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) | Your own repositories                            | Select only the repositories the sandbox needs and grant **Contents: Read**.                                           |
| [GitHub App installation token](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app)                         | Platforms where users connect their repositories | Give the app **Contents: Read**. Tokens expire after 1 hour and only cover the repositories in that installation.      |
| [Classic personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)           | Tools that don't support fine-grained tokens     | Grant the `repo` scope. This token can read every repository your account can access, so prefer the other two options. |

If users bring their own repositories, have them install your GitHub App, store the installation ID, and generate a fresh installation token each time you create a sandbox:

**index.ts**

```ts filename="index.ts"
import { createAppAuth } from '@octokit/auth-app';
import { Sandbox } from '@vercel/sandbox';

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
});

export async function createSandboxForRepo(
  installationId: number,
  repoUrl: string,
) {
  const { token } = await auth({ type: 'installation', installationId });

  return Sandbox.create({
    source: {
      type: 'git',
      url: repoUrl,
      username: 'x-access-token',
      password: token,
    },
  });
}
```

**index.js**

```js filename="index.js"
import { createAppAuth } from '@octokit/auth-app';
import { Sandbox } from '@vercel/sandbox';

const auth = createAppAuth({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
});

export async function createSandboxForRepo(installationId, repoUrl) {
  const { token } = await auth({ type: 'installation', installationId });

  return Sandbox.create({
    source: {
      type: 'git',
      url: repoUrl,
      username: 'x-access-token',
      password: token,
    },
  });
}
```

**main.py**

```py filename="main.py"
import asyncio
import os

from github import Auth, GithubIntegration
from vercel import sandbox
from vercel.sandbox import GitSource

integration = GithubIntegration(
    auth=Auth.AppAuth(
        os.environ["GITHUB_APP_ID"],
        os.environ["GITHUB_APP_PRIVATE_KEY"],
    )
)


async def create_sandbox_for_repo(
    installation_id: int,
    repo_url: str,
) -> sandbox.Sandbox:
    token = integration.get_access_token(installation_id).token

    return await sandbox.create_sandbox(
        source=GitSource(
            url=repo_url,
            username="x-access-token",
            password=token,
        ),
    )


async def main() -> None:
    box = await create_sandbox_for_repo(
        installation_id=int(os.environ["GITHUB_APP_INSTALLATION_ID"]),
        repo_url="https://github.com/your-org/private-repo.git",
    )
    print(box.name)


asyncio.run(main())
```

Pass tokens through environment variables so they stay out of logs and source code. Grant only **Contents: Read**, which is all cloning needs, and rotate personal access tokens on a schedule.

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
