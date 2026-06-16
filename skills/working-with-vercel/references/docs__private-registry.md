---
title: "Working with Vercel's private registry"
product: vercel
url: /docs/private-registry
canonical_url: "https://vercel.com/docs/private-registry"
last_updated: 2026-03-17
type: conceptual
prerequisites:
  []
related:
  - /docs/rest-api
  - /docs/environment-variables/sensitive-environment-variables
  - /docs/conformance
summary: "Learn how to set up Vercel's private registry for use locally, in Vercel, and in your CI."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/private-registry.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "d16875a3977b74e5dbded4e0fcc3efbcb524446a0919217f3085399212845090"
---

# Working with Vercel

Vercel distributes packages with the `@vercel-private` scope through our
private npm registry, requiring authentication through a Vercel account for
each user.

This guide covers Vercel's private registry packages. For information on using your own private npm packages with Vercel, see our guide on .

> **💡 Note:** Access to `@vercel-private` packages is linked to access to products. If you
> have trouble accessing a package, please check that you have access to the
> corresponding Vercel product.

## Setting up your local environment

- ### Set up your workspace
  If you're the first person on your team to use Vercel's private registry,
  you'll need to set up your workspace to fetch packages from the private
  registry.

  Execute the following command to configure your package manager to fetch
  packages with the `@vercel-private` scope from the private registry. If you're using modern Yarn (v2 or newer) see the [Using modern versions of Yarn](#setting-registry-server-using-modern-versions-of-yarn) section below.
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i 
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i 
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i 
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i 
      ```
    </Code>
  </CodeBlock>
  This command creates an `.npmrc` file (or updates one if it exists) at the root
  of your workspace. We recommend committing this file to your repository, as it
  will help other engineers get on board faster.

- ### Setting registry server using modern versions of Yarn
  Yarn version 2 or newer ignores the `.npmrc` config file so you will need to use this command instead to add the
  registry to your project's `.yarnrc.yml` file:
  ```sh copy
  yarn config set npmScopes.vercel-private.npmRegistryServer "https://vercel-private-registry.vercel.sh/registry"
  ```

- ### Log in to the private registry
  Each team member will need to complete this step. It may be helpful to
  summarize this step in your team's onboarding documentation.

  To log in, use the following command and follow the prompts:
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i 
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i 
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i 
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i 
      ```
    </Code>
  </CodeBlock>
  > **⚠️ Warning:** The minimum required version of npm to log into the registry is 8.14.0. For
  > pnpm, version 7.0.0 or higher is required.
  During this process, you will be asked to log in to your Vercel account. Ensure
  that the account that you log in to has access to the Vercel product(s) that
  you're trying to install.

  You should now have a `.npmrc` file in your home directory that contains the
  authentication token for the private registry.

- #### Setting token using modern versions of Yarn
  Yarn version 2 or newer requires the authentication token to be saved in a
  `.yarnrc.yml` file. After running the above command, you can copy the token
  from the `.npmrc` file with:
  ```sh copy
  auth_token=$(awk -F'=' '/vercel-private-registry.vercel.sh\/:_authToken/ {print $2}' $(npm config get userconfig)) \
  && yarn config set --home 'npmRegistries["https://vercel-private-registry.vercel.sh/registry"].npmAuthToken' $auth_token
  ```
  Note the `--home` flag, which ensures the token is saved in the global `.yarnrc.yml`
  rather then in your project so that it isn't committed.

