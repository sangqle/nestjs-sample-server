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
  Req,
} from '@nestjs/common';
import * as fs from 'fs';
import { UploadService } from './upload.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppLogger } from '../logger/LoggingModule';
import { createWriteStream } from 'fs';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly logger: AppLogger,
  ) {}

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const { originalname } = file;
    const writeImage = createWriteStream(`uploads/${originalname}`);
    writeImage.write(file.buffer);
    writeImage.end();

    return {
      message: 'File uploaded successfully',
    };
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
