import { Controller, UseGuards } from '@nestjs/common';
import { CrudController, Crud } from '@nestjsx/crud';
import { catalogItem } from './../entity';
import { CatalogService } from './catalog.service';
import { RoleGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponseDescription } from '../api-response-description.decorator';

@Controller('catalog')
@UseGuards(RoleGuard)
@ApiTags('catalog')
@Crud({
  model: { type: catalogItem },
  query: { alwaysPaginate: true },
  routes: {
    createOneBase: {
      decorators: [
        Roles('admin'),
        ApiBadRequestResponse(),
      ],
    },
    updateOneBase: {
      decorators: [
        Roles('admin'),
        ApiBadRequestResponse(),
      ],
    },
    deleteOneBase: {
      decorators: [
        Roles('admin'),
        ApiBadRequestResponse(),
        ApiNotFoundResponse(),
      ],
    },
    getOneBase: {
      decorators: [
        ApiBadRequestResponse(),
        ApiNotFoundResponse(),
      ],
    },
    getManyBase: {
      decorators: [
        ApiBadRequestResponse(),
        ApiNotFoundResponse(),
      ],
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
