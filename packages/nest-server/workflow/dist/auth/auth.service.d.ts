import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(userName: string, password: string): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
    } | undefined>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
