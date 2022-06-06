import { Base } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { Role } from '@users/entities/role.enum';

@Entity('users')
export class User extends Base {
  @Column({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  lastname?: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role!: Role;
}
