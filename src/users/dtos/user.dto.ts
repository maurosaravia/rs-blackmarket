import { Role } from '@users/entities/role.enum';
import { IsEnum } from 'class-validator';
import { SignUpDTO } from '@auth/dtos/signup.dto';
import { IUser } from '@users/interfaces/user.interface';
export class UserDTO extends SignUpDTO {
  @IsEnum(Role)
  role: Role;

  constructor(user: IUser) {
    const { role, ...iSignup } = user;
    super(iSignup);
    this.role = role ?? Role.USER;
  }
}
