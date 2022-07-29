import { Role } from '@users/entities/role.enum';
import { ISignup } from '@auth/interfaces/signup.interface';

export interface IUser extends ISignup {
  role: Role;
}
