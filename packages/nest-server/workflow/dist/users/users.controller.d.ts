import { CrudController } from '@nestjsx/crud';
import { User } from '../entity';
import { UsersService } from './users.service';
export declare class UsersController implements CrudController<User> {
    service: UsersService;
    constructor(service: UsersService);
}
