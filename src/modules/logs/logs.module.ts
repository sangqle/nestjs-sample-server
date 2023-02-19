import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { FileService } from './file.service';
import { AppLogger } from 'src/common/logger/LoggingModule';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [LogsController],
  providers: [LogsService, FileService, AppLogger],
})
export class LogsModule {}
