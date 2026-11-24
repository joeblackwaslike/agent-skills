---
title: Relational Database Management System
description: Running Dolt as a real database server, not just a CLI tool.
source: "https://www.dolthub.com/docs/concepts/dolt/rdbms.md"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "48b9d9ce2564566fbc061648df153be7f757262513b40120dee7480c817f3d70"
---

Dolt can be used as a Relational Database Management System or RDBMS. Dolt ships with [a MySQL compatible server](/concepts/dolt/rdbms/server) built in, accessed via the [`dolt sql-server` command](/cli-reference/cli#dolt-sql-server).

Dolt supports [backups](/concepts/dolt/rdbms/backups). There are two options for backups: [remotes](/concepts/dolt/git/remotes) or [backups](/concepts/dolt/rdbms/backups). Pushing to a remote only backs up committed changes. Using `dolt backup` backs up uncommitted changes as well. Backups are accessed via the [`dolt backup` command](/cli-reference/cli#dolt-backup) or [dolt_backup() procedure](/sql-reference/version-control/dolt-sql-procedures#doltbackup).

Dolt leverages Git-style [remotes](/concepts/dolt/git/remotes) to facilitate replication. The master and replicas configure the same remote. On the master, you configure "push on write" and on the replicas you configure "pull on read". 
