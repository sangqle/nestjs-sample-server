import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { VerifyCallback } from 'passport-jwt';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      clientID: configService.get('g_client_id'),
      clientSecret: configService.get('g_client_secret'),
      callbackURL: 'http://localhost:8080/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      accessToken,
      googleId: profile.id,
    };
    // call validateGoogleUser with done function
    await this.authService.validateGoogleUser(user, done);
  }
}
