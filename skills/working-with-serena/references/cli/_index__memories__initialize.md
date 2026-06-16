---
source: "serena memories initialize --help @ serena-agent 1.5.3"
fetched_at: "2026-06-16T12:24:33.275Z"
sha256: "a79998e1330ab3b8600ff6e75db45933dc16cb532eff23c24163644a920eb142"
---

Usage: serena memories initialize [OPTIONS] [PROJECT]

  Initialize this project's memory layout by seeding the `memory_maintenance`
  memory. Requires the project to already exist as a Serena project (run
  `serena project create` first); this command does not create a `.serena`
  directory on its own. If a `global/memory_maintenance` memory exists, it
  takes precedence and no project copy is created.

Options:
  --help  Show this message and exit.
