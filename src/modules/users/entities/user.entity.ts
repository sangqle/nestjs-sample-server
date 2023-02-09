import { Entity, Column, PrimaryGeneratedColumn, Long, Unique } from 'typeorm';
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

  toJSonResponse() {
    delete this['password'];
    delete this['is_deleted'];
    return this;
  }
}
