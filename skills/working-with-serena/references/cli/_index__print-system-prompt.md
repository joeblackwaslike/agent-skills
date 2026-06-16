---
source: "serena print-system-prompt --help @ serena-agent 1.5.3"
fetched_at: "2026-06-16T12:24:33.275Z"
sha256: "f9e5c7019c563fc972285f51f2306bfff7239cdc81fe9c8560545373fcf0aa68"
---

Usage: serena print-system-prompt [OPTIONS] [PROJECT]

  Print the system prompt for a project.

Options:
  --log-level [DEBUG|INFO|WARNING|ERROR|CRITICAL]
                                  Log level for prompt generation.
  --only-instructions             Print only the initial instructions, without
                                  prefix/postfix.
  --context TEXT                  Built-in context name or path to custom
                                  context YAML.  [default: desktop-app]
  --mode TEXT                     Built-in mode names or paths to custom mode YAMLs with which to 
                                  override the default_modes defined in the global Serena configuration or 
                                  the active project.
                                  For details on mode configuration, see 
                                    https://oraios.github.io/serena/02-usage/050_configuration.html#modes.
  --help                          Show this message and exit.
