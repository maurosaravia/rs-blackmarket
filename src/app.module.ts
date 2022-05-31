import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'msaravia',
      password: 'msaravia',
      database: 'blackmarket',
      entities: ['dist/**/*.entity.ts'],
      synchronize: false,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
  ],
})
export class AppModule {}
