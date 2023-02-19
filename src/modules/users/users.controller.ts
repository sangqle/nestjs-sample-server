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
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Roles } from 'src/decorators/role/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/decorators/role/roles.guard';
import { SkipAuth } from 'src/decorators/public.decorators';
import { AuthenticatedRequest } from 'src/interfaces/authenticated.interface';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  @Roles(Role.Admin)
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
    return res.status(HttpStatus.OK).json({
      msg: 'ok',
      users,
      total,
    });
  }

  @Get('info')
  @Roles(Role.User, Role.Admin)
  async getMyUserInfo(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    const user: User = req.userInfo;
    return res.status(HttpStatus.OK).json({
      msg: 'ok',
      user,
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
      user,
    });
  }

  @SkipAuth()
  @Post()
  async creatUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        msg: 'Can not create new user',
      });
    }
    return res.status(HttpStatus.OK).json({
      user,
      msg: 'ok',
    });
  }
}
