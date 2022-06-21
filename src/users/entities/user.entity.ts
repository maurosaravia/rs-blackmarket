import { Base } from 'src/entities/base.entity';
import { Entity, Column } from 'typeorm';
import { Role } from '@users/entities/role.enum';

@Entity({ name: 'users' })
export class User extends Base {
  @Column('character varying', { length: 50 })
  firstname?: string;

  @Column('character varying', { length: 50 })
  lastname?: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role!: Role;
}
