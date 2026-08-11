---
name: local-tool-inspection
description: How to go beyond a tool's public docs when building a working-with-X skill for a locally-installed ecosystem (Pieces, Docker Desktop, Obsidian, etc.)
---

# Inspecting a locally-installed tool ecosystem

For a `working-with-X` skill wrapping a tool that runs **locally** (a desktop app, a daemon, an
IDE plugin ecosystem) rather than a pure library/API, the public docs alone under-serve an agent
operating against the real running system. Go beyond them:

1. **Live machine inspection.** Run `ps aux`, `lsof -i`, `find ~/Library -name ...`,
   `sqlite3 .tables`/`.schema` against the actual running installation. Document: process names +
   binaries, network ports (and whether they're fixed or dynamically assigned), all storage
   paths, database schema (tables + column types), config files + their contents, ML model files
   + sizes, log locations.

2. **Event schemas from plugins.** For each extension (IDE plugin, browser extension, Obsidian
   plugin, etc.) that feeds the tool, document: what user gestures trigger captures, the full
   JSON schema of the data sent to the daemon, and which capture modality/storage tier the events
   land in.

3. **Retention limits and workarounds.** When covering a memory/storage system, always answer:
   what is the hard limit, is it configurable, and what is the documented escape hatch for
   indefinite storage (if one exists).

4. **Auto-update script, three layers** (see the
   [doc-fetching cookbook](doc-fetching-cookbook.md) for the general mechanics):
   - Full rewrite for catalog/resource files (from upstream GitHub READMEs)
   - Marker-bounded section replacement (`<!-- BEGIN:auto-updated:KEY -->`) for files that mix
     curated + auto content
   - Inline version-number replacement from npm/PyPI registries
   - Staleness warning (not blocking) for files that require manual live inspection — an
     inspection-derived file can't be safely re-fetched automatically, so flag it as possibly
     stale instead of silently trusting it forever

**Why this matters:** the skill needs to be useful for agents operating against the real
installed system, not just as a documentation mirror. The event schemas and runtime internals
are exactly the parts that are hardest to find anywhere else, and they're also the parts a
generic "fetch the official docs" script cannot produce. Before writing any reference file for a
locally-installed tool, run inspection commands first, then write content from what you actually
observe — don't rely solely on public docs.

Validated building [`working-with-pieces`](../../working-with-pieces/SKILL.md)'s
`references/pieces-os-internals.md` and `references/long-term-memory.md`.
