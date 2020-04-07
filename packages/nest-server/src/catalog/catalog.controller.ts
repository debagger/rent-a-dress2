import { Controller, UseGuards } from '@nestjs/common';
import { CrudController, Crud } from '@nestjsx/crud';
import { catalogItem } from './../entity';
import { CatalogService } from './catalog.service';
import { RoleGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('catalog')
@UseGuards(RoleGuard)
@Crud({
  model: { type: catalogItem },
  query: { alwaysPaginate: true },
  routes: {
    createOneBase: {
      decorators: [Roles('admin'), ApiCreatedResponse({ description: 'OK' })],
    },
    updateOneBase: {
      decorators: [Roles('admin'), ApiOkResponse({ description: 'OK' })],
    },
    deleteOneBase: {
      decorators: [Roles('admin'), ApiOkResponse({ description: 'OK' })],
    },
    getOneBase: {
      decorators: [ApiOkResponse({ description: 'OK' })],
    },
    getManyBase: {
      decorators: [ApiOkResponse({ description: 'OK' })],
    },
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
