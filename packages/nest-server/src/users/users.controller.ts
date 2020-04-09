import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from '../entity';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RoleGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiResponseDescription } from '../api-response-description.decorator';
export class UserResponse {
  @ApiProperty() id: number;
  @ApiPropertyOptional() username: string;
  @ApiPropertyOptional() email: string;
  @ApiPropertyOptional() role: string;
}

@Crud({
  model: {
    type: User,
  },
  params: {},
  query: { exclude: ['tokens', 'password'], alwaysPaginate: true },
  serialize: { get: UserResponse, create: UserResponse, update: UserResponse },
  routes: {
    only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase'],
    createOneBase: {
      decorators: [
        Roles('admin'),
        ApiCreatedResponse({ description: 'Ok', type: UserResponse }),
        ApiBadRequestResponse(),
      ],
    },
    getOneBase: {
      decorators: [
        Roles('admin'),
        ApiResponseDescription('200', ''),
        ApiBadRequestResponse(),
        ApiNotFoundResponse(),
      ],
    },
    getManyBase: {
      decorators: [
        Roles('admin'),
        ApiResponseDescription('200', ''),
        ApiBadRequestResponse(),
        ApiNotFoundResponse(),
      ],
    },
    updateOneBase: {
      decorators: [
        Roles('admin'),
        ApiOkResponse({ description: 'OK', type: UserResponse }),
        ApiBadRequestResponse(),
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
