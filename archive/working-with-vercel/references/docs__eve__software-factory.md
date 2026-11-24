---
title: How Software Factories Work
product: vercel
url: /docs/eve/software-factory
canonical_url: "https://vercel.com/docs/eve/software-factory"
last_updated: 2026-09-14
type: conceptual
prerequisites:
  - /docs/eve
related:
  - /docs/eve
  - /docs/eve/concepts
  - /docs/eve/agent-runs
summary: Understand what software factories are, when to use them, and how eve coordinates agents from work item to reviewed change.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/eve/software-factory.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b0a9e099ebc280674c4dfa8cafb656054a7168a19ab1f9d1071440313158ebc6"
---

# How Software Factories Work

Software factories organize AI agents into repeatable development workflows that turn work items into changes ready for review. The workflow defines how agents investigate a request, implement a change, check the result, and hand decisions back to people. [eve](/docs/eve) provides a framework for coordinating those agents and preserving their progress.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [How to add tools to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-tools) — Add tools to an eve agent by creating a TypeScript file under agent/tools/ with defineTool, and gate sensitive ones on h
- [Draft documentation fixes from reader feedback with Sanity and eve](https://vercel.com/kb/guide/sanity-eve-agent) — Build an autonomous agent that drafts fixes in Sanity, stages them for human review, and calls the model through AI Gate
- [Draft content in your voice from Slack with eve](https://vercel.com/kb/guide/eve-content-agent) — Deploy the eve content agent template, a Slack bot that drafts blog posts, LinkedIn posts, release notes, and newsletter
- [Vercel Workflows](https://vercel.com/docs/workflows) — Build agents and applications that retry failed steps, wait for external events, and resume across crashes and deploymen

Full cross-link map for this page: [/docs/eve/software-factory.graph.md](/docs/eve/software-factory.graph.md)
<!-- /docsgraph:related -->

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

## How eve supports a software factory

[eve's agent project structure](/docs/eve/concepts#agent-project) separates an orchestrator from the agents that perform specific tasks. The orchestrator coordinates work, while [subagents](/docs/eve/concepts#subagents) run with their own instructions, tools, and conversation state.

Several eve capabilities support the workflow:

| Workflow need                      | How eve supports it                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Receive work                       | [Channels](/docs/eve/concepts#channels) connect events and messages to agent sessions.                                           |
| Keep progress across interruptions | [Durable sessions](/docs/eve/concepts#durability) use Vercel Workflows to preserve progress across turns, pauses, and redeploys. |
| Run repository commands            | [Sandboxes](/docs/eve/concepts#sandbox) isolate the environment where agents inspect code and run checks.                        |
| Access external services           | [Connections](/docs/eve/concepts#connections) link agents to services and can use Vercel Connect for delegated credentials.      |
| Inspect a run                      | [Agent Runs](/docs/eve/agent-runs) shows the sessions and tool calls behind an outcome.                                          |

Foreman, the [eve software factory template](/templates/eve/eve-software-factory), is one implementation of this pattern. It routes GitHub and Linear work through classifier, analyst, implementer, and reviewer agents. Its workflow ends with a reviewed draft pull request; a person decides when to mark it ready and merge it.

## Explore software factory implementations

These resources put the concepts into practice:

**Creating a Software Factory**: Take the Academy course to build a factory that investigates requests and pauses for human decisions. [Learn more →](/academy/creating-a-software-factory)

**Build a software factory with eve**: Follow the Foreman walkthrough for template setup, work intake, and the agent pipeline. [Learn more →](/kb/guide/eve-software-factory)

**Give your software factory a browser**: Extend Foreman to reproduce UI bugs and inspect fixes on preview deployments with a person present. [Learn more →](/kb/guide/software-factory-browser)

**Manage Vercel projects with a software factory**: Add deployment context through Vercel MCP to investigate failed builds and runtime errors. [Learn more →](/kb/guide/software-factory-vercel-mcp)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
