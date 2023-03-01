import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { VerifiedCallback } from 'passport-jwt';

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

  async validateGoogleUser(
    validatedUser,
    done: VerifiedCallback,
  ): Promise<void> {
    let user = await this.usersService.findUserByEmail(validatedUser.email);
    // create new user
    if (!user) {
      const { email, googleId } = validatedUser;
      const username = email.split('@')[0];
      user = await this.usersService.createGoogleUser({
        username,
        email,
        googleId,
      });
    }

    // call done function with user object and null for error argument
    done(null, user);
  }

  async genToken(user) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, null),
    };
  }

  async googleLogin(validatedUser) {
    const { id, emails, name } = validatedUser;
    const user = await this.usersService.findOneById(id);
    if (!user) {
      return null;
    }
    const jwt = await this.jwtService.sign({ sub: user.id });
    return {
      jwt,
    };
  }
}
