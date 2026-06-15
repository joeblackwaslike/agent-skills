---
source: "dolt constraints verify --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "d76062ee029d77ac5e8c5651d558608b305c54e7a42720de4c0d6989a799847c"
---

NAME
	dolt constraints verify - Verifies that working set changes satisfy table constraints

SYNOPSIS
	dolt constraints verify [--all] [--output-only] [<table>...]

DESCRIPTION
	Verifies that inserted or modified rows in the working set satisfy the defined table constraints.
	               If any constraints are violated, they are documented in the dolt_constraint_violations system table.
	               By default, this command does not consider row changes that have been previously committed.

OPTIONS
	<table>
	  The table(s) to check constraints on. If omitted, checks all tables.
	
	-a, --all
	  Verifies that all rows in the database do not violate constraints instead of just rows modified or inserted in the
	  working set.
	
	-o, --output-only
	  Disables writing violated constraints to the constraint violations table.
	
