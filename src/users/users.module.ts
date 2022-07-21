import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '@users/controllers/users.controller';
import { UsersService } from 'src/users/services/users.service';
import { User } from '@users/entities/user.entity';
import { UsersRepository } from '@users/repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
