import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { catalogItem } from './../entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';

@Injectable()
export class CatalogService extends TypeOrmCrudService<catalogItem> {
    constructor(@InjectRepository(catalogItem) repo: Repository<catalogItem>) {
        super(<any>repo);
      }
      async getMany(req: CrudRequest) {
        const result:any = await super.getMany(req);
        if(result && result.data && Array.isArray(result.data)){
          const def = <GetManyDefaultResponse<catalogItem>>result;
          if(!def.pageCount){
            def.pageCount = 1;
          }
          return def;
        }
        return result;
      }
}
