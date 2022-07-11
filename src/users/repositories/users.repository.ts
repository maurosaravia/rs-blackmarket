import { EntityRepository, Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { UserDTO } from '@users/dtos/user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findById(id: number): Promise<User> {
    return this.findOne(id);
  }

  createUser(createUserDto: UserDTO): Promise<User> {
    const user = this.create(createUserDto);
    return this.save(user);
  }
}
