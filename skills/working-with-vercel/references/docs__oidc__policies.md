---
title: OIDC Policies
product: vercel
url: /docs/oidc/policies
canonical_url: "https://vercel.com/docs/oidc/policies"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/oidc
related:
  - /docs/monorepos/remote-caching
  - /docs/monorepos/remote-caching/external-ci-cd
  - /docs/container-registry
  - /docs/container-registry/github-actions
  - /docs/oidc
summary: Let workloads in GitHub Actions and other CI/CD providers exchange their OpenID Connect (OIDC) tokens for short-lived access tokens for Vercel...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/oidc/policies.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "76968613bf3dcc228970eee6f24d2c2c0b6a78e715624d9bfa18d3fa90b978e4"
---

# OIDC Policies

An OIDC policy is a rule on your team that lets a workload, such as a GitHub Actions job, exchange the OpenID Connect (OIDC) token that its provider issues for a short-lived access token for a Vercel built-in app. This approach is known as Workload Identity Federation (WIF). Vercel trusts your provider's identity for the workload, so you don't need to create, store, or rotate a long-lived access token.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Turborepo and Vercel Remote Cache now support OpenID Connect (OIDC)](https://vercel.com/changelog/turborepo-and-remote-cache-now-support-openid-connect-oidc)
- [Trusted Sources](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources) — Let other Vercel projects and external services reach your protected deployments by presenting a verified OIDC token.
- [OIDC Federation Reference](https://vercel.com/docs/oidc/reference) — Review helper libraries to help you connect with your backend and understand the structure of an OIDC token.
- [Manage Sign in with Vercel from the Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard) — Learn how to manage Sign in with Vercel from the Dashboard
- [Create an issuer policy](https://vercel.com/docs/rest-api/kms/create-an-issuer-policy) — POST /v1/kms/issuers/{issuerId}/policies — Attach a policy to a KMS issuer that grants a project's deployments permissio
- [Connect to your own API](https://vercel.com/docs/oidc/api) — Learn how to configure your own API to trust Vercel's OpenID Connect \\(OIDC\\) Identity Provider \\(IdP\\)

Full cross-link map for this page: [/docs/oidc/policies.graph.md](/docs/oidc/policies.graph.md)
<!-- /docsgraph:related -->

You configure OIDC policies in the **OIDC Policies** section of your team's or project's **Settings → Build and Deployment** page.

## Built-in apps

Built-in apps are apps that Vercel provides, such as Turborepo CLI. Each built-in app has its own OIDC policies and grants its own kind of access:

### Turborepo CLI

Read from and write to [Vercel Remote Cache](/docs/monorepos/remote-caching). You can create Turborepo CLI policies for your team.

See [Use Remote Caching from External CI/CD](/docs/monorepos/remote-caching/external-ci-cd#openid-connect-oidc).

### Vercel Container Registry

Publish images to and pull images from [Vercel Container Registry (VCR)](/docs/container-registry). You choose **Read** access to pull images, or **Read and write** access to pull and push them. You can create VCR policies for your team or for a project.

See [Push Images from GitHub Actions](/docs/container-registry/github-actions).

> **💡 Note:** Built-in apps differ from custom apps, the Vercel Apps that you create, for
> example for Sign in with Vercel. See [Custom apps](/docs/oidc#custom-apps-sign-in-with-vercel).

## How the exchange works

1. Your workload requests an OIDC token from its provider.
2. Your workload sends the OIDC token to Vercel's token endpoint, together with the built-in app's client ID and your team ID or slug.
3. Vercel verifies the token's signature against the issuer's published keys, and matches the token's claims against your team's policies for that built-in app.
4. When exactly one policy matches, Vercel returns a short-lived access token for that built-in app. The token only grants what the policy allows, and only on the projects in the policy's scope.

Vercel attributes the resources you create and the actions you take with the access token to the built-in app on your team, rather than to a team member. The token keeps working when people leave your team.

## Match workloads to a policy

Each policy names an issuer and the claims that a token from that issuer must present. When you create a policy, you can choose one of these providers, which fill in the issuer and suggest claims:

- Vercel CI
- GitHub Actions
- GitLab CI
- Bitbucket Pipelines
- Vercel OIDC (external team), for [Vercel OIDC tokens](/docs/oidc/access-other-services) issued to Vercel deployments
- Custom provider, for any other issuer. You enter its issuer URL and the claims to match.

Every policy must match the `aud` (audience) claim, plus at least one claim that identifies the workload, such as `repository` for GitHub Actions. Match as narrowly as you can, for example on a specific repository, workflow, or branch, so that only the workloads you intend can exchange tokens.

### Use more than one policy

When your team has more than one policy for a built-in app, Vercel matches the token against each of them. If more than one policy matches, the exchange fails with `Multiple OIDC policies matched.` To fix this, narrow your policies' claims so that only one matches, or pass the ID of the policy you want in the `policy_id` parameter.

## Exchange a token

The GitHub Actions for each built-in app exchange the token for you. With any other provider, request an OIDC token from the provider with the audience your policy expects, then send it to Vercel's token endpoint. Store the access token in a variable rather than printing it, so that it doesn't appear in your CI/CD logs. Each built-in app's guide shows the variable that app reads, such as `TURBO_TOKEN` for Turborepo CLI:

```bash filename="exchange-oidc-token.sh"
# $OIDC_TOKEN: the OIDC token issued by your CI/CD provider
# $CLIENT_ID: the client ID of the built-in app
# $TEAM: your Vercel team ID or slug

export ACCESS_TOKEN=$(curl -sS -f -X POST https://api.vercel.com/login/oauth/token \
  --data "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
  --data "client_id=$CLIENT_ID" \
  --data "subject_token_type=urn:ietf:params:oauth:token-type:id_token" \
  --data "requested_token_type=urn:ietf:params:oauth:token-type:access_token" \
  --data-urlencode "team_id_or_slug=$TEAM" \
  --data-urlencode "subject_token=$OIDC_TOKEN" \
  | jq -r '.access_token')
```

The request uses the [OAuth 2.0 Token Exchange (RFC 8693)](https://datatracker.ietf.org/doc/html/rfc8693) grant, with the following parameters:

| Parameter              | Value                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `grant_type`           | `urn:ietf:params:oauth:grant-type:token-exchange`                                  |
| `client_id`            | The client ID of the built-in app. See the table below.                            |
| `subject_token_type`   | `urn:ietf:params:oauth:token-type:id_token`                                        |
| `subject_token`        | The OIDC token from your provider                                                  |
| `requested_token_type` | `urn:ietf:params:oauth:token-type:access_token`                                    |
| `team_id_or_slug`      | Your team ID or slug                                                               |
| `policy_id`            | Optional. The ID of the policy to use, when more than one policy could match.      |

Use the client ID of the built-in app you want a token for:

| Built-in app              | Client ID                              |
| ------------------------- | -------------------------------------- |
| Turborepo CLI             | `cl_kyUx2zVvA4MGptBohkmtYHJly2XltXzD` |
| Vercel Container Registry | `cl_inrfNy8noLlhRrGbPEm0z47woXNcJVZ0` |

Each built-in app's guide shows how to use the access token, for example as the `docker login` password for Vercel Container Registry.

## Troubleshooting

| Error                                          | Cause and fix                                                                                                                                                                  |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Not authorized.`                              | No policy for this built-in app matched the token, or Vercel couldn't verify the token's signature. Check that your policy's issuer, audience, and claims match the token.   |
| `Multiple OIDC policies matched.`              | See [Use more than one policy](#use-more-than-one-policy).                                                                                                                     |
| `Invalid subject_token: could not decode JWT.` | The `subject_token` isn't a JSON Web Token (JWT). Send the OIDC token itself, not a response that wraps it.                                                                   |
| `Subject token is missing the iss claim.`      | The token doesn't name its issuer. Request the token from a provider that sets the `iss` claim.                                                                                |

## More resources

- [OpenID Connect (OIDC) Federation](/docs/oidc)
- [Custom apps](/docs/oidc#custom-apps-sign-in-with-vercel)

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
