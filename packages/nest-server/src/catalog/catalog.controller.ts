import { Controller, UseGuards } from '@nestjs/common';
import { CrudController, Crud } from '@nestjsx/crud';
import { catalogItem } from './../entity';
import { CatalogService } from './catalog.service';
import { RoleGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('catalog')
@UseGuards(RoleGuard)
@Crud({
  model: { type: catalogItem },
  query: { alwaysPaginate: true },
  routes: {
    createOneBase: { decorators: [Roles('admin')] },
    updateOneBase: { decorators: [Roles('admin')] },
    deleteOneBase: { decorators: [Roles('admin')] },
    only: [
      'getOneBase',
      'getManyBase',
      'createOneBase',
      'deleteOneBase',
      'updateOneBase',
    ],
  },
})
export class CatalogController implements CrudController<catalogItem> {
  constructor(public service: CatalogService) {}
}
