---
title: Version Control in Dolt
description: The SQL surface for Dolt's version control — the part no other SQL database has.
source: "https://www.dolthub.com/docs/sql-reference/version-control.md"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "7519594af1716cf7742688841c44c6322f9b20066722ca0ddb29aaa210194f96"
---

Unlike other relational databases, Dolt has multiple branches and
stores all data in a commit graph, like git. This makes it possible to
efficiently diff any two commits, as well as merge one branch into
another. All the git-like version control functionality available on
the Dolt CLI is available in the SQL server as well, exposed as system
tables, system variables, functions, and stored procedures.

## Version control overview

* [Using Branches](/sql-reference/version-control/branches) explains how to work with different
  branches in a running server.
* [Merges](/sql-reference/version-control/merges) explains how to merge branches into one
  another and resolve merge conflicts using SQL.
* [Querying History](/sql-reference/version-control/querying-history) describes how to query
  past revisions or different branches of a database.
* [Using Remotes](/sql-reference/version-control/remotes) describes how to use remotes to
  coordinate between Dolt clones.
* [Stored procedures](/sql-reference/version-control/dolt-sql-procedures) documents all the
  stored procedures that implement version control operations such as
  `DOLT_COMMIT`, `DOLT_CHECKOUT`, `DOLT_MERGE`, etc.
* [Functions](/sql-reference/version-control/dolt-sql-functions) documents Dolt-provided
  functions that aren't part of standard MySQL, including table
  functions that produce diffs of any table at two points in its
  history.
* [System tables](/sql-reference/version-control/dolt-system-tables) describes the system tables
  that provide read access to version control information, such as
  branches, commit log, diffs, and conflicts.
* [System variables](/sql-reference/version-control/dolt-sysvars) documents all the
  Dolt-provided system variables that expose and control various
  aspects of Dolt's behavior.
* [Saved Queries](/sql-reference/version-control/saved-queries) documents a Dolt feature to save
  queries for later execution.
