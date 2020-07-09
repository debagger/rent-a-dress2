import { Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly users;
    constructor(users: UsersService);
    validate(payload: any): Promise<{
        payload: any;
        user: {
            id: number;
            username: string;
            email: string;
            role: string;
            tokens: import("../entity").Token[];
        };
    }>;
}
export {};
