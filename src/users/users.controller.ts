import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  /**
   * Get user info
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getByUserId(@Param('id') id: number) {
    return this.userService.findOneById({ id });
  }
}
