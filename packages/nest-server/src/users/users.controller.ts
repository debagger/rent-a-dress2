import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from '../entity';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { RoleGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiResponseDescription } from '../api-response-description.decorator';
import { UserResponse } from './user-response.dto';
import { CreateUserRequestDto } from './create-user-request.dto';
import { UpdateUserRequestDto } from './update-user-request.dto';

@Crud({
  model: {
    type: User,
  },
  query: { alwaysPaginate: true },
  dto: { create: CreateUserRequestDto, update: UpdateUserRequestDto },
  serialize: { get: UserResponse, create: UserResponse, update: UserResponse },
  routes: {
    only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase'],
    createOneBase: {
      decorators: [
        Roles('admin'),
        ApiBadRequestResponse(),
      ],
    },
    getOneBase: {
      decorators: [
        Roles('admin'),
        ApiBadRequestResponse(),
        ApiNotFoundResponse(),
      ],
    },
    getManyBase: {
      decorators: [
        Roles('admin'),
        ApiBadRequestResponse(),
        ApiNotFoundResponse(),
      ],
    },
    updateOneBase: {
      decorators: [
        Roles('admin'),
        ApiBadRequestResponse(),
        ApiNotFoundResponse(),
      ],
    },
  },
})
@ApiTags('user')
@UseGuards(RoleGuard)
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