- ### Verify your setup
  Verify your login status by executing:
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i 
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i 
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i 
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i 
      ```
    </Code>
  </CodeBlock>
  > **⚠️ Warning:** The Yarn command only works with Yarn version 2 or newer, use the npm command
  > if using Yarn v1.
  You should see your Vercel username returned if everything is set up correctly.

- ### Optionally set up a pre-install message for missing credentials
  When a user tries to install a package from the private registry without first
  logging in, the error message might be unclear. To help, we suggest adding a
  pre-install message that provides instructions to those unauthenticated users.

  Create a `preinstall.mjs` file with your error message:
  ```javascript copy filename="preinstall.mjs"
  import { exec } from 'node:child_process';
  import { promisify } from 'node:util';

  const execPromise = promisify(exec);

  // Detect which package manager is being used
  const userAgent = process.env.npm_config_user_agent || '';
  const isYarn = userAgent.includes('yarn');
  const isPnpm = userAgent.includes('pnpm');
  const isBun = userAgent.includes('bun');

  let checkCommand;
  let loginCommand;

  if (isPnpm) {
    checkCommand =
      'pnpm whoami --registry=https://vercel-private-registry.vercel.sh/registry';
    loginCommand = 'pnpm login --scope=@vercel-private';
  } else if (isYarn) {
    checkCommand = 'yarn npm whoami --scope=vercel-private';
    loginCommand = 'npm login --scope=@vercel-private';
  } else {
    // npm or bun
    checkCommand =
      'npm whoami --registry=https://vercel-private-registry.vercel.sh/registry';
    loginCommand = 'npm login --scope=@vercel-private';
  }

  try {
    await execPromise(checkCommand);
  } catch (error) {
    throw new Error(
      `Please log in to the Vercel private registry to install \`@vercel-private\`-scoped packages:\n\`${loginCommand}\``,
    );
  }
  ```
  Then add the following script to the `scripts` field in your `package.json`:
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i 
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i 
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i 
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i 
      ```
    </Code>
  </CodeBlock>

## Setting up Vercel

Now that your local environment is set up, you can configure Vercel to use the
private registry.

1. Create a [Vercel authentication token](/docs/rest-api#creating-an-access-token) on the [Tokens](https://vercel.com/account/tokens) page
2. To set the newly created token in Vercel, navigate to the [Environment Variables](https://vercel.com/docs/environment-variables)
   settings for your Project
3. Add a new environment variable with the name `VERCEL_TOKEN`, and set the
   value to the token you created above. We recommend using a [Sensitive Environmental Variable](/docs/environment-variables/sensitive-environment-variables) for storing this token
4. Add a new environment variable with the name `NPM_RC`, and set the value to
   the following:

```sh copy
@vercel-private:registry=https://vercel-private-registry.vercel.sh/registry
//vercel-private-registry.vercel.sh/:_authToken=${VERCEL_TOKEN}
```

> **💡 Note:** If you already have an `NPM_RC` environment variable, you can append the above
> to that existing value.

Vercel should now be able to install packages from the private registry when
building your Project.

## Setting up your CI provider

The instructions below are for [GitHub Actions](https://github.com/features/actions),
but configuring other CI providers should be similar:

1. Create a [Vercel authentication token](/docs/rest-api#creating-an-access-token) on the [Tokens](https://vercel.com/account/tokens) page. For security reasons, you should use a different token from the one you created for Vercel in the previous step
2. Once you have a new token, add it as a secret named `VERCEL_TOKEN` to your
   GitHub repository or organization. To learn more about how to add secrets, [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
3. Finally, create a [workflow](https://docs.github.com/en/actions/using-workflows) for the product you're setting up. The example workflow below is for [Conformance](/docs/conformance)
   and assumes that you're using [pnpm](https://pnpm.io/) as your package manager. In this example we also pass the token to the Conformance CLI, as the same token can be used for CLI authentication

```yaml filename=".github/workflows/conformance.yml"
name: Conformance

on:
  pull_request:
    branches:
      - main

jobs:
  conformance:
    name: 'Run Conformance'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.node-version'

      - name: Set up pnpm
        uses: pnpm/action-setup@v3

      - name: Set up Vercel private registry
        run: npm config set //vercel-private-registry.vercel.sh/:_authToken $VERCEL_TOKEN
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}

      - name: Install dependencies
        run: pnpm install

      - name: Run Conformance
        run: pnpm conformance
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

By default, GitHub workflows are not required. To require the workflow in your repository, [create a branch protection rule on GitHub](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule#creating-a-branch-protection-rule) to **Require status checks to pass before merging**.


---

[View full sitemap](/docs/sitemap)
