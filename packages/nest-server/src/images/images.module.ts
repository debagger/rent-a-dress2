import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../entity';
import { ConfigModule } from '../config/config.module';


@Module({
  imports: [TypeOrmModule.forFeature([Image]), ConfigModule],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
