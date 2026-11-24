---
source: "https://zsh.sourceforge.io/Guide/zshguide.html"
fetched_at: "2026-06-16T09:07:15.812Z"
sha256: "9825c3eacfa0e1e13c7a7cb02096eafc216176df055c6ae56d01274e0e4d0fee"
---

A User's Guide to the Z-Shell

A User's Guide to the Z-Shell

Peter Stephenson

2003/03/23

Table of Contents

Chapter 1: A short introduction

1.1: Other shells and other guides

1.2: Versions of zsh

1.3: Conventions

1.4: Acknowledgments

Chapter 2: What to put in your startup files

2.1: Types of shell: interactive and login shells

2.1.1: What is a login shell? Simple tests

2.2: All the startup files

2.3: Options

2.4: Parameters

2.4.1: Arrays

2.5: What to put in your startup files

2.5.1: Compatibility options: SH_WORD_SPLIT and others
2.5.2: Options for csh junkies
2.5.3: The history mechanism: types of history
2.5.4: Setting up history
2.5.5: History options
2.5.6: Prompts
2.5.7: Named directories
2.5.8: `Go faster' options for power users
2.5.9: aliases
2.5.10: Environment variables
2.5.11: Path
2.5.12: Mail
2.5.13: Other path-like things
2.5.14: Version-specific things
2.5.15: Everything else

Chapter 3: Dealing with basic shell syntax

3.1: External commands

3.2: Builtin commands

3.2.1: Builtins for printing
3.2.2: Other builtins just for speed
3.2.3: Builtins which change the shell's state
3.2.4: cd and friends
3.2.5: Command control and information commands
3.2.6: Parameter control
3.2.7: History control commands
3.2.8: Job control and process control
3.2.9: Terminals, users, etc.
3.2.10: Syntactic oddments
3.2.11: More precommand modifiers: exec, noglob
3.2.12: Testing things
3.2.13: Handling options to functions and scripts
3.2.14: Random file control things
3.2.15: Don't watch this space, watch some other
3.2.16: And also

3.3: Functions

3.3.1: Loading functions
3.3.2: Function parameters
3.3.3: Compiling functions

3.4: Aliases

3.5: Command summary

3.6: Expansions and quotes

3.6.1: History expansion
3.6.2: Alias expansion
3.6.3: Process, parameter, command, arithmetic and brace expansion
3.6.4: Filename Expansion
3.6.5: Filename Generation

3.7: Redirection: greater-thans and less-thans

3.7.1: Clobber
3.7.2: File descriptors
3.7.3: Appending, here documents, here strings, read write
3.7.4: Clever tricks: exec and other file descriptors
3.7.5: Multios

3.8: Shell syntax: loops, (sub)shells and so on

3.8.1: Logical command connectors
3.8.2: Structures
3.8.3: Subshells and current shell constructs
3.8.4: Subshells and current shells

3.9: Emulation and portability

3.9.1: Differences in detail
3.9.2: Making your own scripts and functions portable

3.10: Running scripts

Chapter 4: The Z-Shell Line Editor

4.1: Introducing zle

4.1.1: The simple facts
4.1.2: Vi mode

4.2: Basic editing

4.2.1: Moving
4.2.2: Deleting
4.2.3: More deletion

4.3: Fancier editing

4.3.1: Options controlling zle
4.3.2: The minibuffer and extended commands
4.3.3: Prefix (digit) arguments
4.3.4: Words, regions and marks
4.3.5: Regions and marks

4.4: History and searching

4.4.1: Moving through the history
4.4.2: Searching through the history
4.4.3: Extracting words from the history

4.5: Binding keys and handling keymaps

4.5.1: Simple key bindings
4.5.2: Removing key bindings
4.5.3: Function keys and so on
4.5.4: Binding strings instead of commands
4.5.5: Keymaps

4.6: Advanced editing

4.6.1: Multi-line editing
4.6.2: The builtin vared and the function zed
4.6.3: The buffer stack

4.7: Extending zle

4.7.1: Widgets
4.7.2: Executing other widgets
4.7.3: Some special builtin widgets and their uses
4.7.4: Special parameters: normal text
4.7.5: Other special parameters
4.7.6: Reading keys and using the minibuffer
4.7.7: Examples

Chapter 5: Substitutions

5.1: Quoting

5.1.1: Backslashes
5.1.2: Single quotes
5.1.3: POSIX quotes
5.1.4: Double quotes
5.1.5: Backquotes

5.2: Modifiers and what they modify

5.3: Process Substitution

5.4: Parameter substitution

5.4.1: Using arrays
5.4.2: Using associative arrays
5.4.3: Substituted substitutions, top- and tailing, etc.
5.4.4: Flags for options: splitting and joining
5.4.5: Flags for options: GLOB_SUBST and RC_EXPAND_PARAM
5.4.6: Yet more parameter flags
5.4.7: A couple of parameter substitution tricks
5.4.8: Nested parameter substitutions

5.5: That substitution again

5.6: Arithmetic Expansion

5.6.1: Entering and outputting bases
5.6.2: Parameter typing

5.7: Brace Expansion and Arrays

5.8: Filename Expansion

5.9: Filename Generation and Pattern Matching

5.9.1: Comparing patterns and regular expressions
5.9.2: Standard features
5.9.3: Extensions usually available
5.9.4: Extensions requiring EXTENDED_GLOB
5.9.5: Recursive globbing
5.9.6: Glob qualifiers
5.9.7: Globbing flags: alter the behaviour of matches
5.9.8: The function zmv

Chapter 6: Completion, old and new

6.1: Completion and expansion

6.2: Configuring completion using shell options

6.2.1: Ambiguous completions
6.2.2: ALWAYS_LAST_PROMPT
6.2.3: Menu completion and menu selection
6.2.4: Other ways of changing completion behaviour
6.2.5: Changing the way completions are displayed

6.3: Getting started with new completion

6.4: How the shell finds the right completions

6.4.1: Contexts
6.4.2: Tags

6.5: Configuring completion using styles

6.5.1: Specifying completers and their options
6.5.2: Changing the format of listings: groups etc.
6.5.3: Styles affecting particular completions

6.6: Command widgets

6.6.1: _complete_help
6.6.2: _correct_word, _correct_filename, _expand_word
6.6.3: _history_complete_word
6.6.4: _most_recent_file
6.6.5: _next_tags
6.6.6: _bash_completions
6.6.7: _read_comp
6.6.8: _generic
6.6.9: predict-on, incremental-complete-word

6.7: Matching control and controlling where things are inserted

6.7.1: Case-insensitive matching
6.7.2: Matching option names
6.7.3: Partial word completion
6.7.4: Substring completion
6.7.5: Partial words with capitals
6.7.6: Final notes

6.8: Tutorial

6.8.1: The dispatcher
6.8.2: Subcommand completion: _arguments
6.8.3: Completing particular argument types
6.8.4: The rest

6.9: Writing new completion functions and widgets

6.9.1: Loading completion functions: compdef
6.9.2: Adding a set of completions: compadd
6.9.3: Functions for generating filenames, etc.
6.9.4: The zsh/parameter module
6.9.5: Special completion parameters and compset
6.9.6: Fancier completion: using the tags and styles mechanism
6.9.7: Getting the work done for you: handling arguments etc.
6.9.8: More completion utility functions

6.10: Finally

Chapter 7: Modules and other bits and pieces Not written

7.1: Control over modules: zmodload

7.1.1: Modules defining parameters
7.1.2: Low-level system interaction
7.1.3: ZFTP

7.2: Contributed bits

7.2.1: Prompt themes

7.3: What's new in 4.1

Appendix 1: Obtaining zsh and getting more information Not written
