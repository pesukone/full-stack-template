import pgpInit, { IDatabase } from 'pg-promise';
import { getDatabaseSSL } from '../../src/common/config';
import getTestConfig from './testConfig';

let testDb: IDatabase<Record<string, unknown>> | null = null;

const getTestDb = async () => {
  if (testDb) {
    return testDb;
  }

  const testConfig = await getTestConfig();
  if (!testDb) {
    // Initialize DB
    const pgp = pgpInit({
      // Initialization options
    });

    const cn = {
      host: testConfig.DATABASE_HOST,
      port: testConfig.DATABASE_PORT,
      database: testConfig.DATABASE_NAME,
      user: testConfig.DATABASE_USER,
      password: testConfig.DATABASE_PASSWORD,
      poolSize: testConfig.DATABASE_POOL_MAX,
      ssl: getDatabaseSSL(testConfig, testConfig),
    };

    testDb = pgp(cn);
  }

  return testDb;
};

export default getTestDb;
