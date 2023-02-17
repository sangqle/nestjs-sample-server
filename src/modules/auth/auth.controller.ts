import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() createAuth: CreateAuthDto, @Res() res: Response) {
    const jwt = await this.authService.login(createAuth);
    res.status(HttpStatus.OK).json({
      msg: 'ok',
      jwt,
    });
  }
}
