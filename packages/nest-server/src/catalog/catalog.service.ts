import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { catalogItem } from './../entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatalogService extends TypeOrmCrudService<catalogItem> {
    constructor(@InjectRepository(catalogItem) repo: Repository<catalogItem>) {
        super(<any>repo);
      }
}
