# General Agent Development

Use this when designing agents, agent products, tool-using assistants, memory systems, evals, or agent architectures.

## Core Model

An agent system is a loop:

```text
intent -> context -> tools -> actions -> observations -> memory/evals -> next action
```

Quality comes from engineering each part of the loop, not from adding more instructions.

## Design Questions

Before implementation, answer:

- What jobs should the agent do?
- What should it never do?
- What context must be always available?
- What context should be retrieved on demand?
- Which decisions need user approval?
- Which operations need deterministic tools?
- What evidence proves task completion?
- What failure modes need hooks or evals?

## Context Architecture

Use progressive disclosure:

| Context type | Placement |
| --- | --- |
| Universal behavior/routing | Always-on instructions |
| Reusable workflow | Skill |
| Large docs/API/source notes | Reference files or retrieval |
| User/project memory | Searchable memory store |
| External system state | Tool call |
| Deterministic transformation | Script |
| Durable rule needing to survive every turn | System prompt / always-on instructions, re-injected each turn — never a one-time note |

Avoid always loading large policy, memory, or reference dumps. Instead, teach the agent when to retrieve them.

## Adherence Mechanisms

Durable behavioral rules must live where they reload every turn (system prompt/always-on instructions), not in a note or memory the agent has to spontaneously recall. "Injected every turn" is what makes a rule standing rather than advisory.

### The Therapist Pattern (Controlled Self-Modification)

- A separate, dedicated subagent is the only writer to mutable identity/rule files; the primary agent cannot self-modify its own standing rules directly.
- Rationale: externalizing the reflection/edit process improves change quality and blocks impulsive single-session rewrites.
- Refinement: require a proposed change to persist across multiple sessions/days before it solidifies.
- General principle: enforce safety properties structurally — who has write access to what — not through prompted judgment alone.

## Self-Scheduling

Persistent-memory persona agents benefit from an internal scheduler that can wake the agent and re-inject a prompt it set for a future time, enabling autonomous follow-up without a human trigger.

## Tool Design

Design tool primitives for the agent as the primary user — e.g. send/read/wait-for-reply — not a human-facing CLI/API adapted 1:1. See mcp-development.md Tool Surface Area.

Agents need tools that return useful observations, not just success.

Good tool response includes:

- What happened.
- Current state.
- Relevant IDs/paths/URLs.
- Next available actions.
- Errors with recovery hints.

Bad tool response:

```json
{"ok": true}
```

Better:

```json
{
  "ok": true,
  "created_id": "task_123",
  "status": "queued",
  "next_actions": ["poll_status", "cancel"]
}
```

## Approval Boundaries

Ask for approval before:

- Destructive actions.
- External side effects.
- Purchases or sends.
- Public publishing.
- Credential or permission changes.
- Actions that can expose private data.

Do not ask for approval merely because the next step is routine and already implied by the user's request.

## Credential Handling

Ground rule (Lethal Trifecta): an agent that simultaneously has (a) private-data access, (b) external communication ability, and (c) exposure to untrusted content cannot be structurally guaranteed safe. Architect to keep those three from co-occurring in one agent.

- Orchestrator/persona agents: no direct external-communication ability — only ephemeral, purpose-spun subagents talk externally.
- Subagents that communicate externally never see real secrets: a vault holds real credentials; subagents get placeholder tokens; a network-layer proxy swaps the placeholder for the real credential in-flight.
- Where the swap trick doesn't work (e.g. a literal password needed at fill-time): generate a random temporary password, have the subagent fill it, then a separate arbiter swaps in the real credential afterward.

## Memory

Use memory for:

- Prior decisions.
- User preferences.
- Project conventions.
- Previous failure modes.
- Proven commands and workarounds.

Memory should be:

- Searchable.
- Cited or identified when used.
- Kept out of always-on context unless it is routing-critical.
- Verified when likely stale and cheap to check.

### Memory Strategy by Agent Lifetime

| Agent type | Strategy |
| --- | --- |
| Task-scoped/ephemeral (e.g. coding agent) | Aggressive compaction is fine |
| Persistent, multi-conversation persona agent | Same strategy is "desperately wrong" — needs conversation-aware retention |

A single compaction strategy does not transfer between agent types.

## Evaluation

Agent evals should measure behavior, not just answer quality.

Useful eval categories:

- Skill/tool triggering.
- Tool order.
- Verification before completion.
- Refusal/approval boundaries.
- Task completion under realistic ambiguity.
- Cost and context usage.
- Recovery from tool errors.
- Cross-harness portability.

Good eval artifacts:

- Transcript.
- Tool-call log.
- Filesystem diff.
- Deterministic assertions.
- Semantic reviewer output.

### Running an Eval Program

- Pre-register hypotheses before each run — prevents post-hoc rationalization of results.
- Periodically have a human manually audit automated eval numbers — measurement bugs are commonly caught only this way.
- A win on one harness/model doesn't generalize until re-verified on another.
- Verify claimed token/cost savings by actually reading output, not just the token count.
- Don't cap reasoning/thinking-token budgets as a cost lever — it can raise turn count and total output instead of lowering it.
- Stop iterating once a local optimum is confirmed rather than continuing to spend on marginal gains.
- Nonstationary behavior: base rates can swing widely within hours for unrelated reasons — use contemporaneous, paired comparisons only. Full methodology: skill-development.md Behavioral Eval Design.
- Evaluator/judge subagents: disable all tools; give an explicit "you are a classifier, not a coding agent" system prompt.
- Reliability check for probabilistic judges: run each scenario 5x, require 5/5 pass. Iterate the judge's rules when a run surfaces a rationalization loophole — tighten to an absolute exception list, re-test.

## Runtime Guardrails

Use hooks or wrappers when prompt instructions are insufficient.

Good hook uses:

- Stop/continue classification.
- Verify-before-commit.
- Secret scanning before external send.
- Preventing destructive commands.
- Enforcing tool order.

Hook design rules:

- Keep context bounded.
- Use structured output.
- Prevent recursion.
- Add timeouts.
- Decide fail-open/fail-closed intentionally.
- Log enough to debug.

## Agent Product Anti-Patterns

- Giant system prompt with all docs embedded.
- Tools that hide state after acting.
- No evals for behavioral claims.
- Agent asks the user to do routine next steps.
- Agent silently acts across trust boundaries.
- Tool descriptions repeat full schemas.
- Memory is treated as current fact without verification.
- Subagents inherit huge irrelevant history.
- Agent skips repo-specific conventions (CONTRIBUTING, PR template) under speed pressure unless a process step forces the check.
- Tool/observation contract with a broken failure signal (errors not flagged as errors) — produces a silent infinite-failure loop with no natural circuit breaker. See mcp-development.md.

## Completion Criteria

Agent architecture work is not complete until:

- Context-loading strategy is clear.
- Tool responsibilities are bounded.
- Approval boundaries are explicit.
- Completion evidence is defined.
- At least one realistic eval or manual transcript validates the behavior.
