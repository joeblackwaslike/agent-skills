---
title: Trusted Sources
product: vercel
url: /docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources"
last_updated: 2026-05-13
type: how-to
prerequisites:
  - /docs/deployment-protection/methods-to-bypass-deployment-protection
  - /docs/deployment-protection
related:
  - /docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/security/deployment-protection/methods-to-protect-deployments/password-protection
  - /docs/security/deployment-protection/methods-to-protect-deployments/trusted-ips
  - /docs/oidc
  - /docs/oidc/reference
summary: Let other Vercel projects and external services reach your protected deployments by presenting a verified OIDC token.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "4ab011ee6f8d426e306e2907056c7fa099c8b6a626e1113c07d335e83ea35bed"
---

# Trusted Sources

> **🔒 Permissions Required**: Trusted Sources

Trusted Sources control which workloads can reach this project's protected deployments: this project itself, other Vercel projects in the same team, and external services like GitHub Actions or GitLab CI. Every authorized caller authenticates with a short-lived OIDC token signed by its own identity provider, so you don't share a static secret or open the deployment to the public internet.

Use Trusted Sources for service-to-service traffic when you want to keep [Vercel Authentication](/docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication), [Password Protection](/docs/security/deployment-protection/methods-to-protect-deployments/password-protection), or [Trusted IPs](/docs/security/deployment-protection/methods-to-protect-deployments/trusted-ips) on for everyone else.

There are three kinds of caller you can authorize:

- **This project**: pinned at the top of the **Vercel Projects** list and labeled `(this project)`. By default it can call its own deployments within the same environment, and `development` can call preview so the Vercel CLI works without extra config. You can customize this with `from` and `to` rules.
- **Other Vercel Projects**: any other project in this team, added to the **Vercel Projects** list.
- **External Services**: any non-Vercel workload that can issue OIDC tokens, such as GitHub Actions, GitLab CI, or Bitbucket Pipelines, added to the **External Services** list.

## How it works

Each request from a trusted caller carries an OIDC token in the `x-vercel-trusted-oidc-idp-token` header. Vercel validates the token against its issuer, confirms the caller matches a rule on this project, and lets the request through Deployment Protection.

A request is allowed when all three checks pass:

1. The token's signature is valid for the configured issuer.
2. Every required claim you configured matches a value on the token.
3. The deployment's environment matches the rule's target environments.

If any check fails, the request falls through to the project's other Deployment Protection settings.

### Default access

This project can always call its own deployments within the same environment:

- Production calls production
- Preview calls preview
- A custom environment calls a custom environment with the same slug

In addition, the `development` environment can call preview deployments. This is what lets the Vercel CLI reach a preview.

No other caller is allowed until you add it to Trusted Sources. When you add another Vercel project, the default is matching-environment only (development to preview is reserved for self-access). You can override either default with custom rules.

## Vercel Projects

The **Vercel Projects** subgroup covers calls from one Vercel project to another in the same team. The calling project's function forwards its [Vercel OIDC token](/docs/oidc), and Vercel verifies the token against this project's trusted source list.

Secure Backend Access with OIDC Federation must be on in the calling project so Vercel attaches the token. It's on by default. If `getVercelOidcToken()` returns no token, check **Settings** > **Security** > **Secure Backend Access with OIDC Federation** on the calling project.

### Forward the OIDC token from your code

In the calling project's function, read the OIDC token with [`getVercelOidcToken`](/docs/oidc/reference#getverceloidctoken) from `@vercel/oidc` and forward it on the request. The helper resolves the token from `VERCEL_OIDC_TOKEN` in builds and local development, and from the request context inside Vercel Functions, so you don't read the header yourself:

```ts filename="app/api/call-protected/route.ts"
import { getVercelOidcToken } from '@vercel/oidc';

export async function GET() {
  const oidcToken = await getVercelOidcToken();

  if (!oidcToken) {
    return new Response('Missing OIDC token', { status: 401 });
  }

  const response = await fetch('https://protected-project.vercel.app/api/data', {
    headers: {
      'x-vercel-trusted-oidc-idp-token': oidcToken,
    },
  });

  return new Response(await response.text(), { status: response.status });
}
```

### Customize this project's self-access

This project is always pinned to the top of **Vercel Projects** and labeled `(this project)`. By default, it can call its own deployments within the same environment, and the `development` environment can call preview deployments so the Vercel CLI works out of the box.

Customize self-access when you want to:

