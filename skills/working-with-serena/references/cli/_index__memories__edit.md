---
source: "serena memories edit --help @ serena-agent 1.5.3"
fetched_at: "2026-06-16T12:24:33.275Z"
sha256: "15400942e63f4b6a78c2ba0caf60bb2975a01a450b7906b2858d5dea7c471db8"
---

Usage: serena memories edit [OPTIONS] MEMORY_NAME [PROJECT]

  Replace content matching a pattern in a memory. By default operates in
  literal (non-regex) mode and refuses to replace more than one occurrence;
  pass --mode regex to enable regex matching and --allow-multiple-occurrences
  to permit multiple hits.

Options:
  --needle TEXT                 The text to search for (literal by default;
                                regex if --mode=regex).  [required]
  --repl TEXT                   The replacement text (verbatim).  [required]
  --mode [literal|regex]        Treat --needle as literal text or as a Python
                                regex (MULTILINE and DOTALL flags enabled).
                                [default: literal]
  --allow-multiple-occurrences  Permit and apply multiple matches; without
                                this, multiple matches raise an error.
  --help                        Show this message and exit.
