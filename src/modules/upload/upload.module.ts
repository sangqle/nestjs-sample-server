import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { AppLogger } from '../../common/logger/LoggingModule';

@Module({
  controllers: [UploadController],
  providers: [UploadService, AppLogger],
})
export class UploadModule {}
