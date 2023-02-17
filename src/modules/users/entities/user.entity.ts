import { Role } from 'src/modules/roles/entities/role.entity';
import * as bcrypt from 'bcryptjs';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  BeforeInsert,
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toJSonResponse() {
    delete this['password'];
    delete this['is_deleted'];
    return this;
  }
}
