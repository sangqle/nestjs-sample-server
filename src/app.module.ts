import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './modules/auth/middleware/auth.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadModule } from './modules/upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { AppLogger } from './common/logger/LoggingModule';
import { AllExceptionsFilter } from './common/filter/exceptions.filter';
import { LogsModule } from './modules/logs/logs.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import AppConfig from './config/app.config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'logs'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.cwd()}/${process.env.NODE_ENV}.env`],
      load: [AppConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get('database'));
        return configService.get('database');
      },
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    UploadModule,
    LogsModule,
  ],
  providers: [
    AppLogger,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [AppLogger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('auth/*', 'users/*', 'posts/*', 'upload/*');
  }
}
