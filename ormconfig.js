const path = require('path');
const dotenv = require('dotenv');

const ENV = process.env.NODE_ENV;
if (!ENV) {
  throw new Error('Cannot run. NODE_ENV is not defined')
}
dotenv.config({ path: path.resolve(__dirname, !ENV ? '.env' : `.env.${ENV}`) });

module.exports = {
  retryAttempts: 10,
  type: process.env.TYPEORM_CONNECTION || 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT || 5432),
  username: process.env.TYPEORM_USERNAME || 'localhost',
  password: process.env.TYPEORM_PASSWORD || 'localhost',
  database: process.env.TYPEORM_DATABASE || 'localhost',
  logging: process.env.TYPEORM_LOGGING || false,
  entities: [
    path.resolve(
      __dirname,
      'src',
      process.env.TYPEORM_ENTITIES || '**/*.entity.ts',
    ),
  ],
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE || true),
  migrationsTableName: 'custom_migration_table',
  migrations: [path.resolve('migrations/*.ts')],
  cli: { migrationsDir: 'migrations' },
};
