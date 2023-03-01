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
import { Exclude, instanceToPlain } from 'class-transformer';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({
    type: 'bigint',
  })
  updated_at: number;

  @Column()
  @Exclude()
  is_deleted: boolean;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  google_id: string;

  @OneToMany(() => Role, (role) => role.user)
  roles: Role[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
