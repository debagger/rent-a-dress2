import { Module } from '@nestjs/common';
import { ConfigProvider } from './config.provider';

@Module({ providers: [ConfigProvider], exports: ['CONFIG'] })
export class ConfigModule {}
