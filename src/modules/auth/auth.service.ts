import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(auth: CreateAuthDto) {
    const user = this.usersService.findOneByUsername(auth.username);
    if (!user) {
      return null;
    }
    // Compare passwork here
    const payload = { sub: auth.username };
    return {
      access_token: this.jwtService.sign(payload, null),
    };
  }
}
