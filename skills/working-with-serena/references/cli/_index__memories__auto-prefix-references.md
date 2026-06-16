---
source: "serena memories auto-prefix-references --help @ serena-agent 1.5.3"
fetched_at: "2026-06-16T12:24:33.275Z"
sha256: "22dd04b2672374d55141b371febfa3eeeb95271a79a1ba0643a799e33839f057"
---

Usage: serena memories auto-prefix-references [OPTIONS] [PROJECT]

  Rewrite exact bare occurrences of existing memory names by adding the `mem:`
  prefix. This is a heuristic, file-mutating operation: a word that happens to
  coincide with a memory name will be rewritten as a reference even if it was
  intended as ordinary prose. Use --dry-run to preview the rewrites without
  modifying any files.

  Scope is narrower than what `serena memories check` reports. Only EXACT bare
  occurrences are rewritten (the body text must equal an existing memory name
  verbatim); fuzzy near-miss findings surfaced by `check` are NOT autofixable
  here, since rewriting them would require substring substitution rather than
  a prefix addition — they are reported for manual review. By default the
  rewrite is further restricted to memory names containing `/` or longer than
  the configured threshold, and skips global and read-only memories; use the
  --include-* flags below to widen the scope.

Options:
  --dry-run             Preview the rewrites this command would apply; do not
                        modify any files.
  --include-flat-names  Also rewrite short, flat memory names (no `/`, below
                        the length threshold). Raises false-positive risk
                        significantly.
  --include-read-only   Also rewrite occurrences inside read-only memories.
  --include-global      Also rewrite occurrences inside global memories
                        (affects every project consuming them).
  --help                Show this message and exit.
