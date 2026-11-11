# Agent workflows

> Use when the diff: Changes prompts, `SKILL.md` files, `AGENTS.md` or `CLAUDE.md`, subagent definitions, hooks, commands or agent orchestration, or was largely written with an AI tool

*Leans on: Gall's Law, Fail Fast, separation of concerns, least privilege, make it work (with evidence).*

Multi-step agent workflows (a lead agent fanning out to subagents, pipelines of model calls and tools, scheduled agent runs) are distributed systems built from non-deterministic parts. Review them like a background-job system, and then some.

- **Simplest thing first.** One agent with good tools often beats an orchestration of five. Each added agent or step needs a reason: real parallelism, a context that would otherwise overflow, or a different tool set or model.
- **Contracts between steps.** Each step's input and output is defined, ideally as a schema, and validated before the next step consumes it. Free-text handoffs are where workflows drift.
- **Self-contained handoffs.** Each subagent or step gets everything it needs in its own prompt; nothing depends on context it can't see.
- **Bounded everything.** Every loop and retry has a limit (turns, iterations, tool calls, wall time, tokens or cost), and hitting one produces a clear failure, not a silent stop.
- **Idempotent side effects.** Steps that write files, open pull requests, send messages or call external APIs are safe to re-run, through idempotency keys or a check before acting. A retried run shouldn't post twice.
- **Human checkpoints for irreversible actions.** Deploys, deletions, payments, outbound messages and merges wait for approval unless they're deliberately automated with guardrails.
- **Least privilege per step.** Each agent gets only the tools, credentials and directories its step needs; a summarizer doesn't get a shell.
- **Untrusted content stays data.** Web pages, issues, emails and files read in one step can contain instructions; they mustn't change what later steps do or which tools they call.
- **Observable.** Every run leaves a trace: prompts, tool calls, outputs, and cost and duration per step, so failures can be debugged and costs attributed.
- **Evaluated before it runs unattended.** The workflow is tested end to end on representative tasks against stated success criteria, and changes to prompts, models or tools re-run those evals.
- **Cost and concurrency limits.** Fan-out width, the model used at each step and the expected cost per run are explicit, with hard limits.
