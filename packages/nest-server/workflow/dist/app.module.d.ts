import { NestModule } from '@nestjs/common';
import { UsersService } from './users/users.service';
export declare class AppModule implements NestModule {
    private readonly users;
    constructor(users: UsersService);
    configure(): Promise<void>;
}
