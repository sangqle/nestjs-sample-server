import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  username: string;

  @IsEmail()
  email: string;

  phone_number: string;

  @IsNotEmpty()
  password: string;

  updated_at: number;
}
