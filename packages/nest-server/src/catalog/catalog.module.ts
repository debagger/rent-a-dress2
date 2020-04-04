import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { catalogItem } from '../entity';

@Module({
  imports: [TypeOrmModule.forFeature([catalogItem])],
  providers: [CatalogService],
  controllers: [CatalogController],
})
export class CatalogModule {}
