import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PASSWORD_ERROR, PASSWORD_REGEX } from '@users/constants/utils';
import { ISignup } from '@auth/interfaces/signup.interface';

export class SignUpDTO {
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

  constructor(user: ISignup) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
  }
}
