---
description: Review a skill with the gate, reviewer roles and optional pressure scenarios, then report whether it is ready
argument-hint: "<name|path> [--scenarios]"
allowed-tools: Agent, Bash, Read, Edit, Write, Grep, Glob, Skill
---

Load the `reviewing-skills` skill and the `skill-principles` skill, then follow the procedure in [skills/reviewing-skills/SKILL.md](../skills/reviewing-skills/SKILL.md) end to end.

Target: the skill named or the path given in `$ARGUMENTS`. A bare name means `skills/<name>` in this repo.

Pressure scenarios stay off unless `$ARGUMENTS` includes `--scenarios`. Without it, say in the report that behavior is untested.
