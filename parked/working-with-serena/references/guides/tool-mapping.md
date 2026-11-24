# Serena ↔ native tool mapping

Every native tool a coding agent reaches for, the Serena tool that replaces it, why the Serena one
usually wins, and the **legitimate** cases where the native tool is the right call. Authoritative
tool list (with optional/BETA flags): [`../docs/01-about__035_tools.md`](../docs/01-about__035_tools.md).

## Read / understand

| You want to… | Native | Serena | Why Serena wins |
|---|---|---|---|
| See what's in a file | `Read` (whole file) | `get_symbols_overview` | Returns the class/function skeleton, not 2,000 lines. |
| Read one function/class | `Grep` + `Read` | `find_symbol` (`include_body=true`) | Returns just that symbol; no surrounding noise. |
| Read a nested method | `Read` + scroll | `find_symbol "Class/method"` | Path syntax targets the exact member. |

## Search

| You want to… | Native | Serena | Why Serena wins |
|---|---|---|---|
| Find a symbol by name | `Grep "def foo"` | `find_symbol "foo"` | Semantic match, not text match; returns location + kind. |
| Find every caller/reference | `Grep "foo("` | `find_referencing_symbols` | LSP-accurate references, not string hits in comments/strings. |
| Find the definition | `Grep` guesswork | `find_declaration` | Jumps to the real definition across files. |
| Find implementations of an interface | `Grep` | `find_implementations` | Resolves through the type system. |
| Regex / free-text search | `Grep` / `rg` | `search_for_pattern` | Project-aware, respects ignores; one tool surface. |
| Find files by name/glob | `Glob` | `find_file` | Same idea, inside the project sandbox. |
| List a directory | `Bash ls` / `Glob` | `list_dir` | Optional recursion; no shell round-trip. |

## Edit

| You want to… | Native | Serena | Why Serena wins |
|---|---|---|---|
| Replace a function body | `Read` + `Edit` | `replace_symbol_body` | Exact AST boundaries; no stale-`old_string` risk. |
| Insert before/after a symbol | `Read` + `Edit` | `insert_before_symbol` / `insert_after_symbol` | Anchored to the symbol, not a line number. |
| Create a new file | `Write` | `create_text_file` | Stays in the project sandbox. |
| Targeted in-file text replace | `Edit` | `replace_content` | Regex or literal, project-aware. |
| Line-range edits (last resort) | `Edit` | `replace_lines` / `delete_lines` / `insert_at_line` *(optional)* | Use only when no symbol applies. |

## Refactor

| You want to… | Native | Serena | Why Serena wins |
|---|---|---|---|
| Rename across the codebase | `Grep` + multi-file `Edit` | `rename_symbol` | True LSP rename: imports, call sites, references. Atomic and safe. |
| Delete a symbol | `Read` + `Edit` | `safe_delete_symbol` | Checks for remaining usages first; refuses dangling deletes. |
| Change a signature safely | `Grep` callers, edit each | `find_referencing_symbols` → edit | Enumerate every caller before touching the signature. |

## Diagnose / debug

| You want to… | Native | Serena | Why Serena wins |
|---|---|---|---|
| See type errors / warnings | `Bash` build + parse | `get_diagnostics_for_file` | LSP diagnostics directly, no build step. |
| Diagnose a symbol + its refs | manual | `get_diagnostics_for_symbol` *(optional)* | Scopes diagnostics to a symbol and its callers. |

## Memory / project

| You want to… | Native | Serena | Why Serena wins |
|---|---|---|---|
| Persist notes across sessions | scratch `.md` files | `write_memory` / `read_memory` / `list_memories` | Project-scoped, structured, survives compaction. |
| Activate / onboard a repo | n/a | `activate_project` / `onboarding` | Indexes the project so symbolic tools work. |
| Inspect active config/tools | n/a | `get_current_config` | Shows active project, enabled tools, context, modes. |
| Run a shell command | `Bash` | `execute_shell_command` | Runs in the project dir; use native `Bash` if you prefer your own shell. |

## When the native tool is actually correct

Serena is the default, not a religion. Reach for the built-in tool when:

- **Serena isn't available** — `ToolSearch("serena ...")` returns nothing, or the MCP server failed
  to connect. Don't stall; use `Read`/`Edit`/`Grep`.
- **Bulk text spanning many files with no named symbol** — e.g. replacing a copyright header or a
  URL across 200 files. A `rg` + `sed`/`Edit` sweep (or `search_for_pattern` to scope it) beats
  symbol-by-symbol work.
- **Truly unsupported file type** — a binary, a lockfile, or a format with no Language Server and no
  meaningful pattern to search. `Read`/`Edit` is fine.
- **You need exact byte/line-level control** the symbol model can't express — rare, but
  `replace_lines`/`insert_at_line` exist for it.

Outside those cases, defaulting to native tools is **drift** (see [`hooks.md`](hooks.md)) — catch
yourself and switch.

## JetBrains backend (note)

Serena has a parallel `jet_brains_*` tool family (rename/move/inline/debug/inspections) that uses a
running JetBrains IDE instead of the LSP backend. Joe's primary IDE is VS Code, so the default
Language-Server tools above are what you'll use; the JetBrains set is documented in the tools list if
you're in a JetBrains context.