- Allow access across environments in this project, for example preview calling production.
- Remove the development to preview default if you don't want CLI access.
- Expand access to more custom environments.

To customize:

1. Go to **Settings** and select [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings).
2. In **Trusted Sources** > **Vercel Projects**, open the menu on the first row and select **Customize**. If you've already configured rules, the menu shows **Edit** instead.
3. The editor opens with the default `from` and `to` rules prefilled. Tweak, add, or remove rules to match the access you want.
4. Select **Add rules** (first time) or **Save rules** (when editing).

> **⚠️ Warning:** Saved rules replace the defaults. If you still want production to reach production, preview to reach preview, or development to reach preview for CLI access, keep those rows in the editor.

To return to the default, open the menu on the same row and select **Reset to default**.

### Add another Vercel project

1. Go to **Settings** and select [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings).
2. In **Trusted Sources** > **Vercel Projects**, select **Add**.
3. Choose a project from this team.
4. Optionally, add a note that explains why the project is trusted.
5. The access rules editor prefills with the default `from` and `to` pairs (matching environments). Tweak, add, or remove rows to map environments on the trusted project to environments on this project.
6. Select **Add**.

### Remove a Vercel project

1. On the project that grants access, go to **Settings** > **Deployment Protection**.
2. In **Trusted Sources** > **Vercel Projects**, open the menu for the project and select **Remove**.
3. Confirm the removal.

The removed project can no longer reach this project's protected deployments.

## External Services

The **External Services** subgroup covers any non-Vercel workload that signs OIDC tokens with its own issuer. For each service, you tell Vercel three things:

1. The provider's **issuer URL**, for example `https://token.actions.githubusercontent.com`. Vercel uses the issuer to discover the JWKS endpoint for token verification.
2. The **workload identity** that the token must prove. Every entry must include `aud`, plus at least one identity claim that scopes the workload (such as `repository` for GitHub Actions). The exact identity claims depend on the issuer.
3. The **environments** on this project the rule allows the caller to reach.

On every incoming request, Vercel verifies the token's signature against the issuer's JWKS, checks every claim you configured against the token, and confirms the deployment's environment is allowed by the rule.

### Supported providers

The dashboard ships with templates that prefill the issuer URL and the identity claims you can scope on. Each template links to the provider's OIDC documentation so you can find the right values for your workload.

| Provider | Issuer URL | Identity claims (at least one of) |
| --- | --- | --- |
| GitHub Actions | `https://token.actions.githubusercontent.com` | `repository`, `repository_id`, `repository_owner`, `repository_owner_id`, or `sub` |
| Vercel OIDC (external team) | `https://oidc.vercel.com` | `owner_id` (always required), plus `project_id` or `sub` |
| GitLab CI | `https://gitlab.com` | `project_path`, `project_id`, `namespace_path`, `namespace_id`, or `sub` |
| Bitbucket Pipelines | `https://api.bitbucket.org/2.0/workspaces/<workspace>/pipelines-config/identity/oidc` | `workspaceUuid`, `repositoryUuid`, or `sub` |
| Custom provider | Your issuer URL | `sub` |

`aud` is required for every provider. For known providers, you also need at least one of the identity claims listed above. Custom providers fall back to requiring `sub`.

The **Vercel OIDC (external team)** template is for calls from a Vercel project in a different team. Calls from a project in the same team belong in **Vercel Projects**.

The **GitLab CI** template only matches the hosted `https://gitlab.com` issuer. For self-hosted GitLab, use **Custom provider** with your instance's issuer URL.

### Add a GitHub Actions service

For GitHub, the dashboard offers a guided form so you don't write claims by hand:

1. Go to **Settings** and select [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings).
2. In **Trusted Sources** > **External Services**, select **Add**, then choose **GitHub Actions**.
3. Pick a **GitHub account**. If you don't see yours, select **Add GitHub account** to install the Vercel app.
4. Optionally pick a **Repository** to narrow the rule to one repo. Leave empty to allow any repo in the selected account.
5. Optionally enter a **Branch name** (for example `main`) to narrow to one branch.
6. Optionally enter a **GitHub Actions environment** to narrow to jobs running with that environment.
7. Under **Applies to environments**, pick which environments on this project the workflow can reach.
8. Select **Add**.

The audience is auto-set to `https://github.com/<account>`, which is what GitHub Actions sends when your workflow calls `getIDToken()` without an argument. If your workflow passes a custom audience to `getIDToken()`, expand **Use a custom audience** and enter the value you pass.

