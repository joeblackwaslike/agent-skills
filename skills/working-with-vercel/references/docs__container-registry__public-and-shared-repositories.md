---
title: Public and Shared Repositories
product: vercel
url: /docs/container-registry/public-and-shared-repositories
canonical_url: "https://vercel.com/docs/container-registry/public-and-shared-repositories"
last_updated: 2026-08-13
type: how-to
prerequisites:
  - /docs/container-registry
related:
  - /docs/container-registry/cli-reference
  - /docs/sandbox/concepts/images
summary: Share a Vercel Container Registry repository with specific Vercel teams or make it public for any Vercel team to access.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry/public-and-shared-repositories.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "fa32cec74e35960508d1e23d3589d5d10f8ed013750dd6ee1aa30e7cff2d1c9b"
---

# Public and Shared Repositories

Vercel Container Registry (VCR) repositories are private by default. Share a repository with specific Vercel teams, or make it public so any Vercel team can pull its images.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Container Registry repositories can now be made public](https://vercel.com/changelog/vercel-container-registry-repositories-can-now-be-made-public?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fpublic-and-shared-repositories&source_site=vercel-docs&relationship=related)
- [Share Vercel Container Registry repositories across teams](https://vercel.com/changelog/share-vercel-container-registry-repositories-across-teams?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fpublic-and-shared-repositories&source_site=vercel-docs&relationship=related)
- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fpublic-and-shared-repositories&source_site=vercel-docs&relationship=related) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [Manage Vercel Container Registry with Vercel CLI](https://vercel.com/changelog/manage-vercel-container-registry-with-vercel-cli?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fpublic-and-shared-repositories&source_site=vercel-docs&relationship=related)
- [vercel vcr](https://vercel.com/docs/cli/vcr?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fpublic-and-shared-repositories&source_site=vercel-docs&relationship=related) — Manage Vercel Container Registry from the Vercel CLI: build and push images, manage repositories, tags, and images, and
- [List repositories](https://vercel.com/docs/rest-api/vcr/list-repositories?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fpublic-and-shared-repositories&source_site=vercel-docs&relationship=related) — GET /v1/vcr/repository — List container registry repositories for a project.
- [Container Registry limits and pricing](https://vercel.com/docs/container-registry/limits-and-pricing?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fpublic-and-shared-repositories&source_site=vercel-docs&relationship=related) — Storage pricing, size limits, plan limits, and compatibility limits for Vercel Container Registry.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fpublic-and-shared-repositories&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/container-registry/public-and-shared-repositories.graph.md](/docs/container-registry/public-and-shared-repositories.graph.md?from=related&source_path=%2Fdocs%2Fcontainer-registry%2Fpublic-and-shared-repositories&source_site=vercel-docs&relationship=graph)
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
