---
title: Box Mount
product: vercel
url: /docs/sandbox/ecosystem/box-mount
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/box-mount"
last_updated: 2026-09-23
type: how-to
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/ai-gateway
summary: Run a contract review in Vercel Sandbox with Box files and sync the review back to Box.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/box-mount.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b4b9707783418c902cfb9e0634e3ce8905d7a97504742175dc3946d20f811eae"
---

# Box Mount

[Box Mount](https://developer.box.com/guides/box-mount) syncs a Box folder with
a directory in a [Vercel Sandbox](/docs/sandbox). Your agent reads and writes
files at that directory. Box Mount syncs those changes to Box while the sandbox
runs.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to give agents persistent storage with Vercel Drives](https://vercel.com/kb/guide/persistent-storage-with-vercel-drives) — Give AI SDK and TanStack AI agents persistent storage with Vercel Drives so they can save and reuse research notes acros
- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Using private GitHub repositories with Vercel Sandbox](https://vercel.com/kb/guide/sandbox-private-github-repositories) — Learn how to use Vercel Sandbox with private GitHub repositories using fine-grained tokens, classic tokens, or GitHub Ap
- [Mount remote storage](https://vercel.com/docs/sandbox/mount-remote-storage) — Mount an external object store such as Amazon S3 into a Vercel Sandbox with a FUSE driver, so code reads and writes remo
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat
- [vercel sandbox](https://vercel.com/docs/cli/sandbox) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y

Full cross-link map for this page: [/docs/sandbox/ecosystem/box-mount.graph.md](/docs/sandbox/ecosystem/box-mount.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Box Mount is in private preview. [Request access from Box](https://bit.ly/box-mount-preview)
> to get the Linux binary.

## Run the contract review example

The [Vercel Box Mount example](https://github.com/vercel-labs/vercel-box-mount)
reviews a synthetic contract with [AI Gateway](/docs/ai-gateway) inside a
sandbox. It writes `Reviewed/Acme-MSA-review.md` to the Box folder and checks
that the file is still there after the sandbox is deleted.

Before you start, get a Box developer token with file read and write access,
create an empty Box folder, and note its folder ID. You also need the Box Mount
0.5.0 Linux x86\_64 archive, an AI Gateway API key, and a Vercel project with
Sandbox access. The example requires Node.js 20 or later.

Clone the example and copy its Vercel configuration template:

```bash
git clone https://github.com/vercel-labs/vercel-box-mount.git
cd vercel-box-mount
npm ci
cp .env.vercel.example .env
```

Set `AI_GATEWAY_API_KEY`, `BOX_ACCESS_TOKEN`, `BOX_FOLDER_ID`, and
`BOX_MOUNT_ARCHIVE` in `.env`. The archive value is the absolute path to the
downloaded Box Mount file. Set `VERCEL_TOKEN`, `VERCEL_TEAM_ID`, and
`VERCEL_PROJECT_ID` for your Vercel project, or use `VERCEL_OIDC_TOKEN`.
The template already selects Vercel Sandbox. Keep `.env` and the archive out
of git. The [example setup guide](https://github.com/vercel-labs/vercel-box-mount/blob/main/docs/vercel-setup.md)
has the full configuration and recovery steps.

Run the example:

```bash
npm run doctor
npm run seed
npm run demo
npm run status
npm run teardown
```

`doctor` checks the setup and verifies that the agent user cannot read the
Box credentials. `seed` uploads the synthetic contract and playbook to the
empty Box folder. `demo` creates the review in the sandbox and syncs it to
Box. `status` shows the running sandbox. Check the review in Box, then run
`teardown` before the example's 30-minute session ends. Teardown unmounts
the folder, verifies the review in Box, and removes the sandbox.

If sync or unmount fails, follow the [recovery steps](https://github.com/vercel-labs/vercel-box-mount/blob/main/docs/vercel-setup.md#lifecycle-and-credentials)
before stopping the sandbox. Stopping it first can discard files that have
not reached Box.

## Before using Box Mount in your own agent

The example runs Box Mount and the agent as separate sandbox users. Box Mount
holds the Box credentials; the agent can access the shared folder. Read the
[implementation](https://github.com/vercel-labs/vercel-box-mount/blob/main/src/vercel.ts)
and [Box's setup guide](https://developer.box.com/guides/box-mount) before
adapting the mount to another workload.

Box developer tokens expire after 60 minutes and cannot be refreshed. Box
Mount also has [preview workload and file-save limits](https://developer.box.com/guides/box-mount/#known-limitations).
Check those limits before using tools that replace files through an atomic
rename.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
