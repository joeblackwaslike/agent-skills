# Agent flows

Recommended Serena flows by intent. Each is a short decision sequence — follow the arrows, fall back
to native tools only at the marked exits. Tool names are `mcp__plugin_serena_serena__<tool>`.

## 0. Session start (do this once)

```
activate_project(project="<name or path>")     # if no project active
→ first time in this repo?  onboarding()        # indexes structure, build/test tasks
→ get_current_config()                          # confirm active project, tools, context
```

If `ToolSearch("serena find_symbol")` returns nothing, Serena isn't connected → use native tools and
mention it.

## 1. Search — "where is X?"

```
Know the symbol name?
  ├─ yes → find_symbol "name"            (add include_body=true to also read it)
  │        nested? find_symbol "Class/method"
  └─ no  → conceptual/text search?
            ├─ symbol-ish  → find_symbol with a substring, or get_symbols_overview on the likely file
            ├─ free text   → search_for_pattern "<regex>"
            └─ by filename → find_file "<glob>"   /   list_dir for structure
```

Never open with `Grep "def name"` + `Read` — that's the drift pattern. Lead with `find_symbol`.

## 2. Understand — "how does this file/area work?"

```
get_symbols_overview <file>             # skeleton: classes, functions, top-level symbols
→ pick the symbols that matter
→ find_symbol "<symbol>" include_body=true   # read only those bodies
→ need callers/context?  find_referencing_symbols "<symbol>"
```

This reads a fraction of the tokens a whole-file `Read` would, and you only pull bodies you actually
need.

## 3. Edit — "change this function"

```
find_symbol "<symbol>" include_body=true        # see current body
→ whole body changes      → replace_symbol_body "<symbol>" <new body>
→ add code near it        → insert_before_symbol / insert_after_symbol
→ small in-place tweak    → replace_content (regex/literal) on that file
```

Skip the `Read`. `replace_symbol_body` targets exact boundaries, so there's no stale-text failure.

## 4. Refactor — "rename / restructure safely"

```
Rename a symbol everywhere   → rename_symbol "<old>" "<new>"     # LSP rename: imports + call sites
Change a signature           → find_referencing_symbols "<symbol>"  # enumerate callers FIRST
                               → edit the definition, then each caller
Delete dead code             → find_referencing_symbols "<symbol>"  # confirm zero usages
                               → safe_delete_symbol "<symbol>"
Move/extract                  → insert_after_symbol at destination + safe_delete_symbol at source
```

Always enumerate references before a signature change or delete. `safe_delete_symbol` will refuse if
usages remain — trust it.

## 5. Debug — "why is this broken?"

```
get_diagnostics_for_file <file>          # LSP errors/warnings without running a build
→ error in a symbol?  find_symbol include_body=true to inspect
→ who calls it?       find_referencing_symbols
→ need to run it?     execute_shell_command "<test/build cmd>"   (or native Bash)
→ re-check           get_diagnostics_for_file <file>
```

Pair with the `superpowers:systematic-debugging` skill for the investigation method; use Serena for
the navigation inside it.

## 6. Persisting findings

```
Learned something reusable about this repo?  write_memory "<name>" "<markdown>"
Resuming / after compaction?                 list_memories → read_memory "<name>"
```

Serena memories are project-scoped and survive across sessions — use them for build/test commands,
architecture notes, and gotchas instead of scratch files.

## The one-line rule

If your next action is `Read` a code/config file or `Grep` for a symbol, replace it with
`get_symbols_overview` / `find_symbol` / `search_for_pattern`. That single substitution is 90% of
using Serena well.