### Add another external service

For GitLab, Bitbucket, Vercel OIDC, or any custom OIDC provider, fill in the claims directly:

1. Open **Settings** > **Deployment Protection**, then in **Trusted Sources** > **External Services** select **Add**.
2. Choose a provider template, or pick **Custom provider** to enter your own issuer.
3. Confirm or edit the **Issuer URL**. The Bitbucket template includes a `<workspace>` placeholder you must replace.
4. Optionally, add a note that describes the workload.
5. Under **Workload identity**, fill in `aud` plus at least one of the identity claims for that provider. Each value field accepts a comma-separated list of accepted values, so you can list multiple acceptable subjects in one rule.
6. Under **Applies to environments**, select which environments on this project the rule allows the service to reach.
7. Select **Add**.

For GitHub Actions, you can switch to this raw form with **Edit raw claims** if you need to match on a claim the guided form doesn't expose, such as `actor` or `workflow_ref`.

> **⚠️ Warning:** Every claim you configure must match exactly. Claims you don't list are not checked, so a missing claim is the same as accepting any value for it. Scope on `repository` (GitHub), `project_path` (GitLab), or `workspaceUuid` (Bitbucket) at minimum, and add `ref` or `environment` if you also want to lock to a specific branch or environment.

To allow the same provider to reach different environments with different claims, for example a production audience and a preview audience, add one entry per environment.

### How claim matching works

Each claim you configure has a comma-separated list of accepted values. A token passes the claim check when, for every claim you list:

- The claim is present on the token.
- One of the token's values for that claim is in your accepted list.

Token values can be strings or arrays. For an array value such as `aud`, the match succeeds if any item in the array is in your list.

Claim names you don't configure are not checked. Configure every claim you want to enforce.

### Attach the OIDC token from your code

The external service must attach its OIDC token to each outgoing request in the `x-vercel-trusted-oidc-idp-token` header.

#### GitHub Actions

```yaml filename=".github/workflows/e2e.yml"
jobs:
  e2e:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
    steps:
      - uses: actions/github-script@v7
        id: token
        with:
          script: |
            const token = await core.getIDToken();
            core.setSecret(token);
            core.setOutput('token', token);
      - run: |
          curl -sSf https://protected-project.vercel.app/api/data \
            -H "x-vercel-trusted-oidc-idp-token: ${{ steps.token.outputs.token }}"
```

Calling `getIDToken()` without an argument uses the default audience `https://github.com/<org>`, which matches the audience the guided form configures. If you pass a custom audience, configure the same value under **Use a custom audience** in the dashboard.

#### GitLab CI

```yaml filename=".gitlab-ci.yml"
e2e:
  id_tokens:
    VERCEL_OIDC_TOKEN:
      aud: https://gitlab.com
  script:
    - >
      curl -sSf https://protected-project.vercel.app/api/data
      -H "x-vercel-trusted-oidc-idp-token: $VERCEL_OIDC_TOKEN"
```

#### Bitbucket Pipelines

```yaml filename="bitbucket-pipelines.yml"
pipelines:
  default:
    - step:
        oidc: true
        script:
          - >
            curl -sSf https://protected-project.vercel.app/api/data
            -H "x-vercel-trusted-oidc-idp-token: $BITBUCKET_STEP_OIDC_TOKEN"
```

> **⚠️ Warning:** Bitbucket only publishes the OIDC discovery document after Pipelines OIDC is enabled in the workspace and at least one pipeline has run. If Vercel can't fetch the discovery document when you add the trusted source, run a pipeline once and try again.

#### Other providers

Any provider that follows the OpenID Connect Discovery 1.0 spec works. Vercel reads the issuer's `/.well-known/openid-configuration` document to find its JWKS endpoint. See your provider's OIDC documentation for how to fetch a token and what audience to request.

### Remove an external service

1. On the project that grants access, go to **Settings** > **Deployment Protection**.
2. In **Trusted Sources** > **External Services**, open the menu for the entry and select **Remove**.
3. Confirm the removal.

The external service can no longer reach this project's protected deployments.

## Related resources

- [Vercel OIDC](/docs/oidc)
- [Methods to protect deployments](/docs/security/deployment-protection/methods-to-protect-deployments)
- [Methods to bypass Deployment Protection](/docs/security/deployment-protection/methods-to-bypass-deployment-protection)


---

[View full sitemap](/docs/sitemap)
