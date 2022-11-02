import path from 'path';
import { DataSourceOptions } from 'typeorm';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, MYSQL_DATABASE } = process.env;

export default {
  type: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASS,
  database: MYSQL_DATABASE,
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  timezone: 'Z',
  migrations: [path.join(`${__dirname}`, `/Migrations/*.js`)],
  migrationsRun: true,
  logger: 'file',
  logging: true,
} as DataSourceOptions;
