---
description: Review your own diff with fresh-eyes reviewers, fix the findings, and report whether it is ready
argument-hint: "[base-branch]"
allowed-tools: Agent, Bash, Read, Edit, Write, Grep, Glob, Skill
---

Load the `reviewing-code` skill and the `engineering-principles` skill, then follow the runbook end to end: [skills/reviewing-code/references/self-review.md](../skills/reviewing-code/references/self-review.md).

The review standard is the principles plus the playbooks. Reviewers read them directly:

- [principles.md](../skills/engineering-principles/references/principles.md)
- [language-notes/index.md](../skills/engineering-principles/references/language-notes/index.md)
- [playbooks/index.md](../skills/reviewing-code/references/playbooks/index.md)

Base branch: `$ARGUMENTS` if given, otherwise `main`.
