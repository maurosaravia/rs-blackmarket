import { EntityRepository, Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { UserDTO } from '@users/dtos/user.dto';
import { BadRequestException } from '@nestjs/common';
import { EMAIL_ERROR, ROUTINE_UNIQUE } from '@users/constants/utils';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findById(id: number): Promise<User> {
    return this.findOne(id);
  }

  saveDTO(createUserDto: UserDTO): Promise<User> {
    const user = this.create(createUserDto);
    return this.save(user).catch((e) => {
      if (e.routine == ROUTINE_UNIQUE)
        throw new BadRequestException(EMAIL_ERROR);
      else throw e;
    });
  }
}
