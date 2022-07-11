import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { UsersRepository } from '@users/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepo: UsersRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async findOne(id: number): Promise<User> {
    const category = await this.usersRepo.findById(id);
    if (!category) throw new NotFoundException();
    return category;
  }
}
