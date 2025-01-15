import pgMigrate from 'node-pg-migrate';
import {
  DATABASE_URL,
  HTTP_PORT,
  MIGRATIONS_DIR,
  MIGRATIONS_TABLE,
} from './constants';
import { app } from './app';
import { pool } from './pool';
import { seed } from './seed';

(async () => {
  await pgMigrate({
    databaseUrl: DATABASE_URL,
    migrationsTable: MIGRATIONS_TABLE,
    dir: MIGRATIONS_DIR,
    direction: 'up',
  });
  await seed(pool);
  app.listen(HTTP_PORT, () => {
    console.log(`LIstening on port ${HTTP_PORT}`);
  });
})().catch(console.error);
