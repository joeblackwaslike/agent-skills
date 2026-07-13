---
title: Images
product: vercel
url: /docs/sandbox/concepts/images
canonical_url: "https://vercel.com/docs/sandbox/concepts/images"
last_updated: 2026-06-30
type: how-to
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/snapshots
  - /docs/container-registry
summary: Start sandboxes from custom OCI images stored in Vercel Container Registry to ship your own system packages, tooling, and filesystem layout.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/images.md"
fetched_at: "2026-07-13T07:00:47.058Z"
sha256: "74dbcb0fac8f71149456aeb9d34f8b08a3fae3d1d70bd6457ab3ac14226cb7f4"
---

# Images

By default, sandboxes boot from a Vercel base runtime such as `node24` or `python3.13`. These runtimes cover most workloads, and you can [install extra packages](/kb/guide/how-to-install-system-packages-in-vercel-sandbox) at runtime or [snapshot](/docs/sandbox/concepts/snapshots) a sandbox after setup to reuse it later.

Use a custom image when your sandbox needs system packages, language tooling, or a filesystem layout that already exists in a Dockerfile. Sandbox pulls custom images from [Vercel Container Registry (VCR)](/docs/container-registry), a project-scoped registry for OCI images.

## How images work

When you pass an `image` to `Sandbox.create()`, Vercel resolves the reference against VCR for the authenticated project and boots the sandbox from that image's filesystem instead of a base runtime.

VCR only serves an image to Sandbox once it has prepared an optimized `linux/amd64` build. After you push an image, VCR reports a readiness state on the repository details page:

| Status        | Meaning                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------ |
| `Ready`       | VCR prepared the image and Sandbox can use it.                                             |
| `Preparing`   | VCR is preparing a `linux/amd64` image.                                                    |
| `Unoptimized` | The image is pullable from VCR, but it is not `linux/amd64` and cannot be used in Sandbox. |

If `Sandbox.create()` returns `image_not_ready`, retry after preparation finishes.

> **💡 Note:** Vercel Sandbox does not run Docker `ENTRYPOINT` or `CMD` for custom images.
> Start processes with `sandbox.runCommand()` after the sandbox is created.

If the Dockerfile defines `WORKDIR`, new commands start in that directory. Otherwise, commands start from `/`.

## Push an image to VCR

First, [push an OCI image to Vercel Container Registry (VCR)](/docs/container-registry#push-an-image).

The image must include a `linux/amd64` manifest so VCR can prepare an optimized image. If you use Docker, include `linux/amd64` in `--platform` when you build the image before pushing it to VCR:

> **💡 Note:** Vercel recommends zstd compression for images pushed to VCR.

```bash filename="Terminal"
docker buildx build \
  --platform linux/amd64 \
  --output "type=image,name=vcr.vercel.com/team-slug/project-slug/my-repository:latest,push=true,oci-mediatypes=true,compression=zstd,compression-level=3,force-compression=true" \
  .
```

## Create a sandbox from an image

After the image is pushed, create the sandbox with the repository reference for the authenticated project:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  image: 'my-repository:latest',
});

try {
  const result = await sandbox.runCommand('pwd');
  console.log(await result.stdout());
} finally {
  await sandbox.stop();
}
```

## Image references

`image` accepts a repository name, tag, digest, or fully qualified VCR URL:

| Reference                                                        | What it resolves  |
| ---------------------------------------------------------------- | ----------------- |
| `my-repository`                                                  | The `latest` tag  |
| `my-repository:v1`                                               | A specific tag    |
| `my-repository@sha256:...`                                       | A specific digest |
| `vcr.vercel.com/team-slug/project-slug/my-repository`            | The `latest` tag  |
| `vcr.vercel.com/team-slug/project-slug/my-repository:v1`         | A specific tag    |
| `vcr.vercel.com/team-slug/project-slug/my-repository@sha256:...` | A specific digest |


---

[View full sitemap](/docs/sitemap)
