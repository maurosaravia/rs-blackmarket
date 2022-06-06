import { LoginDTO } from '@users/dtos/login.dto';
import { IsString } from 'class-validator';

export class UserDTO extends LoginDTO {
  @IsString()
  firstname?: string;

  @IsString()
  lastname?: string;
}
