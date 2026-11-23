---
title: Stream a Vercel Sandbox Desktop to Your Browser
product: vercel
url: /docs/sandbox/examples/desktop-streaming
canonical_url: "https://vercel.com/docs/sandbox/examples/desktop-streaming"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/examples
  - /docs/sandbox
related:
  - /docs/sandbox/sdk/cli
  - /docs/sandbox/pricing
  - /docs/sandbox/concepts/images
  - /docs/sandbox/examples/install-system-packages
  - /docs/sandbox/quickstart
summary: Stream the desktop of a Vercel Sandbox to your browser with screen-relay, and control its applications from your browser or from an agent.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/examples/desktop-streaming.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "eaeeecffb9ef68cd7eca541acfb9be0b535d26edb8694f6be613c0c9a84646d5"
---

# Stream a Vercel Sandbox Desktop to Your Browser

A sandbox can run graphical applications such as a browser, an image editor, or Blender, but it has no screen. [screen-relay](https://github.com/vercel-labs/screen-relay), an open-source tool from Vercel Labs, gives it one. It starts a Linux desktop inside the sandbox, streams that desktop to your browser as live video, and sends your mouse and keyboard input back to the sandbox.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Running OpenClaw in Vercel Sandbox](https://vercel.com/kb/guide/running-openclaw-in-vercel-sandbox) — This guide walks you through setting up OpenClaw inside a Vercel Sandbox and configuring the WhatsApp channel.
- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [Running commands in a Vercel Sandbox](https://vercel.com/docs/sandbox/examples/run-commands-in-sandbox) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [Run isolated AI agents in one sandbox](https://vercel.com/docs/sandbox/concepts/multi-agent) — Give each AI agent an isolated Linux user in a Vercel Sandbox with the JS and Python SDKs, then share files between agen
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Monitor your sandbox](https://vercel.com/docs/sandbox/examples/monitor-your-sandbox) — Track running Vercel Sandboxes in the dashboard, list them from the CLI, and monitor compute usage.

Full cross-link map for this page: [/docs/sandbox/examples/desktop-streaming.graph.md](/docs/sandbox/examples/desktop-streaming.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

- The [Sandbox CLI](/docs/sandbox/sdk/cli#installation) 4.12.0 or newer, signed in to your Vercel account. To install it and sign in, run `npm install -g sandbox`, then `sandbox login`. The CLI needs Node.js and npm.
- A current version of Chrome, Edge, or Safari to open the viewer.

[Sandbox pricing and limits](/docs/sandbox/pricing) apply while the desktop runs.

## Start a desktop

Create a sandbox from screen-relay's public image and start the desktop in it. You can paste these commands as they are:

```bash filename="Terminal"
sandbox create --name desktop --timeout 30m -p 8080 \
  --image vercel-labs/screen-relay/sandbox-desktop:0.1.3
sandbox exec desktop -- screen-relay up -d --public $(sandbox domain desktop 8080)
```

The second command prints a viewer link:

```text filename="Terminal"
https://your_sandbox_domain.vercel.run/#token=your_token
```

Open the full link in your browser. You see the sandbox's desktop and control it with your mouse and keyboard.

> **💡 Note:** Anyone with a session's viewer link can view and control its desktop. Keep
> viewer links and tokens out of recordings, repositories, and model-visible
> messages.

The desktop starts in a few seconds, because the image has screen-relay and its desktop installed. Any Vercel team can create sandboxes from this [public image](/docs/sandbox/concepts/images#use-a-public-image), and its tag, `0.1.3`, is the screen-relay version it contains.

The viewer opens with control, so your mouse and keyboard work right away. To hand input to an agent while you watch, select the control button at the top of the viewer and choose **Release control**. Choose **Take control** to use your mouse and keyboard again.

## Open an application

`screen-relay run` starts a program on the sandbox's desktop. Each example below installs an application with the image's package manager, as in [Install system packages](/docs/sandbox/examples/install-system-packages), and opens it. You can paste the commands as they are.

The screen-relay image doesn't include the package lists that `apt-get install` needs, so update them once first:

```bash filename="Terminal"
sandbox exec --sudo desktop -- apt-get update
```

### Browser

```bash filename="Terminal"
sandbox exec --sudo desktop -- curl -fsSLo /root/chrome.deb \
  https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sandbox exec --sudo desktop -- apt-get install -y /root/chrome.deb
sandbox exec desktop -- screen-relay run -- google-chrome --no-first-run https://vercel.com
```

A Chrome window opens on the desktop and loads the Vercel homepage. `--no-first-run` skips the dialog that Chrome shows on first launch. The package downloads to `/root`, not `/tmp`, so a restricted user in a shared sandbox can't replace it before it's installed.

### Image editor

```bash filename="Terminal"
sandbox exec --sudo desktop -- apt-get install -y gimp
sandbox exec desktop -- screen-relay run -- gimp
```

GIMP opens with its welcome dialog.

### Blender

```bash filename="Terminal"
sandbox exec --sudo desktop -- apt-get install -y blender
sandbox exec desktop -- screen-relay run -- blender
```

Blender opens with its splash screen. It draws and renders on the sandbox's CPUs.

### Game

```bash filename="Terminal"
sandbox exec --sudo desktop -- apt-get install -y chocolate-doom freedoom
sandbox exec desktop -- screen-relay run -- /usr/games/chocolate-doom \
  -iwad /usr/share/games/doom/freedoom1.wad -window -nosound
```

Freedoom opens in a window. screen-relay streams video only, so the game runs without sound.

To open any other program, install it and start it with `sandbox exec desktop -- screen-relay run -- your_program`.

## Let an agent control the desktop

Ask an agent that can run terminal commands, such as Claude Code, to use the desktop by describing the task:

```text filename="Prompt"
Use screen-relay in my sandbox named desktop to open a terminal and run `echo hello`.
```

The viewer has control when it opens, so the agent's commands return `busy` until you choose **Release control**. The viewer then stays open, and you watch the agent work. screen-relay's [CLI reference](https://screen-relay.dev/docs/cli) lists the commands an agent can run.

## Start a desktop from the Sandbox SDK

To start the desktop from your own code, use the Sandbox SDK in place of the two CLI commands. You need a project with the [Sandbox SDK](/docs/sandbox/quickstart) installed, on Node.js 22 or newer for TypeScript, or Python 3.11 or newer for Python.

**index.ts**

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.getOrCreate({
  name: 'desktop',
  image: 'vercel-labs/screen-relay/sandbox-desktop:0.1.3',
  ports: [8080],
  timeout: 30 * 60 * 1000,
});

const result = await sandbox.runCommand({
  cmd: 'screen-relay',
  args: ['up', '-d', '--public', sandbox.domain(8080)],
});
if (result.exitCode !== 0) {
  throw new Error('screen-relay did not start. Run `screen-relay status` in the sandbox.');
}

// The viewer link, token included.
console.log((await result.stdout()).trim());
```

**main.py**

```py filename="main.py"
import asyncio

from vercel import sandbox


async def main() -> None:
    box, _ = await sandbox.get_or_create_sandbox(
        name="desktop",
        image="vercel-labs/screen-relay/sandbox-desktop:0.1.3",
        ports=[8080],
        execution_time_limit=30 * 60,
    )
    url = next(route.url for route in box.routes if route.port == 8080)

    result = await box.run_command(
        "screen-relay",
        ["up", "-d", "--public", url],
        capture_output=True,
        check=True,
    )

    # The viewer link, token included.
    print(result.stdout.decode().strip())


asyncio.run(main())
```

The script prints the viewer link, token included. Run it in your own terminal, not where output is stored or shared, such as CI logs. If the script fails, run `sandbox exec desktop -- screen-relay status` to see whether the desktop is already running, and `screen-relay logs` to see why it didn't start. To start the desktop again after the sandbox stops, run the script again.

The CLI commands in this guide also work on a sandbox that the script created. Run them from the same project directory as your script, so that both use the same Vercel project. The Python SDK doesn't need Node.js, but the Sandbox CLI does.

## Start from another image

The screen-relay image is built on the Node.js 24 [Vercel Managed Image](/docs/sandbox/concepts/images#vercel-managed-images). To use the default image or your own, install screen-relay when you start the desktop:

```bash filename="Terminal"
sandbox create --name desktop --timeout 30m -p 8080
sandbox exec desktop -- npm install -g screen-relay
sandbox exec desktop -- screen-relay up -d --yes --public $(sandbox domain desktop 8080)
```

The first start then takes from about a minute to several minutes, because `screen-relay up` installs a virtual screen, the XFCE desktop, and the libraries its streaming engine needs, then builds the engine. `--yes` lets it install without asking for confirmation. Later starts take a few seconds.

The engine uses the x264 video encoder. The copy prebuilt in the screen-relay image is distributed under GPL-3.0, and screen-relay's own source is Apache-2.0. See the [license section of screen-relay's README](https://github.com/vercel-labs/screen-relay#license).

## Stream the desktop into Claude, ChatGPT, and other apps

You can show the live desktop inside a conversation in a chat app such as Claude or ChatGPT. This uses [MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview), an extension to the Model Context Protocol (MCP) that lets a tool show an interactive interface inside the chat. Check that your chat app [supports MCP Apps](https://modelcontextprotocol.io/extensions/client-matrix).

The [screen-relay MCP Apps example](https://github.com/vercel-labs/screen-relay/tree/main/examples/mcp-app) is a prototype that you can start from, and its README covers the setup. By default, the viewer in the chat can watch the desktop but not send input.

## Stop the desktop

```bash filename="Terminal"
sandbox exec desktop -- screen-relay down
sandbox stop desktop
```

Sandboxes are [persistent](/docs/sandbox/concepts/persistent-sandboxes) by default, so the applications you installed stay in place after a stop. For other ways to stop a sandbox, see [Stop a sandbox](/docs/sandbox/examples/stop-a-sandbox).

### Start the desktop again

```bash filename="Terminal"
sandbox exec desktop -- true
sandbox exec desktop -- screen-relay up -d --public $(sandbox domain desktop 8080)
```

The first command [resumes the same sandbox](/docs/sandbox/examples/resume-a-long-lived-sandbox) in a new session. The second starts the desktop and prints a new viewer link.

### Remove the sandbox

Stopping saves the sandbox's files as a snapshot, which counts toward [Snapshot Storage](/docs/sandbox/pricing#snapshot-storage). To delete the sandbox and that snapshot when you're done, run:

```bash filename="Terminal"
sandbox rm desktop --delete-orphan-snapshots
```

Without `--delete-orphan-snapshots`, `sandbox rm` deletes the sandbox and keeps its snapshot until the snapshot expires. To delete a sandbox from the dashboard or the SDK, see [Delete a sandbox](/docs/sandbox/examples/delete-a-sandbox).

## Limits

- screen-relay streams video only, with no audio. The clipboard carries text only.
- One viewer or agent controls input at a time.
- A desktop has one token and no separate user identities. To replace an exposed token, stop the desktop and start it again.

## Troubleshoot the desktop

| Symptom                                                       | What to check                                                                                                                                                                    |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The viewer does not connect                                   | Port `8080` is published, `--public` matches the sandbox's URL, and you opened the full link with its token.                                                                     |
| The viewer shows `WebCodecs unavailable in this browser`      | Use a current version of Chrome, Edge, or Safari. The viewer needs the browser's H.264 WebCodecs support.                                                                        |
| Input returns `busy`                                          | The viewer has control, or another controller holds input. Choose **Release control** in the viewer or close its tab, then retry.                                                |
| `apt-get install` reports `Unable to locate package`          | The screen-relay image has no package lists. Run `sandbox exec --sudo desktop -- apt-get update`, then retry.                                                                    |
| An application does not appear                                | Start it with `screen-relay run` so it uses the desktop's display.                                                                                                               |
| The desktop stopped or failed                                 | Run `screen-relay status` and `screen-relay logs` in the sandbox.                                                                                                                |
| `screen-relay up` reports that the session is already running | The desktop is still running. Use the viewer link you have, or stop the desktop and start it again to print a link. The SDK script reports this as `screen-relay did not start`. |
| `sandbox domain` reports `Not a valid subcommand name`        | Your Sandbox CLI is older than 4.12.0. Update it with `npm install -g sandbox`.                                                                                                  |
| `sandbox domain` reports no running session                   | The sandbox is stopped. Run `sandbox exec desktop -- true` to resume it, then retry.                                                                                             |
| `sandbox create` reports that the name already exists         | A stopped sandbox keeps its name. [Start the desktop again](#start-the-desktop-again), or [remove the sandbox](#remove-the-sandbox).                                             |

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
