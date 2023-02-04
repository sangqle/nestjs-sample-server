import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  phone_number: string;

  @Column()
  updated_at: number;

  @Column({ default: true })
  is_deleted: boolean;

}
