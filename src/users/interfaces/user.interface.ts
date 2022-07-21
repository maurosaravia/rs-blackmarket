import { Role } from '@users/entities/role.enum';

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
}
