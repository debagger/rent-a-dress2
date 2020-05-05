import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../entity';
import { ConfigModule } from '../config/config.module';
import { ServeStaticModule } from '@nestjs/serve-static';

console.log(process.env.IMG_PATH)

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: process.env.IMG_PATH,
      serveRoot: '/images'
    }),
  ],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
