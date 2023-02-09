import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const users: User[] = await this.userService.findAll();
    const usersDto = users.map((user) => user.toJSonResponse());
    return res.status(HttpStatus.OK).json({
      msg: 'ok',
      users: usersDto,
    });
  }

  @Get(':id')
  async getByUserId(@Param('id') id: number, @Res() res: Response) {
    const user: User = await this.userService.findOneById(id);
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
