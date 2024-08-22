# databricks-migration

Helper CLI to apply migrations to a databricks sql warehouse

**Overview:**

This tool simplifies the process of creating and applying SQL migrations for your Databricks tables. It manages migration versions, ensuring a smooth and predictable workflow when evolving your data schema.

**Installation:**
The `databricks-migration` tool is assumed to be installed and accessible globally through npm or yarn. You can install it using the following commands:

```sh
npm i --save-dev databricks-migration
```

```sh
yarn add databricks-migration --dev
```

**Usage:**

The tool is invoked using the following syntax:

```
databricks-migration <command> [options]
```

**Available Commands:**

- **init:** Initializes the migration environment by creating a dedicated folder for migration files and a table to track migration versions.
- **create:** Generates a new SQL migration file with a timestamped filename. You can optionally specify a custom name using the `-n` flag.
- **apply:** Applies all unapplied migrations in ascending order based on their version numbers.
- **reset:** Drops the schema and then reapplies all migrations from scratch.

**Options:**

- `-h, --host`: Specifies the hostname of your Databricks workspace. (Optional)
- `-p, --path`: Defines the path to your Databricks workspace directory. (Optional)
- `-t, --token`: Provides your Databricks workspace access token. (Optional)
- `-c, --catalog`: Sets the catalog for your Databricks workspace. (Optional)
- `-s, --schema`: Defines the schema within your Databricks workspace for migrations. Created if not exists. (Optional)
- `-e, --env`: Sets the path to an environment file containing Databricks connection details. Defaults to `.env` in the current working directory. Supports environment variable expansion.
- `--noEnvFile`: Disables loading environment variables from `.env` or other specified options **if no `-h, --host`, `-p, --path`, `-s, --schema`, `-c, --catalog`, or `-t, --token` options are provided**. If this flag is set, the tool will rely solely on environment variables set in your shell for Databricks connection details.
- `-h, --help`: Displays the usage information and available options.

**Configuration:**

You can configure the tool through a `.env` file in your project directory, which should contain key-value pairs for connection details. Alternatively, set environment variables directly in your shell and run the tool with the `--noEnvFile` flag to load values from the environment.

```
DATABRICKS_HOST=your-databricks-host
DATABRICKS_PATH=your-databricks-path
DATABRICKS_TOKEN=your-databricks-access-token
DATABRICKS_CATALOG=your-databricks-catalog
DATABRICKS_SCHEMA=your-databricks-schema
```

You can also use the `--env` option to specify a custom path to an environment file. The tool will automatically load these values when running commands.

You can also specify these values directly as command-line options when invoking the tool.

`sh
databricks-migration apply --host your-databricks-host --path your-databricks-path --token your-databricks-access-token --catalog your-databricks-catalog --schema your-databricks-schema
`

**Example Usage:**

1. **Initializing the migration environment:**

```
databricks-migration init
```

2. **Creating a new migration file:**

```
databricks-migration create -n my_migration_script
```

3. **Applying unapplied migrations:**

```
databricks-migration apply
```

4. **Resetting the schema and reapplying migrations (use with caution):**

```
databricks-migration reset
```

**Error Handling:**

The tool provides informative error messages if invalid commands or missing arguments are encountered. It also exits with a non-zero status code in case of errors.

**Additional Notes:**

- Ensure you have the necessary permissions to access and modify objects within your Databricks workspace.
- The migration files follow a specific naming convention based on timestamps, making them easy to identify and track.

Bootstrapped with: [create-ts-lib-gh](https://github.com/glebbash/create-ts-lib-gh)

This project is [MIT Licensed](LICENSE).
