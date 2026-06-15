---
source: "gh repo gitignore view --help @ 2.94.0"
fetched_at: "2026-06-15T17:27:25.905Z"
sha256: "e6fc869b3398791c0860763c3a7504a10905262210b79ae81f17986a93e40027"
---

View an available repository `.gitignore` template.

`<template>` is a case-sensitive `.gitignore` template name.

For a list of available templates, run `gh repo gitignore list`.


USAGE
  gh repo gitignore view <template> [flags]

INHERITED FLAGS
  --help   Show help for command

EXAMPLES
  # View the Go gitignore template
  $ gh repo gitignore view Go
  
  # View the Python gitignore template
  $ gh repo gitignore view Python
  
  # Create a new .gitignore file using the Go template
  $ gh repo gitignore view Go > .gitignore
  
  # Create a new .gitignore file using the Python template
  $ gh repo gitignore view Python > .gitignore

LEARN MORE
  Use `gh <command> <subcommand> --help` for more information about a command.
  Read the manual at https://cli.github.com/manual
  Learn about exit codes using `gh help exit-codes`
  Learn about accessibility experiences using `gh help accessibility`

