/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'pgNest',
  // entities: [User, Country, Region, Company],
  entities: ["dist/**/*.entity{ .ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions)
export default dataSource;