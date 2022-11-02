import type { Connection, EntityManager } from 'typeorm';

export async function runInTransaction<T>(connection: Connection, cb: (entityManager: EntityManager) => Promise<T>): Promise<T> {
  let result: T;

  const queryRunner = connection.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  const entityManager = queryRunner.manager;

  try {
    result = await cb(entityManager);

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }

  return result;
}
