import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { UsersRepository } from '@users/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepo: UsersRepository,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.usersRepo.find();
      return users;
    } catch (exception) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const category = await this.usersRepo.findById(id);
      return category;
    } catch (exception) {
      if (exception instanceof EntityNotFoundError)
        throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }
}
