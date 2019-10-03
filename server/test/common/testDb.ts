import pgpInit, { IDatabase } from 'pg-promise';
import testConfig from './testConfig';

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
  ssl: testConfig.DATABASE_SSL_ENABLED,
};

const testDb: IDatabase<{}> = pgp(cn);

export default testDb;
