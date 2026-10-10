---
title: Related Projects
description: Adjacent, independent projects that solve neighboring problems and compose well with beads
source: "https://raw.githubusercontent.com/gastownhall/beads/v1.3.1/docs/related-projects.md"
fetched_at: "2026-10-10T20:16:16.873Z"
sha256: "3f7e2f49ec09f012ff6ad5ddbd8ed906f475bf452511320f53dfd99b26f5164d"
---

Adjacent or complementary tools that solve different problems in the
same neighborhood as Beads. These are not Beads integrations (see
[Community Tools](/community-tools) for those) — they are
independent projects whose users may also find Beads useful, or vice
versa.

## Recall / knowledge graph

- **[scry](https://github.com/prmichaelsen/scry)** —
  ([scryspec.com](https://scryspec.com)) — marker-indexed knowledge
  and recall graph for AI coding agents. Files declare identity via
  inline `@scry.entry` markers; the index makes designs, lessons, and
  decisions reachable by meaning, tag, and seeded question rather than
  by path. Different job from Beads: where Beads is a task graph for
  *what to do next*, scry is a recall layer for *what was decided and
  why*. They compose — independently arrived at the same hash-based-ID
  convention (`bd-a1b2`, `~hash`) for the same reason: preventing
  collisions across multi-agent and multi-branch work.
