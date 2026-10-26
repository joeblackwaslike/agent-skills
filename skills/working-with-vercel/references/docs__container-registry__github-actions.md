---
title: Push Images from GitHub Actions
product: vercel
url: /docs/container-registry/github-actions
canonical_url: "https://vercel.com/docs/container-registry/github-actions"
last_updated: 2026-09-04
type: how-to
prerequisites:
  - /docs/container-registry
related:
  - /docs/sandbox/concepts/images
  - /docs/functions/container-images
  - /docs/container-registry/cli-reference
summary: Authenticate GitHub Actions with Vercel Container Registry using OIDC, then build and push images with your container tool.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry/github-actions.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "886fdeacd04a05b796e19388ae797c76b4d823804c3be77ae942f1718fccc8a7"
---

# Push Images from GitHub Actions

Push images to Vercel Container Registry (VCR) from GitHub Actions without storing long-lived credentials. The [`vercel/vcr-action/login`](https://github.com/vercel/vcr-action/tree/main/login) action exchanges the GitHub Actions OpenID Connect (OIDC) token for a short-lived Vercel access token and logs in Docker, Podman, or Buildah, so there are no secrets to rotate. You then build and push with your own commands. When the job completes, a post step logs out and revokes the token.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Push images to Vercel Container Registry from GitHub Actions](https://vercel.com/changelog/vcr-login-github-action)
- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [How to migrate from GHCR to Vercel Container Registry](https://vercel.com/kb/guide/migrate-ghcr-to-vcr) — Migrate container images from GitHub Container Registry \\(GHCR\\) to Vercel Container Registry \\(VCR\\), including authent
- [Introducing VCR: Vercel Container Registry](https://vercel.com/changelog/introducing-vcr-vercel-container-registry)
- [Manage Vercel Container Registry with Vercel CLI](https://vercel.com/changelog/manage-vercel-container-registry-with-vercel-cli)
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [GitHub Actions](https://turborepo.dev/docs/guides/ci-vendors/github-actions) — Configure GitHub Actions workflows to run Turborepo tasks with Remote Caching.
- [Getting Started](https://vercel.com/docs/container-registry/getting-started) — Authenticate your container tool with Vercel Container Registry, then push and pull your first image with the Vercel CLI
- [Deploying with BYOC from GitHub Actions](https://vercel.com/docs/networking/bring-your-own-cloud/deploy-with-github-actions) — Keep the Vercel Git integration and use GitHub Actions to build, provision, and complete Bring Your Own Cloud \\(BYOC\\) d
- [Use Remote Caching from External CI/CD](https://vercel.com/docs/monorepos/remote-caching/external-ci-cd) — Authenticate the Turborepo CLI to Vercel Remote Cache from your CI/CD provider using OpenID Connect \\(OIDC\\) or a Person
- [Push an image manifest](https://vercel.com/docs/rest-api/vcr/push-an-image-manifest) — PUT /v2/{teamSlug}/{projectSlug}/{repositoryName}/manifests/{reference} — PUT /v2/:teamSlug/:projectSlug/:repositoryName

Full cross-link map for this page: [/docs/container-registry/github-actions.graph.md](/docs/container-registry/github-actions.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

- [Create an OIDC policy](/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbuild-and-deployment%3FaddOidcPolicy%3Dvcr\&title=Add+a+VCR+OIDC+Policy) on your Vercel team that grants read-write access to Vercel Container Registry.
- Store your Vercel team ID (`team_...`) as a repository variable, for example `VERCEL_TEAM_ID`.
- Give the workflow or job the `id-token: write` permission.

## Log in and push

This example pushes directly from BuildKit with zstd compression, which is the recommended format for VCR images. The repository is created on the first push:

```yaml filename=".github/workflows/push-to-vcr.yml"
name: Push to VCR

on:
  push:
    branches: [main]

permissions:
  contents: read
  id-token: write

jobs:
  push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5

      - uses: docker/setup-buildx-action@v3

      - name: Log in to VCR
        uses: vercel/vcr-action/login@v1
        with:
          team: ${{ vars.VERCEL_TEAM_ID }}

      - name: Build and push
        uses: docker/build-push-action@v6
        with:
          context: .
          platforms: linux/amd64
          provenance: false
          tags: vcr.vercel.com/team-slug/project-name/my-app:latest
          outputs: type=image,push=true,oci-mediatypes=true,compression=zstd,compression-level=3,force-compression=true
```

You can also push with plain `docker build` and `docker push` after the login step. See the [action reference](https://github.com/vercel/vcr-action/tree/main/login#readme) for all inputs and outputs.

## Log in with Podman or Buildah

The `engines` input selects which container tools to authenticate. It accepts `docker` (the default), `podman`, and `buildah`, in any combination:

```yaml filename=".github/workflows/push-to-vcr.yml"
- name: Log in to VCR
  uses: vercel/vcr-action/login@v1
  with:
    team: ${{ vars.VERCEL_TEAM_ID }}
    engines: podman

- name: Build and push
  run: |
    podman build --platform linux/amd64 -t "$IMAGE" .
    podman push "$IMAGE"
  env:
    IMAGE: vcr.vercel.com/team-slug/project-name/my-app:latest
```

## How it works

1. The action requests a GitHub OIDC token from the runner and exchanges it with Vercel for a short-lived access token scoped to your team. The exchange only succeeds when your team has an OIDC policy that matches the repository and workflow.
2. The action logs in to `vcr.vercel.com` with the token. The username is your team ID.
3. When the job completes, a post step logs out and revokes the token, even if a later step fails.

## Next steps

- [Use the image with Vercel Sandbox](/docs/sandbox/concepts/images#custom-images)
- [Use the image with Vercel Functions](/docs/functions/container-images#usage)
- [Manage repositories with the Vercel CLI](/docs/container-registry/cli-reference)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
