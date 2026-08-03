---
title: External CI/CD
product: vercel
url: /docs/monorepos/remote-caching/external-ci-cd
canonical_url: "https://vercel.com/docs/monorepos/remote-caching/external-ci-cd"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/monorepos/remote-caching
  - /docs/monorepos
related:
  - /docs/monorepos/remote-caching
summary: Learn about external ci/cd on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/monorepos/remote-caching/external-ci-cd.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "501f6758fad63fb701236a8ddad5468f81ebedad249349f47c0107980c572176"
---

# Use Remote Caching from External CI/CD

You can use [Vercel Remote Cache](/docs/monorepos/remote-caching) with Turborepo from an external CI/CD provider, so your pipelines share the same cache as your team. There are two ways to authenticate:

- **OpenID Connect (OIDC)**: configure a policy that allows exchanging the CI/CD provider's OIDC tokens for short-lived Turborepo access tokens that grant access to Remote Cache (recommended).
- **Personal Access Token (PAT)**: configure a long-lived, team-scoped PAT as a secret in your CI/CD provider (use when OIDC is not an option).

To set up Remote Caching on your own machine instead, see [Remote Caching](/docs/monorepos/remote-caching).

## OpenID Connect (OIDC)

When you use OIDC to authenticate, you exchange your CI/CD provider's OIDC token for a short-lived Turborepo access token and set it in the `TURBO_TOKEN` environment variable.

Unlike a Personal Access Token (PAT), the Turborepo access token

- is short-lived
- only grants access to Vercel Remote Cache
- is associated to your team, rather than a specific team member

Follow the steps below to set it up.

- ### Create an OIDC policy
  On the Vercel dashboard, go to your team's **Settings → Build and Deployment →** [**OIDC Policies for CLI Access**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbuild-and-deployment%23oidc-cli-policies\&title=OIDC+Policies+for+CLI+Access), then click **Add** next to **Turborepo CLI Policies**.

- ### Configure the OIDC policy
  Clicking **Add** opens a form to [add a Turborepo CLI policy](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbuild-and-deployment%3FaddOidcPolicy%3Dturborepo-cli\&title=Add+a+Turborepo+CLI+OIDC+Policy). Fill out the form with a policy name. If your CI/CD provider is listed, select it; otherwise, you can configure specific OIDC issuer and claims to match on.

  For example, if you are using GitHub, select your GitHub account and repository that hosts the CI/CD workflows you want to grant access to. You can optionally restrict the policy to a specific workflow or branch, and customize the audience.

