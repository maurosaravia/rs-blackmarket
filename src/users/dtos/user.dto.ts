import { Role } from '@users/entities/role.enum';
import { IsEnum } from 'class-validator';
import { SignUpDTO } from '@auth/dtos/signup.dto';

export class UserDTO extends SignUpDTO {
  @IsEnum(Role)
  role: Role;
}
