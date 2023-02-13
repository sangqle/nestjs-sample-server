import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (page < 1) {
      throw new BadRequestException('Invalid page number');
    }
    if (limit < 1 || limit > 100) {
      throw new BadRequestException('Invalid limit');
    }
    const [users, total] = await this.userService.findAll({ page, limit });
    const usersDto = users.map((user) => user.toJSonResponse());
    return res.status(HttpStatus.OK).json({
      msg: 'ok',
      users: usersDto,
      total,
    });
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  async getMyUserInfo(@Req() req: Request, @Res() res: Response) {
    console.log('user: ', req.user);
    return res.status(HttpStatus.OK).json({
      msg: 'ok',
    });
  }

  @Get(':id')
  async getByUserId(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const user: User = await this.userService.findOneById(id);
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        msg: 'User not found',
      });
    }
    return res.status(HttpStatus.OK).json({
      msg: 'ok',
      user: user.toJSonResponse(),
    });
  }

  @Post()
  async creatUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        msg: 'Can not create new user',
      });
    }
    return res.status(HttpStatus.OK).json({
      user: user.toJSonResponse(),
      msg: 'ok',
    });
  }
}
