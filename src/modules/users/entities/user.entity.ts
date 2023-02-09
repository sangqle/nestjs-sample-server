import { Entity, Column, PrimaryGeneratedColumn, Long } from 'typeorm';

@Entity()
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
}
