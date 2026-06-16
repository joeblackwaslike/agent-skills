---
source: "serena project create --help @ serena-agent 1.5.3"
fetched_at: "2026-06-16T12:24:33.275Z"
sha256: "8a4d388ade3b393a324300b148cbcf5abbad1a8fffa04fee3c2052c78f269cb2"
---

Usage: serena project create [OPTIONS] [PROJECT_PATH]

  Create a new Serena project configuration.

Options:
  --name TEXT                     Project name; defaults to directory name if
                                  not specified.
  --language TEXT                 Programming language(s); inferred if not
                                  specified. Can be passed multiple times.
  --index                         Index the project after creation.
  --log-level [DEBUG|INFO|WARNING|ERROR|CRITICAL]
                                  Log level for indexing (only used if --index
                                  is set).
  --timeout FLOAT                 Timeout for indexing a single file (only
                                  used if --index is set).
  --help                          Show this message and exit.
