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
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
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
      decorators: [Roles('admin'), ApiCreatedResponse({ description: 'Ok' })],
    },
    getOneBase: {
      decorators: [Roles('admin'), ApiOkResponse({ description: 'OK' })],
    },
    getManyBase: {
      decorators: [Roles('admin'), ApiOkResponse({ description: 'OK' })],
    },
    updateOneBase: {
      decorators: [Roles('admin'), ApiOkResponse({ description: 'OK' })],
    },
  },
})
@ApiTags('dress')
@UseGuards(RoleGuard)
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
