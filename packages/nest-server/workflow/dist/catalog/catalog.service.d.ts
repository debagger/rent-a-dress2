import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { catalogItem } from './../entity';
import { Repository } from 'typeorm';
import { CrudRequest } from '@nestjsx/crud';
export declare class CatalogService extends TypeOrmCrudService<catalogItem> {
    constructor(repo: Repository<catalogItem>);
    getMany(req: CrudRequest): Promise<any>;
}
