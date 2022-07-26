import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { UsersRepository } from '@users/repositories/users.repository';
import { UserDTO } from '@users/dtos/user.dto';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepo: UsersRepository,
  ) {}

  private hashPassword(password: string): string {
    return hashSync(password, genSaltSync());
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async findOne(id: number): Promise<User> {
    const category = await this.usersRepo.findById(id);
    if (!category) throw new NotFoundException();
    return category;
  }

  async create(createUserDto: UserDTO): Promise<User> {
    createUserDto.password = this.hashPassword(createUserDto.password);
    const user = await this.usersRepo.saveDTO(createUserDto);
    delete user.password;
    return user;
  }
}
