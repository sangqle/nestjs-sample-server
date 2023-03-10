import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(auth: CreateAuthDto) {
    const user = await this.usersService.findOneByUsername(auth.username);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(auth.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, null),
    };
  }
}
