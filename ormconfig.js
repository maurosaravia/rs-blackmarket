module.exports = {
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNCHRONIZE == 'true',
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
