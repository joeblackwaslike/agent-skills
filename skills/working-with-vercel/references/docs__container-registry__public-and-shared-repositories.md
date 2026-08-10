---
title: Public and Shared Repositories
product: vercel
url: /docs/container-registry/public-and-shared-repositories
canonical_url: "https://vercel.com/docs/container-registry/public-and-shared-repositories"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/container-registry
related:
  - /docs/container-registry/cli-reference
  - /docs/sandbox/concepts/images
summary: Learn about public and shared repositories on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry/public-and-shared-repositories.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "25fd87ee0a544808b7e9d2ab3290d90d0c52ae2f5b8cc023f0c22f69249fb7cd"
---

# Public and Shared Repositories

Vercel Container Registry (VCR) repositories are private by default. Share a repository with specific Vercel teams, or make it public so any Vercel team can pull its images.

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
docker pull vcr.vercel.com/team-slug/project-slug/my-repository:latest
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
