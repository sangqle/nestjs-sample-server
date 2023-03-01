import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { SkipAuth } from 'src/decorators/public.decorators';
import { RolesGuard } from 'src/decorators/role/roles.guard';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller()
@UseGuards(RolesGuard)
@SkipAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @Post('auth/login')
  async login(@Body() createAuth: CreateAuthDto, @Res() res: Response) {
    const jwt = await this.authService.login(createAuth);
    res.status(HttpStatus.OK).json({
      msg: 'ok',
      jwt,
    });
  }

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // The user will be redirected to Google for authentication, so this route doesn't need to return anything
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req) {
    const user = req.user;
    console.log('user: ', req.user);
    const token = await this.authService.googleLogin(user);
    if (!token) {
      return {
        msg: 'Invalid credential',
      };
    }
    return {
      user,
      ...token,
    };
  }
}
