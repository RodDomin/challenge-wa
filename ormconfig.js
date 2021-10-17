module.exports = {
  type: 'postgres',
  host: process.env.HOST_DB,
  username: process.env.USER_DB,
  password: process.env.PASS_DB,
  database: process.env.NAME_DB,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: './src/migrations'
  }
}
