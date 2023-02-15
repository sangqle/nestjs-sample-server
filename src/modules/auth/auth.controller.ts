import { Controller, Post, Body, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SkipAuth } from 'src/decorators/public.decorators';
import { RolesGuard } from 'src/decorators/role/roles.guard';
import { Role } from '../roles/entities/role.entity';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @Post('auth/login')
  @UseGuards(RolesGuard)
  async login(@Body() createAuth: CreateAuthDto, @Res() res: Response) {
    const jwt = await this.authService.login(createAuth);
    res.status(HttpStatus.OK).json({
      msg: 'ok',
      jwt,
    });
  }
}
