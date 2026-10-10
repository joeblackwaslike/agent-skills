---
source: "bd dolt --help @ 1.3.1"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "ca8bc094d5e9a785d0911677d88ff8fc61f07bff4d06793a3b0ff1b5b7b03f9c"
---

Configure and manage Dolt database settings and server lifecycle.

Beads runs Dolt embedded (in-process) by default: there is no sql-server and
nothing is auto-started. A database only uses a dolt sql-server when it is
configured for one: shared-server mode, an explicit server mode, or a
non-localhost dolt_server_host. The server-only commands below fail with
"not supported in embedded mode (no Dolt server)" on an embedded database.

Server lifecycle (server mode only):
  bd dolt start        Start the Dolt server for this project
  bd dolt stop         Stop the Dolt server for this project

Diagnostics (both modes):
  bd dolt status       Show Dolt engine status (embedded: in-process, data dir)
  bd dolt show         Show current Dolt configuration with connection test

Configuration (server mode only):
  bd dolt set <k> <v>  Set a configuration value
  bd dolt test         Test server connection

Version control:
  bd dolt commit       Commit pending changes
  bd dolt push         Push commits to Dolt remote
  bd dolt pull         Pull commits from Dolt remote

Remote management:
  bd dolt remote add <name> <url>   Add a Dolt remote
  bd dolt remote list                List configured remotes
  bd dolt remote remove <name>       Remove a Dolt remote

Configuration keys for 'bd dolt set':
  database  Database name (default: issue prefix or "beads")
  host      Server host (default: 127.0.0.1)
  port      Server port (auto-detected; override with bd dolt set port <N>)
  user      MySQL user (default: root)
  data-dir  Custom dolt data directory (absolute path; default: .beads/dolt)

Remote server authentication (password + TLS) is NOT stored via 'bd dolt set'
(keeps secrets out of metadata.json). Configure them with:

  BEADS_DOLT_PASSWORD       Server password (highest priority)
  BEADS_DOLT_SERVER_TLS     Enable TLS (set to "1" or "true")
  BEADS_DOLT_SERVER_USER    MySQL user override (else use 'bd dolt set user')
  BEADS_CREDENTIALS_FILE    Optional path to credentials file

  Default credentials file: ~/.config/beads/credentials (Linux/macOS)
                            %APPDATA%\beads\credentials (Windows)
  Format (INI, section = host:port of the resolved connection):
    [127.0.0.1:3307]
    password = secret

  Password resolution: BEADS_DOLT_PASSWORD → credentials [host:port] → empty.
  Full reference: docs/architecture/dolt.md (Environment Variables / Credentials).

Flags for 'bd dolt set':
  --update-config  Also write to config.yaml for team-wide defaults

Examples:
  bd dolt set database myproject
  bd dolt set host 192.168.1.100 --update-config
  bd dolt set data-dir /home/user/.beads-dolt/myproject
  export BEADS_DOLT_PASSWORD=... BEADS_DOLT_SERVER_TLS=1
  bd dolt test

Usage:
  bd dolt [command]

Available Commands:
  clean-databases Drop stale test databases from the Dolt server
  commit          Create a Dolt commit from pending changes
  killall         Kill all orphan Dolt server processes
  pull            Pull commits from Dolt remote
  push            Push commits to Dolt remote
  remote          Manage Dolt remotes
  set             Set a Dolt configuration value
  show            Show current Dolt configuration with connection status
  start           Start the Dolt SQL server for this project
  status          Show Dolt engine status
  stop            Stop the Dolt SQL server for this project
  test            Test connection to Dolt server

Flags:
  -h, --help   help for dolt

Global Flags:
      --actor string              Actor name for audit trail (default: $BEADS_ACTOR, git user.name, $USER)
      --cpu-profile               Generate CPU profile for performance analysis
      --database string           Run against a different server database for this invocation, without changing the project's configured database (proxied-server mode only)
      --db string                 Database path (default: auto-discover .beads/*.db). In proxied-server mode, a value that isn't an existing path is treated as a database name override (see --database)
  -C, --directory string          Change to this directory before running the command (like git -C)
      --dolt-auto-commit string   Dolt auto-commit policy (off|on|batch). 'on': commit after each write. 'batch': defer commits to bd dolt commit; uncommitted changes persist in the working set until then (a live batch-mode bd process also flushes on SIGTERM/SIGHUP, except in proxied-server mode, where bd dolt commit is the only flush point). In proxied-server mode the deferral covers the writes the CLI makes on that route, including config and version metadata; explicit commit points (bd batch, bd mol bond/pour/squash, bd mol wisp create, and the wisp half of bd mol burn) still commit, and a bd serve process on the same database is unaffected. Default: on. Override via config key dolt.auto-commit
      --global                    Use the global shared-server database (beads_global)
      --ignore-schema-skew        Proceed despite forward schema drift (some queries may fail)
      --json                      Output in JSON format
      --mem-profile string        Write heap profile to FILE on exit (also respects BEADS_MEM_PROFILE)
      --no-color                  Disable color output (also: NO_COLOR=1 or CLICOLOR=0)
  -q, --quiet                     Suppress non-essential output (errors only)
      --readonly                  Read-only mode: block write operations (for worker sandboxes)
      --sandbox                   Sandbox mode: disables Dolt auto-push
  -v, --verbose                   Enable verbose/debug output

Use "bd dolt [command] --help" for more information about a command.
