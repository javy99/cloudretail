import pgMigrate from 'node-pg-migrate';
import { DATABASE_URL, MIGRATIONS_DIR, MIGRATIONS_TABLE } from './constants';

(async () => {
  await pgMigrate({
    databaseUrl: DATABASE_URL,
    migrationsTable: MIGRATIONS_TABLE,
    dir: MIGRATIONS_DIR,
    direction: 'up',
  });
})().catch(console.error);
