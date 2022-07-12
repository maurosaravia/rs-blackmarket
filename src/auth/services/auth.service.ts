import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@users/services/users.service';
import { SignUpDTO } from '@auth/dtos/signup.dto';
import { Role } from '@users/entities/role.enum';
import { User } from '@users/entities/user.entity';
import { SignInDTO } from '@auth/dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@auth/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDTO): Promise<User> {
    return this.usersService.create({ ...signUpDto, role: Role.USER });
  }

  async signIn(signInDto: SignInDTO): Promise<{ accessToken }> {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (
      user &&
      this.usersService.checkPassword(signInDto.password, user.password)
    ) {
      const payload: JwtPayload = {
        userId: user.id,
        role: user.role,
      };
      const accessToken = this.jwtService.sign({ data: payload });
      return { accessToken };
    } else throw new UnauthorizedException('Invalid credentials');
  }
}
