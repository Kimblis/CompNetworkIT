import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

import { ReservationTypeEnum } from '#GlobalTypes';

export class CreateDatabaseTables1651657869761 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', isGenerated: true, isPrimary: true, type: 'integer', generationStrategy: 'increment' },
          { name: 'name', type: 'varchar' },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'password', type: 'varchar' },
          { name: 'phone', type: 'varchar', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'admins',
        columns: [
          { name: 'id', isGenerated: true, isPrimary: true, type: 'integer', generationStrategy: 'increment' },
          { name: 'userId', type: 'integer', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'managers',
        columns: [
          { name: 'id', isGenerated: true, isPrimary: true, type: 'integer', generationStrategy: 'increment' },
          { name: 'userId', type: 'integer', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'groupReservations',
        columns: [
          { name: 'id', isGenerated: true, isPrimary: true, type: 'integer', generationStrategy: 'increment' },
          { name: 'userId', type: 'integer', isNullable: true },
          { name: 'groupId', type: 'integer', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'groups',
        columns: [
          { name: 'id', isGenerated: true, isPrimary: true, type: 'integer', generationStrategy: 'increment' },
          { name: 'adminId', type: 'integer', isNullable: true },
          { name: 'type', type: 'enum', enum: Object.values(ReservationTypeEnum) },
          { name: 'destination', type: 'varchar' },
          { name: 'description', type: 'varchar', isNullable: true },
          { name: 'startDate', type: 'timestamp', precision: 3 },
          { name: 'endDate', type: 'timestamp', precision: 3 },
          { name: 'groupSize', type: 'integer', default: 1, isNullable: true },
          { name: 'price', type: 'integer', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'admins',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'managers',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'groupReservations',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'groupReservations',
      new TableForeignKey({
        columnNames: ['groupId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'groups',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'groups',
      new TableForeignKey({
        columnNames: ['adminId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'admins',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
