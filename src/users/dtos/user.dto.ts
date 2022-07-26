import { Role } from '@users/entities/role.enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IUser } from '@users/interfaces/user.interface';
import { PASSWORD_ERROR, PASSWORD_REGEX } from 'src/users/constants/utils';

export class UserDTO {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstname: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, {
    message: PASSWORD_ERROR,
  })
  password: string;

  @IsEnum(Role)
  role: Role;

  constructor(user: IUser) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role ?? Role.USER;
  }
}
