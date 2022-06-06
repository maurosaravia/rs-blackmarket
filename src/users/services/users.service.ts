import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserDTO } from '@users/dtos/user.dto';
import { Role } from '@users/entities/role.enum';
import { User } from '@users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  comparePassword(password: string, hashedPassword: string): boolean {
    return compareSync(password, hashedPassword);
  }

  hashPassword(password: string): string {
    return hashSync(password, genSaltSync());
  }

  hashUserPassword(user: User): void {
    user.password = this.hashPassword(user.password);
  }

  async exists(id: number): Promise<boolean> {
    return (await this.usersRepo.count({ id: id })) > 0;
  }

  listUsers(): Promise<User[]> {
    return this.usersRepo.find();
  }

  listAdmins(): Promise<User[]> {
    return this.usersRepo.find({ where: { role: Role.ADMIN } });
  }

  showUser(id: number): Promise<User> {
    return this.usersRepo.findOne(id);
  }

  showUserByEmail(email: string): Promise<User> {
    return this.usersRepo.findOne({ where: { email: email } });
  }

  create(dto: UserDTO): Promise<User> {
    const user = this.usersRepo.create(dto);
    this.hashUserPassword(user);
    return this.usersRepo.save(user);
  }

  async editUser(id: number, dto: UserDTO): Promise<User> {
    const user = await this.usersRepo.findOne(id);
    this.usersRepo.merge(user, dto);
    if (dto.password) {
      this.hashUserPassword(user);
    }
    return this.usersRepo.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepo.delete(id);
  }
}
