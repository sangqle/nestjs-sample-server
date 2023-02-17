import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLogger } from 'src/common/logger/LoggingModule';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserRepository, AppLogger],
  controllers: [UsersController],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
