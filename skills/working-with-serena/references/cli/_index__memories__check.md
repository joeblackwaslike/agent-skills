---
source: "serena memories check --help @ serena-agent 1.5.3"
fetched_at: "2026-06-16T12:24:33.275Z"
sha256: "62ef5c327f86b22cf946c93163ecb8c0e53cc2bcf6fe781ef55461ca6bca87dc"
---

Usage: serena memories check [OPTIONS] [PROJECT]

  Check referential integrity across all memories of the project (and global
  memories). By default reports only stale `mem:` references. Pass --include-
  unmarked to also report bare occurrences of existing memory names (exact
  matches) and --fuzzy-matching (only meaningful in combination with
  --include-unmarked) to additionally report fuzzy near-misses. Read-only and
  never writes. Always exits 0.

Options:
  --include-unmarked  Also report bare exact occurrences of existing memory
                      names (i.e. without the `mem:` prefix).
  --fuzzy-matching    Additionally report fuzzy near-misses (long bare tokens
                      that similarity-match an existing memory name). Only
                      meaningful together with --include-unmarked; ignored
                      otherwise.
  --help              Show this message and exit.
