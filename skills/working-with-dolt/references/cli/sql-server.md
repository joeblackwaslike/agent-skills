---
source: "dolt sql-server --help @ 2.1.7"
fetched_at: "2026-06-15T20:08:28.186Z"
sha256: "c4ba092954915519982e1b4d3fdb2adb12d7e40b3ff2aa851949f094c3f33e86"
---

NAME
	dolt sql-server - Start a MySQL-compatible server.

SYNOPSIS
	dolt sql-server --config <file>
	dolt sql-server [-H <host>] [-P <port>] [-t <timeout>] [-l <loglevel>] [--data-dir <directory>] [-r]

DESCRIPTION
	By default, starts a MySQL-compatible server on the dolt database in the current directory. Databases are named after
	the directories they appear in.Parameters can be specified using a yaml configuration file passed to the server via
	--config <file>, or by using the supported switches and flags to configure the server directly on the command line. If
	--config <file> is provided all other command line arguments are ignored.
	
	This is an example yaml configuration file showing all supported items and their default values:
	
		log_level: info
		log_format: text
		behavior:
		  read_only: false
		  autocommit: true
		  disable_client_multi_statements: false
		  dolt_transaction_commit: false
		  event_scheduler: "ON"
		  auto_gc_behavior:
		    enable: true
		    archive_level: 1
		  branch_activity_tracking: false
		listener:
		  host: localhost
		  port: 3306
		  max_connections: 1000
		  back_log: 50
		  max_connections_timeout_millis: 60000
		  read_timeout_millis: 28800000
		  write_timeout_millis: 28800000
		data_dir: .
		cfg_dir: .doltcfg
		privilege_file: .doltcfg/privileges.db
		branch_control_file: .doltcfg/branch_control.db
		user_session_vars: []
		jwks: []
		metrics:
		  labels: {}
		  port: -1
		  tls_cert: ""
		  tls_key: ""
		  tls_ca: ""
		  jwt_required_for_localhost: false
	
	
	
	ENVIRONMENT VARIABLE INTERPOLATION:
	
	SQL server yaml configs support environment variable interpolation:
	
	  ${VAR}             Expands to the value of VAR (error if VAR is unset or empty)
	  $$                Escapes to a literal '$'
	
	Notes:
	  - Interpolation happens before YAML parsing.
	  - Quote values for string fields when needed (e.g. values containing ':'), but do not quote placeholders intended for
	  numeric/bool fields.
	
	SUPPORTED CONFIG FILE FIELDS:
	
	data_dir: A directory where the server will load dolt databases to serve, and create new ones. Defaults to the current
	directory.
	
	cfg_dir: A directory where the server will load and store non-database configuration data, such as permission
	information. Defaults $data_dir/.doltcfg.
	
	log_level: Level of logging provided. Options are: trace, debug, info, warning, error, and fatal.
	
	log_format: Format of logging provided. Options are: text, json.
	
	privilege_file: "Path to a file to load and store users and grants. Defaults to $doltcfg-dir/privileges.db. Will be
	created automatically if it doesn't exist.
	
	branch_control_file: Path to a file to load and store branch control permissions. Defaults to
	$doltcfg-dir/branch_control.db. Will be created as needed.
	
	max_logged_query_len: If greater than zero, truncates query strings in logging to the number of characters given.
	
	behavior.read_only: If true database modification is disabled. Defaults to false.
	
	behavior.autocommit: If true every statement is committed automatically. Defaults to true. @@autocommit can also be
	specified in each session.
	
	behavior.dolt_transaction_commit: If true all SQL transaction commits will automatically create a Dolt commit, with a
	generated commit message. This is useful when a system working with Dolt wants to create versioned data, but doesn't
	want to directly use Dolt features such as dolt_commit(). 
	
	behavior.auto_gc_behavior.enabled: If true, garbage collection will run automatically in the background. 
	
	listener.host: The host address that the server will run on.  This may be localhost or an IPv4 or IPv6 address
	
	listener.port: The port that the server should listen on
	
	listener.max_connections: The number of simultaneous connections that the server will accept
	
	listener.back_log: The number of simultaneous connections that the server will allow to block waiting for a connection
	before new connections result in immediate rejection. Default 50.
	
	listener.max_wait_connections_timeout: The maximum amount of time that a connection will block waiting for a connection
	before being rejected.
	
	listener.read_timeout_millis: The number of milliseconds that the server will wait for a read operation.
	
	listener.write_timeout_millis: The number of milliseconds that the server will wait for a write operation.
	
	listener.require_secure_transport: Boolean flag to turn on TLS/SSL transport.
	
	listener.require_client_cert: Boolean flag to require all connections present a certificate. This implies that all
	connections must be over TLS, so listener.tls_key and listener.tls_cert must also be set.
	
	listener.ca_cert: The path to a Certificate Authority (CA) certificate used to validate client certificates.
	
	listener.tls_cert: The path to the TLS certificate used for secure transport.
	
	listener.tls_key: The path to the TLS key used for secure transport.
	
	remotesapi.port: A port to listen for remote API operations on. If set to a positive integer, this server will accept
	connections from clients to clone, pull, etc. databases being served.
	
	remotesapi.read_only: Boolean flag which disables the ability to perform pushes against the server.
	
	system_variables: A map of system variable name to desired value for all system variable values to override.
	
	user_session_vars: A map of user name to a map of session variables to set on connection for each session.
	
	cluster: Settings related to running this server in a replicated cluster. For information on setting these values, see
	https://dolthub.com/docs/sql-reference/server/replication
	
	If a config file is not provided many of these settings may be configured on the command line.

