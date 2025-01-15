import pgMigrate from 'node-pg-migrate';
import { DATABASE_URL, MIGRATIONS_DIR, MIGRATIONS_TABLE } from './constants';
import { seed } from './seed';
import { pool } from './pool';

(async () => {
  await pgMigrate({
    databaseUrl: DATABASE_URL,
    migrationsTable: MIGRATIONS_TABLE,
    dir: MIGRATIONS_DIR,
    direction: 'up',
  });
  await seed(pool);
})().catch(console.error);
