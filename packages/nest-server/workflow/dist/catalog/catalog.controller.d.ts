import { CrudController } from '@nestjsx/crud';
import { catalogItem } from './../entity';
import { CatalogService } from './catalog.service';
export declare class CatalogController implements CrudController<catalogItem> {
    service: CatalogService;
    constructor(service: CatalogService);
}
