---
source: "dolt ci import --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "963d5a8fbdf7ca40f25965f1168a8789bbab7e23588820ab45d25b82358481e3"
---

NAME
	dolt ci import - Import a Dolt continuous integration workflow file into the database

SYNOPSIS
	dolt ci import <file>

DESCRIPTION
	Import a Dolt continuous integration workflow file into the database 
	and create a Dolt commit.
	
	Workflow YAML Specification:
	
	  name: <workflow-name>
	
	  on:
	    push:
	      branches: [<branch-name>, ...]
	    pull_request:
	      branches: [<branch-name>, ...]
	      activities: [opened, closed, reopened, synchronized]
	    workflow_dispatch: {}
	
	  jobs:
	    - name: <job-name>
	      steps:
	        # Saved query step
	        - name: <step-name>
	          saved_query_name: <query-name>
	          saved_query_statement: <optional-sql-statement>
	          expected_columns: <optional-expected-columns>
	          expected_rows: <optional-expected-rows>
	
	        # Dolt test step
	        - name: <step-name>
	          dolt_test_groups: [<group-name>, ...]   # optional
	          dolt_test_tests:  [<test-name>,  ...]   # optional
