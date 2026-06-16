# Why Serena beats the blunt tools

This guide is the pitch: why an agent should reach for Serena's symbolic tools instead of the
built-in `Read`/`Edit`/`Write`/`Grep`/`Glob`/`Bash`. Read it once; internalize the trade-offs.

## The blunt-tool loop is expensive and fragile

The default way an agent changes a function is:

```
Grep "def process_order"      → file + line numbers
Read src/orders/service.py    → 1,800 lines into context to see ~20 you care about
Edit  (old_string/new_string) → hope the surrounding text is unique and unchanged
```

Three round-trips, a whole file dragged into context, and an `Edit` that breaks if the
`old_string` isn't unique or the file shifted. Do this a few times in a session and you've burned
tens of thousands of tokens re-reading files you've already seen.

## The Serena loop is one precise call

```
find_symbol "process_order" include_body=true   → just that function's body
replace_symbol_body "process_order" <new body>  → replaced at exact AST boundaries
```

No whole-file read. No line counting. No uniqueness gamble. The Language Server knows exactly where
the symbol starts and ends.

## Concrete wins

- **Token efficiency.** `get_symbols_overview` returns a file's class/function skeleton for a
  fraction of a full `Read`. `find_symbol` returns one symbol, not 2,000 lines. On a large file the
  difference is often 10–50× fewer tokens — and those tokens compound across a session because you
  stop re-reading.
- **Structural accuracy.** `replace_symbol_body`, `insert_before_symbol`, `insert_after_symbol`
  operate on symbol boundaries the LSP computes. There is no "wrong line" failure mode and no
  stale-`old_string` failure mode.
- **Real refactoring, not text munging.** `rename_symbol` performs an LSP rename across the whole
  codebase (imports, call sites, references) — something `Grep` + multi-file `Edit` does
  approximately and dangerously. `find_referencing_symbols` enumerates every caller *before* you
  change a signature. `safe_delete_symbol` refuses to delete something still in use.
- **Diagnostics for free.** `get_diagnostics_for_file` surfaces type errors and warnings from the
  Language Server without running a build and parsing its output.
- **Fewer round-trips.** One symbolic call collapses the `Read` → `Grep` → `Edit` chain, so you
  spend fewer turns and leave more context budget for actual reasoning.

## It is not just for "code"

Language Servers cover far more than `.py`/`.ts`. Serena ships LSP support for JSON, YAML, TOML,
Bash, Markdown, SQL, GraphQL, Terraform/HCL, and ~40 languages total. For those,
`get_symbols_overview`/`find_symbol` work on config and data files too. Even where no symbol model
applies, `search_for_pattern` is a better first move than `Read`-ing an entire config file to eyeball
one key. The blunt-`Read`-the-whole-config anti-pattern is exactly what Joe's custom hook
(see [`hooks.md`](hooks.md)) was built to catch.

## The drift reality (why this needs enforcement, not just advice)

Knowing Serena is better is not enough, because the newer Claude models are **trained so heavily on
their built-in tools that they drift back to them** — especially in long sessions and under Claude
Code's dynamic tool loading. This is not a vibe; Serena's own documentation states it plainly:

> Recent updates to Claude Code (CC) and to the Opus line of models resulted in drastically reduced
> adherence to instructions pertaining to Serena's tools. […] The descriptions of CC's system tools
> take almost 16k tokens, cannot be adjusted by the user, and introduce a very strong bias towards
> internal tools, making it almost impossible to convince Opus 4.7 to use Serena.
> — *Serena docs, "Connecting Your MCP Client → Claude Code"*

Three mitigations, in order of leverage:

1. **`--context claude-code`** when starting the server — disables Serena tools that duplicate CC's
   built-ins so the model isn't choosing between two of everything (see [`mcp-setup.md`](mcp-setup.md)).
2. **The system-prompt override** — `claude --system-prompt="$(serena prompts print-cc-system-prompt-override)"`
   counteracts the built-in-tool bias at the source.
3. **Hooks** — `serena-hooks remind` nudges you back to symbolic tools after too many consecutive
   `grep`/`read_file` calls; the custom config-file hook extends that to non-code files. This is the
   backstop that actually holds in long sessions. See [`hooks.md`](hooks.md).

**Takeaway for you, the agent reading this:** default to Serena. If you notice yourself about to
`Read` a code file or `Grep` for a symbol name, that is the drift — stop and use `find_symbol` /
`get_symbols_overview` / `search_for_pattern` instead.
