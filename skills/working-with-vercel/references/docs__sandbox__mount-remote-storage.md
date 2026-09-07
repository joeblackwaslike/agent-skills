---
title: Mount remote storage
product: vercel
url: /docs/sandbox/mount-remote-storage
canonical_url: "https://vercel.com/docs/sandbox/mount-remote-storage"
last_updated: 2026-08-25
type: how-to
prerequisites:
  - /docs/sandbox
related:
  - /docs/sandbox/concepts/drives
  - /docs/sandbox/concepts/runtimes
  - /docs/sandbox/concepts/firewall
  - /docs/sandbox/sdk-reference
  - /docs/oidc/aws
summary: Mount an external object store such as Amazon S3 into a Vercel Sandbox with a FUSE driver, so code reads and writes remote files through the local...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/mount-remote-storage.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "62db36158b38a04f7ad3adde266656ab5d6ec4fa9598f588526ba45dadb6eba3"
---

# Mount remote storage

Mount an external object store such as Amazon S3 into a sandbox and work with remote files as if they were local. Code in the sandbox reads and writes objects through a normal filesystem path instead of calling a storage API directly.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox now supports FUSE-based filesystems](https://vercel.com/changelog/vercel-sandbox-now-supports-fuse-based-filesystems?from=related&source_path=%2Fdocs%2Fsandbox%2Fmount-remote-storage&source_site=vercel-docs&relationship=related)
- [The Complete Guide to Vercel Drives](https://vercel.com/kb/guide/vercel-drives?from=related&source_path=%2Fdocs%2Fsandbox%2Fmount-remote-storage&source_site=vercel-docs&relationship=related) — Learn how Vercel Drives provide persistent storage for Vercel Sandboxes, and how to create, mount, list, and delete a dr
- [Using private GitHub repositories with Vercel Sandbox](https://vercel.com/kb/guide/sandbox-private-github-repositories?from=related&source_path=%2Fdocs%2Fsandbox%2Fmount-remote-storage&source_site=vercel-docs&relationship=related) — Learn how to use Vercel Sandbox with private GitHub repositories using fine-grained tokens, classic tokens, or GitHub Ap
- [Run Docker containers inside Vercel Sandbox](https://vercel.com/changelog/run-docker-containers-inside-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fmount-remote-storage&source_site=vercel-docs&relationship=related)
- [How to install system packages in Vercel Sandbox](https://vercel.com/kb/guide/how-to-install-system-packages-in-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fmount-remote-storage&source_site=vercel-docs&relationship=related) — Learn how to install additional system packages in Vercel Sandbox with apt-get on the default Ubuntu-based managed image
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fmount-remote-storage&source_site=vercel-docs&relationship=related) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related&source_path=%2Fdocs%2Fsandbox%2Fmount-remote-storage&source_site=vercel-docs&relationship=related) — Learn how to run your first code in a Vercel Sandbox.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fmount-remote-storage&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/sandbox/mount-remote-storage.graph.md](/docs/sandbox/mount-remote-storage.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fmount-remote-storage&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Vercel Sandbox supports FUSE (Filesystem in Userspace) drivers, which back the mount. Use a FUSE mount when you need to share large datasets across sandboxes, persist files to an external provider, or hand agents and tools a filesystem interface over object storage.

> **💡 Note:** For persistent storage managed by Vercel, see [Drives](/docs/sandbox/concepts/drives). Use a FUSE mount when your data must live in an external provider such as S3.

## How mounting works

A FUSE driver exposes remote object storage as a directory inside the sandbox. Reads and writes to that directory are translated into calls against the remote store. Because FUSE runs as a [system-privileged process](/docs/sandbox/concepts/runtimes#system-privileged-processes), the install and mount commands run with `sudo`.

Outbound access from the mount still follows the sandbox [firewall network policy](/docs/sandbox/concepts/firewall). If you run untrusted code, restrict reachable destinations with a network policy.

## Mount an Amazon S3 bucket

This example uses Mountpoint for Amazon S3, the official FUSE driver for S3. Download and install the `mount-s3` package, create a mount directory, then mount the bucket:

**TypeScript**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create();

try {
  // Refresh the package index. The sandbox starts without one.
  await sandbox.runCommand({
    sudo: true,
    cmd: 'apt-get',
    args: ['update'],
  });

  // apt-get cannot install from a URL, so download the package first.
  await sandbox.runCommand({
    cmd: 'curl',
    args: [
      '-sL',
      '-o',
      '/tmp/mount-s3.deb',
      'https://s3.amazonaws.com/mountpoint-s3-release/latest/x86_64/mount-s3.deb',
    ],
  });

  // Install Mountpoint for Amazon S3. It pulls in its own FUSE dependency.
  await sandbox.runCommand({
    sudo: true,
    cmd: 'apt-get',
    args: ['install', '-y', '/tmp/mount-s3.deb'],
  });

  const MOUNT_DIR = '/mnt/s3';

  await sandbox.runCommand({
    sudo: true,
    cmd: 'mkdir',
    args: ['-p', MOUNT_DIR],
  });

  // Mount the bucket. Pass AWS credentials only to the mount-s3 command.
  await sandbox.runCommand({
    sudo: true,
    cmd: 'mount-s3',
    args: [process.env.S3_BUCKET_NAME, MOUNT_DIR, '--allow-other'],
    env: {
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      AWS_SESSION_TOKEN: process.env.AWS_SESSION_TOKEN,
      AWS_REGION: process.env.AWS_REGION,
    },
  });

  // List the files in your bucket to confirm the mount.
  await sandbox.runCommand({
    cmd: 'ls',
    args: ['-la', MOUNT_DIR],
    stdout: process.stdout,
  });
} finally {
  await sandbox.stop();
}
```

**Python**

```python filename="main.py"
import asyncio
import os

from vercel import sandbox

async def main() -> None:
    async with sandbox.create_sandbox() as box:
        # Refresh the package index. The sandbox starts without one.
        await box.run_process("apt-get", ["update"], sudo=True, check=True)

        # apt-get cannot install from a URL, so download the package first.
        await box.run_process(
            "curl",
            [
                "-sL",
                "-o",
                "/tmp/mount-s3.deb",
                "https://s3.amazonaws.com/mountpoint-s3-release/latest/x86_64/mount-s3.deb",
            ],
            check=True,
        )

        # Install Mountpoint for Amazon S3. It pulls in its own FUSE dependency.
        await box.run_process(
            "apt-get",
            ["install", "-y", "/tmp/mount-s3.deb"],
            sudo=True,
            check=True,
        )

        mount_dir = "/mnt/s3"
        await box.run_process("mkdir", ["-p", mount_dir], sudo=True, check=True)

        await box.run_process(
            "mount-s3",
            [os.environ["S3_BUCKET_NAME"], mount_dir, "--allow-other"],
            sudo=True,
            env={
                "AWS_ACCESS_KEY_ID": os.environ["AWS_ACCESS_KEY_ID"],
                "AWS_SECRET_ACCESS_KEY": os.environ["AWS_SECRET_ACCESS_KEY"],
                "AWS_SESSION_TOKEN": os.environ["AWS_SESSION_TOKEN"],
                "AWS_REGION": os.environ["AWS_REGION"],
            },
            check=True,
        )

        result = await box.run_process(
            "ls", ["-la", mount_dir], capture_output=True, check=True
        )
        print(result.stdout)


asyncio.run(main())
```

After the mount succeeds, `ls -la /mnt/s3` prints the objects in your bucket. Any command in the sandbox can now read from and write to `/mnt/s3`.

> **💡 Note:** Passing credentials to `mount-s3` exposes them inside the sandbox for the life of the process. Use a narrowly scoped, short-lived IAM role that grants access only to the bucket and actions you need, and prefer temporary credentials (`AWS_SESSION_TOKEN`) over long-lived keys. To keep AWS credentials out of the sandbox altogether, see [Mount an S3 bucket without exposing credentials](#mount-an-s3-bucket-without-exposing-credentials).

### Mount an S3 bucket without exposing credentials

The mount used above passes AWS credentials into the sandbox, where any process can read them. When the sandbox runs untrusted code, or when multiple tenants share one bucket split by key prefix, you do not want credentials in the sandbox at all.

You can keep them out by combining the mount with [requests proxying](/docs/sandbox/concepts/firewall#requests-proxying). The sandbox sends unsigned S3 requests, the firewall forwards them to a Vercel Function you control, and the function authorizes each request and signs it with [Signature Version 4](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_sigv4.html) before it reaches S3. AWS credentials exist only inside the function which decides what each sandbox can access.

#### Create the signing proxy

The proxy uses [`defineSandboxProxy`](/docs/sandbox/sdk-reference#definesandboxproxy) to verify that each request comes from one of your sandboxes, and [OIDC federation](/docs/oidc/aws) to obtain AWS credentials, so it stores no static keys. Because the firewall appends the original request path and query string to the `forwardURL`, implement the proxy as a catch-all route. Deploy it in a project where `AWS_ROLE_ARN` points to an IAM role with access to your bucket:

```ts filename="app/api/s3-proxy/[...key]/route.ts"
import { Sha256 } from '@aws-crypto/sha256-js';
import { SignatureV4 } from '@smithy/signature-v4';
import { awsCredentialsProvider } from '@vercel/oidc-aws-credentials-provider';
import { defineSandboxProxy } from '@vercel/sandbox/proxy';

const signer = new SignatureV4({
  service: 's3',
  region: process.env.AWS_REGION!,
  credentials: awsCredentialsProvider({
    roleArn: process.env.AWS_ROLE_ARN!,
    // The role's trust policy must allow this audience.
    // See /docs/oidc/aws#custom-audience.
    audience: 'sts.amazonaws.com',
  }),
  sha256: Sha256,
  // Unlike other AWS services, S3 paths must not be escaped again
  // when signing.
  uriEscapePath: false,
});

const handler = defineSandboxProxy(async (request, meta) => {
  // The request is already re-targeted at the original S3 URL.
  const url = new URL(request.url);

  // Authorize before signing. With path-style requests the path is
  // /<bucket>/<key>, so you can restrict each sandbox to its own key
  // prefix, for example one derived from meta.sandboxId.

  // Sign only headers that carry client intent. Forwarding the whole
  // incoming header set breaks SigV4 validation, because infrastructure
  // adds headers along the way that are not part of the signature.
  const SIGNED_PASSTHROUGH = [
    'content-type',
    'content-md5',
    'range',
    'if-match',
    'if-none-match',
    'if-modified-since',
    'if-unmodified-since',
  ];
  const headers: Record<string, string> = {
    host: url.host,
    'x-amz-content-sha256': 'UNSIGNED-PAYLOAD',
  };
  for (const [key, value] of request.headers) {
    if (key.startsWith('x-amz-') || SIGNED_PASSTHROUGH.includes(key)) {
      headers[key] = value;
    }
  }

  const body =
    request.method === 'GET' || request.method === 'HEAD'
      ? undefined
      : new Uint8Array(await request.arrayBuffer());

  const signed = await signer.sign({
    method: request.method,
    protocol: url.protocol,
    hostname: url.hostname,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    headers,
  });

  return fetch(url, {
    method: request.method,
    headers: signed.headers,
    body,
  });
});

// mount-s3 reads objects with GET and HEAD and writes them with PUT,
// POST, and DELETE, so expose the handler under all of them.
export {
  handler as GET,
  handler as HEAD,
  handler as PUT,
  handler as POST,
  handler as DELETE,
};
```

#### Mount through the proxy

Create the sandbox, install Mountpoint while the network is still open, then lock the network policy so S3 traffic flows through your proxy before mounting:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create();

try {
  // Refresh the package index. The sandbox starts without one.
  await sandbox.runCommand({
    sudo: true,
    cmd: 'apt-get',
    args: ['update'],
  });

  // apt-get cannot install from a URL, so download the package first.
  await sandbox.runCommand({
    cmd: 'curl',
    args: [
      '-sL',
      '-o',
      '/tmp/mount-s3.deb',
      'https://s3.amazonaws.com/mountpoint-s3-release/latest/x86_64/mount-s3.deb',
    ],
  });

  // Install Mountpoint for Amazon S3. It pulls in its own FUSE dependency.
  await sandbox.runCommand({
    sudo: true,
    cmd: 'apt-get',
    args: ['install', '-y', '/tmp/mount-s3.deb'],
  });

  const MOUNT_DIR = '/mnt/s3';

  await sandbox.runCommand({
    sudo: true,
    cmd: 'mkdir',
    args: ['-p', MOUNT_DIR],
  });

  // Route all S3 traffic through the signing proxy. No other egress is
  // allowed. Add "*": [] to keep general Internet access for other domains.
  await sandbox.update({
    networkPolicy: {
      allow: {
        's3.amazonaws.com': [
          { forwardURL: 'https://my-project.vercel.app/api/s3-proxy' },
        ],
      },
    },
  });

  // Mount without credentials. --no-sign-request skips signing in the
  // sandbox, and --force-path-style keeps the request host on
  // s3.amazonaws.com so it matches the domain rule above.
  await sandbox.runCommand({
    sudo: true,
    cmd: 'mount-s3',
    args: [
      process.env.S3_BUCKET_NAME,
      MOUNT_DIR,
      '--allow-other',
      '--no-sign-request',
      '--force-path-style',
      '--endpoint-url',
      'https://s3.amazonaws.com',
    ],
  });

  // List the files in your bucket to confirm the mount.
  await sandbox.runCommand({
    cmd: 'ls',
    args: ['-la', MOUNT_DIR],
    stdout: process.stdout,
  });
} finally {
  await sandbox.stop();
}
```

The sandbox never receives AWS credentials, and every request to the bucket passes through your function. Since the proxy example forwards each request unchanged, add your own authorization checks in the handler before signing. For example, restrict each sandbox to its own key prefix.

## Mount other providers

Mountpoint is specific to S3, but the same pattern works with any FUSE driver. Install the driver with your image's package manager, create a mount directory, then run the driver's mount command with `sudo`. On the default Ubuntu-based [managed images](/docs/sandbox/concepts/images), refresh the package index with `apt-get update` before installing. Legacy Amazon Linux runtimes use `dnf` instead. The same approach covers other object stores, network filesystems, and custom mounts, so a sandbox can persist files to more than one storage provider in a single session.


---

[View full sitemap](/docs/sitemap)
