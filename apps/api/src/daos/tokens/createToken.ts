import { sql } from '@ts-safeql/sql-tag';
import { DbClient, getRow } from '../../pool';

export const createToken = (client: DbClient, values: { userId: number }) => {
  return getRow(
    client.query<{ id: number; token: string; user_id: number }>(
      sql`INSERT INTO tokens (user_id) VALUES (${values.userId}) RETURNING *`,
    ),
  );
};
