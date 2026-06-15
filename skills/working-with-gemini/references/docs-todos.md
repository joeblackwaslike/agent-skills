---
source: "https://raw.githubusercontent.com/google-gemini/gemini-cli/main/docs/tools/todos.md"
fetched_at: "2026-06-15T05:55:14.234Z"
sha256: "ac1f3d58ea3bad6bc78ac958d39fa3345a6268fb6343a58a7b330db573ee5e67"
---

# Todo tool (`write_todos`)

The `write_todos` tool allows the Gemini agent to maintain an internal list of
subtasks for multi-step requests.

## Technical reference

The agent uses this tool to manage its execution plan and provide progress
updates to the CLI interface.

### Arguments

- `todos` (array of objects, required): The complete list of tasks. Each object
  includes:
  - `description` (string): Technical description of the task.
  - `status` (enum): `pending`, `in_progress`, `completed`, `cancelled`, or
    `blocked`.

## Technical behavior

- **Interface:** Updates the progress indicator above the CLI input prompt.
- **Exclusivity:** Only one task can be marked `in_progress` at any time.
- **Persistence:** Todo state is scoped to the current session.
- **Interaction:** Users can toggle the full list view using **Ctrl+T**.

## Use cases

- Breaking down a complex feature implementation into manageable steps.
- Coordinating multi-file refactoring tasks.
- Providing visibility into the agent's current focus during long-running tasks.

## Next steps

- Follow the [Task planning tutorial](../cli/tutorials/task-planning.md) for
  usage details.
- Learn about [Session management](../cli/session-management.md) for context.
