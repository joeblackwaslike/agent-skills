---
title: Push Images from GitHub Actions
product: vercel
url: /docs/container-registry/github-actions
canonical_url: "https://vercel.com/docs/container-registry/github-actions"
last_updated: 2018-10-20
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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "8032a8c64f4ec489b538325c429786dc3e8c6c94857eebcea3ee8274e48f0120"
---

# Push Images from GitHub Actions

Push images to Vercel Container Registry (VCR) from GitHub Actions without storing long-lived credentials. The [`vercel/vcr-action/login`](https://github.com/vercel/vcr-action/tree/main/login) action exchanges the GitHub Actions OpenID Connect (OIDC) token for a short-lived Vercel access token and logs in Docker, Podman, or Buildah, so there are no secrets to rotate. You then build and push with your own commands. When the job completes, a post step logs out and revokes the token.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to migrate from GHCR to Vercel Container Registry](https://vercel.com/kb/guide/migrate-ghcr-to-vcr?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fgithub-actions&source_site=vercel-docs&relationship=related) — Migrate container images from GitHub Container Registry \\(GHCR\\) to Vercel Container Registry \\(VCR\\), including authent
- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fgithub-actions&source_site=vercel-docs&relationship=related) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [Introducing VCR: Vercel Container Registry](https://vercel.com/changelog/introducing-vcr-vercel-container-registry?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fgithub-actions&source_site=vercel-docs&relationship=related)
- [Manage Vercel Container Registry with Vercel CLI](https://vercel.com/changelog/manage-vercel-container-registry-with-vercel-cli?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fgithub-actions&source_site=vercel-docs&relationship=related)
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fgithub-actions&source_site=vercel-docs&relationship=related) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [GitHub Actions](https://turborepo.dev/docs/guides/ci-vendors/github-actions?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fgithub-actions&source_site=vercel-docs&relationship=related) — Configure GitHub Actions workflows to run Turborepo tasks with Remote Caching.
- [How can I use the Vercel CLI for custom workflows?](https://vercel.com/kb/guide/using-vercel-cli-for-custom-workflows?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fgithub-actions&source_site=vercel-docs&relationship=related) — You can use the Vercel CLI to deploy any application, including custom git providers and restricted source code.
- [Use Remote Caching from External CI/CD](https://vercel.com/docs/monorepos/remote-caching/external-ci-cd?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fgithub-actions&source_site=vercel-docs&relationship=related) — Authenticate the Turborepo CLI to Vercel Remote Cache from your CI/CD provider using OpenID Connect \\(OIDC\\) or a Person
- [Push an image manifest](https://vercel.com/docs/rest-api/vcr/push-an-image-manifest?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fgithub-actions&source_site=vercel-docs&relationship=related) — PUT /v2/{teamSlug}/{projectSlug}/{repositoryName}/manifests/{reference} — PUT /v2/:teamSlug/:projectSlug/:repositoryName
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fgithub-actions&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/container-registry/github-actions.graph.md](/docs/container-registry/github-actions.graph.md?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fgithub-actions&source_site=vercel-docs&relationship=graph)
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
