import { Role } from '@users/entities/role.enum';
import { IsEnum } from 'class-validator';
import { SignUpDTO } from '@auth/dtos/signup.dto';
import { IUser } from '../interfaces/user.interface';
export class UserDTO extends SignUpDTO {
  @IsEnum(Role)
  role: Role;

  constructor(user: IUser) {
    super();
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role ?? Role.USER;
  }
}
