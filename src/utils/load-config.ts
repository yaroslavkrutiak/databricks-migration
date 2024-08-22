import { config } from 'dotenv';
import { join } from 'path';
import { ValidationError } from 'yup';

import { ConfigOption } from '../constants';
import { ConnectionConfig } from '../session';
import { CONFIG_SCHEMA_ENV, CONFIG_SCHEMA_GIVEN } from '../validation';
import { fail } from '.';

export function loadConfig(args: Record<string, unknown>): ConnectionConfig {
  const areThereAnyGivenConfigVars = (() => {
    const legitOptions = Object.keys(ConfigOption);
    const givenOptions = Object.keys(args ?? {});
    return givenOptions.some((option) => legitOptions.includes(option));
  })();

  if (!areThereAnyGivenConfigVars) {
    let envs = null;
    if (args?.['noEnvFile']) {
      envs = process.env;
    } else {
      const { error, parsed } = config({
        path: (args.env as string) ?? join(process.cwd(), '.env'),
      });
      if (error) {
        fail(error);
      }
      envs = parsed;
    }
    try {
      const configEnv = CONFIG_SCHEMA_ENV.validateSync(envs ?? {}, {
        strict: true,
        stripUnknown: true,
        abortEarly: false,
      });
      return {
        connectionConfig: {
          host: configEnv.DATABRICKS_HOST,
          path: configEnv.DATABRICKS_PATH,
          token: configEnv.DATABRICKS_ACCESS_TOKEN,
          authType: 'access-token',
        },
        sessionConfig: {
          initialCatalog: configEnv.DATABRICKS_CATALOG,
          initialSchema: configEnv.DATABRICKS_SCHEMA,
        },
      };
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error.errors.join('\n');
      }
    }
  }

  try {
    const configGiven = CONFIG_SCHEMA_GIVEN.validateSync(args, {
      strict: true,
      stripUnknown: true,
      abortEarly: false,
    });

    return {
      connectionConfig: {
        host: configGiven.host,
        path: configGiven.path,
        token: configGiven.token,
        authType: 'access-token',
      },
      sessionConfig: {
        initialCatalog: configGiven.catalog,
        initialSchema: configGiven.schema,
      },
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error.errors.join('\n');
    }
  }
  throw 'Invalid configuration';
}
