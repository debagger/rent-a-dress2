import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entity';
import { Repository, DeepPartial } from 'typeorm';
import { CrudRequest } from '@nestjsx/crud';
export declare class UsersService extends TypeOrmCrudService<User> {
    constructor(repo: Repository<User>);
    createOne(req: CrudRequest, user: DeepPartial<User>): Promise<User>;
    updateOne(req: CrudRequest, user: DeepPartial<User>): Promise<User>;
    save(user: DeepPartial<User>): Promise<User>;
    changePassword(user: any, oldPassword: string, newPassword: string): Promise<boolean>;
    hash(input: string): string;
}
