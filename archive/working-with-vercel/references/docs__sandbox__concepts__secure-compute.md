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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/concepts/secure-compute.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "58f77cd853b53d0b123ae681eadc88b9505c974255436436e7e908204f535902"
---

# Using Secure Compute with Sandbox

Attaching a Vercel Sandbox to a [Secure Compute](/docs/networking/secure-compute) network allows you to route its traffic through your team's dedicated network. Its public-internet traffic then exits through the network's static IPs, which allows it to reach private resources in your own VPC over [VPC peering](/docs/networking/secure-compute#vpc-peering). To learn how Secure Compute networks work, see the [Secure Compute docs](/docs/networking/secure-compute).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Sandbox now supports Secure Compute](https://vercel.com/changelog/vercel-sandbox-now-supports-secure-compute)
- [Private enterprise agents on Vercel](https://vercel.com/kb/guide/private-enterprise-agents-vercel) — Design private enterprise agents that call internal APIs and databases with Vercel Functions, Secure Compute, AI Gateway
- [Vercel Sandbox vs Upstash Box](https://vercel.com/kb/guide/vercel-sandbox-vs-upstash-box) — Compare Vercel Sandbox and Upstash Box as AI agent sandboxes, including isolation, persistence, network controls, SDKs,
- [Sandbox security model](https://vercel.com/docs/sandbox/concepts/security) — Understand the Vercel Sandbox security model: microVM isolation, hardware side channels, resource limits, network access
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Create a sandbox and run code](https://vercel.com/docs/sandbox/examples/create-a-sandbox-and-run-code) — Create a Vercel Sandbox, write a file into it, run the file, and inspect the command output in TypeScript, Python, or th
- [Vercel Sandbox SDK](https://vercel.com/docs/sandbox/sdk) — Use the Vercel Sandbox SDK for JavaScript, TypeScript, and Python, or the Sandbox CLI, to create and manage isolated Lin
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/sandbox/concepts/secure-compute.graph.md](/docs/sandbox/concepts/secure-compute.graph.md)
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

    result = await box.run_command(
        "curl",
        ["-s", "https://checkip.amazonaws.com/"],
        capture_output=True,
    )

    print(result.stdout.decode().strip())  # One of the network's static IPs


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

You can also attach an existing sandbox to a network, or switch it to another network, by updating it. Unlike setting the network at creation, the change takes effect on the sandbox's next session: a running session keeps its existing network until it stops. Update the network, then stop the sandbox to apply it.

On a persistent sandbox (the default), the next SDK call auto-resumes the sandbox into a new session. Therefore, you don't need to start it explicitly. The command below resumes the sandbox on the new network and prints its network static IP:

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
    result = await box.run_command(
        "curl",
        ["-s", "https://checkip.amazonaws.com/"],
        capture_output=True,
    )

    print(result.stdout.decode().strip())  # Now one of the new network's static IPs


asyncio.run(main())
```

**terminal.sh**

```bash filename="terminal.sh"
sandbox config network-id my-sandbox 3k9x7m2p5q8w1z4n
sandbox stop my-sandbox
sandbox exec my-sandbox -- curl -s https://checkip.amazonaws.com/
```

## Detach a sandbox from a Secure Compute network

When you no longer need the network, detach the sandbox by clearing its network assignment. Detaching works like attaching: the change takes effect on the next session, so stop the sandbox, then resume it.

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
    result = await box.run_command(
        "curl",
        ["-s", "https://checkip.amazonaws.com/"],
        capture_output=True,
    )

    print(result.stdout.decode().strip())  # A Vercel infrastructure IP, not a network static IP


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
