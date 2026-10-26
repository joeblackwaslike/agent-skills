---
title: Public and Shared Repositories
product: vercel
url: /docs/container-registry/public-and-shared-repositories
canonical_url: "https://vercel.com/docs/container-registry/public-and-shared-repositories"
last_updated: 2026-09-04
type: how-to
prerequisites:
  - /docs/container-registry
related:
  - /docs/container-registry/cli-reference
  - /docs/sandbox/concepts/images
summary: Share a Vercel Container Registry repository with specific Vercel teams or make it public for any Vercel team to access.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry/public-and-shared-repositories.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "02c81a6a7d7ba7813fca72dc17f9fe4ffd68c29d9e34fecc4539c00dd4ef5ef8"
---

# Public and Shared Repositories

Vercel Container Registry (VCR) repositories are private by default. Share a repository with specific Vercel teams, or make it public so any Vercel team can pull its images.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Container Registry repositories can now be made public](https://vercel.com/changelog/vercel-container-registry-repositories-can-now-be-made-public)
- [Share Vercel Container Registry repositories across teams](https://vercel.com/changelog/share-vercel-container-registry-repositories-across-teams)
- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [vercel vcr](https://vercel.com/docs/cli/vcr) — Manage Vercel Container Registry from the Vercel CLI: build and push images, manage repositories, tags, and images, and
- [List repositories](https://vercel.com/docs/rest-api/vcr/list-repositories) — GET /v1/vcr/repository — List container registry repositories for a project.
- [Create a repository](https://vercel.com/docs/rest-api/vcr/create-a-repository) — POST /v1/vcr/repository — Create a container registry repository for a project.
- [Get a repository image](https://vercel.com/docs/rest-api/vcr/get-a-repository-image) — GET /v1/vcr/repository/{idOrName}/images/{imageIdOrDigest} — Fetch an individual image from a repository, including its
- [Enable or disable Vercel CI for a connected repository](https://vercel.com/docs/rest-api/vercel-ci/enable-or-disable-vercel-ci-for-a-connected-repository) — PATCH /v1/vercel-ci/repository-settings — Update Repository Settings

Full cross-link map for this page: [/docs/container-registry/public-and-shared-repositories.graph.md](/docs/container-registry/public-and-shared-repositories.graph.md)
<!-- /docsgraph:related -->

## Share a repository

Share a repository with other Vercel teams to give them read access to its images. Sharing applies to the whole repository, including all of its tags and images.

Repositories belong to a single project. To use a repository's images from other projects in your team, share the repository with your own team.

To share a repository from your project dashboard:

1. Open [**Images**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fimages\&title=Go+to+Images) in your project dashboard and select the repository.
2. Open the **Settings** tab.
3. Under **Repository Sharing**, enter the team ID or slug of the team you want to share with, then click **Add Team**.

You can share a repository with up to 100 teams. If you need more than that, make the [repository public](#public-repositories). To revoke access, remove the team from the same section.

You can also manage sharing from the CLI with [`vercel vcr permissions`](/docs/container-registry/cli-reference#vercel-vcr-permissions):

```bash filename="terminal"
# Share a repository with a team
vercel vcr permissions my-repository add other-team

# List teams with access
vercel vcr permissions my-repository ls

# Revoke a team's access
vercel vcr permissions my-repository rm other-team
```

Teams with access can pull images and use them in [Vercel Sandbox](/docs/sandbox/concepts/images#use-a-shared-image). They can't push images, delete images, or share the repository with other teams.

A team with access pulls a shared image with its full repository path after authenticating as their own team:

```bash filename="terminal"
docker pull vcr.vercel.com/team-slug/project-name/my-repository:latest
```

## Public repositories

Mark a repository as public to allow any Vercel team to pull and read its images. The visibility applies to the whole repository, including all of its tags and images.

To mark a repository as public or private from your project dashboard:

1. Open [**Images**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fimages\&title=Go+to+Images) in your project dashboard and select the repository.
2. Open the **Settings** tab.
3. Under **Repository Sharing**, toggle the **Public Access** switch and validate the change.

You can also manage visibility from the CLI with [`vercel vcr config`](/docs/container-registry/cli-reference#vercel-vcr-config):

```bash filename="terminal"
# Make a repository public
vercel vcr config my-repository --public true

# Make a repository private
vercel vcr config my-repository --public false
```


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
