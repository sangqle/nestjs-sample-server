import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(_createAuth: any) {
    const payload = { username: _createAuth.username, sub: _createAuth.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
