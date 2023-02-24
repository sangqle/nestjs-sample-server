import { Injectable } from '@nestjs/common';
import { createLogger, format } from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');
import { LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger implements LoggerService {
  private readonly errorLogger: any;
  private readonly debugLogger: any;
  private readonly infoLogger: any;

  constructor() {
    const errorTransport = new DailyRotateFile({
      filename: './logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json(),
        format.printf(
          (info) => `[${info.timestamp}] [${info.level}] ${info.message}`,
        ),
      ),
    });

    const debugTransport = new DailyRotateFile({
      filename: './logs/debug-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'debug',
      maxSize: '20m',
      maxFiles: '14d',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json(),
        format.printf(
          (info) => `[${info.timestamp}] [${info.level}] ${info.message}`,
        ),
      ),
    });

    const infoTransport = new DailyRotateFile({
      filename: './logs/info-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxSize: '20m',
      maxFiles: '14d',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.json(),
        format.printf(
          (info) => `[${info.timestamp}] [${info.level}] ${info.message}`,
        ),
      ),
    });

    this.errorLogger = createLogger({
      transports: [errorTransport],
      exceptionHandlers: [errorTransport],
    });

    this.debugLogger = createLogger({
      transports: [debugTransport],
    });

    this.infoLogger = createLogger({
      transports: [infoTransport],
    });
  }

  log(message: string) {
    this.infoLogger.info(message);
  }

  error(message: string, trace?: string) {
    this.errorLogger.error(message, { trace });
  }

  warn(message: string) {
    this.infoLogger.warn(message);
  }

  debug(message: string) {
    this.debugLogger.debug(message);
  }

  verbose(message: string) {
    this.infoLogger.verbose(message);
  }
}
