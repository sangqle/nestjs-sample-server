import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongodbConfig from 'src/config/mongodb.config';

@Module({
  imports: [ConfigModule.forFeature(mongodbConfig)],
  providers: [],
  exports: [],
})
export class DataBaseModel {}
