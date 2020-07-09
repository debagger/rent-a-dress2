import { Repository } from 'typeorm';
import { User } from '@rent-a-dress/entities';
export declare class AppService {
    private readonly repo;
    constructor(repo: Repository<User>);
    getHello(): Promise<string>;
}
