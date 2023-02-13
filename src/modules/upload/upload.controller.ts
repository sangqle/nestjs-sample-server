import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  LoggerService,
  Inject,
  Logger,
} from '@nestjs/common';
import * as fs from 'fs';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { APP_LOGGER } from 'src/common/constants';
import { AppLogger } from '../logger/LoggingModule';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly logger: AppLogger,
  ) {}

  @Post('photo')
  @UseInterceptors(FileInterceptor('file', {}))
  async uploadFile(@UploadedFile() file) {
    this.logger.log('This is a log message');
    this.logger.warn('This is a warning message');
    this.logger.error('This is an error message', 'stack trace goes here');
    this.logger.debug('This is debug file');
    await writeFileToServer('uploads/' + file.originalname, file.buffer);
    return 'upload';
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}

async function writeFileToServer(
  filename: string,
  file: Buffer,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filename, file, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
