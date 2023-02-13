import { Role } from 'src/modules/roles/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Long,
  Unique,
  OneToMany,
} from 'typeorm';
@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  phone_number: string;

  @Column()
  updated_at: number;

  @Column()
  is_deleted: boolean;

  @Column()
  password: string;

  @OneToMany(() => Role, (role) => role.user)
  roles: Role[];

  toJSonResponse() {
    delete this['password'];
    delete this['is_deleted'];
    return this;
  }
}
