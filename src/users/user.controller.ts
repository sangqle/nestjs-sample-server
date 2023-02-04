import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(@Query('start') start, @Query('count') count) {
    return this.usersService.findAll();
  }

  @Get('/error')
  async getError() {
    try {
      throw new HttpException('hishis', 400);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  findById(@Param('id') id: number): string {
    return `Get by userId: ${id}`;
  }

  @Post()
  creatUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    console.log(createUserDto);
    res.status(HttpStatus.OK).json({
      msg: 'ok',
    });
  }
}
