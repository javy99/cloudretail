import crypto from 'node:crypto';
import { DbClient } from './pool';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from './constants';
import { NoRecordsFound } from './exceptions';
import { userDao } from './daos/users';

export const seed = async (client: DbClient) => {
  try {
    await userDao.selectByUsername(client, { username: ADMIN_USERNAME });
  } catch (error) {
    if (error instanceof NoRecordsFound) {
      await userDao.createUser(client, {
        username: ADMIN_USERNAME,
        password: crypto.hash('sha256', ADMIN_PASSWORD),
      });
      console.info('Admin user created');
    }
  }
  console.info('Seeding completed');
};
