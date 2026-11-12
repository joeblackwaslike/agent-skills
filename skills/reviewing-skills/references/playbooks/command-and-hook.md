# Commands and hooks

*Leans on principles 3, 4 (for a command's description), 10 and 1. Does not apply: 2, 5 and 8 unless the command loads a skill with a discipline in it. Principle 9 applies if the command dispatches agents.*

A command is a saved prompt a user or agent invokes by name. A hook is a script the harness runs on an event, with no agent deciding. Both ship in the plugin beside the skills and act on the user's machine. They are small, so defects hide in what they permit and in what they do when something goes wrong. Review each as a thin entry point. The principles are in [principles.md](../../../skill-principles/references/principles.md). For the code-side checks on a hook script, see [hooks-and-commands.md](../../../reviewing-code/references/playbooks/hooks-and-commands.md).

## What to check

- **A command is thin.** It loads a skill or a runbook and passes arguments through. An agent following a command that restates the runbook has two sources, and they drift (principle 3). The best command is a few lines.
- **Frontmatter is exact.** Field names match the platform docs, hyphens included. An unknown field is silently ignored, so a typo disables a setting. Check `description`, `argument-hint`, `allowed-tools`, `model`.
- **`allowed-tools` is the least the steps need.** An unrestricted `Bash` or a `Write` that the steps never use is an unstated grant. Where a broad grant is needed, the command should say why.
- **Arguments have defaults and a stated meaning.** `$ARGUMENTS` with no default, or a default that depends on repo state the command never checks, makes the same invocation behave differently by machine.
- **Links resolve from where the file lives.** A command in `commands/` links to `../skills/...`. A path that works from the repo root and nowhere else is a bug.
- **A hook's matcher and event are right.** An agent never sees a hook, so a wrong matcher fails without anyone noticing. Check the event name, the matcher value, and the `timeout`.
- **A hook fails safe and fails visibly.** A SessionStart hook that errors must not block startup, and it must leave a trace somewhere. Silent success and silent failure look the same.
- **A hook can be turned off.** Anything that runs without being asked has an opt-out documented where the user will find it (an environment variable named in the project's docs).
- **A hook does only its job.** It reads the event, acts, exits. No network call on a hot event, no write outside its own state, and no secret on the command line.
- **Idempotent.** Running it twice, or concurrently from two sessions, is safe.

## What the files cannot show

- **That the hook fires.** Run the event (start a session, run the matched tool) and observe the effect. Reading `hooks.json` shows intent only. If you cannot run it, mark it unrun.
- **Behavior on the failure path.** Break the dependency (no network, a missing binary, an unset variable) and see the exit code and output. The failure path is where hooks differ from their description.
- **Environment assumptions.** `stat -f` versus `stat -c`, `${CLAUDE_PLUGIN_ROOT}` set or not, a shell that is not bash. Test on the shell the harness uses.
- **Platform parity.** A command also shipped to Codex or Gemini may use syntax that platform does not support (`@file` imports, a different tool allowlist). Check each platform the plugin manifest names.
- **Siblings.** A second command or skill with the same trigger phrase makes the choice ambiguous. List the other commands before judging this one.

## Example from this repo

`commands/self-review.md` is the pattern for a command. Its body is two short paragraphs that load two skills and link the runbook:

> Load the `reviewing-code` skill and the `engineering-principles` skill, then follow the runbook end to end.

It owns no procedure of its own, defaults the base branch ("`$ARGUMENTS` if given, otherwise `main`"), and links with `../skills/...` paths. The weakness to look for is the grant in its frontmatter: `allowed-tools: Agent, Bash, Read, Edit, Write, Grep, Glob, Skill`. Unrestricted `Bash` is probably needed here, but nothing in the file says why, and the grant covers `Write` and `Edit` for a command whose first phase is review.

For a hook, `.claude-plugin/hooks/auto-update.sh` has a documented opt-out (`AGENT_SKILLS_AUTO_UPDATE=false`) and a weekly guard. Its last line, `claude plugin update ... 2>/dev/null || true`, discards both the error text and the exit status. The hook cannot block a session, which is right, but a failed update leaves no trace, so a broken updater looks the same as a working one.

## Stronger wording

```text
Wrong: allowed-tools: Bash, Write, Edit, Read
  Run the review and fix whatever you find.

Right: allowed-tools: Agent, Read, Grep, Glob, Skill, Bash(git:*), Edit
  Run the review. Edit files only in the fix step.
```

The right version grants what the steps use and says when the write tools may be used, so a reader can tell a deliberate grant from a default.
