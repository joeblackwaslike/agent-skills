---
description: git commit and push
model: opencode/kimi-k2.5
subtask: true
source: "https://raw.githubusercontent.com/anomalyco/opencode/dev/.opencode/command/commit.md"
fetched_at: "2026-06-15T05:56:15.706Z"
sha256: "b3e6700bfd6a8c9bbd28d0d631da5b60b46924c437e14dfe701f6df62166a890"
---

commit and push

make sure it includes a prefix like
docs:
tui:
core:
ci:
ignore:
wip:

For anything in the packages/web use the docs: prefix.

prefer to explain WHY something was done from an end user perspective instead of
WHAT was done.

do not do generic messages like "improved agent experience" be very specific
about what user facing changes were made

if there are conflicts DO NOT FIX THEM. notify me and I will fix them

## GIT DIFF

!`git diff`

## GIT DIFF --cached

!`git diff --cached`

## GIT STATUS --short

!`git status --short`
