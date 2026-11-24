---
source: "serena project index --help @ serena-agent 1.5.3"
fetched_at: "2026-06-16T12:24:33.275Z"
sha256: "8f61826f699358dd59605baf041d2d25823e3a37341f4f01c46b92685116d58b"
---

Usage: serena project index [OPTIONS] [PROJECT]

  Index a project by saving symbols to the LSP cache. Auto-creates project.yml
  if it doesn't exist.

Options:
  --name TEXT                     Project name (only used if auto-creating
                                  project.yml).
  --language TEXT                 Programming language(s) (only used if auto-
                                  creating project.yml). Inferred if not
                                  specified.
  --log-level [DEBUG|INFO|WARNING|ERROR|CRITICAL]
                                  Log level for indexing.
  --timeout FLOAT                 Timeout for indexing a single file.
  --help                          Show this message and exit.
