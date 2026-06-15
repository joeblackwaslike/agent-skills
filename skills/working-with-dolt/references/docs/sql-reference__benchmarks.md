---
title: Benchmarks
description: How Dolt performs versus MySQL, measured and published.
source: "https://www.dolthub.com/docs/sql-reference/benchmarks.md"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "d1f41e3a5ea5d25b7160cbc0a87c360a7a45625aa3c0cd1108085dab5e831532"
---

Dolt publishes benchmarks for its correctness and performance relative
to other relational databases. Additional benchmarks will be added
over time.

To learn more, click on a subsection heading.

* [SQL correctness](/sql-reference/benchmarks/correctness) tests Dolt's query engine against
  the `sqllogictest` suite for correctness issues.
* [Server latency](/sql-reference/benchmarks/latency) uses `sysbench` to compare Dolt's read
  and write latencies against MySQL.
* [Import latency](/sql-reference/benchmarks/import) uses a custom benchmark to compare Dolt's bulk import performance
  against MySQL's `LOAD DATA` command's performance.
