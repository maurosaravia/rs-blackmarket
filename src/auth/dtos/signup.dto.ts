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
}
