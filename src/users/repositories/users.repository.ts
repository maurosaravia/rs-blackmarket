import { EntityRepository, Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findById(id: number): Promise<User> {
    return this.findOne(id);
  }
}
