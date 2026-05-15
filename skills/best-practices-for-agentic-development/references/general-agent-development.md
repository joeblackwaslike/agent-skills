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

Avoid always loading large policy, memory, or reference dumps. Instead, teach the agent when to retrieve them.

## Tool Design

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

## Completion Criteria

Agent architecture work is not complete until:

- Context-loading strategy is clear.
- Tool responsibilities are bounded.
- Approval boundaries are explicit.
- Completion evidence is defined.
- At least one realistic eval or manual transcript validates the behavior.

