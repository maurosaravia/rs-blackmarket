import { Injectable } from '@nestjs/common';
import { UsersService } from '@users/services/users.service';
import { SignUpDTO } from '@auth/dtos/signup.dto';
import { Role } from '@users/entities/role.enum';
import { User } from '@users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(signUpDto: SignUpDTO): Promise<User> {
    return this.usersService.create({ ...signUpDto, role: Role.USER });
  }
}
