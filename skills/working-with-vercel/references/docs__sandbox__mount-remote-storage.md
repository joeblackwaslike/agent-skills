---
title: Mount remote storage
product: vercel
url: /docs/sandbox/mount-remote-storage
canonical_url: "https://vercel.com/docs/sandbox/mount-remote-storage"
last_updated: 2026-07-03
type: how-to
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/drives
  - /docs/sandbox/system-specifications
  - /docs/sandbox/concepts/firewall
summary: Mount an external object store such as Amazon S3 into a Vercel Sandbox with a FUSE driver, so code reads and writes remote files through the local...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/mount-remote-storage.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "a865bb59ffbb47b062911991443b5779edf9d41767e0dc3a197ef8cf54cc1a64"
---

# Mount remote storage

Mount an external object store such as Amazon S3 into a sandbox and work with remote files as if they were local. Code in the sandbox reads and writes objects through a normal filesystem path instead of calling a storage API directly.

Vercel Sandbox supports FUSE (Filesystem in Userspace) drivers, which back the mount. Use a FUSE mount when you need to share large datasets across sandboxes, persist files to an external provider, or hand agents and tools a filesystem interface over object storage.

> **💡 Note:** For persistent storage managed by Vercel, see [Drives](/docs/sandbox/concepts/drives). Use a FUSE mount when your data must live in an external provider such as S3.

## How mounting works

A FUSE driver exposes remote object storage as a directory inside the sandbox. Reads and writes to that directory are translated into calls against the remote store. Because FUSE runs as a [system-privileged process](/docs/sandbox/system-specifications#system-privileged-processes), the install and mount commands run with `sudo`.

Outbound access from the mount still follows the sandbox [firewall network policy](/docs/sandbox/concepts/firewall). If you run untrusted code, restrict reachable destinations with a network policy.

## Mount an Amazon S3 bucket

This example uses Mountpoint for Amazon S3, the official FUSE driver for S3. Install `fuse` and the `mount-s3` release, create a mount directory, then mount the bucket:

After the mount succeeds, `ls -la /mnt/s3` prints the objects in your bucket. Any command in the sandbox can now read from and write to `/mnt/s3`.

> **💡 Note:** Passing credentials to `mount-s3` exposes them inside the sandbox for the life of the process. Use a narrowly scoped, short-lived IAM role that grants access only to the bucket and actions you need, and prefer temporary credentials (`AWS_SESSION_TOKEN`) over long-lived keys.

## Mount other providers

Mountpoint is specific to S3, but the same pattern works with any FUSE driver. Install the driver and its `fuse` dependency with `dnf`, create a mount directory, then run the driver's mount command with `sudo`. This covers other object stores, network filesystems, and custom mounts, so a sandbox can persist files to more than one storage provider in a single session.


---

[View full sitemap](/docs/sitemap)
