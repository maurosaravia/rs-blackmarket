import { Role } from '@users/entities/role.enum';

export interface JwtPayload {
  userId: number;
  role: Role;
}
