---
title: Software Factories on Vercel
product: vercel
url: /docs/agent-resources/software-factory
canonical_url: "https://vercel.com/docs/agent-resources/software-factory"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/agent-resources
related:
  - /docs/ai-gateway
  - /docs/sandbox
  - /docs/agent-resources/software-factory/ai-sdk
  - /docs/agent-resources/software-factory/eve
  - /docs/agent-resources/software-factory/mastra
summary: Build repeatable agent workflows that investigate issues, test changes, and prepare pull requests for human review.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/software-factory.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "86dcdc5d0f37bd12233ff8463be20daf23b3e12d6cfa3eac0c4372e4ed70f383"
---

# Software Factories on Vercel

Software factories organize AI agents into repeatable development workflows that turn work items into changes ready for review. The workflow defines how agents investigate a request, implement a change, check the result, and hand decisions back to people.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [How to build a durable AI code agent on Vercel](https://vercel.com/kb/guide/how-to-build-a-durable-ai-code-agent-on-vercel) — Build an AI agent that generates code, writes its own tests, and executes them in an isolated microVM with automatic ret
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [You can just ship agents](https://vercel.com/blog/you-can-just-ship-agents)
- [eve on Vercel](https://vercel.com/docs/frameworks/agents/eve) — Create and deploy an eve agent on Vercel with AI Gateway model access, durable sessions, and authenticated requests.
- [Flue with Vercel](https://vercel.com/docs/frameworks/agents/flue) — Create a Flue agent that uses Vercel AI Gateway for model requests, then add Vercel Sandbox for isolated code execution.

Full cross-link map for this page: [/docs/agent-resources/software-factory.graph.md](/docs/agent-resources/software-factory.graph.md)
<!-- /docsgraph:related -->

### Work Intake

Start with a repository, a work item, and acceptance criteria. Investigation can return a finding or a clarification instead of a code change.

[Define the work](/docs/agent-resources/software-factory#how-work-moves-through-a-factory)

### Orchestration

Coordinate investigation, implementation, and review with AI SDK, eve, Mastra, or Flue. Preserve progress with the implementation’s supported durability model.

[Choose an implementation](/docs/agent-resources/software-factory#choose-an-implementation)

### AI Gateway

Route the agents’ model requests through AI Gateway. Configure model access and provider fallbacks in one place.

[Configure AI Gateway](/docs/ai-gateway)

### Sandbox

Run repository commands and checks in an isolated Vercel Sandbox. Keep publishing credentials in the application that calls GitHub.

[Run code in Sandbox](/docs/sandbox)

### GitHub Access

Use GitHub Tools for repository operations and Vercel Connect for credentials. The application authorizes writes before publishing.

[Connect to GitHub](/docs/agent-resources/software-factory#give-the-factory-github-access)

### Human Review

Bring the diff and check results to a person who can approve, request changes, or stop. Tie approval to the reviewed commit.

[Preserve review evidence](/docs/agent-resources/software-factory#preserve-progress-and-review-evidence)

## Why use a software factory

Writing code is one part of delivering a change. Someone also has to establish whether a reported problem exists, decide what should change, run checks, and review the result. As work accumulates, managing those steps can become a bottleneck even when agents handle implementation.

Software factories automate the handoffs between these activities. Each stage produces a result the next stage can use, so a reviewer receives the original request, the proposed change, and evidence from checks together. The [AI SDK team's software factory](/blog/building-a-software-factory-for-ai-sdk) applies this approach to work such as bug fixes, documentation updates, and backports.

## When a software factory is a good fit

Software factories fit work with a repeatable process and an outcome your team can evaluate. Examples include:

- Investigating bug reports with reproducible failures and regression tests.
- Implementing well-defined changes that follow established repository conventions.
- Preparing maintenance changes, such as backports, for review.

The useful starting point is a workflow your team already understands. Clear acceptance criteria, reliable checks, and people who can review the output give the factory a basis for deciding whether work should advance.

Exploratory work still needs close human direction. If a request leaves product behavior or a public API undecided, the factory needs a clarification or approval step. Automating implementation before resolving those questions can produce changes that pass tests but solve the wrong problem.

## How work moves through a factory

The stages depend on the repository and the work it receives. The following sequence illustrates how a factory can carry evidence from a request to a reviewable change:

| Stage          | Question it answers                                                                   | Result for the next stage                               |
| -------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Intake         | What is being requested, and is there enough information to investigate?              | Defined work or a request for clarification.            |
| Investigation  | Does the repository support the reported problem or requested change?                 | Findings and acceptance criteria.                       |
| Implementation | What code change satisfies those criteria?                                            | Code changes and check results on a branch.             |
| Review         | Does the actual diff meet the criteria without introducing unacceptable consequences? | Findings, requested revisions, or approval to hand off. |
| Human decision | Is this change appropriate to release?                                                | The decision to merge, revise, or stop.                 |

For example, an issue might claim that an API accepts invalid input. Investigation can reproduce the failure before implementation starts. If the API already rejects that input, the workflow can return its findings without changing code. Asking for clarification or stopping an unsupported request are useful outcomes alongside producing a pull request.

## Where human judgment belongs

The team defines which actions a factory may take and which require a person. Those rules can permit an agent to prepare a branch while reserving changes to public behavior or release decisions for human approval.

Independent review gives the reviewer a separate opportunity to inspect the code and its evidence. The review stage needs the actual diff and acceptance criteria, rather than relying on the implementation agent's account of its work. People still judge whether the requested behavior belongs in the product and whether the evidence supports shipping it.

Running a factory also means maintaining its checks and agent instructions. Recurring failures can reveal missing context, unreliable checks, or work that needs a different approval rule.

## Choose an implementation

Use the framework that fits your application's execution and hosting requirements:

| Framework | Starting point |
| --- | --- |
| [AI SDK](/docs/agent-resources/software-factory/ai-sdk) | Compose tool loops and repository checks, then add durable orchestration with Vercel Workflows. |
| [eve](/docs/agent-resources/software-factory/eve) | Customize Foreman's existing intake, investigation, implementation, and review pipeline. |
| [Mastra](/docs/agent-resources/software-factory/mastra) | Connect agents with typed workflow stages and persist suspended runs in remote storage. |
| [Flue](/docs/agent-resources/software-factory/flue) | Run agents with Vercel Sandbox and AI Gateway on a host that maintains conversation ownership. |

Each implementation works toward the same result: an issue becomes a tested change on a branch, with a draft pull request and evidence for a reviewer. A factory can also stop with a clarification request or a finding that no change is needed.

## Give the factory GitHub access

[GitHub Tools](https://github-tools.com/) is Vercel's open-source library for exposing GitHub operations to agents. Use it to read issues and diffs, inspect checks, and prepare pull requests. Its [AI SDK tools](https://github-tools.com/frameworks/ai-sdk) work directly in AI SDK agents. The eve, Mastra, and Flue guides show explicit adapters for a read operation using each runtime's tool interface.

Separate the capabilities each stage receives. An investigator needs repository and issue reads. An implementer needs an isolated working tree. Publishing a branch or draft pull request needs write credentials and an authorization decision. A tool preset selects operations; it doesn't restrict which repositories a credential can access. Likewise, `context` supplies default arguments rather than an access policy.

Use a [GitHub connector](https://vercel.com/connect/github) to manage credentials, then follow the [GitHub Tools Connect setup](https://github-tools.com/guide/vercel-connect) to attach it to your project. Limit the GitHub App installation to the intended repositories and grant the permissions required by each stage. Keep credentials in the application that calls GitHub; don't include them in prompts or give publishing credentials to repository code running in a sandbox.

GitHub Tools' AI SDK write tools request approval by default, but the application must handle those requests. Calling a tool's `execute` function directly doesn't enforce that approval metadata. When adapting a write operation to another runtime, implement its authorization and approval flow before executing the operation.

## Preserve progress and review evidence

Store a run's repository, issue number, base commit, branch, current stage, and check results outside the function's local filesystem. Use [Vercel Workflows](/docs/workflows) or the framework's supported durable execution path for interruptions and approval waits. Keep repository files in a [Sandbox](/docs/sandbox); use [Drives](/docs/sandbox/concepts/drives) when files must survive sandbox replacement.

Before publishing, collect the actual diff, commands and exit codes, and any checks that couldn't run. Tie approval to the reviewed commit so subsequent edits require another review. On a retry, look for an existing branch or pull request for the run before creating another. Durable execution can replay an interrupted operation; it doesn't make every GitHub write idempotent.

## Explore software factory implementations

These resources put the concepts into practice:

**Creating a Software Factory**: Take the Academy course to build a factory that investigates requests and pauses for human decisions. [Learn more →](/academy/creating-a-software-factory)

**Build a software factory with eve**: Follow the Foreman walkthrough for template setup, work intake, and the agent pipeline. [Learn more →](/kb/guide/eve-software-factory)

**Give your software factory a browser**: Extend Foreman to reproduce UI bugs and inspect fixes on preview deployments with a person present. [Learn more →](/kb/guide/software-factory-browser)

**Manage Vercel projects with a software factory**: Add deployment context through Vercel MCP to investigate failed builds and runtime errors. [Learn more →](/kb/guide/software-factory-vercel-mcp)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
