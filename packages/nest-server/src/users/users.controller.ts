import {
  Controller,
  UseGuards,
  ExecutionContext,
  CallHandler,
  Patch,
  Body,
  Post,
  Request,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from '../entity';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RoleGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Crud({
  model: {
    type: User,
  },
  params: {},
  query: { exclude: ['tokens', 'password'], alwaysPaginate: true },
  routes: {
    only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase'],
    createOneBase: {
      decorators: [
        Roles('admin'),
        ApiCreatedResponse({ description: 'Ok' }),
        ApiBadRequestResponse(),
      ],
    },
    getOneBase: {
      decorators: [
        Roles('admin'),
        ApiOkResponse({ description: 'OK' }),
        ApiBadRequestResponse(),
        ApiNotFoundResponse(),
      ],
    },
    getManyBase: {
      decorators: [
        Roles('admin'),
        ApiOkResponse({ description: 'OK' }),
        ApiBadRequestResponse(),
        ApiNotFoundResponse(),
      ],
    },
    updateOneBase: {
      decorators: [
        Roles('admin'),
        ApiOkResponse({ description: 'OK' }),
        ApiBadRequestResponse(),
      ],
    },
  },
})
@ApiTags('dress')
@UseGuards(RoleGuard)
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