OPTIONS
	--config=<file>
	  When provided configuration is taken from the yaml config file and all command line parameters are ignored.
	
	-H <host address>, --host=<host address>
	  Defines the host address that the server will run on. Defaults to `localhost`.
	
	-P <port>, --port=<port>
	  Defines the port that the server will run on. Defaults to `3306`.
	
	-u <user>, --user=<user>
	  This option is no longer supported. Instead, you can create users using CREATE USER and GRANT SQL statements.
	
	--skip-root-user-initialization
	  Skips the automatic creation of a default root super user on the first launch of a SQL server.
	
	-p <password>, --password=<password>
	  This option is no longer supported. Instead, you can create users using CREATE USER and GRANT SQL statements.
	
	-t <connection timeout>, --timeout=<connection timeout>
	  Defines the timeout, in seconds, used for connections
	  A value of `0` represents an infinite timeout. Defaults to `28800000`.
	
	-r, --readonly
	  Disable modification of the database.
	
	-l <log level>, --loglevel=<log level>
	  Defines the level of logging provided
	  Options are: `trace`, `debug`, `info`, `warning`, `error`, `fatal`. Defaults to `info`.
	
	-f <log format>, --logformat=<log format>
	  Defines the output format of the server log
	  Options are: `text`, `json`. Defaults to `text`.
	
	--data-dir=<directory>
	  Defines a directory to find databases to serve. Defaults to the current directory.
	
	--multi-db-dir=<directory>
	  Deprecated, use `--data-dir` instead.
	
	--doltcfg-dir=<directory>
	  Defines a directory that contains non-database storage for dolt. Defaults to `$data-dir/.doltcfg`. Will be created
	  automatically as needed.
	
	--no-auto-commit
	  Set @@autocommit = off for the server.
	
	--query-parallelism=<num-go-routines>
	  Deprecated, no effect in current versions of Dolt
	
	--max-connections=<max-connections>
	  Set the number of connections handled by the server. Defaults to `1000`.
	
	--back-log=<back-log>
	  Set the number of connections that can block waiting for a connection before new connections are rejected. Defaults to
	  `50`.
	
	--max-connections-timeout=<max-connections-timeout>
	  Set the maximum duration that a connection will block waiting for a connection before being rejected. Defaults to
	  `1m0s`.
	
	--privilege-file=<privilege file>
	  Path to a file to load and store users and grants. Defaults to `$doltcfg-dir/privileges.db`. Will be created as needed.
	
	--branch-control-file=<branch control file>
	  Path to a file to load and store branch control permissions. Defaults to `$doltcfg-dir/branch_control.db`. Will be
	  created as needed.
	
	--allow-cleartext-passwords=<allow-cleartext-passwords>
	  Allows use of cleartext passwords. Defaults to false.
	
	--socket=<socket file>
	  Path for the unix socket file. Defaults to '/tmp/mysql.sock'.
	
	--remotesapi-port=<remotesapi port>
	  Sets the port for a server which can expose the databases in this sql-server over remotesapi, so that clients can clone
	  or pull from this server.
	
	--remotesapi-readonly
	  Disable writes to the sql-server via the push operations. SQL writes are unaffected by this setting.
	
	--golden=<mysql connection string>
	  Provides a connection string to a MySQL instance to be used to validate query results
	
	--event-scheduler=<status>
	  Determines whether the Event Scheduler is enabled and running on the server. It has one of the following values: 'ON',
	  'OFF' or 'DISABLED'.
	
	--mcp-port=<port>
	  If provided, runs a Dolt MCP HTTP server on this port alongside the sql-server.
	
	--mcp-user=<user>
	  SQL user for MCP to connect as (required when --mcp-port is set).
	
	--mcp-password=<password>
	  Optional SQL password for MCP to connect with (requires --mcp-user).
	
	--mcp-database=<database>
	  Optional SQL database name MCP should connect to (requires --mcp-port and --mcp-user).
	
