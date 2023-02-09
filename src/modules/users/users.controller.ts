import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async getByUserId(@Param('id') id: number) {
    return this.userService.findOneById({ id });
  }

  @Post()
  async creatUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
