import { EntityRepository, Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { UserDTO } from '@users/dtos/user.dto';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findById(id: number): Promise<User> {
    return this.findOne(id);
  }

  createUser(createUserDto: UserDTO): Promise<User> {
    const user = this.create(createUserDto);
    return this.save(user).catch((e) => {
      if (e.routine == '_bt_check_unique')
        throw new BadRequestException(
          'Email is already in use, choose a new one',
        );
      else throw e;
    });
  }
}
