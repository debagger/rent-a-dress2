import { Controller } from '@nestjs/common';
import { CrudController, Crud } from '@nestjsx/crud';
import { catalogItem } from './../entity';
import { CatalogService } from './catalog.service';

@Controller('catalog')
@Crud({ model: { type: catalogItem } })
export class CatalogController implements CrudController<catalogItem> {
  constructor(public service: CatalogService) {}
}
