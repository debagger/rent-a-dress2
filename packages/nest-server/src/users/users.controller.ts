import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from '../entity';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: User,
  },
  params: {},
  query: { exclude: ['tokens'], alwaysPaginate: true },
  routes: {
    only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase'],
  },
})
@ApiTags('dress')
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
