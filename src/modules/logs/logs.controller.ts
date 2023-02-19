import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import * as fs from 'fs';
import { FileService } from './file.service';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from 'src/common/logger/LoggingModule';
import { RolesGuard } from 'src/decorators/role/roles.guard';
import { Roles } from 'src/decorators/role/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('logs')
@UseGuards(RolesGuard)
@Roles(Role.Admin)
export class LogsController {
  constructor(
    private readonly logsService: LogsService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
    private readonly logger: AppLogger,
  ) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logsService.create(createLogDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const listLogsFile = this.fileService.getFiles(
      this.configService.get('logs_path'),
    );
    return listLogsFile.map((log) => {
      return log;
    });
  }

  @Get(':filename')
  async getFile(
    @Param('filename') filename: string,
    @Res() res,
  ): Promise<void> {
    const stream = fs.createReadStream(`logs/${filename}`);
    stream.on('error', (error) => {
      this.logger.error(error.message, error.stack);
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Log file not found' });
    });
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    stream.on('end', () => {
      const data = Buffer.concat(chunks);
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Length': data.length,
        'Content-Disposition': `attachment; filename=${filename}`,
      });
      res.send(data);
    });
  }
}
