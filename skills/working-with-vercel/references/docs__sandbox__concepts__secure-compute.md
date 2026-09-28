---
title: Using Secure Compute with Sandbox
product: vercel
url: /docs/sandbox/concepts/secure-compute
canonical_url: "https://vercel.com/docs/sandbox/concepts/secure-compute"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/networking/secure-compute
  - /docs/sandbox/cli-reference
  - /docs/sandbox/sdk-reference
  - /docs/sandbox/python-sdk-reference
summary: You can attach a Vercel Sandbox to a Secure Compute network to send its public-internet traffic through static IPs and reach your own VPC over VPC...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/secure-compute.md"
fetched_at: "2026-09-28T10:45:21.491Z"
sha256: "3f82c67d0f7d63a71585a4a30e8fae4e64e56f3a8f7ab32ac87190f8af20bb68"
---

# Using Secure Compute with Sandbox

Attaching a Vercel Sandbox to a [Secure Compute](/docs/networking/secure-compute) network allows you to route its traffic through your team's dedicated network. Its public-internet traffic then exits through the network's static IPs, which allows it to reach private resources in your own VPC over [VPC peering](/docs/networking/secure-compute#vpc-peering). To learn how Secure Compute networks work, see the [Secure Compute docs](/docs/networking/secure-compute).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [A sandbox without a network boundary is only half a sandbox](https://vercel.com/blog/a-sandbox-without-a-network-boundary-is-only-half-a-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsecure-compute&source_site=vercel-docs&relationship=related)
- [Advanced egress firewall filtering for Vercel Sandbox](https://vercel.com/changelog/advanced-egress-firewall-filtering-for-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsecure-compute&source_site=vercel-docs&relationship=related)
- [Using private GitHub repositories with Vercel Sandbox](https://vercel.com/kb/guide/sandbox-private-github-repositories?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsecure-compute&source_site=vercel-docs&relationship=related) — Learn how to use Vercel Sandbox with private GitHub repositories using fine-grained tokens, classic tokens, or GitHub Ap
- [Run untrusted code with Vercel Sandbox, now generally available](https://vercel.com/blog/vercel-sandbox-is-now-generally-available?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsecure-compute&source_site=vercel-docs&relationship=related)
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsecure-compute&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Working with Sandbox](https://vercel.com/docs/sandbox/working-with-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsecure-compute&source_site=vercel-docs&relationship=related) — Task-oriented examples for common Vercel Sandbox operations in TypeScript and Python.
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsecure-compute&source_site=vercel-docs&relationship=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Networking](https://vercel.com/docs/networking?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsecure-compute&source_site=vercel-docs&relationship=related) — Connect your Vercel projects to backend services with static IPs and secure networking options.
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsecure-compute&source_site=vercel-docs&relationship=related) — Learn how to run your first code in a Vercel Sandbox.

Full cross-link map for this page: [/docs/sandbox/concepts/secure-compute.graph.md](/docs/sandbox/concepts/secure-compute.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fconcepts%2Fsecure-compute&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

- The [Sandbox CLI](/docs/sandbox/cli-reference#sandbox-login), the [JavaScript SDK](/docs/sandbox/sdk-reference#prerequisites), or the [Python SDK](/docs/sandbox/python-sdk-reference) installed and authenticated.
- An existing Secure Compute network. If your team doesn't have one, [create a network](/docs/networking/secure-compute#enabling-secure-compute) first.

## Attach a sandbox at creation to a network

To attach a sandbox to a Secure Compute network as you create it, supply the network's **Network ID**. To find your ID, from your Vercel dashboard, go to your team's **Settings** >**Networking** section. Then select [**Networking**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fnetworking\&title=Go+to+Networking), and select the network you want to use. The **Network ID** appears in the top-left corner of the page, below the network name.

The sandbox starts attached to the selected network. To confirm the sandbox's public-internet traffic exits through it, run a command that queries a public IP echo service, which reports the network static IP that the request came from:

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  name: 'my-sandbox',
  networkId: '3k9x7m2p5q8w1z4n',
});

const result = await sandbox.runCommand({
  cmd: 'curl',
  args: ['-s', 'https://checkip.amazonaws.com/'],
});

console.log((await result.stdout()).trim()); // One of the network's static IPs
```

**main.py**

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.create_sandbox(
        name="my-sandbox",
        network_id="3k9x7m2p5q8w1z4n",
    )

    result = await box.run_process(
        "curl",
        ["-s", "https://checkip.amazonaws.com/"],
        capture_output=True,
    )

    print(result.stdout.strip())  # One of the network's static IPs


asyncio.run(main())
```

**terminal.sh**

```bash filename="terminal.sh"
sandbox create --name my-sandbox --network-id 3k9x7m2p5q8w1z4n
sandbox exec my-sandbox -- curl -s https://checkip.amazonaws.com/
```

> **💡 Note:** If you omit `name` or `--name`, Vercel generates a sandbox name. Save that name before using `Sandbox.get()`, `get_sandbox()`, `sandbox config`, `sandbox stop`, or `sandbox exec` in a later operation.

The printed address is one of the network's two static IPs, listed in the network's detail page in [**Settings** > **Networking**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fnetworking\&title=Go+to+Networking). Seeing one of those IPs confirms the sandbox is attached to the Secure Compute network.

## Attach or change the network for an existing sandbox

You can also attach an existing sandbox to a network, or switch it to another network, with `update`. Unlike setting `networkId` at creation, the change takes effect on the sandbox's next session: a running session keeps its existing network until it stops. Update the network, then stop the sandbox to apply it.

On a persistent sandbox (the default), the next SDK call auto-resumes the sandbox into a new session. Therefore, you don't need to start it explicitly. The `runCommand` or `run_process` call below resumes the sandbox on the new network and prints its network static IP:

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.get({ name: 'my-sandbox' });
await sandbox.update({ networkId: '3k9x7m2p5q8w1z4n' });
await sandbox.stop();

// The next command auto-resumes the sandbox into a new session with the new network
const result = await sandbox.runCommand({
  cmd: 'curl',
  args: ['-s', 'https://checkip.amazonaws.com/'],
});

console.log((await result.stdout()).trim()); // Now one of the new network's static IPs
```

**main.py**

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    await box.update(network_id="3k9x7m2p5q8w1z4n")
    await box.stop()

    # The next command auto-resumes the sandbox into a new session with the new network
    result = await box.run_process(
        "curl",
        ["-s", "https://checkip.amazonaws.com/"],
        capture_output=True,
    )

    print(result.stdout.strip())  # Now one of the new network's static IPs


asyncio.run(main())
```

**terminal.sh**

```bash filename="terminal.sh"
sandbox config network-id my-sandbox 3k9x7m2p5q8w1z4n
sandbox stop my-sandbox
sandbox exec my-sandbox -- curl -s https://checkip.amazonaws.com/
```

## Detach a sandbox from a Secure Compute network

When you no longer need the network, detach the sandbox by clearing its network assignment (`null` in TypeScript, `None` in Python, `none` in the CLI). Detaching works like attaching: the change takes effect on the next session, so stop the sandbox, then resume it.

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.get({ name: 'my-sandbox' });
await sandbox.update({ networkId: null });
await sandbox.stop();

// The next command auto-resumes the sandbox without the Secure Compute network
const result = await sandbox.runCommand({
  cmd: 'curl',
  args: ['-s', 'https://checkip.amazonaws.com/'],
});

console.log((await result.stdout()).trim()); // A Vercel infrastructure IP, not a network static IP
```

**main.py**

```python filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box = await sandbox.get_sandbox(name="my-sandbox")
    await box.update(network_id=None)
    await box.stop()

    # The next command auto-resumes the sandbox without the Secure Compute network
    result = await box.run_process(
        "curl",
        ["-s", "https://checkip.amazonaws.com/"],
        capture_output=True,
    )

    print(result.stdout.strip())  # A Vercel infrastructure IP, not a network static IP


asyncio.run(main())
```

**terminal.sh**

```bash filename="terminal.sh"
sandbox config network-id my-sandbox none
sandbox stop my-sandbox
sandbox exec my-sandbox -- curl -s https://checkip.amazonaws.com/
```

After detaching, the printed address is a Vercel infrastructure IP instead of one of the network's static IPs, confirming the sandbox is no longer attached to the Secure Compute network.

## Pricing

When a sandbox is attached to Secure Compute, traffic that leaves the private network via the public internet is billed as [Private Data Transfer](/docs/networking/secure-compute#pricing).

Traffic sent over VPC peering with your AWS environment does not incur data transfer charges.

See [Secure Compute pricing](/docs/networking/secure-compute#pricing) for current rates and usage monitoring.


---

[View full sitemap](/docs/sitemap)
