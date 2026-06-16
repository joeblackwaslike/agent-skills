# Serena cookbook

Concrete, copy-pasteable recipes. Tool names shown bare (`find_symbol`); in this environment prefix
with `mcp__plugin_serena_serena__`. Arguments are illustrative — pass them as the tool's parameters.

## Rename a symbol across the whole codebase

```
find_symbol "processOrder"                       # confirm it exists / disambiguate
rename_symbol  name_path="processOrder"  new_name="submitOrder"
```

`rename_symbol` uses the Language Server, so imports, call sites, and references update together. No
`Grep` + per-file `Edit`.

## Add a method to a class

```
get_symbols_overview  relative_path="src/orders/service.ts"     # find the class + its members
insert_after_symbol   name_path="OrderService/cancel"  body="<the new method source>"
```

Insert after an existing member (here `cancel`) so the new method lands inside the class body at the
right place. Use `insert_before_symbol` to put it first.

## Find every caller before changing a signature

```
find_referencing_symbols  name_path="calculateTax"  relative_path="src/tax.py"
# → list of call sites across the codebase
# edit the definition with replace_symbol_body, then update each caller
```

Do this *before* you touch the signature so you know the full blast radius.

## Edit a function body

```
find_symbol  name_path="handleWebhook"  include_body=true       # read current body
replace_symbol_body  name_path="handleWebhook"  body="<new body>"
```

No whole-file `Read`, no `old_string` matching.

## Safely delete dead code

```
find_referencing_symbols  name_path="legacyExport"             # confirm zero real usages
safe_delete_symbol        name_path="legacyExport"
```

`safe_delete_symbol` refuses if usages remain — let it guard you.

## Targeted lookup in a config/data file (no whole-file Read)

```
search_for_pattern  substring_pattern="ANTHROPIC_API_KEY"  relative_path="config/"
# or, for LSP-backed formats (JSON/YAML/TOML/Markdown/Bash/SQL):
get_symbols_overview  relative_path="package.json"
```

Reading an entire `.json`/`.yaml`/`.toml` to find one key is the anti-pattern the custom hook flags
(see [`hooks.md`](hooks.md)). Pattern-search or overview instead.

## Onboard a new project

```
activate_project   project="/path/to/repo"      # or by configured name
onboarding()                                     # indexes structure, finds build/test tasks
get_current_config()                             # verify active project + enabled tools
```

Run once per repo. After onboarding, symbolic tools resolve correctly.

## Persist project knowledge across sessions

```
write_memory   memory_name="build-and-test"   content="## Commands\n- build: pnpm build\n- test: pnpm test\n..."
# later / after compaction:
list_memories()
read_memory    memory_name="build-and-test"
```

Memories live in `.serena/memories/` (project-scoped, markdown) and survive compaction — use them
instead of scratch files for build commands, architecture notes, and gotchas.

## Inspect diagnostics without a build

```
get_diagnostics_for_file  relative_path="src/api/handler.ts"
# → LSP errors/warnings, grouped by severity and containing symbol
```

## CLI-side recipes (run in a terminal, not as MCP tools)

```bash
# One-time MCP setup for Claude Code
serena setup claude-code

# Pre-index a large repo so the first symbolic call is fast
serena project index --project "$(pwd)"

# Print the CC system-prompt override that counteracts built-in-tool bias
serena prompts print-cc-system-prompt-override

# List available contexts / modes
serena context list
serena mode list

# Inspect/manage project memories from the shell
serena memories list
serena memories read <name>
```

See [`mcp-setup.md`](mcp-setup.md) for the full server configuration and the
[`../cli/`](../cli/) reference for every command and flag.
