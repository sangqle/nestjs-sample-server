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
  Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
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
  async creatUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    console.log(createUserDto);

    // conver userDto to user
    const user: User = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.phone_number = createUserDto.phone_number;
    user.updated_at = new Date().getTime();
    user.user_id = 0;
    user.is_deleted = 0;
    user.phone_number = '0292929';
    user.updated_at = 0;
    user.password = createUserDto.password;

    const userSaved = await this.usersService.createUser(user);
    console.log('saved: ', userSaved);
    res.status(HttpStatus.OK).json({
      msg: 'ok',
      user,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    const deleted = await this.usersService.delete(id);
    res.json({
      deleted,
    });
  }
}
