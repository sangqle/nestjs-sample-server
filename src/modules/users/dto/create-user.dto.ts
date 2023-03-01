import { Long } from 'typeorm';

export class CreateUserDto {
  userId: number;
  email: string;
  username: string;
  phoneNumber: string;
  updatedAt: number;
  isDeleted: boolean;
  password: string;
  googleId: string;
}