- ### Add the `TURBO_TEAM` repository variable
  Create a repository variable named `TURBO_TEAM` set to your team slug, which is the part after `vercel.com/` in your [team URL](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings\&title=Find+Team+URL). For example, the slug for `vercel.com/acme` is `acme`.

  The exact steps depend on your CI/CD provider. For GitHub, use the [GitHub CLI](https://cli.github.com/) from your repository:
  ```bash filename="Terminal"
  gh variable set TURBO_TEAM --body "your-team-slug"
  ```
  Or add it through the GitHub UI under **Settings → Secrets and variables → Actions**, on the [**Variables** tab](https://docs.github.com/en/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository).
  > **💡 Note:** Using a repository variable rather than a secret ensures CI/CD providers like GitHub don't
  > censor your team name in log output.

- ### Exchange the OIDC token in your job and set the environment variable
  #### \['GitHub'
  Add [`vercel/setup-turborepo-remote-cache-action`](https://github.com/vercel/setup-turborepo-remote-cache-action) before any step that runs `turbo`. The action needs the [`id-token: write` permission](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect) so it can request a GitHub OIDC token, exchange it for a short-lived Turborepo access token, and set `TURBO_TOKEN` and `TURBO_TEAM` for later steps.
  ```yaml filename=".github/workflows/ci.yml" {8-10,18-21}
  # ...

  jobs:
    build:
      name: Build and Test
      timeout-minutes: 15
      runs-on: ubuntu-latest
      permissions:
        contents: read
        id-token: write

      steps:
        - name: Check out code
          uses: actions/checkout@v4
          with:
            fetch-depth: 2

        - name: Set up Turborepo Remote Cache
          uses: vercel/setup-turborepo-remote-cache-action@v1.0.0
          with:
            team: ${{ vars.TURBO_TEAM }}
      # ...
  ```
  > **💡 Note:** If you create multiple OIDC policies on your team, Vercel will try to match
  > your GitHub OIDC token against each of them. If more than one policy matches,
  > then you will need to pass the ID of the OIDC policy you intend to use in the
  > `policy` input; otherwise, you will receive an error.
  #### 'Other']
  For any other provider, request an OIDC token from it with the audience your policy expects, then exchange that token for a short-lived Turborepo access token. Set the result as `TURBO_TOKEN` and your team slug as `TURBO_TEAM` before running `turbo`:
  ```bash filename="exchange-oidc-token.sh"
  # $OIDC_TOKEN: the OIDC token issued by your CI/CD provider
  # $TURBO_TEAM: your Vercel team ID or slug

  export TURBO_TOKEN=$(curl -sS -f -X POST https://api.vercel.com/login/oauth/token \
    --data "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
    --data "client_id=cl_kyUx2zVvA4MGptBohkmtYHJly2XltXzD" \
    --data "subject_token_type=urn:ietf:params:oauth:token-type:id_token" \
    --data "requested_token_type=urn:ietf:params:oauth:token-type:access_token" \
    --data-urlencode "team_id_or_slug=$TURBO_TEAM" \
    --data-urlencode "subject_token=$OIDC_TOKEN" \
    | jq -r '.access_token')
  ```
  > **💡 Note:** If you create multiple OIDC policies on your team, Vercel will try to match
  > your CI/CD provider's OIDC token against each of them. If more than one policy
  > matches, then you will need to pass the ID of the OIDC policy you intend to
  > use in the `policy_id` parameter; otherwise you will receive an error.You can add the `policy_id` parameter like this:
  > `--data-urlencode "policy_id=$POLICY_ID"`.

## Personal Access Token (PAT)

If your CI/CD provider doesn't support OIDC, you can authenticate with a Personal Access Token (PAT).

Scope the PAT to the Vercel team you want to share artifacts with, so that you don't grant it more access than necessary.

Then add the following environment variables to your workflow to make them available to your `turbo` commands:

- `TURBO_TOKEN`: PAT scoped to the Vercel team to share artifacts with
- `TURBO_TEAM`: slug of the Vercel team to share artifacts with

- ### Create a scoped access token
  Create a scoped access token in the [Vercel dashboard](https://vercel.com/account/tokens), then copy the value somewhere safe. You'll need it in the next step.

- ### Add the `TURBO_TOKEN` secret
  Create a secret named `TURBO_TOKEN` set to the access token you just created. The exact steps depend on your CI/CD provider. For GitHub, use the [GitHub CLI](https://cli.github.com/):
  ```bash filename="Terminal"
  gh secret set TURBO_TOKEN
  ```
  Paste the token value when prompted. Or add it through the GitHub UI under **Settings → Secrets and variables → Actions**, on the [**Secrets** tab](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository).

- ### Add the `TURBO_TEAM` variable
  Create a repository variable named `TURBO_TEAM` set to your team slug, which is the part after `vercel.com/` in your [team URL](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings\&title=Find+Team+URL). For example, the slug for `vercel.com/acme` is `acme`.

  The exact steps depend on your CI/CD provider. For GitHub, use the [GitHub CLI](https://cli.github.com/) from your repository:
  ```bash filename="Terminal"
  gh variable set TURBO_TEAM --body "your-team-slug"
  ```
  Or add it through the GitHub UI under **Settings → Secrets and variables → Actions**, on the [**Variables** tab](https://docs.github.com/en/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository).
  > **💡 Note:** Using a repository variable rather than a secret ensures CI/CD providers like GitHub don't
  > censor your team name in log output.

- ### Set the environment variables on your job
  The exact steps will vary depending on your CI/CD provider. For example, if you are using GitHub, provide the environment variables to any job that runs `turbo`.
  ```yaml filename=".github/workflows/ci.yml" {8-10}
  # ...

  jobs:
    build:
      name: Build and Test
      timeout-minutes: 15
      runs-on: ubuntu-latest
      env:
        TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
        TURBO_TEAM: ${{ vars.TURBO_TEAM }}

      steps:
        - name: Check out code
          uses: actions/checkout@v4
          with:
            fetch-depth: 2
      # ...
  ```

## More resources

- [Remote Caching](/docs/monorepos/remote-caching)
- [setup-turborepo-remote-cache-action](https://github.com/vercel/setup-turborepo-remote-cache-action)


---

[View full sitemap](/docs/sitemap)
